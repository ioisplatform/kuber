import React from 'react';
import { KuberLogo } from './KuberLogo';
import { generateQRCodeDataUri } from '../utils/qr';
import { ShieldCheck, Phone, Mail, MapPin, QrCode, Sparkles, CheckCircle2, Heart, Clock, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const portalUrl = window.location.origin;
  const qrUri = generateQRCodeDataUri(portalUrl, 130);

  return (
    <footer className="bg-[#070707] text-zinc-400 border-t border-[#332A10] pt-14 pb-10" id="kuber-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand & Locked Full Form Column */}
          <div className="md:col-span-4 space-y-4">
            <KuberLogo size="md" onClick={() => onNavigate('home')} />
            
            <div className="p-3 rounded-xl bg-[#111111] border border-[#D4AF37]/30 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#FFDF73] block tracking-wider">
                Full Form (Brand Locked):
              </span>
              <p className="text-xs text-white font-semibold">
                Knowledge Universe for Business, Earning & Rewards
              </p>
              <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 pt-1">
                <span className="text-amber-400 font-bold">धन के देवता:</span>
                <span>Kuber = Dhan ke Devta, every Indian trusts + remembers.</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              KUBER empowers Indian students and aspirants with high-yield exam vaults, permanent non-editable holographic digital IDs, AI resume & prompt tools, and direct UPI student affiliate payouts.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#FFDF73] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Patna, Bihar Student Cell & Exam Grievance Registry
            </div>
          </div>

          {/* Educational Plans & Trust Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-royal font-bold text-white uppercase tracking-wider">
              Scholar Plans & Trust
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('plans')} className="hover:text-amber-300 transition-colors text-left cursor-pointer">
                  <strong className="text-white block">Plan 01: Gyan Dhan (₹29)</strong>
                  <span className="text-[10px] text-zinc-400">₹15 Payout • 101 Qs + ID</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('plans')} className="hover:text-amber-300 transition-colors text-left cursor-pointer">
                  <strong className="text-white block">Plan 02: Rozgar Dhan (₹99)</strong>
                  <span className="text-[10px] text-zinc-400">₹60 Payout • 50 Tests + Cert</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('plans')} className="hover:text-amber-300 transition-colors text-left cursor-pointer">
                  <strong className="text-white block">Plan 03: Maha Dhan (₹199)</strong>
                  <span className="text-[10px] text-[#FFDF73]">₹120 Payout • VIP Universe</span>
                </button>
              </li>
              <li className="pt-2 border-t border-zinc-900">
                <button onClick={() => onNavigate('trust')} className="text-[#FFDF73] hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Trust & Student Protection →
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('verify')} className="text-emerald-400 hover:underline cursor-pointer">
                  Public ID Verification Registry →
                </button>
              </li>
            </ul>
          </div>

          {/* Student Helpline & Payment Verification */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-royal font-bold text-white uppercase tracking-wider">
              Student Helpdesk & UPI
            </h5>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 uppercase font-bold">Official UPI Account</div>
                <div className="font-mono font-bold text-[#FFDF73] text-xs">8877490845@spicepay</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Payee: Vikas Kumar (VERIFIED)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">+91 8877490845</span>
                  <span className="text-[10px] text-zinc-500">WhatsApp • 10 AM – 7 PM IST</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-mono block">ioisplatform@gmail.com</span>
                  <span className="text-[10px] text-zinc-500">Official Support Email</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-[11px] text-zinc-400">Kankarbagh, Opp. Rajendra Nagar Terminal, Patna — 800020</span>
              </li>
            </ul>
          </div>

          {/* Official QR Code Box & Turnaround */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end">
            <div className="p-3 rounded-xl bg-gradient-to-b from-[#181818] to-[#0A0A0A] border border-[#D4AF37]/50 shadow-lg text-center flex flex-col items-center w-full">
              <div className="w-22 h-22 p-1 rounded-lg bg-white border border-[#D4AF37] mb-2">
                <img src={qrUri} alt="Official Kuber QR" className="w-full h-full object-contain" />
              </div>
              <span className="text-[10px] font-bold text-[#FFDF73] flex items-center gap-1">
                <QrCode className="w-3 h-3 text-[#D4AF37]" /> Official Portal QR
              </span>
              <span className="text-[9px] text-zinc-500 font-mono mt-0.5">
                Scan to Verify / Share
              </span>
            </div>
          </div>
        </div>

        {/* Turnaround Notice Banner */}
        <div className="my-6 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>
              <strong>UPI Payment Turnaround:</strong> UPI payments sent to <code className="text-[#FFDF73] font-mono">8877490845@spicepay</code> are verified manually between 8:00 AM and 10:00 PM within 15–30 minutes. If delayed past 2 hours, please submit your UTR in the helpdesk.
            </span>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="text-xs text-[#D4AF37] font-bold hover:underline shrink-0 cursor-pointer"
          >
            Submit UTR →
          </button>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} KUBER — Knowledge Universe for Business, Earning & Rewards. Patna, Bihar.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <button onClick={() => onNavigate('trust')} className="hover:text-amber-300 transition-colors cursor-pointer">
              Trust & Safety
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-amber-300 transition-colors cursor-pointer">
              Patna Student Cell
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('verify')} className="hover:text-amber-300 transition-colors cursor-pointer">
              Verify ID Pass
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
