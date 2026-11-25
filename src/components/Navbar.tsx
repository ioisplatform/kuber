import React, { useState } from 'react';
import { KuberLogo } from './KuberLogo';
import { KuberUser } from '../types';
import { Menu, X, ShieldCheck, User, LogIn, Award, Sparkles, Phone, Lock } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  currentUser: KuberUser | null;
  onLogout: () => void;
  isAdminLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  currentUser,
  onLogout,
  isAdminLoggedIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="kuber-fixed-navbar"
      className="fixed top-0 inset-x-0 z-40 bg-[#070707]/90 backdrop-blur-xl border-b border-[#D4AF37]/25 shadow-[0_8px_36px_rgba(0,0,0,0.85)]"
    >
      {/* Subtle Golden Ambient Bottom Hairline Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFDF73]/60 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 relative">
        {/* Left: KUBER Logo with Full Form underneath */}
        <KuberLogo
          size="md"
          showSubtitle={true}
          showFullForm={true}
          onClick={() => handleNavClick('home')}
          className="cursor-pointer shrink-0"
        />

        {/* Desktop Menu Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6" id="kuber-desktop-nav">
          <button
            onClick={() => handleNavClick('home')}
            className={`relative py-2 text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
              activePage === 'home'
                ? 'text-[#FFDF73] drop-shadow-[0_0_8px_rgba(255,223,115,0.45)]'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Home
            {activePage === 'home' && (
              <span className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent shadow-[0_0_8px_#FFDF73]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('plans')}
            className={`relative py-2 text-sm font-semibold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer ${
              activePage === 'plans'
                ? 'text-[#FFDF73] drop-shadow-[0_0_8px_rgba(255,223,115,0.45)]'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Plans (₹29, ₹99, ₹199)
            {activePage === 'plans' && (
              <span className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent shadow-[0_0_8px_#FFDF73]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('verify')}
            className={`relative py-2 text-sm font-semibold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer ${
              activePage === 'verify'
                ? 'text-[#FFDF73] drop-shadow-[0_0_8px_rgba(255,223,115,0.45)]'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Verify ID
            {activePage === 'verify' && (
              <span className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent shadow-[0_0_8px_#FFDF73]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('trust')}
            className={`relative py-2 text-sm font-semibold tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer ${
              activePage === 'trust'
                ? 'text-[#FFDF73] drop-shadow-[0_0_8px_rgba(255,223,115,0.45)]'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            Trust &amp; Safety
            {activePage === 'trust' && (
              <span className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent shadow-[0_0_8px_#FFDF73]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`relative py-2 text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
              activePage === 'contact'
                ? 'text-[#FFDF73] drop-shadow-[0_0_8px_rgba(255,223,115,0.45)]'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Helpdesk
            {activePage === 'contact' && (
              <span className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#FFDF73] to-transparent shadow-[0_0_8px_#FFDF73]" />
            )}
          </button>

          {/* Admin link */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`text-xs uppercase font-bold tracking-wider px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
              activePage === 'admin'
                ? 'bg-amber-500/15 text-[#FFDF73] border-[#D4AF37]/60 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-[#D4AF37]/40'
            }`}
          >
            <Lock className="w-3 h-3 text-amber-400" /> Admin
          </button>
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#1D1708] to-[#121212] border border-[#D4AF37]/70 hover:border-[#FFDF73] hover:shadow-[0_0_16px_rgba(212,175,55,0.25)] transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden border border-[#D4AF37] bg-zinc-800">
                  <img
                    src={currentUser.photoUrl || ''}
                    alt={currentUser.fullName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="%23D4AF37"><rect width="30" height="30" fill="%23222"/></svg>';
                    }}
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs font-mono font-bold text-[#FFDF73]">
                    {currentUser.kuberId}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-semibold truncate max-w-[100px]">
                    {currentUser.fullName}
                  </div>
                </div>
              </button>

              <button
                onClick={onLogout}
                className="text-xs font-semibold text-zinc-400 hover:text-rose-400 transition-colors px-2 py-1 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleNavClick('login')}
                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-900/80 border border-transparent hover:border-zinc-800 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-[#D4AF37]" />
                Login
              </button>

              <button
                onClick={() => handleNavClick('register')}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#FFF0B3] via-[#D4AF37] to-[#AA820A] text-black hover:brightness-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(212,175,55,0.35),inset_0_1px_1px_rgba(255,255,255,0.5)] flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-4 h-4 text-black" />
                Join Plan (From ₹29)
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          {currentUser && (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="px-2.5 py-1 rounded-lg bg-[#1F190A] border border-[#D4AF37] text-[11px] font-mono font-bold text-[#FFDF73]"
            >
              {currentUser.kuberId}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D0D] border-b border-[#332A10] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
              activePage === 'home' ? 'bg-amber-500/10 text-amber-300' : 'text-zinc-300'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('plans')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              activePage === 'plans' ? 'bg-amber-500/10 text-amber-300' : 'text-zinc-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Plans (₹29, ₹99, ₹199)
          </button>
          <button
            onClick={() => handleNavClick('verify')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              activePage === 'verify' ? 'bg-amber-500/10 text-amber-300' : 'text-zinc-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verify Student ID
          </button>
          <button
            onClick={() => handleNavClick('trust')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
              activePage === 'trust' ? 'bg-amber-500/10 text-amber-300' : 'text-zinc-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Trust & Protection
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
              activePage === 'contact' ? 'bg-amber-500/10 text-amber-300' : 'text-zinc-300'
            }`}
          >
            Patna Student Helpdesk
          </button>
          <button
            onClick={() => handleNavClick('admin')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-amber-400 flex items-center gap-2 ${
              activePage === 'admin' ? 'bg-amber-500/20' : ''
            }`}
          >
            <Lock className="w-4 h-4 text-amber-400" /> Admin Portal
          </button>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black font-bold text-sm text-center"
                >
                  My Student Dashboard ({currentUser.kuberId})
                </button>
                <button
                  onClick={onLogout}
                  className="w-full py-2 rounded-xl text-center text-xs text-rose-400 hover:bg-zinc-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 text-white font-semibold text-sm border border-zinc-700"
                >
                  Login with KUBER ID
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black font-bold text-sm shadow-md"
                >
                  Join KUBER (₹29 / ₹99 / ₹199)
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
