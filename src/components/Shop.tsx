import { useState } from 'react';
import {
  ACHIEVEMENTS,
  ACH_BONUS,
  AUTO_UPGRADES,
  CLICK_UPGRADES,
  SPECIAL_UPGRADES,
  UPGRADE_NAMES,
} from '../game/config';
import { fmt } from '../game/format';
import { achMultOf, costOf } from '../game/state';
import type { Boost, GameState, Lang, UpgradeDef } from '../game/types';
import { Icon, type IconName } from './Icons';

export type ShopTab = 'gear' | 'auto' | 'boost' | 'awards';

interface Props {
  lang: Lang;
  t: (k: string) => string;
  state: GameState;
  boosts: Boost[];
  now: number;
  tab: ShopTab;
  setTab: (t: ShopTab) => void;
  onBuy: (id: string) => boolean;
  onRewardAd: () => void;
  hasAds: boolean;
}

function metricValue(s: GameState, m: string): number {
  switch (m) {
    case 'clicks':
      return s.totalClicks;
    case 'earned':
      return s.totalEarned;
    case 'level':
      return s.level;
    case 'crits':
      return s.totalCrits;
    case 'goldens':
      return s.totalGoldens;
    case 'buys':
      return s.totalBuys;
    default:
      return 0;
  }
}

export function Shop({
  lang,
  t,
  state,
  boosts,
  now,
  tab,
  setTab,
  onBuy,
  onRewardAd,
  hasAds,
}: Props) {
  const [flash, setFlash] = useState<{ id: string; key: number } | null>(null);

  const tabs: { id: ShopTab; icon: IconName; label: string }[] = [
    { id: 'gear', icon: 'dumbbell', label: t('tabGear') },
    { id: 'auto', icon: 'bro', label: t('tabAuto') },
    { id: 'boost', icon: 'zap', label: t('tabBoost') },
    { id: 'awards', icon: 'trophy', label: t('tabAwards') },
  ];

  const buy = (id: string) => {
    if (onBuy(id)) {
      setFlash((f) => ({ id, key: (f?.key ?? 0) + 1 }));
    }
  };

  const effectText = (def: UpgradeDef, lvl: number): string => {
    switch (def.kind) {
      case 'click':
        return `+${fmt(def.power, lang)} ${t('perClickUp')}`;
      case 'auto':
        return `+${fmt(def.power, lang)} ${t('perSecUp')}`;
      case 'crit':
        return `${t('critChance')}: ${lvl * def.power}% → ${Math.min((lvl + 1) * def.power, 50)}%`;
      case 'clickMult':
        return `+${def.power}% ${t('clickBonus')}`;
      case 'autoMult':
        return `+${def.power}% ${t('autoBonus')}`;
    }
  };

  const renderItem = (def: UpgradeDef) => {
    const lvl = state.levels[def.id] ?? 0;
    const maxed = def.max !== undefined && lvl >= def.max;
    const cost = costOf(def, lvl);
    const afford = !maxed && state.coins >= cost;
    const name = UPGRADE_NAMES[def.id]?.[lang] ?? def.id;
    const isFlash = flash?.id === def.id;
    return (
      <button
        key={def.id}
        onClick={() => buy(def.id)}
        disabled={!afford}
        className={`group relative w-full overflow-hidden rounded-lg border p-2.5 text-left transition-all duration-150 ${
          afford
            ? 'border-line bg-panel2 hover:border-ember/60 hover:bg-[#2a3345] active:scale-[0.98]'
            : 'cursor-not-allowed border-line/60 bg-panel opacity-60'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            key={isFlash ? flash!.key : undefined}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line bg-ink2 ${
              afford ? 'text-ember' : 'text-steel'
            } ${isFlash ? 'anim-cost-flash' : ''}`}
          >
            <Icon name={def.icon as IconName} size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-[13px] font-extrabold text-chalk">
                {name}
              </span>
              <span className="shrink-0 rounded bg-ink2 px-1.5 py-0.5 text-[10px] font-bold text-muted">
                {t('lvl')} {lvl}
                {def.max ? `/${def.max}` : ''}
              </span>
            </div>
            <div className="mt-0.5 text-[11px] font-semibold text-muted">
              {effectText(def, lvl)}
            </div>
          </div>
          <div
            className={`flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1.5 text-[13px] font-extrabold ${
              maxed
                ? 'bg-gold/15 text-gold'
                : afford
                  ? 'bg-ember text-ink group-hover:bg-gold'
                  : 'bg-ink2 text-steel'
            }`}
          >
            {maxed ? (
              t('maxed')
            ) : (
              <>
                <Icon name="flame" size={13} />
                {fmt(cost, lang)}
              </>
            )}
          </div>
        </div>
      </button>
    );
  };

  const adBoost = boosts.find((b) => b.id === 'ad' && b.until > now);
  const frenzyBoost = boosts.find((b) => b.id === 'frenzy' && b.until > now);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* tabs */}
      <div className="grid grid-cols-4 gap-1 border-b border-line bg-ink2 p-1.5">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={`flex flex-col items-center gap-0.5 rounded-md px-1 py-1.5 text-[10px] font-extrabold uppercase tracking-wide transition-all sm:flex-row sm:justify-center sm:gap-1.5 sm:text-[11px] ${
              tab === tb.id
                ? 'bg-ember text-ink shadow-md'
                : 'text-muted hover:bg-panel2 hover:text-chalk'
            }`}
          >
            <Icon name={tb.icon} size={15} />
            {tb.label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {tab === 'gear' && (
          <div className="flex flex-col gap-1.5">
            <div className="chalk-label px-1 pt-1">{t('tabGear')}</div>
            {CLICK_UPGRADES.map(renderItem)}
          </div>
        )}
        {tab === 'auto' && (
          <div className="flex flex-col gap-1.5">
            <div className="chalk-label px-1 pt-1">{t('tabAuto')}</div>
            {AUTO_UPGRADES.map(renderItem)}
          </div>
        )}
        {tab === 'boost' && (
          <div className="flex flex-col gap-1.5">
            <div className="chalk-label px-1 pt-1">{t('tabBoost')}</div>
            {SPECIAL_UPGRADES.map(renderItem)}
            {/* rewarded ad card */}
            <div className="relative mt-1 overflow-hidden rounded-lg border border-gold/40 bg-panel2">
              <div className="hazard-thin h-[6px] w-full" />
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-gold/40 bg-ink2 text-gold">
                    <Icon name="play" size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-extrabold text-chalk">
                      {t('boostX2')}
                    </div>
                    <div className="text-[11px] font-semibold text-muted">
                      {t('boostX2Desc')}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onRewardAd}
                  disabled={!!adBoost}
                  className={`mt-2.5 flex w-full items-center justify-center gap-2 rounded-md py-2 font-display text-sm transition-all ${
                    adBoost
                      ? 'cursor-default bg-ink2 text-gold'
                      : 'bg-gold text-ink hover:brightness-110 active:scale-[0.98]'
                  }`}
                >
                  <Icon name={adBoost ? 'clock' : 'play'} size={16} />
                  {adBoost
                    ? `${t('boostActive')}: ${Math.ceil((adBoost.until - now) / 1000)}s`
                    : t('boostX2')}
                </button>
              </div>
            </div>
            {frenzyBoost && (
              <div className="flex items-center gap-2 rounded-lg border border-gold/40 bg-gold/10 p-2.5 text-[12px] font-bold text-gold">
                <Icon name="star" size={16} />
                {t('frenzy')} ×3 — {Math.ceil((frenzyBoost.until - now) / 1000)}s
              </div>
            )}
            {hasAds === false && (
              <div className="flex items-start gap-2 rounded-lg border border-line bg-panel p-2.5 text-[11px] font-semibold text-muted">
                <Icon name="info" size={15} className="mt-0.5 shrink-0" />
                <span>SDK: {t('cloudOff')}</span>
              </div>
            )}
          </div>
        )}
        {tab === 'awards' && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-1 pt-1">
              <div className="chalk-label">{t('tabAwards')}</div>
              <div className="rounded bg-gold/15 px-2 py-0.5 text-[11px] font-extrabold text-gold">
                {t('totalBonus')}: +
                {Math.round((achMultOf(state) - 1) * 100)}%
              </div>
            </div>
            {ACHIEVEMENTS.map((a) => {
              const done = state.achievements.includes(a.id);
              const val = Math.min(metricValue(state, a.metric), a.target);
              const pct = Math.min(100, (val / a.target) * 100);
              return (
                <div
                  key={a.id}
                  className={`rounded-lg border p-2.5 ${
                    done ? 'border-gold/50 bg-gold/[0.07]' : 'border-line bg-panel'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border ${
                        done
                          ? 'border-gold/50 bg-gold/15 text-gold'
                          : 'border-line bg-ink2 text-steel'
                      }`}
                    >
                      <Icon
                        name={done ? (a.icon as IconName) : 'lock'}
                        size={19}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-[13px] font-extrabold ${done ? 'text-gold' : 'text-chalk'}`}
                      >
                        {a.name[lang]}
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink2">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${done ? 'bg-gold' : 'bg-ember'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-[11px] font-bold text-muted">
                        {fmt(val, lang)}/{fmt(a.target, lang)}
                      </div>
                      <div className="text-[11px] font-extrabold text-lime">
                        +{Math.round(ACH_BONUS * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
