/** Mini: what a signing bonus is worth on average when only part of the class receives it. */
import type { MiniSpec } from '../mini-types';
import { usd, pc } from './_kit';
export default function bonus(): MiniSpec {
  return {
    title: 'A signing bonus, on average',
    cta: 'Add it to a school’s return',
    inputs: [{ id: 'b', label: 'Bonus reported', def: 30000, unit: '$', max: 500000 }, { id: 'p', label: 'Share of hires receiving it', def: 50, unit: '%', max: 100 }],
    run: (v) => ({ head: ['Expected value', usd((v.b * v.p) / 100)], rows: [['Chance of getting one', pc(v.p)]], note: 'The model counts the bonus once, in the first year, times the share receiving it.' }),
  };
}
