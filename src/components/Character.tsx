import { useRef, useState } from 'react';
import type { Lang } from '../game/types';
import { Icon, type IconName } from './Icons';
import { StageArt } from './StageArt';

/** Aura glow per gym tier (1..5) — changes as the hall upgrades. */
const TIER_GLOW: Record<number, string> = {
  1: '0 0 45px rgba(91,107,132,0.35), 0 0 90px rgba(91,107,132,0.14)',
  2: '0 0 45px rgba(255,122,47,0.4), 0 0 100px rgba(255,122,47,0.16)',
  3: '0 0 50px rgba(255,194,71,0.45), 0 0 110px rgba(255,122,47,0.18)',
  4: '0 0 55px rgba(255,77,94,0.5), 0 0 120px rgba(255,77,94,0.2)',
  5: '0 0 60px rgba(255,214,130,0.6), 0 0 150px rgba(255,194,71,0.3)',
};

export interface SmashResult {
  amount: string;
  crit: boolean;
  frenzy: boolean;
  combo: number;
}

interface FloatItem {
  id: number;
  x: number;
  y: number;
  text: string;
  kind: 'normal' | 'crit' | 'frenzy';
}
interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
}

interface Props {
  stage: number;
  level: number;
  title: string;
  lang: Lang;
  progress: number;
  toNextText: string;
  clickPowerText: string;
  perClickLabel: string;
  combo: number;
  frenzy: boolean;
  tier: number;
  equipped: { icon: string; lvl: number }[];
  lvlLabel: string;
  onSmash: () => SmashResult;
}

let uid = 1;

export function Character({
  stage,
  level,
  title,
  lang,
  progress,
  toNextText,
  clickPowerText,
  perClickLabel,
  combo,
  frenzy,
  tier,
  equipped,
  lvlLabel,
  onSmash,
}: Props) {
  /* Sahur visually grows with every level: art scales up inside the ring. */
  const bodyScale = 0.86 + level * 0.03;
  const [floats, setFloats] = useState<FloatItem[]>([]);
  const [parts, setParts] = useState<Particle[]>([]);
  const arenaRef = useRef<HTMLDivElement>(null);
  const pumpRef = useRef<HTMLDivElement>(null);

  const CIRC = 2 * Math.PI * 48;

  const handleDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const res = onSmash();
    const rect = arenaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // pump animation restart
    const el = pumpRef.current;
    if (el) {
      el.classList.remove('anim-pump');
      void el.offsetWidth;
      el.classList.add('anim-pump');
    }

    const id = uid++;
    const isCrit = res.crit;
    setFloats((f) => {
      const item: FloatItem = {
        id,
        x: x + (Math.random() * 36 - 18),
        y: y - 12,
        text: isCrit ? `+${res.amount} ★` : `+${res.amount}`,
        kind: isCrit ? 'crit' : res.frenzy ? 'frenzy' : 'normal',
      };
      const next = [...f, item];
      return next.length > 14 ? next.slice(next.length - 14) : next;
    });
    window.setTimeout(
      () => setFloats((f) => f.filter((i) => i.id !== id)),
      900,
    );

    const count = isCrit ? 12 : 6;
    const color = isCrit ? '#ff4d5e' : frenzy ? '#ffc247' : '#ece6d9';
    const newParts: Particle[] = Array.from({ length: count }, () => {
      const a = Math.random() * Math.PI * 2;
      const d = 40 + Math.random() * 60;
      return {
        id: uid++,
        x,
        y,
        dx: Math.cos(a) * d,
        dy: Math.sin(a) * d - 20,
        color,
      };
    });
    setParts((p) => [...p.slice(-24), ...newParts]);
    const ids = new Set(newParts.map((p) => p.id));
    window.setTimeout(
      () => setParts((p) => p.filter((i) => !ids.has(i.id))),
      720,
    );

    if (isCrit && arenaRef.current) {
      const a = arenaRef.current;
      a.classList.remove('anim-shake');
      void a.offsetWidth;
      a.classList.add('anim-shake');
    }
  };

  const comboMult = (1 + 0.01 * combo).toFixed(2).replace('.', lang === 'ru' ? ',' : '.');

  return (
    <div className="relative flex flex-col items-center gap-1.5 select-none sm:gap-3">
      {/* arena */}
      <div
        ref={arenaRef}
        onPointerDown={handleDown}
        className="relative aspect-square w-[min(46vw,205px)] cursor-pointer touch-none sm:w-[min(50vw,320px)] lg:w-[340px]"
      >
        {/* progress ring */}
        <svg viewBox="0 0 100 100" className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] -rotate-90">
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(46,57,80,0.9)" strokeWidth="3.4" />
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke={frenzy ? '#ffc247' : '#ff7a2f'}
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 0.35s ease, stroke 0.3s' }}
          />
        </svg>

        {/* tier aura (behind the circle) */}
        <div
          className="pointer-events-none absolute -inset-2 rounded-full"
          style={{
            boxShadow: TIER_GLOW[tier] ?? TIER_GLOW[1],
            transition: 'box-shadow 1.2s ease',
          }}
        />

        {/* character circle */}
        <div
          ref={pumpRef}
          className={`absolute inset-0 overflow-hidden rounded-full border-[3px] bg-ink2 shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-transform duration-75 active:scale-[0.94] ${
            frenzy ? 'border-gold anim-ring-pulse' : 'border-line'
          }`}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${bodyScale})`,
              transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.3, 1)',
            }}
          >
            <div className="anim-breathe absolute inset-0">
              <StageArt stage={stage} className="h-full w-full" />
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 30%, rgba(255,230,170,0.18), rgba(0,0,0,0) 55%), radial-gradient(circle at 50% 120%, rgba(0,0,0,0.55), rgba(0,0,0,0) 60%)',
            }}
          />
          {frenzy && (
            <div className="anim-frenzy pointer-events-none absolute inset-0 bg-gold" />
          )}
        </div>

        {/* combo badge */}
        {combo >= 5 && (
          <div
            key={combo}
            className="anim-combo absolute -top-1 -right-1 z-10 rounded-md border border-line bg-panel px-2.5 py-1 font-display text-sm text-gold shadow-lg"
          >
            ×{comboMult}
          </div>
        )}

        {/* floating texts */}
        {floats.map((f) => (
          <div
            key={f.id}
            className={`anim-float-up pointer-events-none absolute z-20 font-display ${
              f.kind === 'crit'
                ? 'text-2xl text-blood sm:text-3xl'
                : f.kind === 'frenzy'
                  ? 'text-xl text-gold sm:text-2xl'
                  : 'text-lg text-chalk sm:text-xl'
            }`}
            style={{
              left: f.x,
              top: f.y,
              textShadow: '0 2px 8px rgba(0,0,0,0.9)',
            }}
          >
            {f.text}
          </div>
        ))}

        {/* particles */}
        {parts.map((p) => (
          <span
            key={p.id}
            className="anim-part pointer-events-none absolute z-20 h-2 w-2 rounded-sm"
            style={
              {
                left: p.x,
                top: p.y,
                background: p.color,
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* level plate */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="hazard-thin h-[7px] w-44 rounded-full opacity-80" />
        <div className="rounded-md border border-line bg-panel/90 px-5 py-2 text-center shadow-lg backdrop-blur-sm">
          <div className="chalk-label">{title}</div>
          <div className="font-display text-xl leading-tight text-chalk">
            {level}
            <span className="text-muted"> / 20</span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line bg-ink2/90 px-3 py-1 text-xs font-bold text-muted">
          <Icon name="flame" size={13} className="text-ember" />
          <span>{toNextText}</span>
        </div>
      </div>

      {/* click power chip */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-ember/40 bg-ember/10 px-3.5 py-1.5 text-sm font-extrabold text-ember">
          <Icon name="fist" size={15} />
          <span className="font-display">{clickPowerText}</span>
          <span className="text-[11px] font-bold text-ember/80">{perClickLabel}</span>
        </div>
      </div>

      {/* equipped gear — grows as the player shops */}
      {equipped.length > 0 && (
        <div className="anim-fade flex flex-wrap items-center justify-center gap-1.5">
          {equipped.map((e) => (
            <span
              key={e.icon}
              className="flex items-center gap-1 rounded-full border border-line bg-panel/90 px-2 py-1 text-[11px] font-extrabold text-muted shadow"
            >
              <Icon name={e.icon as IconName} size={13} className="text-gold" />
              {lvlLabel} {e.lvl}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
