/** Mini: one school, your salary today → payback and ten-year NPV. */
import type { MiniSpec } from '../mini-types';
import { usd, yrs, parseArg } from './_kit';
import { schoolRoi, refProfile, type CalcSchool, type Model } from '../engine/goal';
interface Arg { c: CalcSchool; m: Model; kind: string }
export default function payback(arg?: string): MiniSpec {
  const a = parseArg<Arg | null>(arg, null);
  if (!a) throw new Error('payback mini needs a school');
  return {
    title: `${a.c.short}: when the MBA pays back, for your salary`,
    cta: 'Open the full calculator',
    inputs: [{ id: 's0', label: 'Your salary today', def: a.m.refSalary, unit: '$', max: 1000000 }],
    run: (v) => {
      const o = schoolRoi(a.c, { ...refProfile(a.m), s0: v.s0 }, a.m);
      if (!o) return { head: ['Payback after graduation', 'not computable'], rows: [['Tuition and fees', a.c.tuition === null ? 'n/a' : usd(a.c.tuition + a.c.fees)]], note: a.c.salary === null ? 'The school publishes no graduate salary.' : 'The school publishes no living budget.' };
      return { head: ['Payback after graduation', o.payback === null ? 'over 30 years' : yrs(o.payback)], rows: [['Total cost with the salary given up', usd(o.total)], [`Salary after (${a.kind})`, usd(a.c.salary!)], ['10-year NPV', usd(o.npv)]], note: 'Same assumptions as the main calculator; US dollars.' };
    },
  };
}
