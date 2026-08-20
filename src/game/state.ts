import {
  ACHIEVEMENTS,
  ACH_BONUS,
  ALL_UPGRADES,
  CRIT_MULT,
  EVOLUTION,
  SAVE_KEY,
  SPECIAL_UPGRADES,
  stageOf,
} from './config';
import type {
  AchievementDef,
  Boost,
  GameState,
  UpgradeDef,
} from './types';

export function newState(): GameState {
  return {
    v: 3,
    coins: 0,
    totalEarned: 0,
    totalClicks: 0,
    totalCrits: 0,
    totalGoldens: 0,
    totalBuys: 0,
    level: 1,
    levels: {},
    achievements: [],
    muted: false,
    lang: null,
    lastSeen: Date.now(),
  };
}

export function costOf(def: UpgradeDef, lvl: number): number {
  return Math.floor(def.base * Math.pow(def.growth, lvl));
}

export function defById(id: string): UpgradeDef | undefined {
  return ALL_UPGRADES.find((u) => u.id === id);
}

/* ---------- derived stats ---------- */
export function clickBase(s: GameState): number {
  let p = 1;
  for (const u of ALL_UPGRADES) {
    if (u.kind === 'click') p += u.power * (s.levels[u.id] ?? 0);
  }
  return p;
}

export function autoBase(s: GameState): number {
  let p = 0;
  for (const u of ALL_UPGRADES) {
    if (u.kind === 'auto') p += u.power * (s.levels[u.id] ?? 0);
  }
  return p;
}

export function clickMultOf(s: GameState): number {
  const d = SPECIAL_UPGRADES.find((u) => u.kind === 'clickMult')!;
  return Math.pow(1 + d.power / 100, s.levels[d.id] ?? 0);
}

export function autoMultOf(s: GameState): number {
  const d = SPECIAL_UPGRADES.find((u) => u.kind === 'autoMult')!;
  return Math.pow(1 + d.power / 100, s.levels[d.id] ?? 0);
}

export function critChanceOf(s: GameState): number {
  const d = SPECIAL_UPGRADES.find((u) => u.kind === 'crit')!;
  return Math.min(((s.levels[d.id] ?? 0) * d.power) / 100, 0.5);
}

export function achMultOf(s: GameState): number {
  return 1 + ACH_BONUS * s.achievements.length;
}

export function boostMultOf(boosts: Boost[], now: number): number {
  let m = 1;
  for (const b of boosts) if (b.until > now) m *= b.mult;
  return m;
}

export function effClick(
  s: GameState,
  boosts: Boost[],
  now: number,
  combo: number,
): number {
  const comboMult = 1 + 0.01 * combo;
  return (
    clickBase(s) *
    clickMultOf(s) *
    achMultOf(s) *
    boostMultOf(boosts, now) *
    comboMult
  );
}

export function effAuto(s: GameState, boosts: Boost[], now: number): number {
  return autoBase(s) * autoMultOf(s) * achMultOf(s) * boostMultOf(boosts, now);
}

/* ---------- mutations ---------- */
export function earn(s: GameState, amount: number) {
  s.coins += amount;
  s.totalEarned += amount;
}

/** Advance level while thresholds are passed. Returns highest reached level or 0. */
export function checkLevel(s: GameState): number {
  let reached = 0;
  for (;;) {
    const next = EVOLUTION.find((e) => e.level === s.level + 1);
    if (!next || s.totalEarned < next.coins) break;
    s.level = next.level;
    reached = next.level;
  }
  return reached;
}

export function buyUpgrade(s: GameState, id: string): boolean {
  const def = defById(id);
  if (!def) return false;
  const lvl = s.levels[id] ?? 0;
  if (def.max !== undefined && lvl >= def.max) return false;
  const cost = costOf(def, lvl);
  if (s.coins < cost) return false;
  s.coins -= cost;
  s.levels[id] = lvl + 1;
  s.totalBuys++;
  return true;
}

/* ---------- achievements ---------- */
function metricValue(s: GameState, m: AchievementDef['metric']): number {
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
  }
}

export function checkAchievements(s: GameState): AchievementDef[] {
  const fresh: AchievementDef[] = [];
  for (const a of ACHIEVEMENTS) {
    if (s.achievements.includes(a.id)) continue;
    if (metricValue(s, a.metric) >= a.target) {
      s.achievements.push(a.id);
      fresh.push(a);
    }
  }
  return fresh;
}

/* ---------- persistence ---------- */
export function saveObject(s: GameState): GameState {
  return { ...s, lastSeen: Date.now() };
}

export function serialize(s: GameState): string {
  return JSON.stringify(saveObject(s));
}

export function parseSave(raw: unknown): GameState | null {
  if (!raw) return null;
  try {
    const d = (
      typeof raw === 'string' ? JSON.parse(raw) : raw
    ) as Partial<GameState> & { coins?: number };
    if (!d || typeof d !== 'object' || typeof d.coins !== 'number') return null;
    const num = (v: unknown, fb = 0) =>
      typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : fb;
    const base = newState();
    return {
      ...base,
      ...d,
      v: 3,
      coins: num(d.coins),
      totalEarned: num(d.totalEarned),
      totalClicks: num(d.totalClicks),
      totalCrits: num(d.totalCrits),
      totalGoldens: num(d.totalGoldens),
      totalBuys: num(d.totalBuys),
      level: Math.min(20, Math.max(1, Math.floor(num(d.level, 1)) || 1)),
      levels:
        d.levels && typeof d.levels === 'object' && !Array.isArray(d.levels)
          ? (d.levels as Record<string, number>)
          : {},
      achievements: Array.isArray(d.achievements)
        ? d.achievements.filter((a) => typeof a === 'string')
        : [],
      muted: !!d.muted,
      lang: d.lang === 'ru' || d.lang === 'en' ? d.lang : null,
      lastSeen: num(d.lastSeen, Date.now()) || Date.now(),
    } as GameState;
  } catch {
    return null;
  }
}

export function loadLocal(): GameState | null {
  try {
    return parseSave(localStorage.getItem(SAVE_KEY));
  } catch {
    return null;
  }
}

export function saveLocal(s: GameState) {
  try {
    localStorage.setItem(SAVE_KEY, serialize(s));
  } catch {
    /* noop */
  }
}

export function clearLocal() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* noop */
  }
}

export function progressToNext(s: GameState): number {
  const cur = stageOf(s.level);
  const next = EVOLUTION.find((e) => e.level === s.level + 1);
  if (!next) return 1;
  const span = next.coins - cur.coins;
  if (span <= 0) return 1;
  return Math.min(1, Math.max(0, (s.totalEarned - cur.coins) / span));
}

export { CRIT_MULT, stageOf };
