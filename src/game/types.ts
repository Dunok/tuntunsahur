export type Lang = 'ru' | 'en';

export type UpgradeKind = 'click' | 'auto' | 'crit' | 'clickMult' | 'autoMult';

export interface UpgradeDef {
  id: string;
  kind: UpgradeKind;
  icon: string;
  base: number;
  growth: number;
  power: number;
  max?: number;
}

export interface EvolutionStage {
  level: number;
  coins: number;
  img: number; // 1..5
  title: Record<Lang, string>;
}

export type AchMetric =
  | 'clicks'
  | 'earned'
  | 'level'
  | 'crits'
  | 'goldens'
  | 'buys';

export interface AchievementDef {
  id: string;
  metric: AchMetric;
  target: number;
  icon: string;
  name: Record<Lang, string>;
}

export interface Boost {
  id: string;
  mult: number;
  until: number; // ms timestamp
}

export interface GameState {
  v: number;
  coins: number;
  totalEarned: number;
  totalClicks: number;
  totalCrits: number;
  totalGoldens: number;
  totalBuys: number;
  level: number;
  levels: Record<string, number>;
  achievements: string[];
  muted: boolean;
  lang: Lang | null;
  lastSeen: number;
}

export interface LocalizedText {
  ru: string;
  en: string;
}
