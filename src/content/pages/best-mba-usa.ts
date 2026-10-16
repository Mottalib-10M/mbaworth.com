import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const G = 'z-us';
const R = K.ranking(G);
const T = R.ranked;
const [a, b, c] = T;
const home = T.filter((x) => K.s(x.slug).country === 'US');
const abroad = T.filter((x) => K.s(x.slug).country !== 'US');
const abroadPaid = abroad.filter((x) => K.segSalary(x.slug, G) !== null);
const n90 = home.filter((x) => x.share >= 90).length;
const lowHome = [...home].sort((x, y) => x.share - y.share)[0];
const heads = [...T].filter((x) => x.placed !== null).sort((x, y) => y.placed! - x.placed!)[0];
const ownUs = T.filter((x) => x.salary !== null && !x.fallback && !x.estimated);
const small = R.unranked.filter((u) => u.share !== null);
const avgIntl = (xs: typeof T) => { const v = xs.map((x) => K.s(x.slug).profile.intl).filter((y): y is number => typeof y === 'number'); return v.length ? Math.round((v.reduce((p, q) => p + q, 0) / v.length) * 10) / 10 : null; };
const intlTop = avgIntl(home.slice(0, 5));
const intlRest = avgIntl(home.slice(5));
const min = K.MODEL.minShare!.zone;
const fbMin = K.MODEL.zoneFallbackShare;

export default definePage({
  id: 'best-mba-usa',
  group: 'best',
  order: 7,
  slug: 'best-mba-usa',
  nav: 'Best MBA for working in the US',
  card: 'Schools ranked on the share of their class that took a job in the United States.',
  title: 'MBA in the USA 2026: Schools Ranked on US Job Placement',
  description: `MBA in the USA for 2026: the share of each class that took a job in the United States, headcount and payback, for ${T.length} schools, read in their own reports.`,
  h1: 'Best MBA for working in the United States',
  intro: `Ranked on the share of the class that took a job in the United States, ${a.short} comes first today with ${K.p(a.share)}.`,
  resume: `To work in the United States after an MBA, the first figure to read is the share of a school's class that took a job there. Our ranking uses that share alone, because almost no school publishes a salary by country of work: ${a.short} leads today with ${K.p(a.share)} of its class hired in the United States, followed by ${b.short} (${K.p(b.share)}) and ${c.short} (${K.p(c.share)}). ${n90} American schools keep ${K.p(90)} or more of their graduates in the country, so the order among them is close, and a school lower in the table can place far more people. Salary and payback are shown for the reference person earning ${K.ref()} before the MBA, with the school-wide salary standing in when no US figure exists. Enter your own salary in the finder above to see the return change; the order on share does not.`,
  faqs: [
    { q: 'Why is a famous school low in our MBA in the USA ranking?', a: `Because the ranking is the share of the class hired in the United States, not prestige. A school that sends graduates to London, Singapore or Sao Paulo loses points even if its domestic placement is excellent. ${lowHome ? `${lowHome.short} has the lowest US share among American schools in the table, ${K.p(lowHome.share)}.` : ''} For a candidate targeting American employers, a share above ninety percent at any school is a strong signal.` },
    { q: 'Can international students stay in the US after an MBA?', a: 'Often for a time. F-1 students can receive up to 12 months of Optional Practical Training after the degree, and graduates of programs in designated STEM fields can apply for a 24-month extension, according to USCIS. Longer stays usually require an employer-sponsored work visa such as the H-1B, which is capped each year. Employment reports do not say how many graduates needed sponsorship.' },
    { q: 'Do schools outside America appear in the MBA in the USA ranking?', a: `Yes, when they report a US line of at least ${min}% of the class. ${abroad.length ? `Today ${K.listOf(abroad.slice(0, 5).map((x) => x.short))}${abroad.length > 5 ? ' and others' : ''} do.` : 'None does today.'} Their shares are small, but some publish what their graduates earn in North America, a figure most American schools never separate, which makes them useful for someone planning to study abroad and return.` },
    { q: 'Which MBA places the most graduates in American jobs?', a: `In headcount, ${heads ? `${heads.short}, with about ${K.num(heads.placed!)} graduates` : 'the largest American schools'}, because a large class at ninety-plus percent outweighs a small class at a hundred. The share decides our order and the "graduates, about" column gives the number. For networking, the number counts: more alumni in each city and each employer is a practical advantage the share does not capture.` },
  ],
  body: (h) => `<h2>A ranking on one column, and why</h2>
<p>Very few employment reports say what graduates earn in each country. American schools publish their salaries for the whole class, which is overwhelmingly employed in the United States, and they split it by industry and job, not by country. A regional ranking that required a regional salary would cover a handful of schools. So for the United States, as for every region on this site, the order follows the share of the class placed there. Salary and payback stay in the table for information: when the United States takes at least ${fbMin}% of the class, the school-wide salary stands in for a US figure and carries an asterisk.</p>
${h.rankTable(G, 10)}
<p>${n90} American schools place ${K.p(90)} or more of their class at home, so the top of the table is a near tie decided by one or two points. Those points come from how many graduates leave for other countries, which says more about the international mix of the class than about the school's strength in America. ${intlTop !== null && intlRest !== null ? `${intlTop < intlRest ? 'The class profiles point the same way' : 'The class profiles only partly explain it'}: international students make up on average ${K.p(intlTop)} of the class at the five leading American schools, against ${K.p(intlRest)} at the other American schools in the table.` : 'The leaders tend to be schools whose students come mostly from the United States.'}</p>
<h2>Share or headcount: two different questions</h2>
<p>${heads ? `${h.sc(heads.slug)} places about ${K.num(heads.placed!)} graduates in American jobs, the largest number in the ranking, even though its share is not the highest.` : 'The largest classes place the most graduates in American jobs, whatever their share.'} A candidate asks two questions: will I find work in the country, and who will be there to help me? The share answers the first for the average graduate. The number of alumni hired each year answers the second, because it decides how many former students sit in each bank, firm or technology company you will contact.</p>
<p>The country is also not one market. Reports that split the United States by region usually show most graduates staying in the part of the country where the school sits, with New York, the Bay Area and a few large metropolitan areas drawing from everywhere. A school in Texas or the Southeast that keeps nearly its whole class in the country often keeps much of it in its own region, which is an advantage for someone who wants to live there and a limit for someone who wants the coasts.</p>
${h.miniGoal(a.slug)}
<h2>Schools abroad with an American line</h2>
<p>${abroad.length ? `${K.listOf(abroad.map((x) => `${h.sc(x.slug)} (${K.p(x.share)})`))} report enough graduates in the United States to enter the table.` : 'No school outside the United States reaches the threshold today.'} ${abroadPaid.length ? `${K.listOf(abroadPaid.map((x) => `${x.short} (${K.segSalary(x.slug, G)})`))} also ${abroadPaid.length === 1 ? 'publishes' : 'publish'} a North American salary, in the school's currency, a figure no American school separates.` : ''} ${ownUs.length ? '' : 'No school publishes a salary for the United States as a separate line.'} These programs suit someone who wants to study in Europe or Asia and keep the American market open, and their small shares are what the outcome looks like in practice: a minority of the class, usually people with a prior link to the United States.</p>
<p>${small.length ? `${K.listOf(small.map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} report a US line under ${min}% of the class and are listed but not ranked.` : `No school is held back for a share under ${min}%.`} A school can also report the country only in part, for instance a few American regions without the total; the school page shows the exact lines.</p>
<h2>What the share cannot tell an international student</h2>
<p>The figure that matters most to an international candidate is the share of international graduates who found work in the United States, and almost no report gives it. According to ${h.ext('https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students', 'USCIS')}, F-1 students can work up to 12 months after the degree on Optional Practical Training, and graduates of eligible STEM programs can apply for a 24-month extension; several schools have designated their MBA or a track of it as STEM, which the school page or the school itself confirms. Beyond that period, most employers must sponsor an ${h.ext('https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations', 'H-1B visa')}, which is subject to an annual cap. Large consulting firms, banks and technology companies are used to the process; many smaller employers are not. The hiring cycle matters too: in a slow year, firms hire fewer graduates who need sponsorship first.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'z-us' },
  related: ['mba-finder', 'best-mba-programs', 'best-mba-consulting', 'best-mba-tech', `school:${a.slug}`],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  extSources: [
    { label: 'USCIS, Optional Practical Training (OPT) for F-1 students', url: 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students' },
    { label: 'USCIS, H-1B specialty occupations', url: 'https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations' },
  ],
  schoolSources: [a.slug, b.slug, c.slug],
});
