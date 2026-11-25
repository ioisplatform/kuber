import React, { useState } from 'react';
import { KuberUser } from '../types';
import { generateQRCodeDataUri } from '../utils/qr';
import { downloadIdCard } from '../utils/idCardGenerator';
import {
  Download,
  ShieldCheck,
  Clock,
  AlertTriangle,
  QrCode,
  Sparkles,
  RotateCw,
  Building2,
  Phone,
  Mail,
  CheckCircle2,
} from 'lucide-react';

interface IdCardViewProps {
  user: KuberUser;
  allowDownload?: boolean;
}

export const IdCardView: React.FC<IdCardViewProps> = ({ user, allowDownload = true }) => {
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const [downloading, setDownloading] = useState(false);

  const verifyUrl = `${window.location.origin}/?page=verify&id=${user.kuberId}`;
  const qrUri = generateQRCodeDataUri(verifyUrl, 160);

  const handleDownload = async (side: 'front' | 'back') => {
    try {
      setDownloading(true);
      await downloadIdCard(user, side);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloading(false);
    }
  };

  const isApproved = user.status === 'approved';
  const isPending = user.status === 'pending';

  const planLabel =
    user.plan === '199'
      ? 'Maha Dhan (₹199 - VIP)'
      : user.plan === '99'
      ? 'Rozgar Dhan (₹99)'
      : 'Gyan Dhan (₹29)';

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto" id="kuber-student-id-card-container">
      {/* Front / Back Toggle Selector */}
      <div className="flex items-center gap-2 mb-4 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
        <button
          onClick={() => setActiveSide('front')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSide === 'front'
              ? 'bg-[#D4AF37] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <span>Front Side (Identity Pass)</span>
        </button>
        <button
          onClick={() => setActiveSide('back')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeSide === 'back'
              ? 'bg-[#D4AF37] text-black shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <RotateCw className="w-3 h-3" />
          <span>Back Side (Terms & Authenticity)</span>
        </button>
      </div>

      {/* Visual ID Card with luxury metallic gold border and royal accents */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#161616] via-[#0D0D0D] to-[#050505] p-6 sm:p-8 border-2 border-[#D4AF37] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)] transition-all">
        {/* Subtle Watermark Crown */}
        <div className="absolute right-12 top-20 opacity-5 pointer-events-none select-none">
          <svg width="240" height="240" viewBox="0 0 100 100" fill="#D4AF37">
            <path d="M20 70 L80 70 L85 80 L15 80 Z M20 70 L15 35 L35 50 L50 20 L65 50 L85 35 L80 70 Z" />
          </svg>
        </div>

        {activeSide === 'front' ? (
          /* ================= FRONT SIDE ================= */
          <>
            {/* Top Gold Foil Bar */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pb-5 border-b border-[#332A10]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFE79A] to-[#C99827] flex items-center justify-center p-1.5 shadow-md shadow-amber-500/20">
                  <span className="font-royal font-black text-black text-xl">K</span>
                </div>
                <div>
                  <h4 className="font-royal font-bold text-lg text-[#F5D77F] tracking-wide">
                    KUBER
                  </h4>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-300 font-medium">
                    Knowledge Universe for Business, Earning & Rewards
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                    isApproved
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                      : isPending
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                      : 'bg-rose-950/80 text-rose-400 border-rose-500/50'
                  }`}
                >
                  {isApproved && <ShieldCheck className="w-3.5 h-3.5" />}
                  {isPending && <Clock className="w-3.5 h-3.5 animate-pulse" />}
                  {!isApproved && !isPending && <AlertTriangle className="w-3.5 h-3.5" />}
                  {isApproved ? 'Official Verified' : isPending ? 'Pending Approval' : 'Action Required'}
                </span>
              </div>
            </div>

            {/* Middle Body Grid */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 pt-6">
              {/* Student Photo */}
              <div className="sm:col-span-4 flex flex-col items-center sm:items-start">
                <div className="relative w-36 h-44 rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-zinc-900 shadow-lg shadow-black/60">
                  <img
                    src={
                      user.photoUrl ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
                    }
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="120" fill="%23222"><rect width="100" height="120"/><text x="50%" y="50%" fill="%23D4AF37" text-anchor="middle" font-size="14">STUDENT</text></svg>';
                    }}
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent py-1 px-2 text-center">
                    <span className="text-[10px] text-[#FFDF73] font-semibold tracking-wider uppercase">
                      Scholar #{user.joinNumber}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-zinc-400 mt-2 text-center sm:text-left">
                  Reg: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '2025'}
                </span>
              </div>

              {/* Student Details */}
              <div className="sm:col-span-8 flex flex-col justify-between">
                <div>
                  {/* Full Name */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    {user.fullName}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mt-0.5">
                    Registered Scholar & Career Aspirant
                  </p>

                  {/* Permanent KUBER ID Banner */}
                  <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-[#1E190A] to-[#121212] border border-[#D4AF37]/50 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                        Permanent KUBER ID (Non-Editable)
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                        PRIMARY KEY
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-[#FFF2B2] mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {user.kuberId}
                    </div>
                  </div>

                  {/* Grid Metrics */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                        Plan Enrolled
                      </span>
                      <span className="text-sm font-bold text-amber-400 mt-0.5 block">
                        {planLabel}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
                        Pass Validity
                      </span>
                      <span className="text-sm font-bold text-zinc-200 mt-0.5 block">
                        Lifetime Access
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row inside card with QR & Seal */}
                <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 p-1 rounded-lg bg-white border border-[#D4AF37] shrink-0">
                      <img src={qrUri} alt="Verification QR" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#FFDF73] block flex items-center gap-1">
                        <QrCode className="w-3 h-3 text-[#D4AF37]" /> Scan to Verify
                      </span>
                      <span className="text-[10px] text-zinc-400 block font-mono">
                        kuber.edu/verify?id={user.kuberId}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-[#D4AF37] bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                      <Sparkles className="w-3 h-3" /> Royal Gold Seal
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer info within card */}
            <div className="relative z-10 mt-6 pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-2">
              <span>KUBER • Knowledge Universe for Business, Earning & Rewards</span>
              <span className="text-[10px] font-mono text-zinc-400">UID: {user.kuberId}</span>
            </div>
          </>
        ) : (
          /* ================= BACK SIDE ================= */
          <>
            {/* Top Gold Foil Ribbon for Back */}
            <div className="relative z-10 pb-4 border-b border-[#332A10] text-center">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#FFDF73] block">
                KUBER — Knowledge Universe for Business, Earning & Rewards
              </span>
              <p className="text-[11px] text-amber-300/90 font-medium mt-0.5">
                धन के देवता • Every Indian Trusts + Remembers
              </p>
            </div>

            {/* Terms of Membership */}
            <div className="relative z-10 py-5 space-y-3">
              <span className="text-xs uppercase font-bold text-[#F5D77F] tracking-wider block">
                Terms of Membership & Verification Protocol:
              </span>
              <ul className="text-xs text-zinc-300 space-y-2 leading-relaxed list-disc list-inside">
                <li>
                  This pass is non-transferable and registered permanently in the National KUBER Student Registry.
                </li>
                <li>
                  Non-editable KUBER ID <strong className="text-[#FFDF73] font-mono">[{user.kuberId}]</strong> serves as your lifetime unique identifier.
                </li>
                <li>
                  Verify instantly anytime via QR scan on the front or at <span className="text-amber-400">kuber.edu/verify</span>.
                </li>
                <li>
                  Includes full access to question repeat vaults, career AI prompts, and referral reward payouts.
                </li>
              </ul>

              {/* Office Box & Helpline */}
              <div className="mt-4 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#FFDF73] font-bold">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Patna Central Office & Student Assistance Desk:</span>
                </div>
                <p className="text-zinc-300">
                  Kankarbagh Main Road, Opposite Rajendra Nagar Terminal, Patna, Bihar — 800020
                </p>
                <div className="flex flex-wrap items-center gap-4 text-zinc-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> +91 94701 XXXXX
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> support@kuber.edu.in
                  </span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400">Official UPI: <code className="text-[#FFDF73]">8877490845@spicepay</code></span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Payee: Vikas Kumar (VERIFIED)
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Seal & Controller signature */}
            <div className="relative z-10 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
              <div className="text-zinc-400 text-[11px]">
                Valid throughout Indian Railways, SSC, & Academic Hubs.
              </div>
              <div className="text-right">
                <span className="text-[#D4AF37] font-royal font-bold block text-xs">
                  CONTROLLER OF REGISTRY
                </span>
                <span className="text-[10px] text-zinc-400 italic">KUBER Academic Board</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Download Action Controls */}
      {allowDownload && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 w-full">
          <button
            onClick={() => handleDownload('front')}
            disabled={downloading}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#AA820A] text-black hover:opacity-95 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-black" />
            {downloading ? 'Rendering...' : 'Download Front (PNG)'}
          </button>

          <button
            onClick={() => handleDownload('back')}
            disabled={downloading}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            {downloading ? 'Rendering...' : 'Download Back (PNG)'}
          </button>

          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Verify Registry
          </a>
        </div>
      )}
    </div>
  );
};
