/** Registry: every file of `src/content/pages/` and `src/content/colleges/` is loaded here. */
import type { PageDef, CollegeDef } from './page-types';
import { SCHOOLS_SC } from './data';

const mods = import.meta.glob<{ default: PageDef }>(['../content/pages/*.ts', '!../content/pages/_*.ts'], { eager: true });
export const PAGES: PageDef[] = Object.entries(mods)
  .map(([file, m]) => {
    const g = m.default;
    const base = file.split('/').pop()!.replace(/\.ts$/, '');
    if (g.id !== base) throw new Error(`${file}: id "${g.id}" differs from the file name`);
    return g;
  })
  .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const pageById = (id: string) => PAGES.find((p) => p.id === id);

const cmods = import.meta.glob<{ default: CollegeDef }>(['../content/colleges/*.ts', '!../content/colleges/_*.ts'], { eager: true });
export const COLLEGE_PAGES: CollegeDef[] = Object.entries(cmods)
  .map(([file, m]) => {
    const g = m.default;
    const base = file.split('/').pop()!.replace(/\.ts$/, '');
    if (g.slug !== base) throw new Error(`${file}: slug "${g.slug}" differs from the file name`);
    if (!SCHOOLS_SC.some((s) => s.slug === g.slug)) throw new Error(`${file}: unknown school`);
    return g;
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));
/** Id of a university page: "college:<slug>". */
export const collegeId = (slug: string) => `college:${slug}`;
export const collegePageById = (id: string) => COLLEGE_PAGES.find((p) => collegeId(p.slug) === id);
export const hasCollegePage = (slug: string) => COLLEGE_PAGES.some((p) => p.slug === slug);
