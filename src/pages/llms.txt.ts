/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES, COLLEGE_PAGES, collegeId } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { schoolBySlug } from '../lib/data';
import { pct } from '../lib/fmt';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Acceptance rates, SAT and ACT middle 50% ranges, sticker price and net price by family income for 110 US universities, with a calculator that places a student's score and family income against each school, without an account or an e-mail. Admit rates come from the newest cycle each university published (Common Data Set or class profile, entering class named) or, failing that, from IPEDS fall 2024; net price by income comes from the U.S. Department of Education College Scorecard (release of June 10, 2026, academic year 2023-24). ACT/SAT conversion on the 2018 official concordance tables. Calculations run in the browser. Averages, not offers. Published by Radif Partners. Last updated ${LAST_UPDATED}.`,
    '',
    ...GROUPS.flatMap((g) => [`## ${g.label}`, ...PAGES.filter((p) => p.group === g.id).map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`), '']),
    '## Universities',
    ...COLLEGE_PAGES.map((c) => { const s = schoolBySlug(c.slug); return `- [${s.name}](${SITE_URL}${route(collegeId(c.slug), 'en')}): admit rate ${s.adm ? pct(s.adm.rate, 2) : 'n/a'} (${s.adm?.label ?? ''})`; }),
    '',
    '## About',
    `- [Method and data](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
