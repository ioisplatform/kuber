import React from 'react';
import { KUBER_PLANS } from '../data/plans';
import { PlanType } from '../types';
import { KuberRoyalInvitation } from '../components/KuberRoyalInvitation';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Sparkles,
  ArrowRight,
  Check,
  X,
  FileText,
  Users,
  TrendingUp,
  CreditCard,
  QrCode,
  MapPin,
  ChevronRight,
  Zap,
  CheckCircle2,
  Crown,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Shield,
} from 'lucide-react';

interface HomePageProps {
  onSelectPlan: (plan: PlanType) => void;
  onNavigate: (page: string) => void;
  referredBy?: string;
  referrerName?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectPlan,
  onNavigate,
  referredBy,
  referrerName,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white" id="kuber-home-page">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-[#332A10]">
        {/* Ambient Gold Radial Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#D4AF37]/10 via-[#FFDF73]/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Royal Kuber Welcome & Personal Invitation Banner */}
          <KuberRoyalInvitation
            variant="hero"
            referredBy={referredBy}
            referrerName={referrerName}
            onAcceptInvitation={(plan) => onSelectPlan(plan || '99')}
          />

          {/* Top Royal Pill with Full Form */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-950/60 to-zinc-900 border border-[#D4AF37]/40 text-[#FFDF73] text-xs font-bold uppercase tracking-wider mb-4 shadow-md shadow-black">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            KUBER • Knowledge Universe for Business, Earning & Rewards
          </div>

          {/* Main Title */}
          <h1 className="font-royal text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            KUBER - <span className="gold-gradient-text">Gyan Dhan</span> &{' '}
            <span className="gold-gradient-text">Rozgar Dhan</span>
          </h1>

          {/* Subtitle with Devta Reference */}
          <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal">
            <strong className="text-[#FFDF73]">Dhan ke Devta</strong> — Empowering Patna, Bihar & Indian aspirants with permanent non-editable student IDs, authentic exam question vaults, and high-payout referral rewards.
          </p>

          {/* Key Metric Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-zinc-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Fixed Lifetime KUBER ID</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              <span>Verified UPI: 8877490845@spicepay</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Patna Railway & SSC Exam Approved</span>
            </div>
          </div>

          {/* 3 Featured Plan Cards Side-by-Side in Hero */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left" id="plans">
            {KUBER_PLANS.map((plan) => {
              const isPopular = plan.id === '99';
              const isVIP = plan.id === '199';

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl overflow-hidden p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                    isVIP
                      ? 'bg-gradient-to-b from-[#221B0A] via-[#141208] to-[#0A0A0A] border-2 border-[#FFE28A] shadow-[0_10px_40px_rgba(255,223,115,0.25)]'
                      : isPopular
                      ? 'bg-gradient-to-b from-[#18150B] via-[#0E0E0E] to-[#0A0A0A] border-2 border-[#D4AF37] shadow-[0_10px_35px_rgba(212,175,55,0.2)]'
                      : 'bg-gradient-to-b from-[#141414] to-[#0A0A0A] border border-zinc-800 hover:border-zinc-700 shadow-xl'
                  }`}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#FFDF73] font-bold">
                      {plan.hindiName}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded ${
                        isVIP
                          ? 'bg-gradient-to-r from-[#FFDF73] to-[#AA820A] text-black shadow-md'
                          : isPopular
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {isVIP && <Crown className="w-3 h-3 inline mr-1" />}
                      {plan.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-royal text-2xl font-bold text-white">
                      {plan.name}
                    </h3>
                    <div className="text-[11px] text-zinc-400 font-medium mt-0.5">
                      {plan.accessLevel}
                    </div>

                    {/* Price Block */}
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-royal text-4xl sm:text-5xl font-black text-[#FFDF73] drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                        ₹{plan.price}
                      </span>
                      <span className="text-[10px] uppercase text-zinc-400 font-semibold">
                        One-Time • Lifetime
                      </span>
                    </div>

                    {/* Affiliate Payout Banner */}
                    <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-[#181818] border border-[#332A10] flex items-center justify-between text-xs">
                      <span className="text-zinc-400 text-[11px]">Affiliate Payout:</span>
                      <strong className="text-emerald-400 font-mono font-bold">
                        ₹{plan.payoutAmount} / Referral
                      </strong>
                    </div>

                    <p className="mt-2 text-xs text-zinc-400 leading-normal">
                      {plan.tagline}
                    </p>

                    <div className="my-5 border-t border-zinc-800"></div>

                    {/* Highlights List */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                        Core Access:
                      </span>
                      {plan.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
                          <div className="w-4 h-4 rounded-full bg-amber-500/20 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="line-clamp-2">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Join Button */}
                  <div className="mt-8 pt-4 border-t border-zinc-800/80">
                    <button
                      onClick={() => onSelectPlan(plan.id)}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isVIP || isPopular
                          ? 'bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#AA820A] text-black hover:opacity-95 shadow-[0_4px_20px_rgba(212,175,55,0.3)]'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                      }`}
                    >
                      <span>Join {plan.name} (₹{plan.price})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-center text-zinc-500 mt-2 font-mono">
                      Format: KUBER{plan.price}XX01
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Patna Student Cell Trust Banner in Hero */}
        <div className="max-w-5xl mx-auto px-4 mt-12">
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#181408] via-zinc-950 to-[#121212] border-2 border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-[#FFDF73] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Student Helpdesk: +91 8877490845 (Patna Student Cell)
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    10 AM – 7 PM IST
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Official Support Email: <span className="text-[#FFDF73] font-mono">ioisplatform@gmail.com</span> • UPI payments to <span className="text-white font-mono">8877490845@spicepay</span> verified within 15–30 mins.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => onNavigate('trust')}
                className="flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-[#FFDF73] border border-amber-500/40 cursor-pointer transition-colors"
              >
                Trust & Safety →
              </button>
              <a
                href="https://wa.me/918877490845?text=Namaste%20KUBER%20Support%2C%20I%20need%20help%20with%20my%20Student%20ID."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 shadow-md transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & PROTECTION PILLARS */}
      <section className="py-16 bg-[#0E0E0E] border-b border-zinc-900" id="trust-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FFDF73] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Student Protection & Legitimacy
            </span>
            <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white mt-2">
              Why Indian Students & Parents Trust KUBER
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Every payment, ID card, and study resource is audited under strict institutional governance from Patna, Bihar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-amber-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#D4AF37] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">15–30 Min Manual UPI Audit</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                UPI payments sent to <code className="text-[#FFDF73] font-mono">8877490845@spicepay</code> are verified manually between 8:00 AM and 10:00 PM within 15–30 minutes. If delayed past 2 hours, our Patna team resolves it instantly.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="text-xs font-bold text-[#FFDF73] hover:underline flex items-center gap-1 cursor-pointer pt-1"
              >
                Submit Delayed UTR →
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">Dedicated Patna Student Cell</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct phone and WhatsApp helpline (+91 8877490845, 10 AM – 7 PM IST) located at Kankarbagh Main Road, Opp. Rajendra Nagar Terminal, Patna. No chatbot loops.
              </p>
              <a
                href="https://wa.me/918877490845?text=Namaste%20Patna%20Student%20Cell%2C%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1 pt-1"
              >
                Chat on WhatsApp Now →
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 hover:border-amber-500/40 transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#FFDF73] flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">Permanent Non-Editable ID Registry</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every generated student ID is locked on cloud Firestore with cryptographic QR verification. Verified by exam coordinators, study libraries, and student councils.
              </p>
              <button
                onClick={() => onNavigate('verify')}
                className="text-xs font-bold text-[#FFDF73] hover:underline flex items-center gap-1 cursor-pointer pt-1"
              >
                Test ID Verification Registry →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY KUBER SECTION */}
      <section className="py-20 bg-[#0A0A0A] border-b border-zinc-900" id="why-kuber">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FFDF73]">
              The Royal Academic Standard
            </span>
            <h2 className="font-royal text-3xl sm:text-4xl font-bold text-white mt-2">
              Why Indian Students Trust KUBER
            </h2>
            <p className="text-zinc-400 text-sm mt-3">
              Traditional coachings charge ₹5,000 to ₹15,000 for study materials. KUBER equips every student with an official immutable digital identity and exam-cracking resources at ₹29, ₹99, and ₹199.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#D4AF37]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#D4AF37] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-white">Permanent KUBER ID</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Format KUBER[PLAN][INITIALS][NO] e.g. KUBER29RK01, KUBER99AK15. Non-editable, stored securely on Firestore, providing lifetime verification across India.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#D4AF37]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#D4AF37] flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-white">10-Year Repeated Qs</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Curated by senior faculties from Musallahpur Haat & Boring Road Patna. Only questions that have appeared at least 3+ times in RRB & SSC.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#D4AF37]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#D4AF37] flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-white">AI Career Tools</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Built-in AI Resume Builder and 100+ prompt templates for ChatGPT/Gemini to learn speed math, mnemonics, and mock interviews.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#D4AF37]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#D4AF37] flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-white">Student Affiliate Payout</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Empowering students to fund their study expenses. Earn ₹15 (Plan 29), ₹60 (Plan 99), or ₹120 (Plan 199) with direct UPI tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPARISON TABLE: FREE VS KUBER */}
      <section className="py-20 bg-[#0C0C0C] border-b border-[#332A10]" id="comparison">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FFDF73]">
              Transparent Honest Comparison
            </span>
            <h2 className="font-royal text-3xl font-bold text-white mt-2">
              Free Telegram / YouTube vs KUBER Ecosystem
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Why thousands of Bihar students choose KUBER over unorganized pirated material
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-[#0F0F0F] shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/80 text-xs uppercase tracking-wider">
                  <th className="p-4 sm:p-5 font-bold text-zinc-400">Feature / Standard</th>
                  <th className="p-4 sm:p-5 font-bold text-zinc-500">Unorganized Free Groups</th>
                  <th className="p-4 sm:p-5 font-bold text-[#FFDF73] bg-amber-950/20 border-l border-r border-[#D4AF37]/30">
                    KUBER Ecosystem (₹29 / ₹99 / ₹199)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-xs sm:text-sm">
                {[
                  {
                    feature: 'Permanent Lifetime Student ID (Non-Editable)',
                    free: 'No Identity Provided',
                    kuber: 'Official Gold-Bordered Holographic Pass (KUBER... ID)',
                  },
                  {
                    feature: 'Instant Public QR Verification',
                    free: 'None (Zero Legitimacy)',
                    kuber: 'Instant Public Tamper-Proof QR Scan & Registry',
                  },
                  {
                    feature: 'Dual-Sided HD Printable ID Pass',
                    free: 'Not Available',
                    kuber: 'HD Front & Back PNG Cards with Official Terms',
                  },
                  {
                    feature: '101 Repeat Railway Questions with Answers',
                    free: 'Blurry Phone Screenshots',
                    kuber: 'Categorized, Verified Solutions & Explanations',
                  },
                  {
                    feature: 'AI Resume & 100+ Prompt Bank',
                    free: 'None',
                    kuber: 'Interactive in-browser AI tool + Prompts',
                  },
                  {
                    feature: 'Student Referral Affiliate Payouts',
                    free: '₹0 (Only Ads & Spam)',
                    kuber: '₹15 / ₹60 / ₹120 per joiner direct to UPI',
                  },
                  {
                    feature: 'Accountability & Support Desk',
                    free: 'Unknown Anonymous Admins',
                    kuber: 'Patna Central Desk + WhatsApp Grievance Cell',
                  },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-900/40">
                    <td className="p-4 sm:p-5 font-semibold text-zinc-300">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-500 flex items-center gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{row.free}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-zinc-100 bg-amber-950/10 border-l border-r border-[#D4AF37]/20 font-medium">
                      <div className="flex items-center gap-2 text-[#FFDF73]">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />
                        <span>{row.kuber}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. STUDENT TESTIMONIALS */}
      <section className="py-20 bg-[#0A0A0A] border-b border-zinc-900" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-[#FFDF73]">
              From Aspirants to Achievers
            </span>
            <h2 className="font-royal text-3xl font-bold text-white mt-2">
              Patna Student Success Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-200 text-black font-bold flex items-center justify-center font-mono">
                  RK
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Rahul Kumar</h4>
                  <p className="text-[11px] text-amber-400 font-mono">KUBER29RK01 • Patna</p>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "The ₹29 Gyan Dhan plan gave me exactly what is asked in ALP Science repeat questions. The ID card looks royal and got approved in 15 mins by UPI UTR verification."
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-200 text-black font-bold flex items-center justify-center font-mono">
                  AK
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Aryan Kumar</h4>
                  <p className="text-[11px] text-emerald-400 font-mono">KUBER99AK15 • Gaya</p>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "Rozgar Dhan's 50 mock papers and AI interview tools boosted my confidence for NTPC. Plus I earned ₹300 referring 5 friends from my study circle!"
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-200 text-black font-bold flex items-center justify-center font-mono">
                  VK
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Vikas Kumar</h4>
                  <p className="text-[11px] text-[#FFDF73] font-mono">KUBER199VK01 • Bhagalpur</p>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "Maha Dhan ₹199 VIP gave me access to the entire KUBER Universe. The ₹120 referral reward helped me fund my own exam form fees!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-16 bg-gradient-to-b from-[#141208] to-[#0A0A0A] border-b border-[#332A10] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-royal text-3xl sm:text-4xl font-black text-white">
            Claim Your Permanent KUBER ID Today
          </h2>
          <p className="text-sm text-zinc-400 mt-3 max-w-xl mx-auto">
            Join the official student universe. Starting at just ₹29 with lifetime validity and direct UPI verified enrollment.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onSelectPlan('29')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#AA820A] text-black hover:opacity-95 shadow-[0_4px_25px_rgba(212,175,55,0.3)] cursor-pointer"
            >
              Enroll Now (₹29 / ₹99 / ₹199)
            </button>
            <button
              onClick={() => onNavigate('verify')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 cursor-pointer"
            >
              Verify An Existing Student ID →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
