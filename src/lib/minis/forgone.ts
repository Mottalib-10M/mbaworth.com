/** Mini: the salary you give up while studying. */
import type { MiniSpec } from '../mini-types';
import { usd } from './_kit';
export default function forgone(): MiniSpec {
  return {
    title: 'The salary you give up while you study',
    cta: 'Add it to a school’s cost',
    inputs: [{ id: 's', label: 'Your salary today', def: 90000, unit: '$', max: 1000000 }, { id: 'm', label: 'Months without salary', def: 21, unit: 'months', max: 36 }, { id: 'i', label: 'Internship pay, if any', def: 0, unit: '$', max: 200000 }],
    run: (v) => ({ head: ['Salary given up, net of the internship', usd(Math.max(0, (v.s * v.m) / 12 - v.i))], rows: [['Gross salary not earned', usd((v.s * v.m) / 12)], ['Per month away', usd(v.s / 12)]], note: 'Pension contributions and raises you would have had are not counted here.' }),
  };
}
