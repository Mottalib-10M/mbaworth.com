import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.s('uva-darden');
const o = K.roi('uva-darden')!;
const rc = K.rank('uva-darden', 'consulting');
const rall = K.rank('uva-darden', 'all');
const fn = s.emp.functions.find((f) => f.key === 'consulting');
const living = (slug: string) => K.c(slug).living;
const cheaperLiving = K.schools.filter((x) => x.country === 'US' && x.twoYear && living(x.slug) !== null && living(x.slug)! < living('uva-darden')!).length;
const usTwo = K.schools.filter((x) => x.country === 'US' && x.twoYear && living(x.slug) !== null).length;

export default defineSchool({
  slug: 'uva-darden',
  title: 'Darden MBA 2026: UVA Cost, Salary and Time to Repay',
  description: `Darden MBA 2026 at the University of Virginia: ${K.tuition('uva-darden')} tuition, ${K.living('uva-darden')} living budget, ${K.salary('uva-darden')} median salary and the payback for you.`,
  intro: `A two-year program in Charlottesville with one of the highest hiring rates and consulting shares in the reports we read.`,
  resume: `The Darden MBA at the University of Virginia costs ${K.direct('uva-darden')} for two years of tuition, fees and living, counting the second year at the first-year budget the school publishes. For a person earning ${K.ref()}, the salary given up and the summer internship bring the total to ${K.usd(o.total)}. The class of 2025 reported a ${K.salaryKind('uva-darden')} of ${K.salary('uva-darden')}, and ${K.p(s.emp.employed!)} of job seekers had accepted an offer within three months. On those figures the degree pays back ${K.payback('uva-darden')} after graduation, with a ten-year net present value of ${K.npv('uva-darden')}. Consulting is the largest destination, ${K.share('uva-darden', 'consulting')} of the class at ${K.segSalary('uva-darden', 'consulting')}${rc ? `, and Darden comes ${rc.rank === 1 ? 'first' : `number ${rc.rank}`} of ${rc.of} in our consulting ranking` : ''}.`,
  body: (h) => `<h2>A lower living budget than most two-year programs</h2>
<p>Charlottesville is a university town, and the budget shows it: ${K.living('uva-darden')} for two years, ${cheaperLiving === 0 ? 'the lowest' : `lower than all but ${cheaperLiving}`} of the ${usTwo} two-year American programs on this site that publish one. Tuition is not discounted for that: ${K.tuition('uva-darden')} over the program. The saving on rent is real but modest next to the salary you give up, which at the reference salary is the second largest line after tuition.</p>
${h.miniPayback('uva-darden')}
<h2>Consulting first, finance second</h2>
<p>${K.share('uva-darden', 'consulting')} of graduates who took a job went into the consulting industry${fn ? `, and ${K.p(fn.pct!)} hold a consulting job by function, a little more because some consultants work inside companies` : ''}. Finance takes ${K.share('uva-darden', 'finance')} at ${K.segSalary('uva-darden', 'finance')}, technology ${K.share('uva-darden', 'tech')} at ${K.segSalary('uva-darden', 'tech')}. The pay gap between the industries is the reason to pick your goal in the calculator: on the consulting median the payback is ${K.payback('uva-darden', 'consulting')}, on the technology median ${K.payback('uva-darden', 'tech') ?? 'not computable'}.</p>
${h.miniGoal('uva-darden')}
<h2>High placement, almost all in the United States</h2>
<p>${K.p(s.emp.employed!)} of the class seeking a job had accepted an offer three months after graduation${rall ? `, which with salary and ten-year value places Darden ${rall.rank === 1 ? 'first' : `number ${rall.rank}`} of ${rall.of} in our ${h.a('mba-roi', 'whole-class ranking')}` : ''}. ${K.share('uva-darden', 'z-us')} of those jobs were in the United States. For an international student who wants to work at home right after the degree, the payback shown rests on an American salary; the ${h.a('best-mba-europe', 'Europe')} and ${h.a('best-mba-asia', 'Asia')} rankings show which schools place there.</p>`,
  faqs: [
    { q: 'How much does the Darden MBA cost?', a: `Tuition, fees and the school's living budget come to ${K.direct('uva-darden')} for two years, counting the second year at the first-year rate. With the salary you give up, a person earning ${K.ref()} today reaches a total of ${K.usd(o.total)} after the summer internship pay.` },
    { q: 'What salary do Darden graduates earn?', a: `The class of 2025 reported a median base salary of ${K.salary('uva-darden')}. Consulting paid a median of ${K.segSalary('uva-darden', 'consulting')}, finance ${K.segSalary('uva-darden', 'finance')} and technology ${K.segSalary('uva-darden', 'tech')}, according to the school's employment report for that class.` },
    { q: 'Is Darden good for consulting?', a: `${K.share('uva-darden', 'consulting')} of Darden graduates who took a job in 2025 went into consulting, at ${K.segSalary('uva-darden', 'consulting')}. ${rc ? `Our ranking, which weighs that share, the salary and the ten-year value for the same person, places Darden ${rc.rank === 1 ? 'first' : `number ${rc.rank}`} of ${rc.of} schools.` : ''}` },
    { q: 'How quickly does a Darden MBA pay back?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback('uva-darden')} after graduation on the school-wide median, before tax, and ${K.payback('uva-darden', 'consulting')} on the consulting median. A higher current salary lengthens both, since more pay is given up.` },
  ],
  related: ['school:tuck', 'school:duke-fuqua', 'school:michigan-ross', 'best-mba-consulting', 'mba-roi', 'consulting-case-interview'],
});
