import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

// McKinsey in the employer lists the schools publish (our count, from each school's own report).
const RE = /mckinsey/i;
const lists = K.schools.filter((s) => s.emp.employers.length > 0);
const naming = lists.filter((s) => s.emp.employers.some((e) => RE.test(e.name)));
const hiresOf = (s: (typeof K.schools)[number]) => s.emp.employers.filter((e) => RE.test(e.name)).reduce((a, e) => a + (e.hires ?? 0), 0);
const counted = naming.filter((s) => hiresOf(s) > 0).map((s) => ({ s, n: hiresOf(s) })).sort((a, b) => b.n - a.n);
const totalHires = counted.reduce((a, x) => a + x.n, 0);
const consRow = (s: (typeof K.schools)[number]) => s.emp.industries.find((x) => x.key === 'consulting');
const paid = naming.filter((s) => consRow(s)?.usd).map((s) => ({ s, usd: consRow(s)!.usd!, local: K.money(consRow(s)!.salary!, consRow(s)!.cur) })).sort((a, b) => b.usd - a.usd);
const usPaid = paid.filter((x) => x.s.country === 'US');
const usMed = usPaid[Math.floor(usPaid.length / 2)];
const regionName = new Intl.DisplayNames(['en'], { type: 'region' });
const countries = [...new Set(naming.map((s) => s.country))].map((c) => (c === 'US' ? 'the United States' : c === 'GB' ? 'the United Kingdom' : regionName.of(c) ?? c));
const outside = naming.filter((s) => s.country !== 'US');
const bls = K.P.bls.occupations['131111'];
const first = counted[0];
const share = (x: { s: (typeof K.schools)[number]; n: number }) => (x.s.classSize ? (x.n / x.s.classSize) * 100 : null);
const topShare = [...counted].filter((x) => share(x) !== null).sort((a, b) => share(b)! - share(a)!)[0];

export default definePage({
  id: 'consulting-mckinsey-salary',
  group: 'consulting',
  order: 5,
  slug: 'consulting/mckinsey-salary',
  nav: 'McKinsey salary',
  card: 'What can be known about McKinsey pay after an MBA: the schools that name the firm, their consulting medians, and what is not public.',
  title: 'McKinsey Salary 2026: What MBA Reports Show and Do Not',
  description: `McKinsey salary in 2026: no public pay grid, but ${naming.length} MBA schools name the firm among employers and the US ones report consulting medians up to ${K.usd(paid[0].usd)}.`,
  h1: 'McKinsey salary after an MBA: the evidence we have',
  intro: `McKinsey publishes no salary grid; ${naming.length} of the ${lists.length} schools on this site that list employers name it, in ${countries.length} countries.`,
  resume: `There is no official McKinsey salary to quote. The firm publishes no pay grid, and the public files that sometimes reveal a firm's offers, the United States Department of Labor's visa wage disclosures, could not be downloaded when we wrote this page, so we give no McKinsey-specific figure. What can be checked is where McKinsey hires and what those schools report. McKinsey appears in the employer lists of ${naming.length} of the ${lists.length} schools on this site that publish one, more than any other consulting firm, in ${countries.length} countries. Hire counts come from ${counted.length} schools: ${first.s.short} reports ${first.n} McKinsey hires, and the schools that count add up to ${totalHires}. At the American schools naming the firm, the consulting median runs from ${K.usd(usPaid[usPaid.length - 1].usd)} to ${K.usd(usPaid[0].usd)}, with ${K.usd(usMed.usd)} in the middle. That is the best public proxy for a McKinsey MBA base salary, not the figure itself. The BLS median of ${K.usd(bls.median)} for all management analysts is the floor.`,
  faqs: [
    { q: 'Does McKinsey publish its salary for MBA hires?', a: `No. McKinsey publishes no pay grid for any level, and offer letters are private. The school reports are the closest public source: at the American schools that name McKinsey among their employers, the consulting median runs from ${K.usd(usPaid[usPaid.length - 1].usd)} to ${K.usd(usPaid[0].usd)}. Those medians mix McKinsey with other firms, so they approximate the base offer rather than prove it.` },
    { q: 'Which MBA school sends the most graduates to McKinsey?', a: `Among the schools that publish hire counts by employer, ${first.s.short} reports the most McKinsey hires, ${first.n} in its last class. ${counted[1] ? `${counted[1].s.short} follows with ${counted[1].n}.` : ''} Many schools, including some of the largest, list McKinsey without a count, so the ranking covers only schools that publish numbers.` },
    { q: 'Is McKinsey pay the same in Europe and Asia as in the United States?', a: `No. Offices outside the United States pay in local currency at local levels. The non-American schools that name McKinsey report consulting figures such as ${outside.filter((s) => consRow(s)?.salary).slice(0, 2).map((s) => `${K.money(consRow(s)!.salary!, consRow(s)!.cur)} at ${s.short}`).join(' and ')}, below American medians once converted. Those are school-wide consulting figures, not McKinsey offers.` },
    { q: 'How does a McKinsey salary compare with the BLS management analyst median?', a: `The BLS median for all management analysts was ${K.usd(bls.median)} in ${K.P.bls.period}, and three quarters earned under ${K.usd(bls.p75)}. The consulting medians of American schools naming McKinsey sit well above that, at ${K.usd(usMed.usd)} in the middle of their range. The BLS counts the whole profession; McKinsey hires MBA graduates at a senior entry level.` },
    { q: 'Why can we not use salary websites for McKinsey pay?', a: 'Figures on salary websites come from anonymous self-reports that cannot be checked, mix levels and years, and often add bonuses in different ways. This site writes only figures it can trace to an official document: a school report, a government statistic. When neither gives a McKinsey number, we say so rather than print one.' },
  ],
  body: (h) => `<h2>What is not public, and why we stop there</h2>
<p>Three sources could in principle give a McKinsey salary. The firm itself publishes no pay grid. Offer letters are private. The United States Department of Labor publishes the wages employers declare when they sponsor a foreign worker, and those files sometimes reveal a firm's offer for a job title; they could not be downloaded from our side when this page was written, so they are not used. The firm's own site, mckinsey.com, did not answer our requests either, which is why this page gives no facts about the firm's offices or headcount. Anything beyond that is self-reported on salary websites, which we do not quote.</p>
<p>What remains is indirect but checkable: the schools that name McKinsey as an employer, the number of hires some of them publish, and the consulting salary each reports. The approach answers a narrower question than "what does McKinsey pay": it says what the graduates of schools where McKinsey hires were paid in consulting, which is the figure an applicant can act on.</p>
<h2>The breadth of McKinsey recruiting</h2>
<p>McKinsey is the consulting firm named by the most schools on this site: ${naming.length} of the ${lists.length} schools that publish an employer list, in ${countries.length} countries (${K.listOf(countries)}). ${outside.length} of them are outside the United States, among them ${K.listOf(outside.slice(0, 5).map((s) => h.sc(s.slug)))}. No other consulting firm appears in as many lists, and the full count for every firm is on ${h.a('consulting-consulting-firms', 'consulting firms that hire MBAs')}.</p>
<p>A name in a list does not say how many people joined. Some schools list their top employers by hires, others alphabetically, others mix. Only the schools below publish a count, and the share of the class it represents is our division of the count by the class size the school reports.</p>
${h.table(['School', 'McKinsey hires', 'Share of class, about', 'Consulting salary'], counted.map((x) => [h.sc(x.s.slug), K.num(x.n), share(x) === null ? 'n/a' : K.p(Math.round(share(x)! * 10) / 10), consRow(x.s)?.salary ? K.money(consRow(x.s)!.salary!, consRow(x.s)!.cur) : 'not published']), 'McKinsey hires reported by each school for its last class, and the consulting salary it reports for all consulting hires.', ['l', 'r', 'r', 'r'])}
<p>The schools that publish counts add up to ${totalHires} McKinsey hires. ${topShare.s.short} has the highest ratio to its class, about ${K.p(Math.round(share(topShare)! * 10) / 10)}, which means roughly one graduate in ${Math.round(100 / share(topShare)!)} joined the firm. Those schools are all American; the European and Asian schools that name McKinsey do not publish hire counts.</p>
${h.miniGoal(first.s.slug)}
<h2>The consulting median as a proxy for the base</h2>
<p>At the ${usPaid.length} American schools that name McKinsey and publish a consulting salary, the figure runs from ${K.usd(usPaid[usPaid.length - 1].usd)} to ${K.usd(usPaid[0].usd)}. The middle of that range is ${K.usd(usMed.usd)}, and many schools give exactly the same number, which is what a standard base offer from the large strategy firms looks like in a median. The proxy is better at schools where consulting hires are concentrated at the large firms, and weaker where many graduates join specialist or Big 4 practices that pay less.</p>
<p>Outside the United States, the proxy is in local currency. ${outside.filter((s) => consRow(s)?.salary).map((s) => `${h.sc(s.slug)} reports ${K.money(consRow(s)!.salary!, consRow(s)!.cur)}`).slice(0, 4).join(', ')} for consulting hires. Converted at the ECB rate of ${K.day(K.FX_DATE)}, those are lower than American medians, and McKinsey's offices in those regions pay at local scales.</p>
<h2>The floor: what the profession pays</h2>
<p>The Bureau of Labor Statistics gives the national distribution for management analysts, the occupation that includes all consultants: a median of ${K.usd(bls.median)} in ${K.P.bls.period}, a first quartile of ${K.usd(bls.p25)} and a third of ${K.usd(bls.p75)}. A McKinsey consultant hired after an MBA starts above the third quartile on any proxy above. For someone weighing the firm against an MBA's cost, the ${h.a('consulting-how-to-become-a-consultant', 'routes into consulting')} and the ${h.a('best-mba-consulting', 'consulting ranking')} are the next steps; the ${h.a('consulting-mbb', 'MBB page')} compares the three large strategy firms on what the schools show.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'consulting' },
  related: ['consulting-mbb', 'consulting-bcg-salary', 'consulting-bain-salary', 'consulting-consulting-firms', 'consulting-consultant-salary'],
  sources: ['bls_oews', 'mbacsea', 'ecb_fx'],
  schoolSources: counted.map((x) => x.s.slug),
});
