/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES, SCHOOL_PAGES, schoolId } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { KIT } from '../lib/kit';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Total cost (tuition, fees, living budget and the salary given up), payback period and ten-year net present value of the MBA at ${KIT.schools.length} business schools, from each school's own fees page, student budget and employment report (class of 2025 for most), each figure dated and linked. Our own ranking of schools for an industry (consulting, investment banking, private equity, tech), a region (US, Europe, UK, Asia, Middle East) or a job, on the share of the class placed there, the salary reported and the NPV; no third-party ranking is reused. Exchange rates: ECB. Calculations run in the browser. Published by Radif Partners. Last updated ${LAST_UPDATED}.`,
    '',
    ...GROUPS.flatMap((g) => { const ps = PAGES.filter((p) => p.group === g.id); return ps.length ? [`## ${g.label}`, ...ps.map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`), ''] : []; }),
    '## Schools',
    ...SCHOOL_PAGES.map((c) => { const s = KIT.s(c.slug); return `- [${s.name}](${SITE_URL}${route(schoolId(c.slug), 'en')}): ${KIT.tuition(c.slug) ?? 'tuition n/a'} tuition, ${KIT.salary(c.slug) ? `${KIT.salaryKind(c.slug)} ${KIT.salary(c.slug)}` : 'no salary published'}`; }),
    '',
    '## About',
    `- [Method](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
