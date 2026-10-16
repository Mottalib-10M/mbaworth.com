import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const R = K.ranking('am');
const top = R.ranked;
const small = R.unranked.filter((u) => u.why.startsWith('under'));
const seg = (slug: string) => K.s(slug).emp.segments.find((x) => x.key === 'am')!;
const fn = (slug: string, re: RegExp) => K.s(slug).emp.functions.find((f) => re.test(f.label))!;
const st = fn('stanford', /Investment \/ Portfolio/);
const wh = fn('wharton', /Investment Management/);
const bo = fn('chicago-booth', /Investment Management/);
const co = fn('columbia', /^Investment Management/);
const tx = fn('texas-mccombs', /^Asset Management/);
const gt = fn('georgetown-mcdonough', /Investment Management/);
const fa = K.P.bls.occupations['132051'];
const oxRank = K.rank('oxford-said', 'am');
const amMax = Math.max(K.shareRaw('oxford-said', 'am') ?? 0, ...top.map((r) => r.share));

export default definePage({
  id: 'finance-asset-management',
  group: 'finance',
  order: 4,
  slug: 'finance/asset-management',
  nav: 'Asset management after an MBA',
  card: 'Portfolio, research and investment roles at funds: the schools that publish them, the medians they report and what BLS analysts earn.',
  title: 'Asset Management After an MBA 2026: Research and Pay',
  description: `Asset management after an MBA in 2026: research seats, the schools placing up to ${K.p(amMax)} of a class there, their pay and the ${K.usd(fa.median)} BLS analyst median.`,
  h1: 'Asset management after an MBA: research seats and portfolio roles',
  intro: `Oxford places ${K.share('oxford-said', 'am')} of its class in asset management, Stanford ${K.share('stanford', 'am')}; at most American schools the share is closer to one graduate in twenty.`,
  resume: `Asset management, the industry of mutual funds, pension managers, hedge funds and endowments, hires MBA graduates mostly as investment analysts who research companies or sectors and recommend positions to portfolio managers. It takes a modest share of most classes: ${K.s('stanford').short} reported ${K.share('stanford', 'am')} of its class of 2025 in the segment at a ${K.segSalary('stanford', 'am')} median base, Columbia ${K.share('columbia', 'am')} and Wharton ${K.share('wharton', 'am')} at ${K.segSalary('wharton', 'am')}, Booth ${K.share('chicago-booth', 'am')} at ${K.segSalary('chicago-booth', 'am')}. Oxford, with a one-year program and a London-heavy class, puts ${K.share('oxford-said', 'am')} of its graduates in asset management but gives no salary for them. Across the whole United States economy, the BLS counted ${K.num(fa.employment)} financial and investment analysts in ${K.P.bls.period}, at a median wage of ${K.usd(fa.median)} and a top quarter above ${K.usd(fa.p75)}. A post-MBA research seat at a large fund pays well above that median at the start, and the spread widens later with performance bonuses that no report records.`,
  faqs: [
    { q: 'What does an asset management analyst do after an MBA?', a: 'The usual first seat is investment analyst or research associate: covering a sector, building models of the companies in it, meeting management teams and writing recommendations for the portfolio managers who decide. Some graduates join as associates on multi-asset or client portfolio teams instead. A move to portfolio manager comes later and depends on the track record of the ideas.' },
    { q: 'Which MBA programs send the most graduates into asset management?', a: `Among the schools that split finance into segments, Oxford reports ${K.share('oxford-said', 'am')}, Stanford ${K.share('stanford', 'am')}, Columbia ${K.share('columbia', 'am')} and LBS ${K.share('lbs', 'am')}. ${small.length} schools publish a line under ${K.MODEL.minShare!.seg}% of the class and are not ranked. Many schools give no asset management line at all, so a missing figure does not mean nobody goes there.` },
    { q: 'How much do MBA graduates earn in asset management?', a: `The medians reported by American schools for the segment run from ${K.segSalary('yale-som', 'am')} at Yale to ${K.segSalary('stanford', 'am')} at Stanford in the class of 2025. Base salary is a smaller part of total pay than in most industries, because funds pay annual bonuses tied to performance. No employment report includes those bonuses, so every figure here is a floor.` },
    { q: 'What do financial and investment analysts earn according to the BLS?', a: `In ${K.P.bls.period}, the BLS reported a median wage of ${K.usd(fa.median)} for financial and investment analysts, with the middle half between ${K.usd(fa.p25)} and ${K.usd(fa.p75)}, across ${K.num(fa.employment)} jobs. The occupation includes analysts at banks, insurers and companies of every size, so it sits below post-MBA research pay at large funds.` },
  ],
  body: (h) => `<h2>Research first, portfolio later</h2>
<p>An asset manager invests other people's money, from pension funds and insurers to individual savers, in listed shares, bonds and other assets. The MBA graduate usually starts on the research side. An equity analyst covers a sector of perhaps twenty or thirty companies, builds a model of each, meets their management and writes the case for buying or selling. A credit analyst does the same for bonds. The portfolio manager takes the decision and answers for the fund's return. The step from one seat to the other is not a promotion by seniority: it follows a record of recommendations that made money, which can take years and does not happen for everyone.</p>
<p>Hedge funds, endowments and family offices hire through the same pattern, often in smaller numbers and outside the campus calendar. That is one reason asset management shares are modest even at the schools where finance dominates: a fund that adds one analyst a year may not post the job on campus at all.</p>
${h.rankTable('am', 11)}
<h2>Where the industry table and the job table disagree</h2>
<p>Schools count asset management twice, and the two counts measure different things. The industry segment counts graduates hired by investment firms, whatever their job; the function line counts graduates doing investment work, whoever employs them. Stanford's function table reports ${K.p(st.pct!)} in investment and portfolio management roles at ${K.money(st.salary!, 'USD')}, Wharton ${K.p(wh.pct!)} at ${K.money(wh.salary!, 'USD')}, Booth ${K.p(bo.pct!)} in investment management and research at ${K.money(bo.salary!, 'USD')} and Columbia ${K.p(co.pct!)} at ${K.money(co.salary!, 'USD')}. Some schools publish only the function: McCombs reports ${K.p(tx.pct!)} of its class in asset management roles at ${K.money(tx.salary!, 'USD')} and Georgetown ${K.p(gt.pct!)} in investment management at ${K.money(gt.salary!, 'USD')}, but neither gives an asset management industry line, so neither can enter our segment ranking.</p>
<p>Oxford shows the opposite gap. Its industry table counts ${K.share('oxford-said', 'am')} of the class in asset management, the highest share we read, but its report gives no salary for the segment, and the school-wide figure it publishes is an average, ${K.salary('oxford-said')}, not a median. ${oxRank ? `The ranking estimates its asset management salary from that average (method, section 8), which places Oxford number ${oxRank.rank} of ${oxRank.of}; a one-year program paid in pounds converts into fewer dollars, so its estimated ten-year value for the reference person is ${K.usd(K.roiEst('oxford-said', 'am')?.npv ?? 0)}.` : 'Without a salary for the segment, Oxford is listed apart from the ranking, even though it sends more of its class to asset managers than any ranked school.'}</p>
${h.miniGoal('chicago-booth')}
<h2>What the BLS says about investment analysts</h2>
<p>The Bureau of Labor Statistics groups fund analysts with every other analyst who studies investments: at banks, insurers, pension plans and the finance departments of ordinary companies. In ${K.P.bls.period}, that occupation counted ${K.num(fa.employment)} jobs with a median wage of ${K.usd(fa.median)}, a bottom quarter under ${K.usd(fa.p25)} and a top quarter above ${K.usd(fa.p75)}. Post-MBA research seats at large funds start above the top quarter, which tells you two things: the reports describe a narrow part of the occupation, and an analyst job found outside campus recruiting can pay much less. The calculator at the top of the page places any salary you type in that distribution.</p>
${h.miniPosition('132051')}
<h2>Is the MBA the usual entry?</h2>
<p>Less than in banking. Many analysts join funds straight from college or from sell-side research, so the degree is one entry among several. The MBA works best as a reset for someone coming from another field who needs the summer internship of a two-year program to get a first research seat, or for someone aiming at the client and product side of asset management, where general management skills count more. Compare the cost of that reset with the ${h.a('finance', 'other finance paths')}, and check the school's function table before its industry table: in this segment, the job line is often the more informative of the two. The ${h.a('best-mba-finance', 'finance ranking')} gives the wider picture.</p>`,
  tool: 'bls',
  toolArgs: { mode: '132051' },
  related: ['finance', 'finance-private-equity', 'best-mba-finance', 'school:oxford-said', 'school:chicago-booth', 'school:stanford'],
  sources: ['bls_oews', 'bls_api', 'mbacsea'],
  schoolSources: ['stanford', 'wharton', 'chicago-booth', 'columbia', 'oxford-said', 'texas-mccombs', 'georgetown-mcdonough'],
});
