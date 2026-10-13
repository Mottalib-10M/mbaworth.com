import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'texas-mccombs';
const s = K.s(slug);
const o = K.roi(slug)!;
const nth = (r: { rank: number }) => (r.rank === 1 ? 'first' : `number ${r.rank}`);
const usTwo = K.schools.filter((x) => x.country === 'US' && x.twoYear);
const livUs = usTwo.map((x) => K.c(x.slug).living).filter((v): v is number => v !== null);
const livBelow = livUs.filter((v) => v < K.c(slug).living!).length;
const tf = (sl: string) => { const c = K.c(sl); return c.tuition === null ? null : c.tuition + c.fees; };
const tfUs = usTwo.map((x) => tf(x.slug)).filter((v): v is number => v !== null);
const tfBelow = tfUs.filter((v) => v < tf(slug)!).length;
const internBack = K.usd(o.direct + o.forgone - o.total);
const emps = K.schools.map((x) => x.emp.employed).filter((v): v is number => v !== null);
const empBelow = emps.filter((v) => v < (s.emp.employed ?? 0)).length;
const rUs = K.rank(slug, 'z-us'), rCons = K.rank(slug, 'consumer'), rEn = K.rank(slug, 'energy'), rCo = K.rank(slug, 'consulting'), rAll = K.rank(slug, 'all');
const months = s.months ?? 21;

export default defineSchool({
  slug,
  title: 'Texas McCombs MBA 2026: Austin Budget, Pay and Payback',
  description: `Texas McCombs MBA 2026: ${K.tuition(slug)} non-resident tuition, ${K.living(slug)} living budget, ${K.salary(slug)} median base salary, ${K.payback(slug)} payback for a person earning ${K.ref()}.`,
  intro: `${livBelow === 0 ? 'The lowest living budget of any two-year American program on this site' : `A living budget of ${K.living(slug)} for two years`}, and a consulting median of ${K.segSalary(slug, 'consulting')} for the largest group of the class.`,
  resume: `The full-time MBA at the McCombs School of Business in Austin costs ${K.tuition(slug)} in tuition at the non-resident rate, ${K.fees(slug)} of fees and ${K.living(slug)} of living costs on the school's budget, ${K.direct(slug)} in all before any salary is counted. For a person earning ${K.ref()} today, the ${months} months away add ${K.usd(o.forgone)}, the summer internship gives back about ${internBack}, and the total comes to ${K.usd(o.total)}. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, with a median signing bonus of ${K.money(s.emp.bonus!.v, 'USD')}, which repays that total ${K.payback(slug)} after graduation and leaves a ten-year net present value of ${K.npv(slug)}. What sets McCombs apart is a low bill for a two-year American program: only ${tfBelow} of the ${tfUs.length} on this site charge less in tuition and fees, ${livBelow === 0 ? 'and none publishes a lower living budget' : `and ${livBelow} publish a lower living budget`}.`,
  body: (h) => `<h2>${livBelow === 0 ? 'The lowest living budget of the two-year American programs' : 'A living budget below most two-year American programs'}</h2>
<p>Austin is the reason the bill stays down. The school's budget for a single student, ${K.living(slug)} over two years, is ${livBelow === 0 ? 'the lowest' : `lower than all but ${livBelow}`} of the ${livUs.length} two-year American programs on this site that publish one. It is built from the first-year budget counted twice, because the second-year figure is not out yet. Tuition of ${K.tuition(slug)} is the rate for students from outside Texas; Texas residents pay less, and international students pay further fees that the school does not quantify on the page we read, so a candidate on a student visa should expect a slightly higher bill than the one shown.</p>
<p>Even here the salary you stop earning is the largest line. At ${K.ref()} it reaches ${K.usd(o.forgone)}, more than the tuition, and a candidate earning more today sees the payback lengthen, since the median after the MBA stays the same.</p>
${h.miniPayback(slug)}
<h2>Consulting is the largest group and the best paid</h2>
<p>${K.share(slug, 'consulting')} of the class of 2025 went into consulting at a median of ${K.segSalary(slug, 'consulting')}, the highest of any industry in the report. On that salary the payback for the reference person falls to ${K.payback(slug, 'consulting')}${rCo ? `, and McCombs places ${nth(rCo)} of ${rCo.of} in our ${h.a('best-mba-consulting', 'consulting ranking')}` : ''}. Technology is second at ${K.share(slug, 'tech')}, but its median of ${K.segSalary(slug, 'tech')} sits below the school-wide figure, so the payback on a technology career stretches to ${K.payback(slug, 'tech')}. Finance takes ${K.share(slug, 'finance')} at ${K.segSalary(slug, 'finance')}.</p>
<p>Two smaller groups carry the Texas economy into the report. Consumer goods and retail took ${K.share(slug, 'consumer')}${rCons ? `, enough to rank McCombs ${nth(rCons)} of ${rCons.of} for consumer careers` : ''}, and energy ${K.share(slug, 'energy')} at ${K.segSalary(slug, 'energy')}${rEn ? `, ${nth(rEn)} of ${rEn.of} in our energy ranking` : ''}.</p>
${h.miniGoal(slug)}
<h2>A home-state job market, and a slower first three months</h2>
<p>${K.share(slug, 'z-us')} of graduates who took a job stayed in the United States${rUs ? `, which puts McCombs ${nth(rUs)} of ${rUs.of} in our ${h.a('best-mba-usa', 'ranking for working in the United States')}` : ''}. The pace of hiring is the weaker figure: ${K.p(s.emp.employed!)} of job seekers had accepted an offer within three months, and only ${empBelow} school${empBelow === 1 ? '' : 's'} on this site report${empBelow === 1 ? 's' : ''} a lower rate. The school traced ${K.p(s.emp.response!)} of the class, so the rate is not a gap in the survey; more graduates were still deciding at three months than at most programs here. Our whole-class ranking uses that rate as the share of the class placed${rAll ? `, which is why McCombs sits ${nth(rAll)} of ${rAll.of} there despite the low bill` : ''}.</p>`,
  faqs: [
    { q: 'How much does the Texas McCombs MBA cost for two years?', a: `At the non-resident rate, tuition is ${K.tuition(slug)} and fees ${K.fees(slug)}; the school budgets ${K.living(slug)} for living costs, for ${K.direct(slug)} in all. Add ${K.usd(o.forgone)} of salary given up by a person earning ${K.ref()}, take off about ${internBack} of internship pay, and the total reaches ${K.usd(o.total)}. Texas residents pay less tuition.` },
    { q: 'What is the median salary after the Texas McCombs MBA?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)} and a median signing bonus of ${K.money(s.emp.bonus!.v, 'USD')}. Consulting paid the most, ${K.segSalary(slug, 'consulting')}, ahead of finance at ${K.segSalary(slug, 'finance')} and technology at ${K.segSalary(slug, 'tech')}. These are medians of graduates who accepted a job and reported pay, not a forecast for a new student.` },
    { q: 'How long does the Texas McCombs MBA take to pay back?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school-wide median, before tax, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without it. On the consulting median it falls to ${K.payback(slug, 'consulting')}; on the technology median it rises to ${K.payback(slug, 'tech')}.` },
    { q: 'Do Texas McCombs graduates find jobs quickly?', a: `${K.p(s.emp.employed!)} of job seekers in the class of 2025 had accepted an offer within three months of graduation, below most schools on this site; only ${empBelow} report a lower rate. The school traced ${K.p(s.emp.response!)} of its graduates, so the figure is not a survey gap. Almost all hires stayed in the United States, and our whole-class ranking uses that rate as the share of the class placed.` },
  ],
  related: ['school:rice-jones', 'school:vanderbilt-owen', 'school:ucla-anderson', 'best-mba-usa', 'best-mba-consulting', 'mba-payback-calculator'],
});
