/**
 * What a school's employment report says about one goal, and the school's return for one person.
 * Pure (no data import), shared by the pages (server) and the calculators (browser).
 */
import { roi, type RoiOut } from './roi';

/** `est`: how the salary was estimated when the school publishes none (engine/estimate.ts). */
export type Seg = { pct: number | null; usd: number | null; stat?: string | null; label?: string; est?: string };
/** A school as the calculators see it: every amount already in US dollars at the ECB rate of the build. */
export interface CalcSchool {
  slug: string; short: string; name: string; href: string | null; region: string; country: string; city: string;
  months: number | null; twoYear: boolean; cur: string; usdPer: number;
  tuition: number | null; fees: number; living: number | null; livingBasis: string | null;
  intern: number | null; salary: number | null; kind: string | null; bonus: number | null; bonusPct: number | null;
  classSize: number | null; employed: number | null;
  /** Figures estimated because the school publishes none: how (null = published). */
  est: { salary: string | null; living: string | null };
  ind: Record<string, Seg>; seg: Record<string, Seg>; zone: Record<string, Seg>; fn: Record<string, Seg>;
}
export interface Model { refSalary: number; g1: number; g0: number; r: number; horizonYears: number; paybackCapYears: number; internMonths: number; minShare?: Record<string, number>; zoneFallbackShare?: number }
export interface Profile { s0: number; scholarship: number; g1: number; g0: number; r: number; tax: number }

export type GoalKind = 'all' | 'ind' | 'seg' | 'zone' | 'fn';
export interface Goal { kind: GoalKind; key: string }
export const ALL: Goal = { kind: 'all', key: 'all' };

/** Share placed and salary reported for a goal. "europe" adds continental Europe and the UK. */
export interface GoalFigures { share: number | null; salary: number | null; fallback: boolean; estimated: boolean; stat: string | null }
export function goalOf(s: CalcSchool, g: Goal, zoneFallbackShare = 50): GoalFigures {
  if (g.kind === 'all') return { share: s.employed, salary: s.salary, fallback: false, estimated: !!s.est?.salary, stat: s.kind };
  let seg: Seg | undefined;
  if (g.kind === 'zone' && g.key === 'europe') {
    const a = s.zone['Europe'], b = s.zone['UK'];
    if (a || b) {
      const share = (a?.pct ?? 0) + (b?.pct ?? 0);
      // Both lines: salary weighted by their shares, when both have one.
      const one = a && b ? (a.usd !== null && b.usd !== null && (a.pct ?? 0) + (b.pct ?? 0) > 0 ? Math.round((a.usd * (a.pct ?? 0) + b.usd * (b.pct ?? 0)) / ((a.pct ?? 0) + (b.pct ?? 0))) : null) : (a ?? b)!.usd;
      seg = { pct: a?.pct === null && b?.pct === null ? null : Math.round(share * 10) / 10, usd: one, stat: null, est: a?.est ?? b?.est };
    }
  } else {
    seg = (g.kind === 'ind' ? s.ind : g.kind === 'seg' ? s.seg : g.kind === 'zone' ? s.zone : s.fn)[g.key];
  }
  if (!seg) return { share: null, salary: null, fallback: false, estimated: false, stat: null };
  const own = seg.usd ?? null;
  // A region that takes a small part of the class is not where the school-wide salary was earned.
  // Finance segments pay on their own scale (bonus-heavy): no school-wide stand-in either.
  // Both cases are usually covered by an estimate (engine/estimate.ts) before reaching here.
  const canFall = g.kind === 'seg' ? false : g.kind !== 'zone' || (seg.pct ?? 0) >= zoneFallbackShare;
  const salary = own ?? (canFall ? s.salary : null);
  const fallback = own === null && salary !== null;
  return { share: seg.pct, salary, fallback, estimated: own !== null ? !!seg.est || !!s.est?.salary : fallback && !!s.est?.salary, stat: own !== null ? (seg.stat ?? s.kind) : s.kind };
}

/**
 * A school whose school-wide salary is borrowed from other schools (engine/estimate.ts) is shown with
 * its estimates but not ranked on a goal where salary or NPV weigh: its order would come from others.
 */
export const rankable = (s: CalcSchool, w: { salary: number; npv: number }) => !(s.est?.salary && w.salary + w.npv > 0);

export const internIncome = (s: CalcSchool, m: Model) => (s.twoYear && s.intern ? s.intern * m.internMonths : 0);
export const bonusExpected = (s: CalcSchool) => (s.bonus && s.bonusPct !== null ? (s.bonus * s.bonusPct) / 100 : 0);

/** The return of one school for one person; null when the school does not publish what the model needs. */
export function schoolRoi(s: CalcSchool, p: Profile, m: Model, salary?: number | null): RoiOut | null {
  const s1 = salary === undefined ? s.salary : salary;
  if (s.tuition === null || s.living === null || s1 === null || !s.months) return null;
  return roi({
    tuition: s.tuition, fees: s.fees, living: s.living, months: s.months,
    s0: p.s0, scholarship: p.scholarship, internship: internIncome(s, m),
    s1, bonus: bonusExpected(s), g1: p.g1, g0: p.g0, r: p.r, tax: p.tax,
    horizon: m.horizonYears, cap: m.paybackCapYears,
  });
}
export const refProfile = (m: Model): Profile => ({ s0: m.refSalary, scholarship: 0, g1: m.g1, g0: m.g0, r: m.r, tax: 0 });

/** Smallest share of the class for a school to be ranked on a goal (method page). */
export const minShareOf = (m: Model, g: Goal) => (m.minShare ? m.minShare[g.kind] ?? 0 : 0);
