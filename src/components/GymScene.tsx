import { memo } from 'react';

interface Props {
  tier: number; // 1..5
}

/** Evolving gym backdrop: tier groups fade in as the player levels up. */
export const GymScene = memo(function GymScene({ tier }: Props) {
  const on = (t: number) => `tier-group${tier >= t ? ' on' : ''}`;
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#242c3b" />
          <stop offset="1" stopColor="#151a25" />
        </linearGradient>
        <linearGradient id="floorG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c3444" />
          <stop offset="1" stopColor="#181d28" />
        </linearGradient>
        <linearGradient id="winG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#31415f" />
          <stop offset="1" stopColor="#1b2438" />
        </linearGradient>
        <radialGradient id="spotG" cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor="rgba(255,222,150,0.4)" />
          <stop offset="1" stopColor="rgba(255,222,150,0)" />
        </radialGradient>
        <radialGradient id="goldG" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(255,194,71,0.5)" />
          <stop offset="1" stopColor="rgba(255,194,71,0)" />
        </radialGradient>
        <pattern
          id="hz"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-45)"
        >
          <rect width="30" height="30" fill="#1a1d24" />
          <rect width="15" height="30" fill="rgba(255,194,71,0.85)" />
        </pattern>
        <pattern
          id="tiles"
          width="90"
          height="90"
          patternUnits="userSpaceOnUse"
        >
          <rect width="90" height="90" fill="none" />
          <path d="M90 0H0V90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
        </pattern>
        <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* base room */}
      <rect x="0" y="0" width="1600" height="660" fill="url(#wallG)" />
      <rect x="0" y="660" width="1600" height="240" fill="url(#floorG)" />
      {[230, 460, 690, 920, 1150, 1380].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="660" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
      ))}
      <rect x="0" y="652" width="1600" height="10" fill="#0e1219" />
      <rect x="0" y="628" width="1600" height="16" fill="url(#hz)" opacity="0.9" />
      {[730, 810, 880].map((y) => (
        <line key={y} x1="0" y1={y} x2="1600" y2={y} stroke="rgba(0,0,0,0.28)" strokeWidth="4" />
      ))}

      {/* ambient dust */}
      {[
        [300, 500, 0], [520, 420, 1.2], [1080, 460, 0.6], [1280, 380, 2],
        [760, 300, 1.6], [940, 520, 2.6], [420, 260, 3.1], [1180, 240, 0.9],
      ].map(([x, y, d], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 4 : 2.5}
          fill="rgba(255,235,200,0.35)"
          className="anim-dust"
          style={{ animationDelay: `${d}s` }}
        />
      ))}

      {/* ---------- TIER 1: garage ---------- */}
      <g className={on(1)}>
        <line x1="800" y1="0" x2="800" y2="86" stroke="#0e1219" strokeWidth="5" />
        <g className="anim-flicker">
          <circle cx="800" cy="108" r="46" fill="rgba(255,220,150,0.28)" filter="url(#soft)" />
          <circle cx="800" cy="104" r="17" fill="#ffd98a" />
          <path d="M784 90h32l-5 -10h-22z" fill="#39445c" />
        </g>
        <ellipse cx="800" cy="700" rx="330" ry="60" fill="url(#spotG)" opacity="0.5" />
        {/* crate */}
        <g transform="translate(150 560)">
          <rect width="120" height="100" fill="#5a4632" stroke="#3d2f21" strokeWidth="5" />
          <line x1="0" y1="0" x2="120" y2="100" stroke="#3d2f21" strokeWidth="5" />
          <line x1="120" y1="0" x2="0" y2="100" stroke="#3d2f21" strokeWidth="5" />
        </g>
        {/* rusty kettlebell */}
        <g transform="translate(1330 610)">
          <circle cx="35" cy="38" r="32" fill="#4a3b33" stroke="#322822" strokeWidth="5" />
          <path d="M18 16c0-12 34-12 34 0" fill="none" stroke="#322822" strokeWidth="9" />
        </g>
        <path d="M1050 120l30 60-14 46 26 70" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="4" />
      </g>

      {/* ---------- TIER 2: dumbbell rack + window + bench ---------- */}
      <g className={on(2)}>
        <g transform="translate(140 120)">
          <rect width="230" height="170" fill="url(#winG)" stroke="#39445c" strokeWidth="8" />
          <line x1="115" y1="0" x2="115" y2="170" stroke="#39445c" strokeWidth="7" />
          <line x1="0" y1="85" x2="230" y2="85" stroke="#39445c" strokeWidth="7" />
          <circle cx="62" cy="48" r="22" fill="#dfe8f5" opacity="0.9" />
        </g>
        <g transform="translate(1180 300)">
          {[0, 95, 190].map((y) => (
            <g key={y}>
              <rect x="-14" y={y + 26} width="300" height="12" fill="#39445c" />
              {[20, 110, 200].map((x) => (
                <g key={x} transform={`translate(${x} ${y})`}>
                  <rect x="14" y="8" width="26" height="9" fill="#5b6b84" />
                  <rect x="4" y="2" width="12" height="21" rx="3" fill="#2a3242" />
                  <rect x="38" y="2" width="12" height="21" rx="3" fill="#2a3242" />
                </g>
              ))}
            </g>
          ))}
          <rect x="-14" y="-14" width="12" height="236" fill="#39445c" />
          <rect x="286" y="-14" width="12" height="236" fill="#39445c" />
        </g>
        <g transform="translate(210 700)">
          <rect x="0" y="0" width="230" height="26" rx="8" fill="#7a3b2e" />
          <rect x="20" y="26" width="16" height="60" fill="#39445c" />
          <rect x="194" y="26" width="16" height="60" fill="#39445c" />
          <rect x="0" y="-58" width="24" height="60" rx="8" fill="#7a3b2e" />
        </g>
      </g>

      {/* ---------- TIER 3: mirror, barbell rack, poster ---------- */}
      <g className={on(3)}>
        <g transform="translate(1160 90)">
          <rect width="210" height="320" fill="#202839" stroke="#39445c" strokeWidth="8" />
          <path d="M30 290 150 30M70 300 190 40" stroke="rgba(255,255,255,0.07)" strokeWidth="14" />
        </g>
        <g transform="translate(110 330)">
          <rect x="0" y="0" width="16" height="300" fill="#39445c" />
          <rect x="180" y="0" width="16" height="300" fill="#39445c" />
          <rect x="-20" y="70" width="236" height="12" fill="#5b6b84" />
          <circle cx="-20" cy="76" r="26" fill="#2a3242" stroke="#1c222e" strokeWidth="5" />
          <circle cx="216" cy="76" r="26" fill="#2a3242" stroke="#1c222e" strokeWidth="5" />
          <rect x="-20" y="170" width="236" height="12" fill="#5b6b84" />
          <circle cx="-20" cy="176" r="26" fill="#2a3242" stroke="#1c222e" strokeWidth="5" />
          <circle cx="216" cy="176" r="26" fill="#2a3242" stroke="#1c222e" strokeWidth="5" />
        </g>
        <g transform="translate(470 130)">
          <rect width="150" height="200" fill="#7a3b2e" stroke="#3d2f21" strokeWidth="6" />
          <rect x="18" y="22" width="114" height="110" fill="#a3543f" />
          <g transform="translate(75 77)">
            <rect x="-34" y="-5" width="68" height="10" fill="#ece6d9" />
            <rect x="-46" y="-16" width="14" height="32" rx="3" fill="#ece6d9" />
            <rect x="32" y="-16" width="14" height="32" rx="3" fill="#ece6d9" />
          </g>
          <rect x="18" y="150" width="114" height="12" fill="#ece6d9" opacity="0.7" />
          <rect x="38" y="170" width="74" height="8" fill="#ece6d9" opacity="0.45" />
        </g>
      </g>

      {/* ---------- TIER 4: neon, cable machine, rubber floor ---------- */}
      <g className={on(4)}>
        <rect x="0" y="660" width="1600" height="240" fill="url(#tiles)" />
        <g className="anim-neon" transform="translate(1210 120)">
          <rect x="-20" y="-24" width="300" height="120" rx="18" fill="rgba(255,122,47,0.08)" stroke="rgba(255,122,47,0.55)" strokeWidth="4" />
          <g stroke="#ff7a2f" strokeWidth="9" strokeLinecap="round" filter="url(#soft)" opacity="0.85">
            <path d="M30 36 96 36M124 36l66 0" transform="translate(20 0)" />
          </g>
          <g stroke="#ffb37a" strokeWidth="7" strokeLinecap="round">
            <path d="M40 18h180" />
            <path d="M40 18v36M220 18v36" />
            <rect x="24" y="6" width="18" height="60" rx="4" fill="none" />
            <rect x="218" y="6" width="18" height="60" rx="4" fill="none" />
          </g>
        </g>
        <g transform="translate(1390 340)">
          <rect x="0" y="0" width="120" height="330" fill="#2a3242" stroke="#39445c" strokeWidth="6" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x="16" y={24 + i * 40} width="88" height="26" fill={i < 3 ? '#5b6b84' : '#39445c'} />
          ))}
          <line x1="60" y1="-60" x2="60" y2="24" stroke="#8b98ad" strokeWidth="5" />
          <circle cx="60" cy="-64" r="12" fill="none" stroke="#8b98ad" strokeWidth="5" />
        </g>
        <g transform="translate(90 720)">
          <rect x="0" y="0" width="180" height="34" rx="10" fill="#2a3242" stroke="#39445c" strokeWidth="5" />
          <circle cx="30" cy="17" r="8" fill="#ff7a2f" opacity="0.8" />
          <circle cx="58" cy="17" r="8" fill="#ffc247" opacity="0.8" />
        </g>
      </g>

      {/* ---------- TIER 5: legendary hall ---------- */}
      <g className={on(5)}>
        <ellipse cx="800" cy="430" rx="430" ry="330" fill="url(#goldG)" className="anim-pulse-gold" />
        <g className="anim-beam" opacity="0.8">
          <polygon points="150,0 330,0 760,660 480,660" fill="url(#spotG)" opacity="0.3" />
        </g>
        <g className="anim-beam" style={{ animationDelay: '1.2s' }} opacity="0.8">
          <polygon points="1270,0 1450,0 1120,660 840,660" fill="url(#spotG)" opacity="0.3" />
        </g>
        <g transform="translate(130 250)">
          <rect x="-10" y="80" width="280" height="14" fill="#5a4632" />
          {[20, 115, 210].map((x, i) => (
            <g key={x} transform={`translate(${x} ${i === 1 ? 18 : 34})`}>
              <path d="M8 42h24M20 34v8M8 6h24v12a12 12 0 0 1-24 0V6z" fill="#ffc247" stroke="#b8860b" strokeWidth="3" />
              <path d="M8 10H0a8 8 0 0 0 8 10M32 10h8a8 8 0 0 1-8 10" fill="none" stroke="#b8860b" strokeWidth="3" />
            </g>
          ))}
        </g>
        <g transform="translate(1180 470)">
          <path d="M0 20h240" stroke="#7a5b1e" strokeWidth="22" strokeLinecap="round" />
          <ellipse cx="120" cy="20" rx="52" ry="40" fill="#ffc247" stroke="#b8860b" strokeWidth="6" />
          <circle cx="120" cy="20" r="16" fill="#b8860b" />
        </g>
        {[
          [620, 180], [980, 160], [700, 520], [920, 500], [800, 120],
        ].map(([x, y], i) => (
          <path
            key={i}
            d={`m${x} ${y} 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z`}
            fill="#ffc247"
            className="anim-pulse-gold"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </g>

      {/* vignette */}
      <rect x="0" y="0" width="1600" height="900" fill="rgba(10,13,20,0)" />
    </svg>
  );
});
