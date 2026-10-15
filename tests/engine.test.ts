/** The ROI model and our rankings, tested on hand-checked cases and on the example of the method page. */
import { describe, it, expect } from 'vitest';
import { roi, loanInterest, gainAt } from '../src/lib/engine/roi';
import { percentileRanks, fitRank, sortBy } from '../src/lib/engine/rank';
import { goalOf, schoolRoi, refProfile, type CalcSchool } from '../src/lib/engine/goal';
import { SCHOOLS, calcSchool, MODEL, FX, hasSchool, schoolBySlug } from '../src/lib/data';

const base = { fees: 0, living: 0, scholarship: 0, internship: 0, bonus: 0, g1: 0, g0: 0, r: 0, tax: 0, horizon: 10, cap: 30 };

describe('roi()', () => {
  it('total cost: Wharton example of the method page (24 months counted)', () => {
    const o = roi({ ...base, tuition: 175940, fees: 10076, living: 84866, months: 24, s0: 100000, internship: 10416 * 2.5, s1: 185000, g1: 0.05, g0: 0.03, r: 0.05 });
    expect(o.direct).toBe(270882);
    expect(o.forgone).toBe(200000);
    expect(o.total).toBeCloseTo(444842, 0);
  });
  it('payback and NPV on a flat case', () => {
    const o = roi({ ...base, tuition: 100000, months: 12, s0: 50000, s1: 100000 });
    expect(o.total).toBe(150000);
    expect(o.payback).toBeCloseTo(3, 9);
    expect(o.paybackFromStart).toBeCloseTo(4, 9);
    expect(o.npv).toBeCloseTo(9 * 50000 - 150000, 6);
  });
  it('payback is interpolated inside a year', () => {
    const o = roi({ ...base, tuition: 75000, months: 12, s0: 50000, s1: 100000 });
    expect(o.total).toBe(125000);
    expect(o.payback).toBeCloseTo(2.5, 9);
  });
  it('raises: the gain of year t uses S1 (1+g1)^(t-1) and S0 (1+g0)^(D+t-1)', () => {
    const x = { ...base, tuition: 0, months: 12, s0: 100000, s1: 150000, g1: 0.05, g0: 0.03 };
    expect(gainAt(1, x)).toBeCloseTo(150000 - 103000, 6);
    expect(gainAt(2, x)).toBeCloseTo(157500 - 106090, 6);
  });
  it('signing bonus counted in year 1 only', () => {
    const x = { ...base, tuition: 0, months: 12, s0: 100000, s1: 120000, bonus: 30000 };
    expect(gainAt(1, x)).toBe(50000);
    expect(gainAt(2, x)).toBe(20000);
  });
  it('a salary that never catches up gives no payback, and a negative NPV', () => {
    const o = roi({ ...base, tuition: 100000, months: 12, s0: 120000, s1: 100000 });
    expect(o.payback).toBeNull();
    expect(o.npv).toBeLessThan(0);
  });
  it('a scholarship that covers everything means payback at once', () => {
    const o = roi({ ...base, tuition: 50000, months: 12, s0: 0, scholarship: 60000, s1: 80000 });
    expect(o.payback).toBe(0);
  });
  it('discounting: one year of gain at r = 10% is worth 1/1.1^(D+1)', () => {
    const o = roi({ ...base, tuition: 0, months: 12, s0: 0, s1: 110000, r: 0.1, horizon: 2 });
    expect(o.pvGain).toBeCloseTo(110000 / 1.21, 6);
  });
  it('tax rate applies to gains', () => {
    const x = { ...base, tuition: 0, months: 12, s0: 50000, s1: 100000, tax: 0.3 };
    expect(gainAt(1, x)).toBeCloseTo(35000, 6);
  });
  it('loan interest: 100,000 at 5% over 10 years', () => {
    expect(loanInterest({ amount: 100000, rate: 0.05, years: 10 })).toBeCloseTo(29504.57, 1);
    expect(loanInterest({ amount: 100000, rate: 0, years: 10 })).toBe(0);
    const o = roi({ ...base, tuition: 100000, months: 12, s0: 50000, s1: 100000, loan: { amount: 100000, rate: 0.05, years: 10 } });
    expect(o.total).toBeCloseTo(150000 + 29504.57, 1);
  });
  it('a 21-month program counts 1.75 years of salary', () => {
    const o = roi({ ...base, tuition: 0, months: 21, s0: 80000, s1: 100000 });
    expect(o.forgone).toBe(140000);
  });
});

describe('rankings', () => {
  it('percentile ranks, ties averaged', () => {
    expect(percentileRanks([10, 20, 30])).toEqual([0, 0.5, 1]);
    expect(percentileRanks([5, 5, 9])).toEqual([0.25, 0.25, 1]);
    expect(percentileRanks([7])).toEqual([1]);
  });
  it('fit score: weighted percentile ranks, ineligible schools apart', () => {
    const c = [
      { slug: 'a', share: 40, salary: 150000, npv: 300000 },
      { slug: 'b', share: 20, salary: 190000, npv: 500000 },
      { slug: 'c', share: 30, salary: 170000, npv: 100000 },
      { slug: 'd', share: 50, salary: null, npv: null },
    ];
    const { ranked, unranked } = fitRank(c, { share: 0.4, salary: 0.3, npv: 0.3 });
    expect(unranked.map((x) => x.slug)).toEqual(['d']);
    expect(ranked.map((r) => r.item.slug)).toEqual(['b', 'a', 'c']);
    expect(ranked[0].score).toBeCloseTo(60, 6);
    expect(ranked[1].score).toBeCloseTo(40 + 0 + 15, 6);
    expect(ranked.map((r) => r.rank)).toEqual([1, 2, 3]);
  });
  it('weights change the order', () => {
    const c = [{ slug: 'a', share: 40, salary: 150000, npv: 300000 }, { slug: 'b', share: 20, salary: 190000, npv: 500000 }];
    expect(fitRank(c, { share: 1, salary: 0, npv: 0 }).ranked[0].item.slug).toBe('a');
    expect(fitRank(c, { share: 0, salary: 1, npv: 0 }).ranked[0].item.slug).toBe('b');
  });
  it('sortBy puts missing values last', () => {
    const r = sortBy([{ v: 2 }, { v: null }, { v: 5 }] as Array<{ v: number | null }>, 'v');
    expect(r.map((x) => x.v)).toEqual([5, 2, null]);
  });
});

const fake = (o: Partial<CalcSchool>): CalcSchool => ({ slug: 'x', short: 'X', name: 'X', href: null, region: 'US', country: 'US', city: '', months: 12, twoYear: false, cur: 'USD', usdPer: 1, tuition: 100000, fees: 0, living: 20000, livingBasis: 'school', intern: null, salary: 150000, kind: 'base-median', bonus: null, bonusPct: null, classSize: 100, employed: 90, ind: {}, seg: {}, zone: {}, fn: {}, ...o });

describe('goals', () => {
  it('segment salary, or the school-wide salary flagged', () => {
    const s = fake({ ind: { consulting: { pct: 30, usd: 180000 }, tech: { pct: 20, usd: null } } });
    expect(goalOf(s, { kind: 'ind', key: 'consulting' })).toMatchObject({ share: 30, salary: 180000, fallback: false });
    expect(goalOf(s, { kind: 'ind', key: 'tech' })).toMatchObject({ share: 20, salary: 150000, fallback: true });
    expect(goalOf(s, { kind: 'ind', key: 'energy' }).share).toBeNull();
  });
  it('Europe adds continental Europe and the UK', () => {
    const s = fake({ zone: { Europe: { pct: 8, usd: 90000 }, UK: { pct: 43, usd: 110000 } } });
    expect(goalOf(s, { kind: 'zone', key: 'europe' }).share).toBe(51);
    expect(goalOf(s, { kind: 'zone', key: 'europe' }).fallback).toBe(true);
  });
  it('no salary or no living budget: no return computed', () => {
    const m = MODEL;
    expect(schoolRoi(fake({ salary: null }), refProfile(m), m)).toBeNull();
    expect(schoolRoi(fake({ living: null }), refProfile(m), m)).toBeNull();
    expect(schoolRoi(fake({}), refProfile(m), m)).not.toBeNull();
  });
  it('internship counted for two-year programs only', () => {
    const m = MODEL;
    const one = schoolRoi(fake({ intern: 10000 }), refProfile(m), m)!;
    const two = schoolRoi(fake({ intern: 10000, twoYear: true, months: 21 }), refProfile(m), m)!;
    expect(one.total).toBe(100000 + 20000 + m.refSalary);
    expect(two.total).toBeCloseTo(100000 + 20000 + m.refSalary * 1.75 - 10000 * m.internMonths, 6);
  });
});

describe('data', () => {
  it('parameters', () => {
    expect(MODEL.refSalary).toBeGreaterThan(0);
    expect(MODEL.g1).toBeGreaterThanOrEqual(MODEL.g0);
    expect(FX.USD).toBe(1);
    for (const c of ['EUR', 'GBP', 'CHF', 'CNY', 'INR', 'SGD', 'HKD']) expect(FX[c], c).toBeGreaterThan(0);
    expect(FX.EUR).toBeGreaterThan(FX.CHF * 0.8);
  });
  it('every school has a name and figures that parse', () => {
    expect(SCHOOLS.length).toBeGreaterThan(0);
    for (const s of SCHOOLS) {
      expect(s.name, s.slug).toBeTruthy();
      if (s.tuition) expect(s.tuition.v, s.slug).toBeGreaterThan(0);
      for (const z of s.emp.zones) if (z.pct !== null) expect(z.pct, `${s.slug} ${z.zone}`).toBeLessThanOrEqual(100);
      for (const i of s.emp.industries) if (i.pct !== null) expect(i.pct, `${s.slug} ${i.key}`).toBeLessThanOrEqual(100);
      const zsum = s.emp.zones.reduce((a, z) => a + (z.pct ?? 0), 0);
      expect(zsum, `${s.slug} zones`).toBeLessThanOrEqual(103);
      const c = calcSchool(s, null);
      if (c.tuition !== null) expect(Number.isFinite(c.tuition)).toBe(true);
    }
  });
  it('Wharton: total cost of the reference person from the school figures', () => {
    if (!hasSchool('wharton')) return;
    const w = calcSchool(schoolBySlug('wharton'), null);
    const o = schoolRoi(w, refProfile(MODEL), MODEL)!;
    expect(o.direct).toBe(175940 + 10076 + 84866);
    expect(o.total).toBeCloseTo(270882 + MODEL.refSalary * 1.75 - 10416 * MODEL.internMonths, 6);
    expect(o.payback).not.toBeNull();
  });
});

describe('missing figures are never shown as $0 (2026-10-15)', async () => {
  const { usd, money } = await import('../src/lib/fmt');
  const { KIT } = await import('../src/lib/kit');
  const { GOAL_LIST } = await import('../src/lib/goals');
  it('formatters write "not published" for null, undefined and NaN', () => {
    expect(usd(null)).toBe('not published'); expect(usd(undefined)).toBe('not published'); expect(usd(NaN)).toBe('not published');
    expect(money(null, 'SGD')).toBe('not published'); expect(usd(0)).toBe('$0');
  });
  it('no ranked row carries a salary of 0', () => {
    for (const g of GOAL_LIST) for (const r of KIT.ranking(g.id).ranked) expect(r.salary === null || r.salary > 0, `${g.id} ${r.slug}`).toBe(true);
  });
});
