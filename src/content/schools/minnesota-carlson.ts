import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'minnesota-carlson';
const s = K.s(slug);
const o = K.roi(slug)!;
const ord = (n: number) => (n === 1 ? 'first' : `number ${n}`);
const largest = [...s.emp.industries].sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0))[0];
const hcShare = K.shareRaw(slug, 'healthcare')!;
const hcAbove = K.schools.filter((x) => x.slug !== slug && (K.shareRaw(x.slug, 'healthcare') ?? 0) > hcShare).length;
const rkCon = K.rank(slug, 'consumer'), rkUs = K.rank(slug, 'z-us');
const fn = (label: string) => s.emp.functions.find((f) => f.label === label);
const mkt = fn('Marketing & Sales'), fin = fn('Finance/Accounting'), cons = fn('Consulting');
const award = s.scholarship.v;
const local = ['Medtronic', 'Boston Scientific', 'Ecolab', 'Target Corporation'].filter((n) => s.emp.employers.some((e) => e.name === n));
const yearRate = s.tuition!.v / 2;
const awardShare = award ? Math.round(((award * 2) / s.tuition!.v) * 100) : null;
const withEmp = K.schools.filter((x) => x.emp.employed !== null);
const higherEmp = withEmp.filter((x) => x.emp.employed! > s.emp.employed!).length;
const perGrad = 100 / s.classSize!;

export default defineSchool({
  slug,
  title: 'Minnesota Carlson MBA 2026: Healthcare Jobs, Cost, Payback',
  description: `Minnesota Carlson MBA 2026: ${K.direct(slug)} for two years, a ${K.salary(slug)} average base salary, ${K.share(slug, 'healthcare')} of graduates in healthcare, and the payback for your salary.`,
  intro: `Healthcare, not consulting or finance, was the largest destination of the Carlson class of 2025, which reported an average base salary of ${K.salary(slug)}.`,
  resume: `The Carlson full-time MBA at the University of Minnesota costs ${K.direct(slug)} over two years in tuition, fees and the school's living budget, at the ${s.tuition!.cohort} rate for non-residents and international students counted twice. For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)}, for a total of ${K.usd(o.total)}. The class of 2025 reported an ${K.salaryKind(slug)} of ${K.salary(slug)}; Carlson publishes averages only. On that figure the model repays the cost ${K.payback(slug)} after graduation and leaves a ten-year net present value of ${K.npv(slug)}, before any scholarship. Scholarships change that picture: ${award ? `the school reports an average award of ${K.money(award, 'USD')} a year, given to nearly all of a recent class` : 'the school reports awards for nearly all of a recent class'}. What sets Carlson apart is where graduates go: ${K.share(slug, 'healthcare')} into healthcare and ${K.share(slug, 'consumer')} into consumer goods and retail, with medical device makers and retailers among the named hirers.`,
  body: (h) => `<h2>Medical devices, retail and the Twin Cities</h2>
<p>${largest.key === 'healthcare' ? `Healthcare was the largest industry in the Carlson report` : `Healthcare was one of the largest industries in the Carlson report`}, ${K.share(slug, 'healthcare')} of graduates at an average of ${K.segSalary(slug, 'healthcare')}. ${hcAbove === 0 ? 'No other school in our data sends a larger share of its class there' : `Only ${hcAbove} ${hcAbove === 1 ? 'school' : 'schools'} in our data ${hcAbove === 1 ? 'sends' : 'send'} a larger share of its class there`}. ${local.length ? `The employers the school flags as top hirers of 2025 include ${K.listOf(local)},` : 'The school flags its top hirers without counts,'} and ${K.share(slug, 'z-us')} of graduates stayed in the United States. ${rkCon ? `Consumer goods and retail add ${K.share(slug, 'consumer')}, enough for ${ord(rkCon.rank)} of ${rkCon.of} in our consumer ranking.` : ''}</p>
<p>By function the picture shifts towards marketing: ${mkt ? `${K.p(mkt.pct!)} of graduates took marketing and sales roles` : 'marketing and sales is the largest function'}${mkt?.salary ? ` at an average ${K.money(mkt.salary, 'USD')}` : ''}, ${fin ? `${K.p(fin.pct!)} finance or accounting` : 'then finance'}${fin?.salary ? ` at ${K.money(fin.salary, 'USD')}` : ''}, and ${cons ? `${K.p(cons.pct!)} consulting` : 'a smaller group consulting'}${cons?.salary ? ` at ${K.money(cons.salary, 'USD')}` : ''}. The consulting salary is far above the rest, which is why the payback on that path, ${K.payback(slug, 'consulting')}, is much shorter than on the school-wide average.</p>
${h.miniGoal(slug)}
<h2>A small class with uneven outcomes</h2>
<p>The report covers ${K.num(s.classSize!)} graduates, and ${K.p(s.emp.employed!)} of those seeking a job ${s.emp.employedLabel}. ${higherEmp} of the ${withEmp.length} schools in our data that publish this rate report a higher one, and the school's own split shows why: students without US work authorization accepted offers far less often than those with it. An international applicant should read that line of the report before counting on an American salary. With a class this size, each graduate is worth about ${K.p(Math.round(perGrad * 10) / 10)} of the class, so the industry figures can swing from one year to the next. The school publishes means rather than medians throughout, and a mean in a small class is easily moved by one or two very high or very low offers.</p>
<h2>What a scholarship does to the payback</h2>
<p>Tuition runs ${K.money(yearRate, 'USD')} a year for non-residents; Minnesota residents and students from reciprocity states pay a lower rate. ${award ? `With an average award of ${K.money(award, 'USD')} a year, an average scholarship covers about ${K.p(awardShare!)} of the non-resident tuition over the two years.` : ''} The payback above ignores it, because the award varies by student. Type the amount of your own offer below, as a total for the program, to see how much sooner the degree repays.</p>
${h.miniScholarship(slug)}`,
  faqs: [
    { q: 'How much does the Minnesota Carlson MBA cost?', a: `At the ${s.tuition!.cohort} non-resident rates, tuition, fees and the school's living budget come to ${K.direct(slug)} for two years. Counting the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)} before scholarships. ${award ? `The school reports an average award of ${K.money(award, 'USD')} a year,` : 'Most students receive an award,'} which lowers the bill for most of the class.` },
    { q: 'What do Minnesota Carlson MBA graduates earn?', a: `The class of 2025 reported an average base salary of ${K.salary(slug)}; Carlson publishes no median. Consulting paid an average of ${K.segSalary(slug, 'consulting')}, healthcare ${K.segSalary(slug, 'healthcare')} and financial services ${K.segSalary(slug, 'finance')}. Signing bonuses averaged ${K.money(s.emp.bonus!.v, 'USD')} for those who received one, a figure the payback on this page does not count.` },
    { q: 'How long does it take to repay a Minnesota Carlson MBA?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school's average salary, with no scholarship and raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree against ${Math.round(K.MODEL.g0 * 100)}% without, before tax. On the consulting average the payback drops to ${K.payback(slug, 'consulting')}. A scholarship shortens both.` },
    { q: 'Which industries hire Minnesota Carlson MBA graduates?', a: `Healthcare took ${K.share(slug, 'healthcare')} of the class of 2025, consumer goods and retail ${K.share(slug, 'consumer')}, consulting ${K.share(slug, 'consulting')} and financial services ${K.share(slug, 'finance')}. ${local.length ? `Top hirers flagged by the school include ${K.listOf(local.slice(0, 3))}.` : ''} ${K.share(slug, 'z-us')} of graduates took a job in the United States, most of them in the Midwest.` },
  ],
  related: ['school:michigan-ross', 'school:bu-questrom', 'school:vanderbilt-owen', 'mba-scholarships', 'best-mba-usa', 'mba-finder'],
});
