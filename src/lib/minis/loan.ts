/** Mini: an MBA loan → yearly instalment and total interest. */
import type { MiniSpec } from '../mini-types';
import { usd } from './_kit';
import { loanInterest } from '../engine/roi';
export default function loan(): MiniSpec {
  return {
    title: 'What an MBA loan costs in interest',
    cta: 'Payback with a loan',
    inputs: [{ id: 'a', label: 'Amount borrowed', def: 100000, unit: '$', max: 1000000 }, { id: 'r', label: 'Interest rate', def: 8, unit: '%', max: 30, decimals: 2 }, { id: 'y', label: 'Repaid over', def: 10, unit: 'years', max: 30 }],
    run: (v) => {
      const r = v.r / 100; const pay = v.a > 0 && v.y > 0 ? (r > 0 ? (v.a * r) / (1 - Math.pow(1 + r, -v.y)) : v.a / v.y) : 0;
      return { head: ['Total interest', usd(loanInterest({ amount: v.a, rate: r, years: v.y }))], rows: [['Yearly instalment', usd(pay)], ['Total repaid', usd(pay * v.y)]], note: 'Equal yearly instalments, fixed rate: the rate is the one of your own offer.' };
    },
  };
}
