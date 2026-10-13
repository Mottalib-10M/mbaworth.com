/** Mini: two schools, your salary → which pays back first. */
import type { MiniSpec } from '../mini-types';
import { usd, yrs, parseArg } from './_kit';
import { schoolRoi, refProfile, type CalcSchool, type Model } from '../engine/goal';
interface Arg { a: CalcSchool; b: CalcSchool; m: Model }
export default function twoSchools(arg?: string): MiniSpec {
  const x = parseArg<Arg | null>(arg, null);
  if (!x) throw new Error('twoSchools mini needs two schools');
  return {
    title: `${x.a.short} or ${x.b.short}: the faster payback for you`,
    cta: 'Compare up to three schools',
    inputs: [{ id: 's0', label: 'Your salary today', def: x.m.refSalary, unit: '$', max: 1000000 }],
    run: (v) => {
      const p = { ...refProfile(x.m), s0: v.s0 };
      const oa = schoolRoi(x.a, p, x.m), ob = schoolRoi(x.b, p, x.m);
      const f = (o: typeof oa) => (!o ? 'n/a' : o.payback === null ? 'over 30 years' : yrs(o.payback));
      const win = oa && ob ? (oa.npv >= ob.npv ? x.a.short : x.b.short) : oa ? x.a.short : ob ? x.b.short : 'not computable';
      return { head: ['Higher 10-year value', win], rows: [[`${x.a.short} payback`, f(oa)], [`${x.b.short} payback`, f(ob)], [`${x.a.short} 10-year NPV`, oa ? usd(oa.npv) : 'n/a'], [`${x.b.short} 10-year NPV`, ob ? usd(ob.npv) : 'n/a']] };
    },
  };
}
