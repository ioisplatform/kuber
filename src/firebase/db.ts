import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  orderBy,
  runTransaction,
  arrayUnion,
  increment,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';
import { KuberUser, PlanType, UserStatus, AdminStats } from '../types';
import { constructKuberId } from '../utils/kuberId';

// Persistent client device ID generator
export function getOrCreateDeviceId(): string {
  const STORAGE_KEY = 'kuber_device_id';
  try {
    let devId = localStorage.getItem(STORAGE_KEY);
    if (!devId) {
      devId = 'dev_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now().toString(36);
      localStorage.setItem(STORAGE_KEY, devId);
    }
    return devId;
  } catch {
    return 'dev_mem_' + Math.random().toString(36).substring(2, 10);
  }
}

// Simple deterministic hash for student password matching
export async function hashPassword(plain: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain + '_kuber_patna_salt_2025');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } catch {
    let hash = 0;
    for (let i = 0; i < plain.length; i++) {
      hash = (hash << 5) - hash + plain.charCodeAt(i);
      hash |= 0;
    }
    return 'fallback_' + Math.abs(hash);
  }
}

/**
 * Register a student and atomically generate their immutable KUBER ID
 * Format: KUBER[PLAN][INITIALS][JOIN_NO] e.g. KUBER29RK01, KUBER99AK15, KUBER199VK01
 */
export async function registerStudent(params: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  plan: PlanType;
  photoUrl: string;
  paymentScreenshotUrl: string;
  upiTxnId: string;
  referredBy?: string;
}): Promise<KuberUser> {
  const deviceId = getOrCreateDeviceId();
  const passwordHash = await hashPassword(params.password);
  const countersRef = doc(db, 'counters', 'counters');

  try {
    let finalKuberId = '';
    let finalJoinNumber = 1;

    // Run atomic transaction to ensure zero duplicate IDs across all plans
    await runTransaction(db, async (transaction) => {
      const counterDoc = await transaction.get(countersRef);
      let plan29Count = 0;
      let plan99Count = 0;
      let plan199Count = 0;

      if (counterDoc.exists()) {
        const data = counterDoc.data();
        plan29Count = data.plan29Count || 0;
        plan99Count = data.plan99Count || 0;
        plan199Count = data.plan199Count || 0;
      }

      if (params.plan === '29') {
        plan29Count += 1;
        finalJoinNumber = plan29Count;
      } else if (params.plan === '99') {
        plan99Count += 1;
        finalJoinNumber = plan99Count;
      } else {
        plan199Count += 1;
        finalJoinNumber = plan199Count;
      }

      finalKuberId = constructKuberId(params.plan, params.fullName, finalJoinNumber);

      transaction.set(
        countersRef,
        {
          plan29Count,
          plan99Count,
          plan199Count,
          lastGeneratedId: finalKuberId,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    });

    const newUser: KuberUser = {
      kuberId: finalKuberId,
      fullName: params.fullName.trim(),
      email: params.email.trim().toLowerCase(),
      phone: params.phone.trim(),
      passwordHash,
      plan: params.plan,
      joinNumber: finalJoinNumber,
      photoUrl: params.photoUrl,
      paymentScreenshotUrl: params.paymentScreenshotUrl,
      upiTxnId: params.upiTxnId.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      deviceIds: [deviceId],
      earnings: 0,
      totalEarnings: 0,
      referralsCount: 0,
      referralCount: 0,
      referredBy: params.referredBy ? params.referredBy.trim().toUpperCase() : undefined,
    };

    // Save student document with kuberId as Primary Key
    const userRef = doc(db, 'users', finalKuberId);
    await setDoc(userRef, newUser);

    // Save local backup in localStorage for multi-device resilience
    saveUserToLocalCache(newUser);

    return newUser;
  } catch (error) {
    console.error('Error during student registration transaction:', error);
    handleFirestoreError(error, OperationType.WRITE, 'users');
  }
}

/**
 * Login using KUBER ID + Password only
 */
export async function loginWithKuberId(kuberId: string, passwordPlain: string): Promise<KuberUser> {
  const cleanId = kuberId.trim().toUpperCase();
  const deviceId = getOrCreateDeviceId();
  const userRef = doc(db, 'users', cleanId);

  try {
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      const cached = getLocalUser(cleanId);
      if (cached) {
        const expectedHash = await hashPassword(passwordPlain);
        if (cached.passwordHash === expectedHash) {
          cached.totalEarnings = cached.earnings;
          cached.referralCount = cached.referralsCount;
          return cached;
        }
      }
      throw new Error('KUBER ID not found. Please check your ID or register first.');
    }

    const userData = snap.data() as KuberUser;
    const expectedHash = await hashPassword(passwordPlain);

    if (userData.passwordHash !== expectedHash) {
      throw new Error('Incorrect password for this KUBER ID.');
    }

    if (userData.status === 'deleted') {
      throw new Error('This KUBER ID account is inactive. Please contact support.');
    }

    // Add deviceId to deviceIds array if not already included
    if (!userData.deviceIds?.includes(deviceId)) {
      try {
        await updateDoc(userRef, {
          deviceIds: arrayUnion(deviceId),
        });
        userData.deviceIds = [...(userData.deviceIds || []), deviceId];
      } catch (e) {
        console.warn('Could not record new deviceId:', e);
      }
    }

    userData.totalEarnings = userData.earnings || 0;
    userData.referralCount = userData.referralsCount || 0;
    saveUserToLocalCache(userData);
    return userData;
  } catch (error) {
    if (error instanceof Error && (error.message.includes('not found') || error.message.includes('Incorrect password'))) {
      throw error;
    }
    handleFirestoreError(error, OperationType.GET, `users/${cleanId}`);
  }
}

/**
 * Fetch a single user by their KUBER ID for verification or dashboard refresh
 */
export async function getUserByKuberId(kuberId: string): Promise<KuberUser | null> {
  const cleanId = kuberId.trim().toUpperCase();
  try {
    const userRef = doc(db, 'users', cleanId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const user = snap.data() as KuberUser;
      user.totalEarnings = user.earnings || 0;
      user.referralCount = user.referralsCount || 0;
      return user;
    }
    const cached = getLocalUser(cleanId);
    if (cached) {
      cached.totalEarnings = cached.earnings || 0;
      cached.referralCount = cached.referralsCount || 0;
      return cached;
    }
    return null;
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    const cached = getLocalUser(cleanId);
    if (cached) {
      cached.totalEarnings = cached.earnings || 0;
      cached.referralCount = cached.referralsCount || 0;
      return cached;
    }
    return null;
  }
}

export const getStudentById = getUserByKuberId;

/**
 * Fetch all students for Admin
 */
export async function getAllUsers(): Promise<KuberUser[]> {
  try {
    const usersCol = collection(db, 'users');
    const q = query(usersCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const users: KuberUser[] = [];
    snapshot.forEach((docSnap) => {
      const u = docSnap.data() as KuberUser;
      if (u.status !== 'deleted') {
        u.totalEarnings = u.earnings || 0;
        u.referralCount = u.referralsCount || 0;
        users.push(u);
      }
    });

    if (users.length === 0) {
      const localList = getLocalUsersList();
      if (localList.length > 0) return localList;
      return seedDefaultStudents();
    }
    return users;
  } catch (error) {
    console.warn('Error fetching all students from Firestore:', error);
    const local = getLocalUsersList();
    if (local.length > 0) return local;
    return seedDefaultStudents();
  }
}

export const getAllStudents = getAllUsers;

/**
 * Approve student payment (Admin action)
 */
export async function approveUserPayment(kuberId: string): Promise<void> {
  const cleanId = kuberId.trim().toUpperCase();
  const userRef = doc(db, 'users', cleanId);

  try {
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      const local = getLocalUser(cleanId);
      if (local) {
        local.status = 'approved';
        local.approvedAt = new Date().toISOString();
        saveUserToLocalCache(local);
        return;
      }
      throw new Error('User not found');
    }

    const student = snap.data() as KuberUser;
    const approvedAt = new Date().toISOString();

    await updateDoc(userRef, {
      status: 'approved',
      approvedAt,
    });

    // If referred by someone, credit referral earnings
    // Plan 29 -> ₹15, Plan 99 -> ₹60, Plan 199 -> ₹120
    if (student.referredBy) {
      try {
        const referrerRef = doc(db, 'users', student.referredBy);
        const refSnap = await getDoc(referrerRef);
        if (refSnap.exists()) {
          const reward =
            student.plan === '199' ? 120 : student.plan === '99' ? 60 : 15;
          await updateDoc(referrerRef, {
            earnings: increment(reward),
            referralsCount: increment(1),
          });
        }
      } catch (err) {
        console.warn('Referral credit error:', err);
      }
    }

    // Update local cache
    const current = getLocalUser(cleanId);
    if (current) {
      current.status = 'approved';
      current.approvedAt = approvedAt;
      saveUserToLocalCache(current);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${cleanId}`);
  }
}

export const approveStudent = approveUserPayment;

/**
 * Reject student payment (Admin action)
 */
export async function rejectUserPayment(kuberId: string, reason: string): Promise<void> {
  const cleanId = kuberId.trim().toUpperCase();
  const userRef = doc(db, 'users', cleanId);
  try {
    await updateDoc(userRef, {
      status: 'rejected',
      rejectionReason: reason || 'Payment could not be verified with UPI transaction ID.',
    });

    const current = getLocalUser(cleanId);
    if (current) {
      current.status = 'rejected';
      current.rejectionReason = reason;
      saveUserToLocalCache(current);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${cleanId}`);
  }
}

export const rejectStudent = rejectUserPayment;

/**
 * Soft delete student (Admin action - data is never actually deleted)
 */
export async function softDeleteUser(kuberId: string): Promise<void> {
  const cleanId = kuberId.trim().toUpperCase();
  const userRef = doc(db, 'users', cleanId);
  try {
    await updateDoc(userRef, {
      status: 'deleted',
    });

    const current = getLocalUser(cleanId);
    if (current) {
      current.status = 'deleted';
      saveUserToLocalCache(current);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${cleanId}`);
  }
}

export const softDeleteStudent = softDeleteUser;

/**
 * Get Admin Metrics across all 3 plans
 */
export async function getAdminStats(): Promise<AdminStats> {
  const users = await getAllUsers();
  let totalRevenue = 0;
  let plan29Count = 0;
  let plan99Count = 0;
  let plan199Count = 0;
  let pendingCount = 0;
  let approvedCount = 0;

  users.forEach((u) => {
    if (u.status === 'approved') {
      approvedCount += 1;
      const amount = u.plan === '199' ? 199 : u.plan === '99' ? 99 : 29;
      totalRevenue += amount;
    } else if (u.status === 'pending') {
      pendingCount += 1;
    }

    if (u.plan === '29') {
      plan29Count += 1;
    } else if (u.plan === '99') {
      plan99Count += 1;
    } else if (u.plan === '199') {
      plan199Count += 1;
    }
  });

  return {
    totalUsers: users.length,
    totalRevenue,
    plan29Count,
    plan99Count,
    plan199Count,
    pendingCount,
    approvedCount,
  };
}

// Local storage session helpers
export function saveUserToLocalCache(user: KuberUser) {
  try {
    localStorage.setItem('kuber_current_user', JSON.stringify(user));
    localStorage.setItem(`kuber_user_${user.kuberId}`, JSON.stringify(user));

    const listJson = localStorage.getItem('kuber_all_users') || '[]';
    const list: KuberUser[] = JSON.parse(listJson);
    const existingIdx = list.findIndex((u) => u.kuberId === user.kuberId);
    if (existingIdx >= 0) {
      list[existingIdx] = user;
    } else {
      list.unshift(user);
    }
    localStorage.setItem('kuber_all_users', JSON.stringify(list));
  } catch (e) {
    console.warn('Local storage write warning:', e);
  }
}

export function loadUserFromLocalCache(): KuberUser | null {
  try {
    const raw = localStorage.getItem('kuber_current_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearUserLocalCache() {
  try {
    localStorage.removeItem('kuber_current_user');
  } catch (e) {
    console.warn(e);
  }
}

function getLocalUser(kuberId: string): KuberUser | null {
  try {
    const raw = localStorage.getItem(`kuber_user_${kuberId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getLocalUsersList(): KuberUser[] {
  try {
    const raw = localStorage.getItem('kuber_all_users');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Seed default reference students for immediate demonstration
function seedDefaultStudents(): KuberUser[] {
  const defaults: KuberUser[] = [
    {
      kuberId: 'KUBER29RK01',
      fullName: 'Rahul Kumar',
      email: 'rahul.patna@gmail.com',
      phone: '9835012345',
      passwordHash: 'seeded_rk01',
      plan: '29',
      joinNumber: 1,
      photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
      paymentScreenshotUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
      upiTxnId: '509482716390',
      status: 'approved',
      createdAt: '2025-01-10T10:30:00.000Z',
      approvedAt: '2025-01-10T11:00:00.000Z',
      deviceIds: ['dev_default_1'],
      earnings: 45,
      totalEarnings: 45,
      referralsCount: 3,
      referralCount: 3,
    },
    {
      kuberId: 'KUBER99AK15',
      fullName: 'Aryan Kumar',
      email: 'aryan.gaya@gmail.com',
      phone: '9431098765',
      passwordHash: 'seeded_ak15',
      plan: '99',
      joinNumber: 15,
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      paymentScreenshotUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
      upiTxnId: '509491827364',
      status: 'approved',
      createdAt: '2025-01-15T14:20:00.000Z',
      approvedAt: '2025-01-15T14:45:00.000Z',
      deviceIds: ['dev_default_2'],
      earnings: 300,
      totalEarnings: 300,
      referralsCount: 5,
      referralCount: 5,
    },
    {
      kuberId: 'KUBER199VK01',
      fullName: 'Vikash Kumar',
      email: 'vikas.patna@gmail.com',
      phone: '8877490845',
      passwordHash: 'seeded_vk01',
      plan: '199',
      joinNumber: 1,
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      paymentScreenshotUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
      upiTxnId: '509534918273',
      status: 'approved',
      createdAt: '2025-02-01T08:00:00.000Z',
      approvedAt: '2025-02-01T08:15:00.000Z',
      deviceIds: ['dev_default_vip'],
      earnings: 480,
      totalEarnings: 480,
      referralsCount: 4,
      referralCount: 4,
    },
  ];

  defaults.forEach((d) => saveUserToLocalCache(d));
  return defaults;
}
