import { definePage } from '../../lib/page-types';
import { KIT as K, type RankRow } from '../../lib/kit';

const G = 'pe';
const R = K.ranking(G);
const T = R.ranked;
const [a, b, c] = T;
const pay = (x: RankRow) => (x.salary === null ? 'no salary published' : `${K.usd(x.salary)}${x.estimated ? ' est.' : x.fallback ? ' school-wide' : ''}`);
const withPlaced = T.filter((x) => x.placed !== null);
const total = withPlaced.reduce((s, x) => s + x.placed!, 0);
const heads = [...withPlaced].sort((x, y) => y.placed! - x.placed!)[0];
const fewest = [...withPlaced].sort((x, y) => x.placed! - y.placed!)[0];
const own = T.filter((x) => x.salary !== null && !x.fallback && !x.estimated).sort((x, y) => y.salary! - x.salary!);
const hi = own[0];
const lo = own[own.length - 1];
const thin = R.unranked.filter((u) => u.why.startsWith('under') && u.share !== null);
const noSal = R.unranked.filter((u) => u.why.startsWith('no salary') && u.share !== null);
const outsideUs = T.filter((x) => K.s(x.slug).country !== 'US');
const min = K.MODEL.minShare!.seg;

export default definePage({
  id: 'best-mba-private-equity',
  group: 'best',
  order: 4,
  slug: 'best-mba-private-equity',
  nav: 'Best MBA for private equity',
  card: 'The few schools that send a measurable part of their class into buyout and growth funds, ranked.',
  title: 'MBA for Private Equity 2026: The Schools Funds Hire From',
  description: `MBA for private equity in 2026: only ${T.length} schools place ${min}% or more of their class in funds. Share, salary reported, headcount and payback, from school reports.`,
  h1: 'Best MBA for private equity: a short list in 2026',
  intro: `Only ${T.length} schools report at least ${min}% of their class in private equity with the figures we need; ${a.short} leads with ${K.p(a.share)}.`,
  resume: `Private equity hires few MBA graduates, and the schools that publish the segment show it: only ${T.length} report at least ${min}% of their class in private equity together with a salary and a living budget. ${a.short} leads today with ${K.p(a.share)} of its class in the segment and a reported salary of ${pay(a)}, followed by ${b.short} (${K.p(b.share)}, ${pay(b)}) and ${c.short} (${K.p(c.share)}, ${pay(c)}). Added together, the ranked schools placed about ${K.num(total)} graduates in funds in the last report, ${heads ? `about ${K.num(heads.placed!)} of them from ${heads.short}` : ''}. The ten-year value is computed for a reference person earning ${K.ref()} before the MBA and counts the base salary only, never carried interest. Change the salary in the finder above to re-rank the schools on your own situation.`,
  faqs: [
    { q: 'How many MBA graduates go into private equity each year?', a: `Few. Added together, the ${T.length} schools ranked here placed about ${K.num(total)} graduates in private equity in their latest reports, out of classes that run to several thousand people. Most schools report a share under ${min}% or no private equity line at all. That scarcity is the main fact of this ranking: even at the leading schools, a fund job is the outcome of a minority.` },
    { q: 'Do private equity funds hire MBA students with no finance background?', a: 'Rarely for investment roles. Funds tend to hire people who already spent two or three years in investment banking or consulting before the MBA, and the school is where they move up a level rather than where they learn the trade. A career switcher has better odds in portfolio operations, growth equity or a fund that values sector experience, which the employment reports do not separate.' },
    { q: 'Does the private equity salary in MBA reports include carried interest?', a: `No. Schools report the base salary and, at most, a signing bonus. Carried interest is a share of the fund's profits paid years later if the fund performs, and annual bonuses vary by fund. The reported bases range from ${lo ? K.usd(lo.salary!) : 'lower figures'} to ${hi ? K.usd(hi.salary!) : 'higher ones'} among ranked schools with their own figure, a small part of what a long career in the industry can pay.` },
    { q: 'Why is a school with a tiny share in our MBA private equity ranking?', a: `Because the segment threshold is ${min}% of the class, against ${K.MODEL.minShare!.ind}% for an industry: at most schools private equity is a small line, and a higher bar would leave a list of three. A share of a few percent at a large school can still mean dozens of people. The headcount column helps: ${fewest ? `${fewest.short} places about ${K.num(fewest.placed!)}` : 'some schools place only a handful'}, which a single good or bad year can move.` },
  ],
  body: (h) => `<h2>A segment measured in dozens of people</h2>
<p>A private equity line in an employment report is usually a single digit percentage. Applied to class sizes, the ranked schools placed about ${K.num(total)} graduates in funds in their latest reports${heads ? `, with ${h.sc(heads.slug)} alone accounting for about ${K.num(heads.placed!)}` : ''}${fewest && heads && fewest.slug !== heads.slug ? ` and ${h.sc(fewest.slug)} for about ${K.num(fewest.placed!)}` : ''}. At those numbers, the share of one year depends on a few individual hires, and the order of schools below can move from one report to the next more than in any other ranking on this site. Read it as the list of schools where funds recruit at all, then as an order.</p>
${h.rankTable(G, 10)}
<p>Salaries vary more than in consulting or banking: among ranked schools with their own private equity figure, the reported base runs from ${lo ? K.usd(lo.salary!) : 'the low end'} to ${hi ? K.usd(hi.salary!) : 'the high end'}. Large buyout funds pay above banks; growth funds, smaller funds and funds outside the United States often pay less in base and more in deferred incentives. ${outsideUs.length ? `${K.listOf(outsideUs.map((x) => h.sc(x.slug)))} ${outsideUs.length === 1 ? 'is the only school' : 'are the only schools'} outside the United States in the table, with salaries converted at the ECB rate.` : 'All ranked schools are in the United States.'}</p>
<h2>Who funds hire, and when</h2>
<p>Private equity does not recruit like a bank. There is no large summer program filled on campus every winter. The large American funds have long run an accelerated process for associates through headhunters, often aimed at junior bankers before they even consider an MBA, and post-MBA hiring happens case by case, at the pace of each fund's needs. For MBA students the usual routes are a return to a fund they worked at before the degree, a post-MBA associate or vice president role at a mid-sized or growth fund, or a portfolio operations job. Prior deal experience counts more than the school; the school widens the network that hears about openings.</p>
<p>That is why the share of a class in private equity reflects the pre-MBA profile of the students as much as the program. A school that admits many former bankers sends more people to funds, whatever it teaches. Before choosing a program for private equity, look at the profile page of the class: the share of students from financial services says more about your future classmates' targets than any brochure.</p>
${h.miniTwo(a.slug, b.slug)}
<h2>Carry, bonus and the part no report shows</h2>
<p>The salary column is a base. A private equity professional is also paid an annual bonus and, from a certain level, carried interest: a share of the fund's gains above a hurdle, paid years later and only if the fund performs. None of this appears in a school report, and none of it is in our ten-year value, which counts the base and the signing bonus only. For someone who stays a decade, the model therefore understates the result; for someone who leaves after two years, it is closer to the truth.</p>
<h2>Schools that send graduates to funds but are not ranked</h2>
<p>${thin.length ? `${K.listOf(thin.map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} report a private equity line under ${min}% of the class, which we list but do not rank: at that size, one graduate more or less changes the share by a large fraction.` : `No school is excluded for a share under ${min}%.`} ${noSal.length ? `${K.listOf(noSal.map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} publish a share without a usable salary.` : ''} Many European and Asian schools do not split private equity out of finance at all; the ${h.a('best-mba-finance', 'finance ranking')} covers them on the broader line.</p>
<h2>What the table cannot settle</h2>
<p>Funds rarely sponsor work visas for junior hires in volume, and a report never says how many of its private equity graduates needed one. The cycle matters too: fundraising and deal volume decide how many associates funds take, and a slow year for exits shows up in the next report. Use the ranking to see where the industry recruits, then read the employer lists on each school page for the funds that hired. The ${h.a('finance-private-equity', 'private equity career page')} describes the roles.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'pe' },
  related: ['finance-private-equity', 'best-mba-investment-banking', 'best-mba-finance', 'mba-finder', `school:${a.slug}`],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: [a.slug, b.slug, c.slug],
});
