/**
 * Our ranking of schools for one goal (an industry, a finance segment, a region or a job function).
 * Three measures, all read in the schools' own employment reports or computed from them:
 *   share  : % of the class placed in that segment;
 *   salary : salary reported for that segment (falls back to the school-wide salary, flagged);
 *   npv    : 10-year net present value of the MBA for the same reference person, with that salary.
 * The fit score is the weighted average of the three percentile ranks among the eligible schools (0 to 100).
 * A school is eligible when every measure with a weight exists; the others are listed apart, never ranked.
 */
export interface Cand { slug: string; share: number | null; salary: number | null; npv: number | null; [k: string]: unknown }
export interface Weights { share: number; salary: number; npv: number }
export interface Ranked<T extends Cand> { item: T; score: number; rank: number; pr: { share: number; salary: number; npv: number } }

/** Percentile rank in [0, 1] (1 = highest), ties share the average rank. */
export function percentileRanks(values: number[]): number[] {
  const n = values.length;
  if (n === 1) return [1];
  const idx = values.map((v, i) => [v, i] as const).sort((a, b) => a[0] - b[0]);
  const out = new Array<number>(n);
  let i = 0;
  while (i < n) {
    let j = i;
    while (j + 1 < n && idx[j + 1][0] === idx[i][0]) j++;
    const avg = (i + j) / 2;
    for (let k = i; k <= j; k++) out[idx[k][1]] = avg / (n - 1);
    i = j + 1;
  }
  return out;
}

export function fitRank<T extends Cand>(cands: T[], w: Weights): { ranked: Ranked<T>[]; unranked: T[] } {
  const has = (v: number | null) => v !== null && Number.isFinite(v);
  // A measure with no weight is not required (regions are ranked on the share placed alone).
  const ok = cands.filter((c) => has(c.share) && (w.salary === 0 || has(c.salary)) && (w.npv === 0 || has(c.npv)));
  const unranked = cands.filter((c) => !ok.includes(c));
  if (!ok.length) return { ranked: [], unranked };
  const ps = percentileRanks(ok.map((c) => c.share!));
  const pl = w.salary === 0 ? ok.map(() => 0) : percentileRanks(ok.map((c) => c.salary!));
  const pn = w.npv === 0 ? ok.map(() => 0) : percentileRanks(ok.map((c) => c.npv!));
  const tw = w.share + w.salary + w.npv;
  const rows = ok.map((item, i) => ({ item, pr: { share: ps[i], salary: pl[i], npv: pn[i] }, score: (100 * (w.share * ps[i] + w.salary * pl[i] + w.npv * pn[i])) / tw, rank: 0 }));
  rows.sort((a, b) => b.score - a.score || (b.item.share! - a.item.share!) || a.item.slug.localeCompare(b.item.slug));
  rows.forEach((r, i) => { r.rank = i + 1; });
  return { ranked: rows, unranked };
}

/** Sort by one measure, missing values last (the finder's column sort). */
export function sortBy<T extends Record<string, unknown>>(rows: T[], key: keyof T, desc = true): T[] {
  return [...rows].sort((a, b) => {
    const x = a[key] as number | null, y = b[key] as number | null;
    if (x === null || x === undefined || !Number.isFinite(x)) return 1;
    if (y === null || y === undefined || !Number.isFinite(y)) return -1;
    return desc ? y - x : x - y;
  });
}
