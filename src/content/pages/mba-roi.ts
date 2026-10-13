import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const R = K.ranking('all');
const top = R.ranked[0];
const second = R.ranked[1];
const byNpv = [...R.ranked].filter((x) => x.npv !== null).sort((a, b) => b.npv! - a.npv!);
const bestNpv = byNpv[0];
const worstNpv = byNpv[byNpv.length - 1];
const negative = R.ranked.filter((x) => x.npv !== null && x.npv < 0).length;
const quick = [...R.ranked].filter((x) => x.payback !== null).sort((a, b) => a.payback! - b.payback!)[0];
const pb = (y: number | null) => (y === null ? 'over 30 years' : K.yrs(y));
const noSalary = R.unranked.filter((u) => u.why === 'no salary published').length;
const noLiving = R.unranked.filter((u) => u.why === 'no living budget published').length;
const outside = K.schools.length - R.ranked.length - R.unranked.length;
const topO = K.roi(top.slug)!;
const low = 60000;
const high = 150000;
const topLow = K.roi(top.slug, 'all', low);
const topHigh = K.roi(top.slug, 'all', high);
const ins = K.roi('insead');
const insHigh = K.roi('insead', 'all', high);
const w = K.MODEL.weights;
const negRows = R.ranked.filter((x) => x.npv !== null && x.npv < 0);
const negShort = negRows.filter((x) => (K.s(x.slug).months ?? 99) <= 12).length;
const posPb = R.ranked.filter((x) => x.npv !== null && x.npv >= 0 && x.payback !== null).map((x) => x.payback!);
const negPb = negRows.filter((x) => x.payback !== null).map((x) => x.payback!);
const posMax = Math.max(...posPb);
const negMin = Math.min(...negPb);
const insSal = K.c('insead').salary;

export default definePage({
  id: 'mba-roi',
  group: 'tools',
  order: 2,
  slug: 'mba-roi',
  nav: 'MBA ROI ranking',
  card: `Every school that publishes a salary and a budget, ranked on hiring, pay and ten-year value for a ${K.ref()} earner.`,
  title: 'MBA ROI 2026: Payback Period and 10-Year NPV by School',
  description: `MBA ROI 2026 for ${R.ranked.length} business schools: total cost with the salary given up, payback period and ten-year NPV, recomputed for your own salary before the degree.`,
  h1: 'MBA ROI: which schools repay their cost, and how fast',
  intro: `For a ${K.ref()} earner before the degree, ${top.short} leads our whole-class ranking with a payback of ${pb(topO.payback)} and a ten-year value of ${K.usd(topO.npv)}.`,
  resume: `The return on an MBA is the extra salary it brings, set against everything it costs, including the pay you stop earning while you study. We compute it for ${R.ranked.length} schools that publish both a graduate salary and a student living budget, for one reference person earning ${K.ref()} before the degree. ${top.short} comes first on our fit score: ${K.p(top.share)} of its class had accepted a job within three months, at a ${K.salaryKind(top.slug)} of ${K.salary(top.slug)}, for a total cost of ${K.usd(topO.total)} and a payback of ${pb(topO.payback)} after graduation. The fastest payback belongs to ${quick.short}, ${pb(quick.payback)}. ${negative} of the ${R.ranked.length} ranked schools end the ten years below zero for that person, ${negShort} of them programs of a year or less whose graduates report a lower salary. Change the salary in the tool and every line moves: a higher salary today means more pay given up and a smaller gap after the degree.`,
  faqs: [
    { q: 'How is MBA ROI calculated on this site?', a: `We add tuition, fees, the school's living budget and your salary during the months of study, subtract summer internship pay for two-year programs, then compare that total with the yearly gap between the salary after the MBA and the one you would have had without it. The ten-year NPV discounts both at ${Math.round(K.MODEL.r * 100)}% a year, before tax.` },
    { q: 'What is a good MBA payback period?', a: `For the reference person earning ${K.ref()}, the ranked schools range from ${pb(quick.payback)} at ${quick.short} to more than a decade at the slowest. In our model, every school with a positive ten-year NPV repays within ${K.yrs(posMax)}, and the first negative value appears at ${K.yrs(negMin)}: past that point the horizon ends before the gains catch up.` },
    { q: 'Why does a famous school have a negative MBA ROI in the table?', a: `Mostly because of the salary it reports. ${negative} ranked schools finish below zero for a ${K.ref()} earner: they cost less, but their graduates report salaries closer to that starting point, so the yearly gain is thin. The same school can turn positive for someone earning ${K.usd(low)}, which the calculator shows when you lower the salary.` },
    { q: 'Does MBA ROI include the signing bonus?', a: 'Yes, in the first year only and scaled by the share of the class that received one, as each school reports it. A bonus received by half the class counts for half its amount. Schools that publish no bonus get none, which slightly favors those that disclose it.' },
    { q: 'Which schools are missing from the MBA ROI ranking, and why?', a: `${noSalary} schools publish no graduate salary on their open pages and ${noLiving} give no student living budget, so no payback can be computed without inventing a figure. They stay listed under the ranking with their hiring rate. ${outside > 0 ? `For ${outside} more, we read no hiring rate in the open documents.` : 'Every other school appears in the table.'}` },
  ],
  body: (h) => `<h2>Four lines of cost, one line of gain</h2>
<p>The cost side of the model has four lines: tuition, mandatory fees, the living budget the school itself publishes, and the salary you would have earned during the months of study. For a two-year program, the median monthly pay of the summer internship comes back as income, counted for ${K.num(K.MODEL.internMonths, 1)} months. A scholarship, when you type one, is subtracted. At ${top.short}, the reference person gives up ${K.usd(topO.forgone)} of salary on top of ${K.usd(topO.direct)} of direct costs.</p>
<p>The gain side is a single line repeated each year after graduation: the salary the school reports, rising ${Math.round(K.MODEL.g1 * 100)}% a year, minus the salary you would have kept without the degree, rising ${Math.round(K.MODEL.g0 * 100)}% a year from today. The payback period is the point where the sum of those yearly gaps covers the total cost. The net present value runs ${K.MODEL.horizonYears} years from the first day of class and discounts costs and gains at ${Math.round(K.MODEL.r * 100)}% a year. Return on cost, shown in the calculator, is that NPV divided by the present value of the costs: ${topO.roi === null ? 'not defined' : K.pct(topO.roi, 0)} at ${top.short}. The ${h.a('method', 'method page')} writes out each formula.</p>
${h.rankTable('all', 15)}
<h2>Why a ranking and not a list sorted by NPV</h2>
<p>Sorting on NPV alone would reward any school with a high salary, even if a large part of its class found no job within three months. The fit score weighs three percentile ranks: the share of the class hired (${Math.round(w.share * 100)}%), the salary reported (${Math.round(w.salary * 100)}%) and the ten-year value (${Math.round(w.npv * 100)}%). ${bestNpv.slug === top.slug ? `${top.short} leads on both, with the largest ten-year value at ${K.usd(bestNpv.npv!)}, yet ${second.short} comes second while several schools with a higher NPV sit below it, because it hired ${K.p(second.share)} of its class.` : `That is why ${top.short} sits first while ${bestNpv.short} has the largest ten-year value, ${K.usd(bestNpv.npv!)}, and why ${second.short} comes second.`} Sort the tool on the NPV column if money alone decides for you; at the other end of that sort, ${worstNpv.short} finishes at ${K.usd(worstNpv.npv!)}.</p>
${h.mini('forgone')}
<h2>Your salary today moves the whole order</h2>
<p>The reference salary is an assumption, the same for every school, so that rankings compare programs rather than people. Your own result can be far from it. At ${top.short}, someone earning ${K.usd(low)} before the degree ${topLow ? `would see a payback of ${pb(topLow.payback)} and a ten-year value of ${K.usd(topLow.npv)}` : 'cannot be computed'}; at ${K.usd(high)}, ${topHigh ? `the payback becomes ${pb(topHigh.payback)} and the value ${K.usd(topHigh.npv)}` : 'the model has no figure'}. Two effects add up: each extra dollar earned today is a dollar given up during the program, and the gap with the reported salary narrows.</p>
<p>The second effect can turn the gain negative. When your current pay is above the salary a school reports, every year after the degree shows a loss in the model, whatever the length of the program. ${ins && insHigh && insSal ? `INSEAD lasts only ${K.months('insead')} months, yet its graduates report ${K.usd(insSal)} in dollars: its ten-year value goes from ${K.usd(ins.npv)} at ${K.ref()} to ${K.usd(insHigh.npv)} at ${K.usd(high)}.` : ''} A one-year program still gives up fewer months of pay, so it keeps an edge for people whose salary sits below the reported figure. Above it, the degree has to be justified by a change of industry, country or job that the averages cannot show.</p>
<h2>What stays outside the model</h2>
<p>Taxes are left out: they shrink gains and the salary given up alike, so they change the size of the result more than the order. Visa rules, the job you held before, a sponsor who keeps paying you, and the cost of moving a family are not in any school report. The model also assumes you land a job at the reported salary. A median says half the class earned less, and the hiring rate in the second column says how many found nothing within three months. Use the ranking as a first sort, then open the ${h.a('mba-payback-calculator', 'payback calculator with a loan')} or the ${h.a('compare-mba', 'side-by-side comparison')} for the last few names.</p>
${h.miniPayback(top.slug)}`,
  tool: 'finder',
  toolArgs: { goal: 'all' },
  related: ['mba-finder', 'mba-cost', 'mba-salary', 'mba-payback-calculator', 'compare-mba', 'method'],
  sources: ['mbacsea', 'ecb_fx', 'gmac', 'ukvi_money'],
});
