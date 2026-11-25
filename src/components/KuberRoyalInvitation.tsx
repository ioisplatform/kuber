import React from 'react';
import { Crown, Sparkles, ArrowRight, ShieldCheck, Share2 } from 'lucide-react';
import { KuberUser, PlanType } from '../types';

interface KuberRoyalInvitationProps {
  variant: 'hero' | 'dashboard';
  referredBy?: string;
  referrerName?: string;
  user?: KuberUser;
  onAcceptInvitation?: (plan?: PlanType) => void;
  onOpenReferralStudio?: () => void;
}

export const KuberRoyalInvitation: React.FC<KuberRoyalInvitationProps> = ({
  variant,
  referredBy,
  referrerName,
  user,
  onAcceptInvitation,
  onOpenReferralStudio,
}) => {
  if (variant === 'dashboard' && user) {
    const tierTitle =
      user.plan === '199'
        ? 'Maha Dhan Rajdoot (VIP)'
        : user.plan === '99'
        ? 'Rozgar Dhan Scholar'
        : 'Gyan Dhan Initiate';

    return (
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1A1406] via-[#0F0D07] to-[#1A1406] border border-[#D4AF37]/60 p-5 sm:p-6 shadow-[0_8px_32px_rgba(212,175,55,0.14)]">
        {/* Top subtle metallic highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFF0B3]/70 to-transparent"
        />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFF0B3] via-[#D4AF37] to-[#8A670D] text-black flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.35)]">
              <Crown className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-black tracking-[0.16em] text-[#FFDF73]">
                  🚩 श्री कुबेर जी का राज-आशीर्वाद • Royal Welcome
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 border border-[#D4AF37]/40 text-[#FFDF73] font-bold">
                  {tierTitle}
                </span>
              </div>

              <h2 className="font-royal text-base sm:text-lg font-bold text-white leading-snug">
                आयुष्मान भव, <span className="gold-gradient-text">{user.fullName}</span>! स्वयं धन के देवता कुबेर आपके ज्ञान-कोष में आपका स्वागत करते हैं।
              </h2>

              <p className="text-xs text-zinc-300/90 leading-relaxed max-w-3xl">
                आपका स्थायी राज-परिचय पत्र (<strong className="text-[#FFDF73] font-mono">{user.kuberId}</strong>) सक्रिय है। ज्ञान अर्जित करें और अपने मित्रों को भी कुबेर के इस पवित्र आमंत्रण से जोड़कर सीधे UPI पुरस्कार प्राप्त करें।
              </p>
            </div>
          </div>

          {onOpenReferralStudio && (
            <button
              onClick={onOpenReferralStudio}
              className="w-full lg:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#FFF0B3] via-[#D4AF37] to-[#AA820A] text-black hover:brightness-105 transition-all shadow-[0_4px_18px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Send Kuber Invitation (Earn ₹15–₹120)</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Hero Welcome & Personal Referral Invitation Scroll
  const hasReferral = Boolean(referredBy && referredBy.trim().length > 0);

  return (
    <div
      className={`relative max-w-4xl mx-auto mb-8 rounded-3xl overflow-hidden text-left transition-all ${
        hasReferral
          ? 'bg-gradient-to-br from-[#241B07] via-[#120F07] to-[#0A0A0A] border-2 border-[#FFE073] shadow-[0_12px_45px_rgba(212,175,55,0.28)]'
          : 'bg-gradient-to-br from-[#191408] via-[#0F0D08] to-[#0A0A0A] border border-[#D4AF37]/50 shadow-[0_10px_35px_rgba(212,175,55,0.14)]'
      }`}
    >
      {/* Top & Bottom Gold Hairline Shimmer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFF4BE] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#D4AF37]/10 blur-3xl"
      />

      <div className="p-5 sm:p-7 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#FFF4BE] via-[#D4AF37] to-[#8A670D] text-black flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(255,223,115,0.4)]">
            <Crown className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase font-black tracking-[0.14em] px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-[#D4AF37]/50 text-[#FFDF73]">
                <Sparkles className="w-3 h-3 text-[#FFE073]" />
                {hasReferral
                  ? 'श्री कुबेर का विशेष राज-आमंत्रण • VIP Referral Invitation'
                  : 'स्वयं कुबेर का दिव्य स्वागत • Royal Kuber Invocation'}
              </span>

              {hasReferral && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
                  <ShieldCheck className="w-3 h-3" />
                  Invited By: {referrerName ? `${referrerName} (${referredBy})` : referredBy}
                </span>
              )}
            </div>

            <h2 className="font-royal text-base sm:text-xl font-bold text-white leading-snug">
              {hasReferral ? (
                <>
                  “आयुष्मान भव, विद्यार्थी! स्वयं <span className="gold-gradient-text">धन के देवता कुबेर</span> आपको अपने ज्ञान एवं समृद्धि कोष में आमंत्रित करते हैं।”
                </>
              ) : (
                <>
                  “स्वागतम्, भावी विजेता! स्वयं <span className="gold-gradient-text">कुबेर</span> आपको ज्ञान, रोजगार और समृद्धि के राजकोष में पधारने का आमंत्रण देते हैं।”
                </>
              )}
            </h2>

            <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">
              {hasReferral
                ? `Scholar ${referrerName || referredBy} has extended KUBER's Royal Seal to you. Claim your permanent non-editable KUBER ID, unlock exam-cracking vaults, and join India's trusted scholar prosperity guild.`
                : 'Step into the Knowledge Universe for Business, Earning & Rewards. Claim your permanent golden student identity, master Railway & SSC exams, and unlock direct ₹15–₹120 UPI referral blessings.'}
            </p>
          </div>
        </div>

        {onAcceptInvitation && (
          <div className="w-full md:w-auto shrink-0 flex flex-col items-stretch md:items-end gap-1.5">
            <button
              onClick={() => onAcceptInvitation('99')}
              className="px-5 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#FFF4BE] via-[#D4AF37] to-[#AA820A] text-black hover:brightness-105 active:scale-95 transition-all shadow-[0_6px_24px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{hasReferral ? 'Accept Royal Invitation' : 'Enter Kuber Vault'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-center md:text-right text-[#FFDF73]/80 font-medium">
              {hasReferral ? `Referral Code ${referredBy} Auto-Applied` : 'Starts at ₹29 • Lifetime ID'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
