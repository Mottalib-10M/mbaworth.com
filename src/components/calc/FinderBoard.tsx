/**
 * The school finder: every school of the site for one goal (industry, finance segment, region, job),
 * with the share of the class placed there, the salary reported for it, the number of graduates it means,
 * the payback and ten-year NPV for the reader's salary, and our fit score; re-sorted on any column.
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Result, usd, num } from './parts';
import { goalOf, schoolRoi, minShareOf, type CalcSchool, type Model } from '../../lib/engine/goal';
import { fitRank } from '../../lib/engine/rank';
import { GOAL_LIST } from '../../lib/goals';
import { yrs } from '../../lib/fmt';

type Sort = 'fit' | 'share' | 'salary' | 'placed' | 'npv' | 'payback' | 'cost';
interface Props { schools: CalcSchool[]; model: Model & { weights: { share: number; salary: number; npv: number }; zoneWeights: { share: number; salary: number; npv: number } }; goal?: string; length?: 'any' | 'one' | 'two'; where?: string; sort?: Sort; lockGoal?: boolean; methodHref: string; idPrefix?: string; limit?: number }
const WHERE = [['any', 'Anywhere'], ['US', 'In the United States'], ['Europe', 'In continental Europe'], ['UK', 'In the United Kingdom'], ['Asia', 'In Asia'], ['Canada', 'In Canada'], ['Oceania', 'In Australia']];

export default function FinderBoard({ schools, model, goal = 'consulting', length = 'any', where = 'any', sort = 'fit', lockGoal = false, methodHref, idPrefix = 'fd', limit = 15 }: Props) {
  const [goalId, setGoalId] = useState(goal);
  const [s0, setS0] = useState(model.refSalary);
  const [len, setLen] = useState(length);
  const [loc, setLoc] = useState(where);
  const [by, setBy] = useState<Sort>(sort);
  const [all, setAll] = useState(false);
  const g = GOAL_LIST.find((x) => x.id === goalId) ?? GOAL_LIST[0];
  const data = useMemo(() => {
    const prof = { s0, scholarship: 0, g1: model.g1, g0: model.g0, r: model.r, tax: 0 };
    const pool = schools.filter((s) => (len === 'any' ? true : len === 'one' ? (s.months ?? 99) <= 13 : s.twoYear))
      .filter((s) => (loc === 'any' ? true : loc === 'Europe' ? s.region === 'Europe' : s.region === loc || s.country === loc));
    const cands = pool.map((s) => {
      const gl = goalOf(s, g, model.zoneFallbackShare);
      const o = schoolRoi(s, prof, model, gl.salary);
      return { slug: s.slug, s, gl, o, share: gl.share, salary: gl.salary, npv: o ? o.npv : null, placed: gl.share !== null && s.classSize ? Math.round((gl.share / 100) * s.classSize) : null };
    }).filter((c) => c.share !== null && c.share > 0);
    const min = minShareOf(model, g);
    const { ranked, unranked: miss } = fitRank(cands.filter((c) => c.share! >= min), g.kind === 'zone' ? model.zoneWeights : model.weights);
    const unranked = [...miss.map((u) => ({ ...u, why: u.salary === null ? (g.kind === 'zone' ? 'no salary for this region' : 'no salary published') : 'no living budget published' })), ...cands.filter((c) => c.share! < min).map((u) => ({ ...u, why: `under ${min}%` }))];
    let rows = ranked.map((r) => ({ ...r.item, score: r.score, rank: r.rank }));
    const key: Record<Sort, (r: (typeof rows)[number]) => number> = { fit: (r) => r.score, share: (r) => r.share!, salary: (r) => r.salary ?? -1, placed: (r) => r.placed ?? -1, npv: (r) => r.npv ?? -1e12, payback: (r) => -(r.o?.payback ?? 99), cost: (r) => -(r.o?.total ?? 1e12) };
    rows = [...rows].sort((a, b) => key[by](b) - key[by](a) || a.rank - b.rank);
    return { rows, unranked };
  }, [schools, model, g, s0, len, loc, by]);
  const top = data.rows[0];
  const shown = all ? data.rows : data.rows.slice(0, limit);
  const goalOpts = GOAL_LIST.filter((x) => x.id !== 'all' || !lockGoal).map((x) => ({ value: x.id, label: x.label }));
  const sorts: Array<[Sort, string]> = [['fit', 'Fit score'], ['share', 'Share of the class'], ['salary', 'Salary reported'], ['placed', 'Graduates placed'], ['npv', '10-year NPV for you'], ['payback', 'Fastest payback'], ['cost', 'Lowest total cost']];
  return (
    <div className="rechner rounded-xl border border-navy-200 border-t-[3px] border-t-accent-500 bg-white p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <form className="grid content-start gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-goal`} label="Your goal" value={g.id} onChange={setGoalId} options={goalOpts} />
          <NumberField id={`${idPrefix}-s0`} label="Your salary today" value={s0} onChange={setS0} unit="$" max={1000000} help="Gross, per year" />
          <SelectField id={`${idPrefix}-len`} label="Program length" value={len} onChange={(v) => setLen(v as 'any')} options={[{ value: 'any', label: 'Any length' }, { value: 'one', label: 'One year or less' }, { value: 'two', label: 'Two years' }]} />
          <SelectField id={`${idPrefix}-loc`} label="School located" value={loc} onChange={setLoc} options={WHERE.map(([v, l]) => ({ value: v, label: l }))} />
        </form>
        <Result label={`Best fit for ${g.label.toLowerCase()}, on your salary`} figure={top ? top.s.short : 'no school ranked'} sub={top ? `${top.share}% of the class${top.placed !== null ? ` (about ${num(top.placed)} graduates)` : ''}${top.salary !== null ? ` · ${usd(top.salary)}${top.gl.fallback ? ' (school-wide)' : ''}` : ''}${top.o ? ` · payback ${top.o.payback === null ? 'over 30 years' : yrs(top.o.payback)}` : ''}` : 'No school of this selection publishes the figures needed.'}>
          <p className="mt-3 text-xs text-navy-700">{g.kind === 'zone' ? 'Regions: few schools publish a salary by region, so the score is the share of the class placed there, as a percentile among the schools shown.' : `Fit score: share of the class (${Math.round(model.weights.share * 100)}%), salary (${Math.round(model.weights.salary * 100)}%) and ten-year NPV for you (${Math.round(model.weights.npv * 100)}%), each as a percentile among the schools shown.`} Schools under {minShareOf(model, g)}% of the class are not ranked. <a className="underline" href={methodHref}>Method</a>.</p>
        </Result>
      </div>
      <div className="mt-5 grid gap-x-5 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField id={`${idPrefix}-sort`} label="Sort the table by" value={by} onChange={(v) => setBy(v as Sort)} options={sorts.map(([k, l]) => ({ value: k, label: l }))} />
      </div>
      <div data-chrome className="mt-4 overflow-x-auto">
        <table className="journal w-full text-sm">
          <thead><tr>{['#', 'School', g.kind === 'zone' ? 'Placed there' : 'Share', 'About', 'Salary', 'Payback', '10-year NPV', 'Score'].map((h, i) => <th key={h} scope="col" className={`px-2 py-2 font-semibold text-navy-900 ${i > 1 ? 'text-right' : 'text-left'}`}>{h}</th>)}</tr></thead>
          <tbody>{shown.map((r, i) => (
            <tr key={r.slug}>
              <td className="rank-num border-b border-navy-100 px-2 py-2 text-right text-base">{i + 1}</td>
              <td className="border-b border-navy-100 px-2 py-2">{r.s.href ? <a className="font-medium text-accent-700 underline-offset-2 hover:underline" href={r.s.href}>{r.s.short}</a> : <span className="font-medium text-navy-900">{r.s.short}</span>}<span className="block text-xs text-navy-500">{r.s.city}{r.s.months ? ` · ${r.s.months} months` : ''}</span></td>
              <td className="border-b border-navy-100 px-2 py-2 text-right tabular-nums">{r.share}%</td>
              <td className="border-b border-navy-100 px-2 py-2 text-right tabular-nums">{r.placed === null ? 'n/a' : num(r.placed)}</td>
              <td className="border-b border-navy-100 px-2 py-2 text-right tabular-nums">{r.salary === null ? 'n/a' : <>{usd(r.salary)}{r.gl.fallback ? '*' : ''}{r.gl.stat && /mean/.test(r.gl.stat) ? <span className="block text-xs text-navy-500">average</span> : null}</>}</td>
              <td className="border-b border-navy-100 px-2 py-2 text-right tabular-nums">{!r.o || r.o.payback === null ? 'over 30 y' : yrs(r.o.payback)}</td>
              <td className="border-b border-navy-100 px-2 py-2 text-right tabular-nums">{r.npv === null ? 'n/a' : usd(r.npv)}</td>
              <td className="border-b border-navy-100 px-2 py-2 text-right tabular-nums font-semibold"><span className="score-pill"><i aria-hidden="true" style={{ ['--w' as string]: `${Math.max(0, Math.min(100, Math.round(r.score)))}%` }} />{Math.round(r.score)}</span></td>
            </tr>))}
          </tbody>
        </table>
        {data.rows.length > limit && <button type="button" onClick={() => setAll(!all)} className="mt-3 text-sm font-medium text-accent-700 underline">{all ? 'Show the first schools only' : `Show all ${data.rows.length} ranked schools`}</button>}
        <p className="mt-3 text-xs text-navy-600">Share: % of the graduating class (or of those who accepted a job) the school reports for this goal. About: that share applied to the class size. * no salary published for this goal: school-wide figure. Salaries in US dollars at the ECB rate of the last update; “average” marks a mean where the school publishes no median.</p>
        {data.unranked.length > 0 && <p className="mt-2 text-xs text-navy-600">Placing graduates here but not ranked: {data.unranked.map((u) => `${u.s.short} ${u.share}% (${u.why})`).join(' · ')}.</p>}
      </div>
    </div>
  );
}
