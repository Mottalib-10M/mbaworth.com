/** Shared pieces of the calculators: card, state picker, result box, ledger rows, actions. */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import SelectField from '../ui/SelectField';
import { formatMoney, formatNumber } from '../../lib/format';

/** null / undefined = donnée absente : « not published », jamais « $0 » (garde-fou 2026-10-15). */
export const usd = (n: number | null | undefined, d = 0) => (n === null || n === undefined ? 'not published' : formatMoney(Number.isFinite(n) ? n : 0, d));
export const num = (n: number, d = 0) => formatNumber(Number.isFinite(n) ? n : 0, d);
export interface Opt { value: string; label: string }

export function Card({ children, form }: { children: ReactNode; form: ReactNode }) {
  return (
    <div className="rechner grid gap-6 rounded-xl border border-navy-200 border-t-[3px] border-t-accent-500 bg-white p-4 sm:p-6 lg:grid-cols-2 lg:items-start">
      <form className="grid content-start gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>{form}</form>
      <div>{children}</div>
    </div>
  );
}

export function StatePick({ id, value, onChange, states, lock, label = 'State', help, className = '' }: { id: string; value: string; onChange: (v: string) => void; states: Opt[]; lock?: boolean; label?: string; help?: string; className?: string }) {
  const name = states.find((s) => s.value === value)?.label ?? value;
  if (lock) return (
    <div className={`grid grid-rows-subgrid row-span-3 content-start gap-y-0 ${className}`}>
      <span className="mb-1 block text-sm font-medium text-navy-700">{label}</span>
      <p className="flex h-12 items-center rounded-lg border border-navy-200 bg-navy-50 px-4 font-semibold text-navy-900">{name}</p>
      {help && <span className="mt-1 text-xs text-navy-500">{help}</span>}
    </div>
  );
  return <SelectField id={id} label={label} value={value} onChange={onChange} options={states} help={help} className={className} />;
}

export function Result({ label, figure, sub, children }: { label: string; figure: string; sub?: ReactNode; children?: ReactNode }) {
  // Phone: while the result card is below the screen, a bar pinned to the bottom shows the key figure (RECETTE §5, 2026-10-11).
  const card = useRef<HTMLDivElement>(null);
  const [below, setBelow] = useState(false);
  useEffect(() => {
    const el = card.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setBelow(!e.isIntersecting && e.boundingClientRect.top > 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={card} aria-live="polite" data-resultat className="rounded-lg bg-accent-50 p-4 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-700">{label}</p>
      <p className="result-figure tabular-nums mt-2 text-[2.5rem]">{figure}</p>
      {sub && <p className="ledger-range mt-1 text-sm">{sub}</p>}
      {children}
      {below && (
        <button type="button" aria-hidden="true" tabIndex={-1} onClick={() => card.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="fixed inset-x-0 bottom-0 z-40 flex items-baseline justify-between gap-3 border-t-2 border-accent-500 bg-ink px-4 py-3 text-left shadow-lg lg:hidden">
          <span className="text-sm font-medium text-[#c9cdd8]">{label}</span>
          <span className="tabular-nums font-serif text-xl font-semibold text-[#fbf9f4]">{figure}</span>
        </button>
      )}
    </div>
  );
}

export function Rows({ rows, marks = {} }: { rows: Array<[string, string] | [string, string, boolean]>; marks?: Record<string, string> }) {
  return (
    <table data-chrome className="mt-4 w-full text-sm"><tbody className="divide-y divide-accent-100">
      {rows.map(([l, v, strong]) => <tr key={l} className={strong ? 'border-t-2 border-t-navy-900' : ''}><td className={`py-1.5 pr-3 ${strong ? 'font-semibold text-navy-900' : 'text-navy-700'}`}>{marks[l] && <span className="swatch" style={{ backgroundColor: marks[l] }} aria-hidden="true" />}{l}</td><td className={`tabular-nums py-1.5 text-right text-navy-900 ${strong ? 'font-semibold' : ''}`}>{v}</td></tr>)}
    </tbody></table>
  );
}

export function Note({ children, methodHref }: { children: ReactNode; methodHref?: string }) {
  return <p className="mt-3 text-xs text-navy-700">{children}{methodHref && <> <a className="underline" href={methodHref}>How this is calculated</a>.</>}</p>;
}

export function Actions() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard?.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };
  return (
    <div className="mt-3 flex flex-wrap gap-2 text-sm">
      <button type="button" onClick={copy} className="rounded-md border border-navy-300 bg-white px-3 py-1.5 font-medium text-navy-800 hover:border-accent-500 hover:text-accent-700">{copied ? 'Link copied' : 'Copy share link'}</button>
      <button type="button" onClick={() => window.print()} className="rounded-md border border-navy-300 bg-white px-3 py-1.5 font-medium text-navy-800 hover:border-accent-500 hover:text-accent-700">Print</button>
    </div>
  );
}

/** Thin proportional bar of the cost lines (decorative: the figures are in the rows below). */
export function CostBar({ parts }: { parts: Array<{ value: number; color: string }> }) {
  const total = parts.reduce((s, p) => s + Math.max(0, p.value), 0);
  if (total <= 0) return null;
  return <div className="cost-bar mt-4" aria-hidden="true">{parts.map((p, i) => <span key={i} style={{ width: `${(Math.max(0, p.value) / total) * 100}%`, backgroundColor: p.color }} />)}</div>;
}
export const COST_COLORS = { tuition: '#0F5257', living: '#b08a3e', forgone: '#5f6270' };

/** Proportional bar of a cost split (materials, labor, the rest). */
export function SplitBar({ parts }: { parts: Array<{ label: string; value: number; color: string }> }) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  if (total <= 0) return null;
  return (
    <div className="mt-4" role="img" aria-label={parts.map((p) => `${p.label} ${Math.round((p.value / total) * 100)} percent`).join(', ')}>
      <div className="flex h-3 overflow-hidden rounded-full">{parts.map((p) => <div key={p.label} style={{ width: `${(p.value / total) * 100}%`, backgroundColor: p.color }} />)}</div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">{parts.map((p) => <span key={p.label} className="flex items-center gap-1.5 text-xs text-navy-700"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} aria-hidden="true" />{p.label} {Math.round((p.value / total) * 100)}%</span>)}</div>
    </div>
  );
}
export const SPLIT_COLORS = { materials: '#334155', labor: '#B22234', other: '#94a3b8' };
