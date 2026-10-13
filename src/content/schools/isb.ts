import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'isb';
const s = K.s(slug);
const o = K.roi(slug);
const R = (v: number) => K.money(v, 'INR');
const sal = s.emp.salary!;
const belowRef = sal.usd !== null && sal.usd < K.MODEL.refSalary;
const ages = K.schools.filter((x) => x.profile.age !== null).sort((a, b) => a.profile.age! - b.profile.age!);
const youngest = ages[0]?.slug === slug;
const indian = K.schools.filter((x) => x.country === 'IN' && x.classSize !== null).sort((a, b) => b.classSize! - a.classSize!);
const biggestIn = indian[0]?.slug === slug;
const fnCons = s.emp.functions.find((f) => /consulting/i.test(f.label));
const gst = s.fees?.v ?? 0;
const ahm = K.s('iim-ahmedabad');

export default defineSchool({
  slug,
  title: 'ISB PGP 2026: Hyderabad and Mohali Fees, Average Pay',
  description: `ISB PGP 2026: ${R(s.tuition!.v)} tuition plus ${R(gst)} GST, ${R(s.living!.v)} for campus living, a ${R(sal.v)} average salary, and the payback worked out at your own pay.`,
  intro: `${youngest ? 'The youngest class on this site' : 'A young class'}, average age ${K.num(s.profile.age!)}, in a one-year MBA that ${biggestIn ? 'is also the largest in India' : 'runs on two campuses'}.`,
  resume: `The Post Graduate Programme in Management at the Indian School of Business charges ${R(s.tuition!.v)} in tuition for the ${s.tuition!.cohort.split(' (')[0]} batch, plus ${R(gst)} of goods and services tax on the fee, and ${R(s.living!.v)} for compulsory shared accommodation on campus and the school's estimate of other living costs, for ${K.direct(slug)}${K.directUsd(slug) ? `, about ${K.directUsd(slug)}` : ''}. The class of 2026 reported an ${K.salaryKind(slug)} of ${R(sal.v)}; ISB does not say whether that figure is base pay or a total package, publishes no median, and is not audited under the Indian placement standard. ${belowRef && o ? `In dollars the average is ${K.salaryUsd(slug)}, below the ${K.ref()} the site assumes before an MBA, so the reference payback in the figures above never arrives and says nothing about an Indian applicant. Type your own current salary in the calculator instead, and the result becomes meaningful.` : ''} What sets ISB apart is its class: ${K.num(s.classSize!)} students on the Hyderabad and Mohali campuses, an average age of ${K.num(s.profile.age!)}, ${K.num(s.profile.exp!)} years of experience and ${K.p(s.profile.women!)} women.`,
  body: (h) => `<h2>A one-year MBA for people early in their careers</h2>
<p>${youngest ? `No other school on this site reports a younger class than ISB's average of ${K.num(s.profile.age!)}` : `ISB's class averages ${K.num(s.profile.age!)} years of age`} and ${K.num(s.profile.exp!)} years of work on average: this is a program for people early in their careers, unlike the IIM programs for executives. The ${h.sc('iim-ahmedabad', 'IIM Ahmedabad PGPX')}, for comparison, has an average age of ${ahm.profile.age !== null ? K.num(ahm.profile.age) : 'an unpublished figure'}. A younger class means a lower salary given up during the year, which helps the payback, and more students switching career: the school reports that more than half of the class moved to a new function or a new industry.</p>
<p>Consulting is the first destination, ${K.share(slug, 'consulting')} of offers in the class of 2025, ahead of technology at ${K.share(slug, 'tech')} and banking and financial services at ${K.share(slug, 'finance')}${fnCons ? `; by role, business and strategy consulting took ${K.p(fnCons.pct!)}` : ''}. These are shares of offers rather than of graduates, because ISB lets a student hold two offers. The recruiters named in the placement reports are ${K.listOf(K.employers(slug, 8))}, with the largest hirer making over a hundred offers. International offers are a small fraction of the total, mostly in Southeast Asia, the Middle East and Africa.</p>
${h.miniGoal(slug)}
<h2>Read the average with care</h2>
<p>An average is pulled up by a few large packages, and ISB gives no median to check it against. It also leaves open whether the ${R(sal.v)} includes variable pay. Compare it only loosely with ${h.sc('iim-ahmedabad', 'IIM Ahmedabad PGPX')}'s audited base median of ${ahm.emp.salary ? R(ahm.emp.salary.v) : 'an unpublished amount'}, which is a different measure. In the calculator below, start from what you earn today in dollars, and test the ISB average and a lower figure as your salary after the degree: the gap between the two paybacks shows how much the choice of measure matters.</p>
${o ? h.miniPayback(slug) : h.mini('forgone')}
<h2>Waivers for about a quarter of the class</h2>
<p>ISB says roughly one student in four receives financial support each year, through waivers of a quarter to all of tuition for merit, diversity or need. Need-based waivers cover the whole fee for families on low incomes and most of it for the next income band, and the school offers full waivers to a set number of non-Indian nationals under its Destination India scheme. Only one waiver applies per student, and the school publishes no average award. GST is charged on the fee itself, a line many applicants miss when they compare programs.</p>`,
  faqs: [
    { q: 'How much does the ISB PGP cost?', a: `Tuition for the ${s.tuition!.cohort.split(' (')[0]} batch is ${R(s.tuition!.v)}, with ${R(gst)} of GST on top. Compulsory shared accommodation and the school's estimate of other living costs add ${R(s.living!.v)}, for ${K.direct(slug)} in all. A studio instead of a shared room costs more, and hospital insurance is billed at actual cost.` },
    { q: 'What is the average salary after the ISB PGP?', a: `The class of 2026 reported an average salary of ${R(sal.v)}. ISB publishes no median, does not say whether the figure is base pay or a total package, and is not audited under the Indian placement standard. ${K.share(slug, 'consulting')} of offers to the class of 2025 came from consulting, ${K.share(slug, 'tech')} from technology.` },
    { q: 'How long does the ISB PGP take to pay back?', a: `${o && o.payback === null ? `For the reference person earning ${K.ref()} before the MBA it never does, because the ISB average after the program is lower in dollars.` : `For the reference person earning ${K.ref()}, ${K.payback(slug) ?? 'no payback can be computed'}.`} That reference is far above typical Indian pay at age ${K.num(s.profile.age!)}. Type your current salary in the calculator with the ${R(sal.v)} average as the salary after, and the payback becomes a usable figure.` },
    { q: 'Does ISB offer scholarships for the PGP?', a: `Yes. Roughly a quarter of PGP students receive financial support each year, as waivers of a quarter to all of tuition for merit, diversity or family income, plus full waivers for some non-Indian nationals. One waiver applies per student. A waiver applies to the ${R(s.tuition!.v)} tuition, not to GST or living costs.` },
  ],
  related: ['school:iim-ahmedabad', 'school:iim-bangalore', 'school:iim-lucknow', 'best-mba-asia', 'best-mba-one-year', 'mba-scholarships'],
});
