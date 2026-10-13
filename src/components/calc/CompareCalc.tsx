/** Two or three schools side by side for one person and one goal: cost, salary, share placed, payback, NPV. */
import { useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Result, usd } from './parts';
import { goalOf, schoolRoi, type CalcSchool, type Model } from '../../lib/engine/goal';
import { GOAL_LIST } from '../../lib/goals';
import { yrs, kindLabel } from '../../lib/fmt';

interface Props { schools: CalcSchool[]; model: Model; defaults: string[]; goal?: string; methodHref: string; idPrefix?: string }
export default function CompareCalc({ schools, model, defaults, goal = 'all', methodHref, idPrefix = 'cmp' }: Props) {
  const [picks, setPicks] = useState<string[]>(defaults.slice(0, 3));
  const [s0, setS0] = useState(model.refSalary);
  const [goalId, setGoalId] = useState(goal);
  const g = GOAL_LIST.find((x) => x.id === goalId) ?? GOAL_LIST[0];
  const opts = [{ value: '', label: 'None' }, ...[...schools].sort((a, b) => a.short.localeCompare(b.short)).map((c) => ({ value: c.slug, label: c.short }))];
  const prof = { s0, scholarship: 0, g1: model.g1, g0: model.g0, r: model.r, tax: 0 };
  const cols = picks.filter(Boolean).map((slug) => schools.find((s) => s.slug === slug)!).filter(Boolean).map((s) => { const gl = goalOf(s, g, model.zoneFallbackShare); return { s, gl, o: schoolRoi(s, prof, model, gl.salary) }; });
  const best = cols.filter((c) => c.o && c.gl.salary !== null).sort((a, b) => b.o!.npv - a.o!.npv)[0];
  const set = (i: number) => (v: string) => setPicks((p) => { const n = [...p]; n[i] = v; return n; });
  const line = (label: string, f: (c: (typeof cols)[number]) => string) => <tr key={label}><th scope="row" className="border-b border-navy-100 py-2 pr-3 text-left font-normal text-navy-700">{label}</th>{cols.map((c) => <td key={c.s.slug} className="border-b border-navy-100 px-2 py-2 text-right tabular-nums text-navy-900">{f(c)}</td>)}</tr>;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <form className="grid content-start gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-a`} label="First school" value={picks[0] ?? ''} onChange={set(0)} options={opts.slice(1)} />
          <SelectField id={`${idPrefix}-b`} label="Second school" value={picks[1] ?? ''} onChange={set(1)} options={opts.slice(1)} />
          <SelectField id={`${idPrefix}-c`} label="Third school (optional)" value={picks[2] ?? ''} onChange={set(2)} options={opts} />
          <NumberField id={`${idPrefix}-s0`} label="Your salary today" value={s0} onChange={setS0} unit="$" max={1000000} help="Gross, per year" />
          <SelectField id={`${idPrefix}-goal`} label="Where you want to work" value={g.id} onChange={setGoalId} options={GOAL_LIST.map((x) => ({ value: x.id, label: x.label }))} className="sm:col-span-2" />
        </form>
        <Result label="Highest ten-year value for you" figure={best ? best.s.short : 'not computable'} sub={best ? `NPV ${usd(best.o!.npv)} · payback ${best.o!.payback === null ? 'over 30 years' : yrs(best.o!.payback)}` : 'These schools do not publish the salary or the budget the model needs.'} />
      </div>
      <div data-chrome className="mt-5 overflow-x-auto">
        <table className="journal w-full text-sm">
          <thead><tr><th scope="col" className="py-2 text-left"></th>{cols.map((c) => <th key={c.s.slug} scope="col" className="px-2 py-2 text-right font-semibold text-navy-900">{c.s.href ? <a className="text-accent-700 underline" href={c.s.href}>{c.s.short}</a> : c.s.short}</th>)}</tr></thead>
          <tbody>
            {line('Program length', (c) => (c.s.months ? `${c.s.months} months` : 'n/a'))}
            {line('Tuition and fees', (c) => (c.s.tuition === null ? 'n/a' : usd(c.s.tuition + c.s.fees)))}
            {line('Living budget', (c) => (c.s.living === null ? 'not published' : usd(c.s.living)))}
            {line('Total cost for you', (c) => (c.o ? usd(c.o.total) : 'n/a'))}
            {line(g.id === 'all' ? 'Hired within three months' : 'Share of the class there', (c) => (c.gl.share === null ? 'n/a' : `${c.gl.share}%`))}
            {line('Salary reported', (c) => (c.gl.salary === null ? 'not published' : `${usd(c.gl.salary)}${c.gl.fallback ? '*' : ''}`))}
            {line('Kind of figure', (c) => kindLabel(c.gl.stat))}
            {line('Payback after graduation', (c) => (!c.o ? 'n/a' : c.o.payback === null ? 'over 30 years' : yrs(c.o.payback)))}
            {line('10-year NPV', (c) => (c.o ? usd(c.o.npv) : 'n/a'))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-navy-600">* school-wide salary: no figure published for this goal. US dollars at the ECB rate of the last update. <a className="underline" href={methodHref}>Method</a>.</p>
      </div>
    </div>
  );
}
