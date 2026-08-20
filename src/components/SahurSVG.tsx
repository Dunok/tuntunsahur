import { useId } from 'react';

/**
 * Inline cartoon "Tun Tun Sahur" — a wooden barrel gym mascot.
 * 5 evolution stages; used as a guaranteed visual base layer
 * (remote artwork is layered on top when available).
 */
export function SahurSVG({
  stage,
  className,
}: {
  stage: number;
  className?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const aura = `aura${uid}`;
  const muscle = stage >= 2;
  const barbellSquat = stage === 3;
  const flexing = stage === 4;
  const god = stage >= 5;
  const outline = '#2b1c10';
  const wood = '#b07a44';
  const woodDark = '#8a5a2e';
  const hoop = '#7d8794';

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={aura} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(255,194,71,0.55)" />
          <stop offset="0.7" stopColor="rgba(255,150,40,0.18)" />
          <stop offset="1" stopColor="rgba(255,150,40,0)" />
        </radialGradient>
      </defs>

      {/* god aura */}
      {god && <circle cx="100" cy="96" r="95" fill={`url(#${aura})`} />}

      {/* floor shadow */}
      <ellipse cx="100" cy="181" rx={god ? 58 : 50} ry="9" fill="rgba(0,0,0,0.35)" />

      {/* squat barbell (behind body) */}
      {barbellSquat && (
        <g>
          <rect x="26" y="55" width="148" height="7" rx="3.5" fill="#9aa5b5" stroke={outline} strokeWidth="3.5" />
          <rect x="16" y="40" width="14" height="38" rx="5" fill="#39445c" stroke={outline} strokeWidth="3.5" />
          <rect x="170" y="40" width="14" height="38" rx="5" fill="#39445c" stroke={outline} strokeWidth="3.5" />
          <rect x="32" y="46" width="10" height="26" rx="4" fill="#5b6b84" stroke={outline} strokeWidth="3" />
          <rect x="158" y="46" width="10" height="26" rx="4" fill="#5b6b84" stroke={outline} strokeWidth="3" />
        </g>
      )}

      {/* legs */}
      <rect x="76" y="148" width={muscle ? 16 : 12} height="26" rx="6" fill={woodDark} stroke={outline} strokeWidth="4" />
      <rect x="108" y="148" width={muscle ? 16 : 12} height="26" rx="6" fill={woodDark} stroke={outline} strokeWidth="4" />
      {/* shoes */}
      <rect x="72" y="168" width={muscle ? 24 : 19} height="11" rx="5" fill="#e8e2d5" stroke={outline} strokeWidth="3.5" />
      <rect x="104" y="168" width={muscle ? 24 : 19} height="11" rx="5" fill="#e8e2d5" stroke={outline} strokeWidth="3.5" />

      {/* arms — drawn per stage, behind/on sides of barrel */}
      {stage === 1 && (
        <g fill={wood} stroke={outline} strokeWidth="4" strokeLinecap="round">
          <path d="M62 100 Q46 108 46 124" fill="none" />
          <circle cx="46" cy="128" r="7" />
          <path d="M138 100 Q154 108 154 124" fill="none" />
          <circle cx="154" cy="128" r="7" />
        </g>
      )}

      {stage === 2 && (
        <g>
          {/* left flex + dumbbell */}
          <path d="M62 102 Q44 100 42 86" fill="none" stroke={outline} strokeWidth="11" strokeLinecap="round" />
          <path d="M62 102 Q46 101 44 88" fill="none" stroke={wood} strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="47" cy="96" r="8" fill={wood} stroke={outline} strokeWidth="4" />
          <g transform="translate(42 74)">
            <rect x="-13" y="-3" width="26" height="6" rx="3" fill="#9aa5b5" stroke={outline} strokeWidth="3" />
            <rect x="-18" y="-8" width="7" height="16" rx="2.5" fill="#39445c" stroke={outline} strokeWidth="3" />
            <rect x="11" y="-8" width="7" height="16" rx="2.5" fill="#39445c" stroke={outline} strokeWidth="3" />
          </g>
          {/* right flex + dumbbell */}
          <path d="M138 102 Q156 100 158 86" fill="none" stroke={outline} strokeWidth="11" strokeLinecap="round" />
          <path d="M138 102 Q154 101 156 88" fill="none" stroke={wood} strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="153" cy="96" r="8" fill={wood} stroke={outline} strokeWidth="4" />
          <g transform="translate(158 74)">
            <rect x="-13" y="-3" width="26" height="6" rx="3" fill="#9aa5b5" stroke={outline} strokeWidth="3" />
            <rect x="-18" y="-8" width="7" height="16" rx="2.5" fill="#39445c" stroke={outline} strokeWidth="3" />
            <rect x="11" y="-8" width="7" height="16" rx="2.5" fill="#39445c" stroke={outline} strokeWidth="3" />
          </g>
        </g>
      )}

      {barbellSquat && (
        <g>
          <path d="M62 98 Q52 84 60 66" fill="none" stroke={outline} strokeWidth="12" strokeLinecap="round" />
          <path d="M62 98 Q54 85 61 68" fill="none" stroke={wood} strokeWidth="6" strokeLinecap="round" />
          <circle cx="61" cy="63" r="8" fill={wood} stroke={outline} strokeWidth="4" />
          <path d="M138 98 Q148 84 140 66" fill="none" stroke={outline} strokeWidth="12" strokeLinecap="round" />
          <path d="M138 98 Q146 85 139 68" fill="none" stroke={wood} strokeWidth="6" strokeLinecap="round" />
          <circle cx="139" cy="63" r="8" fill={wood} stroke={outline} strokeWidth="4" />
        </g>
      )}

      {flexing && (
        <g>
          <path d="M62 100 Q40 96 36 78" fill="none" stroke={outline} strokeWidth="13" strokeLinecap="round" />
          <path d="M62 100 Q42 97 38 80" fill="none" stroke={wood} strokeWidth="7" strokeLinecap="round" />
          <circle cx="42" cy="90" r="11" fill={wood} stroke={outline} strokeWidth="4" />
          <circle cx="36" cy="74" r="8" fill={wood} stroke={outline} strokeWidth="4" />
          <path d="M138 100 Q160 96 164 78" fill="none" stroke={outline} strokeWidth="13" strokeLinecap="round" />
          <path d="M138 100 Q158 97 162 80" fill="none" stroke={wood} strokeWidth="7" strokeLinecap="round" />
          <circle cx="158" cy="90" r="11" fill={wood} stroke={outline} strokeWidth="4" />
          <circle cx="164" cy="74" r="8" fill={wood} stroke={outline} strokeWidth="4" />
        </g>
      )}

      {god && (
        <g>
          <path d="M66 92 Q52 70 60 44" fill="none" stroke={outline} strokeWidth="13" strokeLinecap="round" />
          <path d="M66 92 Q54 71 61 46" fill="none" stroke={wood} strokeWidth="7" strokeLinecap="round" />
          <path d="M134 92 Q148 70 140 44" fill="none" stroke={outline} strokeWidth="13" strokeLinecap="round" />
          <path d="M134 92 Q146 71 139 46" fill="none" stroke={wood} strokeWidth="7" strokeLinecap="round" />
          {/* golden barbell overhead */}
          <rect x="30" y="30" width="140" height="7" rx="3.5" fill="#ffc247" stroke="#7a5b1e" strokeWidth="3.5" />
          <rect x="18" y="14" width="15" height="40" rx="5" fill="#ffd97a" stroke="#7a5b1e" strokeWidth="3.5" />
          <rect x="167" y="14" width="15" height="40" rx="5" fill="#ffd97a" stroke="#7a5b1e" strokeWidth="3.5" />
          <circle cx="60" cy="40" r="8" fill={wood} stroke={outline} strokeWidth="4" />
          <circle cx="140" cy="40" r="8" fill={wood} stroke={outline} strokeWidth="4" />
        </g>
      )}

      {/* barrel body */}
      <path
        d="M70 48 C57 78 57 126 70 154 L130 154 C143 126 143 78 130 48 Z"
        fill={wood}
        stroke={outline}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* planks */}
      <path d="M86 49 C80 79 80 125 86 153" stroke={woodDark} strokeWidth="3.5" fill="none" />
      <path d="M114 49 C120 79 120 125 114 153" stroke={woodDark} strokeWidth="3.5" fill="none" />
      {/* hoops */}
      <path d="M62 68 C80 63 120 63 138 68" stroke={hoop} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M60 134 C80 139 120 139 140 134" stroke={hoop} strokeWidth="8" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="66.5" r="2.4" fill="#4b5563" />
      <circle cx="130" cy="66.5" r="2.4" fill="#4b5563" />
      <circle cx="70" cy="135.5" r="2.4" fill="#4b5563" />
      <circle cx="130" cy="135.5" r="2.4" fill="#4b5563" />

      {/* headband */}
      {stage === 2 && (
        <g>
          <path d="M66 56 C84 50 116 50 134 56 L132 66 C116 60 84 60 68 66 Z" fill="#e8e2d5" stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
        </g>
      )}
      {barbellSquat && (
        <g>
          <path d="M66 56 C84 50 116 50 134 56 L132 66 C116 60 84 60 68 66 Z" fill="#d84343" stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M133 58 q10 -2 14 4 q-8 2 -12 6 z" fill="#d84343" stroke={outline} strokeWidth="3" />
        </g>
      )}

      {/* face */}
      <g>
        {/* brows */}
        {stage === 1 ? (
          <g stroke={outline} strokeWidth="3.5" strokeLinecap="round">
            <path d="M82 84 q6 -3 11 -1" fill="none" />
            <path d="M107 83 q6 -2 11 1" fill="none" />
          </g>
        ) : (
          <g stroke={outline} strokeWidth="4" strokeLinecap="round">
            <path d="M80 82 l12 4" fill="none" />
            <path d="M120 82 l-12 4" fill="none" />
          </g>
        )}
        {/* eyes */}
        <ellipse cx="88" cy="94" rx="7" ry="8" fill="#fdf6e8" stroke={outline} strokeWidth="3.5" />
        <ellipse cx="112" cy="94" rx="7" ry="8" fill="#fdf6e8" stroke={outline} strokeWidth="3.5" />
        <circle cx="89.5" cy="95.5" r="3.1" fill={outline} />
        <circle cx="110.5" cy="95.5" r="3.1" fill={outline} />
        <circle cx="90.6" cy="94.2" r="1" fill="#fff" />
        <circle cx="111.6" cy="94.2" r="1" fill="#fff" />
        {/* mouth */}
        {stage === 1 ? (
          <path d="M92 114 q8 5 16 0" fill="none" stroke={outline} strokeWidth="3.5" strokeLinecap="round" />
        ) : (
          <g>
            <path d="M88 110 q12 14 24 0 q-12 6 -24 0z" fill="#5c2e22" stroke={outline} strokeWidth="3.5" strokeLinejoin="round" />
            <rect x="92" y="110.5" width="16" height="4.5" rx="2" fill="#fdf6e8" />
          </g>
        )}
        {/* blush */}
        <ellipse cx="78" cy="104" rx="5" ry="3" fill="rgba(216,67,67,0.35)" />
        <ellipse cx="122" cy="104" rx="5" ry="3" fill="rgba(216,67,67,0.35)" />
      </g>

      {/* sweat drop (stage 1) */}
      {stage === 1 && (
        <path d="M141 74 q6 8 0 12 q-6 -4 0 -12z" fill="#9fd8ff" stroke="#4a90c2" strokeWidth="2.5" />
      )}

      {/* effort marks */}
      {(barbellSquat || flexing) && (
        <g stroke="#ffd97a" strokeWidth="3.5" strokeLinecap="round">
          <path d="M30 96 l-9 -4" />
          <path d="M30 108 l-10 0" />
          <path d="M170 96 l9 -4" />
          <path d="M170 108 l10 0" />
        </g>
      )}

      {/* gold chain (stage 4) */}
      {flexing && (
        <g>
          <path d="M78 118 q22 16 44 0" fill="none" stroke="#ffc247" strokeWidth="4" />
          <circle cx="100" cy="128" r="8" fill="#ffc247" stroke="#7a5b1e" strokeWidth="3" />
          <rect x="95.5" y="126" width="9" height="3.6" rx="1.8" fill="#7a5b1e" />
        </g>
      )}

      {/* crown + sparks (stage 5) */}
      {god && (
        <g>
          <path d="M80 44 L84 26 L94 38 L100 20 L106 38 L116 26 L120 44 Q100 38 80 44 Z" fill="#ffc247" stroke="#7a5b1e" strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="100" cy="30" r="3" fill="#ff4d5e" stroke="#7a5b1e" strokeWidth="2" />
          <g fill="#ffe08a">
            <path d="m40 60 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
            <path d="m160 60 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
          </g>
        </g>
      )}
    </svg>
  );
}
