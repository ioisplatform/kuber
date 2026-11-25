import React from 'react';
import { KUBER_PLANS } from '../data/plans';
import { PlanType } from '../types';
import { Check, Sparkles, ArrowRight, ShieldCheck, Award, BookOpen, Star, HelpCircle, Crown, CheckCircle2 } from 'lucide-react';

interface PlansPageProps {
  onSelectPlan: (plan: PlanType) => void;
  onNavigateToVerify: () => void;
}

export const PlansPage: React.FC<PlansPageProps> = ({ onSelectPlan, onNavigateToVerify }) => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] text-white" id="kuber-plans-page">
      <div className="max-w-6xl mx-auto">
        {/* Header with Full Form */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#FFDF73] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Official Transparent Plans • Patna, Bihar
          </div>

          <h1 className="font-royal text-3xl sm:text-5xl font-extrabold text-white">
            Choose Your <span className="gold-gradient-text">KUBER</span> Plan
          </h1>
          <p className="text-sm font-semibold text-[#FFDF73] mt-2">
            Knowledge Universe for Business, Earning & Rewards
          </p>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl mx-auto">
            Kuber = Dhan ke Devta, every Indian trusts + remembers. Lifetime non-editable student identity passes with verifiable credentials & transparent affiliate payouts.
          </p>
        </div>

        {/* 3 Plans Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {KUBER_PLANS.map((plan) => {
            const isPopular = plan.id === '99';
            const isVIP = plan.id === '199';

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl overflow-hidden p-7 flex flex-col justify-between transition-all duration-300 ${
                  isVIP
                    ? 'bg-gradient-to-b from-[#241C0A] via-[#121006] to-[#070707] border-2 border-[#FFE28A] shadow-[0_15px_45px_rgba(255,223,115,0.25)]'
                    : isPopular
                    ? 'bg-gradient-to-b from-[#1B170C] via-[#0E0E0E] to-[#080808] border-2 border-[#D4AF37] shadow-[0_15px_40px_rgba(212,175,55,0.2)]'
                    : 'bg-gradient-to-b from-[#131313] to-[#0A0A0A] border border-zinc-800 shadow-xl'
                }`}
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FFDF73]">
                    {plan.hindiName}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
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

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-royal text-4xl sm:text-5xl font-black text-[#FFDF73] drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                      ₹{plan.price}
                    </span>
                    <span className="text-[10px] uppercase text-zinc-400 font-semibold">
                      One-Time • Lifetime
                    </span>
                  </div>

                  {/* Payout Banner */}
                  <div className="mt-3 p-2.5 rounded-xl bg-[#171717] border border-[#332A10] flex items-center justify-between text-xs">
                    <span className="text-zinc-400 text-[11px]">Affiliate Payout:</span>
                    <strong className="text-emerald-400 font-mono font-bold">
                      ₹{plan.payoutAmount} / Referral
                    </strong>
                  </div>

                  <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="my-5 border-t border-zinc-800"></div>

                  {/* Highlights list */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Everything Included:
                    </span>
                    {plan.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                        <div className="w-4 h-4 rounded-full bg-amber-500/20 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enroll CTA */}
                <div className="mt-8 pt-4 border-t border-zinc-800/80">
                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isVIP || isPopular
                        ? 'bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#AA820A] text-black hover:opacity-95 shadow-[0_4px_25px_rgba(212,175,55,0.3)]'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                    }`}
                  >
                    <span>Enroll in {plan.name} (₹{plan.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-zinc-500 mt-2 font-mono">
                    ID: KUBER{plan.price}[Initials][JoinNo]
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* UPI Verification Info Bar */}
        <div className="mt-14 max-w-2xl mx-auto p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#FFDF73] font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official UPI Payment Gateway</span>
          </div>
          <p className="text-xs text-zinc-300">
            UPI ID: <code className="font-mono font-bold text-[#FFDF73]">8877490845@spicepay</code> • Payee: <strong className="text-white">Vikas Kumar (VERIFIED)</strong>
          </p>
          <div className="pt-1">
            <button
              onClick={onNavigateToVerify}
              className="text-xs text-[#D4AF37] hover:underline inline-flex items-center gap-1"
            >
              Verify An Existing Student ID →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
