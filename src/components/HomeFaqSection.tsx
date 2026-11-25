import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, TrendingUp, HelpCircle, QrCode, ArrowRight } from 'lucide-react';
import { PlanType } from '../types';

interface HomeFaqItem {
  id: string;
  topic: 'verification' | 'rewards';
  question: string;
  answer: string;
}

const HOME_FAQ_ITEMS: HomeFaqItem[] = [
  {
    id: 'how-id-verify',
    topic: 'verification',
    question: 'How does KUBER Student ID verification work?',
    answer:
      'Every KUBER ID card carries a tamper-proof QR code linked to our Public Identity Verification Registry. Scanning the QR code or entering the permanent ID (e.g., KUBER29RK01, KUBER99AK15, KUBER199VK01) on the Verify ID page immediately confirms the student’s photo, plan tier, and official approval status.',
  },
  {
    id: 'id-permanent',
    topic: 'verification',
    question: 'Is my KUBER ID permanent and non-editable?',
    answer:
      'Yes. Once generated in our cloud registry using the format KUBER[PLAN][INITIALS][JOIN_NO], your KUBER ID is atomically locked for lifetime validity. It cannot be edited or duplicated, ensuring full credibility for libraries, study circles, and exam verification.',
  },
  {
    id: 'utr-approval-time',
    topic: 'verification',
    question: 'How long does it take for my ID status to become "Verified Official"?',
    answer:
      'UPI payments sent to 8877490845@spicepay (Payee: Vikas Kumar) are verified manually between 8:00 AM and 10:00 PM IST within 15–30 minutes (under 15 minutes for Maha Dhan ₹199 priority queue). Until approved, you can preview your provisional pass in your dashboard.',
  },
  {
    id: 'referral-slabs',
    topic: 'rewards',
    question: 'How much do I earn per referral across the ₹29, ₹99, and ₹199 plans?',
    answer:
      'You earn ₹15 for every Gyan Dhan (₹29) referral, ₹60 for every Rozgar Dhan (₹99) referral, and ₹120 for every Maha Dhan VIP (₹199) referral—returning over 50–60% directly to students.',
  },
  {
    id: 'reward-credit-timing',
    topic: 'rewards',
    question: 'When and how are referral rewards credited to my account?',
    answer:
      'As soon as a friend registers via your referral link (or enters your KUBER ID) and their 12-digit UPI UTR is approved by the Patna Student Cell, your referral count and ₹ earnings balance update automatically in your Dashboard for direct UPI settlement.',
  },
  {
    id: 'royal-invite-link',
    topic: 'rewards',
    question: 'What happens when a friend opens my personal KUBER invitation link?',
    answer:
      'Opening your link (https://ioisplatform.github.io/kuber/?ref=YOUR_ID) displays a 5-second Royal Kuber Invitation greeting with your name and KUBER ID, and automatically pre-fills your referral code in their registration form so your reward is never missed.',
  },
];

interface HomeFaqSectionProps {
  onNavigate: (page: string) => void;
  onSelectPlan: (plan: PlanType) => void;
}

export const HomeFaqSection: React.FC<HomeFaqSectionProps> = ({ onNavigate, onSelectPlan }) => {
  const [topicFilter, setTopicFilter] = useState<'all' | 'verification' | 'rewards'>('all');
  const [openId, setOpenId] = useState<string | null>('how-id-verify');

  const visibleItems =
    topicFilter === 'all'
      ? HOME_FAQ_ITEMS
      : HOME_FAQ_ITEMS.filter((item) => item.topic === topicFilter);

  return (
    <section
      id="home-faq"
      className="py-20 bg-[#0A0A0A] border-b border-zinc-900"
      aria-labelledby="home-faq-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Heading */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#FFDF73] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Quick Clarity Before You Enroll</span>
          </div>
          <h2 id="home-faq-heading" className="font-royal text-3xl sm:text-4xl font-bold text-white">
            ID Verification &amp; <span className="gold-gradient-text">Referral Rewards</span> FAQs
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Everything students ask about permanent KUBER ID authenticity, manual UPI approval, and direct referral payouts.
          </p>
        </div>

        {/* Topic Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Homepage FAQ topics">
          {[
            { id: 'all' as const, label: 'All Questions' },
            { id: 'verification' as const, label: 'ID Verification' },
            { id: 'rewards' as const, label: 'Referral Rewards' },
          ].map((tab) => {
            const active = topicFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setTopicFilter(tab.id);
                  const first =
                    tab.id === 'all'
                      ? HOME_FAQ_ITEMS[0]
                      : HOME_FAQ_ITEMS.find((i) => i.topic === tab.id);
                  if (first) setOpenId(first.id);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black border-[#FFDF73] shadow-[0_0_16px_rgba(212,175,55,0.25)]'
                    : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {visibleItems.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `home-faq-panel-${item.id}`;
            const triggerId = `home-faq-trigger-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-gradient-to-b from-[#181409] to-[#0F0F0F] border-[#D4AF37]/70 shadow-[0_6px_26px_rgba(212,175,55,0.12)]'
                    : 'bg-[#101010] border-zinc-800/90 hover:border-zinc-700'
                }`}
              >
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                        isOpen
                          ? 'bg-amber-500/15 border-[#D4AF37]/40'
                          : 'bg-zinc-900 border-zinc-800'
                      }`}
                    >
                      {item.topic === 'verification' ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-[#FFDF73]" />
                      )}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-bold leading-snug ${
                        isOpen ? 'text-[#FFDF73]' : 'text-zinc-100'
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#FFDF73]' : 'text-zinc-500'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="px-5 pb-5 pt-0 pl-16 text-xs sm:text-[13px] text-zinc-300 leading-relaxed"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Strip */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('verify')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-[#FFDF73] border border-[#D4AF37]/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Test Live ID Verification Registry</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectPlan('99')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black hover:brightness-105 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Enroll &amp; Unlock Referral Link</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
