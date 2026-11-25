import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, MessageSquare, Clock, CreditCard, Award } from 'lucide-react';

export interface FaqItem {
  id: string;
  category: 'upi' | 'plans' | 'payouts';
  question: string;
  answer: string;
  highlight?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'upi-turnaround',
    category: 'upi',
    question: 'How long does manual UPI payment verification take?',
    answer:
      'All UPI payments sent to 8877490845@spicepay (Payee: Vikas Kumar) are audited manually by our Patna Student Cell between 8:00 AM and 10:00 PM IST. Standard verification takes 15–30 minutes (under 15 minutes for Maha Dhan ₹199 priority queue).',
    highlight: 'If your verification is delayed past 2 hours, use the Delayed UTR Fast-Track tab above.',
  },
  {
    id: 'wrong-utr',
    category: 'upi',
    question: 'What if I entered the wrong 12-digit UTR or forgot my payment screenshot?',
    answer:
      'Do not worry—your fee is 100% protected. Simply switch to the "Delayed UTR Fast-Track" tab on this page or message +91 8877490845 on WhatsApp with your KUBER ID, registered mobile number, and payment receipt screenshot for instant reconciliation.',
  },
  {
    id: 'kuber-id-permanent',
    category: 'plans',
    question: 'Is my KUBER Student ID permanent, and can it be verified publicly?',
    answer:
      'Yes. Once generated, your KUBER ID (e.g., KUBER29RK01) is permanently locked in our cloud registry with lifetime validity and a tamper-proof QR code. Anyone—including libraries, exam centers, or peers—can verify its authenticity on our Verify ID page.',
  },
  {
    id: 'plan-differences',
    category: 'plans',
    question: 'What is the difference between Gyan Dhan (₹29), Rozgar Dhan (₹99), and Maha Dhan (₹199)?',
    answer:
      'Gyan Dhan (₹29) unlocks 101 high-frequency Railway repeat questions, your holographic KUBER ID card, the AI Resume Builder, and ₹15/referral payouts. Rozgar Dhan (₹99) adds 50 full-length mock papers, a Gold-Seal Achievement Certificate, 100+ AI prompts, the interview/medical video vault, and ₹60/referral payouts. Maha Dhan (₹199) unlocks everything plus 500+ business prompts, a VIP Gold Fellow ID, <15-min priority approval, reseller rights, and ₹120/referral payouts.',
  },
  {
    id: 'referral-payouts',
    category: 'payouts',
    question: 'How and when do I receive my ₹15 / ₹60 / ₹120 student referral payouts?',
    answer:
      'Whenever a friend registers using your KUBER ID / referral link and their UPI UTR is approved, your referral reward (₹15 for Plan 29, ₹60 for Plan 99, or ₹120 for Plan 199) is credited directly to your registered UPI ID on our verified settlement cycle.',
  },
  {
    id: 'official-channels',
    category: 'upi',
    question: 'How can I be sure I am paying and chatting with the official Patna Student Cell?',
    answer:
      'KUBER accepts payments exclusively via UPI ID 8877490845@spicepay (Payee Name: Vikas Kumar). Our only official Student Helpdesk WhatsApp/Phone is +91 8877490845 (10 AM – 7 PM IST), official email is ioisplatform@gmail.com, and our central desk is at Kankarbagh Main Road, Opp. Rajendra Nagar Terminal, Patna — 800020.',
  },
];

const CATEGORIES: { id: 'all' | 'upi' | 'plans' | 'payouts'; label: string }[] = [
  { id: 'all', label: 'All Questions' },
  { id: 'upi', label: 'UPI & Verification' },
  { id: 'plans', label: 'KUBER ID & Plans' },
  { id: 'payouts', label: 'Referral Payouts' },
];

interface FaqSectionProps {
  onFastTrackUtr?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onFastTrackUtr }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'upi' | 'plans' | 'payouts'>('all');
  const [openId, setOpenId] = useState<string | null>('upi-turnaround');

  const filteredItems =
    activeCategory === 'all'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const getCategoryIcon = (category: FaqItem['category']) => {
    switch (category) {
      case 'upi':
        return <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />;
      case 'plans':
        return <Award className="w-4 h-4 text-[#FFDF73] shrink-0" />;
      case 'payouts':
        return <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />;
    }
  };

  return (
    <section
      id="kuber-faq-section"
      className="pt-8 border-t border-zinc-900 space-y-6"
      aria-labelledby="faq-section-heading"
    >
      {/* Header & Category Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#FFDF73] text-[11px] font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Instant Answers</span>
          </div>
          <h2 id="faq-section-heading" className="font-royal text-2xl sm:text-3xl font-bold text-white">
            Frequently Asked <span className="gold-gradient-text">Student Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
            Quick answers on UPI verification turnaround, permanent KUBER IDs, plan benefits, and direct referral payouts.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="FAQ categories">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const firstMatch =
                    cat.id === 'all'
                      ? FAQ_ITEMS[0]
                      : FAQ_ITEMS.find((item) => item.category === cat.id);
                  if (firstMatch) setOpenId(firstMatch.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black border-[#FFDF73] shadow-[0_0_14px_rgba(212,175,55,0.25)]'
                    : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Collapsible Accordion Cards */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `faq-panel-${item.id}`;
          const buttonId = `faq-trigger-${item.id}`;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-gradient-to-b from-[#17140B] to-[#101010] border-[#D4AF37]/70 shadow-[0_4px_24px_rgba(212,175,55,0.12)]'
                  : 'bg-[#111111] border-zinc-800/90 hover:border-zinc-700'
              }`}
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                      isOpen
                        ? 'bg-amber-500/15 border-[#D4AF37]/40'
                        : 'bg-zinc-900 border-zinc-800'
                    }`}
                  >
                    {getCategoryIcon(item.category)}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-bold leading-snug transition-colors ${
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
                  aria-labelledby={buttonId}
                  className="px-5 pb-5 pt-0 pl-16 space-y-3 text-xs text-zinc-300 leading-relaxed"
                >
                  <p>{item.answer}</p>

                  {item.highlight && (
                    <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-[11px] text-amber-200 font-medium">
                        <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{item.highlight}</span>
                      </div>
                      {onFastTrackUtr && (
                        <button
                          type="button"
                          onClick={onFastTrackUtr}
                          className="text-[11px] font-bold text-[#FFDF73] hover:underline shrink-0 text-left sm:text-right cursor-pointer"
                        >
                          Open UTR Fast-Track ↑
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Helpdesk Fallback Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <strong className="text-white block">Still have a question not listed above?</strong>
            <span className="text-zinc-400 text-[11px]">
              Connect directly with our Patna Student Cell Coordinator (+91 8877490845, 10 AM – 7 PM IST).
            </span>
          </div>
        </div>
        <a
          href="https://wa.me/918877490845?text=Namaste%20Patna%20Student%20Cell%2C%20I%20have%20a%20question%20about%20KUBER."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Ask on WhatsApp →</span>
        </a>
      </div>
    </section>
  );
};
