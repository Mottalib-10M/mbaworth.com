/** Mini: a salary against the U.S. percentiles of one occupation (BLS OEWS). */
import type { MiniSpec } from '../mini-types';
import { usd, parseArg } from './_kit';
interface Arg { name: string; p25: number; median: number; p75: number; period: string }
export default function position(arg?: string): MiniSpec {
  const a = parseArg<Arg | null>(arg, null);
  if (!a) throw new Error('position mini needs an occupation');
  return {
    title: `${a.name}: where a salary sits in the U.S.`,
    cta: 'Other occupations',
    inputs: [{ id: 's', label: 'Salary', def: a.median, unit: '$', max: 1000000 }],
    run: (v) => ({ head: ['Position', v.s <= a.p25 ? 'bottom quarter' : v.s <= a.median ? 'below the median' : v.s <= a.p75 ? 'above the median' : 'top quarter'], rows: [['25th percentile', usd(a.p25)], ['Median', usd(a.median)], ['75th percentile', usd(a.p75)]], note: `BLS, ${a.period}, all employers and levels.` }),
  };
}
