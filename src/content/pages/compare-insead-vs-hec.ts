import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const A = 'insead', B = 'hec-paris';
const a = K.s(A), b = K.s(B);
const cA = K.c(A), cB = K.c(B);
const ref = K.MODEL.refSalary;
/** Total cost for the reference person, computed from the kit even when a school publishes no salary. */
const total = (slug: string) => { const c = K.c(slug); if (c.tuition === null || c.living === null || !c.months) return null; const intern = c.twoYear && c.intern ? c.intern * K.MODEL.internMonths : 0; return c.tuition + c.fees + c.living + (ref * c.months) / 12 - intern; };
const zone = (slug: string, z: string) => K.s(slug).emp.zones.find((x) => x.zone === z) ?? null;
const zp = (slug: string, z: string) => { const x = zone(slug, z); return x && x.pct !== null ? K.p(x.pct) : 'not published'; };
const rk = (slug: string, g: string) => { const r = K.rank(slug, g); return r ? `number ${r.rank} of ${r.of}` : 'not ranked'; };
const pb = (o: ReturnType<typeof K.roi>) => (!o ? 'not computable' : o.payback === null ? 'over 30 years' : K.yrs(o.payback));
const tA = total(A)!, tB = total(B);
const oA = K.roi(A), oB = K.roi(B);
const gap = b.months! - a.months!;
const fgA = (ref * a.months!) / 12, fgB = (ref * b.months!) / 12;
const meA = zone(A, 'Middle East'), meB = zone(B, 'Middle East');
const asA = zone(A, 'Asia'), asB = zone(B, 'Asia'), usB = zone(B, 'US');
const dA = cA.tuition! + cA.fees + cA.living!, dB = cB.tuition! + cB.fees + (cB.living ?? 0);
/** Current salary below which the longer program becomes the cheaper total. */
const flip = gap > 0 ? Math.round((((dA - dB) * 12) / gap) / 1000) * 1000 : 0;
const salB = b.emp.salary;
const printedMedian = /USD ([\d,]+) beneath it as the median/.exec(salB?.note ?? '')?.[1] ?? null;
const zoneSal = (slug: string) => K.s(slug).emp.zones.filter((z) => z.salary).length;
const better = oA && oB ? (oB.npv > oA.npv ? b.short : a.short) : null;

export default definePage({
  id: 'compare-insead-vs-hec',
  group: 'compare',
  order: 1,
  slug: 'compare/insead-vs-hec',
  nav: 'INSEAD vs HEC Paris',
  card: 'Ten months against sixteen near Paris: total cost, two salaries measured differently, and where each class goes.',
  title: 'INSEAD vs HEC Paris 2026: MBA Cost, Salary and Payback',
  description: `INSEAD vs HEC Paris MBA in 2026: ${K.tuition(A)} against ${K.tuition(B)} of tuition, ${a.months} against ${b.months} months, total cost, the salary each reports and where graduates go.`,
  h1: 'INSEAD or HEC Paris',
  intro: `${a.short} costs ${K.direct(A)} for ${a.months} months and ${b.short} ${K.direct(B) ?? K.tuition(B)} for ${b.months}, before the salary you give up.`,
  resume: `${a.short} and ${b.short} are the two French MBAs most applicants weigh against each other, and they differ first in length. ${a.short} runs ${a.months} months for ${K.tuition(A)} of tuition and a school budget of ${K.living(A)} for living costs; ${b.short} runs ${b.months} months for ${K.tuition(B)} and a budget of ${K.living(B) ?? 'no published amount'}. For someone earning ${K.ref()} today, the total with the salary given up comes to ${K.usd(tA)} at ${a.short} and ${tB === null ? 'an amount we cannot compute' : K.usd(tB)} at ${b.short}, the gap coming mostly from ${gap} more months without pay. ${a.short} reports a ${K.salaryKind(A)} of ${K.salary(A)}; ${salB ? `${b.short} reports ${K.salaryKind(B)} of ${K.salary(B)}, bonus included, so the two are not the same measure.` : `${b.short} publishes no salary we could read.`} ${oA && oB ? `On those figures, the payback is ${pb(oA)} at ${a.short} and ${pb(oB)} at ${b.short}, with ten-year values of ${K.usd(oA.npv)} and ${K.usd(oB.npv)}.` : ''} Both send about half their class into European jobs; ${a.short} sends ${zp(A, 'Middle East')} to the line it calls ${meA ? meA.label : 'the Middle East'}, against ${zp(B, 'Middle East')} at ${b.short}.`,
  faqs: [
    { q: 'Is INSEAD or HEC Paris cheaper for an MBA?', a: `On tuition, ${cB.tuition! < cA.tuition! ? b.short : a.short}: ${K.tuition(B)} against ${K.tuition(A)}. In total, ${tB !== null && tA < tB ? a.short : b.short}, because ${a.short} is ${gap} months shorter: for a ${K.ref()} earner, ${K.usd(tA)} against ${tB === null ? 'a total we cannot compute' : K.usd(tB)}, salary given up included. ${flip > 0 ? `Below a current salary of about ${K.usd(flip)}, the order flips, because ${gap} months of pay then weigh less than the fee gap.` : ''}` },
    { q: 'Does HEC Paris publish its MBA salary like INSEAD does?', a: salB ? `Yes, but not the same figure. ${b.short} headlines ${K.salaryKind(B)}, ${K.salary(B)}, which includes bonuses${printedMedian ? `, and prints a median of $${printedMedian} beneath it` : ''}. ${a.short} publishes a ${K.salaryKind(A)} of ${K.salary(A)}, without bonus. Our model uses each school's headline figure and labels it, so ${b.short}'s payback is flattered a little by the measure.` : `Not in a form we could read. ${b.short}'s report is hosted as a flipbook we could not open, so we show no salary and no payback for it. ${a.short} publishes a ${K.salaryKind(A)} of ${K.salary(A)} for ${a.emp.cohort}.` },
    { q: 'Which places more graduates in Asia, INSEAD or HEC Paris?', a: `${b.short} reports ${zp(B, 'Asia')} of its class in the line it calls ${asB ? asB.label : 'Asia'}, ${a.short} ${zp(A, 'Asia')} in ${asA ? asA.label : 'Asia'}. ${a.short} also teaches on a campus in Singapore. In our Asia ranking, which uses the share placed alone, ${a.short} is ${rk(A, 'z-asia')} and ${b.short} ${rk(B, 'z-asia')}.${asB?.salary ? ` ${b.short} adds a salary for Asia, ${K.money(asB.salary, asB.cur)}; ${a.short} gives none by region.` : ''}` },
    { q: 'Which is better for consulting, INSEAD or HEC Paris?', a: `${a.short}, on what both publish: ${K.share(A, 'consulting') ?? 'a large share'} of its class went into consulting at ${K.segSalary(A, 'consulting') ?? 'a salary it does not split out'}, against ${K.share(B, 'consulting') ?? 'a share it does not publish'} at ${b.short}${K.segSalary(B, 'consulting') ? `, at ${K.segSalary(B, 'consulting')}` : ''}. In our consulting ranking ${a.short} is ${rk(A, 'consulting')} and ${b.short} ${rk(B, 'consulting')}. The large strategy firms lead ${a.short}'s employer list.` },
    { q: 'How long is the HEC Paris MBA compared with INSEAD?', a: `${b.short} lasts ${b.months} months against ${a.months} at ${a.short}. For someone earning ${K.ref()}, those lengths mean ${K.usd(fgB)} and ${K.usd(fgA)} of salary not earned. The longer program leaves more room for an internship and a second recruiting season, which matters most to people changing industry.` },
  ],
  body: (h) => `<h2>The calendar, not the fee list</h2>
<p>Tuition is ${K.tuition(A)} at ${h.sc(A)} (${a.tuition!.cohort}) and ${K.tuition(B)} at ${h.sc(B)} (${b.tuition!.cohort}). The school budgets for living costs are ${K.living(A)} and ${K.living(B) ?? 'not published'}. What separates the two is the calendar. ${a.short} finishes in ${a.months} months; ${b.short} takes ${b.months}. For a person earning ${K.ref()}, that is ${K.usd(fgA)} against ${K.usd(fgB)} of salary given up, and it explains most of the gap between the two totals, ${K.usd(tA)} and ${tB === null ? 'a figure we cannot compute' : K.usd(tB)}.</p>
<p>The longer program buys time: more room for an internship and a second recruiting season, which matters for anyone changing industry. The shorter one means recruiting starts almost on arrival. If you already know the firm you want and it hires on campus, the short calendar costs little; if you are still deciding, it can be tight.</p>
${oA && oB ? h.miniTwo(A, B) : h.miniPayback(A)}
<h2>Two salaries, two measures</h2>
<p>${a.short} reports a ${K.salaryKind(A)} of ${K.salary(A)}, about ${K.salaryUsd(A)} at the ECB rate of ${K.day(K.FX_DATE)}, for ${a.emp.cohort}. It splits the figure by industry: consulting at ${K.segSalary(A, 'consulting') ?? 'a level it does not publish'}, finance at ${K.segSalary(A, 'finance') ?? 'a level it does not publish'}, technology at ${K.segSalary(A, 'tech') ?? 'a level it does not publish'}. ${salB ? `${b.short} headlines ${K.salaryKind(B)}, ${K.salary(B)} for the ${b.emp.cohort}, a figure that includes bonuses${printedMedian ? ` and sits above the median of $${printedMedian} printed beneath it` : ''}. Its industry figures are medians: consulting at ${K.segSalary(B, 'consulting') ?? 'not published'}, finance at ${K.segSalary(B, 'finance') ?? 'not published'}, technology at ${K.segSalary(B, 'tech') ?? 'not published'}.` : `${b.short} publishes no salary we could read, and we do not borrow one from a ranking.`}</p>
<p>${oA && oB ? `With those headline figures, ${better} comes out ahead over ten years for a ${K.ref()} earner: ${K.usd(oA.npv)} at ${a.short}, ${K.usd(oB.npv)} at ${b.short}. Read ${b.short}'s side with the measure in mind, since an average of total pay sits above a median base salary for the same class. ` : ''}${b.short} also publishes salaries for ${zoneSal(B)} regions${usB?.salary ? `, ${K.money(usB.salary, usB.cur)} in North America among them` : ''}; ${a.short} publishes ${zoneSal(A) === 0 ? 'none by region' : `${zoneSal(A)}`}. ${a.short} reports ${a.emp.employed !== null ? K.p(a.emp.employed) : 'a share'} of its class with an offer within three months, ${b.short} ${b.emp.employed !== null ? K.p(b.emp.employed) : 'a share'} who accepted one in the same window, two labels that are close but not identical.</p>
<h2>Where the two classes go</h2>
<p>Both schools keep the largest group in Europe: ${zp(A, 'Europe')} at ${a.short}, ${zp(B, 'Europe')} at ${b.short}. The differences sit elsewhere. ${a.short} places ${zp(A, 'Middle East')} in ${meA ? meA.label : 'the Middle East'}, which puts it ${rk(A, 'z-me')} in our Middle East ranking; ${b.short} places ${zp(B, 'Middle East')} in ${meB ? meB.label : 'the Middle East'} and stands ${rk(B, 'z-me')}. North America takes ${zp(A, 'US')} of ${a.short}'s class and ${zp(B, 'US')} of ${b.short}'s. By industry, consulting dominates at ${a.short} with ${K.share(A, 'consulting') ?? 'a large share'}, while ${b.short} spreads its class across technology (${K.share(B, 'tech') ?? 'n/a'}), finance (${K.share(B, 'finance') ?? 'n/a'}) and consulting (${K.share(B, 'consulting') ?? 'n/a'}), with consumer goods and luxury at ${K.share(B, 'consumer') ?? 'a smaller share'}.</p>
${h.miniGoal(B)}
<h2>Who should pick which</h2>
<p>Choose ${a.short} for the shortest time out of work, a route into strategy consulting that its own report documents, or a job in Africa, the Middle East or Asia, where its placement shares are high and its second campus, in Singapore, sits. Choose ${b.short} for a longer program with time for an internship, a smaller class of about ${b.classSize ?? 'a few hundred'}, a spread of industries that includes technology and consumer brands, and a base near Paris. ${b.short} is ${K.intl(B) ?? 'largely'} international, from ${b.profile.countries ?? 'many'} countries; ${a.short} counts ${a.profile.countries ?? 'many'} nationalities in a class of ${a.classSizeText || 'several hundred'}. Run both in the ${h.a('compare-mba', 'comparison tool')} with your own salary before deciding.</p>`,
  tool: 'compare',
  toolArgs: { schools: ['insead', 'hec-paris'] },
  related: ['school:insead', 'school:hec-paris', 'compare-insead-vs-lbs', 'best-mba-europe', 'best-mba-one-year'],
  sources: ['ecb_fx', 'mbacsea', 'gmac'],
  schoolSources: ['insead', 'hec-paris'],
});
