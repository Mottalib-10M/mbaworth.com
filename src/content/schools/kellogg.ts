import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'kellogg';
const s = K.s(slug);
const o = K.roi(slug)!;
const ord = (n: number) => (n === 1 ? 'first' : `number ${n}`);
const top = s.emp.employers.slice(0, 4);
const hires = (n: string) => s.emp.employers.find((e) => e.name === n)?.hires ?? null;
const bcg = hires('Boston Consulting Group'), mck = hires('McKinsey & Company'), bain = hires('Bain & Company');
const mbb = bcg !== null && mck !== null && bain !== null ? bcg + mck + bain : null;
const placed = s.classSize && K.shareRaw(slug, 'consulting') !== null ? Math.round((K.shareRaw(slug, 'consulting')! / 100) * s.classSize) : null;
const fn = (label: string) => s.emp.functions.find((f) => f.label === label);
const mkt = fn('Marketing/Sales'), brand = fn('Brand Management'), pm = fn('Product Management (Tech)');
const rkC = K.rank(slug, 'consulting'), rkM = K.rank(slug, 'f-marketing'), rkPe = K.rank(slug, 'pe');
const pe = s.emp.segments.find((x) => x.key === 'pe');
const noIntern = o.total === o.direct + o.forgone;
const tuitionYear = s.tuition!.v / 2;

export default defineSchool({
  slug,
  title: 'Kellogg MBA 2026: Consulting Pay, Full Cost and Payback',
  description: `Kellogg MBA 2026: ${K.direct(slug)} for two years in Evanston, a ${K.salary(slug)} median base salary, ${K.share(slug, 'consulting')} of graduates in consulting, payback for your pay.`,
  intro: `${K.share(slug, 'consulting')} of Kellogg's class of 2025 went into consulting, and the school reports a ${K.salary(slug)} median base salary on a two-year bill of ${K.direct(slug)}.`,
  resume: `The Kellogg Two-Year MBA costs ${K.direct(slug)} in tuition, mandatory fees and the school's own living budget, before any salary you give up. Tuition is ${K.tuition(slug)}, which is the ${s.tuition!.cohort} rate counted twice, because Northwestern does not publish the second-year rate in advance. For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)} of pay and bring the total to ${K.usd(o.total)}${noIntern ? '; Kellogg reports internship pay by industry only, so no summer earnings are subtracted' : ''}. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, which repays that total ${K.payback(slug)} after graduation and leaves a ten-year net present value of ${K.npv(slug)}. What sets Kellogg apart is how much of the class the strategy firms take: ${K.share(slug, 'consulting')} went into consulting at a ${K.segSalary(slug, 'consulting')} median, and the four largest employers named in the report are ${K.listOf(top.map((e) => e.name))}.`,
  body: (h) => `<h2>Consulting, counted firm by firm</h2>
<p>Kellogg is one of the few schools that prints hire counts next to employer names, and the counts make the consulting pipeline concrete. ${bcg !== null ? `Boston Consulting Group hired ${K.num(bcg)} graduates of the two-year class, ` : ''}${mck !== null ? `McKinsey ${K.num(mck)} ` : ''}${bain !== null ? `and Bain ${K.num(bain)}` : ''}${mbb !== null ? `, ${K.num(mbb)} people between the three firms` : ''}. ${placed !== null ? `With a class of ${K.num(s.classSize!)}, a consulting share of ${K.share(slug, 'consulting')} means roughly ${K.num(placed)} graduates in the industry each year. ` : ''}The consulting median of ${K.segSalary(slug, 'consulting')} sits above the school-wide ${K.salary(slug)}, so this path repays faster than the headline: ${K.payback(slug, 'consulting')} for the reference person, against ${K.payback(slug)} on the overall median. ${rkC ? `That combination puts Kellogg ${ord(rkC.rank)} of ${rkC.of} schools in our ${h.a('best-mba-consulting', 'consulting ranking')}.` : ''}</p>
<p>Finance is smaller than consulting here, ${K.share(slug, 'finance')} of the class, but it pays at least as well where it is concentrated: ${pe?.salary ? `private equity took ${K.p(pe.pct!)} of graduates at a ${K.money(pe.salary, 'USD')} median, the highest line in the report` : 'private equity is reported as its own segment'}${rkPe ? `, enough for ${ord(rkPe.rank)} place of ${rkPe.of} on private equity in our ranking` : ''}.</p>
${h.miniGoal(slug)}
<h2>Marketing and brand roles at a lower salary</h2>
<p>The other side of the Kellogg report is marketing. ${mkt ? `${K.p(mkt.pct!)} of graduates took a marketing or sales function` : 'A large share took marketing or sales roles'}${brand ? `, and ${K.p(brand.pct!)} were hired specifically into brand management` : ''}${pm ? `, next to ${K.p(pm.pct!)} in product management at technology firms` : ''}. ${rkM ? `On the share of the class in marketing roles and what they pay, Kellogg ranks ${ord(rkM.rank)} of ${rkM.of} in our function ranking.` : ''} The catch is pay. Consumer packaged goods paid a ${K.segSalary(slug, 'consumer')} median, well under consulting, and the model puts the payback on that salary at ${K.payback(slug, 'consumer') ?? 'a longer horizon'}. Someone choosing Kellogg for brand management should run the calculator with that figure rather than with the school median.</p>
<h2>What the two-year bill contains</h2>
<p>Tuition runs ${K.money(tuitionYear, 'USD')} a year. The ${K.fees(slug)} of fees cover the university health plan, student services and activity charges for both years plus a one-time first-year fee. The ${K.living(slug)} living budget is the school's own figure for housing, food, books, travel and personal costs near the Evanston campus, with a computer allowance counted once. ${K.share(slug, 'z-us')} of graduates who took a job stayed in the United States, so the salary in the calculator is an American one; ${K.segSalary(slug, 'z-asia') ? `the few who went to Asia reported ${K.segSalary(slug, 'z-asia')}, a figure worth testing if you plan to return there.` : 'the school gives too few non-US salaries to test another market.'}</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the Kellogg Two-Year MBA cost in total?', a: `Tuition, fees and the school's living budget come to ${K.direct(slug)} for the two years, at the ${s.tuition!.cohort} rates counted twice. Add the salary you stop earning: for a person on ${K.ref()} a year, the total reaches ${K.usd(o.total)}. Second-year tuition is usually set higher than the first, so the real bill may end slightly above this figure.` },
    { q: 'How many Kellogg graduates go into consulting?', a: `In the class of 2025, ${K.share(slug, 'consulting')} of graduates who accepted a job went into consulting, at a ${K.segSalary(slug, 'consulting')} median base salary. ${bcg !== null ? `Boston Consulting Group alone hired ${K.num(bcg)} of them, ` : ''}${mck !== null && bain !== null ? `McKinsey ${K.num(mck)} and Bain ${K.num(bain)}. ` : ''}At that salary, the reference person repays the full cost ${K.payback(slug, 'consulting')} after graduation.` },
    { q: 'What is the median salary after Kellogg?', a: `The two-year class of 2025 reported a median base salary of ${K.salary(slug)}, and ${K.p(s.emp.bonus!.pct!)} of accepted offers came with a signing bonus, at a median of ${K.money(s.emp.bonus!.v, 'USD')}. Consumer goods paid less, ${K.segSalary(slug, 'consumer')}, and private equity more${pe?.salary ? `, ${K.money(pe.salary, 'USD')}` : ''}. These figures cover graduates who accepted a job and reported pay.` },
    { q: 'How long does it take to pay back a Kellogg MBA?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school median, with salaries rising ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without it, before tax. On a consulting salary the payback shortens to ${K.payback(slug, 'consulting')}; on a consumer goods salary it lengthens to ${K.payback(slug, 'consumer')}.` },
  ],
  related: ['school:chicago-booth', 'school:michigan-ross', 'school:wharton', 'best-mba-consulting', 'consulting-mbb', 'mba-finder'],
});
