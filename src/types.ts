export type PlanType = '29' | '99' | '199';

export type UserStatus = 'pending' | 'approved' | 'rejected' | 'deleted';

export interface KuberUser {
  kuberId: string; // Primary key e.g. KUBER29RK01, KUBER99AK15, KUBER199VK01
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  plan: PlanType;
  joinNumber: number;
  photoUrl: string; // Compressed image data URL or Firebase storage URL
  paymentScreenshotUrl: string; // Compressed payment proof data URL
  upiTxnId: string;
  status: UserStatus;
  rejectionReason?: string;
  createdAt: string;
  approvedAt?: string;
  deviceIds: string[];
  earnings: number;
  totalEarnings?: number; // Alias for UI display
  referralsCount: number;
  referralCount?: number; // Alias for UI display
  referredBy?: string;
}

export interface PlanDetails {
  id: PlanType;
  name: string;
  hindiName: string;
  price: number;
  payoutAmount: number; // e.g. 15, 60, 120
  accessLevel: string;
  tagline: string;
  badge: string;
  highlights: string[];
  benefits: {
    title: string;
    description: string;
    badge?: string;
  }[];
}

export interface VerificationResult {
  found: boolean;
  user?: Pick<KuberUser, 'kuberId' | 'fullName' | 'plan' | 'status' | 'createdAt' | 'approvedAt' | 'photoUrl'>;
  error?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalRevenue: number;
  plan29Count: number;
  plan99Count: number;
  plan199Count: number;
  pendingCount: number;
  approvedCount: number;
}
