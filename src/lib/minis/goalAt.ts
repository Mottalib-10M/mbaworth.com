/** Mini: one school, pick an industry or region → share of the class there and the salary reported. */
import type { MiniSpec } from '../mini-types';
import { usd, pc, yrs, parseArg } from './_kit';
import { goalOf, schoolRoi, refProfile, type CalcSchool, type Model } from '../engine/goal';
import { GOAL_LIST } from '../goals';
interface Arg { c: CalcSchool; m: Model }
export default function goalAt(arg?: string): MiniSpec {
  const a = parseArg<Arg | null>(arg, null);
  if (!a) throw new Error('goalAt mini needs a school');
  const goals = GOAL_LIST.filter((g) => g.id !== 'all' && goalOf(a.c, g, a.m.zoneFallbackShare).share !== null);
  if (!goals.length) throw new Error(`${a.c.slug}: no industry or region published`);
  return {
    title: `${a.c.short}: where the class went`,
    cta: 'Rank every school on this goal',
    inputs: [{ id: 'g', label: 'Industry, segment or region', def: 0, options: goals.map((g, i) => ({ value: String(i), label: g.label })) }],
    run: (v) => {
      const g = goals[v.g] ?? goals[0];
      const gl = goalOf(a.c, g, a.m.zoneFallbackShare);
      const o = schoolRoi(a.c, refProfile(a.m), a.m, gl.salary);
      return { head: ['Share of the class', gl.share === null ? 'n/a' : pc(gl.share, gl.share % 1 ? 1 : 0)], rows: [['Salary reported', gl.salary === null ? 'not published' : `${usd(gl.salary)}${gl.fallback ? ' (school-wide)' : ''}`], ['Graduates, about', gl.share !== null && a.c.classSize ? String(Math.round((gl.share / 100) * a.c.classSize)) : 'n/a'], ['Payback with that salary', !o ? 'n/a' : o.payback === null ? 'over 30 years' : yrs(o.payback)]], note: `Reference person earning ${usd(a.m.refSalary)} before the MBA.` };
    },
  };
}
