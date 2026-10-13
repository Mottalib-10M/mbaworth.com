import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { loanInterest } from '../../lib/engine/roi';

/** Example loan terms: the calculator's own starting values (an assumption, not a lender's offer). */
const RATE = 0.08;
const YEARS = 10;
const pb = (y: number | null) => (y === null ? 'over 30 years' : K.yrs(y));
const instalment = (a: number, r: number, n: number) => (r > 0 ? (a * r) / (1 - Math.pow(1 + r, -n)) : a / n);
/** Payback once loan interest is added to the total, as the calculator does. */
const paybackWith = (o: NonNullable<ReturnType<typeof K.roi>>, extra: number) => {
  const total = o.total + extra; let cum = 0;
  for (let t = 0; t < o.gains.length; t++) { const g = o.gains[t]; if (g > 0 && cum + g >= total) return t + (total - cum) / g; cum += g; }
  return null;
};
const case_ = (slug: string, rate = RATE, years = YEARS) => {
  const o = K.roi(slug); const c = K.c(slug);
  if (!o || c.tuition === null) return null;
  const amount = c.tuition + c.fees;
  const interest = loanInterest({ amount, rate, years });
  const pay = instalment(amount, rate, years);
  return { o, amount, interest, pay, after: paybackWith(o, interest), salary: c.salary! };
};
const L = case_('lbs')!;
const Lfast = case_('lbs', RATE, 5)!;
const Llow = case_('lbs', 0.05)!;
const W = case_('wharton')!;
const I = case_('insead')!;
const lbs = K.s('lbs');

export default definePage({
  id: 'mba-payback-calculator',
  group: 'tools',
  order: 6,
  slug: 'mba-payback-calculator',
  nav: 'Payback with a loan',
  card: 'How long the degree takes to repay once a loan, its rate and its instalments are added to the cost.',
  title: 'MBA Payback Calculator 2026: Loan Interest and Instalments',
  description: `MBA payback calculator 2026 with a loan: interest added to the total cost, the yearly instalment, and the years until the salary gap repays it all, per school.`,
  h1: 'MBA payback with a loan',
  intro: `Borrowing the ${lbs.short} tuition at ${Math.round(RATE * 100)}% over ${YEARS} years adds ${K.usd(L.interest)} of interest and stretches the payback from ${pb(L.o.payback)} to ${pb(L.after)}.`,
  resume: `A loan does not change what an MBA costs in tuition, but it adds interest, and interest is a cost the salary gap has to repay. The calculator adds total interest to the total cost, then counts the years until the gain from the degree covers both. For ${lbs.name}, whose tuition and fees come to ${K.usd(L.amount)} at the ECB rate of ${K.day(K.FX_DATE)}, borrowing that whole sum at ${Math.round(RATE * 100)}% repaid over ${YEARS} years means a yearly instalment of ${K.usd(L.pay)} and ${K.usd(L.interest)} of interest. For a person earning ${K.ref()} today, the payback after graduation goes from ${pb(L.o.payback)} without a loan to ${pb(L.after)} with it. The instalment equals ${Math.round((L.pay / L.salary) * 100)}% of the ${K.salaryKind('lbs')} the school reports, before tax. A shorter term costs less interest but raises the instalment: over five years, it climbs to ${K.usd(Lfast.pay)} a year.`,
  faqs: [
    { q: 'How does an MBA loan change the payback period?', a: `By the interest only. The amount borrowed already sits in the total as tuition, so the calculator adds the interest paid over the life of the loan. At ${lbs.short}, ${K.usd(L.interest)} of interest on the full tuition lengthens the payback by ${K.yrs((L.after ?? 30) - (L.o.payback ?? 0))} for a ${K.ref()} earner.` },
    { q: 'What is the yearly payment on an MBA loan for LBS tuition?', a: `Borrowing ${K.usd(L.amount)}, the ${lbs.short} tuition and fees, at ${Math.round(RATE * 100)}% over ${YEARS} years means ${K.usd(L.pay)} a year in equal instalments, ${K.usd(L.pay * YEARS)} repaid in total. At ${Math.round(0.05 * 100)}%, the instalment falls to ${K.usd(Llow.pay)} and the interest to ${K.usd(Llow.interest)}. Your lender's own rate and fees decide the real figure.` },
    { q: 'Should I repay an MBA loan fast or slowly?', a: `Fast costs less: over five years, the interest on the ${lbs.short} example is ${K.usd(Lfast.interest)} instead of ${K.usd(L.interest)} over ten. The instalment rises to ${K.usd(Lfast.pay)} a year, which has to fit next to rent and tax on a first post-MBA salary. The payback in the calculator falls with the interest saved.` },
    { q: 'Does the payback calculator count tax and the loan timing?', a: 'No tax, and the interest is added as one lump to the total cost rather than spread over the years it is paid. Both simplifications work in the same direction for every school, so the comparison between programs holds, but your own bank balance will feel the instalments earlier than the model suggests.' },
  ],
  body: (h) => `<h2>What the calculator adds when you borrow</h2>
<p>The three loan fields sit under the usual ones: the amount borrowed, the interest rate and the number of years to repay. The tool computes a fixed instalment paid once a year, multiplies it by the number of years, and subtracts the amount borrowed: what remains is the interest. That interest joins tuition, fees, living costs and the salary given up in the total cost, and the payback is counted again against the same yearly gains. The amount borrowed itself is not added, because it already sits in the cost as tuition or living money.</p>
<p>The calculator opens on ${h.sc('lbs')}, a program of up to ${K.months('lbs')} months whose London living budget is the UK student visa minimum, a floor. Its graduates report an ${K.salaryKind('lbs')} of ${K.salary('lbs')}. Choose any other school in the first field; the loan fields stay as you set them.</p>
${h.mini('loan')}
<h2>Three loans on the same degree</h2>
<p>To see what the rate and the term do, take the full ${lbs.short} tuition and fees, ${K.usd(L.amount)}, for a person earning ${K.ref()} today. The payback without any loan is ${pb(L.o.payback)} after graduation.</p>
${h.table(['Loan terms', 'Yearly instalment', 'Total interest', 'Payback after graduation'], [[`${Math.round(RATE * 100)}%, ${YEARS} years`, K.usd(L.pay), K.usd(L.interest), pb(L.after)], [`${Math.round(RATE * 100)}%, 5 years`, K.usd(Lfast.pay), K.usd(Lfast.interest), pb(Lfast.after)], ['5%, 10 years', K.usd(Llow.pay), K.usd(Llow.interest), pb(Llow.after)]], `${lbs.short}: the whole tuition and fees borrowed, reference person, US dollars at the ECB rate of ${K.day(K.FX_DATE)}.`, ['l', 'r', 'r', 'r'])}
<p>Both levers cut interest, and in this example ${Lfast.interest < Llow.interest ? `halving the term saves more (${K.usd(L.interest - Lfast.interest)}) than three points off the rate (${K.usd(L.interest - Llow.interest)})` : `three points off the rate save more (${K.usd(L.interest - Llow.interest)}) than halving the term (${K.usd(L.interest - Lfast.interest)})`}. The difference is in the budget: the short loan asks for ${K.usd(Lfast.pay - L.pay)} more each year, in the years when a new graduate is also paying rent in an expensive city. The interest on the base case alone is ${Math.round((L.interest / L.amount) * 100)}% of the sum borrowed.</p>
<h2>The same loan at three schools</h2>
<p>A loan weighs differently depending on the salary that repays it. Borrowing the tuition and fees on the same terms, ${Math.round(RATE * 100)}% over ${YEARS} years:</p>
<ul>
<li>${h.sc('wharton')}: ${K.usd(W.amount)} borrowed, ${K.usd(W.pay)} a year, ${K.usd(W.interest)} of interest; payback ${pb(W.o.payback)} without the loan and ${pb(W.after)} with it, against a ${K.salaryKind('wharton')} of ${K.salary('wharton')}.</li>
<li>${h.sc('lbs')}: ${K.usd(L.pay)} a year; payback ${pb(L.o.payback)} becomes ${pb(L.after)}.</li>
<li>${h.sc('insead')}: ${K.usd(I.amount)} borrowed for a ${K.months('insead')}-month program, ${K.usd(I.pay)} a year, ${K.usd(I.interest)} of interest; payback ${pb(I.o.payback)} becomes ${pb(I.after)}.</li>
</ul>
<p>The school with the largest tuition is not the one hurt most by borrowing. A loan lengthens the payback most where the yearly gain is thin, because each extra dollar of interest takes longer to earn back. At a school whose graduates report a salary well above yours, the same interest costs a few months; at one whose salary sits close to yours, it can cost years.</p>
<h2>Before you sign</h2>
<p>Check four things the calculator cannot know. Whether the rate is fixed or floating; whether repayment starts during the program or after it, since interest accrued while you study adds to the balance; the fees the lender charges on top of the rate; and the currency of the loan, because a loan in dollars repaid from a salary in pounds or euros moves with the exchange rate. Many schools list partner lenders on their financial aid page, and the ${h.a('mba-scholarships', 'scholarships page')} shows what can be removed from the amount to borrow in the first place.</p>
${h.miniPayback('lbs')}`,
  tool: 'payback',
  toolArgs: { school: 'lbs' },
  related: ['mba-cost', 'mba-roi', 'mba-scholarships', 'school:lbs', 'is-an-mba-worth-it'],
  sources: ['ecb_fx', 'ukvi_money', 'mbacsea'],
  schoolSources: ['lbs', 'wharton', 'insead'],
});
