/**
 * Writing kit: every figure a page writes comes from here (data files and params), never typed by hand
 * (RECETTE §17.4 point 7). Server side only.
 */
import { usd, num, pct, day, month, listOf } from './fmt';
import { P, SCHOOLS, schoolBySlug, SC_META, BANDS, type School } from './data';
import { actToSat, satToAct, type ActToSat, type SatToAct } from './engine/concord';
import { satBelow, satCurve, type SatNational } from './engine/satpct';
import { oneIn, label, position, type OddsRule } from './engine/odds';
import { netPrice } from './engine/netprice';

const CURVE = satCurve(P.sat as unknown as SatNational);
const C = P.concordance as unknown as { satToAct: SatToAct; actToSat: ActToSat };
const RULE = P.odds as unknown as OddsRule;
const BAND_LABELS = SC_META.incomeBands;

/** Rank of a school among the 110 on a field (1 = highest, or lowest with `asc`). */
function rank(slug: string, get: (s: School) => number | null | undefined, asc = false) {
  const vals = SCHOOLS.map((s) => ({ slug: s.slug, v: get(s) })).filter((x) => typeof x.v === 'number') as Array<{ slug: string; v: number }>;
  vals.sort((a, b) => (asc ? a.v - b.v : b.v - a.v));
  const i = vals.findIndex((x) => x.slug === slug);
  return i < 0 ? null : { rank: i + 1, of: vals.length };
}

export const KIT = {
  usd, num, pct, day, month, listOf,
  P,
  meta: SC_META,
  bands: BAND_LABELS,
  schools: SCHOOLS,
  /** Everything known about one university (Scorecard fields + `latest` + derived `adm`, `sat`, `actR`, `sticker`). */
  s: schoolBySlug,
  /** Newest admit rate, formatted ("4.18%"), two decimals under 10 %. */
  rate: (slug: string) => { const a = schoolBySlug(slug).adm; return a ? pct(a.rate, a.rate < 0.1 ? 2 : 1) : 'not reported'; },
  oneIn: (slug: string) => { const a = schoolBySlug(slug).adm; return a ? oneIn(a.rate) : null; },
  /** Federal net price 2023-24 for income band 0..4, floored at $0 for display. */
  net: (slug: string, band: number) => { const v = schoolBySlug(slug).netByIncome[band]; return v === null ? 'not reported' : usd(Math.max(0, v)); },
  netRaw: (slug: string, band: number) => schoolBySlug(slug).netByIncome[band],
  /** Net price at a given family income, with the out-of-state tuition gap for a nonresident at a public university. */
  netAt: (slug: string, income: number, resident = true) => netPrice(schoolBySlug(slug), income, BANDS, resident),
  satRange: (slug: string) => { const r = schoolBySlug(slug).sat; return r ? `${num(r.p25)} to ${num(r.p75)}` : null; },
  actRange: (slug: string) => { const r = schoolBySlug(slug).actR; return r ? `${r.p25} to ${r.p75}` : null; },
  sticker: (slug: string) => { const t = schoolBySlug(slug).sticker; return t?.total ? usd(t.total) : 'not published'; },
  stickerOut: (slug: string) => { const t = schoolBySlug(slug).sticker; return t?.outTotal ? usd(t.outTotal) : null; },
  /** Where a score sits among enrolled students (share below, 0..1). */
  satPos: (slug: string, sat: number) => { const r = schoolBySlug(slug).sat; return r ? position(sat, r.p25, r.p75, RULE.iqrToSd) : null; },
  actPos: (slug: string, act: number) => { const r = schoolBySlug(slug).actR; return r ? position(act, r.p25, r.p75, RULE.iqrToSd) : null; },
  label: (admRate: number, p: number | null) => label(admRate, p, RULE),
  rule: RULE,
  actToSat: (act: number) => actToSat(act, C.actToSat),
  satToAct: (sat: number) => satToAct(sat, C.satToAct),
  /** Estimated share of the class of 2026 SAT takers scoring below a total. */
  satBelow: (sat: number) => satBelow(sat, CURVE),
  rank,
  rankAdm: (slug: string) => rank(slug, (s) => s.adm?.rate, true),
  rankNetLow: (slug: string) => rank(slug, (s) => s.netByIncome[0], true),
};
export type Kit = typeof KIT;
