/**
 * The MBA return model (method page, section 3). Pure functions, no data import: every figure comes in
 * through the arguments, in one currency. Notation of the method page:
 *   T tuition, F fees, V living budget (whole program), D = months / 12, S0 current salary, B scholarship,
 *   I internship income, S1 salary after the MBA, bonus = signing bonus x share receiving it (year 1 only),
 *   g1 / g0 yearly raise with / without the MBA, r discount rate, tau average tax rate (0 = gross).
 *   C = T + F + V + S0 x D - B - I (+ loan interest)
 *   gain in year t after graduation = [S1 (1+g1)^(t-1) + bonus(t=1) - S0 (1+g0)^(D+t-1)] x (1 - tau)
 *   payback = smallest n (in years, interpolated) with the sum of gains >= C
 *   NPV over the horizon from the first day of class = PV(gains) - PV(costs paid during the program)
 */
export interface Loan { amount: number; rate: number; years: number }
export interface RoiInput {
  tuition: number; fees: number; living: number; months: number;
  s0: number; scholarship: number; internship: number;
  s1: number; bonus: number;
  g1: number; g0: number; r: number; tax: number;
  horizon: number; cap: number;
  loan?: Loan | null;
}
export interface RoiOut {
  years: number; direct: number; forgone: number; interest: number; total: number;
  /** Years after graduation until the gains repay C; null if not within `cap` years. */
  payback: number | null;
  /** Same, counted from the first day of class. */
  paybackFromStart: number | null;
  npv: number; pvCost: number; pvGain: number; roi: number | null;
  gains: number[];
}

/** Total interest paid on a fixed-rate loan repaid in equal yearly instalments. */
export function loanInterest(l: Loan | null | undefined): number {
  if (!l || l.amount <= 0 || l.years <= 0) return 0;
  if (l.rate <= 0) return 0;
  const pay = (l.amount * l.rate) / (1 - Math.pow(1 + l.rate, -l.years));
  return pay * l.years - l.amount;
}

export const clampNum = (x: number, lo: number, hi: number) => (Number.isFinite(x) ? Math.min(hi, Math.max(lo, x)) : lo);

export function gainAt(t: number, x: RoiInput): number {
  const D = x.months / 12;
  const after = x.s1 * Math.pow(1 + x.g1, t - 1) + (t === 1 ? x.bonus : 0);
  const without = x.s0 * Math.pow(1 + x.g0, D + t - 1);
  return (after - without) * (1 - x.tax);
}

export function roi(x: RoiInput): RoiOut {
  const D = Math.max(0, x.months) / 12;
  const direct = x.tuition + x.fees + x.living;
  const forgone = x.s0 * D;
  const interest = loanInterest(x.loan);
  const total = direct + forgone - x.scholarship - x.internship + interest;
  const cap = Math.max(1, Math.round(x.cap));
  const gains: number[] = [];
  for (let t = 1; t <= cap; t++) gains.push(gainAt(t, x));
  let payback: number | null = null;
  if (total <= 0) payback = 0;
  else {
    let cum = 0;
    for (let t = 1; t <= cap; t++) {
      const g = gains[t - 1];
      if (g > 0 && cum + g >= total) { payback = t - 1 + (total - cum) / g; break; }
      cum += g;
    }
  }
  // NPV: program costs paid at the start of each program year (pro rata of the months in that year),
  // forgone salary growing at g0, internship income received after the first year, gains at the end of each year.
  let pvCost = 0;
  const chunks = Math.ceil(D - 1e-9);
  for (let k = 0; k < chunks; k++) {
    const frac = Math.min(1, D - k);
    const cash = ((direct - x.scholarship) * frac) / D + x.s0 * Math.pow(1 + x.g0, k) * frac;
    pvCost += cash / Math.pow(1 + x.r, k);
  }
  pvCost -= x.internship / Math.pow(1 + x.r, Math.min(1, D));
  let pvGain = 0;
  const after = x.horizon - D;
  for (let t = 1; t <= Math.ceil(after); t++) {
    const w = Math.min(1, after - (t - 1));
    if (w <= 0) break;
    pvGain += (w * gainAt(t, x)) / Math.pow(1 + x.r, D + t);
  }
  const npv = pvGain - pvCost;
  return { years: D, direct, forgone, interest, total, payback, paybackFromStart: payback === null ? null : payback + D, npv, pvCost, pvGain, roi: pvCost > 0 ? npv / pvCost : null, gains };
}
