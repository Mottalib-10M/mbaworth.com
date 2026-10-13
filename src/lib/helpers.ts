/** Writing tools (`Helpers`) passed to the body of every page. */
import { route, ROUTES } from '../i18n/routes';
import type { Helpers } from './page-types';
import { formatNumber } from './format';
import { KIT } from './kit';
import { P, SC_META, BANDS } from './data';
import { CURVE, A2S } from './props';
import { coaOf } from './coa';
import { collegeId, hasCollegePage } from './pages';
import { SCHOOLS_SC } from './data';

const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export const SOURCES: Record<string, { url: string; label: string }> = (P as unknown as { sources: Record<string, { url: string; label: string }> }).sources;

export function table(headers: string[], rows: Array<Array<string | number>>, caption?: string, align: Array<'l' | 'r'> = []) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-700">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 font-semibold text-navy-900 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumber(c, 0)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
export function link(id: string, text: string) {
  if (!ROUTES.some((r) => r.id === id)) { if (process.env.VITEST) throw new Error(`Unknown page id in link: ${id}`); return text; }
  return `<a href="${route(id, 'en')}">${text}</a>`;
}
export const box = (title: string, html: string) => `<aside class="boxnote not-prose"><p class="boxnote-title">${title}</p><div class="text-navy-800">${html}</div></aside>`;
export const mini = (kind: string, arg?: unknown) => `<!--mini:${kind}${arg === undefined ? '' : `|${Buffer.from(JSON.stringify(arg)).toString('base64')}`}-->`;
export function helpers(): Helpers {
  return {
    ...KIT, a: link, table,
    c: (slug: string, text?: string) => { if (!SCHOOLS_SC.some((x) => x.slug === slug)) throw new Error(`Unknown school ${slug}`); return hasCollegePage(slug) ? link(collegeId(slug), text ?? KIT.s(slug).name) : (text ?? KIT.s(slug).name); },
    src: (key: string, text?: string) => { const s = SOURCES[key]; if (!s) throw new Error(`Unknown source ${key}`); return ext(s.url, text ?? s.label); },
    ext, box, mini,
    miniNet: (slug: string) => { const x = KIT.s(slug); return mini('schoolNet', { short: x.short, net: x.netByIncome, control: x.control, tuitionIn: x.tuitionIn, tuitionOut: x.tuitionOut, coa: x.coa, bands: BANDS, labels: SC_META.incomeBands, year: SC_META.years.net }); },
    miniScore: (slug: string, test: 'SAT' | 'ACT' = 'SAT') => { const x = KIT.s(slug); const r = test === 'SAT' ? x.sat : x.actR; if (!r) throw new Error(`${slug}: no ${test} range`); return mini('scorePosition', { short: x.short, test, p25: r.p25, p75: r.p75, iqr: KIT.rule.iqrToSd, label: r.label }); },
    miniGap: (slug: string) => { const x = KIT.s(slug); if (x.control !== 'public' || !x.tuitionIn || !x.tuitionOut) throw new Error(`${slug}: no tuition gap`); return mini('stateGap', { short: x.short, state: x.state, tin: x.tuitionIn, tout: x.tuitionOut, year: SC_META.years.tuition }); },
    miniGrant: (slug: string) => { const x = KIT.s(slug); const c = coaOf(x); return mini('grantLeft', { short: x.short, coa: c.total, year: c.year }); },
    miniFour: (slug: string) => { const x = KIT.s(slug); return mini('fourYears', { short: x.short, net: x.netByIncome, control: x.control, bands: BANDS, year: SC_META.years.net }); },
    miniSatNational: () => mini('satNational', { curve: CURVE, classOf: P.sat.classOf, mean: P.sat.meanTotal }),
    miniActSat: () => mini('actSat', { table: A2S }),
  };
}
