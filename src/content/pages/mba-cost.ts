import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const ref = K.MODEL.refSalary;
type Line = { slug: string; short: string; months: number; fees: number; living: number; visa: boolean; forgone: number; intern: number; total: number };
const lines: Line[] = K.schools
  .map((s) => {
    const c = K.c(s.slug);
    if (c.tuition === null || c.living === null || !c.months) return null;
    const forgone = Math.round((ref * c.months) / 12);
    const intern = c.twoYear && c.intern ? Math.round(c.intern * K.MODEL.internMonths) : 0;
    return { slug: s.slug, short: s.short, months: c.months, fees: c.tuition + c.fees, living: c.living, visa: c.livingBasis === 'visa', forgone, intern, total: c.tuition + c.fees + c.living + forgone - intern };
  })
  .filter((x): x is Line => x !== null)
  .sort((a, b) => a.total - b.total);
const cheap = lines[0];
const dear = lines[lines.length - 1];
const withTuition = K.schools.filter((s) => K.c(s.slug).tuition !== null);
const byFees = [...withTuition].sort((a, b) => K.c(a.slug).tuition! + K.c(a.slug).fees - (K.c(b.slug).tuition! + K.c(b.slug).fees));
const feeLow = byFees[0];
const feeHigh = byFees[byFees.length - 1];
const feesOf = (slug: string) => K.usd(K.c(slug).tuition! + K.c(slug).fees);
const noBudget = withTuition.filter((s) => s.living === null);
const visa = K.schools.filter((s) => s.living?.basis === 'visa');
const us = lines.filter((l) => K.s(l.slug).region === 'US').sort((a, b) => a.living - b.living);
const usLow = us[0];
const usHigh = us[us.length - 1];
const twoYr = lines.filter((l) => l.months >= 20);
const oneYr = lines.filter((l) => l.months <= 12);
const median = (xs: number[]) => { const v = [...xs].sort((a, b) => a - b); const m = Math.floor(v.length / 2); return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2; };
const twoMed = median(twoYr.map((l) => l.total));
const oneMed = median(oneYr.map((l) => l.total));
const forgoneShare = (l: Line) => Math.round((l.forgone / l.total) * 100);
const H = K.c('harvard');
const hLine = lines.find((l) => l.slug === 'harvard');
const P = K.P.ukvi;
const usFee = withTuition.filter((s) => s.region === 'US' && K.c(s.slug).twoYear).sort((a, b) => K.c(a.slug).tuition! + K.c(a.slug).fees - (K.c(b.slug).tuition! + K.c(b.slug).fees));
const usTop = K.c(usFee[usFee.length - 1].slug);
const usNear = usFee.filter((s) => usTop.tuition! + usTop.fees - (K.c(s.slug).tuition! + K.c(s.slug).fees) <= 20000).length;

export default definePage({
  id: 'mba-cost',
  group: 'tools',
  order: 3,
  slug: 'mba-cost',
  nav: 'MBA cost calculator',
  card: 'Tuition, fees, the living budget each school publishes and the salary you stop earning, added up for one person.',
  title: 'MBA Cost 2026: Tuition, Living Budget and Total by School',
  description: `MBA cost 2026 for ${lines.length} schools: tuition and fees, the school's own living budget, the salary you give up, and a total running from ${K.usd(cheap.total)} to ${K.usd(dear.total)}.`,
  h1: 'How much an MBA costs, school by school',
  intro: `Counting the salary given up by a ${K.ref()} earner, a full-time MBA costs from ${K.usd(cheap.total)} at ${cheap.short} to ${K.usd(dear.total)} at ${dear.short}.`,
  resume: `An MBA costs far more than its tuition. For the ${lines.length} schools that publish both tuition and a living budget, we add four lines: tuition, mandatory fees, the school's own estimate of living costs, and the salary you stop earning while you study, then subtract summer internship pay on two-year programs. For a person earning ${K.ref()} today, the total runs from ${K.usd(cheap.total)} at ${cheap.short} to ${K.usd(dear.total)} at ${dear.short}. Tuition and fees alone range from ${feesOf(feeLow.slug)} at ${feeLow.short} to ${feesOf(feeHigh.slug)} at ${feeHigh.short}. The middle two-year program costs ${K.usd(twoMed)} in total and the middle program of a year or less ${K.usd(oneMed)}, mostly because of the months of pay given up. ${noBudget.length} schools give no living budget, so their total stays blank rather than guessed; for British schools without one, we count the UK student visa minimum as a floor.`,
  faqs: [
    { q: 'How much does an MBA cost in total, salary given up included?', a: `For someone earning ${K.ref()} a year before the degree, between ${K.usd(cheap.total)} and ${K.usd(dear.total)} at the ${lines.length} schools that publish what the sum needs. The middle two-year program comes to ${K.usd(twoMed)}. Your own salary changes the figure most: each month away adds one month of pay.` },
    { q: 'Which MBA has the highest tuition in 2026?', a: `${feeHigh.name}, with ${feesOf(feeHigh.slug)} of tuition and mandatory fees for the whole program at the ECB rate of ${K.day(K.FX_DATE)}. The lowest among the schools we read is ${feeLow.short}, at ${feesOf(feeLow.slug)}. Tuition is quoted for the intake the school names, and most schools raise it each year.` },
    { q: 'What does an MBA cost of living budget include?', a: `The budgets we read cover rent, food, books and local transport for one student, sometimes health insurance too, and leave out flights home, a partner or children. In the United States the budgets we read run from ${K.usd(usLow.living)} at ${usLow.short} to ${K.usd(usHigh.living)} at ${usHigh.short} for the two years.` },
    { q: 'Why count the salary given up as part of the MBA cost?', a: `Because it is money you would have earned. For a ${K.ref()} earner, ${dear.months} months of study at ${dear.short} mean ${K.usd(dear.forgone)} not earned, about ${forgoneShare(dear)}% of the total. At ${cheap.short}, the salary given up is ${forgoneShare(cheap)}% of the total, more than tuition and living together.` },
    { q: 'How much money does the UK student visa require for an MBA?', a: `UK Visas and Immigration asks a student to show ${K.money(P.londonMonthly, 'GBP')} a month in London and ${K.money(P.outsideMonthly, 'GBP')} elsewhere, for up to ${P.maxMonths} months. When a British school publishes no budget, we count that monthly amount for every month of the program and call it a floor: ${K.listOf(visa.map((s) => s.short))} today.` },
  ],
  body: (h) => `<h2>The four lines of the bill</h2>
<p>Tuition is the line every school puts first. Among the two-year American programs, tuition and fees run from ${feesOf(usFee[0].slug)} at ${usFee[0].short} to ${feesOf(usFee[usFee.length - 1].slug)} at ${usFee[usFee.length - 1].short}, and ${usNear} of the ${usFee.length} sit within ${K.usd(20000)} of the dearest. Mandatory fees come next, and some schools bury large amounts there. ${hLine ? `Harvard, the default school of the calculator, adds ${K.usd(H.fees)} of fees to ${K.usd(H.tuition!)} of tuition, then budgets ${K.usd(H.living!)} for two years of living.` : ''} The third line is the student budget the school publishes for rent, food, health cover and books. The fourth, the salary you give up, rivals tuition for most applicants and is the one no brochure prints.</p>
<p>Every amount below is the school's own figure for the whole program, converted to US dollars at the European Central Bank rate of ${K.day(K.FX_DATE)}. Where a school quotes one year of a two-year program, we count it twice and say so on its page. Internship pay comes off two-year totals, at the school's median monthly figure for ${K.num(K.MODEL.internMonths, 1)} months.</p>
${h.table(['School', 'Months', 'Tuition and fees', 'Living budget', 'Salary given up', 'Internship back', 'Total'], lines.map((l) => [h.sc(l.slug), String(l.months), K.usd(l.fees), `${K.usd(l.living)}${l.visa ? '†' : ''}`, K.usd(l.forgone), l.intern ? `-${K.usd(l.intern)}` : '0', K.usd(l.total)]), `Total cost of the MBA for a person earning ${K.ref()} before the degree, cheapest first. † UK student visa minimum, a floor rather than a budget. US dollars at the ECB rate of ${K.day(K.FX_DATE)}.`, ['l', 'r', 'r', 'r', 'r', 'r', 'r'])}
<h2>Cheapest and dearest, and why the order is not the tuition order</h2>
<p>${cheap.short} comes first because its program is short and its fees low: ${K.usd(cheap.fees)} of tuition and fees, ${K.usd(cheap.living)} of living costs and ${K.usd(cheap.forgone)} of salary given up over ${cheap.months} months. ${dear.short} comes last at ${K.usd(dear.total)}, of which ${K.usd(dear.living)} is living costs alone. Between those ends, length decides more than reputation: a program of a year or less gives up about half the pay of a 21-month one, which is why the middle one-year total, ${K.usd(oneMed)}, sits well below the middle two-year total, ${K.usd(twoMed)}.</p>
<p>A cheap total is not a good deal by itself. Salaries after the program differ even more than costs, and the ${h.a('mba-roi', 'ROI ranking')} sets each total against the pay the school reports.</p>
${h.mini('forgone')}
<h2>Living budgets: the line that moves with the city</h2>
<p>Schools build their budgets for a single student sharing nothing, and they differ in what they put in. In the United States the two-year figures run from ${K.usd(usLow.living)} at ${usLow.short} to ${K.usd(usHigh.living)} at ${usHigh.short}, a gap that says as much about rents in each city as about the program. Some American schools put the university health plan inside the budget, which makes their figure look higher than a European one that leaves insurance to you. A partner, children, flights home and the months between the end of classes and the first salary are never inside.</p>
<p>${noBudget.length} schools publish tuition but no living budget, ${K.listOf(noBudget.slice(0, 6).map((s) => s.short))} among them. We do not fill the gap with a number from a cost-of-living website: the total stays blank and the calculator asks for your own figure.</p>
<h2>The UK visa floor</h2>
<p>When a British school gives no budget, we use the amount UK Visas and Immigration requires students to hold: ${K.money(P.londonMonthly, 'GBP')} a month in London and ${K.money(P.outsideMonthly, 'GBP')} a month elsewhere. The rule itself asks for that sum over at most ${P.maxMonths} months, which is only the proof needed for the visa; we apply it to every month of the program, because you will pay rent for all of them. Read it as the least you will spend, not an estimate. The schools concerned today are ${K.listOf(visa.map((s) => h.sc(s.slug)))}.</p>
<h2>The salary you give up</h2>
<p>For a ${K.ref()} earner, ${K.listOf([...new Set(lines.map((l) => l.months))].sort((a, b) => a - b).slice(0, 3).map((m) => `${m} months away cost ${K.usd(Math.round((ref * m) / 12))}`))}; 21 months cost ${K.usd(Math.round(ref * 1.75))}. Raises you would have had and pension contributions come on top and are left out. Type your own salary into the calculator: above a certain level, the pay given up outweighs tuition and living together, and a shorter program or an ${h.a('executive-mba', 'executive MBA')} with no career break starts to make sense.</p>
${h.miniFx()}`,
  tool: 'cost',
  toolArgs: { school: 'harvard' },
  related: ['mba-roi', 'mba-scholarships', 'mba-payback-calculator', 'executive-mba', 'school:harvard', 'compare-mba'],
  sources: ['ecb_fx', 'ukvi_money', 'mbacsea', 'gmac'],
});
