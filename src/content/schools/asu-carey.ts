import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'asu-carey';
const s = K.s(slug);
const o = K.roi(slug);
const us = K.schools.filter((x) => x.country === 'US' && x.classSize !== null);
const smallest = us.length > 0 && [...us].sort((a, b) => a.classSize! - b.classSize!)[0].slug === slug;
const kind = K.salaryKind(slug);
const an = /^[aeiou]/i.test(kind) ? 'an' : 'a';
const rAll = K.rank(slug, 'all');
const lo = Math.round((K.MODEL.refSalary * 2) / 3), hi = Math.round((K.MODEL.refSalary * 4) / 3);
const pbHigh = o ? K.payback(slug, 'all', lo) : null;
const pbLow = o ? K.payback(slug, 'all', hi) : null;

export default defineSchool({
  slug,
  title: 'ASU Carey MBA 2026: Cost Before Scholarships and Payback',
  description: `ASU Carey full-time MBA 2026: ${K.tuition(slug)} estimated tuition and fees, a ${K.salary(slug)} ${kind}, and a payback of ${K.payback(slug) ?? 'over thirty years'} before any scholarship award.`,
  intro: `A list price of ${K.tuition(slug)} that almost nobody in the class pays in full, and ${an} ${kind} of ${K.salary(slug)} for the ${s.emp.cohort.toLowerCase()}.`,
  resume: `The full-time MBA at Arizona State's W. P. Carey School lists ${K.tuition(slug)} as its estimated tuition and fees for an international student over two years, and the university's graduate budget adds ${K.living(slug) ?? 'an amount it does not publish'} to live in Tempe, for ${K.direct(slug) ?? 'a total it does not state'}. ${o ? `For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)} of salary given up, and the total reaches ${K.usd(o.total)}. The ${s.emp.cohort.toLowerCase()} reported an ${K.salaryKind(slug)} of ${K.salary(slug)}, which repays that total ${K.payback(slug) ?? 'only after thirty years'} after graduation, and the ten-year net present value is ${K.npv(slug)}.` : 'The school publishes no figure that would let us compute a payback.'} Those are list-price results. What makes ASU Carey unusual is that the school says nearly every full-time candidate receives scholarship funding and many get full tuition covered, so for most students the real payback is much shorter than the one above.`,
  body: (h) => `<h2>The list price and the price students pay</h2>
<p>The published price at ASU Carey is mostly a ceiling: by its own account, almost all full-time candidates receive a scholarship, many of them covering the whole of tuition, and the school publishes no average award. The ${K.tuition(slug)} on this page is the international rate for tuition and fees combined; Arizona residents and other US students are quoted lower figures. Because the scholarship is the biggest unknown in the cost, the mini below lets you enter the award in your offer letter and see how much the payback moves.</p>
${h.miniScholarship(slug)}
<h2>A small class and a thin employment page</h2>
<p>The entering class has ${s.classSize !== null ? K.num(s.classSize) : 'few'} students${smallest ? ', the smallest of the American full-time programs on this site' : ''}, with ${K.intl(slug) ?? 'a minority of'} international students and an average of ${s.profile.exp !== null ? K.num(s.profile.exp, 1) : 'several'} years of work experience. The career page gives the ${K.salaryKind(slug)}, the share that ${s.emp.employedLabel} (${s.emp.employed !== null ? K.p(s.emp.employed) : 'not stated'}) and average salaries by US region, but no split of the class by industry or job function, no median and no signing bonus. That is why ASU Carey sits only in our overall ranking${rAll ? `, at number ${rAll.rank} of ${rAll.of}` : ''}, and not in the consulting, finance or tech lists.</p>
<p>An average can sit above or below a median depending on a few very high or very low offers, and with a class this size a handful of graduates decide it. The named employers range from consulting firms to aerospace, semiconductor and consumer goods companies, spread across the Southwest, the West Coast, the Midwest and the Northeast, which suggests a class that does not all head for one city.</p>
${h.miniPayback(slug)}
<h2>Who the payback above fits</h2>
<p>The figure on this page is the reference case: list price, no scholarship and ${K.ref()} of salary before the MBA. ${pbHigh && pbLow ? `At the same price, someone earning ${K.usd(lo)} before the degree would repay it in ${pbHigh}, and someone earning ${K.usd(hi)} in ${pbLow}, because the salary you give up grows with your pay while the average after the MBA stays the same.` : 'A lower salary before the MBA shortens the payback, a higher one lengthens it.'} An Arizona resident with a large award can end up paying a fraction of the list price, and then the comparison with ${h.sc('texas-mccombs')} or ${h.sc('georgia-tech-scheller')} changes completely. Run the ${h.a('mba-payback-calculator', 'payback calculator')} with your own offer before deciding.</p>`,
  faqs: [
    { q: 'How much does the ASU Carey full-time MBA cost?', a: `The school's estimate of tuition and fees for an international student is ${K.tuition(slug)} for the program, and the university budgets ${K.living(slug) ?? 'an unpublished amount'} over two years to live in Tempe, for ${K.direct(slug) ?? 'a total it does not state'}. US and Arizona students are quoted less, and most candidates receive a scholarship, so this is a ceiling rather than the usual bill.` },
    { q: 'What is the average salary after an ASU Carey MBA?', a: `The ${s.emp.cohort.toLowerCase()} reported an ${K.salaryKind(slug)} of ${K.salary(slug)}, and ${s.emp.employed !== null ? K.p(s.emp.employed) : 'most of the class'} ${s.emp.employedLabel}. The school does not publish a median, a signing bonus or salaries by industry. Averages by US region differ, with the West paying more than the Southwest on the school's figures.` },
    { q: 'How long does an ASU Carey MBA take to pay back without a scholarship?', a: `${o ? `At the list price, a person earning ${K.ref()} before the degree repays the ${K.usd(o.total)} total ${K.payback(slug) ?? 'after more than thirty years'} after graduation, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the MBA and ${Math.round(K.MODEL.g0 * 100)}% without.` : 'The school publishes no figure that would let us compute it.'} A full-tuition scholarship cuts that sharply, which is the usual case at this school.` },
    { q: 'Is the ASU Carey MBA class small?', a: `Yes. The ${s.profile.cohort ? s.profile.cohort.toLowerCase() : 'latest class'} has ${s.classSize !== null ? K.num(s.classSize) : 'few'} students${smallest ? ', the smallest of the US full-time programs we cover' : ''}, with ${K.intl(slug) ?? 'some'} international students, ${s.profile.women !== null ? K.p(s.profile.women) : 'a share of'} women and an average age of ${s.profile.age !== null ? K.num(s.profile.age) : 'about thirty'}. A small class means employment shares and averages move a lot from one year to the next.` },
  ],
  related: ['school:texas-mccombs', 'school:georgia-tech-scheller', 'mba-scholarships', 'mba-payback-calculator', 'best-mba-usa'],
});
