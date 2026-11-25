import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, ShieldCheck, Clock } from 'lucide-react';
import { FaqSection } from '../components/FaqSection';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [kuberId, setKuberId] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // UTR Quick Help states
  const [utrNumber, setUtrNumber] = useState('');
  const [activeTab, setActiveTab] = useState<'message' | 'utr'>('message');
  const formCardRef = useRef<HTMLDivElement | null>(null);

  const handleFastTrackUtr = () => {
    setActiveTab('utr');
    formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleUtrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Namaste Patna Student Cell, my UPI payment verification is pending past 2 hours.\n\nUTR No: ${utrNumber.trim()}\nPhone: ${phone.trim() || 'N/A'}\nKUBER ID: ${kuberId.trim() || 'N/A'}\n\nPlease expedite my manual audit.`;
    window.open(`https://wa.me/918877490845?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] text-white" id="kuber-contact-page">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#FFDF73] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Patna Student Assistance & Grievance Cell
          </div>
          <h1 className="font-royal text-3xl sm:text-5xl font-bold text-white mt-1">
            Student <span className="gold-gradient-text">Helpdesk</span> & Support
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
            Need help with UPI payment verification, student ID pass generation, or study material access? Our dedicated Patna team is available directly via Phone, WhatsApp & Email.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Details & Office */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
              <h3 className="font-royal text-lg font-bold text-[#F5D77F]">
                Patna Student Helpdesk
              </h3>

              <div className="space-y-4 text-xs text-zinc-300">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Helpline & WhatsApp</strong>
                    <p className="text-zinc-400 mt-0.5 font-mono text-xs">+91 8877490845 (10 AM – 7 PM IST)</p>
                    <p className="text-[11px] text-zinc-500">Patna Student Cell Coordinator</p>
                    <a
                      href="https://wa.me/918877490845?text=Namaste%20KUBER%20Support%2C%20I%20need%20help%20with%20my%20Student%20ID."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs hover:bg-emerald-600/30 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp →</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-zinc-800">
                  <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Official Support Email</strong>
                    <p className="text-[#FFDF73] mt-0.5 font-mono">ioisplatform@gmail.com</p>
                    <span className="text-[10px] text-zinc-500">Replies within 1–3 business hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-zinc-800">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Central Exam Desk</strong>
                    <p className="text-zinc-400 mt-0.5">
                      Kankarbagh Main Road, Opposite Rajendra Nagar Terminal, Patna, Bihar — 800020
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Verification Advisory & Turnaround notice */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-zinc-950 to-black border border-amber-500/50 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>UPI Payment Turnaround:</span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                UPI payments sent to <code className="text-[#FFDF73] font-mono font-bold">8877490845@spicepay</code> are verified manually between <strong>8:00 AM and 10:00 PM within 15–30 minutes</strong>. If delayed past 2 hours, please submit your UTR here.
              </p>
            </div>
          </div>

          {/* Form Box with Tabs (General Inquiry vs Delayed UTR Resolver) */}
          <div className="md:col-span-7" ref={formCardRef}>
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border-2 border-[#D4AF37]/50 shadow-2xl">
              {/* Tab Selector */}
              <div className="flex rounded-xl bg-zinc-900 p-1 mb-6 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('message')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'message'
                      ? 'bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  General Message
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('utr')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'utr'
                      ? 'bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Delayed UTR Fast-Track</span>
                </button>
              </div>

              {activeTab === 'message' ? (
                submitted ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-royal text-xl font-bold text-white">
                      Ticket Registered Successfully
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      Thank you {name}. Your inquiry has been dispatched to our Patna student desk officer. We will respond via WhatsApp or call (+91 8877490845).
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                    >
                      Send Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="font-royal text-lg font-bold text-[#F5D77F] mb-2">
                      Send a Message to Patna Cell
                    </h3>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#D4AF37] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-zinc-300 block mb-1">Mobile / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#D4AF37] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-zinc-300 block mb-1">KUBER ID (If any)</label>
                        <input
                          type="text"
                          placeholder="e.g. KUBER29RK01"
                          value={kuberId}
                          onChange={(e) => setKuberId(e.target.value.toUpperCase())}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono uppercase placeholder-zinc-500 focus:border-[#D4AF37] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Query / Question *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="How can we assist you with your admission, ID pass, or study material?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-[#D4AF37] outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#AA820A] text-black hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Query to Student Cell</span>
                    </button>
                  </form>
                )
              ) : (
                /* Delayed UTR Resolver */
                <form onSubmit={handleUtrSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-royal text-lg font-bold text-[#F5D77F]">
                      Delayed UTR Priority Escalation
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      If you sent money to <strong className="text-white">8877490845@spicepay</strong> and 2 hours have passed, submit below to trigger immediate priority manual review.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      12-Digit UPI Transaction UTR *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={18}
                      placeholder="e.g. 509482716390"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value.trim())}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm font-mono font-bold text-[#FFDF73] focus:border-[#D4AF37] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#D4AF37] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">KUBER ID (If any)</label>
                      <input
                        type="text"
                        placeholder="e.g. KUBER29RK01"
                        value={kuberId}
                        onChange={(e) => setKuberId(e.target.value.toUpperCase())}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono uppercase focus:border-[#D4AF37] outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Fast-Track on WhatsApp (+91 8877490845) →</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Standalone Collapsible Student FAQ Section */}
        <FaqSection onFastTrackUtr={handleFastTrackUtr} />
      </div>
    </div>
  );
};
