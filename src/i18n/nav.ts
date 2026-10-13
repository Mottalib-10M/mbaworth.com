import { route, type Locale } from './routes';
import { PAGES, pageById, collegePageById, collegeId, hasCollegePage } from '../lib/pages';
import { SCHOOLS_SC } from '../lib/data';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'Odds and net price', method: 'Method and data', about: 'About', widget: 'Embed the calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
export const GROUPS: Array<{ id: Group; label: string }> = [
  { id: 'admissions', label: 'Admissions' },
  { id: 'tests', label: 'SAT and ACT' },
  { id: 'cost', label: 'Cost and net price' },
];
const schoolName = (slug: string) => SCHOOLS_SC.find((s) => s.slug === slug)?.name ?? slug;
export const label = (id: string, _lang?: Locale) => {
  if (CORE[id]) return CORE[id];
  const p = pageById(id); if (p) return p.nav;
  const c = collegePageById(id); if (c) return schoolName(c.slug);
  return id;
};
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => PAGES.filter((p) => p.group === g).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...GROUPS.map((g) => ({ label: g.label, links: inGroup(g.id, lang) })).filter((c) => c.links.length),
  { label: 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
/** The most searched universities in the footer row; every university page is one click from the home table. */
const TOP = ['harvard', 'stanford', 'ucla', 'nyu', 'usc', 'umich', 'mit', 'uc-berkeley', 'yale', 'columbia', 'upenn', 'uva'];
export const popularLinks = (lang: Locale): NavLink[] => TOP.filter(hasCollegePage).map((s) => ({ href: route(collegeId(s), lang), label: schoolName(s) }));
