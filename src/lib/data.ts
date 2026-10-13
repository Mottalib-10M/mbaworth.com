/**
 * Server-side access to the data: src/data/schools.json (built by scripts/build-schools.py from the research
 * files of each school) and src/data/params-2026.json (scripts/build-params.py: ECB rates, BLS wages, model
 * assumptions). Calculators never import this file: they receive `CalcSchool` objects prepared here.
 */
import RAW from '../data/schools.json';
import P from '../data/params-2026.json';
import type { CalcSchool, Model, Seg } from './engine/goal';

export { P };
export const MODEL = P.model as unknown as Model & { weights: { share: number; salary: number; npv: number }; zoneWeights: { share: number; salary: number; npv: number }; refSalaryNote: string; note: string };
export const FX = P.fx.usdPer as Record<string, number>;
export const FX_DATE = P.fx.date;

export interface Src { url: string; readOn?: string; note?: string }
export interface Row { key: string; label: string; pct: number | null; salary: number | null; stat?: string | null; cur: string; usd: number | null }
export interface ZoneRow { zone: string; label: string; exact: boolean; derived?: string; pct: number | null; salary: number | null; cur: string; usd: number | null; detail: string }
export interface School {
  slug: string; name: string; short: string; country: string; city: string; region: string; campuses: string[];
  months: number | null; monthsDerived: boolean; monthsNote: string; format: string; twoYear: boolean;
  classSize: number | null; classSizeText: string; classCohort: string; cur: string;
  tuition: ({ v: number; mult: number; cohort: string; raw: number | null; period: string; readOn: string } & Src) | null;
  fees: ({ v: number; raw: number | null } & Src) | null;
  living: ({ v: number; basis: 'school' | 'visa' | null; raw: number | null; period: string; readOn: string } & Src) | null;
  livingMissing: string | null;
  scholarship: { v: number | null; note: string; url: string };
  directLocal: number | null; totalLocal: number | null;
  emp: {
    cohort: string; standard: string; url: string; page: string; readOn: string; response: number | null; employed: number | null; employedLabel: string;
    salary: { v: number; cur: string; kind: string; usd: number | null; p25: number | null; p75: number | null; note: string } | null;
    salaryMissing: string | null;
    bonus: { v: number; cur: string; usd: number | null; pct: number | null; stat: string; note: string } | null;
    intern: { monthly: number; cur: string; usd: number | null; stat: string } | null;
    industries: Row[]; segments: Row[]; zones: ZoneRow[]; functions: Row[]; employers: Array<{ name: string; hires: number | null }>;
  };
  profile: { intl: number | null; age: number | null; exp: number | null; women: number | null; gmat: number | null; gmatLabel: string; countries: number | null; cohort: string; url: string };
  ranks: Array<{ ranking: string; rank: number; url: string }>;
}
export const SCHOOLS: School[] = (RAW as unknown as { schools: School[] }).schools;
export const BUILT = (RAW as unknown as { built: string }).built;
export function schoolBySlug(slug: string): School {
  const s = SCHOOLS.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown school: ${slug}`);
  return s;
}
export const hasSchool = (slug: string) => SCHOOLS.some((x) => x.slug === slug);
export const toUsd = (v: number | null | undefined, cur: string) => (v === null || v === undefined || !(cur in FX) ? null : Math.round(v * FX[cur]));

const segMap = (rows: Row[]) => Object.fromEntries(rows.map((r) => [r.key, { pct: r.pct, usd: r.usd, stat: r.stat ?? null, label: r.label } as Seg]));
/** Function rows: several can share one key (two consulting lines): keep the largest share. */
const fnMap = (rows: Row[]) => {
  const m: Record<string, Seg> = {};
  for (const r of rows) if (!m[r.key] || (r.pct ?? 0) > (m[r.key].pct ?? 0)) m[r.key] = { pct: r.pct, usd: r.usd, stat: r.stat ?? null, label: r.label };
  return m;
};

export function calcSchool(s: School, href: string | null): CalcSchool {
  const fx = FX[s.cur] ?? 1;
  const e = s.emp;
  return {
    slug: s.slug, short: s.short, name: s.name, href, region: s.region, country: s.country, city: s.city,
    months: s.months, twoYear: s.twoYear, cur: s.cur, usdPer: fx,
    tuition: s.tuition ? Math.round(s.tuition.v * fx) : null, fees: s.fees ? Math.round(s.fees.v * fx) : 0,
    living: s.living ? Math.round(s.living.v * fx) : null, livingBasis: s.living?.basis ?? null,
    intern: e.intern?.usd ?? null, salary: e.salary?.usd ?? null, kind: e.salary?.kind ?? null,
    bonus: e.bonus?.usd ?? null, bonusPct: e.bonus?.pct ?? null, classSize: s.classSize, employed: e.employed,
    ind: segMap(e.industries), seg: segMap(e.segments),
    zone: Object.fromEntries(e.zones.map((z) => [z.zone, { pct: z.pct, usd: z.usd, label: z.label } as Seg])),
    fn: fnMap(e.functions),
  };
}
