import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'cornell-johnson';
const s = K.s(slug);
const o = K.roi(slug);
const fin = K.schools.filter((x) => K.shareRaw(x.slug, 'finance') !== null).sort((a, b) => K.shareRaw(b.slug, 'finance')! - K.shareRaw(a.slug, 'finance')!);
const finPos = fin.findIndex((x) => x.slug === slug) + 1;
const usFin = fin.filter((x) => x.country === 'US');
const usFinFirst = usFin[0]?.slug === slug;
const rFin = K.rank(slug, 'finance'), rTech = K.rank(slug, 'tech'), rCons = K.rank(slug, 'consulting');
const bonus = s.emp.bonus;
const asia = s.emp.zones.find((z) => z.zone === 'Asia');

export default defineSchool({
  slug,
  title: 'Cornell Johnson MBA 2026: Finance Jobs, Cost and Payback',
  description: `Cornell Johnson two-year MBA 2026: ${K.share(slug, 'finance')} of graduates in finance, a ${K.salary(slug)} ${K.salaryKind(slug)}, ${K.direct(slug)} for two years in Ithaca, and your own payback.`,
  intro: `${usFinFirst ? 'The largest share of graduates going into finance of any American school on this site' : `${K.share(slug, 'finance')} of the class in finance`}, from a campus in upstate New York.`,
  resume: `The two-year MBA at Cornell's Johnson School costs ${K.direct(slug)} in tuition, fees and the school's budget for living in Ithaca, all at the ${s.tuition?.cohort ?? 'current'} because the second-year rate is not yet out. ${o ? `For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)} and the total reaches ${K.usd(o.total)}.` : ''} The ${s.emp.cohort.replace(/\s*\(.*\)/, '').toLowerCase()} reported a ${K.salaryKind(slug)} of ${K.salary(slug)}${bonus ? `, with an average signing bonus of ${K.money(bonus.v, bonus.cur)}` : ''}. ${o ? `That repays the total ${K.payback(slug)} after graduation, with a ten-year net present value of ${K.npv(slug)}.` : ''} What sets Johnson apart is how far the class leans toward finance: ${K.share(slug, 'finance')} of graduates went into financial services${usFinFirst ? ', more than at any other American school in our data' : ''}, and ${K.share(slug, 'consulting')} into consulting, both at the same median. Technology is small and pays less, which matters if that is your goal.`,
  body: (h) => `<h2>A finance pipeline from upstate New York</h2>
<p>${K.share(slug, 'finance')} of the ${s.emp.cohort.replace(/\s*\(.*\)/, '').toLowerCase()} took jobs in financial services at a median of ${K.segSalary(slug, 'finance') ?? 'an unpublished salary'}${finPos ? `, the share that ranks ${finPos === 1 ? 'first' : `number ${finPos}`} of the ${fin.length} schools that publish it` : ''}. By function the picture is the same: finance and investment banking roles took the largest group. ${rFin ? `In our ${h.a('best-mba-finance', 'finance ranking')}, Johnson is number ${rFin.rank} of ${rFin.of}.` : ''} The employer list mixes strategy firms, the big accounting networks and banks known for advisory work, which fits a class that splits between banking and consulting.</p>
<p>Consulting took ${K.share(slug, 'consulting')}, also at ${K.segSalary(slug, 'consulting') ?? 'an unpublished median'}${rCons ? `, number ${rCons.rank} of ${rCons.of} in our consulting ranking` : ''}. That two industries share one median suggests that many offers at banks and large consulting firms land on the same standard figure.</p>
${h.miniGoal(slug)}
<h2>Median and mean tell different stories</h2>
<p>The school also publishes an average base salary, and it sits below the median. When most offers cluster at the standard bank and consulting figure and a tail of lower offers sits in other industries, the median lands on the cluster and the mean is pulled down. Technology is the clearest case: ${K.share(slug, 'tech')} of the class at ${K.segSalary(slug, 'tech') ?? 'a lower median'}${rTech ? `, which puts Johnson number ${rTech.rank} of ${rTech.of} in our tech list` : ''}. ${o ? `For the reference person, aiming at technology stretches the payback to ${K.payback(slug, 'tech') ?? 'more than thirty years'}, against ${K.payback(slug, 'finance') ?? K.payback(slug)} for finance.` : ''}</p>
<p>Offers also differ by work authorization. The school reports that graduates authorized to work in the United States received offers more often than those who were not, a gap worth knowing for the ${K.intl(slug) ?? 'many'} of the class who are international. ${asia?.salary ? `Graduates who went to Asia, ${K.share(slug, 'z-asia')} of the class, reported a median of ${K.money(asia.salary, asia.cur)}.` : ''}</p>
<h2>What two years in Ithaca cost</h2>
<p>Living in Ithaca comes to ${K.living(slug)} on the school's budget for two years, with fees of ${K.fees(slug) ?? 'little'} on top of tuition. ${s.emp.employed !== null ? `${K.p(s.emp.employed)} of job seekers ${s.emp.employedLabel}.` : ''} Compare with ${h.sc('columbia')} or ${h.sc('nyu-stern')} if you would rather recruit for banking from inside New York City.</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the Cornell Johnson two-year MBA cost?', a: `At the ${s.tuition?.cohort ?? 'current'}, tuition for two years is ${K.tuition(slug)}, fees ${K.fees(slug) ?? 'extra'} and the school's living budget ${K.living(slug)}, for ${K.direct(slug)}. ${o ? `With the salary given up by a person earning ${K.ref()}, the total comes to ${K.usd(o.total)}.` : ''} The second-year rate will be set later, so the real bill may be higher.` },
    { q: 'What salary do Cornell Johnson MBA graduates earn in finance?', a: `Financial services hires in the ${s.emp.cohort.replace(/\s*\(.*\)/, '').toLowerCase()} reported a median base salary of ${K.segSalary(slug, 'finance') ?? 'not published'}, the same as the school-wide median of ${K.salary(slug)} and as consulting. ${bonus ? `The average signing bonus was ${K.money(bonus.v, bonus.cur)}.` : ''} Technology hires reported less, ${K.segSalary(slug, 'tech') ?? 'a lower figure'}, and the report gives no separate median for investment banking alone.` },
    { q: 'How long does it take to repay a Cornell Johnson MBA?', a: `${o ? `For a person earning ${K.ref()} before the degree, ${K.payback(slug)} after graduation at the school-wide median, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the MBA and ${Math.round(K.MODEL.g0 * 100)}% without. Aimed at technology, where the median is lower, it takes ${K.payback(slug, 'tech') ?? 'more than thirty years'}, so the goal you pick matters as much as the school.` : 'The school publishes no figure that would let us compute it.'}` },
    { q: 'Is Cornell Johnson good for investment banking?', a: `Finance and investment banking roles took the largest group of the ${s.emp.cohort.replace(/\s*\(.*\)/, '').toLowerCase()}, and financial services took ${K.share(slug, 'finance')} of the class${rFin ? `, which puts Johnson number ${rFin.rank} of ${rFin.of} in our finance ranking` : ''}. The school does not split banking from other finance jobs in its industry figures, so its banking share alone is not published.` },
  ],
  related: ['school:columbia', 'school:nyu-stern', 'school:wharton', 'best-mba-finance', 'best-mba-investment-banking', 'finance-investment-banking'],
});
