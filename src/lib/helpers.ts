/** Writing tools (`Helpers`) passed to the body of every page. */
import { route, ROUTES } from '../i18n/routes';
import type { Helpers } from './page-types';
import { formatNumber } from './format';
import { KIT } from './kit';
import { P, MODEL, schoolBySlug, calcSchool, hasSchool, type School } from './data';
import { schoolId, hasSchoolPage } from './pages';
import { usd, p, yrs, kindLabel } from './fmt';
import { GOAL_LIST } from './goals';

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
export const schoolLink = (slug: string, text?: string) => { if (!hasSchool(slug)) { if (process.env.VITEST) throw new Error(`Unknown school ${slug}`); return text ?? slug; } return hasSchoolPage(slug) ? link(schoolId(slug), text ?? schoolBySlug(slug).short) : (text ?? schoolBySlug(slug).short); };
export const box = (title: string, html: string) => `<aside class="boxnote not-prose"><p class="boxnote-title">${title}</p><div class="text-navy-800">${html}</div></aside>`;
export const mini = (kind: string, arg?: unknown) => `<!--mini:${kind}${arg === undefined ? '' : `|${Buffer.from(JSON.stringify(arg)).toString('base64')}`}-->`;
export function rankTable(goalId: string, n = 10, filter?: (s: School) => boolean, caption?: string) {
  const r = KIT.ranking(goalId, filter);
  const g = GOAL_LIST.find((x) => x.id === goalId)!;
  const rows = r.ranked.slice(0, n).map((x) => [String(x.rank), schoolLink(x.slug), p(x.share), x.placed === null ? 'n/a' : formatNumber(x.placed, 0), x.salary === null ? 'not published' : `${usd(x.salary)}${x.estimated ? ' est.' : x.fallback ? '*' : ''}`, x.npv === null ? 'n/a' : x.payback === null ? 'over 30 years' : yrs(x.payback), x.npv === null ? 'n/a' : usd(x.npv), formatNumber(x.score, 0)]);
  return table(['#', 'School', g.kind === 'zone' ? 'Share placed there' : 'Share of class', 'Graduates, about', 'Salary', 'Payback', '10-year NPV', 'Fit score'], rows,
    caption ?? `Our ranking for ${g.label.toLowerCase()}${g.kind === 'zone' ? ', on the share of the class placed there' : ''}: reference person earning ${usd(MODEL.refSalary)} before the MBA, salaries converted to US dollars at the ECB rate of ${KIT.day(KIT.FX_DATE)}. * school-wide salary, the school does not publish one for this segment. est.: estimated from the reports of the schools that publish it (method, section 8).`, ['r', 'l', 'r', 'r', 'r', 'r', 'r', 'r']);
}
export function helpers(): Helpers {
  return {
    ...KIT, a: link, table, rankTable, sc: schoolLink,
    src: (key: string, text?: string) => { const s = SOURCES[key]; if (!s) throw new Error(`Unknown source ${key}`); return ext(s.url, text ?? s.label); },
    ext, box, mini,
    miniPayback: (slug: string) => { const c = calcSchool(schoolBySlug(slug), null); return mini('payback', { c, m: MODEL, kind: kindLabel(c.kind) }); },
    miniGoal: (slug: string) => { const c = calcSchool(schoolBySlug(slug), null); return mini('goalAt', { c, m: MODEL }); },
    miniTwo: (a: string, b: string) => mini('twoSchools', { a: calcSchool(schoolBySlug(a), null), b: calcSchool(schoolBySlug(b), null), m: MODEL }),
    miniScholarship: (slug: string) => mini('scholarship', { c: calcSchool(schoolBySlug(slug), null), m: MODEL }),
    miniFx: () => mini('fx', { rates: Object.fromEntries(['EUR', 'GBP', 'CHF', 'CNY', 'INR', 'SGD', 'HKD', 'CAD', 'AUD', 'KRW'].filter((c) => c in KIT.FX).map((c) => [c, KIT.FX[c]])), date: KIT.day(KIT.FX_DATE) }),
    miniPosition: (code: string) => { const o = (P.bls.occupations as Record<string, { name: string; p25: number; median: number; p75: number }>)[code]; if (!o) throw new Error(`Unknown occupation ${code}`); return mini('position', { name: o.name, p25: o.p25, median: o.median, p75: o.p75, period: P.bls.period }); },
  };
}
