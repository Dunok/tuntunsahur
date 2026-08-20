import type {
  AchievementDef,
  EvolutionStage,
  Lang,
  UpgradeDef,
} from './types';

export const SAVE_KEY = 'tts-gym-save-v3';
export const CRIT_MULT = 3;
export const COMBO_WINDOW_MS = 1500;
export const COMBO_MAX = 50;
export const FRENZY_MS = 20000;
export const AD_BOOST_MS = 60000;
export const OFFLINE_CAP_SEC = 4 * 3600;
export const OFFLINE_RATE = 0.5;

/* ---------------- upgrades: gym gear ---------------- */
export const CLICK_UPGRADES: UpgradeDef[] = [
  { id: 'dumb', kind: 'click', icon: 'dumbbell', base: 15, growth: 1.15, power: 1 },
  { id: 'kettle', kind: 'click', icon: 'kettlebell', base: 120, growth: 1.15, power: 4 },
  { id: 'barbell', kind: 'click', icon: 'barbell', base: 750, growth: 1.15, power: 14 },
  { id: 'plate', kind: 'click', icon: 'plate', base: 4200, growth: 1.15, power: 45 },
  { id: 'smith', kind: 'click', icon: 'smith', base: 26000, growth: 1.15, power: 160 },
  { id: 'goldbar', kind: 'click', icon: 'goldbar', base: 160000, growth: 1.15, power: 600 },
  { id: 'titan', kind: 'click', icon: 'titan', base: 1000000, growth: 1.15, power: 2400 },
  { id: 'exo', kind: 'click', icon: 'exo', base: 6500000, growth: 1.15, power: 10000 },
];

export const AUTO_UPGRADES: UpgradeDef[] = [
  { id: 'bro', kind: 'auto', icon: 'bro', base: 60, growth: 1.15, power: 1 },
  { id: 'shaker', kind: 'auto', icon: 'shaker', base: 400, growth: 1.15, power: 5 },
  { id: 'coach', kind: 'auto', icon: 'whistle', base: 2400, growth: 1.15, power: 18 },
  { id: 'smart', kind: 'auto', icon: 'chip', base: 15000, growth: 1.15, power: 65 },
  { id: 'robot', kind: 'auto', icon: 'robot', base: 95000, growth: 1.15, power: 250 },
  { id: 'clone', kind: 'auto', icon: 'clone', base: 600000, growth: 1.15, power: 1000 },
  { id: 'factory', kind: 'auto', icon: 'factory', base: 3800000, growth: 1.15, power: 4200 },
  { id: 'portal', kind: 'auto', icon: 'portal', base: 24000000, growth: 1.15, power: 18000 },
];

export const SPECIAL_UPGRADES: UpgradeDef[] = [
  { id: 'crit', kind: 'crit', icon: 'target', base: 400, growth: 2.0, power: 4, max: 10 },
  { id: 'chalk', kind: 'clickMult', icon: 'chalk', base: 6000, growth: 3.2, power: 25, max: 15 },
  { id: 'prework', kind: 'autoMult', icon: 'prework', base: 8000, growth: 3.2, power: 25, max: 15 },
];

export const ALL_UPGRADES: UpgradeDef[] = [
  ...CLICK_UPGRADES,
  ...AUTO_UPGRADES,
  ...SPECIAL_UPGRADES,
];

/* ---------------- 20 evolution levels ---------------- */
const TITLES: [string, string][] = [
  ['Новичок', 'Rookie'],
  ['Старатель', 'Grinder'],
  ['Рабочий', 'Worker'],
  ['Крепыш', 'Toughy'],
  ['Силач', 'Strongman'],
  ['Атлет', 'Athlete'],
  ['Бодибилдер', 'Bodybuilder'],
  ['Чемпион', 'Champion'],
  ['Легенда', 'Legend'],
  ['Мифический', 'Mythic'],
  ['Эпический', 'Epic'],
  ['Божественный', 'Divine'],
  ['Титан', 'Titan'],
  ['Гигант', 'Giant'],
  ['Колосс', 'Colossus'],
  ['Властелин', 'Overlord'],
  ['Император', 'Emperor'],
  ['Повелитель', 'Master'],
  ['Бог Сахура', 'God of Sahur'],
  ['ЛЕГЕНДА', 'THE LEGEND'],
];

const THRESHOLDS = [
  0, 100, 300, 750, 2000, 5000, 12000, 30000, 75000, 150000, 400000,
  1000000, 2500000, 6000000, 15000000, 40000000, 100000000, 250000000,
  600000000, 1500000000,
];

export const EVOLUTION: EvolutionStage[] = THRESHOLDS.map((coins, i) => ({
  level: i + 1,
  coins,
  img: Math.min(5, Math.floor(i / 4) + 1),
  title: { ru: TITLES[i][0], en: TITLES[i][1] },
}));

export function stageOf(level: number): EvolutionStage {
  return EVOLUTION[Math.min(EVOLUTION.length - 1, Math.max(0, level - 1))];
}

/* ---------------- achievements ---------------- */
export const ACHIEVEMENTS: AchievementDef[] = [
  { id: 'a_click1', metric: 'clicks', target: 100, icon: 'fist', name: { ru: 'Разминка', en: 'Warm-up' } },
  { id: 'a_click2', metric: 'clicks', target: 2500, icon: 'fist', name: { ru: 'Железный палец', en: 'Iron Finger' } },
  { id: 'a_click3', metric: 'clicks', target: 50000, icon: 'fist', name: { ru: 'Мозоли', en: 'Calluses' } },
  { id: 'a_earn1', metric: 'earned', target: 5000, icon: 'flame', name: { ru: 'Первый пот', en: 'First Sweat' } },
  { id: 'a_earn2', metric: 'earned', target: 1000000, icon: 'flame', name: { ru: 'Миллион калорий', en: 'Million Calories' } },
  { id: 'a_earn3', metric: 'earned', target: 1000000000, icon: 'flame', name: { ru: 'Гора массы', en: 'Mass Mountain' } },
  { id: 'a_lvl1', metric: 'level', target: 5, icon: 'arrowUp', name: { ru: 'Крепыш', en: 'Toughy' } },
  { id: 'a_lvl2', metric: 'level', target: 10, icon: 'arrowUp', name: { ru: 'Мифический', en: 'Mythic' } },
  { id: 'a_lvl3', metric: 'level', target: 20, icon: 'crown', name: { ru: 'ЛЕГЕНДА', en: 'THE LEGEND' } },
  { id: 'a_crit1', metric: 'crits', target: 100, icon: 'target', name: { ru: 'Снайпер', en: 'Sniper' } },
  { id: 'a_crit2', metric: 'crits', target: 1000, icon: 'target', name: { ru: 'Разрушитель', en: 'Destroyer' } },
  { id: 'a_gold1', metric: 'goldens', target: 1, icon: 'star', name: { ru: 'Золотая жила', en: 'Gold Vein' } },
  { id: 'a_gold2', metric: 'goldens', target: 15, icon: 'star', name: { ru: 'Ловец штанг', en: 'Barbell Catcher' } },
  { id: 'a_buy1', metric: 'buys', target: 25, icon: 'gift', name: { ru: 'Шопоголик', en: 'Shopaholic' } },
  { id: 'a_buy2', metric: 'buys', target: 100, icon: 'gift', name: { ru: 'Коллекционер', en: 'Collector' } },
];

export const ACH_BONUS = 0.02;

/* ---------------- i18n ---------------- */
export type I18NKey = string;

const RU: Record<string, string> = {
  logoSub: 'эволюция в качалке',
  calories: 'Калории',
  perSec: 'в секунду',
  perClick: 'за клик',
  level: 'Уровень',
  shop: 'Магазин',
  tabGear: 'Снаряга',
  tabAuto: 'Тренеры',
  tabBoost: 'Бусты',
  tabAwards: 'Награды',
  maxed: 'МАКС',
  lvl: 'ур.',
  toNext: 'до уровня',
  maxLevel: 'Максимальный уровень!',
  clickPower: 'Сила клика',
  perClickUp: 'к клику',
  perSecUp: 'в секунду',
  critChance: 'Шанс крита',
  clickBonus: 'к силе клика',
  autoBonus: 'к авто-доходу',
  frenzy: 'ЗОЛОТАЯ ЛИХОРАДКА',
  frenzyMult: 'весь доход ×3',
  boostX2: 'Реклама ×2',
  boostX2Desc: 'Посмотри рекламу — весь доход ×2 на 60 секунд',
  boostActive: 'Активно',
  goldenHint: 'Лови золотую гантель!',
  offlineTitle: 'Пока ты отдыхал...',
  offlineText: 'Тренеры качали калории без тебя:',
  claim: 'Забрать',
  claimX2: 'Забрать ×2',
  newLevel: 'Новый уровень!',
  evolution: 'ЭВОЛЮЦИЯ!',
  titleUp: 'Новый титул получен!',
  stageUp: 'Сахур эволюционировал!',
  settings: 'Настройки',
  sound: 'Звук',
  language: 'Язык',
  cloudSave: 'Облачные сохранения',
  cloudOn: 'Подключены',
  cloudOff: 'Недоступны (локально)',
  reset: 'Сбросить прогресс',
  resetSure: 'Точно сбросить? Всё пропадёт!',
  resetYes: 'Да, сбросить',
  resetNo: 'Отмена',
  about: 'Кликай по Сахуру, покупай снарягу и прокачай качалку до легендарного зала.',
  on: 'Вкл',
  off: 'Выкл',
  introTitle: 'Тун Тун Сахур',
  introSub: 'Эволюция в качалке',
  introHint: 'Тапай по Сахуру — жги калории, покупай железо, эволюционируй из дохляка в Бога Качалки.',
  startBtn: 'Начать тренировку',
  loading: 'Разминаемся...',
  achUnlocked: 'Достижение!',
  achBonusLine: '+2% ко всему доходу',
  achProgress: 'Прогресс',
  totalBonus: 'Общий бонус',
  caught: 'ЗОЛОТАЯ ГАНТЕЛЬ!',
  combo: 'Комбо',
  adTitle: 'Реклама',
  adWait: 'Награда через',
  paused: 'Пауза',
  next: 'след.',
  hint1: 'Тапай по Сахуру',
  hint2: 'Покупай железо',
  hint3: 'Эволюционируй',
  shopEmpty: 'Копи калории — снаряга сама себя не купит!',
  critHit: 'КРИТ!',
};

const EN: Record<string, string> = {
  logoSub: 'gym evolution',
  calories: 'Calories',
  perSec: 'per second',
  perClick: 'per click',
  level: 'Level',
  shop: 'Shop',
  tabGear: 'Gear',
  tabAuto: 'Coaches',
  tabBoost: 'Boosts',
  tabAwards: 'Awards',
  maxed: 'MAX',
  lvl: 'lv.',
  toNext: 'to level',
  maxLevel: 'Max level reached!',
  clickPower: 'Click power',
  perClickUp: 'per click',
  perSecUp: 'per second',
  critChance: 'Crit chance',
  clickBonus: 'click power',
  autoBonus: 'auto income',
  frenzy: 'GOLDEN FRENZY',
  frenzyMult: 'all income ×3',
  boostX2: 'Ad ×2',
  boostX2Desc: 'Watch an ad — all income ×2 for 60 seconds',
  boostActive: 'Active',
  goldenHint: 'Catch the golden dumbbell!',
  offlineTitle: 'While you rested...',
  offlineText: 'Your coaches kept burning calories:',
  claim: 'Claim',
  claimX2: 'Claim ×2',
  newLevel: 'New level!',
  evolution: 'EVOLUTION!',
  titleUp: 'New title earned!',
  stageUp: 'Sahur evolved!',
  settings: 'Settings',
  sound: 'Sound',
  language: 'Language',
  cloudSave: 'Cloud saves',
  cloudOn: 'Connected',
  cloudOff: 'Unavailable (local)',
  reset: 'Reset progress',
  resetSure: 'Really reset? Everything will be lost!',
  resetYes: 'Yes, reset',
  resetNo: 'Cancel',
  about: 'Tap Sahur, buy iron and upgrade your gym from a garage to a legendary hall.',
  on: 'On',
  off: 'Off',
  introTitle: 'Tun Tun Sahur',
  introSub: 'Gym Evolution',
  introHint: 'Tap Sahur to burn calories, buy iron, evolve from a skinny rookie into the Gym God.',
  startBtn: 'Start training',
  loading: 'Warming up...',
  achUnlocked: 'Achievement!',
  achBonusLine: '+2% to all income',
  achProgress: 'Progress',
  totalBonus: 'Total bonus',
  caught: 'GOLDEN DUMBBELL!',
  combo: 'Combo',
  adTitle: 'Ad',
  adWait: 'Reward in',
  paused: 'Paused',
  next: 'next',
  hint1: 'Tap Sahur',
  hint2: 'Buy the iron',
  hint3: 'Evolve',
  shopEmpty: 'Save up calories — the iron won\u2019t buy itself!',
  critHit: 'CRIT!',
};

export const I18N: Record<Lang, Record<string, string>> = { ru: RU, en: EN };

export const UPGRADE_NAMES: Record<string, Record<Lang, string>> = {
  dumb: { ru: 'Гантели', en: 'Dumbbells' },
  kettle: { ru: 'Гири', en: 'Kettlebells' },
  barbell: { ru: 'Штанга', en: 'Barbell' },
  plate: { ru: 'Блин 25 кг', en: '25kg Plate' },
  smith: { ru: 'Машина Смита', en: 'Smith Machine' },
  goldbar: { ru: 'Золотая штанга', en: 'Golden Barbell' },
  titan: { ru: 'Титановый гриф', en: 'Titanium Bar' },
  exo: { ru: 'Экзоскелет', en: 'Exoskeleton' },
  bro: { ru: 'Бро-новичок', en: 'Gym Bro' },
  shaker: { ru: 'Шейк-машина', en: 'Shake Machine' },
  coach: { ru: 'Тренер Сергей', en: 'Coach Sergey' },
  smart: { ru: 'Смарт-тренажёр', en: 'Smart Machine' },
  robot: { ru: 'Робот-споттер', en: 'Spotter Bot' },
  clone: { ru: 'Клон Сахура', en: 'Sahur Clone' },
  factory: { ru: 'Фабрика массы', en: 'Mass Factory' },
  portal: { ru: 'Портал качалки', en: 'Gym Portal' },
  crit: { ru: 'Критический подход', en: 'Critical Set' },
  chalk: { ru: 'Магнезия', en: 'Lifting Chalk' },
  prework: { ru: 'Предтрен', en: 'Pre-Workout' },
};
