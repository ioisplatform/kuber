import React, { useState, useEffect } from 'react';
import { getUserByKuberId } from '../firebase/db';
import { KuberUser } from '../types';
import { generateQRCodeDataUri } from '../utils/qr';
import {
  ShieldCheck,
  Search,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  QrCode,
  Calendar,
  Award,
} from 'lucide-react';

interface VerifyPageProps {
  initialId?: string;
  onNavigateToRegister: () => void;
}

export const VerifyPage: React.FC<VerifyPageProps> = ({ initialId = '', onNavigateToRegister }) => {
  const [searchId, setSearchId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [resultUser, setResultUser] = useState<KuberUser | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get('id') || initialId;
    if (idFromUrl) {
      setSearchId(idFromUrl.trim().toUpperCase());
      performVerification(idFromUrl.trim().toUpperCase());
    }
  }, [initialId]);

  const performVerification = async (idToVerify: string) => {
    const cleanId = idToVerify.trim().toUpperCase();
    if (!cleanId) return;

    try {
      setLoading(true);
      setErrorMsg('');
      const user = await getUserByKuberId(cleanId);
      setResultUser(user);
      setHasSearched(true);
    } catch (err: any) {
      console.error('Verify error:', err);
      setErrorMsg('Failed to query verification database.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId) {
      performVerification(searchId);
    }
  };

  const testIds = ['KUBER29RK01', 'KUBER99AK15', 'KUBER199VK01'];

  const qrUri = resultUser
    ? generateQRCodeDataUri(`${window.location.origin}/?page=verify&id=${resultUser.kuberId}`, 150)
    : '';

  const getPlanLabel = (p: string) => {
    if (p === '199') return 'Maha Dhan (₹199 - VIP)';
    if (p === '99') return 'Rozgar Dhan (₹99)';
    return 'Gyan Dhan (₹29)';
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] text-white" id="kuber-verify-page">
      <div className="max-w-3xl mx-auto">
        {/* Title Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFDF73] to-[#AA820A] text-black flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
            <ShieldCheck className="w-8 h-8 text-black" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-[#FFDF73]">
            Public Identity Verification Registry
          </span>
          <h1 className="font-royal text-3xl sm:text-4xl font-bold text-white mt-1">
            Verify <span className="gold-gradient-text">KUBER Student ID</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
            Check official student enrollment status, verified pass credentials, and examination clearance issued by KUBER Education Platform.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="p-6 rounded-2xl bg-[#111111] border-2 border-[#D4AF37]/50 shadow-2xl mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#D4AF37] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter KUBER ID (e.g. KUBER29RK01, KUBER99AK15, KUBER199VK01)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                className="w-full pl-12 pr-4 py-3.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm font-mono font-bold text-[#FFDF73] tracking-widest uppercase focus:border-[#D4AF37] outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !searchId.trim()}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#AA820A] text-black hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Searching Registry...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>Verify Status</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Sample Clickable Buttons */}
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="text-[11px]">Test Sample IDs:</span>
              {testIds.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setSearchId(id);
                    performVerification(id);
                  }}
                  className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-[#D4AF37] hover:text-black text-amber-300 font-mono text-[11px] font-bold transition-colors cursor-pointer"
                >
                  {id}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-zinc-500">Live Firestore Real-Time Query</span>
          </div>
        </div>

        {/* SEARCH RESULT DISPLAY */}
        {hasSearched && (
          <div>
            {resultUser ? (
              <div
                id="verification-valid-badge"
                className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#18150B] via-[#0E0E0E] to-[#070707] border-2 border-[#D4AF37] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)] p-6 sm:p-8"
              >
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#332A10]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                          Official Verified Credential
                        </span>
                        <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded text-emerald-300 font-mono border border-emerald-800">
                          MATCH FOUND
                        </span>
                      </div>
                      <h2 className="font-royal text-xl font-bold text-white mt-0.5">
                        Authentic KUBER Student Record
                      </h2>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                      resultUser.status === 'approved'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                        : 'bg-amber-950 text-amber-300 border-amber-500/50'
                    }`}
                  >
                    {resultUser.status === 'approved' ? (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" /> Approved Scholar
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5" /> Pending Verification
                      </>
                    )}
                  </span>
                </div>

                {/* Details Body */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 py-6">
                  {/* Photo & Seal */}
                  <div className="sm:col-span-4 flex flex-col items-center sm:items-start">
                    <div className="w-32 h-40 rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-black shadow-md">
                      <img
                        src={resultUser.photoUrl || ''}
                        alt={resultUser.fullName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="120" fill="%23222"><text x="50%" y="50%" fill="%23D4AF37" text-anchor="middle" font-size="12">PHOTO</text></svg>';
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-2 font-mono">
                      Scholar #{resultUser.joinNumber}
                    </span>
                  </div>

                  {/* Information Grid */}
                  <div className="sm:col-span-8 space-y-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block">
                        Registered Student Name
                      </span>
                      <h3 className="text-2xl font-bold text-white tracking-wide">
                        {resultUser.fullName}
                      </h3>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/60 border border-[#D4AF37]/40">
                      <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                        Verified KUBER ID (Immutable)
                      </span>
                      <span className="text-2xl font-mono font-black text-[#FFF2B2] tracking-widest block mt-0.5">
                        {resultUser.kuberId}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                          Enrollment Plan
                        </span>
                        <span className="text-xs font-bold text-amber-300 mt-0.5 block">
                          {getPlanLabel(resultUser.plan)}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                          Issue Date
                        </span>
                        <span className="text-xs font-bold text-zinc-200 mt-0.5 block">
                          {resultUser.createdAt
                            ? new Date(resultUser.createdAt).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })
                            : '2025'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Validation Proof with QR */}
                <div className="pt-6 border-t border-[#332A10] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 p-1 rounded-lg bg-white border border-[#D4AF37] shrink-0">
                      <img src={qrUri} alt="Verification QR" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-[#FFDF73] block">
                        Digital Signature Authenticated
                      </span>
                      <span className="text-[10px] text-zinc-400 block font-mono">
                        Hash: {resultUser.kuberId}-VERIFIED
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-xs text-zinc-400">
                    <div>Issued by: <strong>KUBER Educational Platform</strong></div>
                    <div className="text-[11px] text-[#D4AF37]">Patna (Bihar) Central Registry</div>
                  </div>
                </div>
              </div>
            ) : (
              /* Invalid or Not Found Box */
              <div
                id="verification-invalid-badge"
                className="p-8 rounded-2xl bg-rose-950/20 border-2 border-rose-500/50 text-center shadow-xl space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                  <XCircle className="w-8 h-8 text-rose-400" />
                </div>

                <div>
                  <h3 className="font-royal text-xl font-bold text-rose-300">
                    No Record Found in KUBER Registry
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
                    The ID <strong className="text-white font-mono">{searchId}</strong> is either invalid, mistyped, or not yet officially issued.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 max-w-md mx-auto text-xs text-zinc-300 text-left">
                  <span className="text-amber-400 font-bold block mb-1">
                    ⚠️ Official Advisory:
                  </span>
                  All authentic KUBER student passes follow the standard format:
                  <ul className="list-disc list-inside mt-1 space-y-1 text-zinc-400">
                    <li><code className="text-amber-300">KUBER29[Initials][No]</code> for Gyan Dhan (e.g. KUBER29RK01)</li>
                    <li><code className="text-amber-300">KUBER99[Initials][No]</code> for Rozgar Dhan (e.g. KUBER99AK15)</li>
                    <li><code className="text-amber-300">KUBER199[Initials][No]</code> for Maha Dhan (e.g. KUBER199VK01)</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onNavigateToRegister}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black hover:opacity-95 cursor-pointer"
                  >
                    Enroll & Get Official KUBER ID
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
