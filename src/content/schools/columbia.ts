import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'columbia';
const s = K.s(slug);
const o = K.roi(slug);
const all = (x: string) => { const c = K.c(x); return c.tuition === null || c.living === null ? null : c.tuition + c.fees + c.living; };
const ranked = K.schools.filter((x) => all(x.slug) !== null).sort((a, b) => all(b.slug)! - all(a.slug)!);
const dearest = ranked[0]?.slug === slug;
const zs = (z: string) => s.emp.zones.find((x) => x.zone === z);
const asia = zs('Asia'), eu = zs('Europe'), la = zs('Latin America');
const zoneSal = K.schools.filter((x) => x.emp.zones.filter((z) => z.salary !== null).length >= 3).length;
const seg = (k: string) => s.emp.segments.find((x) => x.key === k);
const ib = seg('ib'), am = seg('am'), vc = seg('vc'), pe = seg('pe');
const rAm = K.rank(slug, 'am'), rVc = K.rank(slug, 'vc'), rAll = K.rank(slug, 'all');
const bonus = s.emp.bonus;
const us = zs('US');
const sameUs = !!us?.salary && us.salary === s.emp.salary?.v;
const jan = s.monthsNote.match(/January entry \((\d+) students\)/)?.[1];

export default defineSchool({
  slug,
  title: 'Columbia MBA 2026: New York Cost, Salary by Region, Payback',
  description: `Columbia Business School MBA 2026: ${K.direct(slug)} for two years in New York, a ${K.salary(slug)} ${K.salaryKind(slug)}, its salaries by region, and the payback on your own pay.`,
  intro: `${dearest ? 'The highest cost of any MBA on this site once living is counted' : `${K.direct(slug)} for tuition, fees and living`}, and one of the few reports that shows how much less graduates earn outside the United States.`,
  resume: `Columbia Business School's full-time MBA costs ${K.direct(slug)} for the August entry, counting two years of tuition, fees, health insurance and the school's nine-month living budget at the first-year rate${dearest ? ', more than any other program in our data' : ''}; the school says second-year costs generally rise a few percent. ${o ? `For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)}, for a total of ${K.usd(o.total)}.` : ''} The ${s.emp.cohort.toLowerCase()} reported a ${K.salaryKind(slug)} of ${K.salary(slug)}${bonus ? `, and ${bonus.pct !== null ? K.p(bonus.pct) : 'many'} received a signing bonus with a median of ${K.money(bonus.v, bonus.cur)}` : ''}. ${o ? `That repays the total ${K.payback(slug)} after graduation and leaves a ten-year net present value of ${K.npv(slug)}${rAll ? `, number ${rAll.rank} of ${rAll.of} in our overall ranking` : ''}.` : ''} What sets Columbia apart is the depth of its report: it gives salaries by finance segment and by region, and the regional figures show that the payback above applies to the ${K.share(slug, 'z-us')} who stayed in the United States, not to those who left.`,
  body: (h) => `<h2>The same degree, a very different salary abroad</h2>
<p>${zoneSal ? `Only ${zoneSal} schools in our data publish a salary for three regions or more, and Columbia is one of them.` : ''} Graduates who stayed in the United States reported a median of ${K.segSalary(slug, 'z-us') ?? K.salary(slug)}. ${eu?.salary ? `In Europe the median was ${K.money(eu.salary, eu.cur)}` : ''}${asia?.salary ? `, in Asia ${K.money(asia.salary, asia.cur)}` : ''}${la?.salary ? ` and in Latin America ${K.money(la.salary, la.cur)}` : ''}. For an international student who plans to go home soon after the degree, those regional medians, not the headline figure, are the ones that decide the payback.</p>
<p>${o ? `At the Asian median, the reference person would need ${K.payback(slug, 'z-asia') ?? 'more than thirty years'} to repay the same ${K.usd(o.total)}${eu?.salary ? `, and at the European median ${K.payback(slug, 'z-europe') ?? 'more than thirty years'}` : ''}.` : ''} The mini below switches between regions and industries with the salary the school reports for each.</p>
${h.miniGoal(slug)}
<h2>Banking, asset management and the January class</h2>
<p>Finance took ${K.share(slug, 'finance')} of the class and consulting ${K.share(slug, 'consulting')} at ${K.segSalary(slug, 'consulting') ?? 'a higher median'}. ${ib ? `Investment banking alone took ${K.p(ib.pct!)}` : ''}${am ? `, asset management ${K.p(am.pct!)}` : ''}${pe ? `, private equity ${K.p(pe.pct!)}` : ''}${vc ? ` and venture capital ${K.p(vc.pct!)}` : ''}. ${rAm ? `On asset management, Columbia is number ${rAm.rank} of ${rAm.of} in our ranking` : ''}${rVc ? `, and number ${rVc.rank} of ${rVc.of} on venture capital` : ''}. Industry shares in this report include sponsored students who return to their employer, while the salary figures exclude them, so the two do not describe exactly the same group.</p>
<p>The class is large, ${s.classSize !== null ? K.num(s.classSize) : 'close to a thousand'} students across two intakes${jan ? `, ${jan} of them in the January entry` : ''}. The January track is accelerated and runs several months shorter, which means less salary given up and a shorter payback; the calculator above uses the August track.</p>
<h2>Why the New York bill runs so high</h2>
<p>Tuition is ${K.money(s.tuition!.v / 2, 'USD')} for the first year, and the school's budget for nine months in New York, health insurance included, is ${K.money(s.living!.v / 2, 'USD')}. Both are counted twice. Above about ${K.usd(Math.ceil(s.tuition!.v / (s.months! / 12) / 1000) * 1000)} a year, your own salary for the ${s.months} months becomes a bigger line than tuition. The ${h.a('best-mba-finance', 'finance ranking')} and ${h.a('compare-mba', 'comparison tool')} set Columbia against ${h.sc('nyu-stern')}, across town.</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does Columbia Business School cost for two years?', a: `At the first-year rate for the August entry, tuition is ${K.tuition(slug)}, fees and health insurance ${K.fees(slug)}, and the school's living budget ${K.living(slug)}, for ${K.direct(slug)}. ${o ? `With the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)}.` : ''} Second-year costs are not yet published; the school says they generally rise.` },
    { q: 'What is the median salary after Columbia Business School?', a: `The ${s.emp.cohort.toLowerCase()} reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, ${sameUs ? 'the same median as graduates who stayed in the United States' : 'with a separate median for those who stayed in the United States'}. ${eu?.salary ? `Graduates in Europe reported ${K.money(eu.salary, eu.cur)}` : ''}${asia?.salary ? ` and in Asia ${K.money(asia.salary, asia.cur)}` : ''}. Consulting paid ${K.segSalary(slug, 'consulting') ?? 'more'}; the report gives no single median for finance as a whole, only for its segments, where investment banking paid ${K.segSalary(slug, 'ib') ?? 'a similar median'}.` },
    { q: 'Does a Columbia MBA pay off if I work outside the United States?', a: `${o ? `For a person earning ${K.ref()} before the MBA, the ${K.usd(o.total)} total is repaid ${K.payback(slug)} after graduation at the school-wide median, but ${K.payback(slug, 'z-asia') ?? 'more than thirty years'} at the median reported for Asia.` : 'The school publishes no figure that would let us compute it.'} The regional medians are lower, while the cost of the degree stays the same wherever you work afterwards.` },
    { q: 'Is the January entry at Columbia cheaper?', a: `The January track is shorter, about ${s.monthsNote.match(/~?(\d+)-month/)?.[1] ?? 'sixteen'} months against ${s.months} for the August entry. Fewer months mean less salary given up for a person earning ${K.ref()}, about ${K.usd(Math.round(K.MODEL.refSalary / 12))} for each month saved, though the school does not publish a separate January budget on the page we read.` },
  ],
  related: ['school:nyu-stern', 'school:chicago-booth', 'school:wharton', 'best-mba-finance', 'best-mba-investment-banking', 'compare-mba'],
});
