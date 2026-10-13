/**
 * One page = ONE content file (CONTRIBUTING-PAGES.md):
 *  - a tool, ranking, sector or guide page: `src/content/pages/<id>.ts` (PageDef);
 *  - a school page: `src/content/schools/<slug>.ts` (SchoolDef), slug = a file of research/schools/.
 * Routes, menus, footer, sitemap, schemas and internal links read these files alone.
 */
import type { Kit } from './kit';

export interface FAQ { q: string; a: string }

export interface Helpers extends Kit {
  /** Internal link by page id ("mba-finder", "school:insead", "method"…). An unknown id fails the page test. */
  a: (id: string, text: string) => string;
  /** Link to a school page by slug (plain name when the school has no page yet). */
  sc: (slug: string, text?: string) => string;
  /** Ledger table; numbers are formatted, strings are inserted as HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Our ranking for a goal as a short table (rank, school, share, salary, payback, NPV), reference person. */
  rankTable: (goalId: string, n?: number, filter?: (s: import('./data').School) => boolean, caption?: string) => string;
  /** Link to a source of params-2026.json (key), with optional text. */
  src: (key: string, text?: string) => string;
  /** Link to any official URL (nofollow). */
  ext: (url: string, text: string) => string;
  /** Ruled note. */
  box: (title: string, html: string) => string;
  /** Inline mini-simulator `<!--mini:kind|arg-->`, rendered as an island. Place it just before an <h2>. */
  mini: (kind: string, arg?: unknown) => string;
  /** Ready-made minis built from the data. */
  miniPayback: (slug: string) => string;
  miniGoal: (slug: string) => string;
  miniTwo: (a: string, b: string) => string;
  miniScholarship: (slug: string) => string;
  miniFx: () => string;
  /** BLS occupation code of params-2026.json > bls.occupations ("131111" management analysts…). */
  miniPosition: (code: string) => string;
}

export type Group = 'tools' | 'best' | 'consulting' | 'finance' | 'tech' | 'guides' | 'compare';
export type ToolKind = 'roi' | 'finder' | 'compare' | 'cost' | 'salary' | 'payback' | 'worth' | 'case' | 'bls' | 'project';
export interface ToolArgs {
  /** Goal id of lib/goals.ts (finder, roi). */
  goal?: string;
  /** Default school (roi, payback, worth, cost). */
  school?: string;
  /** Two or three schools (compare). */
  schools?: string[];
  /** Program length filter of the finder. */
  length?: 'any' | 'one' | 'two';
  /** School location filter of the finder ('US', 'Europe', 'UK', 'Asia'...). */
  where?: string;
  /** Trainer (case), occupation (bls). */
  mode?: string;
}

export interface PageDef {
  id: string;
  group: Group;
  order: number;
  /** URL path after /en/, lowercase and dashes, may contain one "/" (consulting/mckinsey-salary), no year. */
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
  toolArgs?: ToolArgs;
  related: string[];
  /** Keys of params-2026.json > sources. */
  sources: string[];
  /** Official pages read for facts that are not in the data (a firm's own site, a regulator): label and URL. */
  extSources?: Array<{ label: string; url: string }>;
  /** School slugs whose official documents back the page (their links are listed in the sources). */
  schoolSources?: string[];
}
export const definePage = (p: PageDef): PageDef => p;

export interface SchoolDef {
  /** = file name = slug of research/schools/<slug>.json. */
  slug: string;
  /** 50 to 60 characters, starts with the school short name, 2026 included. */
  title: string;
  /** 150 to 160 characters, 2026 included, at least one figure from the kit. */
  description: string;
  /** One sentence. */
  intro: string;
  /** ONE paragraph of 120 words or more, figures from the kit. */
  resume: string;
  /** Prose written for this school only (300+ words outside tables). */
  body: (h: Helpers) => string;
  faqs: FAQ[];
  /** 3 to 6 ids: other schools ("school:lbs"), tool or ranking pages ("mba-finder", "best-mba-consulting"). */
  related: string[];
}
export const defineSchool = (c: SchoolDef): SchoolDef => c;
