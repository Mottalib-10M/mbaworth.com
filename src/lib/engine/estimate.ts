/**
 * Estimates for the figures a school does not publish (method page, section 8). Pure, no data import.
 *
 *   salary for a goal (industry, segment, region, function) = school-wide salary x the median ratio
 *     (goal salary / school-wide salary) of the schools that publish both, when at least two do;
 *   school-wide salary = median salary of the schools of the same country, else of the same region;
 *   living budget = median monthly budget of the schools of the same country, else of the same region,
 *     times the length of the program.
 *
 * Every estimate is flagged (`est` on the school, `est` on the segment) and shown as "est." on the site.
 */
import type { CalcSchool, Seg } from './goal';

export const MIN_PEERS = 2;
type Kind = 'ind' | 'seg' | 'zone' | 'fn';
const KINDS: Kind[] = ['ind', 'seg', 'zone', 'fn'];

export interface Ratio { r: number; n: number }
export type Ratios = Record<Kind, Record<string, Ratio>>;

export const median = (xs: number[]) => {
  if (!xs.length) return null;
  const v = [...xs].sort((a, b) => a - b);
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
};

/** Median ratio of a goal salary to the school-wide salary, over schools publishing both. */
export function ratiosOf(schools: CalcSchool[]): Ratios {
  const out = { ind: {}, seg: {}, zone: {}, fn: {} } as Ratios;
  for (const k of KINDS) {
    const acc: Record<string, number[]> = {};
    for (const s of schools) {
      if (!s.salary || s.est?.salary) continue;
      for (const [key, seg] of Object.entries(s[k])) if (seg.usd && !seg.est) (acc[key] ??= []).push(seg.usd / s.salary);
    }
    for (const [key, xs] of Object.entries(acc)) if (xs.length >= MIN_PEERS) out[k][key] = { r: median(xs)!, n: xs.length };
  }
  return out;
}

/** Peers of a school for a figure: same country if at least two publish it, else same region. */
function peers(s: CalcSchool, all: CalcSchool[], val: (x: CalcSchool) => number | null): { v: number; n: number; where: string } | null {
  for (const [where, same] of [[s.country, (x: CalcSchool) => x.country === s.country], [s.region, (x: CalcSchool) => x.region === s.region]] as const) {
    const xs = all.filter((x) => x.slug !== s.slug && same(x)).map(val).filter((v): v is number => v !== null && v > 0);
    if (xs.length >= MIN_PEERS) return { v: median(xs)!, n: xs.length, where };
  }
  return null;
}

/** Step 1: school-wide salary and living budget for the schools that publish none. */
export function fillSchool(s: CalcSchool, all: CalcSchool[]): CalcSchool {
  const out = { ...s, est: { ...s.est } };
  if (out.salary === null) {
    const p = peers(s, all, (x) => (x.est?.salary ? null : x.salary));
    if (p) { out.salary = Math.round(p.v / 100) * 100; out.est.salary = `median of ${p.n} schools in ${p.where}`; }
  }
  if (out.living === null && out.months) {
    const p = peers(s, all, (x) => (x.est?.living || x.living === null || !x.months ? null : x.living / x.months));
    if (p) { out.living = Math.round((p.v * out.months) / 100) * 100; out.est.living = `median monthly budget of ${p.n} schools in ${p.where}`; }
  }
  return out;
}

/** Step 2: salary of each goal the school reports a share for but no salary. */
export function fillGoals(s: CalcSchool, ratios: Ratios): CalcSchool {
  if (s.salary === null) return s;
  const out = { ...s };
  for (const k of KINDS) {
    const m: Record<string, Seg> = {};
    for (const [key, seg] of Object.entries(s[k])) {
      const ratio = ratios[k][key];
      m[key] = seg.usd === null && ratio ? { ...seg, usd: Math.round((s.salary * ratio.r) / 100) * 100, est: `school-wide salary x ${ratio.r.toFixed(2)}, median of ${ratio.n} schools` } : seg;
    }
    out[k] = m;
  }
  return out;
}
