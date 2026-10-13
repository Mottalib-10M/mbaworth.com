import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'notre-dame-mendoza';
const s = K.s(slug);
const o = K.roi(slug)!;
const ord = (n: number) => (n === 1 ? 'first' : `number ${n}`);
const sal = s.emp.salary!;
const largest = [...s.emp.industries].sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0))[0];
const fn = (label: string) => s.emp.functions.find((f) => f.label === label);
const ops = fn('Operations/Logistics'), finF = fn('Finance/Accounting'), gm = fn('General Management'), mkt = fn('Marketing/Sales');
const rkOps = K.rank(slug, 'f-operations'), rkT = K.rank(slug, 'tech'), rkAll = K.rank(slug, 'all');
const intern = s.emp.intern;
const internBack = intern ? Math.round(intern.monthly * K.MODEL.internMonths) : null;
const finSal = s.emp.industries.find((r) => r.key === 'finance')?.salary ?? null;
const conSal = s.emp.industries.find((r) => r.key === 'consulting')?.salary ?? null;
const npvNear = Math.abs(o.npv) < 10000;

export default defineSchool({
  slug,
  title: 'Notre Dame Mendoza MBA 2026: Two-Year Cost, Pay and Payback',
  description: `Notre Dame Mendoza MBA 2026: ${K.direct(slug)} for two years, a ${K.salary(slug)} median base salary for the class of 2025, ${K.share(slug, 'finance')} in finance, and the payback for your salary.`,
  intro: `At Notre Dame Mendoza, finance takes the largest share of the class but pays less than consulting, around a school median of ${K.salary(slug)}.`,
  resume: `The Notre Dame MBA at the Mendoza College of Business costs ${K.direct(slug)} for two years in tuition, program and student fees and the school's living budget, at the ${s.tuition!.cohort} rate counted twice. For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)}${internBack ? `, the summer internship gives back about ${K.usd(internBack)}` : ''}, and the total reaches ${K.usd(o.total)}. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, plus a median signing bonus of ${K.money(s.emp.bonus!.v, 'USD')}. On the median, the model repays the cost ${K.payback(slug)} after graduation, and the ten-year net present value is ${K.npv(slug)}${npvNear ? ', close to zero: over ten years the degree roughly breaks even for the reference person' : ''}. What sets Mendoza apart is the shape of the class: ${K.share(slug, 'finance')} in financial services, ${K.share(slug, 'consulting')} in consulting and ${ops ? `${K.p(ops.pct!)} in operations roles` : 'a large operations group'}${rkOps ? `, ${ord(rkOps.rank)} of ${rkOps.of} schools in our ranking for that function` : ''}.`,
  body: (h) => `<h2>Finance first, but not the best paid</h2>
<p>${largest.key === 'finance' ? 'Financial services was the largest industry for the class of 2025' : 'Financial services was one of the largest industries for the class of 2025'}, ${K.share(slug, 'finance')} of graduates, at a median of ${K.segSalary(slug, 'finance')}. ${finSal && conSal && conSal > finSal ? `Consulting paid more, ${K.segSalary(slug, 'consulting')}, to a smaller group of ${K.share(slug, 'consulting')}.` : ''} The gap tells you what kind of finance jobs these are: ${finF ? `the finance and accounting function took ${K.p(finF.pct!)} of graduates` : 'the finance function is large'}, and the report shows no separate investment banking or private equity line, a segment that ${K.schools.filter((x) => x.emp.segments.some((g) => g.key === 'ib')).length} other schools in our data report on its own. For the reference person, the finance median gives a payback of ${K.payback(slug, 'finance')}, against ${K.payback(slug, 'consulting')} on the consulting median. A candidate who wants a finance career and picks Mendoza for it should type the finance figure in the calculator, not the school median, since it is the lower of the two.</p>
<h2>An operations school in disguise</h2>
<p>${ops ? `${K.p(ops.pct!)} of graduates took operations and logistics roles${ops.salary ? ` at a median of ${K.money(ops.salary, 'USD')}${ops.salary > sal.v ? ', above the school-wide figure' : ''}` : ''}` : 'Operations and logistics is a large function'}${rkOps ? `, which places Mendoza ${ord(rkOps.rank)} of ${rkOps.of} in our operations ranking` : ''}. ${mkt ? `Marketing and sales added ${K.p(mkt.pct!)}` : ''}${gm ? ` and general management ${K.p(gm.pct!)}` : ''}. Technology employed ${K.share(slug, 'tech')} of the class at ${K.segSalary(slug, 'tech')}${rkT ? `, ${ord(rkT.rank)} of ${rkT.of} in our tech ranking` : ''}, and healthcare ${K.share(slug, 'healthcare')}. Named employers range from ${K.listOf(K.employers(slug, 4))} to the large accounting and consulting firms.</p>
${h.miniGoal(slug)}
<h2>What the numbers leave open</h2>
<p>${K.p(s.emp.employed!)} of graduates seeking a job ${s.emp.employedLabel}, which leaves ${K.p(Math.round((100 - s.emp.employed!) * 10) / 10)} without an accepted offer at that point, and the median describes only those who had accepted. The school publishes no class size, no share of international students and no average age on the pages we read, only a median GMAT of ${K.num(s.profile.gmat!)}. ${K.share(slug, 'z-us')} of graduates worked in the United States, fewer than half of them in the Midwest. Tuition is ${K.money(s.tuition!.v / 2, 'USD')} a year and the school says it expects yearly increases, so the second-year bill is likely to exceed the figure counted here. Merit scholarships are reviewed for every applicant, and the top fellowship covers full tuition with a stipend. ${rkAll ? `On the overall model the school ranks ${ord(rkAll.rank)} of ${rkAll.of}.` : ''}</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the Notre Dame Mendoza MBA cost?', a: `Tuition, program and student fees and the school's living budget come to ${K.direct(slug)} for two years at the ${s.tuition!.cohort} rate. The school expects annual increases, so the second year may cost more. Counting the salary given up by a person earning ${K.ref()}${internBack ? ', minus the summer internship pay' : ''}, the total reaches ${K.usd(o.total)}.` },
    { q: 'What is the median salary after a Notre Dame Mendoza MBA?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}${sal.v ? `, with a median signing bonus of ${K.money(s.emp.bonus!.v, 'USD')}` : ''}. Consulting paid ${K.segSalary(slug, 'consulting')}, technology ${K.segSalary(slug, 'tech')} and financial services ${K.segSalary(slug, 'finance')}. ${intern ? `Summer interns in the class of 2026 earned a median of ${K.money(intern.monthly, 'USD')} a month.` : ''} These medians cover graduates who accepted a job and reported pay.` },
    { q: 'How long does it take to pay back a Notre Dame Mendoza MBA?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school median, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax. The ten-year net present value is ${K.npv(slug)}. A consulting salary shortens the payback to ${K.payback(slug, 'consulting')}.` },
    { q: 'Where do Notre Dame Mendoza MBA graduates work?', a: `${K.share(slug, 'finance')} of the class of 2025 went into financial services, ${K.share(slug, 'consulting')} into consulting, ${K.share(slug, 'tech')} into technology and ${K.share(slug, 'healthcare')} into healthcare. ${K.share(slug, 'z-us')} worked in the United States, spread across the Midwest, the Northeast, the South and the West rather than concentrated near the campus in Indiana.` },
  ],
  related: ['school:michigan-ross', 'school:indiana-kelley', 'school:vanderbilt-owen', 'best-mba-usa', 'mba-payback-calculator', 'mba-finder'],
});
