import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const bls = K.P.bls.occupations['131111'];
const metros = [...K.P.bls.managementAnalystsByMetro].sort((a, b) => b.median - a.median);
// Consulting salary each school reports, in its currency and in US dollars (ECB rate of the build).
const rows = K.schools
  .map((s) => ({ s, r: s.emp.industries.find((x) => x.key === 'consulting') }))
  .filter((x) => x.r && x.r.salary && x.r.usd)
  .map((x) => ({ slug: x.s.slug, short: x.s.short, country: x.s.country, pct: x.r!.pct, local: K.money(x.r!.salary!, x.r!.cur), usd: x.r!.usd!, cur: x.r!.cur, kind: x.s.emp.salary?.kind ?? '' }))
  .sort((a, b) => b.usd - a.usd);
const us = rows.filter((x) => x.country === 'US');
const nonUs = rows.filter((x) => x.country !== 'US');
const mode = (() => { const c = new Map<number, number>(); for (const x of us) c.set(x.usd, (c.get(x.usd) ?? 0) + 1); return [...c.entries()].sort((a, b) => b[1] - a[1])[0]; })();
const second = (() => { const c = new Map<number, number>(); for (const x of us) if (x.usd !== mode[0]) c.set(x.usd, (c.get(x.usd) ?? 0) + 1); return [...c.entries()].sort((a, b) => b[1] - a[1])[0]; })();
const lowUs = us[us.length - 1];
const ratio = mode[0] / bls.median;
const lbs = rows.find((x) => x.slug === 'lbs')!;
const insead = rows.find((x) => x.slug === 'insead')!;

export default definePage({
  id: 'consulting-consultant-salary',
  group: 'consulting',
  order: 4,
  slug: 'consulting/consultant-salary',
  nav: 'Consultant salary',
  card: 'Management consultant salary: BLS medians and percentiles by city, against the consulting pay each MBA school reports.',
  title: 'Consultant Salary 2026: BLS Median vs Post-MBA Consulting',
  description: `Management consultant salary in 2026: BLS median of ${K.usd(bls.median)} a year, ${K.usd(metros[0].median)} in ${metros[0].area.split('-')[0]}, against a ${K.usd(mode[0])} consulting median after an MBA at ${mode[1]} US schools.`,
  h1: 'Consultant salary: the national figure and the MBA figure',
  intro: `Two numbers answer the question: ${K.usd(bls.median)}, the median management analyst in the United States, and ${K.usd(mode[0])}, the consulting median that ${mode[1]} American MBA schools report.`,
  resume: `A management consultant in the United States earned a median of ${K.usd(bls.median)} a year in ${K.P.bls.period}, according to the Bureau of Labor Statistics, which counts ${K.num(bls.employment)} management analysts. A quarter earned less than ${K.usd(bls.p25)} and a quarter more than ${K.usd(bls.p75)}. Pay depends on the city: the median reached ${K.usd(metros[0].median)} in ${metros[0].area} and ${K.usd(metros[metros.length - 1].median)} in ${metros[metros.length - 1].area}. Strategy consultants hired out of an MBA sit far above that range. Of the ${us.length} American schools that publish a consulting salary, ${mode[1]} report a median base of ${K.usd(mode[0])}, ${K.num(ratio, 1)} times the national figure, and ${second[1]} report ${K.usd(second[0])}. In Europe the figures are lower and paid in local currency: ${insead.local} at ${K.s('insead').short}, ${lbs.local} at ${K.s('lbs').short}. Base salary is only part of pay: firms add a signing bonus and a yearly performance bonus that the reports rarely break out for consulting.`,
  faqs: [
    { q: 'What is the average management consultant salary in the United States?', a: `The BLS reports a median, not an average, for management analysts: ${K.usd(bls.median)} in ${K.P.bls.period}, with the middle half between ${K.usd(bls.p25)} and ${K.usd(bls.p75)}. The occupation covers ${K.num(bls.employment)} jobs, from small-firm analysts to internal consultants in government, so it describes the profession as a whole rather than the large strategy firms.` },
    { q: 'How much more does a consultant earn after an MBA than the BLS median?', a: `At the American schools whose consulting median is ${K.usd(mode[0])}, the post-MBA base is ${K.num(ratio, 1)} times the national median of ${K.usd(bls.median)}. That gap mostly reflects who is counted: MBA consultants join large strategy firms at a senior entry level, while the BLS counts every management analyst. The MBA figure describes base salary only, before bonuses.` },
    { q: 'Which US city pays management consultants the most?', a: `Among the seven metro areas this site tracks in the BLS release for ${K.P.bls.period}, ${metros[0].area} has the highest median for management analysts, ${K.usd(metros[0].median)}, followed by ${metros[1].area} at ${K.usd(metros[1].median)}. ${metros[metros.length - 1].area} is the lowest of the seven at ${K.usd(metros[metros.length - 1].median)}. Large strategy firms tend to pay one MBA base across their American offices.` },
    { q: 'What do strategy consultants earn in Europe after an MBA?', a: `Less than in the United States, and in local currency. ${K.s('insead').short} reports ${insead.local} for its consulting hires, about ${K.usd(insead.usd)}, and ${K.s('lbs').short} ${lbs.local}, about ${K.usd(lbs.usd)} at the ECB rate of ${K.day(K.FX_DATE)}. ${lbs.kind === 'base-mean' ? `${K.s('lbs').short} gives an average rather than a median, which tends to sit higher. ` : ''}Both cover graduates working in many countries.` },
    { q: 'Why do some American MBA schools report a lower consulting salary?', a: `Their consulting hires go to a different mix of employers. ${second[1]} American schools report ${K.usd(second[0])} and the lowest, ${lowUs.short}, ${K.usd(lowUs.usd)} for the ${lowUs.pct === null ? 'few' : K.p(lowUs.pct)} of its class hired in consulting. A school sending most graduates to the large strategy firms reports their standard base; one sending more to Big 4, technology or regional firms reports a lower median.` },
  ],
  body: (h) => `<h2>The national figure: management analysts</h2>
<p>The Bureau of Labor Statistics has no "consultant" category. Its closest occupation is management analysts, code 13-1111, people who study how organizations work and recommend changes, whether they work for a consulting firm, a company or a government. In ${K.P.bls.period} it counted ${K.num(bls.employment)} of them, with a median annual wage of ${K.usd(bls.median)}. The first quartile was ${K.usd(bls.p25)}, so a quarter earned less, and the third quartile ${K.usd(bls.p75)}. These are gross wages of employees; the survey leaves out the self-employed and bonuses that are not tied to output.</p>
<p>The spread inside the occupation is wide because the work is. A junior analyst in a small regional firm and a senior internal consultant at a federal agency share the code, and neither is paid like a consultant at a large strategy firm. Read the BLS median as the floor of the profession: what someone doing this kind of work earns in an ordinary job, the figure a career changer can expect without the strategy firm route.</p>
${h.miniPosition('131111')}
<h2>By city: where the median moves</h2>
<p>The BLS publishes the same occupation by metro area. Among the seven large metros we track, the median runs from ${K.usd(metros[metros.length - 1].median)} to ${K.usd(metros[0].median)}:</p>
${h.table(['Metro area', 'Median, management analysts'], metros.map((m) => [m.area, K.usd(m.median)]), `Median annual wage of management analysts by metro area, ${K.P.bls.period} (BLS OEWS).`, ['l', 'r'])}
<p>${metros[0].area} leads; ${metros[1].area} and ${metros[2].area} follow. ${metros.every((m) => m.median > bls.median) ? `Every metro in the table sits above the national median of ${K.usd(bls.median)}, because the large consulting offices are in big cities and the national figure includes smaller places.` : `Not every metro sits above the national median of ${K.usd(bls.median)}.`} For an MBA graduate the city matters less at the large firms, which tend to pay one base across their American offices, and more at regional firms that pay at local rates.</p>
<h2>The MBA figure: what schools report for consulting</h2>
<p>The other series comes from the schools' employment reports, which give a median or average base salary for graduates hired in consulting. ${mode[1]} of the ${us.length} American schools that publish one give ${K.usd(mode[0])}, ${second[1]} give ${K.usd(second[0])}, and the rest are scattered below. The concentration on one number is the large strategy firms' standard offer showing through: when most of a school's consulting hires join them, the median is their base.</p>
${h.table(['School', 'Share in consulting', 'Consulting salary', 'In US dollars'], rows.map((x) => [h.sc(x.slug), x.pct === null ? 'not published' : K.p(x.pct), x.local, K.usd(x.usd)]), `Consulting salary reported by each school for its last class, school currency and US dollars at the ECB rate of ${K.day(K.FX_DATE)}. Most are medians of base salary; a few schools publish averages.`, ['l', 'r', 'r', 'r'])}
<p>Outside the United States, the figures drop and the currency matters. ${h.sc('insead')} reports ${insead.local} for consulting, ${h.sc('lbs')} ${lbs.local}, and ${nonUs.length} schools outside the United States publish a consulting figure at all. Those salaries pay graduates working across Europe, the Middle East and Asia, at local scales. Converting them at the day's rate, as the table does, makes them comparable but hides the cost of living and tax of each city.</p>
<h2>What the base salary leaves out</h2>
<p>Consulting pay has three parts: the base, a signing bonus paid on joining, and a performance bonus paid each year. School reports give the base and sometimes a school-wide signing bonus, rarely a consulting one, and never the performance bonus, which arrives after graduation. That is why the figures here are lower than the "total compensation" numbers found on salary websites, which we do not use because they cannot be checked. Pay then rises with each promotion. The pages on ${h.a('consulting-mckinsey-salary', 'McKinsey')}, ${h.a('consulting-bcg-salary', 'BCG')} and ${h.a('consulting-bain-salary', 'Bain')} explain what is known about each firm and where the figure stops.</p>
<p>The calculator above places any salary against the BLS distribution for management analysts and the other occupations an MBA graduate moves into, nationally and by metro. To see what a school's consulting salary is worth against its full cost, use the ${h.a('best-mba-consulting', 'consulting ranking')}, which adds the payback and the ten-year value for a person earning ${K.ref()} before the degree.</p>`,
  tool: 'bls',
  toolArgs: { mode: '131111' },
  related: ['consulting', 'consulting-mbb', 'consulting-big-4-consulting', 'best-mba-consulting', 'mba-salary'],
  sources: ['bls_oews', 'bls_api', 'bls_ooh_ma', 'ecb_fx', 'mbacsea'],
  schoolSources: ['insead', 'lbs'],
});
