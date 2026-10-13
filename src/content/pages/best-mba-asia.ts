import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const G = 'z-asia';
const R = K.ranking(G);
const T = R.ranked;
const [a, b, c] = T;
const ASIA = ['Asia', 'India'];
const based = T.filter((x) => ASIA.includes(K.s(x.slug).region));
const visitors = T.filter((x) => !ASIA.includes(K.s(x.slug).region));
const NAMES: Record<string, string> = { CN: 'mainland China', HK: 'Hong Kong', SG: 'Singapore', IN: 'India', KR: 'South Korea' };
const markets = [...new Set(based.map((x) => NAMES[K.s(x.slug).country]).filter(Boolean))];
const regionalPay = T.filter((x) => K.segSalary(x.slug, G) !== null);
const withPay = T.filter((x) => x.salary !== null);
const noPay = T.filter((x) => x.salary === null);
const lowUsd = [...withPay].filter((x) => ASIA.includes(K.s(x.slug).region)).sort((x, y) => x.salary! - y.salary!)[0];
const small = R.unranked.filter((u) => u.share !== null).sort((x, y) => y.share! - x.share!);
const usSmall = small.filter((u) => K.s(u.slug).region === 'US');
const usRanked = T.filter((x) => K.s(x.slug).region === 'US');
const topVisitor = visitors[0];
const min = K.MODEL.minShare!.zone;

export default definePage({
  id: 'best-mba-asia',
  group: 'best',
  order: 10,
  slug: 'best-mba-asia',
  nav: 'Best MBA for working in Asia',
  card: 'Schools ranked on the share of their class hired in Asia, from Shanghai and Hong Kong to Singapore and India.',
  title: 'MBA in Asia 2026: Schools Ranked on Asian Job Placement',
  description: `MBA in Asia for 2026: share of each class hired in Asia, graduates placed and the salary where published, for ${T.length} schools in Asia and beyond, from their reports.`,
  h1: 'Best MBA for working in Asia',
  intro: `${a.short} places ${K.p(a.share)} of its class in Asia, the highest share among the ${T.length} schools we can rank for the region.`,
  resume: `For a career in Asia, our ranking reads the share of each class that took a job in the region, and that share alone sets the order, because very few schools publish what graduates earn in Asia. ${a.short} leads today with ${K.p(a.share)} of its class hired in Asia, followed by ${b.short} (${K.p(b.share)}) and ${c.short} (${K.p(c.share)}). ${based.length} of the ${T.length} ranked schools are based in Asia${markets.length ? `, in ${K.listOf(markets)}` : ''}; ${topVisitor ? `the first school from elsewhere is ${topVisitor.short}, with ${K.p(topVisitor.share)}.` : 'no school from elsewhere qualifies.'} ${usRanked.length ? `${usRanked.length === 1 ? 'Only one American program' : `Only ${usRanked.length} American programs`}, ${K.listOf(usRanked.map((x) => x.short))}, ${usRanked.length === 1 ? 'reaches' : 'reach'} the ${min}% threshold.` : `American programs send under ${min}% of their class to Asia and are not ranked.`} Salary and payback, shown when they exist, are computed for a reference person earning ${K.ref()} before the MBA; enter your own salary in the finder above to recompute them.`,
  faqs: [
    { q: 'Why do Asian schools fill the top of the MBA in Asia ranking?', a: `Because their graduates stay. A school in Hong Kong, Shanghai, Singapore or India places nearly its whole class in the region, often in its home market, while the best-known Western programs send a small minority east. ${based.length} of the ${T.length} ranked schools are based in Asia. For a candidate who wants to work there, a local school's employer list is usually the stronger signal.` },
    { q: 'Why do MBA salaries in Asia look low in this ranking?', a: `Because they are converted to US dollars at the ECB market rate, which does not reflect what a salary buys locally. ${lowUsd ? `${lowUsd.short} reports ${K.salary(lowUsd.slug)}, which converts to ${K.usd(lowUsd.salary!)}.` : ''} Rent, food and services cost far less in many Asian cities than in New York or London. Compare a school's salary with the cost of living where you plan to work, not with American figures.` },
    { q: 'Is an MBA in Asia ranking about one job market?', a: `No, and that is its main limit. Asia here covers China, Hong Kong, Singapore, India, Japan, Korea and Southeast Asia, markets with different languages, visa rules and pay. A school's Asia share may be almost entirely its home country. If you target one city, open the school page and read the employer list, which shows where the graduates actually went.` },
    { q: 'Can a European school be a good MBA choice for Asia?', a: `Some are, by this measure. ${visitors.length ? `${K.listOf(visitors.slice(0, 4).map((x) => `${x.short} (${K.p(x.share)})`))} place enough of their class in Asia to be ranked.` : 'None reaches the threshold today.'} Schools with an Asian campus or many Asian students tend to send more graduates there. Their Asia line is a minority of the class, so the alumni base in a given city is thinner than a local school's.` },
  ],
  body: (h) => `<h2>Local schools, local careers</h2>
<p>Asian business schools place almost all of their graduates in Asia, and most of those in their own country or city. That is why the upper rows of the table are schools based in the region: ${based.length > 5 ? `${based.slice(0, 5).map((x) => h.sc(x.slug)).join(', ')} and others` : K.listOf(based.map((x) => h.sc(x.slug)))}. Their classes are drawn largely from the region, their employers are local conglomerates, banks and technology groups as well as international firms, and their alumni sit in the companies a graduate will approach. The ranking uses the share of the class placed in Asia alone: few schools give a salary by region, and the few salaries they give are not comparable across currencies.</p>
${h.rankTable(G, 10)}
<p>${noPay.length} of the ranked schools have no salary in the table, because they publish none, publish one in a form we cannot compare, or send less than half the class to Asia so that the school-wide salary cannot stand in. ${regionalPay.length ? `${K.listOf(regionalPay.map((x) => `${h.sc(x.slug)} (${K.segSalary(x.slug, G)})`))} publish a salary for their Asian hires specifically.` : ''}</p>
<h2>Western schools with an Asian line</h2>
<p>${visitors.length ? `${K.listOf(visitors.map((x) => `${h.sc(x.slug)} (${K.p(x.share)})`))} are the schools outside Asia that place at least ${min}% of their class there.` : `No school outside Asia places ${min}% of its class there today.`} Programs with a campus in the region, a large share of Asian students or a one-year format that draws mid-career professionals planning to go home tend to score highest in this group. ${usRanked.length ? `${K.listOf(usRanked.map((x) => h.sc(x.slug)))} ${usRanked.length === 1 ? 'is the only American school' : 'are the only American schools'} in the table.` : 'No American school qualifies.'} ${usSmall.length ? `Below the threshold, ${K.listOf(usSmall.slice(0, 4).map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} come closest.` : ''} An American MBA can still lead to Asia, mostly for graduates who return to their home country, but the reports show it as a small minority of each class.</p>
<h2>Currency is not purchasing power</h2>
<p>Salaries in rupees, yuan or Hong Kong dollars are converted to US dollars at the European Central Bank rate of the build. ${lowUsd ? `${h.sc(lowUsd.slug)} reports ${K.salary(lowUsd.slug)}, about ${K.usd(lowUsd.salary!)} at that rate.` : ''} Market rates do not equalize living standards: the same amount usually goes further in an Indian or Chinese city than in Singapore or Hong Kong, and further there than in New York. That is one more reason the Asia ranking ignores salary. The payback of a local program for a local candidate should be computed in local terms, with a current salary in the same currency; the converter below and the calculators of this site work for one person at a time.</p>
${h.miniFx()}
<h2>Schools that publish too little</h2>
<p>Several Asian schools publish a strong placement record without a salary or without a student living budget, which keeps them out of the cost and return rankings on other pages. Here they still rank, because the Asia share is all we need. ${small.length ? `${small.length} schools report an Asia line under ${min}% of the class and are listed apart; ${usSmall.length} of them are American.` : ''} The school pages show what each report contains and what it leaves out.</p>
<h2>What the share does not say</h2>
<p>An Asia line covers economies as different as China, India, Japan and Singapore. Work permits are national and depend on the employer, the salary and the nationality of the graduate; a Singapore school's share says nothing about a foreigner's chance in Shanghai. Hiring cycles differ too: local groups and international firms do not recruit on the same calendar, and a slow year in one economy lowers the share of the schools that depend on it. Use the table to find the schools that feed the region, then compare two of them with the ${h.a('compare-mba', 'comparison tool')} and read their employer lists.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'z-asia' },
  related: ['mba-finder', 'compare-mba', 'best-mba-middle-east', 'best-mba-one-year', `school:${a.slug}`],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: [a.slug, b.slug, c.slug],
});
