import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const G = 'z-uk';
const R = K.ranking(G);
const T = R.ranked;
const [a, b, c] = T;
const paid = T.filter((x) => K.segSalary(x.slug, G) !== null);
const london = T.filter((x) => K.s(x.slug).city === 'London');
const elsewhere = T.filter((x) => K.s(x.slug).city !== 'London');
const merged = K.schools.filter((s) => s.region === 'Europe' && s.emp.zones.some((z) => z.zone === 'Europe') && !s.emp.zones.some((z) => z.zone === 'UK'));
const visaFloor = K.schools.filter((s) => s.region === 'UK' && s.living?.basis === 'visa');
const heads = [...T].filter((x) => x.placed !== null).sort((x, y) => y.placed! - x.placed!)[0];
const small = R.unranked.filter((u) => u.share !== null);
const min = K.MODEL.minShare!.zone;
const oneYr = T.filter((x) => (K.s(x.slug).months ?? 99) <= 12);
const gv = 'https://www.gov.uk/graduate-visa';

export default definePage({
  id: 'best-mba-london',
  group: 'best',
  order: 9,
  slug: 'best-mba-london',
  nav: 'Best MBA for London and the UK',
  card: 'Schools ranked on the share of their class hired in the United Kingdom, London included.',
  title: 'MBA in the UK 2026: Schools Ranked on British Job Placement',
  description: `MBA in the UK and London for 2026: share of each class hired in the United Kingdom, UK salary where published and payback, for ${T.length} schools, from their reports.`,
  h1: 'Best MBA for working in London and the UK',
  intro: `${a.short} places ${K.p(a.share)} of its class in British jobs, the highest share among the ${T.length} schools that report a UK line.`,
  resume: `Employment reports count the United Kingdom as a whole, not London, so this ranking is about British jobs in general, most of which are in the capital for MBA graduates but not all. ${T.length} schools publish a separate UK line, and the share of the class hired there sets the order: ${a.short} leads today with ${K.p(a.share)}, followed by ${b.short} (${K.p(b.share)}) and ${c.short} (${K.p(c.share)}). ${paid.length ? `${K.listOf(paid.map((x) => x.short))} also publish what their UK hires earn, ${K.listOf(paid.map((x) => K.segSalary(x.slug, G)!))} respectively, a rare regional figure.` : 'None publishes a UK salary as a separate line.'} Salaries are in the currency each school reports. The return columns use a reference person earning ${K.ref()} before the MBA. Enter your own salary in the finder above to recompute payback and value; the order on share stays.`,
  faqs: [
    { q: 'Does an MBA in London ranking measure jobs in London?', a: `No report we read gives London as a separate line. Schools give the United Kingdom, and some give nothing finer than Europe. For MBA hires the UK figure is largely London, where banks, consulting offices and technology firms concentrate, but it also counts jobs in Manchester, Edinburgh, Cambridge and elsewhere. ${elsewhere.length ? `That matters most for ${K.listOf(elsewhere.map((x) => x.short))}, which sit outside the capital.` : ''}` },
    { q: 'How long can I stay in the UK after an MBA?', a: 'According to GOV.UK, a Graduate visa lasts two years if you apply on or before 31 December 2026 and 18 months if you apply on or after 1 January 2027, after an eligible course completed in the UK. Graduating classes of 2027 therefore get the shorter period. A longer stay usually requires a sponsored Skilled Worker visa, with salary conditions that the reports do not measure.' },
    { q: `Why are ${merged.length ? K.listOf(merged.slice(0, 3).map((x) => x.short)) : 'some European schools'} missing from the MBA in the UK ranking?`, a: `Because their reports give Europe as one block without a UK line, so we cannot know how many graduates went to London. ${merged.length} European schools in our data are in that case. They appear on the ranking for working in Europe. Some of their graduates surely take London jobs, but the reports do not separate them and we do not estimate a split.` },
    { q: 'Which UK MBA places the most graduates in British jobs by number?', a: `${heads ? `${heads.short}, with about ${K.num(heads.placed!)} graduates in the UK in its latest report` : 'The largest London school'}. A smaller school with a higher share may place fewer people in absolute terms, and for networking in a city the number of alumni hired each year counts. The "graduates, about" column of the table gives the figure for every ranked school.` },
  ],
  body: (h) => `<h2>Britain as a whole, not the capital</h2>
<p>Search for the best MBA in London and you are really asking which school feeds the British job market, because that is the unit employment reports use. None of the reports we read separates London from the rest of the country. For MBA graduates the UK line is mostly London jobs, in finance, consulting and technology, but a school in Manchester, Oxford, Cambridge or Coventry also places graduates in regional companies, and the share counts them the same way. Regions are ranked on placement only on this site, since few schools publish a salary by country; the UK is one of the rare cases where several do.</p>
${h.rankTable(G, 10)}
<p>${T.length} schools publish a UK line today${london.length ? `, ${london.length === 1 ? 'one of them' : `${london.length} of them`} in London (${K.listOf(london.map((x) => h.sc(x.slug)))})` : ''}. ${small.length ? `${K.listOf(small.map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} report a UK share under ${min}% and are not ranked.` : `No school with a UK line falls under the ${min}% threshold.`} The short list is a fact about reporting, not about the market: many schools elsewhere in Europe send graduates to London without counting them apart.</p>
<h2>The UK salary next to the school-wide one</h2>
<p>When a school publishes both, the British salary can be compared with the salary of the whole class. The difference shows whether staying in the UK pays more or less than the alternatives the class chose:</p>
${h.table(['School', 'Share in the UK', 'UK salary', 'Salary, whole class'], T.map((x) => [h.sc(x.slug), K.p(x.share), K.segSalary(x.slug, G) ?? 'not published', K.salary(x.slug) ?? 'not published']), 'Salaries in the currency the school reports, as printed in its employment report.', ['l', 'r', 'r', 'r'])}
<p>A UK salary above the class figure usually means the British hires went to banks and consulting firms in London while classmates took lower-paid jobs elsewhere; one below it means that the class's best-paid roles were abroad, often in North America or the Gulf. Salaries are averages at some UK schools and medians at others, and the school page says which.</p>
${h.miniGoal(a.slug)}
<h2>One year in Britain, or two</h2>
<p>${oneYr.length ? `${K.listOf(oneYr.map((x) => h.sc(x.slug)))} ${oneYr.length === 1 ? 'runs' : 'run'} a program of a year or less; ` : ''}${T.length - oneYr.length ? `${T.length - oneYr.length === 1 ? 'one school runs a longer one' : `${T.length - oneYr.length} schools run longer ones`}. ` : ''}The format changes how a student meets British employers. A one-year program leaves no room for a summer internship, so recruiting for a UK job starts in the first term and runs alongside the courses, and the share hired in the UK tends to rest on graduates who already lived and worked in Britain. A longer program with an internship gives a career switcher or a newcomer to the country a trial period with an employer, a common route into London banks and consulting offices. The salary given up is smaller in the short format, the time to find a sponsor is shorter: the ${h.a('best-mba-one-year', 'one-year ranking')} weighs that trade on cost.</p>
<h2>Costs that depend on the city</h2>
<p>For a living budget, UK Visas and Immigration sets a floor that students must show: ${K.money(K.P.ukvi.londonMonthly, 'GBP')} a month in London and ${K.money(K.P.ukvi.outsideMonthly, 'GBP')} elsewhere, as ${h.src('ukvi_money', 'GOV.UK')} states. ${visaFloor.length ? `When a British school publishes no budget of its own, we use that floor for each month of the program, which is the case for ${K.listOf(visaFloor.map((x) => h.sc(x.slug)))}, and the total cost is then a minimum.` : 'Every British school in our data publishes its own budget, which is generally above that floor.'} A school outside London has lower rent and the same access to London employers by train, which lowers the cost without lowering the UK share.</p>
<h2>Visas, sponsorship and the cycle</h2>
<p>An international graduate needs a right to work after the degree. According to ${h.ext(gv, 'GOV.UK')}, the Graduate visa lasts two years for applications made on or before 31 December 2026 and 18 months for applications from 1 January 2027, which shortens the time a 2027 graduate has to move to a sponsored visa. Employers that sponsor are mostly large firms; the reports do not say how many UK hires needed sponsorship or how many were British citizens. London hiring also follows the financial cycle more than other UK cities, so a weak year for deals lowers the UK share at the schools closest to the City. Compare the British schools side by side with the ${h.a('compare-mba', 'comparison tool')} and see the wider picture on the ${h.a('best-mba-europe', 'Europe ranking')}.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'z-uk' },
  related: ['best-mba-europe', 'compare-mba', 'mba-finder', 'best-mba-one-year', `school:${a.slug}`],
  sources: ['ukvi_money', 'mbacsea', 'ecb_fx'],
  extSources: [{ label: 'GOV.UK, Graduate visa: how long you can stay', url: gv }],
  schoolSources: [a.slug, b.slug, c.slug],
});
