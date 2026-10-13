/** Mini: one school, a scholarship → how much sooner it pays back. */
import type { MiniSpec } from '../mini-types';
import { usd, yrs, parseArg } from './_kit';
import { schoolRoi, refProfile, type CalcSchool, type Model } from '../engine/goal';
interface Arg { c: CalcSchool; m: Model }
export default function scholarship(arg?: string): MiniSpec {
  const a = parseArg<Arg | null>(arg, null);
  if (!a) throw new Error('scholarship mini needs a school');
  return {
    title: `${a.c.short}: what a scholarship changes`,
    cta: 'Open the full calculator',
    inputs: [{ id: 'b', label: 'Scholarship, whole program', def: 30000, unit: '$', max: 500000 }],
    run: (v) => {
      const p = refProfile(a.m);
      const o0 = schoolRoi(a.c, p, a.m), o1 = schoolRoi(a.c, { ...p, scholarship: v.b }, a.m);
      const f = (o: typeof o0) => (!o ? 'n/a' : o.payback === null ? 'over 30 years' : yrs(o.payback));
      return { head: ['Payback with the scholarship', f(o1)], rows: [['Without it', f(o0)], ['Total cost with it', o1 ? usd(o1.total) : 'n/a']], note: `Reference person earning ${usd(a.m.refSalary)} before the MBA.` };
    },
  };
}
