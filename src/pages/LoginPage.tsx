import React, { useState } from 'react';
import { loginWithKuberId } from '../firebase/db';
import { KuberUser } from '../types';
import { Lock, User, ArrowRight, AlertCircle, ShieldCheck, HelpCircle, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: KuberUser) => void;
  onNavigateToRegister: () => void;
  onNavigateToAdmin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onNavigateToAdmin,
}) => {
  const [kuberId, setKuberId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanId = kuberId.trim().toUpperCase();
    if (!cleanId) {
      setErrorMsg('Please enter your permanent KUBER ID (e.g. KUBER29RK01).');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your secret password.');
      return;
    }

    try {
      setLoading(true);
      const user = await loginWithKuberId(cleanId, password);
      onLoginSuccess(user);
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMsg(err.message || 'Invalid KUBER ID or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (id: string, pass: string) => {
    setKuberId(id);
    setPassword(pass);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center bg-[#0A0A0A] text-white" id="kuber-login-page">
      <div className="max-w-md w-full p-8 rounded-2xl bg-gradient-to-b from-[#16130B] via-[#0E0E0E] to-[#080808] border-2 border-[#D4AF37] shadow-[0_15px_45px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.15)]">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFDF73] to-[#AA820A] text-black flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20">
            <ShieldCheck className="w-8 h-8 text-black" />
          </div>

          <span className="text-[11px] uppercase font-bold tracking-widest text-[#FFDF73]">
            Student Identity Portal
          </span>
          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white mt-1">
            Login with <span className="gold-gradient-text">KUBER ID</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Access your permanent ID card, 101 Q papers & referral earnings
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Permanent KUBER ID *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. KUBER29RK01"
                value={kuberId}
                onChange={(e) => setKuberId(e.target.value.toUpperCase())}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm font-mono font-bold text-[#FFDF73] tracking-wider uppercase focus:border-[#D4AF37] outline-none"
              />
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 block">
              Format: KUBER29..., KUBER99..., or KUBER199...
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Secret Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Your secret password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white focus:border-[#D4AF37] outline-none"
              />
            </div>
          </div>

          {/* Quick Demo Test Buttons */}
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[11px] space-y-1.5">
            <span className="text-zinc-400 font-bold block flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Quick Fill Demo Credentials:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('KUBER29RK01', 'kuber123')}
                className="px-2 py-1 rounded bg-zinc-800 hover:bg-[#D4AF37] hover:text-black font-mono font-bold text-[#FFDF73] transition-colors cursor-pointer"
              >
                KUBER29RK01 (pass: kuber123)
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('KUBER99AK15', 'kuber123')}
                className="px-2 py-1 rounded bg-zinc-800 hover:bg-[#D4AF37] hover:text-black font-mono font-bold text-[#FFDF73] transition-colors cursor-pointer"
              >
                KUBER99AK15 (pass: kuber123)
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            id="btn-login-submit"
            className="w-full mt-2 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#AA820A] text-black hover:opacity-95 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Verifying KUBER Credentials...</span>
            ) : (
              <>
                <span>Enter Student Portal</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-zinc-800 text-center space-y-3">
          <p className="text-xs text-zinc-400">
            Don't have a KUBER ID yet?{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-[#FFDF73] font-bold hover:underline ml-1 cursor-pointer"
            >
              Enroll for Plan (₹29 / ₹99 / ₹199)
            </button>
          </p>

          <div>
            <button
              onClick={onNavigateToAdmin}
              className="text-[11px] text-zinc-500 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-amber-400" /> Admin Staff Portal (PIN: 2999)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
