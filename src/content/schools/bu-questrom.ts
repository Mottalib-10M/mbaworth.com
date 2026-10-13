import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'bu-questrom';
const s = K.s(slug);
const o = K.roi(slug);
const hc = K.schools.filter((x) => K.shareRaw(x.slug, 'healthcare') !== null).sort((a, b) => K.shareRaw(b.slug, 'healthcare')! - K.shareRaw(a.slug, 'healthcare')!);
const hcFirst = hc[0]?.slug === slug;
const usIntl = K.schools.filter((x) => x.country === 'US' && x.profile.intl !== null).sort((a, b) => b.profile.intl! - a.profile.intl!);
const intlFirst = usIntl[0]?.slug === slug;
const rHc = K.rank(slug, 'healthcare'), rUs = K.rank(slug, 'z-us');
const bonus = s.emp.bonus;
const breakEven = (() => { for (let v = 40000; v <= 200000; v += 5000) { const pb = K.roi(slug, 'all', v)?.payback; if (pb === null || pb === undefined || pb > 5) return v - 5000; } return null; })();

export default defineSchool({
  slug,
  title: 'BU Questrom MBA 2026: Healthcare Jobs, Cost and Payback',
  description: `BU Questrom MBA 2026: ${K.share(slug, 'healthcare')} of graduates in healthcare, a ${K.salary(slug)} ${K.salaryKind(slug)}, ${K.direct(slug)} for two years in Boston, and the payback for your own salary.`,
  intro: `${hcFirst ? 'The largest healthcare share of any school on this site' : `${K.share(slug, 'healthcare')} of the class in healthcare`}, and a payback that depends heavily on the scholarship in your offer.`,
  resume: `Two years of the full-time MBA at Boston University's Questrom School cost ${K.direct(slug)} in tuition, university fees and the school's living budget, which already includes the student health plan. ${o ? `For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)} of salary given up, for a total of ${K.usd(o.total)}. The ${s.emp.cohort.toLowerCase()} reported a ${K.salaryKind(slug)} of ${K.salary(slug)}${bonus ? ` and a median signing bonus of ${K.money(bonus.v, bonus.cur)}` : ''}, which repays that total ${K.payback(slug) ?? 'only after thirty years'} after graduation; the ten-year net present value is ${K.npv(slug)}.` : 'The school publishes no figure that would let us compute a payback.'} Those numbers assume the full list price. The school says the large majority of its entering class receives a merit scholarship, so most students start from a lower cost. What sets Questrom apart is the class itself: ${K.intl(slug) ?? 'a large share'} international, and ${K.share(slug, 'healthcare')} of graduates going into healthcare, next to ${K.share(slug, 'tech')} in technology.`,
  body: (h) => `<h2>Healthcare and technology, not Wall Street</h2>
<p>Questrom's report leans away from finance. Technology took ${K.share(slug, 'tech')} of graduates and healthcare ${K.share(slug, 'healthcare')}${hcFirst ? ', the highest healthcare share of any school in our data' : ''}, while finance took only ${K.share(slug, 'finance') ?? 'a small share'} and consulting ${K.share(slug, 'consulting') ?? 'a small share'}. The school publishes no salary by industry, so our healthcare ranking places it ${rHc ? `number ${rHc.rank} of ${rHc.of}` : 'without a sector salary'}: the share is high, but the school-wide median of ${K.salary(slug)} stands in for every sector, which weighs on its place in that list.</p>
<p>By function, marketing and sales came first, ahead of finance and accounting. The named employers mix technology, pharmaceuticals and banking, with no hire counts. Almost everyone stayed in the country, ${K.share(slug, 'z-us')} of those who took a job${rUs ? `, which puts Questrom number ${rUs.rank} of ${rUs.of} in our ranking for working in the United States` : ''}.</p>
${h.miniGoal(slug)}
<h2>Why the salary figure deserves a second look</h2>
<p>${s.emp.response !== null ? `The survey reached ${K.p(s.emp.response)} of the class, but` : 'The report says that'} only about half of the graduates who accepted a job told the school their salary, so the median rests on a smaller group than the response rate suggests. The report also splits pay by the student's citizenship, and international students reported a higher median than domestic students. With a class of ${s.classSize !== null ? K.num(s.classSize) : 'modest size'}, a few offers can move the median from one year to the next.</p>
<h2>The salary at which the degree still pays</h2>
<p>At the reference salary the payback runs long, because the school-wide median after the degree is not far above a strong pre-MBA salary. ${breakEven ? `On the model, the payback stays within five years only for someone earning up to about ${K.usd(breakEven)} before the MBA, at list price.` : ''} Every dollar of scholarship shortens it, which is why the offer letter matters so much here: a merit award of a quarter of tuition is worth more than a year of raises after the degree. Type your own salary and expected post-MBA pay below, and compare with ${h.sc('cmu-tepper')} or ${h.sc('emory-goizueta')} for a healthcare goal.</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the BU Questrom full-time MBA cost?', a: `Tuition for the two years is ${K.tuition(slug)}, university fees add ${K.fees(slug) ?? 'a small amount'}, and the school's living budget of ${K.living(slug)} includes the health plan, for ${K.direct(slug)}. Year two is estimated at the first-year rate. Most entering students receive a merit scholarship, so the price actually paid is usually lower.` },
    { q: 'What salary do BU Questrom MBA graduates earn?', a: `The ${s.emp.cohort.toLowerCase()} reported a ${K.salaryKind(slug)} of ${K.salary(slug)}${bonus ? ` and a median signing bonus of ${K.money(bonus.v, bonus.cur)}` : ''}. ${s.emp.employed !== null ? `${K.p(s.emp.employed)} ${s.emp.employedLabel}.` : ''} Only about half of the graduates with a job reported their pay, and the school gives no salary by industry, so treat the median as a rough guide.` },
    { q: 'Is BU Questrom a good MBA for a career in healthcare?', a: `${K.share(slug, 'healthcare')} of the ${s.emp.cohort.toLowerCase()} went into healthcare${hcFirst ? ', the largest share of any school we cover' : ''}, and the employer list includes several pharmaceutical groups. Without a healthcare salary, our ranking uses the school-wide median of ${K.salary(slug)}${rHc ? ` and places Questrom number ${rHc.rank} of ${rHc.of}` : ''}. Check pay in the roles you target with the employers directly before relying on that median.` },
    { q: 'How international is the BU Questrom MBA class?', a: `In the school's latest profile (${s.profile.cohort || 'current class'}), the class is ${K.intl(slug) ?? 'largely'} international${intlFirst ? ', the highest share of any American program on this site' : ''}, with ${s.profile.women !== null ? K.p(s.profile.women) : 'many'} women and an average of ${s.profile.exp !== null ? K.num(s.profile.exp) : 'several'} years of experience. Yet ${K.share(slug, 'z-us')} of graduates who took a job stayed in the United States, so most international students use the degree to start a career there.` },
  ],
  related: ['school:emory-goizueta', 'school:cmu-tepper', 'school:asu-carey', 'mba-scholarships', 'best-mba-usa', 'mba-salary'],
});
