import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { schoolRoi, refProfile } from '../../lib/engine/goal';

const P0 = refProfile(K.MODEL);
const withB = (slug: string, b: number) => schoolRoi(K.c(slug), { ...P0, scholarship: b }, K.MODEL)!;
const sch = (slug: string) => K.s(slug).scholarship;
const hb = sch('harvard').v!;
const sb = sch('stanford').v!;
const yb = sch('yale-som').v!;
const mb = sch('minnesota-carlson').v!;
const rb = sch('rice-jones').v!;
const h0 = K.roi('harvard')!;
const h1 = withB('harvard', hb * 2);
const y0 = K.roi('yale-som')!;
const y1 = withB('yale-som', yb);
const m0 = K.roi('minnesota-carlson')!;
const m1 = withB('minnesota-carlson', mb * 2);
const withV = K.schools.filter((s) => s.scholarship.v !== null && s.scholarship.v > 0).length;
const pct = (x: number) => `${Math.round(x * 100)}%`;

export default definePage({
  id: 'mba-scholarships',
  group: 'guides',
  order: 5,
  slug: 'mba-scholarships',
  nav: 'MBA scholarships',
  card: 'How a scholarship shortens the payback, merit against need-based awards, and what schools actually publish about their awards.',
  title: 'MBA Scholarships 2026: Merit, Need and the Payback Effect',
  description: `MBA scholarships in 2026: how an award shortens the payback, merit versus need-based aid, and the award amounts that only a few schools actually publish online.`,
  h1: 'MBA scholarships: what an award changes, and what schools publish',
  intro: `Only ${withV} of the ${K.schools.length} schools we read publish an award amount; Harvard's need-based average is ${K.money(hb, 'USD')} a year.`,
  resume: `A scholarship lowers the cost of an MBA one for one, but its effect on the payback is smaller than its size suggests, because the largest line of the cost is usually the salary you give up. For a person earning ${K.ref()} before the degree, Harvard's full-time MBA costs ${K.usd(h0.total)} in total and repays in ${K.yrs(h0.payback!)}; with the school's average need-based award of ${K.money(hb, 'USD')} a year over two years, the total falls to ${K.usd(h1.total)} and the payback to ${K.yrs(h1.payback!)}. Awards come in two kinds. Need-based aid, the only kind at Harvard and Stanford, depends on your finances; merit awards, common at most other schools, depend on your profile and are used to compete for candidates. Few schools publish figures: ${withV} of ${K.schools.length} give an award amount. Minnesota's Carlson reports an average merit award of ${K.money(mb, 'USD')} a year and Rice an average of ${K.money(rb, 'USD')}. Enter your own offer in the calculator below to see the payback it gives.`,
  faqs: [
    { q: 'How much does an MBA scholarship shorten the payback period?', a: `Less than its size suggests. At Harvard, for a person earning ${K.ref()}, an award of ${K.usd(hb * 2)} over two years cuts the total cost from ${K.usd(h0.total)} to ${K.usd(h1.total)}, ${pct((h0.total - h1.total) / h0.total)} less, and the payback from ${K.yrs(h0.payback!)} to ${K.yrs(h1.payback!)}. The salary given up, which no scholarship covers, stays in the total.` },
    { q: 'What is the difference between merit and need-based MBA scholarships?', a: 'Need-based aid is set from your income, savings and debts, and does not depend on how strong your application is beyond admission. Merit awards are offered to candidates the school wants to attract, often automatically at admission, and their size reflects how much the school wants you rather than what you can pay. Harvard and Stanford give need-based aid only; most other schools on this site describe merit awards.' },
    { q: 'Which MBA programs publish an average scholarship amount?', a: `Few: ${withV} of the ${K.schools.length} schools we read give an amount, average or maximum. Harvard and Stanford publish average need-based awards of ${K.money(hb, 'USD')} and ${K.money(sb, 'USD')} a year, Minnesota's Carlson an average merit award of ${K.money(mb, 'USD')} a year, Rice an average of ${K.money(rb, 'USD')} without saying over what period. Most schools list award categories or ranges and no average, so an offer cannot be checked against one.` },
    { q: 'Do MBA scholarships cover living costs or only tuition?', a: 'Most awards described by the schools we read are tuition reductions, expressed as an amount or a percentage of tuition, so the living budget and the salary you give up remain yours to fund. Some named fellowships add a stipend. Check the letter: a percentage of tuition is worth more at a school with higher fees, and a renewable award may carry conditions for the second year.' },
    { q: 'Can veterans get extra MBA scholarship funding through the Yellow Ribbon program?', a: 'At some American schools, yes. MIT Sloan and Wharton both describe Yellow Ribbon awards on their financial aid pages, where the school contributes an amount that the Department of Veterans Affairs matches for eligible U.S. veterans. The amounts and eligibility are set by each school and the VA, so read the school\'s own page and the VA rules before counting on it.' },
  ],
  body: (h) => `<h2>Why a scholarship moves the payback less than you expect</h2>
<p>The total cost of an MBA on this site adds tuition, fees and the living budget to the salary you give up, then subtracts any scholarship and the summer internship pay. A scholarship reduces one line out of four. For a person earning ${K.ref()}, Harvard's two years cost ${K.usd(h0.total)}: ${K.usd(h0.direct)} in direct costs and ${K.usd(h0.forgone)} of salary not earned. The school's average award, ${K.money(hb, 'USD')} a year, brings the total to ${K.usd(h1.total)}, and the payback goes from ${K.yrs(h0.payback!)} to ${K.yrs(h1.payback!)} after graduation. It is real money, and it shortens the payback by ${K.yrs(h0.payback! - h1.payback!)}, because the salary line is untouched. The higher your current salary, the smaller the share of the cost a scholarship covers.</p>
<p>The calculator below runs the same arithmetic on Harvard with any amount you type, for the whole program.</p>
${h.miniScholarship('harvard')}
<h2>Need-based aid and merit awards</h2>
<p>Schools give scholarships for two different reasons. Need-based aid fills the gap between what the school costs and what the school thinks you can pay, judged on your income, savings and debts. Harvard and Stanford give need-based aid only: Harvard's financial aid page puts the average at ${K.money(hb, 'USD')} a year and says about half of its students receive an award; Stanford's gives about ${K.money(sb, 'USD')} a year for the class of 2026. Merit awards are offered to candidates a school wants to win from its competitors, often automatically at admission. Minnesota's Carlson says almost all of its class of 2024 received a merit award, at an average of ${K.money(mb, 'USD')} a year. HKU describes its awards as entirely merit-based, with automatic consideration. Many schools mix both kinds, plus named fellowships for women, specific regions, industries or test scores.</p>
<p>The difference matters when comparing offers. A need-based award follows your documents, so it moves with your finances, not with the school's interest in you. A merit award is closer to a price, set by the school to win a candidate it wants. Neither kind is common at every school, and none of the reports we read says how many admitted students received nothing.</p>
${h.miniScholarship('yale-som')}
<h2>What schools publish, and what they leave out</h2>
<p>Of the ${K.schools.length} schools on this site, ${withV} publish an award amount, most of them an average. Yale's page gives ${K.money(yb, 'USD')} without saying whether it is per year or for the program; for a person earning ${K.ref()}, counted once over the program it brings Yale's total from ${K.usd(y0.total)} to ${K.usd(y1.total)} and the payback from ${K.yrs(y0.payback!)} to ${K.yrs(y1.payback!)}. Rice reports an average of ${K.money(rb, 'USD')} and says most of its full-time students receive one, without the award period; it also publishes no student living budget, so we cannot compute its payback. Most other schools list categories (merit, leadership, diversity, region) or ranges as a share of tuition, with no average and no share of the class aided. INSEAD, for example, lists its categories without any amount; IMD gives the share of students who received a scholarship but no amount.</p>
<p>For a two-year program paid per year, an award of ${K.money(mb, 'USD')} a year is worth about twice that over the degree: at Carlson, that takes the total for the reference person from ${K.usd(m0.total)} to ${K.usd(m1.total)} and the payback from ${K.yrs(m0.payback!)} to ${K.yrs(m1.payback!)}. Read every offer letter for three details: whether the amount is annual or total, whether the second year is guaranteed, and whether it reduces tuition only.</p>
<h2>Veterans and the Yellow Ribbon program</h2>
<p>For eligible U.S. veterans, some American schools take part in the Yellow Ribbon program, in which the school's contribution toward tuition is matched by the Department of Veterans Affairs. MIT Sloan and Wharton both describe their Yellow Ribbon awards on their financial aid pages. Amounts and the number of places are set by each school, so read its page and the VA rules before entering the figure in the calculator as a scholarship.</p>
<h2>Using a scholarship in the calculators</h2>
<p>Every school page has the full calculator with a scholarship field: type the amount for the whole program, not per year. The ${h.a('mba-payback-calculator', 'payback calculator')} adds a loan, which a scholarship often replaces in part, and the ${h.a('mba-cost', 'cost page')} shows the lines a scholarship does not touch. Comparing two offers, one with an award and one without, is the case where the ${h.a('compare-mba', 'comparison tool')} helps most, since the school with the higher cost before the award may come out cheaper after it.</p>`,
  tool: 'roi',
  toolArgs: { school: 'yale-som' },
  related: ['mba-cost', 'mba-payback-calculator', 'compare-mba', 'school:harvard', 'school:yale-som', 'school:stanford'],
  sources: ['mbacsea', 'gmac', 'ecb_fx'],
  schoolSources: ['harvard', 'stanford', 'yale-som', 'minnesota-carlson', 'rice-jones', 'mit-sloan', 'wharton', 'hku'],
});
