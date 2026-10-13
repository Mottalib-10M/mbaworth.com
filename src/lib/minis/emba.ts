/** Mini: an executive or part-time MBA (salary kept) → years for a raise to repay the tuition. */
import type { MiniSpec } from '../mini-types';
import { usd, yrs } from './_kit';
export default function emba(): MiniSpec {
  return {
    title: 'Executive or part-time MBA: years for the raise to repay the tuition',
    cta: 'Compare with a full-time MBA',
    inputs: [{ id: 't', label: 'Tuition you pay', def: 150000, unit: '$', max: 1000000 }, { id: 'e', label: 'Paid by your employer', def: 0, unit: '$', max: 1000000 }, { id: 'r', label: 'Raise you expect, per year', def: 25000, unit: '$', max: 500000 }],
    run: (v) => { const left = Math.max(0, v.t - v.e); return { head: ['Payback', v.r > 0 ? yrs(left / v.r) : 'never'], rows: [['Tuition left to you', usd(left)], ['Salary given up', usd(0)]], note: 'You keep your salary, so the cost is the tuition alone; the raise is your own assumption.' }; },
  };
}
