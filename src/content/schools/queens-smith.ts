import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'queens-smith';
const s = K.s(slug);
const o = K.roi(slug);
const ord = (n: number) => (n === 1 ? 'first' : `number ${n}`);
const sal = s.emp.salary!;
const refCad = Math.round(K.MODEL.refSalary / K.FX.CAD / 1000) * 1000;
const belowRef = (sal.usd ?? 0) < K.MODEL.refSalary;
const rkCa = K.rank(slug, 'z-canada');
const banks = ['RBC', 'Scotiabank', 'BMO Financial Group', 'CIBC', 'TD Bank Group'].filter((n) => s.emp.employers.some((e) => e.name === n));
const fn = (label: string) => s.emp.functions.find((f) => f.label === label);
const finF = fn('Finance'), acc = fn('Accounting');
const low = Math.round((sal.usd! * 0.6) / 1000) * 1000;
const intake = s.tuition!.cohort;
const perGrad = Math.round((100 / s.classSize!) * 10) / 10;
const lowCase = K.payback(slug, 'all', low);

export default defineSchool({
  slug,
  title: "Queen's Smith MBA 2026: Kingston Fees and Canadian Pay",
  description: `Queen's Smith MBA 2026: ${K.tuition(slug)} all-inclusive fee for international students, a ${K.salary(slug)} average base salary, ${K.share(slug, 'z-canada')} hired in Canada, and the payback.`,
  intro: `A ${s.months}-month MBA in Kingston, Ontario, whose class of 2025 reported an average base salary of ${K.salary(slug)} and stayed ${K.share(slug, 'z-canada')} in Canada.`,
  resume: `Smith School of Business at Queen's University charges international students an all-inclusive fee of ${K.tuition(slug)} for its ${s.months}-month MBA, ${intake}, covering books, case materials and executive coaching, plus about ${K.fees(slug)} of student activity fees; Canadian students pay less. The school's estimate of a year of living in Kingston is ${K.living(slug)}, the middle of its range, for ${K.direct(slug)} in all. ${o ? `For the reference person earning ${K.ref()} today, the total reaches ${K.usd(o.total)}.` : ''} The class of 2025 reported an ${K.salaryKind(slug)} of ${K.salary(slug)}, about ${K.salaryUsd(slug)}. ${o && belowRef ? `That is less than the ${K.ref()} our reference person already earns, so the model's payback for that person stretches to ${K.payback(slug) ?? 'over 30 years'}: the result says more about the reference salary than about the school.` : o ? `The model repays the cost ${K.payback(slug)} after graduation.` : ''} What sets Smith apart is its market: ${K.share(slug, 'z-canada')} of graduates took jobs in Canada, most of them in Toronto, with the large Canadian banks among the main employers.`,
  body: (h) => `<h2>Read the payback in Canadian dollars</h2>
<p>Our rankings price every school for one reference person, earning ${K.ref()} before the MBA, about ${K.money(refCad, 'CAD')}. The Smith class is early in its career, arriving at ${K.num(s.profile.age!)} years of age on average with about ${K.num(s.profile.exp!)} years of work experience. For that person, an average post-MBA salary of ${K.salary(slug)} is ${belowRef ? 'a pay cut' : 'a small raise'}, which is why the reference payback looks so long${rkCa ? ` even though Smith ranks ${ord(rkCa.rank)} of ${rkCa.of} for placing graduates in Canada` : ''}. Type your own current salary in the calculator at the top: ${lowCase ? `for someone earning ${K.usd(low)} today, the same school average gives a payback of ${lowCase}.` : 'a lower current salary shortens the payback sharply.'} The program lasts ${s.months} months, so the salary given up is one year of pay, and for a Canadian candidate the fairer test compares a Canadian salary before the program with the Canadian average after it.</p>
${h.miniPayback(slug)}
<h2>Finance and the big Canadian banks</h2>
<p>Financial services took ${K.share(slug, 'finance')} of the class at an average of ${K.segSalary(slug, 'finance')}${finF ? `, and finance was the largest function at ${K.p(finF.pct!)}` : ''}${acc ? `, with accounting roles adding ${K.p(acc.pct!)}` : ''}. ${banks.length ? `The employers the school names include ${K.listOf(banks)}, together with consulting firms such as EY-Parthenon and Deloitte.` : ''} Consulting took ${K.share(slug, 'consulting')} at ${K.segSalary(slug, 'consulting')}. The best paid sectors were small: healthcare at ${K.segSalary(slug, 'healthcare')} for ${K.share(slug, 'healthcare')} of the class and technology at ${K.segSalary(slug, 'tech')} for ${K.share(slug, 'tech')}. A candidate aiming at those sectors should type their average in the salary field, since it sits well above the school-wide figure and shortens the payback. Outside Canada the class is thinly spread, a few graduates each in Asia, the United States, Europe and Latin America, so the report gives no salary for any foreign market.</p>
${h.miniGoal(slug)}
<h2>Scholarships and a small class</h2>
<p>The school reports that most students receive a merit-based entrance scholarship, with awards within a published range, and no average. Any award comes straight off the bill, and with a class of ${K.num(s.classSize!)}, each hire moves a sector share by about ${K.num(perGrad, 1)} points. Outcomes follow the CSEA standard, which hides salaries for groups too small to report. ${K.p(s.emp.employed!)} of graduates ${s.emp.employedLabel}. An optional internship track stretches the program over a longer period for a similar fee.</p>
${h.miniScholarship(slug)}`,
  faqs: [
    { q: "How much does the Queen's Smith MBA cost?", a: `International students pay an all-inclusive program fee of ${K.tuition(slug)} for the ${intake}, plus about ${K.fees(slug)} of activity fees; Canadian students pay less. The school's estimate for a year of living in Kingston is ${K.living(slug)}, for ${K.direct(slug)} in all, about ${K.directUsd(slug)} at the ECB rate of ${K.day(K.FX_DATE)}.` },
    { q: "What do Queen's Smith MBA graduates earn?", a: `The class of 2025 reported an average base salary of ${K.salary(slug)}, about ${K.salaryUsd(slug)}, and an average signing bonus of ${K.money(s.emp.bonus!.v, 'CAD')}. Healthcare averaged ${K.segSalary(slug, 'healthcare')}, technology ${K.segSalary(slug, 'tech')}, consulting ${K.segSalary(slug, 'consulting')} and financial services ${K.segSalary(slug, 'finance')}. Smith publishes averages only, so a few high offers can lift each figure; the bonus is not counted in the payback.` },
    { q: "Why is the Queen's Smith payback so long on this page?", a: `Because the reference person earns ${K.ref()} before the MBA, about ${K.money(refCad, 'CAD')}, ${belowRef ? 'more than' : 'close to'} the ${K.salary(slug)} average after it. ${lowCase ? `For someone earning ${K.usd(low)} before the program, the payback falls to ${lowCase}.` : ''} Type your own salary in the calculator to see your case, in US dollars at the ECB rate.` },
  ],
  related: ['school:ivey', 'school:toronto-rotman', 'best-mba-one-year', 'mba-payback-calculator', 'mba-scholarships', 'mba-finder'],
});
