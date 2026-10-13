import { definePage } from '../../lib/page-types';
import { KIT as K, type RankRow } from '../../lib/kit';

const G = 'finance';
const R = K.ranking(G);
const T = R.ranked;
const [a, b, c] = T;
const pay = (x: RankRow) => (x.salary === null ? 'no salary published' : `${K.usd(x.salary)}${x.fallback ? ' school-wide' : ''}`);
const seg = (slug: string, g: string) => K.share(slug, g) ?? 'not split out';
const lead5 = T.slice(0, 5);
const split = lead5.filter((x) => K.shareRaw(x.slug, 'ib') !== null || K.shareRaw(x.slug, 'pe') !== null || K.shareRaw(x.slug, 'am') !== null).length;
const widest = [...T].sort((x, y) => y.share - x.share)[0];
const noSal = R.unranked.filter((u) => u.why.startsWith('no salary') && u.share !== null).sort((x, y) => y.share! - x.share!);
const noLiv = R.unranked.filter((u) => u.why === 'no living budget published' && u.share !== null).sort((x, y) => y.share! - x.share!);
const cities = [...new Set([...noSal, ...noLiv].slice(0, 6).map((u) => K.s(u.slug).city))].slice(0, 3);
const fb = T.filter((x) => x.fallback);
const corp = K.top('f-corpfin', 1)[0];
const euro = T.find((x) => ['GB', 'FR', 'ES', 'DE', 'CH', 'NL', 'IT', 'IE', 'BE', 'PT'].includes(K.s(x.slug).country));

export default definePage({
  id: 'best-mba-finance',
  group: 'best',
  order: 5,
  slug: 'best-mba-finance',
  nav: 'Best MBA for finance',
  card: 'Schools ranked on the share of the class hired in the finance industry, all segments together.',
  title: 'MBA for Finance 2026: Schools Ranked on the Whole Industry',
  description: `MBA for finance in 2026: share of each class hired by banks, funds and asset managers together, finance salary and payback for ${T.length} schools, from their reports.`,
  h1: 'Best MBA for finance: banks, funds and asset managers together',
  intro: `${a.short} leads our 2026 finance ranking, with ${K.p(a.share)} of its class in the finance industry and a salary of ${pay(a)}.`,
  resume: `Finance, read as the whole industry line of an employment report, covers investment banks, private equity and venture funds, asset and wealth managers, hedge funds and insurers. On that broad line ${a.short} comes first today with ${K.p(a.share)} of its class in finance and a salary of ${pay(a)}, ahead of ${b.short} (${K.p(b.share)}, ${pay(b)}) and ${c.short} (${K.p(c.share)}, ${pay(c)}). ${widest.short} sends the largest proportion of its graduates into the industry, ${K.p(widest.share)}. Because the line mixes jobs paid very differently, the salary attached to it is an average of unlike things, and the narrower pages for banking and private equity often reorder the schools. Returns are computed for a reference person earning ${K.ref()} before the MBA; enter your own salary in the finder above to rank the ${T.length} schools again.`,
  faqs: [
    { q: 'What counts as finance in an MBA employment report?', a: 'The industry of the employer, not the job. A graduate hired by a bank, a fund, an asset manager or an insurer counts in finance whatever the role, including marketing or technology at a bank. A treasury or financial planning role at a manufacturer counts in that manufacturer\'s industry and appears under the corporate finance function instead. That is why finance shares and finance function shares differ.' },
    { q: 'Why is the MBA finance salary lower than the banking salary at some schools?', a: 'Because the finance line averages segments paid differently. Asset managers, insurers and commercial banks often pay a lower base than investment banks or private equity funds, and when a school reports one median for the whole industry, the mix pulls it down. A school sending many graduates to asset management can show a modest finance salary while its bankers earn the market rate.' },
    { q: 'Should I use the finance or the investment banking MBA ranking?', a: `Use the narrow one if you know your segment. The finance ranking suits a candidate open to several finance employers, or one targeting a school that does not split its finance line: ${split} of the five leading schools here publish segments, many others give one finance figure only. The banking and private equity pages rank on the segment lines alone.` },
    { q: 'Do European schools place well in our MBA finance ranking?', a: `${euro ? `The highest European school in the finance ranking today is ${euro.short}, at rank ${euro.rank}, with ${K.p(euro.share)} of its class in finance.` : 'No European school reaches the ranked list today.'} Salaries from London, Paris or Madrid convert to fewer dollars than New York pay, and several European schools publish a finance share without a finance salary, which keeps them out of the scored table.` },
    { q: 'Does the MBA finance ranking include fintech jobs?', a: 'Only when the school files them under finance. Some reports place fintech employers in financial services, others in technology, and a few have a separate line. We keep the school\'s classification and do not move graduates from one line to another, so a school with a strong fintech pipeline can look stronger on the technology page than here.' },
  ],
  body: (h) => `<h2>One industry line, several professions</h2>
<p>The finance line of a report counts employers, not jobs. It puts in the same box an analyst at a pension fund, an associate in a mergers team, a vice president at a buyout fund and a product manager at a bank. That makes it the broadest measure on this site and the least precise about pay. The ranking below scores the whole line; the ${h.a('best-mba-investment-banking', 'investment banking')} and ${h.a('best-mba-private-equity', 'private equity')} pages score the segments separately, with a lower threshold because their shares are smaller.</p>
${h.rankTable(G, 10)}
<p>${fb.length ? `${fb.length} ranked ${fb.length === 1 ? 'school gives' : 'schools give'} a finance share without a finance salary; the school-wide salary stands in and carries an asterisk.` : 'Every ranked school publishes its own finance salary.'} ${h.sc(widest.slug)} has the widest finance pipeline in proportion, ${K.p(widest.share)} of the class.</p>
<h2>What finance means at the leading schools</h2>
<p>The same finance share can hide very different careers. This breakdown shows, for the five leading schools, how much of the class each segment took when the school publishes it:</p>
${h.table(['School', 'Finance', 'Investment banking', 'Private equity', 'Asset management', 'Venture capital'], lead5.map((x) => [h.sc(x.slug), K.p(x.share), seg(x.slug, 'ib'), seg(x.slug, 'pe'), seg(x.slug, 'am'), seg(x.slug, 'vc')]), 'Share of the class by finance segment, as each school reports it. "Not split out": the school gives no figure for that segment.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>The segments rarely add up to the finance total: the remainder is corporate and commercial banking, insurance, hedge funds, research and other lines the school groups as it sees fit. A school whose finance share is mostly asset management is a different choice from one whose share is mostly banking, even at an identical total.</p>
${h.miniTwo(a.slug, b.slug)}
<h2>Pay by segment, and why the median hides it</h2>
<p>Within finance, base pay follows the segment. Buyout funds tend to pay the highest bases, then investment banks, then asset managers and insurers, and the bonus share of pay rises in the same order. A school reporting one finance median gives a blend of those levels weighted by its own mix. That is why two schools with the same finance share can show bases far apart, and why the median for the line can sit below the median of the whole class. The finance salary in the table is the right figure for the ten-year value only if you expect to land in the typical job of that school's finance graduates.</p>
<p>A finance job outside the finance industry is counted elsewhere. Treasury, planning and corporate development roles at companies appear in the corporate finance function${corp ? `, where ${h.sc(corp.slug)} leads our ranking today` : ''}.</p>
<h2>Finance schools that are not ranked</h2>
<p>${noSal.length ? `${K.listOf(noSal.slice(0, 5).map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} report a sizable finance share but no finance or school-wide salary we can use.` : 'Every school with a finance line also publishes a salary.'} ${noLiv.length ? `${K.listOf(noLiv.slice(0, 5).map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} publish pay but no living budget, so the total cost stays open.` : ''} ${cities.length ? `Several sit outside the United States (${K.listOf(cities)}), where reports more often give the share of a class without the pay attached to it. Their` : 'Their'} pages show the full report line.</p>
<p>Leaving them out of the score is not a judgment on their finance placement. A school that sends two graduates in five to finance employers in its own city is a strong finance school for someone who wants to work in that city, and its page shows the line in full; it simply cannot be given a payback without a salary and a cost.</p>
<h2>Limits of a finance ranking</h2>
<p>Finance hiring follows markets. A strong year for deals and fundraising lifts banking and private equity shares in the next report; a weak one moves graduates toward corporate roles. Work visas matter for international students in New York and London, and reports do not say how many finance hires needed sponsorship. Licensing rules for some roles, such as regulated advice, vary by country and are outside these figures. The ${h.a('finance', 'finance career page')} and the ${h.a('finance-asset-management', 'asset management page')} describe the jobs behind the line.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'finance' },
  related: ['finance', 'best-mba-investment-banking', 'best-mba-private-equity', 'finance-asset-management', 'mba-finder'],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: [a.slug, b.slug, c.slug],
});
