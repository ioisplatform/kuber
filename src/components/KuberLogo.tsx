import React, { useId } from 'react';

interface KuberLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showFullForm?: boolean;
  className?: string;
  onClick?: () => void;
}

export const KuberLogo: React.FC<KuberLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  showFullForm = false,
  className = '',
  onClick,
}) => {
  const rawId = useId();
  const uid = rawId.replace(/:/g, '');

  const iconDimensions = {
    sm: { box: 'w-9 h-9 rounded-xl', w: 30, h: 30, text: 'text-lg', sub: 'text-[8.5px]', badge: 'text-[8px] px-1.5 py-0.5' },
    md: { box: 'w-12 h-12 rounded-2xl', w: 40, h: 40, text: 'text-[22px] leading-none', sub: 'text-[9.5px]', badge: 'text-[9px] px-2 py-0.5' },
    lg: { box: 'w-16 h-16 rounded-2xl', w: 54, h: 54, text: 'text-3xl', sub: 'text-xs', badge: 'text-[10px] px-2 py-0.5' },
    xl: { box: 'w-20 h-20 rounded-3xl', w: 68, h: 68, text: 'text-4xl', sub: 'text-sm', badge: 'text-[11px] px-2.5 py-0.5' },
  }[size];

  const goldLightId = `kuberGoldLight_${uid}`;
  const goldMediumId = `kuberGoldMedium_${uid}`;
  const goldDarkId = `kuberGoldDark_${uid}`;
  const crownGoldId = `kuberCrownGold_${uid}`;
  const orbitGradId = `kuberOrbitGrad_${uid}`;
  const glowFilterId = `kuberGlow_${uid}`;
  const strongGlowId = `kuberStrongGlow_${uid}`;

  return (
    <div
      onClick={onClick}
      className={`group inline-flex items-center gap-3.5 select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      id="kuber-brand-logo"
    >
      {/* Glowing Emblem System: Ambient Aura + Obsidian Gold Housing + Precision Crown & Cube SVG */}
      <div
        className={`relative shrink-0 flex items-center justify-center ${iconDimensions.box} bg-gradient-to-br from-[#231B07] via-[#0F0C05] to-[#050505] border border-[#D4AF37]/55 shadow-[0_0_22px_rgba(212,175,55,0.28),inset_0_1px_1px_rgba(255,244,190,0.45)] group-hover:border-[#FFDF73] group-hover:shadow-[0_0_32px_rgba(255,223,115,0.48),inset_0_1px_2px_rgba(255,248,210,0.65)] transition-all duration-300 overflow-visible`}
      >
        {/* Outer Ambient Breathing Gold Glow */}
        <div
          aria-hidden="true"
          className="kuber-aura-glow pointer-events-none absolute -inset-2 rounded-2xl bg-[radial-gradient(circle,rgba(255,223,115,0.34)_0%,rgba(212,175,55,0.12)_50%,transparent_75%)] blur-md group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Subtle Specular Metallic Sweep Overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden">
          <div className="kuber-sheen-sweep absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#FFF6C4]/25 to-transparent" />
        </div>

        {/* Inner Hairline Ring */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[2px] rounded-[inherit] border border-[#FFDF73]/20"
        />

        <svg
          width={iconDimensions.w}
          height={iconDimensions.h}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-[0_0_10px_rgba(255,215,90,0.55)] group-hover:scale-[1.04] transition-transform duration-300"
        >
          <defs>
            {/* Multi-stop Royal Gold Gradients */}
            <linearGradient id={goldLightId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9D6" />
              <stop offset="45%" stopColor="#FFE073" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>

            <linearGradient id={goldMediumId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFDF73" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#946F0D" />
            </linearGradient>

            <linearGradient id={goldDarkId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B88918" />
              <stop offset="55%" stopColor="#7C5909" />
              <stop offset="100%" stopColor="#3B2900" />
            </linearGradient>

            <linearGradient id={crownGoldId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFBE0" />
              <stop offset="35%" stopColor="#FFE17D" />
              <stop offset="100%" stopColor="#B88A14" />
            </linearGradient>

            <linearGradient id={orbitGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#FFE073" stopOpacity="0.85" />
            </linearGradient>

            {/* Luminous Soft Glow Filter */}
            <filter id={glowFilterId} x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id={strongGlowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Precision Orbital Halo Ring */}
          <g className="kuber-orbit-ring origin-center" style={{ transformOrigin: '50px 54px' }}>
            <circle
              cx="50"
              cy="54"
              r="42"
              stroke={`url(#${orbitGradId})`}
              strokeWidth="0.9"
              strokeDasharray="6 4"
            />
            <circle cx="50" cy="12" r="1.4" fill="#FFF4B8" />
            <circle cx="50" cy="96" r="1.2" fill="#D4AF37" />
          </g>

          {/* Isometric Gold Vault Cube */}
          {/* Top Face */}
          <polygon
            points="50,42 78,54 50,66 22,54"
            fill={`url(#${goldLightId})`}
            stroke="#FFF9D6"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />

          {/* Left Face (Targetable primary cube facet with luminous gold bevel) */}
          <polygon
            points="22,54 50,66 50,94 22,82"
            fill={`url(#${goldMediumId})`}
            stroke="#FFE58F"
            strokeWidth="1.15"
            strokeLinejoin="round"
            filter={`url(#${glowFilterId})`}
          />

          {/* Right Face */}
          <polygon
            points="50,66 78,54 78,82 50,94"
            fill={`url(#${goldDarkId})`}
            stroke="#C99827"
            strokeWidth="1.05"
            strokeLinejoin="round"
          />

          {/* Precision Specular Cube Ridges */}
          <line x1="50" y1="66" x2="50" y2="94" stroke="#FFF9D6" strokeWidth="1.2" opacity="0.85" />
          <line x1="22.5" y1="54.2" x2="50" y2="66" stroke="#FFFBE6" strokeWidth="1.1" opacity="0.9" />
          <line x1="77.5" y1="54.2" x2="50" y2="66" stroke="#FFE58F" strokeWidth="0.9" opacity="0.7" />

          {/* Royal Crown Base & Prosperity Bars */}
          <path
            d="M32 40 L68 40 L65 44 L35 44 Z"
            fill={`url(#${crownGoldId})`}
            stroke="#FFF9D2"
            strokeWidth="0.9"
          />
          <line x1="38" y1="36" x2="62" y2="36" stroke="#FFF9D2" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="42" y1="32" x2="58" y2="32" stroke="#FFDF73" strokeWidth="1.2" strokeLinecap="round" />

          {/* Crown Peaks */}
          <path
            d="M32 40 L28 20 L40 28 L50 12 L60 28 L72 20 L68 40 Z"
            fill={`url(#${crownGoldId})`}
            stroke="#FFF6C4"
            strokeWidth="1.25"
            strokeLinejoin="round"
            filter={`url(#${glowFilterId})`}
          />

          {/* Luminous Crown Pearls / Diamonds */}
          <circle cx="28" cy="19" r="2.4" fill="#FFFFFF" stroke="#FFDF73" strokeWidth="0.9" filter={`url(#${strongGlowId})`} />
          <circle cx="50" cy="11.5" r="3.2" fill="#FFFFFF" stroke="#FFDF73" strokeWidth="1.1" filter={`url(#${strongGlowId})`} />
          <circle cx="72" cy="19" r="2.4" fill="#FFFFFF" stroke="#FFDF73" strokeWidth="0.9" filter={`url(#${strongGlowId})`} />
          <circle cx="40" cy="28" r="1.5" fill="#FFF7CC" />
          <circle cx="60" cy="28" r="1.5" fill="#FFF7CC" />

          {/* Center Crown Radiant Dhan Diamond */}
          <polygon
            points="50,19.5 53.5,25 50,30.5 46.5,25"
            fill="#FFE073"
            stroke="#FFFFFF"
            strokeWidth="0.9"
            filter={`url(#${strongGlowId})`}
          />

          {/* Glowing ₹ Rupee Emblem on Cube */}
          <text
            x="50"
            y="82"
            textAnchor="middle"
            fill="#FFF7D1"
            fontSize="16.5"
            fontFamily="sans-serif"
            fontWeight="900"
            filter={`url(#${strongGlowId})`}
            style={{ textShadow: '0 0 8px rgba(255, 223, 115, 0.9), 0 1px 2px rgba(0, 0, 0, 0.9)' }}
          >
            ₹
          </text>
        </svg>
      </div>

      {/* Brand Typography & Full Form System Lockup */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span
            className={`font-royal font-black tracking-[0.14em] gold-gradient-text ${iconDimensions.text} drop-shadow-[0_0_14px_rgba(212,175,55,0.45)] group-hover:drop-shadow-[0_0_20px_rgba(255,223,115,0.65)] transition-all duration-300`}
          >
            KUBER
          </span>
          <span
            className={`uppercase font-bold tracking-wider rounded-md bg-gradient-to-r from-[#241B07] to-[#141005] border border-[#D4AF37]/45 text-[#FFDF73] shadow-[0_0_10px_rgba(212,175,55,0.18)] ${iconDimensions.badge}`}
          >
            धन के देवता
          </span>
        </div>

        {(showSubtitle || showFullForm) && (
          <span
            className={`tracking-[0.025em] text-zinc-300/90 font-medium ${iconDimensions.sub} leading-tight mt-0.5`}
          >
            Knowledge Universe for Business, Earning &amp; Rewards
          </span>
        )}
      </div>
    </div>
  );
};

