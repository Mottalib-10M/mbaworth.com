import { definePage } from '../../lib/page-types';
import { KIT as K, type RankRow } from '../../lib/kit';

const G = 'tech';
const R = K.ranking(G);
const T = R.ranked;
const [a, b, c] = T;
const pay = (x: RankRow) => (x.salary === null ? 'no salary published' : `${K.usd(x.salary)}${x.fallback ? ' school-wide' : ''}`);
const WEST = ['Stanford', 'Berkeley', 'Seattle', 'Los Angeles'];
const west = T.filter((x) => WEST.includes(K.s(x.slug).city));
const westTop10 = T.slice(0, 10).filter((x) => WEST.includes(K.s(x.slug).city)).length;
const own = T.filter((x) => x.salary !== null && !x.fallback).map((x) => x.salary!).sort((x, y) => x - y);
const medTech = own.length ? own[Math.floor(own.length / 2)] : null;
const cons = K.ranking('consulting').ranked.filter((x) => x.salary !== null && !x.fallback).map((x) => x.salary!).sort((x, y) => x - y);
const medCons = cons.length ? cons[Math.floor(cons.length / 2)] : null;
const deep = [...T].sort((x, y) => y.share - x.share)[0];
const noSal = R.unranked.filter((u) => u.why.startsWith('no salary') && u.share !== null).sort((x, y) => y.share! - x.share!);
const noLiv = R.unranked.filter((u) => u.why === 'no living budget published' && u.share !== null).sort((x, y) => y.share! - x.share!);
const pm = K.top('f-product', 1)[0];
const CN: Record<string, string> = { IN: 'India', CN: 'China', ES: 'Spain', HK: 'Hong Kong', SG: 'Singapore', AU: 'Australia', GB: 'the United Kingdom', FR: 'France', KR: 'Korea', US: 'the United States' };
const homes = [...new Set([...noLiv, ...noSal].map((u) => CN[K.s(u.slug).country]).filter(Boolean))].slice(0, 3);
const farQ = T.filter((x) => !WEST.includes(K.s(x.slug).city) && x.share >= 25).length;
const fb = T.filter((x) => x.fallback);

export default definePage({
  id: 'best-mba-tech',
  group: 'best',
  order: 6,
  slug: 'best-mba-tech',
  nav: 'Best MBA for tech',
  card: 'Schools ranked on the share of their class hired by technology companies, tech pay and payback.',
  title: 'MBA for Tech 2026: Schools Ranked on Tech Hiring and Pay',
  description: `MBA for tech in 2026: share of each class hired by technology firms, the tech salary reported and the payback, for ${T.length} schools, read in their own reports.`,
  h1: 'Best MBA for a career in tech, 2026',
  intro: `${a.short} sends ${K.p(a.share)} of its class to technology companies at a reported ${pay(a)}, the strongest mix in our tech ranking today.`,
  resume: `For a move into technology, our ranking reads the share of each class that joined a technology company and the base salary the school reports for those hires. ${a.short} leads today with ${K.p(a.share)} of its graduates in tech and a salary of ${pay(a)}, followed by ${b.short} (${K.p(b.share)}, ${pay(b)}) and ${c.short} (${K.p(c.share)}, ${pay(c)}). ${deep.short} has the largest share of its class in the industry, ${K.p(deep.share)}. ${medTech && medCons ? `The middle tech base among ranked schools is ${K.usd(medTech)}, against ${K.usd(medCons)} for consulting, because tech employers pay a large part in stock that reports leave out.` : ''} The ten-year value is computed for a reference person earning ${K.ref()} before the MBA. Enter your current salary in the finder above to rank the ${T.length} schools again on your own figures.`,
  faqs: [
    { q: 'Why do MBA tech salaries look lower than consulting salaries?', a: `Because reports count base salary only. ${medTech && medCons ? `The middle tech base among ranked schools is ${K.usd(medTech)}, the middle consulting base ${K.usd(medCons)}.` : ''} Large technology employers pay a substantial share of compensation in restricted stock units that vest over several years, plus an annual bonus. Neither appears in an employment report, so total first-year pay in tech can be close to or above consulting even when the base is lower.` },
    { q: 'Does an MBA tech ranking favor schools on the West Coast?', a: `Partly. ${westTop10} of the ten leading schools in tech today are in California or Seattle, close to the employers. Distance matters less than in banking, though: technology firms recruit at schools across the country, and ${farQ} ranked schools away from the West Coast place a quarter or more of their class in the industry. Proximity helps most for start-ups, which rarely visit campuses.` },
    { q: 'Is product management the same as an MBA tech job in these rankings?', a: `No. Technology here is the employer's industry: a finance, marketing or operations role at a technology company counts in it. Product management is a job function, which can also be held at a bank or a retailer. ${pm ? `On the product management function, ${pm.short} leads our ranking today.` : ''} Our product manager page covers that function.` },
    { q: 'How stable are MBA hiring numbers in tech from year to year?', a: 'Less stable than in consulting. Technology firms hire MBA graduates closer to the start date, often without a fixed annual intake, and they cut hiring quickly when growth slows. A report written after a hiring freeze can show a tech share several points below the year before, at the same school. Look at two consecutive reports on the school page when both are available.' },
  ],
  body: (h) => `<h2>The employer's industry, not the job title</h2>
<p>A school counts a graduate in technology when the employer is a technology company: software, internet platforms, hardware, semiconductors and, at some schools, telecoms or fintech. The job can be product management, strategy, finance or marketing. That is a broader net than the phrase "tech MBA" suggests, and it explains why schools with a reputation for finance or consulting still report a sizable tech line. The table ranks the ${T.length} schools that publish the line with a salary and a cost.</p>
${h.rankTable(G, 10)}
<p>${fb.length ? `${fb.length} ranked ${fb.length === 1 ? 'school gives' : 'schools give'} no salary for technology hires; ${fb.length === 1 ? 'its' : 'their'} school-wide figure stands in and is marked with an asterisk, which flatters a school whose overall pay comes from consulting and banking.` : 'Every ranked school publishes its own technology salary.'} ${h.sc(deep.slug)} has the largest proportion of its class in the industry, ${K.p(deep.share)}.</p>
<h2>Base salary, stock and the gap in the reports</h2>
<p>Technology is where the reported figure understates pay the most. Large tech employers grant restricted stock units that vest over three or four years, and many add an annual bonus; schools report the base. ${medTech && medCons ? `Among ranked schools, the middle tech base is ${K.usd(medTech)}, while the middle consulting base is ${K.usd(medCons)}.` : ''} For a graduate who joins a large listed company, the stock grant can close that gap. For a graduate who joins a start-up, the base is often lower still and the equity may be worth nothing. The ten-year value counts the base and the signing bonus, so it ranks tech schools on the most conservative reading of pay.</p>
<h2>Proximity to the employers</h2>
<p>${west.length ? `${K.listOf(west.map((x) => h.sc(x.slug)))} ${west.length === 1 ? 'is' : 'are'} the ranked ${west.length === 1 ? 'school' : 'schools'} on the American West Coast, and ${westTop10} of ${west.length === 1 ? 'it sits' : 'them sit'} among the first ten.` : 'No ranked school sits on the West Coast today.'} A school near the large platforms makes it easy to work part time for a start-up during term, to meet alumni in person and to recruit for small companies that never travel. Schools elsewhere compensate with structured treks and alumni networks inside the large firms, which hire on many campuses. If your target is a large employer, distance matters less than the share; if it is a young company, distance matters more than the table can show. The headcount column helps here too: a school with a modest share of a large class can still put more graduates inside one platform than a small school with a high share.</p>
${h.miniTwo(a.slug, b.slug)}
<h2>Tech-heavy schools without a score</h2>
<p>${noLiv.length ? `Some of the highest tech shares belong to schools that publish no student living budget: ${K.listOf(noLiv.slice(0, 4).map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))}. Their graduates join technology firms in large numbers, often in their home market, but the cost of the degree cannot be completed without a living figure.` : ''} ${noSal.length ? `${K.listOf(noSal.slice(0, 4).map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} publish a tech share and no salary we can use.` : ''} Both groups are listed in the finder with their share, so a candidate targeting the technology industry ${homes.length ? `in ${K.listOf(homes)}` : 'in their home market'} can still see where the pipeline runs.</p>
<h2>What the numbers cannot predict</h2>
<p>Technology hiring is the least regular of the large MBA paths. Firms hire close to the start date, adjust intake to their growth plans and can freeze hiring in a quarter, so a tech share moves more from one report to the next than a consulting share does. Work visas weigh heavily for international graduates in the United States, where large firms sponsor and small ones often cannot. And a share does not say which jobs: the same percentage can be mostly product managers at one school and mostly finance roles at another. The ${h.a('tech', 'tech career page')} and the ${h.a('tech-product-manager', 'product manager page')} explain the roles, and the employer list on each school page shows the firms.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'tech' },
  related: ['tech', 'tech-product-manager', 'mba-finder', 'best-mba-consulting', `school:${a.slug}`],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: [a.slug, b.slug, c.slug],
});
