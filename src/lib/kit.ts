/**
 * Writing kit: every figure a page writes comes from here (school files and params), never typed by hand
 * (RECETTE §17.4 point 7). Server side only.
 *   K.s('insead')               the normalised school (tuition, living, emp.industries, emp.zones, profile...)
 *   K.c('insead')               the same in US dollars, as the calculators see it
 *   K.tuition('insead')         "€109,860" (program total, school currency)    K.tuitionUsd('insead') "$122,912"
 *   K.living('insead')          "€30,000" or null                              K.cost('insead') total cost of the reference person, "$..."
 *   K.salary('insead')          "€100,000"  K.salaryKind('insead') "median base salary"  K.salaryUsd('insead')
 *   K.payback('insead', 'consulting')  "2.9 years" or null (reference person)  K.npv('insead')  "$..."
 *   K.share('insead', 'consulting')    "50%" or null    K.segSalary('lbs', 'consulting')  "£98,856" or null
 *   K.rank('insead', 'consulting')     { rank, of } in OUR ranking for that goal, or null
 *   K.top('consulting', 5)             ranked rows of our ranking
 */
import { usd, num, pct, p, money, yrs, day, listOf, kindLabel } from './fmt';
import { P, MODEL, SCHOOLS, schoolBySlug, calcSchool, FX, FX_DATE, type School } from './data';
import { goalOf, schoolRoi, refProfile, minShareOf, type CalcSchool } from './engine/goal';
import { fitRank } from './engine/rank';
import { goalById, GOAL_LIST } from './goals';
import type { RoiOut } from './engine/roi';

const REF = refProfile(MODEL);
const cs = (slug: string): CalcSchool => calcSchool(schoolBySlug(slug), null);
function roiFor(slug: string, goalId = 'all', s0?: number): RoiOut | null {
  const c = cs(slug);
  const gl = goalOf(c, goalById(goalId), MODEL.zoneFallbackShare);
  return schoolRoi(c, s0 === undefined ? REF : { ...REF, s0 }, MODEL, gl.salary);
}
export interface RankRow { slug: string; short: string; name: string; share: number; salary: number | null; fallback: boolean; stat: string | null; npv: number | null; payback: number | null; total: number | null; score: number; rank: number; placed: number | null }
const rankCache = new Map<string, { ranked: RankRow[]; unranked: Array<{ slug: string; share: number | null; why: string }> }>();
/** Our ranking for one goal, reference person (method page). Optional filter on the schools considered. */
export function ranking(goalId: string, filter?: (s: School) => boolean) {
  const k = goalId + (filter ? String(filter) : '');
  if (rankCache.has(k)) return rankCache.get(k)!;
  const goal = goalById(goalId);
  let cands = SCHOOLS.filter((s) => (filter ? filter(s) : true)).map((s) => {
    const c = calcSchool(s, null);
    const gl = goalOf(c, goal, MODEL.zoneFallbackShare);
    const o = schoolRoi(c, REF, MODEL, gl.salary);
    return { slug: s.slug, share: gl.share, salary: gl.salary, npv: o ? o.npv : null, o, gl, s };
  });
  const noShare = goal.kind === 'all' ? cands.filter((x) => x.share === null) : [];
  cands = cands.filter((x) => x.share !== null && x.share > 0);
  const min = minShareOf(MODEL, goal);
  const small = cands.filter((x) => x.share! < min);
  const { ranked, unranked } = fitRank(cands.filter((x) => x.share! >= min), goal.kind === 'zone' ? MODEL.zoneWeights : MODEL.weights);
  const out = {
    ranked: ranked.map((r) => ({ slug: r.item.slug, short: r.item.s.short, name: r.item.s.name, share: r.item.share!, salary: r.item.salary, fallback: r.item.gl.fallback, stat: r.item.gl.stat, npv: r.item.npv, payback: r.item.o ? r.item.o.payback : null, total: r.item.o ? r.item.o.total : null, score: r.score, rank: r.rank, placed: r.item.s.classSize ? Math.round((r.item.share! / 100) * r.item.s.classSize) : null })),
    unranked: [...unranked.map((u) => ({ slug: u.slug, share: u.share, why: u.salary === null ? (goal.kind === 'zone' && u.s.emp.salary ? 'no salary published for this region' : 'no salary published') : u.s.living === null ? 'no living budget published' : 'missing figure' })), ...small.map((u) => ({ slug: u.slug, share: u.share, why: `under ${min}% of the class` })), ...noShare.map((u) => ({ slug: u.slug, share: null, why: 'no employment rate published' }))],
  };
  rankCache.set(k, out);
  return out;
}
const S = (slug: string) => schoolBySlug(slug);
export const KIT = {
  usd, num, pct, p, money, yrs, day, listOf, kindLabel,
  P, MODEL, FX, FX_DATE, GOALS: GOAL_LIST, goal: goalById,
  schools: SCHOOLS,
  s: S,
  c: cs,
  /** Reference pre-MBA salary of the rankings, formatted. */
  ref: () => usd(MODEL.refSalary),
  tuition: (slug: string) => { const t = S(slug).tuition; return t ? money(t.v, S(slug).cur) : null; },
  tuitionUsd: (slug: string) => { const t = cs(slug).tuition; return t === null ? null : usd(t); },
  fees: (slug: string) => { const f = S(slug).fees; return f && f.v > 0 ? money(f.v, S(slug).cur) : null; },
  living: (slug: string) => { const l = S(slug).living; return l ? money(l.v, S(slug).cur) : null; },
  livingUsd: (slug: string) => { const l = cs(slug).living; return l === null ? null : usd(l); },
  /** Tuition + fees + living, school currency (null without a living budget). */
  direct: (slug: string) => { const x = S(slug); return x.totalLocal === null ? null : money(x.totalLocal, x.cur); },
  directUsd: (slug: string) => { const c = cs(slug); return c.tuition === null || c.living === null ? null : usd(c.tuition + c.fees + c.living); },
  months: (slug: string) => S(slug).months,
  salary: (slug: string) => { const x = S(slug).emp.salary; return x ? money(x.v, x.cur) : null; },
  salaryUsd: (slug: string) => { const x = S(slug).emp.salary; return x?.usd ? usd(x.usd) : null; },
  salaryKind: (slug: string) => kindLabel(S(slug).emp.salary?.kind),
  /** Total cost of the reference person (salary given up included), US dollars. */
  cost: (slug: string, s0?: number) => { const o = roiFor(slug, 'all', s0); return o ? usd(o.total) : null; },
  costRaw: (slug: string, s0?: number) => roiFor(slug, 'all', s0)?.total ?? null,
  roi: roiFor,
  payback: (slug: string, goalId = 'all', s0?: number) => { const o = roiFor(slug, goalId, s0); return o && o.payback !== null ? yrs(o.payback) : null; },
  npv: (slug: string, goalId = 'all', s0?: number) => { const o = roiFor(slug, goalId, s0); return o ? usd(o.npv) : null; },
  share: (slug: string, goalId: string) => { const v = goalOf(cs(slug), goalById(goalId)).share; return v === null ? null : p(v); },
  shareRaw: (slug: string, goalId: string) => goalOf(cs(slug), goalById(goalId)).share,
  /** Salary the school reports for that goal, in its own currency (null when not published for the segment). */
  segSalary: (slug: string, goalId: string) => {
    const g = goalById(goalId); const x = S(slug);
    const rows = g.kind === 'ind' ? x.emp.industries : g.kind === 'seg' ? x.emp.segments : g.kind === 'fn' ? x.emp.functions : null;
    if (rows) { const r = rows.find((y) => y.key === g.key); return r?.salary ? money(r.salary, r.cur) : null; }
    if (g.kind === 'zone') { const z = x.emp.zones.find((y) => y.zone === g.key); return z?.salary ? money(z.salary, z.cur) : null; }
    return null;
  },
  ranking,
  rank: (slug: string, goalId: string) => { const r = ranking(goalId); const row = r.ranked.find((x) => x.slug === slug); return row ? { rank: row.rank, of: r.ranked.length } : null; },
  top: (goalId: string, n = 10, filter?: (s: School) => boolean) => ranking(goalId, filter).ranked.slice(0, n),
  /** Schools that publish a salary and a living budget (the ones our return model can rank). */
  withRoi: () => SCHOOLS.filter((s) => roiFor(s.slug) !== null),
  ft: (slug: string) => S(slug).ranks.find((r) => /FT Global MBA/i.test(r.ranking)) ?? null,
  employers: (slug: string, n = 6) => S(slug).emp.employers.slice(0, n).map((e) => e.name),
  intl: (slug: string) => { const v = S(slug).profile.intl; return v === null ? null : p(v); },
};
export type Kit = typeof KIT;
