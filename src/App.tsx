import { useCallback, useEffect, useRef, useState } from 'react';
import { Character, type SmashResult } from './components/Character';
import { GymScene } from './components/GymScene';
import { HUD } from './components/HUD';
import { Icon } from './components/Icons';
import {
  AdSimOverlay,
  IntroOverlay,
  LevelUpModal,
  OfflineModal,
  SettingsModal,
  Toasts,
  type Toast,
} from './components/Modals';
import { Shop, type ShopTab } from './components/Shop';
import { audio } from './game/audio';
import {
  AD_BOOST_MS,
  ALL_UPGRADES,
  COMBO_MAX,
  COMBO_WINDOW_MS,
  CRIT_MULT,
  EVOLUTION,
  FRENZY_MS,
  I18N,
  OFFLINE_CAP_SEC,
  OFFLINE_RATE,
  stageOf,
} from './game/config';
import { fmt } from './game/format';
import { preloadStages } from './game/images';
import * as YS from './game/sdk';
import * as G from './game/state';
import type { Boost, Lang } from './game/types';

let toastUid = 1;

export default function App() {
  /* ---------------- core refs ---------------- */
  const stateRef = useRef(G.loadLocal() ?? G.newState());
  const boostsRef = useRef<Boost[]>([]);
  const comboRef = useRef(0);
  const comboUntilRef = useRef(0);
  const altTapRef = useRef(false);
  const goldenActiveRef = useRef(false);
  const nextGoldenRef = useRef(Date.now() + 40000);
  const pendingOfflineRef = useRef(0);
  const stageRef = useRef(stageOf(stateRef.current.level).img);
  const adSimCbRef = useRef<(() => void) | null>(null);
  const langRef = useRef<Lang>('ru');

  /* ---------------- ui state ---------------- */
  const [, setTick] = useState(0);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState<ShopTab>('gear');
  const [levelUp, setLevelUp] = useState<{
    level: number;
    evolved: boolean;
  } | null>(null);
  const [offline, setOffline] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [adSim, setAdSim] = useState(false);
  const [golden, setGolden] = useState<{ key: number } | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [flash, setFlash] = useState<{ text: string; key: number } | null>(null);
  const [cloudOn, setCloudOn] = useState(false);
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = stateRef.current.lang;
    if (saved === 'ru' || saved === 'en') return saved;
    return 'ru';
  });
  const [muted, setMutedState] = useState(stateRef.current.muted);

  langRef.current = lang;
  audio.muted = muted;

  const t = useCallback(
    (k: string) => I18N[lang][k] ?? I18N.ru[k] ?? k,
    [lang],
  );

  const lastLocalSaveRef = useRef(0);
  const persist = useCallback((force = false) => {
    const s = stateRef.current;
    const nowMs = Date.now();
    // throttle localStorage writes (hot path: every click)
    if (force || nowMs - lastLocalSaveRef.current > 2000) {
      lastLocalSaveRef.current = nowMs;
      G.saveLocal(s);
    }
    YS.saveCloud(G.saveObject(s), force);
  }, []);

  const onLevelReached = useCallback(
    (lvl: number) => {
      const img = stageOf(lvl).img;
      const evolved = img !== stageRef.current;
      stageRef.current = img;
      setLevelUp({ level: lvl, evolved });
      audio.levelUp();
      persist(true);
    },
    [persist],
  );

  const checkAch = useCallback(() => {
    const fresh = G.checkAchievements(stateRef.current);
    if (fresh.length > 0) {
      audio.achievement();
      const items: Toast[] = fresh.map((a) => ({
        id: toastUid++,
        title: a.name[langRef.current],
        icon: 'medal',
      }));
      setToasts((prev) => [...prev.slice(-2), ...items]);
      const ids = new Set(items.map((i) => i.id));
      window.setTimeout(
        () => setToasts((prev) => prev.filter((i) => !ids.has(i.id))),
        3600,
      );
      persist();
    }
  }, [persist]);

  /* ---------------- boot: SDK + saves + assets ---------------- */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      await YS.initSDK();
      if (cancelled) return;
      const sl = YS.sdkLang();
      if (!stateRef.current.lang && sl) {
        const l: Lang = sl === 'ru' || sl === 'uk' || sl === 'be' ? 'ru' : 'en';
        setLangState(l);
      }
      const cloud = await YS.loadCloud();
      const cloudState = cloud ? G.parseSave(cloud) : null;
      if (cloudState && cloudState.totalEarned > stateRef.current.totalEarned) {
        stateRef.current = cloudState;
        stageRef.current = stageOf(cloudState.level).img;
        setMutedState(cloudState.muted);
      }
      // offline earnings
      const s = stateRef.current;
      const elapsed = (Date.now() - s.lastSeen) / 1000;
      const aps = G.effAuto(s, [], Date.now());
      if (elapsed > 300 && aps > 0) {
        pendingOfflineRef.current = Math.floor(
          aps * Math.min(elapsed, OFFLINE_CAP_SEC) * OFFLINE_RATE,
        );
      }
      setCloudOn(YS.hasCloud());
      if (cancelled) return;
      YS.loadingReady();
      setLoading(false);
      // AI artwork loads in the background; SVG fallback shows instantly
      void preloadStages();
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------------- game loop ---------------- */
  useEffect(() => {
    if (!started) return;
    let raf = 0;
    let last = performance.now();
    let uiAcc = 0;
    let achAcc = 0;
    let saveAcc = 0;
    const loop = (nowP: number) => {
      const dt = Math.min(0.25, (nowP - last) / 1000);
      last = nowP;
      const now = Date.now();
      const s = stateRef.current;

      // prune expired boosts
      if (boostsRef.current.some((b) => b.until <= now)) {
        boostsRef.current = boostsRef.current.filter((b) => b.until > now);
      }

      const aps = G.effAuto(s, boostsRef.current, now);
      if (aps > 0) {
        G.earn(s, aps * dt);
        const nl = G.checkLevel(s);
        if (nl > 0) onLevelReached(nl);
      }

      if (comboRef.current > 0 && now > comboUntilRef.current) {
        comboRef.current = 0;
      }

      // golden dumbbell spawn
      if (!goldenActiveRef.current && now > nextGoldenRef.current) {
        goldenActiveRef.current = true;
        setGolden({ key: now });
        window.setTimeout(() => {
          if (goldenActiveRef.current) {
            goldenActiveRef.current = false;
            setGolden(null);
            nextGoldenRef.current =
              Date.now() + 25000 + Math.random() * 25000;
          }
        }, 11000);
      }

      uiAcc += dt;
      if (uiAcc >= 0.1) {
        uiAcc = 0;
        setTick((x) => x + 1);
      }
      achAcc += dt;
      if (achAcc >= 0.6) {
        achAcc = 0;
        checkAch();
      }
      saveAcc += dt;
      if (saveAcc >= 10) {
        saveAcc = 0;
        persist();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [started, checkAch, onLevelReached, persist]);

  /* ---------------- lifecycle saves + background catch-up ---------------- */
  useEffect(() => {
    let hiddenAt = 0;
    const onVis = () => {
      if (document.visibilityState === 'hidden') {
        hiddenAt = Date.now();
        persist(true);
      } else if (started && hiddenAt > 0) {
        // rAF is paused in background — silently credit auto income (capped)
        const gap = Math.min((Date.now() - hiddenAt) / 1000, 7200);
        hiddenAt = 0;
        if (gap > 5) {
          const s = stateRef.current;
          const aps = G.effAuto(s, boostsRef.current, Date.now());
          if (aps > 0) {
            G.earn(s, aps * gap);
            const nl = G.checkLevel(s);
            if (nl > 0) onLevelReached(nl);
            persist(true);
            setTick((x) => x + 1);
          }
        }
      }
    };
    const onUnload = () => persist(true);
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('beforeunload', onUnload);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [persist, started, onLevelReached]);

  /* ---------------- level-up modal auto close ---------------- */
  useEffect(() => {
    if (levelUp === null) return;
    const tm = window.setTimeout(
      () => setLevelUp(null),
      levelUp.evolved ? 3400 : 2100,
    );
    return () => window.clearTimeout(tm);
  }, [levelUp]);

  /* ---------------- actions ---------------- */
  const onSmash = useCallback((): SmashResult => {
    const s = stateRef.current;
    const now = Date.now();
    comboRef.current =
      now < comboUntilRef.current
        ? Math.min(comboRef.current + 1, COMBO_MAX)
        : 1;
    comboUntilRef.current = now + COMBO_WINDOW_MS;

    let amount = G.effClick(s, boostsRef.current, now, comboRef.current);
    let crit = false;
    if (Math.random() < G.critChanceOf(s)) {
      amount *= CRIT_MULT;
      crit = true;
      s.totalCrits++;
      audio.crit();
    } else {
      altTapRef.current = !altTapRef.current;
      audio.tap(altTapRef.current);
    }
    const final = Math.max(1, Math.floor(amount));
    G.earn(s, final);
    s.totalClicks++;
    const nl = G.checkLevel(s);
    if (nl > 0) onLevelReached(nl);
    const frenzy = boostsRef.current.some(
      (b) => b.id === 'frenzy' && b.until > now,
    );
    persist();
    return { amount: fmt(final, langRef.current), crit, frenzy, combo: comboRef.current };
  }, [onLevelReached, persist]);

  const onBuy = useCallback(
    (id: string): boolean => {
      const ok = G.buyUpgrade(stateRef.current, id);
      if (ok) {
        audio.buy();
        persist();
        setTick((x) => x + 1);
      } else {
        audio.deny();
      }
      return ok;
    },
    [persist],
  );

  const grantAdBoost = useCallback(() => {
    boostsRef.current = [
      ...boostsRef.current.filter((b) => b.id !== 'ad'),
      { id: 'ad', mult: 2, until: Date.now() + AD_BOOST_MS },
    ];
    audio.buy();
    setTick((x) => x + 1);
  }, []);

  const onRewardAd = useCallback(() => {
    const ok = YS.showRewarded({
      onReward: grantAdBoost,
      onClose: () => undefined,
    });
    if (!ok) {
      adSimCbRef.current = grantAdBoost;
      setAdSim(true);
    }
  }, [grantAdBoost]);

  const catchGolden = useCallback(() => {
    if (!goldenActiveRef.current) return;
    const s = stateRef.current;
    const now = Date.now();
    const reward = Math.floor(
      Math.max(
        G.effAuto(s, boostsRef.current, now) * 90,
        G.effClick(s, boostsRef.current, now, 0) * 120,
        500,
      ),
    );
    G.earn(s, reward);
    s.totalGoldens++;
    const nl = G.checkLevel(s);
    if (nl > 0) onLevelReached(nl);
    boostsRef.current = [
      ...boostsRef.current.filter((b) => b.id !== 'frenzy'),
      { id: 'frenzy', mult: 3, until: now + FRENZY_MS },
    ];
    audio.golden();
    goldenActiveRef.current = false;
    setGolden(null);
    nextGoldenRef.current = now + 30000 + Math.random() * 30000;
    setFlash({
      text: `${t('caught')} +${fmt(reward, langRef.current)}`,
      key: now,
    });
    window.setTimeout(() => setFlash(null), 1400);
    persist(true);
  }, [onLevelReached, persist, t]);

  const claimOffline = useCallback(
    (mult: number) => {
      const doClaim = (m: number) => {
        const s = stateRef.current;
        G.earn(s, Math.floor((pendingOfflineRef.current || 0) * m));
        const nl = G.checkLevel(s);
        if (nl > 0) onLevelReached(nl);
        pendingOfflineRef.current = 0;
        setOffline(null);
        audio.buy();
        persist(true);
      };
      if (mult === 2) {
        const ok = YS.showRewarded({
          onReward: () => doClaim(2),
          onClose: () => undefined,
        });
        if (!ok) {
          adSimCbRef.current = () => doClaim(2);
          setAdSim(true);
        }
      } else {
        doClaim(1);
      }
    },
    [onLevelReached, persist],
  );

  const startGame = useCallback(() => {
    audio.unlock();
    audio.tap(false);
    YS.gameplayStart();
    setStarted(true);
    nextGoldenRef.current = Date.now() + 30000 + Math.random() * 15000;
    if (pendingOfflineRef.current > 0) {
      setOffline(pendingOfflineRef.current);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMutedState((m) => {
      stateRef.current.muted = !m;
      persist();
      return !m;
    });
  }, [persist]);

  const changeLang = useCallback(
    (l: Lang) => {
      setLangState(l);
      stateRef.current.lang = l;
      persist();
    },
    [persist],
  );

  const resetGame = useCallback(() => {
    stateRef.current = G.newState();
    stateRef.current.lang = langRef.current;
    stateRef.current.muted = audio.muted;
    G.clearLocal();
    boostsRef.current = [];
    comboRef.current = 0;
    comboUntilRef.current = 0;
    goldenActiveRef.current = false;
    pendingOfflineRef.current = 0;
    stageRef.current = 1;
    nextGoldenRef.current = Date.now() + 30000 + Math.random() * 15000;
    setGolden(null);
    setFlash(null);
    setTab('gear');
    persist(true);
    setShowSettings(false);
    setLevelUp(null);
    setOffline(null);
    setTick((x) => x + 1);
  }, [persist]);

  /* ---------------- derived (render snapshot) ---------------- */
  const s = stateRef.current;
  const now = Date.now();
  const stage = stageOf(s.level);
  const frenzyBoost = boostsRef.current.find(
    (b) => b.id === 'frenzy' && b.until > now,
  );
  const frenzy = !!frenzyBoost;
  const perSec = G.effAuto(s, boostsRef.current, now);
  const perClick = G.effClick(s, boostsRef.current, now, 0);
  const progress = G.progressToNext(s);
  const next = EVOLUTION.find((e) => e.level === s.level + 1);
  const toNextText = next
    ? `${fmt(Math.max(0, Math.ceil(next.coins - s.totalEarned)), lang)} ${t('toNext')} ${next.level}`
    : t('maxLevel');
  const equipped = ALL_UPGRADES.filter((u) => (s.levels[u.id] ?? 0) > 0)
    .sort((a, b) => (s.levels[b.id] ?? 0) - (s.levels[a.id] ?? 0))
    .slice(0, 3)
    .map((u) => ({ icon: u.icon, lvl: s.levels[u.id] ?? 0 }));

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden font-body text-chalk"
      onContextMenu={(e) => e.preventDefault()}
    >
      <HUD
        lang={lang}
        t={t}
        coins={s.coins}
        perSec={perSec}
        perClick={perClick}
        muted={muted}
        boosts={boostsRef.current}
        now={now}
        onMute={toggleMute}
        onSettings={() => setShowSettings(true)}
      />

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* ------------ scene ------------ */}
        <main className="relative min-h-0 flex-1 overflow-hidden">
          <GymScene tier={stage.img} />

          {/* frenzy tint */}
          {frenzy && (
            <div className="anim-frenzy pointer-events-none absolute inset-0 z-10 bg-gold" />
          )}

          {/* frenzy banner */}
          {frenzy && (
            <div className="absolute top-3 left-1/2 z-30 -translate-x-1/2">
              <div className="flex items-center gap-2 rounded-full border border-gold/70 bg-[rgba(20,16,6,0.85)] px-4 py-1.5 shadow-[0_0_30px_rgba(255,194,71,0.35)]">
                <Icon name="star" size={16} className="text-gold" />
                <span className="font-display text-sm tracking-wide text-gold">
                  {t('frenzy')} ×3
                </span>
                <span className="text-xs font-bold text-gold/80">
                  {frenzyBoost
                    ? Math.max(0, Math.ceil((frenzyBoost.until - now) / 1000))
                    : 0}
                  s
                </span>
              </div>
            </div>
          )}

          {/* golden dumbbell */}
          {golden && started && (
            <button
              key={golden.key}
              onClick={catchGolden}
              aria-label="golden dumbbell"
              className="anim-golden-fly absolute top-[15%] left-0 z-30 cursor-pointer"
            >
              <div className="anim-golden-bob flex flex-col items-center gap-1">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-[rgba(60,45,10,0.7)] text-gold shadow-[0_0_35px_rgba(255,194,71,0.65)]">
                  <Icon name="dumbbell" size={32} />
                </div>
                <span className="rounded bg-[rgba(10,12,18,0.75)] px-2 py-0.5 text-[10px] font-extrabold text-gold">
                  {t('goldenHint')}
                </span>
              </div>
            </button>
          )}

          {/* catch flash */}
          {flash && (
            <div
              key={flash.key}
              className="anim-pop pointer-events-none absolute top-[24%] left-1/2 z-40 -translate-x-1/2"
            >
              <div className="whitespace-nowrap rounded-lg border border-gold/70 bg-[rgba(20,16,6,0.9)] px-5 py-2.5 font-display text-lg text-gold shadow-[0_0_40px_rgba(255,194,71,0.4)]">
                {flash.text}
              </div>
            </div>
          )}

          {/* character */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pb-4 lg:pb-8">
            <Character
              stage={stage.img}
              level={s.level}
              title={stage.title[lang]}
              lang={lang}
              progress={progress}
              toNextText={toNextText}
              clickPowerText={fmt(perClick, lang)}
              perClickLabel={t('perClick')}
              combo={comboRef.current}
              frenzy={frenzy}
              tier={stage.img}
              equipped={equipped}
              lvlLabel={t('lvl')}
              onSmash={onSmash}
            />
          </div>

          {/* bottom fade into shop on mobile */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[rgba(18,22,31,0.9)] to-transparent lg:hidden" />
        </main>

        {/* ------------ shop ------------ */}
        <aside className="relative z-30 flex h-[44%] min-h-0 shrink-0 flex-col border-t-2 border-ember/70 bg-panel shadow-[0_-14px_40px_rgba(0,0,0,0.45)] lg:h-auto lg:w-[400px] lg:border-t-0 lg:border-l lg:border-line lg:shadow-none">
          <Shop
            lang={lang}
            t={t}
            state={s}
            boosts={boostsRef.current}
            now={now}
            tab={tab}
            setTab={setTab}
            onBuy={onBuy}
            onRewardAd={onRewardAd}
            hasAds={true}
          />
        </aside>
      </div>

      {/* ------------ overlays ------------ */}
      {toasts.length > 0 && <Toasts toasts={toasts} t={t} />}

      {levelUp !== null && (
        <LevelUpModal
          level={levelUp.level}
          evolved={levelUp.evolved}
          title={stageOf(levelUp.level).title[lang]}
          stage={stageOf(levelUp.level).img}
          t={t}
          onClose={() => setLevelUp(null)}
        />
      )}

      {offline !== null && started && (
        <OfflineModal
          amount={offline}
          lang={lang}
          t={t}
          hasAds={true}
          onClaim={claimOffline}
        />
      )}

      {showSettings && (
        <SettingsModal
          t={t}
          muted={muted}
          lang={lang}
          cloud={cloudOn}
          onMute={toggleMute}
          onLang={changeLang}
          onReset={resetGame}
          onClose={() => setShowSettings(false)}
        />
      )}

      {adSim && (
        <AdSimOverlay
          t={t}
          onDone={() => {
            adSimCbRef.current?.();
            adSimCbRef.current = null;
            setAdSim(false);
          }}
        />
      )}

      {!started && (
        <IntroOverlay loading={loading} t={t} onStart={startGame} />
      )}
    </div>
  );
}
