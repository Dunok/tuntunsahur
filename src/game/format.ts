import type { Lang } from './types';

const SUFF = ['', 'К', 'М', 'Б', 'Т', 'Кв', 'Кк'];
const SUFF_EN = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];

export function fmt(n: number, lang: Lang = 'ru'): string {
  if (!isFinite(n)) return '0';
  if (n < 0) return '-' + fmt(-n, lang);
  if (n < 1000) return String(Math.floor(n));
  const suf = lang === 'ru' ? SUFF : SUFF_EN;
  let v = n;
  let i = 0;
  while (v >= 1000 && i < suf.length - 1) {
    v /= 1000;
    i++;
  }
  const d = v >= 100 ? 0 : v >= 10 ? 1 : 2;
  let s = v.toFixed(d);
  s = s.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
  if (lang === 'ru') s = s.replace('.', ',');
  return s + suf[i];
}

export function fmtTime(totalSec: number, lang: Lang = 'ru'): string {
  const s = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (lang === 'ru') {
    if (h > 0) return `${h}ч ${m}м`;
    if (m > 0) return `${m}м ${sec}с`;
    return `${sec}с`;
  }
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}
