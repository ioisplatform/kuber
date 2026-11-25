import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  Lock,
  FileCheck,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Send,
  Building,
} from 'lucide-react';

interface TrustPageProps {
  onNavigateToPlans: () => void;
  onNavigateToVerify: () => void;
}

export const TrustPage: React.FC<TrustPageProps> = ({ onNavigateToPlans, onNavigateToVerify }) => {
  const [utrNumber, setUtrNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [kuberId, setKuberId] = useState('');
  const [submittedUtr, setSubmittedUtr] = useState(false);

  const handleUtrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber.trim()) return;

    const message = `Namaste Patna Student Cell, my UPI payment verification is pending past 2 hours.\n\nUTR / Ref No: ${utrNumber.trim()}\nPhone: ${phone.trim() || 'N/A'}\nKUBER ID: ${kuberId.trim() || 'Pending Generation'}\n\nPlease expedite verification.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918877490845?text=${encoded}`, '_blank');
    setSubmittedUtr(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] text-white" id="kuber-trust-page">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#FFDF73] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Student Trust, Legitimacy & Transparency
          </div>

          <h1 className="font-royal text-3xl sm:text-5xl font-extrabold text-white">
            Trust & Student <span className="gold-gradient-text">Protection Guarantee</span>
          </h1>

          <p className="text-sm font-semibold text-[#FFDF73]">
            Knowledge Universe for Business, Earning & Rewards (KUBER)
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Every Indian student deserves complete transparency, instant support, and zero fraud. 
            Here is our complete policy, official verified banking details, manual audit timeline, and Patna assistance hotline.
          </p>
        </div>

        {/* Official Banking & Helpdesk Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1A150B] via-[#101010] to-[#1A150B] border-2 border-[#D4AF37] shadow-[0_10px_40px_rgba(212,175,55,0.15)] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#FFDF73] block">
              Official Verified Banking Credentials
            </span>
            <div className="p-4 rounded-2xl bg-black/80 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Official UPI ID:</span>
                <code className="text-sm font-mono font-bold text-[#FFDF73]">8877490845@spicepay</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Account Payee:</span>
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Vikas Kumar (VERIFIED)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Banking Security:</span>
                <span className="text-xs text-emerald-400 font-semibold">NPCI / BHIM 256-Bit Encrypted</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
              <strong>Official Turnaround Commitment:</strong> UPI payments sent to <code className="text-white font-mono font-bold">8877490845@spicepay</code> are verified manually between <strong>8:00 AM and 10:00 PM within 15–30 minutes</strong>. If delayed past 2 hours, submit your UTR in the resolver below.
            </div>
          </div>

          {/* Right Helpdesk Card */}
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
                  Patna Student Assistance Cell
                </span>
                <h3 className="font-royal text-lg font-bold text-white mt-0.5">
                  Direct Student Helpdesk
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  Helpline & WhatsApp: <strong className="text-white">+91 8877490845</strong> (10 AM – 7 PM IST)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  Official Support Email: <strong className="text-white">ioisplatform@gmail.com</strong>
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-zinc-400">
                  Headquarters: Kankarbagh Main Rd, Opp. Rajendra Nagar Terminal, Patna, Bihar — 800020
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href="https://wa.me/918877490845?text=Namaste%20Patna%20Student%20Cell%2C%20I%20need%20help%20regarding%20my%20KUBER%20Platform%20registration."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp →</span>
              </a>
              <a
                href="tel:+918877490845"
                className="py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-zinc-700"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call Helpline</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Legitimacy */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs uppercase font-bold text-[#FFDF73] tracking-widest">
              Institutional Governance
            </span>
            <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white mt-1">
              4 Pillars That Guarantee Complete Safety
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-royal text-base font-bold text-white">
                1. Immutable Student Pass
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Your ID format <code className="text-[#FFDF73]">KUBER[PLAN][INITIALS][JOIN_NO]</code> is cryptographically locked upon enrollment. It cannot be altered, forged, or duplicated by anyone.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-royal text-base font-bold text-white">
                2. 15–30 Min Manual Audit
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero automated bots skimming transactions. Every 12-digit UTR is reconciled against verified bank credit statements by the Patna staff between 8 AM and 10 PM.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-royal text-base font-bold text-white">
                3. 100% Refund Guarantee
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                If payment was deducted twice due to bank server failure or duplicate submission, we guarantee 100% refund back to your source UPI within 24 hours. No questions asked.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-royal text-base font-bold text-white">
                4. Public QR Verification
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every issued ID pass has an encoded QR code linked directly to the public registry. Anyone scanning the card sees immediate verified authenticity status.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive UTR Fast-Track Resolver Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#18150B] via-[#101010] to-[#0A0A0A] border-2 border-amber-500/50 shadow-2xl">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FFDF73]">
              Payment Issue Resolver
            </span>
            <h3 className="font-royal text-2xl font-bold text-white">
              UPI Payment Delayed Past 2 Hours? Fast-Track It Here
            </h3>
            <p className="text-xs text-zinc-400">
              If you have already paid to <strong className="text-white">8877490845@spicepay</strong> and your account has not been activated within 2 hours, enter your 12-digit UTR below for priority manual escalation.
            </p>
          </div>

          <form onSubmit={handleUtrSubmit} className="max-w-xl mx-auto space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                12-Digit UPI UTR / Transaction Ref No. *
              </label>
              <input
                type="text"
                required
                maxLength={18}
                placeholder="e.g. 509482716390"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value.trim())}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm font-mono font-bold text-[#FFDF73] focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Your Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Permanent KUBER ID (If received)
                </label>
                <input
                  type="text"
                  placeholder="e.g. KUBER29RK01"
                  value={kuberId}
                  onChange={(e) => setKuberId(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white font-mono uppercase focus:border-[#D4AF37] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit & Fast-Track on WhatsApp Desk (+91 8877490845)</span>
            </button>

            {submittedUtr && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs text-center">
                ✓ Priority ticket created! If WhatsApp did not open automatically, contact <strong>+91 8877490845</strong> with your UTR.
              </div>
            )}
          </form>
        </div>

        {/* Step-by-Step Verification Flow */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs uppercase font-bold text-[#FFDF73] tracking-widest">
              Standard Operating Procedure
            </span>
            <h2 className="font-royal text-2xl font-bold text-white mt-1">
              How Your KUBER Student Credential is Authenticated
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2 relative">
              <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-royal text-sm font-bold text-white">Enrollment & UPI</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Student fills legal name, uploads passport photo, and transfers ₹29 / ₹99 / ₹199 to official UPI <code className="text-[#FFDF73]">8877490845@spicepay</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-royal text-sm font-bold text-white">Atomic ID Minting</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                System assigns non-editable sequential join number and permanent KUBER ID format in database immediately.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-royal text-sm font-bold text-white">Bank Statement Audit</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Patna administrator checks UPI UTR against SpicePay bank ledger between 8 AM and 10 PM (average 15–30 mins).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <span className="w-7 h-7 rounded-full bg-emerald-500 text-black font-bold text-xs flex items-center justify-center">
                4
              </span>
              <h4 className="font-royal text-sm font-bold text-white">Holographic Pass Issued</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Official seal activates. Student downloads front & back PNG ID card, opens exam vaults, and starts earning affiliate payouts.
              </p>
            </div>
          </div>
        </div>

        {/* Quick CTA Bottom */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-royal text-lg font-bold text-white">
              Ready to Secure Your Official KUBER ID Pass?
            </h4>
            <p className="text-xs text-zinc-400">
              Join thousands of Bihar aspirants preparing for Railway, SSC, and state exams with verified credentials.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToPlans}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black font-bold text-xs hover:opacity-95 cursor-pointer"
            >
              Choose Plan (From ₹29)
            </button>
            <button
              onClick={onNavigateToVerify}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs border border-zinc-700 cursor-pointer"
            >
              Verify An Existing ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
