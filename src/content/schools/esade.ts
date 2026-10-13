import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'esade';
const s = K.s(slug);
const o = K.roi(slug);
const es = K.schools.filter((x) => x.country === 'ES' && x.slug !== slug && K.c(x.slug).tuition !== null);
const forgone = s.months ? Math.round((K.MODEL.refSalary * s.months) / 12) : null;
const intern = s.emp.intern;
const intlAbove = K.schools.filter((x) => (x.profile.intl ?? 0) > (s.profile.intl ?? 100)).length;

export default defineSchool({
  slug,
  title: 'Esade MBA 2026: Barcelona Fees and the Gated Salary Report',
  description: `Esade full-time MBA 2026: ${K.tuition(slug)} for ${s.months} months in Barcelona, a ${K.intl(slug)} international class, and why this page can show no graduate salary and no payback yet.`,
  intro: `${K.tuition(slug)} for a ${s.months}-month MBA in Barcelona, with an employment report that sits behind a request form.`,
  resume: `Esade charges ${K.tuition(slug)} for its ${s.months}-month full-time MBA, the ${s.tuition?.cohort ?? 'next'} price for tuition, materials, IT and library, plus a ${K.fees(slug) ?? 'small'} student association fee; that is about ${K.tuitionUsd(slug)} at the ECB rate. The fees page gives no living budget for Barcelona, and the employment report for the ${s.emp.cohort.toLowerCase()} is released only through a request form, with no base salary on the open pages. ${o ? '' : `So this page cannot give a total cost for the reference person earning ${K.ref()} or a payback date, and our salary-based rankings leave Esade out.`} The salary the school's careers page does quote comes from a newspaper ranking survey of alumni three years after the degree, which is not a starting salary. What we can state: ${s.emp.employed !== null ? `${K.p(s.emp.employed)} of the class were ${s.emp.employedLabel}` : 'the school reports high employment'}, ${s.months} months away cost a person on ${K.ref()} about ${forgone ? K.usd(forgone) : 'a year'} of pay, and the class is ${K.intl(slug) ?? 'mostly'} international${intlAbove <= 3 ? `, a share only ${intlAbove || 'no other'} school${intlAbove === 1 ? '' : 's'} in our data exceed${intlAbove === 1 ? 's' : ''}` : ''}.`,
  body: (h) => `<h2>What the open pages say, and what they leave out</h2>
<p>Esade publishes three career figures without the form: the share of the ${s.emp.cohort.toLowerCase()} ${s.emp.employedLabel}, ${s.emp.employed !== null ? K.p(s.emp.employed) : 'a high share'}; the share who secured roles internationally, in the school's words, a little over half; and ${intern ? `an average internship pay of ${K.money(intern.monthly, intern.cur)} a month, with no class year attached` : 'no internship pay'}. It also lists the companies that recruited its candidates in recent years, a mix of strategy firms and large technology groups, with no hire counts.</p>
<p>It does not publish a base salary, a split by industry or by region, or a response rate on the open pages. The report itself may contain them, but a document behind a lead form cannot be checked and linked by every reader, so we do not use it. If you request it, look for the median base salary, the share of graduates who reported pay and the share who were seeking a job, then type the median into the calculator above.</p>
${h.mini('forgone')}
<h2>The cost you can already work out</h2>
<p>Tuition is paid in stages, starting with two deposits when you accept and reserve your place, then the balance in two parts during the year. The total does not include rent, food or travel; the school gives no estimate, so build your own from Barcelona prices. On the salary side, a one-year program keeps the pay you give up to ${s.months} months, which is the main cost for anyone earning above about ${s.tuition ? K.usd(Math.ceil(K.c(slug).tuition! / 1000) * 1000) : 'the tuition'} a year.</p>
<p>Esade lists several ways to cut the bill: awards for women, Forte fellowships, an income share agreement backed by the European Investment Fund, and external scholarships for Spanish and Colombian candidates. It publishes no average award and no share of the class that receives one.</p>
${h.miniFx()}
<h2>Against the other Spanish schools</h2>
<p>${es.length ? `${es.map((x) => `${h.sc(x.slug)} charges ${K.tuitionUsd(x.slug)} for ${x.months ?? 'a'} months`).join(', and ')}, against ${K.tuitionUsd(slug)} for Esade.` : ''} The ${h.a('compare-iese-vs-ie', 'IESE and IE comparison')} puts the other two Spanish programs side by side, and the ${h.a('best-mba-europe', 'Europe ranking')} shows which schools publish enough to rank. The class of ${s.classSize !== null ? K.num(s.classSize) : 'about 180'} averages ${s.profile.age !== null ? K.num(s.profile.age) : 'thirty'} years of age and ${s.profile.exp !== null ? K.num(s.profile.exp) : 'several'} years of experience.</p>`,
  faqs: [
    { q: 'How much does the Esade full-time MBA cost?', a: `Tuition and compulsory expenses are ${K.tuition(slug)} for the ${s.tuition?.cohort ?? 'next intake'}, about ${K.tuitionUsd(slug)}, plus a ${K.fees(slug) ?? 'small'} student association fee. The fee covers tuition, materials, IT and library. Living costs in Barcelona for ${s.months} months are extra, and the school publishes no budget for them, so add your own estimate before comparing it with schools that do.` },
    { q: 'What is the average salary after an Esade MBA?', a: `Esade does not publish a starting salary on its open pages; the employment report for the ${s.emp.cohort.toLowerCase()} requires a form. The figure on its careers page comes from alumni three years after graduation, surveyed by a newspaper ranking, so it includes raises and promotions. ${intern ? `Interns earned ${K.money(intern.monthly, intern.cur)} a month on average.` : ''}` },
    { q: 'How international is the Esade MBA class?', a: `The ${s.profile.cohort || 'latest class'} is ${K.intl(slug) ?? 'mostly'} international, according to the school's class profile, with ${s.profile.women !== null ? K.p(s.profile.women) : 'many'} women and an average of ${s.profile.exp !== null ? K.num(s.profile.exp) : 'several'} years of experience. A little over half of the ${s.emp.cohort.toLowerCase()} secured roles internationally, as the school puts it, but it gives no split by country or region.` },
  ],
  related: ['school:iese', 'school:ie', 'compare-iese-vs-ie', 'best-mba-europe', 'best-mba-one-year', 'mba-employment-report'],
});
