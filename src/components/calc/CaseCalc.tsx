/** Case interview drills: market sizing, break-even and profit tree, with the arithmetic shown step by step. */
import { useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { Card, Result, Rows, Note, num, usd } from './parts';

interface Props { mode?: 'sizing' | 'breakeven' | 'profit'; methodHref: string; idPrefix?: string }
const short = (x: number) => (Math.abs(x) >= 1e9 ? `$${num(x / 1e9, 1)} billion` : Math.abs(x) >= 1e6 ? `$${num(x / 1e6, 1)} million` : usd(x));
export default function CaseCalc({ mode = 'sizing', methodHref, idPrefix = 'case' }: Props) {
  const [m, setM] = useState(mode);
  const [pop, setPop] = useState(340000000);
  const [share, setShare] = useState(30);
  const [freq, setFreq] = useState(2);
  const [price, setPrice] = useState(25);
  const [fixed, setFixed] = useState(2000000);
  const [unitPrice, setUnitPrice] = useState(40);
  const [unitCost, setUnitCost] = useState(15);
  const [vol, setVol] = useState(120000);
  const market = pop * (share / 100) * freq * price;
  const margin = unitPrice - unitCost;
  const be = margin > 0 ? fixed / margin : null;
  const profit = vol * margin - fixed;
  const res = m === 'sizing'
    ? { l: 'Market size per year', f: short(market), rows: [['Buyers', num(pop * (share / 100))], ['Purchases per year', num(pop * (share / 100) * freq)], ['× price', usd(price)]] as Array<[string, string]> }
    : m === 'breakeven'
      ? { l: 'Units needed to break even', f: be === null ? 'never (price ≤ cost)' : num(Math.ceil(be)), rows: [['Contribution per unit', usd(margin)], ['Fixed costs', usd(fixed)], ['Break-even revenue', be === null ? 'n/a' : short(Math.ceil(be) * unitPrice)]] as Array<[string, string]> }
      : { l: 'Profit', f: short(profit), rows: [['Revenue', short(vol * unitPrice)], ['Variable costs', short(vol * unitCost)], ['Fixed costs', short(fixed)], ['Margin', vol * unitPrice > 0 ? `${num((profit / (vol * unitPrice)) * 100, 1)}%` : 'n/a']] as Array<[string, string]> };
  return (
    <Card form={<>
      <SelectField id={`${idPrefix}-m`} label="Drill" value={m} onChange={(v) => setM(v as 'sizing')} options={[{ value: 'sizing', label: 'Market sizing' }, { value: 'breakeven', label: 'Break-even' }, { value: 'profit', label: 'Profit tree' }]} className="sm:col-span-2" />
      {m === 'sizing' && <>
        <NumberField id={`${idPrefix}-pop`} label="Population" value={pop} onChange={setPop} max={9000000000} />
        <NumberField id={`${idPrefix}-share`} label="Share who buy" value={share} onChange={setShare} unit="%" max={100} decimals={1} />
        <NumberField id={`${idPrefix}-freq`} label="Purchases per buyer per year" value={freq} onChange={setFreq} max={10000} decimals={1} />
        <NumberField id={`${idPrefix}-price`} label="Price per purchase" value={price} onChange={setPrice} unit="$" max={1000000} decimals={2} />
      </>}
      {m !== 'sizing' && <>
        <NumberField id={`${idPrefix}-fixed`} label="Fixed costs per year" value={fixed} onChange={setFixed} unit="$" max={1e11} />
        <NumberField id={`${idPrefix}-up`} label="Price per unit" value={unitPrice} onChange={setUnitPrice} unit="$" max={1e7} decimals={2} />
        <NumberField id={`${idPrefix}-uc`} label="Variable cost per unit" value={unitCost} onChange={setUnitCost} unit="$" max={1e7} decimals={2} />
        {m === 'profit' && <NumberField id={`${idPrefix}-vol`} label="Units sold per year" value={vol} onChange={setVol} max={1e10} />}
      </>}
    </>}>
      <Result label={res.l} figure={res.f}><Rows rows={res.rows} /><Note methodHref={methodHref}>State each assumption out loud, round to friendly numbers, then sanity-check the result against something you know.</Note></Result>
    </Card>
  );
}
