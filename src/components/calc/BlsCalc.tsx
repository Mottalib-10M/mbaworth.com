/** Where a salary sits among U.S. workers of one occupation (BLS OEWS percentiles), with the MBA-school figure next to it. */
import { useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Card, Result, Rows, Note, usd, num } from './parts';

export interface Occ { soc: string; name: string; employment: number; p25: number; median: number; p75: number }
interface Props { occs: Record<string, Occ>; metro: Array<{ area: string; median: number }>; occ?: string; period: string; methodHref: string; idPrefix?: string }
export default function BlsCalc({ occs, metro, occ = '131111', period, methodHref, idPrefix = 'bls' }: Props) {
  const [code, setCode] = useState(occ);
  const [pay, setPay] = useState(occs[occ]?.median ?? 100000);
  const o = occs[code];
  const pos = pay <= o.p25 ? `below the 25th percentile` : pay <= o.median ? 'between the 25th percentile and the median' : pay <= o.p75 ? 'between the median and the 75th percentile' : 'above the 75th percentile';
  return (
    <Card form={<>
      <SelectField id={`${idPrefix}-occ`} label="Occupation (U.S.)" value={code} onChange={(v) => { setCode(v); setPay(occs[v].median); }} options={Object.entries(occs).map(([k, v]) => ({ value: k, label: v.name }))} className="sm:col-span-2" />
      <NumberField id={`${idPrefix}-pay`} label="Salary to place" value={pay} onChange={setPay} unit="$" max={1000000} help="Gross, per year" className="sm:col-span-2" />
    </>}>
      <Result label={`${o.name}: U.S. median, ${period}`} figure={usd(o.median)} sub={`${usd(pay)} sits ${pos}`}>
        <Rows rows={[['25th percentile', usd(o.p25)], ['Median', usd(o.median)], ['75th percentile', usd(o.p75)], ['Workers counted', num(o.employment)], ...(code === '131111' ? metro.slice(0, 4).map((m) => [`Median, ${m.area}`, usd(m.median)] as [string, string]) : [])]} />
        <Note methodHref={methodHref}>All employers and levels together: a post-MBA consultant at a strategy firm is paid well above this median, as the school reports show.</Note>
      </Result>
    </Card>
  );
}
