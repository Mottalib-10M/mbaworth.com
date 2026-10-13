import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const G = 'z-europe';
const R = K.ranking(G);
const T = R.ranked;
const [a, b, c] = T;
const cont = (slug: string) => K.s(slug).emp.zones.find((z) => z.zone === 'Europe')?.pct ?? null;
const uk = (slug: string) => K.s(slug).emp.zones.find((z) => z.zone === 'UK')?.pct ?? null;
const local = T.filter((x) => ['Europe', 'UK'].includes(K.s(x.slug).region));
const outside = T.filter((x) => !['Europe', 'UK'].includes(K.s(x.slug).region));
const noPay = T.filter((x) => x.salary === null);
const ukLed = T.filter((x) => (uk(x.slug) ?? 0) > (cont(x.slug) ?? 0));
const small = R.unranked.filter((u) => u.share !== null).sort((x, y) => y.share! - x.share!);
const usSmall = small.filter((u) => K.s(u.slug).region === 'US');
const usRanked = T.filter((x) => K.s(x.slug).region === 'US');
const lowest = T[T.length - 1];
const min = K.MODEL.minShare!.zone;
const fbMin = K.MODEL.zoneFallbackShare;
const shortProg = T.filter((x) => (K.s(x.slug).months ?? 99) <= 16).length;

export default definePage({
  id: 'best-mba-europe',
  group: 'best',
  order: 8,
  slug: 'best-mba-europe',
  nav: 'Best MBA for working in Europe',
  card: 'Schools ranked on the share of their class hired in Europe, the United Kingdom included.',
  title: 'MBA in Europe 2026: Schools Ranked on European Job Placement',
  description: `MBA in Europe for 2026: share of each class hired in Europe and the UK, graduates placed and payback, for ${T.length} schools, read in their own employment reports.`,
  h1: 'Best MBA for working in Europe',
  intro: `Ranked on the share of the class hired in Europe, the UK included, ${a.short} leads today with ${K.p(a.share)}.`,
  resume: `For a career in Europe, our ranking reads one line of each employment report: the share of the class that took a job in Europe, continental countries and the United Kingdom added together. Few schools publish a salary by region, so the share alone sets the order. ${a.short} leads today with ${K.p(a.share)} of its class hired in Europe, followed by ${b.short} (${K.p(b.share)}) and ${c.short} (${K.p(c.share)}). ${local.length} of the ${T.length} ranked schools are themselves in Europe; ${usRanked.length ? `${K.listOf(usRanked.map((x) => x.short))} ${usRanked.length === 1 ? 'is the only American school' : 'are the only American schools'} to qualify.` : 'American schools send too few graduates across the Atlantic to qualify.'} The salary and payback columns, computed for a reference person earning ${K.ref()} before the MBA, use the school-wide figure when Europe takes at least ${fbMin}% of the class. Enter your own salary in the finder above to see the return change for each school.`,
  faqs: [
    { q: 'Does the MBA in Europe ranking count the United Kingdom?', a: `Yes. "Working in Europe" adds the continental line and the UK line of each report, without counting any overlap twice. ${ukLed.length ? `For ${K.listOf(ukLed.map((x) => x.short))}, the UK is the larger part.` : ''} If you want the UK alone, the page for working in the United Kingdom ranks schools on that line, and the order differs.` },
    { q: 'Why do American schools not appear in the MBA in Europe ranking?', a: `${usRanked.length ? `Most do not: only ${K.listOf(usRanked.map((x) => x.short))} place${usRanked.length === 1 ? 's' : ''} ${min}% of the class or more in Europe.` : `Because none places ${min}% of its class in Europe.`} ${usSmall.length ? `The highest is ${K.s(usSmall[0].slug).short}, at ${K.p(usSmall[0].share!)}.` : ''} A Europe line that thin is made of a few individual moves, often graduates returning home, and says little about a pipeline. For a European career, a school in Europe has the employers on campus, the alumni in the cities and a class that recruits there.` },
    { q: 'Why do some European MBA schools show no salary in this ranking?', a: `${noPay.length} of the ranked schools publish neither a salary for Europe nor, when Europe takes less than ${fbMin}% of the class, a school-wide figure we can apply to it. They keep their rank, since regions are ranked on placement only, but their payback cannot be computed. The school page says which figure is missing.` },
    { q: 'Do I need to speak the local language for an MBA job in Europe?', a: 'For many roles, yes, and the employment reports do not show it. International firms in London, Amsterdam or Zurich often work in English, but consulting offices, industrial companies and public bodies in France, Germany, Spain or Italy usually expect the local language for client work. A high Europe share at a school with a mostly local class can hide that requirement.' },
  ],
  body: (h) => `<h2>Europe is a dozen job markets</h2>
<p>A single Europe line adds markets with different languages, salary levels and work permit rules. The ranking below takes the share of each class placed anywhere in Europe, continental countries and the United Kingdom together, and ranks on it alone: very few schools give a salary by region, and requiring one would leave almost nobody in the table. ${local.length} of the ${T.length} ranked schools sit in Europe${outside.length ? `, and ${K.listOf(outside.map((x) => h.sc(x.slug)))} ${outside.length === 1 ? 'is' : 'are'} the only ${outside.length === 1 ? 'one' : 'ones'} outside it` : ''}.</p>
${h.rankTable(G, 10)}
<p>Where Europe takes at least ${fbMin}% of the class, the school-wide salary stands in for a European figure and carries an asterisk. ${noPay.length ? `${noPay.length} ranked ${noPay.length === 1 ? 'school has' : 'schools have'} no salary at all in the table, so the payback is blank for ${noPay.length === 1 ? 'it' : 'them'}.` : ''} ${lowest ? `At the bottom of the ranked list, ${h.sc(lowest.slug)} still places ${K.p(lowest.share)} of its class in Europe.` : ''}</p>
<h2>The British line and the continental line</h2>
<p>Schools split Europe differently, and the split says which market a program feeds. This breakdown gives, for the first schools of the table, the share placed in the United Kingdom and the share placed in continental Europe:</p>
${h.table(['School', 'Europe, total', 'United Kingdom', 'Continental Europe'], T.slice(0, 8).map((x) => [h.sc(x.slug), K.p(x.share), uk(x.slug) === null ? 'not given' : K.p(uk(x.slug)!), cont(x.slug) === null ? 'not given' : K.p(cont(x.slug)!)]), 'Share of the class by part of Europe, as each school reports it.', ['l', 'r', 'r', 'r'])}
<p>A London school with half its class in Europe is mostly a British pipeline; a school on the continent with the same total sends its graduates to Paris, Munich, Amsterdam or Zurich. ${ukLed.length ? `In the ranking, ${K.listOf(ukLed.map((x) => h.sc(x.slug)))} place more graduates in the UK than on the continent.` : ''} If you know which side of the Channel you want, read the column, not the total.</p>
<p>The split also changes the money. Salaries in London sit above most continental cities for the same job, and a school that sends its graduates mainly to Germany, the Netherlands or Belgium reports a lower school-wide figure without its graduates being worse off once rent and taxes are counted. That is one more reason the European ranking leaves salary out of the score: converted to dollars, it would mostly measure the city.</p>
${h.miniGoal(a.slug)}
<h2>Short programs, local classes</h2>
<p>${shortProg} of the ranked schools run a program of sixteen months or less. Short programs cost less in salary given up, and their students often come from the region and go back to it, which lifts the Europe share. The trade-off is time: with no long summer internship, a career switcher has a few months to find a European employer, and a student who needs to learn a language has even less. Schools with campuses in several countries report one Europe figure for the whole class, so the share does not tell which campus their European hires came from.</p>
<h2>Schools under the threshold</h2>
<p>${small.length ? `${small.length > 6 ? `${small.slice(0, 6).map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`).join(', ')} and ${small.length - 6} more schools` : K.listOf(small.map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} report a Europe line under ${min}% of the class, too small to rank.` : `No school is held back for a share under ${min}%.`} ${usSmall.length ? `${usSmall.length} of them are American, which matches what the reports say in general: an MBA in the United States leads to a job in the United States for nearly the whole class.` : ''} A European candidate who studies in America and wants to return is a small group in those reports, and the alumni network at home will be thin.</p>
<h2>What the table cannot show</h2>
<p>Work permits in Europe are national. A graduate from outside the European Union may stay to look for work in some countries and not in others, under rules that change and that no employment report measures. Salaries vary as much across Europe as between Europe and America, so a school-wide salary for a class spread over ten countries describes no single city. Hiring follows national cycles too. Use the ranking to see which schools feed the European market, then read the country lines and the employer list on each school page, and compare two schools with the ${h.a('compare-mba', 'comparison tool')}.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'z-europe' },
  related: ['best-mba-london', 'best-mba-one-year', 'compare-mba', 'mba-finder', `school:${a.slug}`],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: [a.slug, b.slug, c.slug],
});
