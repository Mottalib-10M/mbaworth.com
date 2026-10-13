import { definePage } from '../../lib/page-types';
import { KIT as K, type RankRow } from '../../lib/kit';

const G = 'ib';
const R = K.ranking(G);
const T = R.ranked;
const [a, b, c] = T;
const sal = (x: RankRow) => (x.salary === null ? 'no salary published' : `${K.usd(x.salary)}${x.fallback ? ' school-wide' : ''}`);
const fb = T.filter((x) => x.fallback);
const own = T.filter((x) => x.salary !== null && !x.fallback);
const tally = new Map<number, number>();
for (const x of own) tally.set(x.salary!, (tally.get(x.salary!) ?? 0) + 1);
const [modal, modalN] = [...tally.entries()].sort((x, y) => y[1] - x[1])[0] ?? [0, 0];
const byShare = [...T].sort((x, y) => y.share - x.share);
const deep = byShare[0];
const heads = [...T].filter((x) => x.placed !== null).sort((x, y) => y.placed! - x.placed!)[0];
const noSal = R.unranked.filter((u) => u.why.startsWith('no salary') && u.share !== null).sort((x, y) => y.share! - x.share!);
const noLiv = R.unranked.filter((u) => u.why === 'no living budget published' && u.share !== null);
const thin = R.unranked.filter((u) => u.why.startsWith('under'));
const min = K.MODEL.minShare!.seg;
const unsplit = K.schools.filter((s) => K.shareRaw(s.slug, 'finance') !== null && K.shareRaw(s.slug, 'ib') === null).length;
const nyc = T.filter((x) => K.s(x.slug).city === 'New York');
const nycAvg = nyc.length ? nyc.reduce((s, x) => s + x.share, 0) / nyc.length : null;
const restAvg = T.length > nyc.length ? T.filter((x) => K.s(x.slug).city !== 'New York').reduce((s, x) => s + x.share, 0) / (T.length - nyc.length) : null;
const ownTop = T.find((x) => !x.fallback);

export default definePage({
  id: 'best-mba-investment-banking',
  group: 'best',
  order: 3,
  slug: 'best-mba-investment-banking',
  nav: 'Best MBA for investment banking',
  card: 'Schools ranked on the share of the class hired by investment banks, banking pay and payback.',
  title: 'MBA for Investment Banking 2026: Schools Ranked on Placement',
  description: `MBA for investment banking in 2026: share of each class hired by banks, associate salary reported and payback, for ${T.length} schools, from their own reports.`,
  h1: 'Best MBA for investment banking in 2026',
  intro: `${a.short} leads our investment banking ranking today, with ${K.p(a.share)} of its class hired by banks and a salary of ${sal(a)}.`,
  resume: `Investment banking is a narrow line inside the finance section of an employment report, and only ${T.length} schools publish it in a form we can rank. Today ${a.short} comes first, with ${K.p(a.share)} of its class in investment banking and a salary of ${sal(a)}, followed by ${b.short} (${K.p(b.share)}, ${sal(b)}) and ${c.short} (${K.p(c.share)}, ${sal(c)}). The largest proportion belongs to ${deep.short}, at ${K.p(deep.share)}. ${modalN > 1 ? `${modalN} schools report the same banking base of ${K.usd(modal)}, so cost and share weigh more than pay.` : ''} ${fb.length ? `${fb.length} ranked schools give no banking salary and are scored on their school-wide figure, marked with an asterisk.` : ''} The ten-year value assumes a reference person earning ${K.ref()} before the MBA; type your own salary in the finder above and the ${T.length} schools are ranked again. Schools that report banking only inside a single finance line, or that publish no salary for it, are listed below the ranking with the reason, never scored on a guess.`,
  faqs: [
    { q: 'Which school sends the largest share of its MBA class into investment banking?', a: `Among the schools that publish the line, ${deep.short} does, with ${K.p(deep.share)} of the class. In headcount terms the leader can differ, since class sizes vary by a factor of five; the table converts each share into an approximate number of graduates. A school near a large banking center usually has both a high share and alumni at every bank.` },
    { q: 'Why does an MBA investment banking ranking use school-wide salaries?', a: `Because ${fb.length ? `${fb.length} of the ranked schools` : 'some schools'} report how many graduates joined banks without a salary for them. Rather than drop those schools, the score uses their school-wide median and marks it with an asterisk. That favors schools whose overall pay is high, so read the share column first when the asterisk appears next to a leader.` },
    { q: 'When do MBA students recruit for investment banking internships?', a: 'Earlier than for any other path. Banks hold networking events in the first weeks of the program, sometimes before classes begin, and summer associate interviews follow within the first months. The summer internship then works as an extended interview that ends in a full-time offer or not. Someone who decides on banking in the middle of the first year has usually missed that cycle.' },
    { q: 'Is the investment banking salary in MBA reports the whole pay?', a: 'No, it is the base. Associates at banks receive a year-end bonus that varies with the bank, the group and the year, and it is not in any employment report. The signing bonus appears as a separate median when the school gives it. The ten-year value on this site counts the base and the signing bonus only, so it understates a banker who stays.' },
    { q: 'How is investment banking different from finance in these MBA rankings?', a: `Finance is the whole industry line of a report: banking, private equity, asset management, corporate finance roles at banks and insurers. Investment banking is one segment of it, the advisory and capital markets work, ranked here on a minimum of ${min}% of the class instead of the ${K.MODEL.minShare!.ind}% used for an industry. A school can rank high on finance and low on banking.` },
  ],
  body: (h) => `<h2>A segment, not an industry</h2>
<p>Employment reports give finance as one industry and then, when the school chooses, break it into segments. Investment banking is the segment that covers mergers advice, equity and debt capital markets and, at some schools, sales and trading; the label on each school page is the school's own. Because it is a slice of a slice, shares are small and the bar for ranking is lower: ${min}% of the class instead of the ${K.MODEL.minShare!.ind}% used for whole industries. ${T.length} schools clear it with all the figures the score needs.</p>
${h.rankTable(G, 10)}
<p>${fb.length ? `An asterisk marks ${fb.length === 1 ? 'the school' : `the ${fb.length} schools`} that publish a banking share without a banking salary. Their school-wide salary stands in, which can lift a school with a small banking share: ${a.fallback ? `${a.short}, first today, is one of them, so its rank reflects its overall pay and cost more than its banking pipeline` : `read those rows with that in mind`}.${ownTop && ownTop.slug !== a.slug ? ` The highest-ranked school with its own banking salary is ${h.sc(ownTop.slug)}, at ${K.usd(ownTop.salary!)}.` : ''}` : 'Every ranked school publishes its own banking salary.'} ${heads && heads.slug !== deep.slug ? `${h.sc(deep.slug)} has the highest share and ${h.sc(heads.slug)} the most bankers by number, about ${K.num(heads.placed!)}.` : `${h.sc(deep.slug)} leads on share and on headcount.`}</p>
<h2>How a banking offer is paid</h2>
<p>Post-MBA bankers join as associates. Large banks set an associate base for each class year in each city, which is why ${modalN > 1 ? `${modalN} schools print the same banking salary, ${K.usd(modal)}` : 'banking salaries cluster'}. The base is the smaller part of the first full year for many associates: the year-end bonus depends on the bank's results, the group and the individual rating, and it is never published by schools. A good bonus year makes banking look far better than the table shows; a poor one narrows the gap with consulting, where the base is the larger part of pay.</p>
<p>The hours explain part of that premium, and attrition explains the rest. Many associates leave after two or three years for private equity, corporate development or a company finance team, so the ten-year value, which assumes steady salary growth, is a convention rather than a forecast.</p>
<h2>The calendar starts before classes do</h2>
<p>Banks fill most of their MBA associate seats through the summer program. Firms open networking events in the first weeks of the first year, students apply for the summer within a few months, and offers to return come at the end of the summer. Career switchers carry the burden: someone without a finance background needs the technical preparation done before arriving. One-year programs have no summer, so their banking hires come from direct recruiting and are fewer; very few of them appear in this table.</p>
${h.miniTwo(a.slug, b.slug)}
<h2>Distance to the trading floors</h2>
<p>${nyc.length && nycAvg !== null && restAvg !== null ? `The ${nyc.length === 1 ? 'school' : `${nyc.length} schools`} of the table located in New York, ${K.listOf(nyc.map((x) => h.sc(x.slug)))}, place on average ${K.p(Math.round(nycAvg * 10) / 10)} of the class in banking, against ${K.p(Math.round(restAvg * 10) / 10)} for the other ranked schools.` : 'Location shows in the shares: schools close to a large banking center tend to send more of their class to banks.'} Being a subway ride from the banks lets students take coffee meetings during term, attend evening events and hold part-time roles during the year, which matters in a recruiting process built on early networking. A school far from a financial center compensates with treks and alumni events, and students who already worked at a bank before the MBA lose less from the distance than career switchers do.</p>
<h2>Banking schools that are not ranked</h2>
<p>${noSal.length ? `${K.listOf(noSal.map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} report a banking line without a salary we can attach to it, so they are not scored. A share that equals the school's whole finance line suggests the school did not split the segment out; the school page shows the exact wording.` : 'Every school that reports a banking line today also gives a salary and a living budget, so none is held back for a missing figure.'} ${noLiv.length ? `${K.listOf(noLiv.map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} give no living budget, so the cost is incomplete.` : ''} ${thin.length ? `${K.listOf(thin.map((u) => h.sc(u.slug)))} place under ${min}% of the class in banking.` : ''} ${unsplit} schools in our data publish a finance share with no banking line at all; for them, the ${h.a('best-mba-finance', 'finance ranking')} is the relevant one.</p>
<h2>What the numbers leave out</h2>
<p>An international student targeting a bank in New York or London depends on the bank's willingness to sponsor a work visa, which the reports do not measure. Banking hiring is also cyclical: in a year with few deals, banks take smaller associate classes and a report shows a lower share for reasons outside the school. And a share counts the graduates who accepted banking offers, not those who wanted one. The ${h.a('finance-investment-banking', 'investment banking career page')} covers the job itself.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'ib' },
  related: ['finance-investment-banking', 'best-mba-finance', 'best-mba-private-equity', 'mba-finder', `school:${deep.slug}`],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: [a.slug, b.slug, c.slug],
});
