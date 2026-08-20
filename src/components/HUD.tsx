import { fmt } from '../game/format';
import type { Boost, Lang } from '../game/types';
import { Icon } from './Icons';

interface Props {
  lang: Lang;
  t: (k: string) => string;
  coins: number;
  perSec: number;
  perClick: number;
  muted: boolean;
  boosts: Boost[];
  now: number;
  onMute: () => void;
  onSettings: () => void;
}

export function HUD({
  lang,
  t,
  coins,
  perSec,
  perClick,
  muted,
  boosts,
  now,
  onMute,
  onSettings,
}: Props) {
  const active = boosts.filter((b) => b.until > now);
  return (
    <header className="relative z-30 border-b border-line bg-ink2/85 backdrop-blur-md">
      <div className="hazard-thin h-[5px] w-full opacity-90" />
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-4 gap-y-1 px-3 py-2 sm:px-5">
        {/* logo */}
        <div className="mr-1 leading-none">
          <div className="font-display text-base tracking-wide text-chalk sm:text-lg">
            ТУН ТУН <span className="text-ember">САХУР</span>
          </div>
          <div className="chalk-label mt-0.5">{t('logoSub')}</div>
        </div>

        <div className="hidden h-8 w-px bg-line sm:block" />

        {/* calories */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-ember/40 bg-ember/10 text-ember">
            <Icon name="flame" size={20} />
          </div>
          <div className="leading-none">
            <div className="font-display text-xl text-gold sm:text-2xl">
              {fmt(coins, lang)}
            </div>
            <div className="chalk-label">{t('calories')}</div>
          </div>
        </div>

        {/* per second */}
        <div className="flex items-center gap-1.5">
          <Icon name="zap" size={16} className="text-steel" />
          <div className="leading-none">
            <div className="font-display text-sm text-chalk sm:text-base">
              {fmt(perSec, lang)}
            </div>
            <div className="chalk-label">{t('perSec')}</div>
          </div>
        </div>

        {/* per click */}
        <div className="flex items-center gap-1.5">
          <Icon name="fist" size={15} className="text-ember" />
          <div className="leading-none">
            <div className="font-display text-sm text-chalk sm:text-base">
              {fmt(perClick, lang)}
            </div>
            <div className="chalk-label">{t('perClick')}</div>
          </div>
        </div>

        <div className="flex-1" />

        {/* active boosts */}
        {active.map((b) => (
          <div
            key={b.id}
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${
              b.id === 'frenzy'
                ? 'border-gold/60 bg-gold/15 text-gold'
                : 'border-ember/50 bg-ember/10 text-ember'
            }`}
          >
            <Icon name={b.id === 'frenzy' ? 'star' : 'play'} size={13} />
            ×{b.mult}
            <span className="opacity-80">
              {Math.max(0, Math.ceil((b.until - now) / 1000))}s
            </span>
          </div>
        ))}

        {/* buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onMute}
            aria-label="sound"
            className={`flex h-9 w-9 items-center justify-center rounded-md border transition-all active:scale-90 ${
              muted
                ? 'border-line bg-panel text-steel'
                : 'border-line bg-panel text-chalk hover:border-ember/60'
            }`}
          >
            <Icon name={muted ? 'soundOff' : 'soundOn'} size={18} />
          </button>
          <button
            onClick={onSettings}
            aria-label="settings"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-panel text-chalk transition-all hover:border-ember/60 active:scale-90"
          >
            <Icon name="gear" size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
