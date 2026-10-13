import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'oxford-said';
const s = K.s(slug);
const o = K.roi(slug);
const ord = (n: number) => (n === 1 ? 'first' : `number ${n}`);
const am = s.emp.segments.find((x) => x.key === 'am');
const amOf = (x: typeof s) => x.emp.segments.find((g) => g.key === 'am')?.pct ?? 0;
const amAbove = am ? K.schools.filter((x) => x.slug !== slug && amOf(x) > am.pct!).length : null;
const impact = s.emp.industries.find((r) => r.key === 'nonprofit');
const rkUk = K.rank(slug, 'z-uk'), rkAll = K.rank(slug, 'all');
const lowEnd = /low end/i.test(s.living?.period ?? '');
const finSal = s.emp.industries.find((r) => r.key === 'finance')?.salary ?? 0;
const conSal = s.emp.industries.find((r) => r.key === 'consulting')?.salary ?? 0;
const start = s.tuition!.cohort;
const ukz = s.emp.zones.find((z) => z.zone === 'UK');
const euz = s.emp.zones.find((z) => z.zone === 'Europe');
const minSector = Math.min(...s.emp.industries.filter((r) => r.salary).map((r) => r.salary!));
const intlAbove = K.schools.filter((x) => x.slug !== slug && (x.profile.intl ?? 0) > s.profile.intl!).length;

export default defineSchool({
  slug,
  title: 'Oxford Saïd MBA 2026: One-Year Fees, Average Pay, Payback',
  description: `Oxford Saïd MBA 2026: ${K.tuition(slug)} tuition for a one-year program, a ${K.living(slug)} living estimate, an ${K.salary(slug)} average base salary, and the payback for your own pay.`,
  intro: `A one-year Oxford MBA at ${K.tuition(slug)}, with a class that is ${K.intl(slug)} international${am ? ` and ${K.p(am.pct!)} of graduates hired into investment management` : ''}.`,
  resume: `The Oxford MBA at Saïd Business School charges ${K.tuition(slug)} for the ${start}, with no separate college or association fee found on the official pages. ${s.living ? `For living costs this page uses the University of Oxford's estimate for a single student over ${s.months} months, ${K.living(slug)}${lowEnd ? ', the low end of its range' : ''}, for a direct cost of ${K.direct(slug)}.` : ''} ${o ? `For a person earning ${K.ref()} today, the ${s.months} months without salary bring the total to ${K.usd(o.total)}.` : ''} The class of 2024-25 reported an ${K.salaryKind(slug)} of ${K.salary(slug)}, about ${K.salaryUsd(slug)}, three months after the end of the program; Oxford publishes averages, not medians. ${o ? `On that figure the model repays the cost ${K.payback(slug)} after graduation, and the ten-year net present value is ${K.npv(slug)}.` : ''} What sets Oxford apart is the mix of its graduates: ${K.share(slug, 'finance')} went into financial services${am ? `, ${K.p(am.pct!)} into investment management alone` : ''}, and an impact sector of nonprofits, social enterprises and public bodies has its own line in the report.`,
  body: (h) => `<h2>Investment management and impact</h2>
<p>${am ? `${K.p(am.pct!)} of the class took jobs in investment management${amAbove === 0 ? ', the largest share of any school in our data' : amAbove !== null ? `, a share only ${amAbove} other ${amAbove === 1 ? 'school' : 'schools'} in our data exceed` : ''}.` : ''} Finance as a whole took ${K.share(slug, 'finance')} of graduates at an average of ${K.segSalary(slug, 'finance')}${conSal > finSal ? `, below consulting at ${K.segSalary(slug, 'consulting')} for ${K.share(slug, 'consulting')} of the class` : ''}. Investment banking is a small group, ${K.share(slug, 'ib') ?? 'a few graduates'}, so the finance average describes asset managers, fintech and impact investors more than bankers. ${impact?.salary ? `The impact line, ${K.p(impact.pct!)} of the class, paid ${K.money(impact.salary, 'GBP')} on average${impact.salary === minSector ? ', the lowest of the sector totals' : ''}: a graduate heading there should type that figure in the calculator, not the school average.` : ''}</p>
<p>Oxford reports salaries by sector total only, without sub-sector pay, and the industry shares are percentages of the jobs reported three months after the program. ${K.p(s.emp.employed!)} of graduates seeking a role ${s.emp.employedLabel}; the school counts offers rather than acceptances.</p>
${h.miniGoal(slug)}
<h2>Britain first, then North America and Asia</h2>
<p>${K.share(slug, 'z-uk')} of graduates took a job in the United Kingdom, at an average of ${K.segSalary(slug, 'z-uk')}${rkUk ? `, ${ord(rkUk.rank)} of ${rkUk.of} in our UK ranking` : ''}. North America took ${K.share(slug, 'z-us')} at ${K.segSalary(slug, 'z-us')}, and Asia ${K.share(slug, 'z-asia')} at ${K.segSalary(slug, 'z-asia')}. For the reference person, the American figure repays the degree in ${K.payback(slug, 'z-us') ?? 'a few years'} and the Asian one in ${K.payback(slug, 'z-asia') ?? 'more years than the model counts'}.${euz?.salary && euz.pct !== null ? ` Continental Europe took ${K.p(euz.pct)} of graduates at ${K.money(euz.salary, 'GBP')}${ukz?.salary && Math.abs(euz.salary - ukz.salary) / ukz.salary < 0.05 ? ', close to the British average' : ''}.` : ''} With a class that is ${K.intl(slug)} international${intlAbove === 0 ? ', the highest share in our data bar none' : ` (${intlAbove} ${intlAbove === 1 ? 'school' : 'schools'} in our data report more)`}, the region you aim for decides which of these salaries applies to you.</p>
<h2>A short program with a thin margin</h2>
<p>A ${s.months}-month program keeps the salary given up low, which is the main argument for Oxford against a two-year school. The weak point is the margin between the average salary and the pre-MBA salary of the reference person: on these figures the gain is small enough that the payback runs to ${K.payback(slug) ?? 'many years'}. The living estimate is the low end of the University's range, so a real budget lengthens it further.${rkAll ? ` On the overall model, Oxford ranks ${ord(rkAll.rank)} of ${rkAll.of}.` : ''} Compare with Cambridge in the ${h.a('compare-oxford-vs-cambridge', 'Oxford and Cambridge comparison')}.</p>
${o ? h.miniPayback(slug) : h.mini('forgone')}`,
  faqs: [
    { q: 'How much does the Oxford Saïd MBA cost?', a: `Tuition for the ${start} is ${K.tuition(slug)}. The University's estimate for ${s.months} months of living costs starts at ${K.living(slug)}, for a direct cost of ${K.direct(slug)}. ${o ? `Counting the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)}.` : ''} That is the low end of the University's range, so a student who spends more lengthens the payback.` },
    { q: 'What is the average salary after an Oxford Saïd MBA?', a: `The class of 2024-25 reported an average base salary of ${K.salary(slug)}, about ${K.salaryUsd(slug)}, three months after the program; Oxford gives no median. Consulting averaged ${K.segSalary(slug, 'consulting')}, financial services ${K.segSalary(slug, 'finance')} and technology ${K.segSalary(slug, 'tech')}. The school also reports an average bonus of ${K.money(s.emp.bonus!.v, 'GBP')} without saying what kind; the payback on this page leaves it out.` },
    { q: 'Where do Oxford Saïd MBA graduates work?', a: `${K.share(slug, 'z-uk')} of the class of 2024-25 took a job in the United Kingdom, ${K.share(slug, 'z-us')} in North America, ${K.share(slug, 'z-asia')} in Asia and the rest across continental Europe, the Middle East, Africa, Oceania and Latin America. Pay varied widely by region, from ${K.segSalary(slug, 'z-asia')} on average in Asia to ${K.segSalary(slug, 'z-us')} in North America.` },
    { q: 'How long does an Oxford Saïd MBA take to pay back?', a: `${o ? `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school's average salary, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax.` : 'The model cannot compute it.'} A graduate who works in North America repays much sooner, ${K.payback(slug, 'z-us') ?? 'on a higher salary'}, on the regional average.` },
  ],
  related: ['school:cambridge-judge', 'school:lbs', 'school:insead', 'compare-oxford-vs-cambridge', 'best-mba-one-year', 'best-mba-london'],
});
