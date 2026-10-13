import { makeRouter, type RouteDef } from './routes-core';
import { PAGES, SCHOOL_PAGES, schoolId } from '../lib/pages';
/** English only (a worldwide audience of MBA applicants). The /en/ prefix is kept from the trame so that
 *  the checkers and the root redirect behave as on every other site built from it. */
export const LOCALES = ['en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
const R = (id: string, slug: string, noindex = false): RouteDef<Locale> => ({ id, paths: { en: `/en/${slug}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { en: '/en/' } },
  R('schools', 'schools'),
  R('method', 'method'),
  R('about', 'about'),
  R('widget', 'widget', true),
  R('contact', 'contact', true),
  R('editorial', 'editorial-policy', true),
  R('privacy', 'privacy', true),
  R('terms', 'legal-notice', true),
  R('cookies', 'cookies', true),
];
/** Tools, rankings, sectors and guides at /en/<slug>/, schools at /en/schools/<slug>/ (id "school:<slug>"). */
export const ROUTES: RouteDef<Locale>[] = [
  CORE[0],
  ...PAGES.map((p) => R(p.id, p.slug)),
  CORE[1],
  ...SCHOOL_PAGES.map((c) => R(schoolId(c.slug), `schools/${c.slug}`)),
  ...CORE.slice(2),
];
export const { NOINDEX_PATHS, route, altPaths } = makeRouter(LOCALES, ROUTES);
