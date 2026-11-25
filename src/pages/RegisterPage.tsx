import React, { useState, useEffect } from 'react';
import { PlanType, KuberUser } from '../types';
import { KUBER_PLANS } from '../data/plans';
import { registerStudent } from '../firebase/db';
import { generateQRCodeDataUri } from '../utils/qr';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Upload,
  Copy,
  Check,
  AlertCircle,
  QrCode,
  Sparkles,
  ArrowRight,
  Clock,
  Camera,
  CreditCard,
  Lock,
  ExternalLink,
  CheckCircle2,
  Users,
  Award,
  Phone,
  MessageSquare,
  Mail,
} from 'lucide-react';

interface RegisterPageProps {
  initialPlan?: PlanType;
  onRegisteredSuccess: (user: KuberUser) => void;
  onNavigateToLogin: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  initialPlan = '29',
  onRegisteredSuccess,
  onNavigateToLogin,
}) => {
  const [plan, setPlan] = useState<PlanType>(initialPlan);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [upiTxnId, setUpiTxnId] = useState('');
  const [referredBy, setReferredBy] = useState('');

  // Image states
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [paymentPreview, setPaymentPreview] = useState<string>('');

  // Status & submission states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [registeredUser, setRegisteredUser] = useState<KuberUser | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [copiedPayee, setCopiedPayee] = useState(false);

  // Official UPI Payment Credentials (VERIFIED)
  const officialUpiId = '8877490845@spicepay';
  const officialPayeeName = 'Vikas Kumar';

  // Check URL query parameters for referral and plan
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    const urlPlan = params.get('plan') as PlanType | null;

    if (ref) {
      setReferredBy(ref.trim().toUpperCase());
    }
    if (urlPlan && (urlPlan === '29' || urlPlan === '99' || urlPlan === '199')) {
      setPlan(urlPlan);
    }
  }, []);

  const selectedPlanDetails = KUBER_PLANS.find((p) => p.id === plan) || KUBER_PLANS[0];

  // Direct UPI Intent String
  const upiPayString = `upi://pay?pa=${officialUpiId}&pn=Vikas%20Kumar&am=${selectedPlanDetails.price}&cu=INR&tn=KUBER%20${selectedPlanDetails.name}%20Pass`;
  const upiQrUri = generateQRCodeDataUri(upiPayString, 210);

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  // Compress image before saving to prevent Firestore limits
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void,
    maxDim: number = 400
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setter(compressedDataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMsg('Please enter your full legal name as per 10th certificate or Aadhaar.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (!photoPreview) {
      setErrorMsg('Please upload your passport student photo for your ID card.');
      return;
    }
    if (!paymentPreview) {
      setErrorMsg(`Please upload your UPI payment screenshot of ₹${selectedPlanDetails.price}.`);
      return;
    }
    if (!upiTxnId.trim() || upiTxnId.trim().length < 6) {
      setErrorMsg('Please enter the 12-digit UPI UTR / Transaction Reference number from your payment receipt.');
      return;
    }

    try {
      setLoading(true);
      const student = await registerStudent({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        plan,
        photoUrl: photoPreview,
        paymentScreenshotUrl: paymentPreview,
        upiTxnId: upiTxnId.trim(),
        referredBy: referredBy.trim() || undefined,
      });

      setRegisteredUser(student);
      onRegisteredSuccess(student);

      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFDF73', '#D4AF37', '#AA820A', '#FFFFFF'],
      });
    } catch (err: any) {
      console.error('Registration failed:', err);
      setErrorMsg(err.message || 'Registration failed. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS STATE (IOIS Confirmation Style)
  if (registeredUser) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="max-w-xl w-full p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#161616] via-[#0E0E0E] to-[#080808] border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.25)] text-center relative overflow-hidden">
          {/* Top Gold Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Registration Submitted Successfully
          </div>

          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white mb-1">
            Welcome to KUBER Universe!
          </h2>
          <p className="text-xs text-zinc-400 mb-6 max-w-md mx-auto">
            Your official lifetime student enrollment request has been registered in the Patna Central Registry.
          </p>

          {/* Non-Editable KUBER ID Banner */}
          <div className="p-5 rounded-2xl bg-[#1A1608] border-2 border-[#D4AF37] text-center my-6 shadow-inner">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block">
              Your Permanent KUBER ID (Non-Editable)
            </span>
            <div className="text-3xl sm:text-4xl font-mono font-black text-[#FFDF73] my-2 tracking-widest">
              {registeredUser.kuberId}
            </div>
            <p className="text-[11px] text-zinc-400">
              Assigned Scholar Join Number: #{registeredUser.joinNumber} • Plan {registeredUser.plan}
            </p>

            <button
              onClick={() => copyToClipboard(registeredUser.kuberId, setCopiedId)}
              className="mt-3 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#D4AF37] hover:bg-[#FFDF73] text-black inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId ? 'Copied ID!' : 'Copy KUBER ID'}</span>
            </button>
          </div>

          {/* Pending Approval Notice */}
          <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-left text-xs space-y-3 text-zinc-300">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>UPI UTR Verification Status: PENDING ADMIN REVIEW</span>
            </div>
            <p className="leading-relaxed text-zinc-300">
              UPI payments sent to <code className="text-[#FFDF73] font-mono font-bold">8877490845@spicepay</code> are verified manually between <strong>8:00 AM and 10:00 PM within 15–30 minutes</strong>. If delayed past 2 hours, please submit your UTR to our Patna Student Cell.
            </p>
            <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2 text-[#FFDF73] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Student Helpdesk (Patna Student Cell)</span>
              </div>
              <div className="text-zinc-400">
                Helpline & WhatsApp: <strong className="text-white">+91 8877490845</strong> (10 AM – 7 PM IST)
              </div>
              <div className="text-zinc-400">
                Official Support Email: <strong className="text-white">ioisplatform@gmail.com</strong>
              </div>
            </div>
            <div className="pt-1">
              <a
                href={`https://wa.me/918877490845?text=Namaste%20Patna%20Student%20Cell%2C%20I%20registered%20with%20KUBER%20ID%20${registeredUser.kuberId}%20and%20UTR%20${registeredUser.upiTxnId}.%20Please%20verify%20my%20payment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp (+91 8877490845) →</span>
              </a>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onNavigateToLogin}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#AA820A] text-black hover:opacity-95 shadow-lg cursor-pointer"
            >
              Proceed to Student Login →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] text-white" id="kuber-register-page">
      <div className="max-w-4xl mx-auto">
        {/* Page Title with Brand Locked Subtitle */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#FFDF73] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Official Student Registration Portal • Patna, Bihar
          </div>

          <h1 className="font-royal text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            Enroll in <span className="gold-gradient-text">KUBER</span>
          </h1>

          {/* Subtitle with Mandatory Full Form */}
          <p className="text-sm font-semibold text-[#FFDF73] mt-1">
            Knowledge Universe for Business, Earning & Rewards
          </p>
          <p className="text-xs text-zinc-400 mt-1 max-w-lg mx-auto">
            Kuber = Dhan ke Devta, every Indian trusts + remembers. Secure your non-editable permanent student identity pass and academic vaults.
          </p>
        </div>

        {/* Step 1: 3-Plan Selection Cards (IOIS Style) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">
              Step 1: Choose Your Scholar Plan
            </span>
            <span className="text-xs text-[#FFDF73] font-semibold">
              Selected: {selectedPlanDetails.name} (₹{selectedPlanDetails.price})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {KUBER_PLANS.map((p) => {
              const isSelected = plan === p.id;
              const isVIP = p.id === '199';
              const isPopular = p.id === '99';

              return (
                <div
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#1C170B] to-[#0F0D06] border-2 border-[#D4AF37] shadow-[0_8px_30px_rgba(212,175,55,0.25)]'
                      : 'bg-[#111111] hover:bg-zinc-900/80 border-zinc-800'
                  }`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        isVIP
                          ? 'bg-amber-500 text-black'
                          : isPopular
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {p.badge}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-zinc-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-royal text-lg font-bold text-white">
                      {p.name}
                    </h3>
                    <div className="text-[11px] text-[#FFDF73] font-medium mt-0.5">
                      {p.accessLevel}
                    </div>

                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="font-royal text-3xl font-black text-[#FFDF73]">
                        ₹{p.price}
                      </span>
                      <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                        One-Time
                      </span>
                    </div>

                    {/* Affiliate Payout Highlight */}
                    <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-[#181818] border border-[#332A10] flex items-center justify-between text-xs">
                      <span className="text-zinc-400 text-[11px]">Referral Payout:</span>
                      <strong className="text-emerald-400 font-mono font-bold">
                        ₹{p.payoutAmount} / Join
                      </strong>
                    </div>

                    {/* Highlights bullets */}
                    <ul className="mt-3 space-y-1.5 text-[11px] text-zinc-300">
                      {p.highlights.slice(0, 3).map((h, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#D4AF37] font-bold">•</span>
                          <span className="line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Form Box: Student Info + Official UPI Payment (IOIS Style) */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#111111] border-2 border-[#D4AF37]/50 shadow-2xl space-y-8">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* SECTION 1: STUDENT PROFILE DETAILS */}
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-800 mb-5">
              <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="font-royal text-base font-bold text-white">
                Student Profile Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Full Legal Name * <span className="text-zinc-500">(Printed on ID Card)</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Email Address * <span className="text-zinc-500">(For PDF Vault Delivery)</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. student@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  WhatsApp / Mobile Number * <span className="text-zinc-500">(10-digit)</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="98XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#D4AF37] outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Secret Student Password * <span className="text-zinc-500">(Min 6 chars for Login)</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="Create your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Referral KUBER ID <span className="text-zinc-500">(Optional if referred)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. KUBER29RK01"
                  value={referredBy}
                  onChange={(e) => setReferredBy(e.target.value.toUpperCase())}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-[#D4AF37] outline-none font-mono uppercase"
                />
              </div>

              {/* Passport Photo Upload */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Student Passport Photo * <span className="text-zinc-500">(For Dual ID Card)</span>
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-zinc-900 border border-dashed border-zinc-700 hover:border-[#D4AF37] rounded-xl cursor-pointer text-xs text-zinc-300 transition-colors">
                    <Camera className="w-4 h-4 text-[#D4AF37]" />
                    <span>{photoPreview ? 'Change Photo' : 'Upload Passport Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setPhotoPreview, 320)}
                    />
                  </label>

                  {photoPreview && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#D4AF37] bg-black shrink-0">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: OFFICIAL UPI PAYMENT VERIFICATION (IOIS Style) */}
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-800 mb-5">
              <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-black font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="font-royal text-base font-bold text-white">
                Official UPI Payment Verification (₹{selectedPlanDetails.price})
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 rounded-2xl bg-gradient-to-b from-[#141414] to-[#0A0A0A] border border-[#D4AF37]/40">
              {/* Left Column: QR Code & Direct Pay */}
              <div className="md:col-span-5 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-2 rounded-2xl bg-white border-2 border-[#D4AF37] shadow-lg shadow-black">
                  <img
                    src={upiQrUri}
                    alt="UPI Payment QR"
                    className="w-44 h-44 object-contain"
                  />
                </div>

                <span className="text-[11px] font-bold text-[#FFDF73] flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5" /> Scan with Any UPI App
                </span>

                <a
                  href={upiPayString}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black text-xs font-bold hover:opacity-95 text-center flex items-center justify-center gap-1.5 shadow-md"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Open GPay / PhonePe / Paytm</span>
                </a>
              </div>

              {/* Right Column: UPI Credentials with Copy Buttons (IOIS Style) */}
              <div className="md:col-span-7 space-y-3.5">
                {/* Official UPI ID Box */}
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    Official Registered UPI ID
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono font-bold text-base text-[#FFDF73]">
                      {officialUpiId}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(officialUpiId, setCopiedUPI)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedUPI ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#D4AF37]" />}
                      <span>{copiedUPI ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Verified Payee Name Box */}
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    Verified Account Payee Name
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white">
                        {officialPayeeName}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        ✓ VERIFIED
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(officialPayeeName, setCopiedPayee)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedPayee ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#D4AF37]" />}
                      <span>{copiedPayee ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Exact Amount Notice */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                  <span className="text-zinc-300 font-medium">Exact Amount Payable:</span>
                  <span className="font-royal font-black text-base text-[#FFDF73]">
                    ₹{selectedPlanDetails.price}
                  </span>
                </div>

                {/* 12-Digit UPI UTR Input */}
                <div>
                  <label className="text-xs font-semibold text-zinc-200 block mb-1">
                    Enter 12-Digit UPI UTR / Ref No. *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={18}
                    placeholder="e.g. 509482716390"
                    value={upiTxnId}
                    onChange={(e) => setUpiTxnId(e.target.value.trim())}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-[#FFDF73] font-mono font-bold placeholder-zinc-600 focus:border-[#D4AF37] outline-none"
                  />
                  <span className="text-[10px] text-zinc-500 block mt-1">
                    Found in Google Pay / PhonePe transaction details as 'UPI Ref ID' or 'UTR'.
                  </span>
                </div>

                {/* Payment Screenshot Upload */}
                <div>
                  <label className="text-xs font-semibold text-zinc-200 block mb-1">
                    Upload Payment Receipt Screenshot *
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-zinc-900 border border-dashed border-zinc-700 hover:border-[#D4AF37] rounded-xl cursor-pointer text-xs text-zinc-300 transition-colors">
                      <Upload className="w-4 h-4 text-[#D4AF37]" />
                      <span>{paymentPreview ? 'Receipt Selected' : 'Upload Receipt Screenshot'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, setPaymentPreview, 500)}
                      />
                    </label>

                    {paymentPreview && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#D4AF37] bg-black shrink-0">
                        <img src={paymentPreview} alt="Receipt" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* UPI Turnaround & Patna Helpdesk Assurance Box */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 via-zinc-900 to-black border border-amber-500/40 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>UPI Payment Turnaround:</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                  15–30 Min Fast Verification
                </span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                UPI payments sent to <code className="text-[#FFDF73] font-mono font-bold">8877490845@spicepay</code> are verified manually between <strong>8:00 AM and 10:00 PM within 15–30 minutes</strong>. If delayed past 2 hours, please submit your UTR to our Patna Student Cell.
              </p>
              <div className="pt-2 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Helpdesk: <strong className="text-white">+91 8877490845</strong> (10 AM – 7 PM IST)</span>
                </div>
                <a
                  href="https://wa.me/918877490845?text=Namaste%20Patna%20Student%20Cell%2C%20I%20am%20filling%20the%20registration%20form%20and%20need%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 font-bold hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp →</span>
                </a>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              id="btn-register-submit"
              className="w-full py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#AA820A] text-black hover:opacity-95 active:scale-[0.99] transition-all shadow-[0_5px_25px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-5 h-5 text-black" />
              <span>
                {loading
                  ? 'Generating Non-Editable KUBER ID...'
                  : `Submit Enrollment for ${selectedPlanDetails.name} (₹${selectedPlanDetails.price})`}
              </span>
            </button>

            <p className="text-center text-[11px] text-zinc-500 mt-3">
              By submitting, your permanent KUBER ID will be generated atomically and recorded in the National Student Registry.
            </p>
          </div>
        </form>

        {/* Bottom Login Switcher */}
        <div className="mt-8 text-center text-xs text-zinc-400">
          Already registered?{' '}
          <button
            onClick={onNavigateToLogin}
            className="text-[#FFDF73] font-bold hover:underline"
          >
            Login with KUBER ID →
          </button>
        </div>
      </div>
    </div>
  );
};
