import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'rsm';
const s = K.s(slug);
const o = K.roi(slug);
const ord = (n: number) => (n === 1 ? 'first' : `number ${n}`);
const mf = K.shareRaw(slug, 'manufacturing')!;
const mfAbove = K.schools.filter((x) => x.slug !== slug && (K.shareRaw(x.slug, 'manufacturing') ?? 0) > mf).length;
const conShare = K.shareRaw(slug, 'consulting') ?? 0;
const conBelow = K.schools.filter((x) => x.slug !== slug && K.shareRaw(x.slug, 'consulting') !== null && K.shareRaw(x.slug, 'consulting')! < conShare).length;
const withCon = K.schools.filter((x) => x.slug !== slug && K.shareRaw(x.slug, 'consulting') !== null).length;
const rkEu = K.rank(slug, 'z-europe'), rkLa = K.rank(slug, 'z-latam'), rkAll = K.rank(slug, 'all');
const eu = s.emp.zones.find((z) => z.zone === 'Europe');
const la = s.emp.zones.find((z) => z.zone === 'Latin America');
const industrials = ['ASML', 'Siemens', 'Airbus', 'Unilever', 'Danone'].filter((n) => s.emp.employers.some((e) => e.name === n));
const intake = `${s.tuition!.cohort.replace(/^Intake\s+/i, '')} intake`;
const ppp = /PPP/i.test(s.emp.salary?.note ?? '');
const topKey = (x: typeof s) => [...x.emp.industries].sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0))[0]?.key;
const withInd = K.schools.filter((x) => x.emp.industries.some((r) => r.pct !== null));
const conTop = withInd.filter((x) => topKey(x) === 'consulting').length;
const intlAbove = K.schools.filter((x) => x.slug !== slug && (x.profile.intl ?? 0) > s.profile.intl!).length;

export default defineSchool({
  slug,
  title: 'RSM MBA 2026: Rotterdam Fees, Industry Jobs and Payback',
  description: `RSM MBA 2026: ${K.tuition(slug)} tuition and a ${K.living(slug)} living budget for one year in Rotterdam, an ${K.salary(slug)} average base salary, ${K.share(slug, 'manufacturing')} of graduates in industry, payback.`,
  intro: `${K.share(slug, 'manufacturing')} of RSM's class of 2026 went into manufacturing and industry${mfAbove === 0 ? ', the largest share of any school in our data' : ''}, and only ${K.share(slug, 'consulting')} into consulting.`,
  resume: `The International Full-time MBA at Rotterdam School of Management, Erasmus University, charges ${K.tuition(slug)} for the ${intake}, books and study materials included, plus a ${K.fees(slug)} immigration fee for students from outside the European Union. The school's own budget for a single student in Rotterdam is ${K.living(slug)} for the ${s.months} months, for ${K.direct(slug)} in all. ${o ? `For a person earning ${K.ref()} today, the year without salary brings the total to ${K.usd(o.total)}.` : ''} The class of 2026 reported an ${K.salaryKind(slug)} of ${K.salary(slug)}${ppp ? ', a figure RSM publishes in purchasing-power dollars and that we convert back into euros' : ''}. ${o ? `On that salary the model repays the cost ${K.payback(slug)} after graduation, and the ten-year net present value is ${K.npv(slug)}.` : ''} What sets RSM apart is where graduates go: industry, consumer goods and finance rather than consulting, and mostly to employers in the Netherlands and the rest of Europe.`,
  body: (h) => `<h2>Industry, not strategy firms</h2>
<p>Manufacturing and industrial companies hired ${K.share(slug, 'manufacturing')} of the class at an average of ${K.segSalary(slug, 'manufacturing')}${mfAbove === 0 ? ', a larger share than at any other school in our data' : `; ${mfAbove} other schools in our data send a larger share`}. ${industrials.length ? `The employers RSM names include ${K.listOf(industrials)}.` : ''} Consumer goods and retail took ${K.share(slug, 'consumer')} and financial services ${K.share(slug, 'finance')} at ${K.segSalary(slug, 'finance')}. Consulting, the largest industry at ${conTop} of the ${withInd.length} schools in our data that publish shares, took ${K.share(slug, 'consulting')}${conBelow === 0 ? `, and no other school among the ${withCon} that report it places a smaller share there` : `; only ${conBelow} of the ${withCon} other schools that report it place fewer graduates there`}. For a candidate set on a strategy firm, that is the most important line of this report.</p>
<p>The report groups its small sectors into an "other" line with an average salary of its own, and gives sector salaries only for the larger groups. Consulting is too small a group here to get a salary line, so the calculator cannot test that path on RSM figures.</p>
${h.miniGoal(slug)}
<h2>A salary to read with care</h2>
<p>${ppp ? 'RSM reports its salaries in dollars adjusted for purchasing power, a unit that makes pay in cheaper countries look higher than it is in cash. We convert the figure back into euros with the World Bank factor for the Netherlands, which is the right unit for a graduate who stays there but still an average, not a median, and base pay only.' : 'The salary is an average of base pay, not a median.'} On that figure the gain over the reference salary of ${K.ref()} is small, which is why the payback runs to ${K.payback(slug) ?? 'many years'}${rkAll ? ` and RSM ranks ${ord(rkAll.rank)} of ${rkAll.of} on the overall model` : ''}. Someone earning less before the program sees a much shorter payback in the calculator above.</p>
<h2>An international class that settles in Europe</h2>
<p>The ${s.profile.cohort.toLowerCase()} is ${K.intl(slug)} international${intlAbove === 0 ? ', the highest share in our data' : ''}, from ${K.num(s.profile.countries!)} nationalities, ${K.num(s.profile.age!)} years old on average with ${K.num(s.profile.exp!)} years of experience. ${eu?.pct ? `${K.p(eu.pct)} of graduates took a job in Europe, most of them in the Netherlands` : 'Most graduates stay in Europe'}${rkEu ? `, ${ord(rkEu.rank)} of ${rkEu.of} in our Europe ranking` : ''}; ${la?.pct ? `${K.p(la.pct)} went to Latin America${rkLa ? `, ${ord(rkLa.rank)} of ${rkLa.of} for that region` : ''}` : ''}. Almost all of them changed region to work, so access to the Dutch and European job market is a large part of what the fee buys.</p>
${o ? h.miniPayback(slug) : h.miniFx()}`,
  faqs: [
    { q: 'How much does the RSM full-time MBA cost?', a: `Tuition for the ${intake} is ${K.tuition(slug)}, books included, and students from outside the EU pay a ${K.fees(slug)} immigration fee. The school budgets ${K.living(slug)} for a single student over the ${s.months} months, for ${K.direct(slug)} in all. ${o ? `Counting the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)}.` : ''}` },
    { q: 'What is the average salary after an RSM MBA?', a: `The class of 2026 reported an average base salary of ${K.salary(slug)} once converted from the purchasing-power dollars RSM uses into euros. Manufacturing averaged ${K.segSalary(slug, 'manufacturing')}, technology ${K.segSalary(slug, 'tech')} and finance ${K.segSalary(slug, 'finance')}. The school gives no median and no bonus figure, and ${K.p(s.emp.employed!)} ${s.emp.employedLabel}.` },
    { q: 'Do RSM MBA graduates go into consulting?', a: `Few do. Consulting took ${K.share(slug, 'consulting')} of the class of 2026, against ${K.share(slug, 'manufacturing')} in manufacturing and ${K.share(slug, 'consumer')} in consumer goods and retail. BCG, Accenture and Deloitte appear among the employers, but the school reports no consulting salary of its own, only an average for its group of small sectors.` },
    { q: 'How long does it take to repay an RSM MBA?', a: `${o ? `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school's average salary, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax.` : 'The model cannot compute it.'} The program lasts ${s.months} months, so a candidate earning less than the reference salary gives up less pay and repays sooner.` },
  ],
  related: ['school:insead', 'school:hec-paris', 'school:mannheim', 'best-mba-europe', 'best-mba-one-year', 'mba-finder'],
});
