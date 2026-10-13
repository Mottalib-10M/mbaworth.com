/**
 * One page = ONE content file (CONTRIBUTING-PAGES.md):
 *  - a tool or guide page: `src/content/pages/<id>.ts` (PageDef), with its tool;
 *  - a university page: `src/content/colleges/<slug>.ts` (CollegeDef), slug = a line of research/schools.tsv.
 * Routes, menus, footer, sitemap, schemas and internal links read these files alone.
 */
import type { Kit } from './kit';

export interface FAQ { q: string; a: string }

export interface Helpers extends Kit {
  /** Internal link by page id ("compare-colleges", "college:ucla", "method"…). An unknown id fails the page test. */
  a: (id: string, text: string) => string;
  /** Link to a university page by slug. */
  c: (slug: string, text?: string) => string;
  /** Ledger table; numbers are formatted, strings are inserted as HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Link to a source of params-2026.json (key), with optional text. */
  src: (key: string, text?: string) => string;
  /** Link to any official URL (nofollow). */
  ext: (url: string, text: string) => string;
  /** Ruled note. */
  box: (title: string, html: string) => string;
  /** Inline mini-simulator: `<!--mini:kind|arg-->`, rendered as an island. */
  mini: (kind: string, arg?: unknown) => string;
  /** Ready-made mini-simulators of a university (arguments built from the data). */
  miniNet: (slug: string) => string;
  miniScore: (slug: string, test?: 'SAT' | 'ACT') => string;
  miniGap: (slug: string) => string;
  miniGrant: (slug: string) => string;
  miniFour: (slug: string) => string;
  miniSatNational: () => string;
  miniActSat: () => string;
}

export type Group = 'admissions' | 'tests' | 'cost';
export type ToolKind = 'odds' | 'compare' | 'concordance' | 'sat-position' | 'act-position' | 'rates' | 'tuition' | 'net-price' | 'coa';

export interface PageDef {
  id: string;
  group: Group;
  order: number;
  /** URL segment, lowercase and dashes, no year. */
  slug: string;
  nav: string;
  card: string;
  /** 50 to 60 characters, key term first, 2026 included (RECETTE §11). */
  title: string;
  /** 150 to 160 characters, 2026 included. */
  description: string;
  h1: string;
  intro: string;
  /** ONE paragraph of 120 words or more: the direct answer with the figures (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
  tool: ToolKind;
  related: string[];
  /** Keys of params-2026.json > sources. */
  sources: string[];
}
export const definePage = (p: PageDef): PageDef => p;

export interface CollegeDef {
  /** = file name = slug of research/schools.tsv. */
  slug: string;
  /** 50 to 60 characters, starts with "<Short or full name> Acceptance Rate" (or "Tuition" / "Cost"), 2026 included. */
  title: string;
  /** 150 to 160 characters, 2026 included, at least one figure from the kit. */
  description: string;
  /** One sentence. */
  intro: string;
  /** ONE paragraph of 120 words or more, figures from the kit. */
  resume: string;
  /** Prose written for this university only (300+ words outside tables). */
  body: (h: Helpers) => string;
  faqs: FAQ[];
  /** 3 to 6 ids: other universities ("college:ucla"), tool pages ("net-price-calculator"). */
  related: string[];
}
export const defineCollege = (c: CollegeDef): CollegeDef => c;
