import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const pb = (y: number | null) => (y === null ? 'over 30 years' : K.yrs(y));
const I = K.roi('insead')!;
const L = K.roi('lbs')!;
const W = K.roi('wharton')!;
const sI = K.s('insead'), sL = K.s('lbs'), sW = K.s('wharton');
const low = 60000;
const Ilow = K.roi('insead', 'all', low);
const Wlow = K.roi('wharton', 'all', low);
const high = 150000;
const Ihigh = K.roi('insead', 'all', high);
const Whigh = K.roi('wharton', 'all', high);
const kinds = K.schools.filter((s) => s.emp.salary).reduce<Record<string, number>>((m, s) => { m[s.emp.salary!.kind] = (m[s.emp.salary!.kind] ?? 0) + 1; return m; }, {});
const lbsCons = K.segSalary('lbs', 'consulting');
const insCons = K.segSalary('insead', 'consulting');
const wCons = K.segSalary('wharton', 'consulting');
const noSal = K.schools.filter((s) => !s.emp.salary).length;
const noLiv = K.schools.filter((s) => s.tuition && !s.living).length;

export default definePage({
  id: 'compare-mba',
  group: 'tools',
  order: 7,
  slug: 'compare-mba',
  nav: 'Compare MBA schools',
  card: 'Two or three schools side by side for your salary and goal: total cost, salary and its kind, share placed, payback.',
  title: 'Compare MBA Programs 2026: Cost, Salary and Payback',
  description: `Compare MBA programs in 2026: two or three schools side by side on total cost, salary and the kind of figure behind it, share placed in your goal, and payback.`,
  h1: 'Compare two or three MBA programs',
  intro: `${sI.short}, ${sL.short} and ${sW.short} cost ${K.usd(I.total)}, ${K.usd(L.total)} and ${K.usd(W.total)} for a ${K.ref()} earner, and report three salaries that are not the same kind of figure.`,
  resume: `Comparing MBA programs well means comparing the same things: the total cost for you, salary given up included; the salary the school reports, with the kind of figure it is; the share of the class placed where you want to work; and the payback that follows from them. The tool opens on ${sI.short}, ${sL.short} and ${sW.short}. For a person earning ${K.ref()} today, ${sI.short} costs ${K.usd(I.total)} over ${sI.months} months, ${sL.short} ${K.usd(L.total)} over up to ${sL.months} and ${sW.short} ${K.usd(W.total)} over ${sW.months}. ${sW.short} reports a ${K.salaryKind('wharton')} of ${K.salary('wharton')}, ${sI.short} a ${K.salaryKind('insead')} of ${K.salary('insead')}, ${sL.short} an ${K.salaryKind('lbs')} of ${K.salary('lbs')}. On those figures ${sW.short} repays its cost ${pb(W.payback)} after graduation, ${sI.short} ${pb(I.payback)} and ${sL.short} ${pb(L.payback)}. Two traps distort most comparisons: setting an average next to a median, and setting a one-year program next to a two-year one without counting the months of pay.`,
  faqs: [
    { q: 'What should I compare between two MBA programs first?', a: `The share of each class placed in the industry or region you want, then the total cost for your salary. A school that sends ${K.share('insead', 'consulting') ?? 'half'} of its class into consulting, as ${sI.short} does, and one that sends a tenth is not the same bet, whatever the payback. Salary and payback come next, read with the kind of figure behind them.` },
    { q: 'Can I compare an average MBA salary with a median one?', a: `Only with care. ${sL.short} publishes an ${K.salaryKind('lbs')}, ${sW.short} and ${sI.short} a ${K.salaryKind('wharton')}. An average is usually above the median of the same class, because a few high offers pull it up. Among the schools we read, ${kinds['base-median'] ?? 0} report a median base and ${kinds['base-mean'] ?? 0} an average base: the comparison table says which is which.` },
    { q: 'How do I compare a one-year MBA with a two-year MBA?', a: `Count the salary given up. ${sI.short} takes ${sI.months} months, ${sW.short} ${sW.months}: for a ${K.ref()} earner, that is ${K.usd(I.forgone)} against ${K.usd(W.forgone)} not earned. Two-year programs get some back through the paid summer internship, which our total subtracts. Then compare salaries after the degree, which often differ more than costs.` },
    { q: 'Why does the MBA comparison tool show a different winner for my salary?', a: `Because the salary given up and the yearly gain both depend on what you earn now, and they move differently at each school. A long program takes more months of your pay; a school with a lower reported salary loses its gain sooner as your pay rises. ${Wlow && Ilow && Whigh && Ihigh ? `${sW.short} leads ${sI.short} by ${K.usd(Wlow.npv - Ilow.npv)} of ten-year value at ${K.usd(low)} and by ${K.usd(Whigh.npv - Ihigh.npv)} at ${K.usd(high)}.` : ''}` },
  ],
  body: (h) => `<h2>Four lines that make a fair comparison</h2>
<p>The tool sets up to three schools in columns and reads the same lines for each: program length, tuition and fees, the living budget the school publishes, the total cost for your salary, the share of the class hired within three months or placed in the goal you choose, the salary reported for that goal, the kind of figure it is, the payback and the ten-year value. The highlighted result names the school with the highest ten-year value for you. That last line is the summary; the lines above it are where the decision is.</p>
<p>Change the goal before anything else. Set to consulting, the salary row shows what each school reports for consulting hires: ${insCons ?? 'not published'} at ${sI.short}, ${lbsCons ?? 'not published'} at ${sL.short}, ${wCons ?? 'not published'} at ${sW.short}. Set to a region, the share row shows how much of each class works there, which for many applicants matters more than any salary.</p>
${h.miniTwo('insead', 'wharton')}
<h2>The mean against the median</h2>
<p>An average base salary adds every graduate's base pay and divides by the number of graduates; a median is the pay of the graduate in the middle. In a class where most people earn close to a standard offer and a few earn far more, the average sits above the median. ${sL.short}'s ${K.salary('lbs')} is an average; ${sW.short}'s ${K.salary('wharton')} is a median. Neither can be turned into the other without the full distribution, which schools rarely publish, so we keep the label next to every figure and do not adjust it.</p>
<p>A second trap is the base against total pay. A few schools report average total compensation, bonus included, which looks higher than a base salary for the same class. The kind of figure row of the tool names it for each school; when two columns show different kinds, read the gap as an upper bound.</p>
<h2>One year against two</h2>
<p>A one-year program costs fewer months of pay and returns you to work a year earlier, which counts twice in the model: less salary given up, and one more year of post-MBA pay inside the ten-year horizon. A two-year program gives a summer internship, paid and often the route to the final offer, and more time to change industry. In money terms, ${sI.short} gives up ${K.usd(I.forgone)} for a ${K.ref()} earner, ${sW.short} ${K.usd(W.forgone)}. In career terms, the internship is the reason many career switchers choose two years, and no salary figure captures it.</p>
<p>Exchange rates add a third layer. Every amount is converted to dollars at the European Central Bank rate of ${K.day(K.FX_DATE)}, so a move in the euro or the pound shifts European salaries and costs together while your own salary, typed in dollars, stays put. When two schools are close, check the comparison again after a large currency move, and if you are paid in another currency, convert your salary at the same rate before typing it.</p>
<h2>What the columns cannot show</h2>
<p>${noSal} schools publish no salary and ${noLiv} publish tuition without a living budget; in the tool, their columns show what exists and leave the rest blank rather than borrowing a figure. Visa rules, the network in the country you want, the size of the class and the alumni base in your industry stay outside the table. For the six pairs readers compare most, we wrote a page each: ${h.a('compare-insead-vs-hec', 'INSEAD and HEC Paris')}, ${h.a('compare-insead-vs-lbs', 'INSEAD and LBS')}, ${h.a('compare-harvard-vs-stanford', 'Harvard and Stanford')}, ${h.a('compare-wharton-vs-booth', 'Wharton and Booth')}, ${h.a('compare-oxford-vs-cambridge', 'Oxford and Cambridge')}, ${h.a('compare-iese-vs-ie', 'IESE and IE')}.</p>
${h.mini('response')}`,
  tool: 'compare',
  toolArgs: { schools: ['insead', 'lbs', 'wharton'] },
  related: ['compare-insead-vs-lbs', 'compare-harvard-vs-stanford', 'mba-roi', 'mba-finder', 'mba-salary'],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: ['insead', 'lbs', 'wharton'],
});
