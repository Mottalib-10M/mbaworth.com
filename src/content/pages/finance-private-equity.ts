import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const R = K.ranking('pe');
const top = R.ranked;
const small = R.unranked.filter((u) => u.why.startsWith('under'));
const seg = (slug: string) => K.s(slug).emp.segments.find((x) => x.key === 'pe')!;
const fnPe = (slug: string) => K.s(slug).emp.functions.find((f) => f.key === 'investor' && /Private Equity/i.test(f.label))!;
const st = K.roi('stanford', 'pe')!;
const wh = K.roi('wharton', 'pe')!;
const lbsPe = seg('lbs');
const peBig = [...top].sort((a, b) => b.share - a.share);

export default definePage({
  id: 'finance-private-equity',
  group: 'finance',
  order: 3,
  slug: 'finance/private-equity',
  nav: 'Private equity after an MBA',
  card: 'Post-MBA associate roles at buyout funds, the few schools that place more than a handful of graduates there, and the payback at a high median.',
  title: 'Private Equity After an MBA 2026: Associate Jobs, Schools',
  description: `Private equity after an MBA in 2026: associate roles at buyout funds, schools placing ${K.p(peBig[peBig.length - 1].share)} to ${K.p(peBig[0].share)} of their class there, the median base pay and the payback.`,
  h1: 'Private equity after an MBA: a small door with a high median',
  intro: `Only ${top.length} schools place at least ${K.MODEL.minShare!.seg}% of their class in private equity and publish what is needed to rank them; ${K.s(top[0].slug).short} leads with ${K.p(top[0].share)}.`,
  resume: `Private equity hires few MBA graduates and pays them well. In the class of 2025, ${K.s('stanford').short} sent ${K.share('stanford', 'pe')} of its class to private equity at a ${K.segSalary('stanford', 'pe')} median base, Wharton ${K.share('wharton', 'pe')} at ${K.segSalary('wharton', 'pe')} and Harvard ${K.share('harvard', 'pe')}, without a salary for the segment. Below those three, shares drop quickly: Kellogg ${K.share('kellogg', 'pe')}, Booth ${K.share('chicago-booth', 'pe')}, and ${small.length} schools under ${K.MODEL.minShare!.seg}% of the class. The post-MBA job is an associate or senior associate seat at a buyout or growth fund, and most of those seats go to people who already did deal work before the degree, in banking or in consulting due diligence. For a person earning ${K.ref()} before the MBA, a private equity median of ${K.segSalary('stanford', 'pe')} repays the two years at Stanford in ${K.yrs(st.payback!)} and at Wharton in ${K.yrs(wh.payback!)}, before tax and without the carried interest that no report counts.`,
  faqs: [
    { q: 'What job does an MBA graduate get in private equity?', a: 'Usually an associate or senior associate seat at a buyout, growth or infrastructure fund. The work is finding companies to buy, building the investment case and its financing model, running due diligence with advisers and, after the deal, helping the companies in the portfolio. Seats are few, which is why even the largest finance schools place well under a fifth of their class in the segment.' },
    { q: 'Why do private equity funds prefer MBA candidates with banking experience?', a: `A fund hiring one or two associates a year has no training class, so it looks for people who can model a leveraged buyout and run a diligence process from the first week, skills learned in a bank's deal team or in consulting due-diligence work. The reports do not record what private equity hires did before the MBA, so this site cannot put a figure on it.` },
    { q: 'Which MBA has the highest private equity salary?', a: `Among schools that publish one, Stanford, Wharton and Kellogg report ${K.segSalary('stanford', 'pe')} as the median base for private equity. LBS reports an average of ${K.money(lbsPe.salary!, lbsPe.cur)}, which is a different statistic. Base pay is the smaller part of private equity compensation over time: carried interest and bonuses come later and no employment report includes them.` },
    { q: 'Is a private equity MBA worth it on the payback alone?', a: `For a person earning ${K.ref()} before the degree, the private equity median repays Stanford in ${K.yrs(st.payback!)} and Wharton in ${K.yrs(wh.payback!)}, faster than the school-wide median does. The catch is the share: with ${K.share('wharton', 'pe')} of Wharton's class hired there, a plan that requires a fund offer to pay back has a small base of past successes.` },
    { q: 'Do private equity shares in MBA reports include venture capital?', a: `It depends on the school. Wharton's job function line groups private equity and venture capital investors (${K.p(fnPe('wharton').pct!)}), while its industry table separates private equity (${K.share('wharton', 'pe')}) and venture capital (${K.share('wharton', 'vc')}). We rank on the industry segment and never add two lines that overlap.` },
  ],
  body: (h) => `<h2>What a post-MBA associate does at a fund</h2>
<p>A private equity fund raises money from pension funds and other institutions, buys companies, holds them for several years and sells them. The MBA hire joins as an associate or senior associate in a small investment team. The first task is screening: reading information memoranda, building a quick view of what a company is worth and what debt it can carry. If the deal moves forward, the associate runs the diligence work with accountants, lawyers and consultants, writes the investment committee memo and builds the financing model. After the purchase, the same person follows the company's numbers, prepares board meetings and works on add-on acquisitions. The job looks like banking from the buyer's side, with fewer deals and much more time on each.</p>
<h2>Why most seats go to people who already did deals</h2>
<p>A bank hires a class of associates and trains them together; a fund hires one or two people a year and expects them to be useful from the first week. That is the usual explanation for why these seats go to people who have already built leveraged buyout models or run diligence, which in practice means former investment banking analysts and consultants who worked on private equity due diligence. The employment reports say nothing about what graduates did before the MBA, so we cannot measure that share. What they show is consistent with it: private equity shares are highest at the schools whose classes include many former bankers and whose average student arrives with about five years of work experience (Stanford ${K.num(K.s('stanford').profile.exp!, 1)} years, Wharton ${K.num(K.s('wharton').profile.exp!, 1)}).</p>
<p>For a career switcher, the realistic routes are growth equity, smaller funds and the investment teams of family offices, or two or three years in banking or consulting after the MBA before a move to the buy side. The ${h.a('finance-investment-banking', 'investment banking page')} covers the first of those steps.</p>
${h.rankTable('pe', 10)}
<h2>Which schools place graduates in private equity</h2>
<p>Three schools are in a group of their own: ${K.listOf(peBig.slice(0, 3).map((r) => `${r.short} (${K.p(r.share)})`))}. Kellogg (${K.share('kellogg', 'pe')}) and Booth (${K.share('chicago-booth', 'pe')}) follow, and London Business School is the only school outside the United States in the ranking, with ${K.share('lbs', 'pe')} of its class at an average of ${K.money(lbsPe.salary!, lbsPe.cur)}. ${small.length} schools that publish a private equity line place under ${K.MODEL.minShare!.seg}% of their class there and are listed apart: ${K.listOf(small.map((u) => `${K.s(u.slug).short} (${K.p(u.share!)})`))}. At that size, a share describes a few individual searches rather than a recruiting channel.</p>
<p>The job function tables tell the same story with different numbers. Stanford's report counts ${K.p(fnPe('stanford').pct!)} of graduates in private equity roles at ${K.money(fnPe('stanford').salary!, 'USD')}, Columbia ${K.p(fnPe('columbia').pct!)} at ${K.money(fnPe('columbia').salary!, 'USD')}, against ${K.share('columbia', 'pe')} in its industry segment: some private equity professionals work for employers classified elsewhere, such as banks' merchant banking arms or asset managers.</p>
${h.miniTwo('stanford', 'wharton')}
<h2>The median, the carry and the payback</h2>
<p>Stanford, Wharton and Kellogg all report ${K.segSalary('stanford', 'pe')} as the median base for private equity, above the ${K.segSalary('wharton', 'ib')} of banking at the same schools. That base is the visible part of pay. Funds add an annual bonus and, for investment professionals, a share of the fund's profits (carried interest) that vests over years and depends on the fund's results. None of it is in an employment report, and none of it is in our calculator, which works on base salary plus the school's signing bonus.</p>
<p>On base pay alone, the private equity goal shortens the payback. For a person earning ${K.ref()} before the degree, Stanford's total cost of ${K.usd(st.total)} is repaid in ${K.yrs(st.payback!)} with the private equity median, and Wharton's ${K.usd(wh.total)} in ${K.yrs(wh.payback!)}. The calculator at the top is set on Stanford and private equity; change the school, or type your own salary, and the result moves. The higher your salary today, the less a fund offer adds, since the salary you give up grows and the post-MBA median does not.</p>
${h.miniPayback('stanford')}
<h2>Before applying with a private equity goal</h2>
<p>Read the private equity line of the school's report, then its function table and its employer list, and check how many graduates the share represents: ${K.share('wharton', 'pe')} of a class of ${K.num(K.s('wharton').classSize!)} is a recruiting channel, the same share of a class of a hundred is a dozen people. Then decide what the degree is worth if the fund offer does not come, because most of the class, even at the strongest schools, ends up elsewhere. The ${h.a('best-mba-private-equity', 'private equity ranking')} and the ${h.a('finance', 'finance overview')} help with both questions.</p>`,
  tool: 'roi',
  toolArgs: { school: 'stanford', goal: 'pe' },
  related: ['best-mba-private-equity', 'finance', 'finance-investment-banking', 'school:stanford', 'school:wharton', 'school:harvard'],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: ['stanford', 'wharton', 'harvard', 'kellogg', 'chicago-booth', 'columbia', 'lbs'],
});
