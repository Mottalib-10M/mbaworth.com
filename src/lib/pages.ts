/** Registry: every file of `src/content/pages/` and `src/content/schools/` is loaded here. */
import type { PageDef, SchoolDef } from './page-types';
import { SCHOOLS } from './data';

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

const smods = import.meta.glob<{ default: SchoolDef }>(['../content/schools/*.ts', '!../content/schools/_*.ts'], { eager: true });
export const SCHOOL_PAGES: SchoolDef[] = Object.entries(smods)
  .map(([file, m]) => {
    const g = m.default;
    const base = file.split('/').pop()!.replace(/\.ts$/, '');
    if (g.slug !== base) throw new Error(`${file}: slug "${g.slug}" differs from the file name`);
    if (!SCHOOLS.some((s) => s.slug === g.slug)) throw new Error(`${file}: no research file for this school`);
    return g;
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));
export const schoolId = (slug: string) => `school:${slug}`;
export const schoolPageById = (id: string) => SCHOOL_PAGES.find((p) => schoolId(p.slug) === id);
export const hasSchoolPage = (slug: string) => SCHOOL_PAGES.some((p) => p.slug === slug);
