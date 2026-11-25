import React, { useState } from 'react';
import { KuberUser } from '../types';
import { IdCardView } from '../components/IdCardView';
import { CertificateView } from '../components/CertificateView';
import { ResumeBuilderModal } from '../components/ResumeBuilderModal';
import { StudyMaterialModal } from '../components/StudyMaterialModal';
import { PromptsAndVideosModal } from '../components/PromptsAndVideosModal';
import { KuberRoyalInvitation } from '../components/KuberRoyalInvitation';
import { buildReferralUrl } from '../utils/portalUrl';
import { generateQRCodeDataUri } from '../utils/qr';
import {
  ShieldCheck,
  Clock,
  AlertTriangle,
  Award,
  BookOpen,
  FileText,
  Sparkles,
  Share2,
  Copy,
  Check,
  Download,
  Video,
  DollarSign,
  TrendingUp,
  User,
  ArrowUpRight,
  Crown,
} from 'lucide-react';

interface DashboardPageProps {
  user: KuberUser;
  onRefreshUser?: () => void;
  onNavigateToPlans?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, onRefreshUser, onNavigateToPlans }) => {
  const [activeTab, setActiveTab] = useState<'idcard' | 'study' | 'certificate' | 'referral'>('idcard');
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showStudyModal, setShowStudyModal] = useState(false);
  const [studyInitialTab, setStudyInitialTab] = useState<'questions' | 'papers'>('questions');
  const [showPromptsModal, setShowPromptsModal] = useState(false);
  const [promptsInitialTab, setPromptsInitialTab] = useState<'prompts' | 'videos'>('prompts');
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedInviteMsg, setCopiedInviteMsg] = useState(false);

  const referralUrl = buildReferralUrl(user.kuberId);
  const referralQrUri = generateQRCodeDataUri(referralUrl, 160);
  const isApproved = user.status === 'approved';
  const hasCertificate = user.plan === '99' || user.plan === '199';
  const isPlan199 = user.plan === '199';

  const royalInviteMessage = `🚩 *श्री कुबेर का दिव्य ज्ञान एवं समृद्धि आमंत्रण* 👑

स्वयं *धन के देवता कुबेर (KUBER)* एवं मैं (*${user.fullName}* • ID: *${user.kuberId}*) आपको भारत के सबसे विश्वसनीय विद्यार्थी राजकोष — *KUBER Knowledge Universe* में सादर आमंत्रित करते हैं!

✨ *आपको क्या मिलेगा:*
• स्थायी एवं गैर-परिवर्तनीय *KUBER गोल्डन ID कार्ड*
• *101 रेलवे रिपीट प्रश्न* + *50 फुल मॉक टेस्ट पेपर्स*
• *AI रिज्यूमे बिल्डर* एवं *100+ करियर प्रॉम्प्ट्स*
• मात्र ₹29 / ₹99 / ₹199 (आजीवन सदस्यता) और हर रेफरल पर *₹15 से ₹120* सीधा UPI पुरस्कार!

🌟 *कुबेर का विशेष आमंत्रण स्वीकार करें:*
${referralUrl}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const copyRoyalInviteMessage = () => {
    navigator.clipboard.writeText(royalInviteMessage);
    setCopiedInviteMsg(true);
    setTimeout(() => setCopiedInviteMsg(false), 2200);
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(royalInviteMessage);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const refCount = user.referralCount || 0;
  const guildTier =
    refCount >= 25
      ? { name: 'Maha Dhan Rajdoot', nextTarget: 25, nextName: 'Apex Royal Crown' }
      : refCount >= 10
      ? { name: 'Kuber Ratna', nextTarget: 25, nextName: 'Maha Dhan Rajdoot' }
      : refCount >= 3
      ? { name: 'Dhan Mitra', nextTarget: 10, nextName: 'Kuber Ratna' }
      : { name: 'Navaratna Shishya', nextTarget: 3, nextName: 'Dhan Mitra' };
  const tierProgressPct = Math.min(100, Math.round((refCount / guildTier.nextTarget) * 100));

  const getPlanBadge = () => {
    if (user.plan === '199') return 'Maha Dhan VIP (₹199)';
    if (user.plan === '99') return 'Rozgar Dhan (₹99)';
    return 'Gyan Dhan (₹29)';
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] text-white" id="kuber-student-dashboard">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Royal Kuber Personal Welcome Greeting */}
        <KuberRoyalInvitation
          variant="dashboard"
          user={user}
          onOpenReferralStudio={() => setActiveTab('referral')}
        />

        {/* Top Student Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#17140B] via-[#101010] to-[#17140B] border-2 border-[#D4AF37] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#D4AF37] bg-black shrink-0 shadow-lg">
              <img
                src={user.photoUrl || ''}
                alt={user.fullName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="%23222"><rect width="80" height="80"/><text x="50%" y="50%" fill="%23D4AF37" text-anchor="middle" font-size="14">ID</text></svg>';
                }}
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 text-[#FFDF73] border border-amber-500/30 flex items-center gap-1">
                  {isPlan199 && <Crown className="w-3 h-3 text-[#D4AF37]" />}
                  {getPlanBadge()}
                </span>
                <span
                  className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1 border ${
                    isApproved
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                      : 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                  }`}
                >
                  {isApproved ? <ShieldCheck className="w-3 h-3" /> : <Clock className="w-3 h-3 animate-spin" />}
                  {isApproved ? 'Verified Official' : 'Payment Under Review'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1.5 font-royal">
                {user.fullName}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-zinc-400 mt-1">
                <span>📱 {user.phone}</span>
                <span>•</span>
                <span>✉️ {user.email}</span>
                <span>•</span>
                <span>Scholar #{user.joinNumber}</span>
              </div>
            </div>
          </div>

          {/* Immutable KUBER ID Highlight Box */}
          <div className="p-4 rounded-xl bg-black/80 border border-[#D4AF37] text-center shrink-0 w-full md:w-auto">
            <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">
              Permanent KUBER ID
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-black text-[#FFF2B2] tracking-widest block mt-0.5">
              {user.kuberId}
            </span>
            <span className="text-[9px] text-zinc-500 block mt-0.5">
              Non-Editable • Verified Credential
            </span>
          </div>
        </div>

        {/* Pending Banner Notice if not approved yet */}
        {!isApproved && (
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/50 text-amber-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
              <div>
                <strong>Payment Verification In Progress:</strong> Your UPI UTR ({user.upiTxnId}) is being verified by the Patna administrator. You can view your provisional ID card and explore study materials below.
              </div>
            </div>
            {onRefreshUser && (
              <button
                onClick={onRefreshUser}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 shrink-0 text-xs"
              >
                Check Status
              </button>
            )}
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
          <button
            onClick={() => setActiveTab('idcard')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center gap-2 ${
              activeTab === 'idcard'
                ? 'bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md'
                : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Official ID Pass
          </button>

          <button
            onClick={() => setActiveTab('study')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center gap-2 ${
              activeTab === 'study'
                ? 'bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md'
                : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Study Vault & Tools
          </button>

          {hasCertificate && (
            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center gap-2 ${
                activeTab === 'certificate'
                  ? 'bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800'
              }`}
            >
              <Award className="w-4 h-4" /> Official Certificate
            </button>
          )}

          <button
            onClick={() => setActiveTab('referral')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center gap-2 ${
              activeTab === 'referral'
                ? 'bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md'
                : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Referral & Earnings (₹{user.totalEarnings || 0})
          </button>
        </div>

        {/* TAB 1: ID CARD */}
        {activeTab === 'idcard' && (
          <div className="space-y-6">
            <IdCardView user={user} allowDownload={true} />

            {/* If Plan 29, offer upgrade */}
            {user.plan === '29' && onNavigateToPlans && (
              <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-gradient-to-r from-[#17140B] to-[#0E0E0E] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-royal text-sm font-bold text-[#FFDF73]">
                    Upgrade to Rozgar Dhan (₹99) or Maha Dhan (₹199 VIP)
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Unlock 50 Full Exam Mock Papers, Verified Academic Certificate, 100 AI Prompts & Higher Referral Payouts!
                  </p>
                </div>
                <button
                  onClick={onNavigateToPlans}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#D4AF37] text-black hover:bg-[#FFDF73] shrink-0"
                >
                  View Plans
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: STUDY VAULT & TOOLS */}
        {activeTab === 'study' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: 101 Railway Repeat Questions */}
              <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Core Curriculum
                  </span>
                  <h3 className="font-royal text-lg font-bold text-white mt-1">
                    101 Railway Repeat Qs
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    10-Year high frequency questions from RRB NTPC & Group D with instant trick explanations in Hindi & English.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setStudyInitialTab('questions');
                    setShowStudyModal(true);
                  }}
                  className="mt-6 w-full py-2.5 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-[#D4AF37] hover:text-black text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Open 101 Questions Vault
                </button>
              </div>

              {/* Card 2: AI Resume & Career Builder */}
              <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#D4AF37] transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    AI Career Tool
                  </span>
                  <h3 className="font-royal text-lg font-bold text-white mt-1">
                    AI Resume Builder
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Craft modern job-ready resumes for Railway, SSC, apprenticeships, and private corporate openings.
                  </p>
                </div>
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="mt-6 w-full py-2.5 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-[#D4AF37] hover:text-black text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" /> Launch Resume Builder
                </button>
              </div>

              {/* Card 3: 50 Full Exam Papers */}
              <div
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  hasCertificate
                    ? 'bg-zinc-900/90 border-zinc-800 hover:border-[#D4AF37]'
                    : 'bg-zinc-950/60 border-zinc-800/60 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    {!hasCertificate && (
                      <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        Rozgar / Maha Dhan
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Exam Papers
                  </span>
                  <h3 className="font-royal text-lg font-bold text-white mt-1">
                    50 Full Practice Papers
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Comprehensive practice test papers covering Math, General Intelligence, Science & Current Affairs.
                  </p>
                </div>
                {hasCertificate ? (
                  <button
                    onClick={() => {
                      setStudyInitialTab('papers');
                      setShowStudyModal(true);
                    }}
                    className="mt-6 w-full py-2.5 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-[#D4AF37] hover:text-black text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Access 50 Mock Papers
                  </button>
                ) : (
                  <div className="mt-6 text-center text-xs text-zinc-500">
                    Upgrade to Plan 99/199 to unlock 50 mock papers
                  </div>
                )}
              </div>

              {/* Card 4: 100 AI Prompts */}
              <div
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  hasCertificate
                    ? 'bg-zinc-900/90 border-zinc-800 hover:border-[#D4AF37]'
                    : 'bg-zinc-950/60 border-zinc-800/60 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    {!hasCertificate && (
                      <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        Rozgar / Maha Dhan
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    AI Study Prompts
                  </span>
                  <h3 className="font-royal text-lg font-bold text-white mt-1">
                    100+ AI Study Prompts
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Copy-paste prompts for ChatGPT & Gemini to create custom flashcards, mock quizzes, and study schedules.
                  </p>
                </div>
                {hasCertificate ? (
                  <button
                    onClick={() => {
                      setPromptsInitialTab('prompts');
                      setShowPromptsModal(true);
                    }}
                    className="mt-6 w-full py-2.5 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-[#D4AF37] hover:text-black text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> View AI Prompts Library
                  </button>
                ) : (
                  <div className="mt-6 text-center text-xs text-zinc-500">
                    Upgrade to Plan 99/199 for 100 AI Prompts
                  </div>
                )}
              </div>

              {/* Card 5: Interview Masterclasses */}
              <div
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  hasCertificate
                    ? 'bg-zinc-900/90 border-zinc-800 hover:border-[#D4AF37]'
                    : 'bg-zinc-950/60 border-zinc-800/60 opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Video className="w-5 h-5" />
                    </div>
                    {!hasCertificate && (
                      <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        Rozgar / Maha Dhan
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Video Training
                  </span>
                  <h3 className="font-royal text-lg font-bold text-white mt-1">
                    Interview & Medical Videos
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    RRB Document Verification checklist, medical vision criteria, and mock interview guidance lessons.
                  </p>
                </div>
                {hasCertificate ? (
                  <button
                    onClick={() => {
                      setPromptsInitialTab('videos');
                      setShowPromptsModal(true);
                    }}
                    className="mt-6 w-full py-2.5 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-[#D4AF37] hover:text-black text-zinc-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" /> Watch Video Lessons
                  </button>
                ) : (
                  <div className="mt-6 text-center text-xs text-zinc-500">
                    Upgrade to Plan 99/199 for Video Lessons
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CERTIFICATE */}
        {activeTab === 'certificate' && hasCertificate && (
          <CertificateView user={user} />
        )}

        {/* TAB 4: STUDENT REFERRAL & EARNINGS */}
        {activeTab === 'referral' && (
          <div className="space-y-6">
            {/* Referral Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <span className="text-xs uppercase font-bold text-zinc-400 block">
                  Total Friends Referred
                </span>
                <div className="text-3xl sm:text-4xl font-royal font-black text-white mt-2">
                  {user.referralCount || 0}
                </div>
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  Aspirants enrolled via your link
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <span className="text-xs uppercase font-bold text-zinc-400 block">
                  Total Referral Earnings
                </span>
                <div className="text-3xl sm:text-4xl font-royal font-black text-[#FFDF73] mt-2">
                  ₹{user.totalEarnings || 0}
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold mt-1 block flex items-center gap-1">
                  <Check className="w-3 h-3" /> Credited via Direct UPI
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <span className="text-xs uppercase font-bold text-zinc-400 block">
                  Payout Commission Slab
                </span>
                <div className="text-sm font-bold text-white mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs text-zinc-300">Plan 01 (₹29):</span>
                    <strong className="text-amber-400">₹15 / Student</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-zinc-300">Plan 02 (₹99):</span>
                    <strong className="text-amber-400">₹60 / Student</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-zinc-300">Plan 03 (₹199 VIP):</span>
                    <strong className="text-[#FFDF73]">₹120 / Student</strong>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500 mt-2 block">
                  Over 50-60% commission directly back to students!
                </span>
              </div>
            </div>

            {/* Royal Kuber Guild Rank & Prosperity Progress */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#1A1508] via-[#100E08] to-[#1A1508] border border-[#D4AF37]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#FFDF73]" />
                  <span className="text-[11px] uppercase font-black tracking-widest text-[#FFDF73]">
                    Kuber Guild Rank: {guildTier.name}
                  </span>
                </div>
                <p className="text-xs text-zinc-300">
                  {refCount >= 25
                    ? 'You have reached the highest Maha Dhan Rajdoot royal rank!'
                    : `Invite ${guildTier.nextTarget - refCount} more scholar(s) to unlock the "${guildTier.nextName}" royal title.`}
                </p>
              </div>
              <div className="w-full md:w-64 space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-zinc-400">Progress</span>
                  <span className="text-[#FFDF73] font-mono">
                    {refCount} / {guildTier.nextTarget} Scholars
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#AA820A] via-[#D4AF37] to-[#FFF0B3] transition-all duration-500"
                    style={{ width: `${Math.max(8, tierProgressPct)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Shareable Royal Invitation Studio (Link + Scannable QR + Royal Message) */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#18150B] to-[#0D0D0D] border-2 border-[#D4AF37] space-y-6 shadow-[0_12px_40px_rgba(212,175,55,0.12)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left: Official Live Referral Link & Actions */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-[#FFDF73] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      श्री कुबेर का राज-आमंत्रण स्टूडियो • Official Live Referral Link
                    </span>
                    <h3 className="font-royal text-xl sm:text-2xl font-bold text-white mt-1">
                      Invite Friends as KUBER&apos;s Official Ambassador
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Every friend who joins via your live <strong className="text-zinc-200">ioisplatform.github.io/kuber</strong> link receives a royal welcome from Lord Kuber with your ID pre-applied, crediting ₹15, ₹60, or ₹120 straight to your account upon verification.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      readOnly
                      value={referralUrl}
                      aria-label="Your Official KUBER Referral Link"
                      className="w-full bg-black/80 border border-[#D4AF37]/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#FFDF73] font-mono outline-none"
                    />

                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                      <button
                        onClick={copyReferralLink}
                        className="flex-1 sm:flex-none px-4 py-3 rounded-xl font-bold text-xs bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#D4AF37]" />}
                        {copiedRef ? 'Copied Link!' : 'Copy Link'}
                      </button>

                      <button
                        onClick={shareOnWhatsApp}
                        className="flex-1 sm:flex-none px-5 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-900/30"
                      >
                        <Share2 className="w-4 h-4" />
                        Send Royal Invite
                      </button>
                    </div>
                  </div>

                  {/* Royal Invitation Preview Scroll */}
                  <div className="p-4 rounded-xl bg-black/60 border border-[#D4AF37]/30 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#FFDF73] uppercase tracking-wider">
                        Royal Invitation Message Preview (Hindi + English)
                      </span>
                      <button
                        onClick={copyRoyalInviteMessage}
                        className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedInviteMsg ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedInviteMsg ? 'Royal Message Copied!' : 'Copy Full Message'}</span>
                      </button>
                    </div>
                    <pre className="text-[11px] text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed bg-zinc-950/80 p-3 rounded-lg border border-zinc-800/80">
                      {royalInviteMessage}
                    </pre>
                  </div>
                </div>

                {/* Right: Scannable Royal Invitation QR Pass */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-[#141108] to-black border border-[#D4AF37]/50 text-center space-y-3">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#FFDF73]">
                    Scan to Accept Kuber Invite
                  </span>
                  <div className="p-2.5 rounded-xl bg-white border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                    <img
                      src={referralQrUri}
                      alt={`Referral QR for ${user.kuberId}`}
                      className="w-36 h-36 object-contain"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-mono font-black text-[#FFDF73] tracking-wider">
                      {user.kuberId}
                    </div>
                    <p className="text-[10px] text-zinc-400">
                      Friends scan this QR in libraries or study circles to open your live invite directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      <ResumeBuilderModal
        user={user}
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      />

      <StudyMaterialModal
        isOpen={showStudyModal}
        onClose={() => setShowStudyModal(false)}
        initialTab={studyInitialTab}
        plan={user.plan}
      />

      <PromptsAndVideosModal
        isOpen={showPromptsModal}
        onClose={() => setShowPromptsModal(false)}
        initialTab={promptsInitialTab}
      />
    </div>
  );
};
