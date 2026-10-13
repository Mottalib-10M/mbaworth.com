import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'esmt-berlin';
const s = K.s(slug);
const o = K.roi(slug);
const rEu = K.rank(slug, 'z-europe');
const sal = s.emp.salary;
const forgone = s.months ? Math.round((K.MODEL.refSalary * s.months) / 12) : null;
const womenAbove = K.schools.filter((x) => (x.profile.women ?? 0) > (s.profile.women ?? 100)).length;
const yrs = s.emp.cohort.match(/(\d{4})-(\d{4})/);
const nCls = yrs ? Number(yrs[2]) - Number(yrs[1]) + 1 : null;
const withSal = K.schools.filter((x) => x.emp.salary !== null);
const nMed = withSal.filter((x) => x.emp.salary!.kind === 'base-median').length;
const de = K.schools.filter((x) => x.country === 'DE' && x.slug !== slug);

export default defineSchool({
  slug,
  title: 'ESMT Berlin MBA 2026: Tuition, Total Pay and Jobs in Europe',
  description: `ESMT Berlin full-time MBA 2026: ${K.tuition(slug)} for ${s.months} months, an ${K.salaryKind(slug)} of ${K.salary(slug)} over ${nCls ? K.num(nCls) : 'several'} classes, and the ${K.share(slug, 'z-europe')} of graduates who took jobs in Europe.`,
  intro: `${rEu && rEu.rank === 1 ? 'First in our ranking for working in Europe' : `${K.share(slug, 'z-europe')} of graduates working in Europe`}, from a ${s.months}-month program that starts in January.`,
  resume: `ESMT Berlin charges ${K.tuition(slug)} for its ${s.months}-month full-time MBA, the ${s.tuition?.cohort ?? 'next'} price, about ${K.tuitionUsd(slug)} at the ECB rate. The fee includes books, study materials and the study fees for trips and exchanges, but not travel or accommodation. The school gives only monthly estimates for rent, food, transport and health insurance, never a program total, so this page cannot give a total cost for the reference person earning ${K.ref()} or a payback date. ${sal ? `On pay, it publishes an ${K.salaryKind(slug)} of ${K.salary(slug)}, about ${K.salaryUsd(slug)}, averaged over ${s.emp.cohort.replace(/\s*\(.*\)/, '').toLowerCase()} and rounded; that is total compensation, bonus included, so it is not comparable with the base salary medians that ${nMed} of the ${withSal.length} schools with a salary in our data report.` : ''} What sets ESMT apart is where graduates work: ${K.share(slug, 'z-europe')} stayed in Europe${rEu ? `, number ${rEu.rank} of ${rEu.of} in our Europe ranking` : ''}, from a class that is ${K.intl(slug) ?? 'mostly'} international and ${s.profile.women !== null ? K.p(s.profile.women) : 'half'} women.`,
  body: (h) => `<h2>A pipeline into German and European employers</h2>
<p>${K.share(slug, 'z-europe')} of graduates took jobs in Europe${rEu ? `, which places ESMT ${rEu.rank === 1 ? 'first' : `number ${rEu.rank}`} of ${rEu.of} in our ${h.a('best-mba-europe', 'Europe ranking')}` : ''}; that ranking weighs only the share placed in the region. Past hiring companies named by the school lean toward large German groups in software, insurance and energy, next to a global online retailer. The industry and function split is in the full report, which sits behind a download form, so we cannot show it.</p>
<p>The school also says that most graduates changed industry, role and country at once, and that a notable share started their own business. For someone from outside the European Union who wants to build a career in Germany, that placement record is the strongest argument in the data, stronger than the salary figure.</p>
${h.miniGoal(slug)}
<h2>Why the salary figure needs care</h2>
<p>${sal ? `The ${K.salary(slug)} is an average of total starting pay across ${nCls ? K.num(nCls) : 'several'} graduating classes, rounded by the school. Total pay adds bonuses and other cash to the base, so it sits above a base salary; an average over several years smooths out one weak or strong year; and an average is pulled up by a few high offers more than a median would be.` : 'The school publishes no salary we can use.'} Put together, the figure is a fair signal of the level but not a number to plug into a payback without adjusting. If you use the calculator, enter a base salary you have checked with employers in the city where you want to work.</p>
<h2>Costs the fee leaves out</h2>
<p>Health insurance is compulsory in Germany, and the school warns that students over thirty cannot join the cheaper public student scheme. With an average age of ${s.profile.age !== null ? K.num(s.profile.age) : 'over thirty'} in the class, many students will pay a private or voluntary rate, which may cost more than the school's monthly estimate. Rent is the other large line, with a private room and a whole apartment priced very differently. ${forgone ? `On the salary side, ${s.months} months away cost a person on ${K.ref()} about ${K.usd(forgone)} before tax.` : ''} ${de.length ? `For another German option, see ${de.map((x) => h.sc(x.slug)).join(' and ')}.` : ''}</p>
${h.miniFx()}`,
  faqs: [
    { q: 'How much does the ESMT Berlin full-time MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${s.tuition?.cohort ?? 'next intake'}, about ${K.tuitionUsd(slug)}, including books, materials and study fees for trips. The school publishes monthly estimates for rent, food, transport and health insurance but no total for the ${s.months} months, so living costs in Berlin depend on your own housing choice.` },
    { q: 'What salary do ESMT Berlin MBA graduates earn?', a: `${sal ? `The school states an ${K.salaryKind(slug)} of ${K.salary(slug)}, about ${K.salaryUsd(slug)}, averaged over ${s.emp.cohort.replace(/\s*\(.*\)/, '').toLowerCase()}. It is total compensation rather than base salary and is rounded, so compare it with care against the base salary medians that ${nMed} of the ${withSal.length} schools with a salary in our data publish. It is also too blunt to compute a payback from.` : 'The school publishes no salary we can use.'}` },
    { q: 'Do ESMT Berlin graduates stay in Europe?', a: `Almost all of them: ${K.share(slug, 'z-europe')} took jobs in Europe${rEu ? `, which puts ESMT number ${rEu.rank} of ${rEu.of} in our ranking for working in Europe` : ''}. Past hiring companies named by the school are mostly large German groups. The detailed split by country and industry is only in the gated report.` },
    { q: 'Who studies in the ESMT Berlin MBA class?', a: `The ${s.profile.cohort || 'latest class'} is ${K.intl(slug) ?? 'mostly'} international, from ${s.profile.countries !== null ? K.num(s.profile.countries) : 'many'} nationalities, ${s.profile.women !== null ? K.p(s.profile.women) : 'half'} women${womenAbove <= 3 ? `, a share only ${womenAbove || 'no other'} school${womenAbove === 1 ? '' : 's'} in our data exceed${womenAbove === 1 ? 's' : ''}` : ''}. Students average ${s.profile.age !== null ? K.num(s.profile.age) : 'over thirty'} years of age and ${s.profile.exp !== null ? K.num(s.profile.exp) : 'several'} years of experience. The school does not publish the size of each class, only that it starts every January.` },
  ],
  related: ['school:mannheim', 'school:hec-paris', 'school:rsm', 'best-mba-europe', 'best-mba-one-year', 'mba-salary'],
});
