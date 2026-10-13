/** Mini: a school's figure in its own currency → US dollars at the ECB reference rate of the build. */
import type { MiniSpec } from '../mini-types';
import { usd, num, parseArg } from './_kit';
interface Arg { rates: Record<string, number>; date: string }
export default function fx(arg?: string): MiniSpec {
  const a = parseArg<Arg | null>(arg, null);
  if (!a) throw new Error('fx mini needs the rates');
  const cur = Object.keys(a.rates).filter((c) => c !== 'USD');
  return {
    title: 'A fee or a salary in US dollars',
    cta: 'See every school in dollars',
    inputs: [{ id: 'v', label: 'Amount', def: 100000, max: 1e10 }, { id: 'c', label: 'Currency', def: 0, options: cur.map((c, i) => ({ value: String(i), label: c })) }],
    run: (v) => { const c = cur[v.c] ?? cur[0]; return { head: ['In US dollars', usd(v.v * a.rates[c])], rows: [[`1 ${c}`, `$${num(a.rates[c], a.rates[c] < 0.1 ? 4 : 3)}`]], note: `ECB reference rate of ${a.date}. Prices on the ground do not follow exchange rates one for one.` }; },
  };
}
