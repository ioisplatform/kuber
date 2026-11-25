import React, { useState, useEffect } from 'react';
import {
  getAllUsers,
  approveUserPayment,
  rejectUserPayment,
  softDeleteUser,
  getAdminStats,
} from '../firebase/db';
import { KuberUser, AdminStats } from '../types';
import { IdCardView } from '../components/IdCardView';
import {
  Lock,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Trash2,
  DollarSign,
  Users,
  TrendingUp,
  AlertTriangle,
  X,
  ExternalLink,
  RefreshCw,
  Crown,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState('');

  // Data states
  const [users, setUsers] = useState<KuberUser[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalRevenue: 0,
    plan29Count: 0,
    plan99Count: 0,
    plan199Count: 0,
    pendingCount: 0,
    approvedCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | '29' | '99' | '199'>('all');

  // Modals for inspection
  const [inspectCardUser, setInspectCardUser] = useState<KuberUser | null>(null);
  const [inspectProofUser, setInspectProofUser] = useState<KuberUser | null>(null);

  // Default PIN is 2999
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2999') {
      setIsAuthenticated(true);
      setPinError('');
      loadAdminData();
    } else {
      setPinError('Invalid Admin PIN. (Default PIN is 2999)');
    }
  };

  const loadAdminData = async () => {
    try {
      setLoading(true);
      const [userList, statsData] = await Promise.all([
        getAllUsers(),
        getAdminStats(),
      ]);
      setUsers(userList);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleApprove = async (kuberId: string) => {
    if (!window.confirm(`Approve payment and authorize official ID card for ${kuberId}?`)) return;
    try {
      await approveUserPayment(kuberId);
      loadAdminData();
    } catch (err: any) {
      alert('Error approving user: ' + err.message);
    }
  };

  const handleReject = async (kuberId: string) => {
    const reason = window.prompt(`Enter rejection reason for ${kuberId}:`, 'UPI UTR not matching with bank statement');
    if (reason === null) return;
    try {
      await rejectUserPayment(kuberId, reason);
      loadAdminData();
    } catch (err: any) {
      alert('Error rejecting user: ' + err.message);
    }
  };

  const handleDelete = async (kuberId: string) => {
    if (!window.confirm(`Are you sure you want to delete ${kuberId}? (Soft delete in Firestore)`)) return;
    try {
      await softDeleteUser(kuberId);
      loadAdminData();
    } catch (err: any) {
      alert('Error deleting user: ' + err.message);
    }
  };

  const filteredUsers = users.filter((u) => {
    if (statusFilter === 'pending' && u.status !== 'pending') return false;
    if (statusFilter === 'approved' && u.status !== 'approved') return false;
    if (statusFilter === 'rejected' && u.status !== 'rejected') return false;
    if (statusFilter === '29' && u.plan !== '29') return false;
    if (statusFilter === '99' && u.plan !== '99') return false;
    if (statusFilter === '199' && u.plan !== '199') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchId = u.kuberId.toLowerCase().includes(q);
      const matchName = u.fullName.toLowerCase().includes(q);
      const matchPhone = u.phone.toLowerCase().includes(q);
      const matchTxn = u.upiTxnId.toLowerCase().includes(q);
      return matchId || matchName || matchPhone || matchTxn;
    }

    return true;
  });

  // PIN AUTHENTICATION FORM
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center bg-[#0A0A0A] text-white" id="kuber-admin-auth">
        <div className="max-w-sm w-full p-8 rounded-2xl bg-[#111111] border-2 border-[#D4AF37] shadow-2xl text-center">
          <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#D4AF37] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-[#FFDF73]">
            Restricted Staff Portal
          </span>
          <h2 className="font-royal text-2xl font-bold text-white mt-1">
            KUBER Admin Access
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Enter authorized 4-digit PIN to manage student enrollments & UPI verifications
          </p>

          {pinError && (
            <div className="mt-4 p-2.5 rounded-lg bg-rose-950/80 border border-rose-500 text-rose-200 text-xs">
              {pinError}
            </div>
          )}

          <form onSubmit={handlePinSubmit} className="mt-6 space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                autoFocus
                placeholder="Enter PIN (Default: 2999)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full text-center py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-xl tracking-[0.4em] font-mono font-bold text-[#FFDF73] focus:border-[#D4AF37] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#AA820A] text-black hover:opacity-95 cursor-pointer shadow-md"
            >
              Unlock Admin Dashboard
            </button>
          </form>

          <p className="text-[11px] text-zinc-500 mt-4">
            Patna Academic Cell & ID Issuance Department
          </p>
        </div>
      </div>
    );
  }

  // MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] text-white" id="kuber-admin-dashboard">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Title & Refresh */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#332A10]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#FFDF73] px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                Staff Master Portal
              </span>
              <span className="text-xs text-zinc-400 font-mono">PIN: 2999 (Authenticated)</span>
            </div>
            <h1 className="font-royal text-2xl sm:text-3xl font-bold text-white mt-1">
              KUBER Enrollment & Verification Desk
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Official Account: <code className="text-[#FFDF73]">8877490845@spicepay</code> • Payee: Vikas Kumar (VERIFIED)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRefreshing(true);
                loadAdminData();
              }}
              disabled={refreshing}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900"
            >
              Lock Desk
            </button>
          </div>
        </div>

        {/* STATS METRIC CARDS (ALL 3 PLANS) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-[10px] text-zinc-400 uppercase font-bold">Total Aspirants</div>
            <div className="text-2xl sm:text-3xl font-royal font-black text-white mt-1">
              {stats.totalUsers}
            </div>
            <div className="text-[10px] text-zinc-500 mt-1">All 3 Plans</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-[10px] text-zinc-400 uppercase font-bold">Total Revenue</div>
            <div className="text-2xl sm:text-3xl font-royal font-black text-[#FFDF73] mt-1">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">Verified UPI collections</div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
            <div className="text-[10px] text-amber-300 uppercase font-bold">Pending Review</div>
            <div className="text-2xl sm:text-3xl font-royal font-black text-amber-400 mt-1">
              {stats.pendingCount}
            </div>
            <div className="text-[10px] text-amber-300/80 mt-1">Requires UTR check</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-[10px] text-zinc-400 uppercase font-bold">Gyan Dhan (₹29)</div>
            <div className="text-2xl sm:text-3xl font-royal font-black text-zinc-200 mt-1">
              {stats.plan29Count}
            </div>
            <div className="text-[10px] text-zinc-500 mt-1">₹15 Affiliate Payout</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-[10px] text-zinc-400 uppercase font-bold">Rozgar Dhan (₹99)</div>
            <div className="text-2xl sm:text-3xl font-royal font-black text-amber-400 mt-1">
              {stats.plan99Count}
            </div>
            <div className="text-[10px] text-zinc-500 mt-1">₹60 Affiliate Payout</div>
          </div>

          <div className="p-4 rounded-xl bg-[#1F190A] border border-[#D4AF37]/50">
            <div className="text-[10px] text-[#FFDF73] uppercase font-bold flex items-center gap-1">
              <Crown className="w-3 h-3 text-[#D4AF37]" /> Maha Dhan (₹199)
            </div>
            <div className="text-2xl sm:text-3xl font-royal font-black text-[#FFE28A] mt-1">
              {stats.plan199Count || 0}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">₹120 VIP Payout</div>
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="p-4 rounded-2xl bg-[#111111] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by KUBER ID, Name, Phone, UTR..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:border-[#D4AF37] outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Users' },
              { id: 'pending', label: `Pending (${stats.pendingCount})` },
              { id: 'approved', label: `Approved (${stats.approvedCount})` },
              { id: '29', label: 'Plan 29' },
              { id: '99', label: 'Plan 99' },
              { id: '199', label: 'Plan 199 (VIP)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === f.id
                    ? 'bg-[#D4AF37] text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* USERS TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#0F0F0F] shadow-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950 text-[11px] uppercase tracking-wider text-zinc-400">
                <th className="p-3.5 font-bold">#</th>
                <th className="p-3.5 font-bold">Photo</th>
                <th className="p-3.5 font-bold">KUBER ID</th>
                <th className="p-3.5 font-bold">Student Details</th>
                <th className="p-3.5 font-bold">Plan</th>
                <th className="p-3.5 font-bold">UPI Proof / UTR</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-zinc-500">
                    No student registrations match your current filter.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, idx) => {
                  const isApproved = u.status === 'approved';
                  const isPending = u.status === 'pending';
                  const isRejected = u.status === 'rejected';

                  return (
                    <tr key={u.kuberId} className="hover:bg-zinc-900/50 transition-colors">
                      {/* S.No */}
                      <td className="p-3.5 font-mono text-zinc-500">
                        {idx + 1}
                      </td>

                      {/* Photo thumbnail */}
                      <td className="p-3.5">
                        <div className="w-10 h-12 rounded overflow-hidden border border-[#D4AF37] bg-black shrink-0">
                          <img
                            src={u.photoUrl || ''}
                            alt={u.fullName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" fill="%23222"><rect width="40" height="48"/><text x="50%" y="50%" fill="%23999" text-anchor="middle" font-size="8">NO PIC</text></svg>';
                            }}
                          />
                        </div>
                      </td>

                      {/* Permanent KUBER ID */}
                      <td className="p-3.5">
                        <span className="font-mono font-bold text-sm text-[#FFDF73] block">
                          {u.kuberId}
                        </span>
                        <span className="text-[10px] text-zinc-500 block">
                          Scholar #{u.joinNumber}
                        </span>
                      </td>

                      {/* Student info */}
                      <td className="p-3.5">
                        <div className="font-bold text-white text-sm">
                          {u.fullName}
                        </div>
                        <div className="text-zinc-400 text-[11px]">
                          📱 {u.phone}
                        </div>
                        <div className="text-zinc-500 text-[10px]">
                          ✉️ {u.email}
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.plan === '199'
                              ? 'bg-amber-500 text-black font-black'
                              : u.plan === '99'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          ₹{u.plan} Plan
                        </span>
                      </td>

                      {/* UPI Proof & UTR */}
                      <td className="p-3.5">
                        <span className="font-mono font-semibold text-zinc-200 block text-[11px]">
                          {u.upiTxnId}
                        </span>
                        {u.paymentScreenshotUrl && (
                          <button
                            onClick={() => setInspectProofUser(u)}
                            className="text-[10px] text-[#D4AF37] hover:underline flex items-center gap-1 mt-0.5 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" /> View Screenshot
                          </button>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                            isApproved
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                              : isPending
                              ? 'bg-amber-950 text-amber-300 border border-amber-500/40 animate-pulse'
                              : 'bg-rose-950 text-rose-400 border border-rose-500/40'
                          }`}
                        >
                          {isApproved && <CheckCircle className="w-3 h-3" />}
                          {isPending && <Clock className="w-3 h-3" />}
                          {isRejected && <XCircle className="w-3 h-3" />}
                          {u.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                        {isPending && (
                          <>
                            <button
                              onClick={() => handleApprove(u.kuberId)}
                              title="Approve and Issue ID"
                              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(u.kuberId)}
                              title="Reject payment"
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => setInspectCardUser(u)}
                          title="Preview ID Card"
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-[#FFDF73] border border-zinc-700 cursor-pointer"
                        >
                          ID Card
                        </button>

                        <button
                          onClick={() => handleDelete(u.kuberId)}
                          title="Soft Delete"
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECT ID CARD MODAL */}
      {inspectCardUser && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-[#111111] border-2 border-[#D4AF37] rounded-3xl p-6 shadow-2xl my-8">
            <button
              onClick={() => setInspectCardUser(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-royal text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>Dual-Sided Student ID Pass:</span>
              <span className="text-[#FFDF73] font-mono">{inspectCardUser.kuberId}</span>
            </h3>

            <IdCardView user={inspectCardUser} allowDownload={true} />
          </div>
        </div>
      )}

      {/* INSPECT UPI PAYMENT PROOF MODAL */}
      {inspectProofUser && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-[#111111] border-2 border-[#D4AF37] rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setInspectProofUser(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-royal text-base font-bold text-white mb-1">
              UPI Payment Receipt Proof
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Student: <strong className="text-white">{inspectProofUser.fullName}</strong> ({inspectProofUser.kuberId})
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-black border border-zinc-800">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Submitted UPI UTR</span>
                <span className="font-mono font-bold text-amber-300 text-base">{inspectProofUser.upiTxnId}</span>
              </div>

              <div className="w-full max-h-80 overflow-y-auto rounded-xl border border-zinc-800 bg-black p-2 flex items-center justify-center">
                <img
                  src={inspectProofUser.paymentScreenshotUrl}
                  alt="Payment Screenshot"
                  className="max-w-full max-h-72 object-contain rounded-lg"
                />
              </div>

              {inspectProofUser.status === 'pending' && (
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      handleApprove(inspectProofUser.kuberId);
                      setInspectProofUser(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    Confirm Match & Approve
                  </button>
                  <button
                    onClick={() => {
                      handleReject(inspectProofUser.kuberId);
                      setInspectProofUser(null);
                    }}
                    className="py-2.5 px-4 rounded-xl font-bold text-xs bg-rose-950 text-rose-300 border border-rose-800"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
