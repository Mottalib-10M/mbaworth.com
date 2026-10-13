import { route, type Locale } from './routes';
import { PAGES, pageById, schoolPageById, schoolId, hasSchoolPage } from '../lib/pages';
import { SCHOOLS } from '../lib/data';
import type { Group } from '../lib/page-types';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'MBA return calculator', schools: 'All schools', method: 'Method', about: 'About', widget: 'Embed the calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
export const GROUPS: Array<{ id: Group; label: string }> = [
  { id: 'tools', label: 'Cost and return' },
  { id: 'best', label: 'Best MBA for…' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'finance', label: 'Finance' },
  { id: 'tech', label: 'Tech' },
  { id: 'compare', label: 'School vs school' },
  { id: 'guides', label: 'Guides' },
];
const NAV_GROUPS: Group[] = ['tools', 'best', 'consulting', 'finance', 'guides'];
const schoolName = (slug: string) => SCHOOLS.find((s) => s.slug === slug)?.short ?? slug;
export const label = (id: string, _lang?: Locale) => {
  if (CORE[id]) return CORE[id];
  const p = pageById(id); if (p) return p.nav;
  const c = schoolPageById(id); if (c) return schoolName(c.slug);
  return id;
};
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id) });
export const inGroup = (g: Group, lang: Locale): NavLink[] => PAGES.filter((p) => p.group === g).map((p) => link(p.id, lang));
export function navCategories(lang: Locale): NavCategory[] {
  const cats = NAV_GROUPS.map((g) => ({ label: GROUPS.find((x) => x.id === g)!.label, links: g === 'finance' ? [...inGroup('finance', lang), ...inGroup('tech', lang)] : g === 'guides' ? [...inGroup('guides', lang), ...inGroup('compare', lang)] : inGroup(g, lang) }));
  return cats.filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('schools', lang), link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [
  { label: 'Cost and return', links: inGroup('tools', lang) },
  { label: 'Best MBA for…', links: inGroup('best', lang) },
  { label: 'Careers', links: [...inGroup('consulting', lang).slice(0, 6), ...inGroup('finance', lang).slice(0, 2), ...inGroup('tech', lang).slice(0, 1)] },
  { label: 'This site', links: ['home', 'schools', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
].filter((c) => c.links.length);
/** The most searched schools (Keyword Planner, 2026-10-13) in the footer row. */
const TOP = ['harvard', 'wharton', 'insead', 'stanford', 'hec-paris', 'columbia', 'oxford-said', 'isb', 'lbs', 'iese', 'ceibs', 'chicago-booth', 'kellogg', 'cambridge-judge', 'mit-sloan'];
export const popularLinks = (lang: Locale): NavLink[] => TOP.filter(hasSchoolPage).map((s) => ({ href: route(schoolId(s), lang), label: schoolName(s) }));
