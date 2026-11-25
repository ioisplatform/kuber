import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, X, Send, Clock, ShieldCheck, Volume2, VolumeX } from 'lucide-react';

const PLACEHOLDER_PHRASES = [
  'Type your question...',
  'Verify my 12-digit UPI UTR...',
  'Ask about ₹29 / ₹99 / ₹199 plans...',
  'Help with my KUBER Student ID...',
];

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const hasPlayedOpenSoundRef = useRef(false);

  const playSound = useCallback(
    (type: 'open' | 'send') => {
      if (isMuted) return;
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;

        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          void ctx.resume();
        }

        const now = ctx.currentTime;

        if (type === 'open') {
          // Subtle two-tone warm concierge ping (E5 -> B5)
          const notes = [
            { freq: 659.25, start: 0, duration: 0.14, peak: 0.055 },
            { freq: 987.77, start: 0.075, duration: 0.2, peak: 0.065 },
          ];
          notes.forEach(({ freq, start, duration, peak }) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + start);

            gain.gain.setValueAtTime(0.0001, now + start);
            gain.gain.exponentialRampToValueAtTime(peak, now + start + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + start);
            osc.stop(now + start + duration + 0.02);
          });
        } else {
          // Crisp upward confirmation pop (G5 -> D6)
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(783.99, now);
          osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.065);

          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.075, now + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.2);
        }
      } catch {
        // Ignore audio errors if blocked by browser policy
      }
    },
    [isMuted]
  );

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen || query.length > 0) return;

    const currentPhrase = PLACEHOLDER_PHRASES[phraseIndex];
    let delay = isDeleting ? 28 : 58;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2000;
    } else if (isDeleting && charIndex === 0) {
      delay = 320;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PLACEHOLDER_PHRASES.length);
        }
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isOpen, query, phraseIndex, charIndex, isDeleting]);

  useEffect(() => {
    if (isOpen) {
      setPhraseIndex(0);
      setCharIndex(0);
      setIsDeleting(false);
    }
  }, [isOpen]);

  const animatedPlaceholder = PLACEHOLDER_PHRASES[phraseIndex].slice(0, charIndex);

  const handleToggleWidget = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (nextOpen && !hasPlayedOpenSoundRef.current) {
      hasPlayedOpenSoundRef.current = true;
      playSound('open');
    }
  };

  const handleStartChat = (customText?: string) => {
    playSound('send');
    const message = customText || query || 'Namaste KUBER Student Cell, I need help regarding my KUBER ID / payment verification.';
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918877490845?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end print:hidden">
      {/* Pop-up Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#111111] border-2 border-[#D4AF37] shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#17140B] via-[#201A0D] to-[#17140B] border-b border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
              </div>
              <div>
                <h4 className="font-royal text-sm font-bold text-white leading-tight">
                  Patna Student Cell
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online • 10 AM – 7 PM IST</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                className="w-7 h-7 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-[#FFDF73] flex items-center justify-center transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute notification sound' : 'Mute notification sound'}
                title={isMuted ? 'Unmute sound' : 'Mute sound'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close helpdesk widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#0D0D0D] text-xs">
            <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 space-y-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#FFDF73]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                Official Student Helpdesk
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Got payment, UTR verification, or ID card questions? Chat directly with our Patna coordinator on WhatsApp.
              </p>
              <div className="text-[10px] text-zinc-500 pt-1">
                Helpline: <strong className="text-zinc-300">+91 8877490845</strong>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="space-y-1.5">
              <button
                onClick={() => handleStartChat('Namaste, I have paid via UPI and want to verify my 12-digit UTR.')}
                className="w-full text-left p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[11px] text-zinc-300 hover:text-[#FFDF73] transition-colors border border-zinc-800/80 cursor-pointer"
              >
                ⚡ Verify my UPI payment UTR
              </button>
              <button
                onClick={() => handleStartChat('Namaste, I want to inquire about Rozgar Dhan (₹99) and Maha Dhan (₹199) plans.')}
                className="w-full text-left p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[11px] text-zinc-300 hover:text-[#FFDF73] transition-colors border border-zinc-800/80 cursor-pointer"
              >
                📚 Inquire about KUBER Study Plans
              </button>
              <button
                onClick={() => handleStartChat('Namaste, I want to download/re-verify my KUBER Student ID pass.')}
                className="w-full text-left p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[11px] text-zinc-300 hover:text-[#FFDF73] transition-colors border border-zinc-800/80 cursor-pointer"
              >
                🪪 ID Pass Download / Verification Help
              </button>
            </div>

            {/* Custom Input with Animated Typing Placeholder */}
            <div className="pt-2 flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  aria-label="Type your question..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#D4AF37] transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleStartChat();
                  }}
                />
                {query.length === 0 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-3 right-3 flex items-center overflow-hidden whitespace-nowrap text-xs text-zinc-500"
                  >
                    <span className="truncate">{animatedPlaceholder}</span>
                    {!isFocused && (
                      <span className="kuber-typing-caret inline-block w-[1.5px] h-3.5 bg-[#D4AF37] ml-0.5 shrink-0" />
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleStartChat()}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center transition-colors shadow-md cursor-pointer"
                aria-label="Send message on WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trust Footer Note */}
            <div className="text-[10px] text-center text-zinc-500 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-[#D4AF37]" />
              Response time: Usually within 10–15 minutes
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={handleToggleWidget}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_4px_25px_rgba(16,185,129,0.4)] border-2 border-emerald-400/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Student Helpdesk WhatsApp"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-75" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-[11px] font-black uppercase tracking-wider leading-none">
            Patna Helpdesk
          </div>
          <div className="text-[9px] text-emerald-100 opacity-90 leading-tight">
            Chat on WhatsApp
          </div>
        </div>
      </button>
    </div>
  );
};
