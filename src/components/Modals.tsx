import { useEffect, useMemo, useRef, useState } from 'react';
import { fmt } from '../game/format';
import type { Lang } from '../game/types';
import { Icon, type IconName } from './Icons';
import { StageArt } from './StageArt';

function Shell({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <div
      className="anim-fade absolute inset-0 z-50 flex items-center justify-center bg-[rgba(8,10,16,0.82)] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="anim-pop relative w-full max-w-sm overflow-hidden rounded-xl border border-line bg-panel shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hazard-thin h-[7px] w-full" />
        {children}
      </div>
    </div>
  );
}

/* ---------------- level up ---------------- */
export function LevelUpModal({
  level,
  title,
  stage,
  lang,
  t,
  onClose,
}: {
  level: number;
  title: string;
  stage: number;
  lang: Lang;
  t: (k: string) => string;
  onClose: () => void;
}) {
  const confetti = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: 8 + Math.random() * 84,
        delay: Math.random() * 0.5,
        cx: (Math.random() * 80 - 40).toFixed(0),
        cr: (Math.random() * 540 - 270).toFixed(0),
        color: ['#ffc247', '#ff7a2f', '#ece6d9', '#ff4d5e', '#7ade7f'][i % 5],
      })),
    [],
  );
  return (
    <Shell onClose={onClose}>
      <div className="relative px-6 py-7 text-center">
        {confetti.map((c) => (
          <span
            key={c.id}
            className="pointer-events-none absolute top-10 h-2.5 w-1.5 rounded-sm"
            style={
              {
                left: `${c.left}%`,
                background: c.color,
                animation: `confettiFall 1.6s ease-in ${c.delay}s both`,
                '--cx': `${c.cx}px`,
                '--cr': `${c.cr}deg`,
              } as React.CSSProperties
            }
          />
        ))}
        <div className="chalk-label">{t('newLevel')}</div>
        <div className="shine-card mt-1 inline-block rounded-lg bg-ember px-6 py-2 font-display text-4xl text-ink">
          {level}
        </div>
        <div className="mt-2 font-display text-xl text-gold">{title}</div>
        <div className="mx-auto mt-4 h-40 w-40 overflow-hidden rounded-full border-[3px] border-gold/60 shadow-[0_0_50px_rgba(255,194,71,0.3)]">
          <StageArt stage={stage} className="anim-breathe h-full w-full" />
        </div>
        <div className="mt-3 text-sm font-bold text-muted">{t('stageUp')}</div>
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-md bg-ember py-2.5 font-display text-sm text-ink transition-all hover:bg-gold active:scale-[0.98]"
        >
          OK
        </button>
      </div>
    </Shell>
  );
}

/* ---------------- offline earnings ---------------- */
export function OfflineModal({
  amount,
  lang,
  t,
  hasAds,
  onClaim,
}: {
  amount: number;
  lang: Lang;
  t: (k: string) => string;
  hasAds: boolean;
  onClaim: (mult: number) => void;
}) {
  return (
    <Shell>
      <div className="px-6 py-7 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-line bg-ink2 text-steel">
          <Icon name="clock" size={26} />
        </div>
        <div className="mt-3 font-display text-xl text-chalk">
          {t('offlineTitle')}
        </div>
        <div className="mt-1 text-sm font-semibold text-muted">
          {t('offlineText')}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 font-display text-3xl text-gold">
          <Icon name="flame" size={26} className="text-ember" />+
          {fmt(amount, lang)}
        </div>
        <div className="mt-5 flex flex-col gap-2">
          {hasAds && (
            <button
              onClick={() => onClaim(2)}
              className="flex items-center justify-center gap-2 rounded-md bg-gold py-2.5 font-display text-sm text-ink transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <Icon name="play" size={16} />
              {t('claimX2')}
            </button>
          )}
          <button
            onClick={() => onClaim(1)}
            className={`rounded-md py-2.5 font-display text-sm transition-all active:scale-[0.98] ${
              hasAds
                ? 'border border-line bg-panel2 text-chalk hover:border-ember/60'
                : 'bg-ember text-ink hover:bg-gold'
            }`}
          >
            {t('claim')}
          </button>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- settings ---------------- */
export function SettingsModal({
  t,
  muted,
  lang,
  cloud,
  onMute,
  onLang,
  onReset,
  onClose,
}: {
  t: (k: string) => string;
  muted: boolean;
  lang: Lang;
  cloud: boolean;
  onMute: () => void;
  onLang: (l: Lang) => void;
  onReset: () => void;
  onClose: () => void;
}) {
  const [confirm, setConfirm] = useState(false);
  return (
    <Shell onClose={onClose}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="font-display text-lg text-chalk">{t('settings')}</div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted transition-all hover:text-chalk active:scale-90"
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between rounded-lg border border-line bg-panel2 px-3 py-2.5">
            <div className="flex items-center gap-2.5 text-sm font-bold text-chalk">
              <Icon
                name={muted ? 'soundOff' : 'soundOn'}
                size={18}
                className="text-ember"
              />
              {t('sound')}
            </div>
            <button
              onClick={onMute}
              className={`rounded-md px-4 py-1.5 text-xs font-extrabold uppercase transition-all active:scale-95 ${
                muted
                  ? 'bg-ink2 text-steel'
                  : 'bg-ember text-ink'
              }`}
            >
              {muted ? t('off') : t('on')}
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-line bg-panel2 px-3 py-2.5">
            <div className="flex items-center gap-2.5 text-sm font-bold text-chalk">
              <Icon name="globe" size={18} className="text-ember" />
              {t('language')}
            </div>
            <div className="flex overflow-hidden rounded-md border border-line">
              {(['ru', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => onLang(l)}
                  className={`px-3.5 py-1.5 text-xs font-extrabold uppercase transition-all ${
                    lang === l ? 'bg-ember text-ink' : 'bg-ink2 text-muted'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-line bg-panel2 px-3 py-2.5">
            <div className="flex items-center gap-2.5 text-sm font-bold text-chalk">
              <Icon
                name={cloud ? 'cloud' : 'cloudOff'}
                size={18}
                className="text-ember"
              />
              {t('cloudSave')}
            </div>
            <span
              className={`text-xs font-extrabold ${cloud ? 'text-lime' : 'text-steel'}`}
            >
              {cloud ? t('cloudOn') : t('cloudOff')}
            </span>
          </div>

          {!confirm ? (
            <button
              onClick={() => setConfirm(true)}
              className="mt-1 flex items-center justify-center gap-2 rounded-md border border-blood/40 bg-blood/10 py-2.5 text-sm font-extrabold text-blood transition-all hover:bg-blood/20 active:scale-[0.98]"
            >
              <Icon name="reset" size={16} />
              {t('reset')}
            </button>
          ) : (
            <div className="mt-1 rounded-md border border-blood/50 bg-blood/10 p-3">
              <div className="text-center text-xs font-extrabold text-blood">
                {t('resetSure')}
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={onReset}
                  className="flex-1 rounded-md bg-blood py-2 text-xs font-extrabold text-ink transition-all active:scale-95"
                >
                  {t('resetYes')}
                </button>
                <button
                  onClick={() => setConfirm(false)}
                  className="flex-1 rounded-md border border-line bg-panel2 py-2 text-xs font-extrabold text-chalk transition-all active:scale-95"
                >
                  {t('resetNo')}
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="mt-4 text-center text-[11px] font-semibold leading-relaxed text-muted">
          {t('about')}
        </p>
      </div>
    </Shell>
  );
}

/* ---------------- intro ---------------- */
export function IntroOverlay({
  loading,
  t,
  onStart,
}: {
  loading: boolean;
  t: (k: string) => string;
  onStart: () => void;
}) {
  const hints: { icon: IconName; text: string }[] = [
    { icon: 'fist', text: t('hint1') },
    { icon: 'dumbbell', text: t('hint2') },
    { icon: 'arrowUp', text: t('hint3') },
  ];
  return (
    <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-ink px-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 30%, rgba(255,122,47,0.12), rgba(0,0,0,0) 70%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255,194,71,0.08), rgba(0,0,0,0))',
        }}
      />
      <div className="hazard-thin absolute top-0 left-0 h-2 w-full" />
      <div className="hazard-thin absolute bottom-0 left-0 h-2 w-full" />

      <div className="anim-pop relative flex flex-col items-center text-center">
        <div className="chalk-label tracking-[0.4em]">{t('introSub')}</div>
        <h1 className="mt-2 font-display text-[clamp(38px,9vw,72px)] leading-none text-chalk">
          ТУН ТУН
          <span className="block text-ember drop-shadow-[0_0_30px_rgba(255,122,47,0.45)]">
            САХУР
          </span>
        </h1>

        <div className="anim-bob relative mt-6 h-40 w-40 overflow-hidden rounded-full border-[3px] border-line shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:h-48 sm:w-48">
          <StageArt stage={1} className="h-full w-full" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 25%, rgba(255,230,170,0.2), rgba(0,0,0,0) 55%)',
            }}
          />
        </div>

        <p className="mt-5 max-w-xs text-sm font-semibold leading-relaxed text-muted">
          {t('introHint')}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {hints.map((h) => (
            <span
              key={h.icon}
              className="flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] font-extrabold text-chalk"
            >
              <Icon name={h.icon} size={13} className="text-ember" />
              {h.text}
            </span>
          ))}
        </div>

        <button
          onClick={onStart}
          disabled={loading}
          className={`group relative mt-7 overflow-hidden rounded-lg px-10 py-3.5 font-display text-lg transition-all ${
            loading
              ? 'cursor-wait bg-panel2 text-muted'
              : 'bg-ember text-ink shadow-[0_10px_35px_rgba(255,122,47,0.4)] hover:bg-gold active:scale-95'
          }`}
        >
          {loading ? (
            t('loading')
          ) : (
            <span className="flex items-center gap-2.5">
              <Icon name="play" size={18} />
              {t('startBtn')}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

/* ---------------- ad simulation (no SDK) ---------------- */
export function AdSimOverlay({
  t,
  onDone,
}: {
  t: (k: string) => string;
  onDone: () => void;
}) {
  const [n, setN] = useState(3);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    if (n <= 0) {
      const tm = window.setTimeout(() => doneRef.current(), 350);
      return () => window.clearTimeout(tm);
    }
    const tm = window.setTimeout(() => setN((v) => v - 1), 800);
    return () => window.clearTimeout(tm);
  }, [n]);
  return (
    <div className="absolute inset-0 z-[70] flex flex-col items-center justify-center bg-[rgba(8,10,16,0.92)]">
      <div className="chalk-label">{t('adTitle')}</div>
      <div className="mt-3 font-display text-7xl text-gold">
        {n > 0 ? n : '✓'}
      </div>
      <div className="mt-3 text-sm font-bold text-muted">
        {t('adWait')}...
      </div>
    </div>
  );
}

/* ---------------- toasts ---------------- */
export interface Toast {
  id: number;
  title: string;
  icon: IconName;
}

export function Toasts({
  toasts,
  t,
}: {
  toasts: Toast[];
  t: (k: string) => string;
}) {
  return (
    <div className="pointer-events-none absolute bottom-3 left-3 z-[55] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="anim-toast flex items-center gap-3 rounded-lg border border-gold/50 bg-panel/95 py-2.5 pr-4 pl-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/50 bg-gold/15 text-gold">
            <Icon name={toast.icon} size={20} />
          </div>
          <div>
            <div className="chalk-label">{t('achUnlocked')}</div>
            <div className="text-[13px] font-extrabold text-chalk">
              {toast.title}
            </div>
            <div className="text-[11px] font-bold text-lime">
              {t('achBonusLine')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
