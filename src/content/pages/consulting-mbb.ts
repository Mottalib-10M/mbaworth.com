import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

type S = (typeof K.schools)[number];
// The three firms in the employer lists the schools publish (our count).
const FIRMS = [
  { key: 'mck', name: 'McKinsey & Company', short: 'McKinsey', re: /mckinsey/i },
  { key: 'bcg', name: 'Boston Consulting Group', short: 'BCG', re: /boston consulting|\bBCG\b/i },
  { key: 'bain', name: 'Bain & Company', short: 'Bain', re: /\bbain\b/i },
];
const lists = K.schools.filter((s) => s.emp.employers.length > 0);
const hires = (s: S, re: RegExp) => s.emp.employers.filter((e) => re.test(e.name)).reduce((a, e) => a + (e.hires ?? 0), 0);
const counting = lists.filter((s) => FIRMS.some((f) => hires(s, f.re) > 0));
const stats = FIRMS.map((f) => ({ ...f, schools: lists.filter((s) => s.emp.employers.some((e) => f.re.test(e.name))).length, hires: counting.reduce((a, s) => a + hires(s, f.re), 0) }));
const allThree = lists.filter((s) => FIRMS.every((f) => s.emp.employers.some((e) => f.re.test(e.name))));
const mbbHires = stats.reduce((a, f) => a + f.hires, 0);
const fr = K.ranking('f-consulting');
const ftop = fr.ranked[0];
const f2 = fr.ranked[1];
const fnShare = (s: S) => { const rows = s.emp.functions.filter((r) => r.key === 'consulting' && r.pct); return rows.length ? Math.max(...rows.map((r) => r.pct!)) : null; };
const withFn = K.schools.filter((s) => fnShare(s) !== null);
const over35 = withFn.filter((s) => fnShare(s)! >= 35);
const yale = K.s('yale-som');
const yaleExt = yale.emp.functions.find((r) => /External/.test(r.label))!;
const std = K.top('consulting', 1)[0].salary!;
// Official pages read on 2026-10-13: BCG overview (offices "in more than 100 cities in over 50 countries",
// "33.5k global employees") and Bain About ("Since 1973", "Across 67 cities in 40 countries").
const BCG = { cities: 100, countries: 50, people: 33500 };
const BAIN = { since: 1973, cities: 67, countries: 40 };

export default definePage({
  id: 'consulting-mbb',
  group: 'consulting',
  order: 8,
  slug: 'consulting/mbb',
  nav: 'MBB: McKinsey, BCG, Bain',
  card: 'MBB explained: the three strategy firms compared on the schools that name them, their hires and the share of each class in consulting jobs.',
  title: 'MBB Consulting 2026: McKinsey, BCG, Bain and MBA Salary',
  description: `MBB in 2026: McKinsey, BCG and Bain compared on ${lists.length} MBA employer lists, ${K.num(mbbHires)} counted hires, a ${K.usd(std)} base proxy and the schools that feed consulting jobs.`,
  h1: 'MBB: McKinsey, BCG and Bain, side by side',
  intro: `MBB is shorthand for McKinsey, Boston Consulting Group and Bain, the three strategy firms that hire the most MBA graduates; all three appear in the employer lists of ${allThree.length} schools on this site.`,
  resume: `MBB stands for McKinsey, BCG and Bain, the three largest strategy consulting firms and the three that recruit most at business schools. On this site's data they are close but not equal. McKinsey is named by the most schools, ${stats[0].schools} of the ${lists.length} that publish an employer list; BCG by ${stats[1].schools}; Bain by ${stats[2].schools}. At the ${counting.length} schools that count hires by firm, BCG leads with ${stats[1].hires}, McKinsey follows with ${stats[0].hires} and Bain with ${stats[2].hires}. The MBB salary is not published by any of them, but the American schools where they hire report a consulting median of ${K.usd(std)}, the best public proxy for their base offer. The share of a class taking consulting jobs is the other figure that matters: ${over35.length} of the ${withFn.length} schools that report job functions put 35% or more of the class in consulting roles, and ${ftop.short} comes first in our ranking on that goal with ${K.p(ftop.share)}.`,
  faqs: [
    { q: 'What does MBB stand for in consulting?', a: `MBB stands for McKinsey, BCG and Bain, the three large strategy consulting firms. The term is used by students and recruiters, not by the firms. All three appear together in the employer lists of ${allThree.length} schools on this site, and at the schools that publish hire counts they account for ${K.num(mbbHires)} hires in the last class.` },
    { q: 'What is the MBB salary after an MBA?', a: `None of the three publishes it. The American schools where they hire most report a consulting median of ${K.usd(std)}, and the same figure appears at many schools because the three firms tend to make the same base offer to MBA hires in a given year. Signing and performance bonuses come on top and are not in the school reports.` },
    { q: 'Which of McKinsey, BCG and Bain hires the most MBA graduates?', a: `At the ${counting.length} schools that count hires by firm, BCG: ${stats[1].hires} hires against ${stats[0].hires} for McKinsey and ${stats[2].hires} for Bain. McKinsey is named by more schools, ${stats[0].schools} against ${stats[1].schools} for BCG, so it recruits more widely even where counts are missing. All the counting schools are American.` },
    { q: 'How do McKinsey, BCG and Bain differ from each other?', a: `On public figures, mostly in size and reach. BCG's site gives offices in more than ${BCG.cities} cities in over ${BCG.countries} countries; Bain's gives ${BAIN.cities} cities in ${BAIN.countries} countries; McKinsey's site did not answer our requests. In the school reports, McKinsey is the most widely named, BCG the most hired where counts exist. Culture and style differences exist but cannot be measured from documents.` },
    { q: 'Which MBA school sends the largest share of its class into consulting jobs?', a: `In our ranking on consulting and strategy job functions, ${ftop.short} comes first with ${K.p(ftop.share)} of its class, followed by ${f2.short} at ${K.p(f2.share)}. The ranking also weighs the salary and the ten-year value of the degree. Function shares can include internal strategy roles at companies, which some schools add to their consulting line.` },
  ],
  body: (h) => `<h2>Three firms, one acronym</h2>
<p>MBB is the name students give to the three strategy firms that dominate MBA recruiting: McKinsey & Company, Boston Consulting Group and Bain & Company. None of them uses the term. It groups them because they compete for the same graduates, run the same kind of project for the same kind of client, and make similar offers. The firms below them in size, from Kearney and Oliver Wyman to the strategy arms of the audit networks, are covered on ${h.a('consulting-big-4-consulting', 'Big 4 consulting')} and ${h.a('consulting-consulting-firms', 'consulting firms that hire MBAs')}.</p>
<p>What the schools show is that the three are close but not interchangeable. The table counts, for each firm, the schools on this site that name it in their employer list, and the hires reported by the schools that publish a count by firm.</p>
${h.table(['Firm', 'Schools naming it', 'Hires at counting schools'], stats.map((f) => [f.name, `${K.num(f.schools)} of ${K.num(lists.length)}`, K.num(f.hires)]), `Our count from each school's employer list. Hires are summed over the ${counting.length} schools that publish a number for at least one of the three firms.`, ['l', 'r', 'r'])}
<h2>How they differ on the record</h2>
<p><strong>McKinsey is the widest.</strong> It is named by ${stats[0].schools} schools, more than any other consulting firm, in Europe, India and China as well as the United States. Its own site did not answer our requests when we wrote, so we give no figure about its offices; see the ${h.a('consulting-mckinsey-salary', 'McKinsey salary page')} for what the schools show.</p>
<p><strong>BCG is the largest recruiter where hires are counted.</strong> At the schools that publish numbers, it leads with ${stats[1].hires} hires. Its site gives offices in more than ${BCG.cities} cities in over ${BCG.countries} countries and ${K.num(BCG.people)} employees; the ${h.a('consulting-bcg-salary', 'BCG salary page')} works through the counts school by school.</p>
<p><strong>Bain is the smallest of the three in reach.</strong> Its site says it has worked with clients since ${BAIN.since}, across ${BAIN.cities} cities in ${BAIN.countries} countries, and it appears in fewer employer lists and with fewer counted hires than its two peers. The ${h.a('consulting-bain-salary', 'Bain salary page')} looks at what the schools that name it report outside the United States.</p>
<p>Differences of culture, training or project style are real but they are not in any document we can check, so they are not on this page. Ask current consultants at each firm, which is what the recruiting season is for.</p>
<h2>The MBB salary, and why it is one number</h2>
<p>The three firms publish no pay grids, and the government files that sometimes show a firm's declared wages could not be downloaded when we wrote. The best public evidence is the consulting median at the schools where they recruit: ${K.usd(std)} at the top American schools, repeated to the dollar from school to school. That repetition is the signature of a common base offer. The national median for all management analysts, ${K.usd(K.P.bls.occupations['131111'].median)} in ${K.P.bls.period} according to the BLS, shows how far above the profession that offer sits; the ${h.a('consulting-consultant-salary', 'consultant salary page')} gives the full comparison.</p>
${h.miniGoal(ftop.slug)}
<h2>Share of each class in consulting jobs</h2>
<p>For an applicant aiming at MBB, the share of a class that takes consulting jobs is a better guide than any list of names. It is reported by function, the job the graduate does, rather than by industry. ${over35.length} of the ${withFn.length} schools that report functions put 35% or more of the class in consulting roles. Our ranking on that goal, which also weighs the salary and the ten-year value for a person earning ${K.ref()}, puts ${ftop.short} first and ${f2.short} second.</p>
${h.rankTable('f-consulting', 10)}
<p>Read the function share with one caution: some schools fold internal consulting and corporate strategy into their consulting line. ${h.sc('yale-som')}, for example, reports ${K.p(yaleExt.pct!)} of its class in external consulting and a larger total once internal strategy roles are added. The industry share, used by ${h.a('best-mba-consulting', 'the consulting ranking')}, counts graduates who joined consulting firms, which is closer to MBB recruiting. The finder at the top of this page ranks schools on the job function; switch it to the industry to compare.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'f-consulting' },
  related: ['consulting-mckinsey-salary', 'consulting-bcg-salary', 'consulting-bain-salary', 'consulting-consulting-firms', 'best-mba-consulting'],
  sources: ['mbacsea', 'bls_oews'],
  schoolSources: [...counting.map((s) => s.slug), 'yale-som'],
  extSources: [
    { label: 'Boston Consulting Group, About BCG (overview)', url: 'https://www.bcg.com/about/overview' },
    { label: 'Bain & Company, About Bain', url: 'https://www.bain.com/about/' },
  ],
});
