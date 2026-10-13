/** One-line descriptions of pages in the "Keep comparing" cards. */
import { KIT } from './kit';
import { pageById, schoolPageById } from './pages';
export const schoolCard = (slug: string) => { const c = KIT.c(slug); const tot = KIT.cost(slug); return `${c.months ?? '?'} months · ${tot ? `total cost ${tot}` : 'living budget not published'}${KIT.salaryUsd(slug) ? ` · salary ${KIT.salaryUsd(slug)}` : ''}`; };
export const card = (id: string) => pageById(id)?.card ?? (schoolPageById(id) ? schoolCard(schoolPageById(id)!.slug) : '');
