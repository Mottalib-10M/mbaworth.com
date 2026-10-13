/**
 * The MBA return calculator (home, school pages, cost / payback / worth pages): one school, the reader's
 * salary, a scholarship and a goal; total cost with the salary given up, payback, ten-year NPV.
 * First render = build defaults only (RECETTE §17.5): no URL or storage read before hydration.
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Card, Result, Rows, Note, Actions, usd, StatePick } from './parts';
import { goalOf, schoolRoi, internIncome, bonusExpected, type CalcSchool, type Model } from '../../lib/engine/goal';
import { GOAL_LIST } from '../../lib/goals';
import { kindLabel, yrs } from '../../lib/fmt';

interface Props { schools: CalcSchool[]; model: Model; school: string; lock?: boolean; goal?: string; mode?: 'full' | 'cost' | 'payback' | 'worth'; methodHref: string; idPrefix?: string }

export default function RoiCalc({ schools, model, school, lock = false, goal = 'all', mode = 'full', methodHref, idPrefix = 'roi' }: Props) {
  const [slug, setSlug] = useState(school);
  const [s0, setS0] = useState(model.refSalary);
  const [sch, setSch] = useState(0);
  const [goalId, setGoalId] = useState(goal);
  const [s1o, setS1o] = useState<number | null>(null);
  const [livo, setLivo] = useState<number | null>(null);
  const [loan, setLoan] = useState(0);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);
  const s = schools.find((x) => x.slug === slug) ?? schools[0];
  const goals = useMemo(() => GOAL_LIST.filter((g) => g.id === 'all' || goalOf(s, g, model.zoneFallbackShare).share !== null), [s]);
  const g = goals.find((x) => x.id === goalId) ?? goals[0];
  const gl = goalOf(s, g, model.zoneFallbackShare);
  const s1 = s1o ?? gl.salary ?? 0;
  const living = livo ?? s.living ?? 0;
  const x = { ...s, living, salary: s1 };
  const o = s.tuition === null ? null : schoolRoi(x, { s0, scholarship: sch, g1: model.g1, g0: model.g0, r: model.r, tax: 0 }, model, s1);
  const interest = mode === 'payback' && loan > 0 ? (() => { const r = rate / 100; if (r <= 0 || years <= 0) return 0; const pay = (loan * r) / (1 - Math.pow(1 + r, -years)); return pay * years - loan; })() : 0;
  const payment = mode === 'payback' && loan > 0 && rate > 0 && years > 0 ? (loan * (rate / 100)) / (1 - Math.pow(1 + rate / 100, -years)) : 0;
  const total = o ? o.total + interest : null;
  let payback: number | null = null;
  if (o && total !== null) {
    if (total <= 0) payback = 0;
    else { let cum = 0; for (let t = 0; t < o.gains.length; t++) { const gg = o.gains[t]; if (gg > 0 && cum + gg >= total) { payback = t + (total - cum) / gg; break; } cum += gg; } }
  }
  const noSalary = gl.salary === null && s1o === null;
  const noLiving = s.living === null && livo === null;
  const schoolOpts = [...schools].sort((a, b) => a.short.localeCompare(b.short)).map((c) => ({ value: c.slug, label: c.short }));
  const pick = (v: string) => { setSlug(v); setS1o(null); setLivo(null); };
  const head = mode === 'cost' ? { l: `Total cost of the ${s.short} MBA`, f: total === null ? 'not published' : usd(total) }
    : mode === 'worth' ? { l: 'Value over 10 years, after every cost', f: o && !noSalary ? usd(o.npv - (interest > 0 ? interest : 0)) : 'salary not published' }
    : { l: 'Paid back after graduation in', f: noSalary ? 'salary not published' : payback === null ? 'over 30 years' : yrs(payback) };
  const sub = o && !noSalary ? (mode === 'cost' ? `Payback ${payback === null ? 'over 30 years' : yrs(payback)} · 10-year NPV ${usd(o.npv)}` : `Total cost ${usd(total!)} · 10-year NPV ${usd(o.npv)}`) : o ? `Total cost ${usd(total!)}` : '';
  const rows: Array<[string, string] | [string, string, boolean]> = o ? [
    ['Tuition and fees, whole program', usd(o.direct - living)],
    [`Living budget${s.livingBasis === 'visa' && livo === null ? ' (UK visa minimum)' : ''}`, usd(living)],
    [`Salary given up, ${s.months} months`, usd(o.forgone)],
    ...(internIncome(s, model) > 0 ? [['Summer internship earned', `−${usd(internIncome(s, model))}`] as [string, string]] : []),
    ...(sch > 0 ? [['Scholarship', `−${usd(sch)}`] as [string, string]] : []),
    ...(interest > 0 ? [['Loan interest', usd(interest)] as [string, string]] : []),
    ['Total cost', usd(total!), true],
    [`Salary after: ${gl.fallback && s1o === null ? 'school-wide ' : ''}${kindLabel(gl.stat)}${g.id === 'all' ? '' : `, ${g.label.toLowerCase()}`}`, noSalary ? 'not published' : usd(s1)],
    ...(bonusExpected(s) > 0 ? [['Signing bonus × share receiving it', usd(bonusExpected(s))] as [string, string]] : []),
    ...(o && !noSalary ? [['10-year net present value', usd(o.npv), true] as [string, string, boolean], ['Return on the cost (present values)', o.roi === null ? 'n/a' : `${Math.round(o.roi * 100)}%`] as [string, string]] : []),
    ...(payment > 0 ? [['Yearly loan instalment', usd(payment)] as [string, string]] : []),
  ] : [];
  return (
    <div>
      <Card form={<>
        <StatePick id={`${idPrefix}-school`} label="School" value={slug} onChange={pick} states={schoolOpts} lock={lock} />
        <NumberField id={`${idPrefix}-s0`} label="Your salary today" value={s0} onChange={setS0} unit="$" max={1000000} help="Gross, per year" />
        <SelectField id={`${idPrefix}-goal`} label="Where you want to work" value={g.id} onChange={(v) => { setGoalId(v); setS1o(null); }} options={goals.map((y) => ({ value: y.id, label: y.label }))} />
        <NumberField id={`${idPrefix}-sch`} label="Scholarship expected" value={sch} onChange={setSch} unit="$" max={500000} help="Whole program" />
        <NumberField id={`${idPrefix}-s1`} label="Salary after the MBA" value={s1} onChange={(v) => setS1o(v)} unit="$" max={1000000} help={noSalary ? 'Not published: type yours' : 'From the school report'} />
        <NumberField id={`${idPrefix}-liv`} label="Living budget" value={living} onChange={(v) => setLivo(v)} unit="$" max={1000000} help={noLiving ? 'Not published: type yours' : 'Whole program'} />
        {mode === 'payback' && <>
          <NumberField id={`${idPrefix}-loan`} label="Amount borrowed" value={loan} onChange={setLoan} unit="$" max={1000000} />
          <NumberField id={`${idPrefix}-rate`} label="Loan interest rate" value={rate} onChange={setRate} unit="%" max={30} decimals={2} />
          <NumberField id={`${idPrefix}-yrs`} label="Repaid over" value={years} onChange={setYears} unit="years" max={30} />
        </>}
      </>}>
        <Result label={head.l} figure={head.f} sub={sub}>
          <Rows rows={rows} />
          <Note methodHref={methodHref}>US dollars at the ECB rate of the last update. Raises of {Math.round(model.g1 * 100)}% a year with the MBA and {Math.round(model.g0 * 100)}% without, discounted at {Math.round(model.r * 100)}%, before tax. {noLiving ? 'The school publishes no living budget: the figure above is yours. ' : ''}{gl.fallback && s1o === null ? 'The school gives no salary for this goal: its school-wide figure is used. ' : ''}</Note>
          <Actions />
        </Result>
      </Card>
    </div>
  );
}
