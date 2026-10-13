import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'nus';
const s = K.s(slug);
const o = K.roi(slug);
const m = s.months ?? 17;
const sal = s.emp.salary;
const salUsd = sal?.usd ?? null;
const belowRef = salUsd !== null && salUsd < K.MODEL.refSalary;
const minM = Number(/(\d+)\s*to/.exec(s.monthsNote)?.[1] ?? 12);
const forgoneMin = Math.round((K.MODEL.refSalary * minM) / 12);
const forgone = Math.round((K.MODEL.refSalary * m) / 12);
const ntu = K.s('ntu-nanyang');
const ntuT = ntu.tuition?.v ?? null;
const cohort = s.emp.cohort.toLowerCase();
const intake = s.tuition!.cohort.replace(/\s*\(.*\)$/, '');
const asia = K.schools.filter((x) => x.region === 'Asia' && x.emp.salary?.usd);
const higherAsia = asia.filter((x) => x.slug !== slug && x.emp.salary!.usd! > (salUsd ?? 0)).length;

export default defineSchool({
  slug,
  title: 'NUS MBA 2026: Singapore Tuition and an Average Salary',
  description: `NUS MBA 2026: ${K.tuition(slug)} tuition for up to ${m} months in Singapore, an ${K.salary(slug)} average post-MBA salary for the ${cohort}, and why no payback is shown.`,
  intro: `NUS reports an ${K.salary(slug)} average salary for its ${cohort}${belowRef ? `, below the ${K.ref()} pre-MBA salary our model assumes` : ''}, on tuition of ${K.tuition(slug)}.`,
  resume: `The NUS full-time MBA charges ${K.tuition(slug)} for the ${intake}, about ${K.tuitionUsd(slug)} at the ECB rate, for a program that runs from ${minM} months up to ${m}. The school mentions mandatory miscellaneous fees without giving an amount, and it publishes no living budget for Singapore, so the direct cost of the degree is not complete from its own figures. On outcomes, the career page reports that ${K.p(s.emp.employed!)} of the ${cohort} ${s.emp.employedLabel} and an average post-MBA salary of ${K.salary(slug)}; it gives no median and does not say whether the figure is base salary or total pay. ${belowRef ? `That average sits below the ${K.ref()} that our reference person earns before the MBA, so for someone already at that level the reported figure would not be a raise.` : ''} ${o ? '' : 'Without a living budget, our model computes no total cost and no payback, and NUS is not ranked.'} What stands out is the gap between a large tuition bill and a modest reported salary, which makes the salary you give up during ${m} months the line to examine first.`,
  body: (h) => `<h2>A salary that needs context</h2>
<p>${sal ? `The ${K.salary(slug)} average is the only salary figure the school publishes for a dated class.` : ''} ${higherAsia === 0 ? `It is the highest average of the Asian schools in our data that publish one` : `${higherAsia} of the ${asia.length - 1} other Asian schools in our data report a higher figure`}, though those figures are not all of the same kind. Two things limit how far it can be read. It is an average, which a few high offers can lift, and the school does not say whether it includes bonuses. It also mixes graduates who stayed in Singapore with those who moved elsewhere, a large share of the class according to the school, without telling you who earned what. A graduate who stays in the region and one who moves to the United States should not plan on the same number.</p>
<p>The career page also quotes an alumni salary three years after graduation and a percentage rise on pre-MBA pay. Neither is a starting salary, so neither is used here. For a calculation, type in the field "Salary after the MBA" what employers in your target market pay for the role you want.</p>
${h.miniFx()}
<h2>The length decides the cost</h2>
<p>NUS lets full-time students finish in ${minM} months or stretch the program to ${m}. The longer route adds months without a salary: at ${K.ref()} a year, ${m} months away cost about ${K.usd(forgone)} before tax, against ${K.usd(forgoneMin)} for ${minM}. ${ntuT !== null ? `${h.sc('ntu-nanyang')}, the other Singapore school on this site with published fees, charges ${K.money(ntuT, 'SGD')} for ${ntu.months} months, ${K.money(Math.round(s.tuition!.v - ntuT), 'SGD')} less than NUS.` : ''} Merit awards are considered for every full-time admit without a separate application, and named scholarships target Singaporeans, Southeast Asian candidates and alumni of local universities.</p>
${h.mini('forgone')}
<h2>What to ask before applying</h2>
<p>Three figures would turn this page into a full cost and payback: a living budget for the length you choose, the amount of the mandatory fees, and a median base salary by region. The class profile page was not readable when we collected the data, so the class size and the share of international students are missing too. Ask admissions for the latest employment report, and compare with the schools in the ${h.a('best-mba-asia', 'Asia ranking')}, which orders them on the share of graduates placed in the region.</p>`,
  faqs: [
    { q: 'How much does the NUS MBA cost?', a: `Tuition for the ${intake} is ${K.tuition(slug)} including goods and services tax, about ${K.tuitionUsd(slug)} at the ECB rate of ${K.day(K.FX_DATE)}. NUS mentions mandatory miscellaneous fees without an amount and publishes no living budget, so the full cost of up to ${m} months in Singapore depends on your own estimate of rent and daily costs.` },
    { q: 'What is the average salary after an NUS MBA?', a: `The school reports an average post-MBA salary of ${K.salary(slug)} for the ${cohort}, without a median and without saying whether bonuses are included. ${K.p(s.emp.employed!)} of that class ${s.emp.employedLabel}. The figure covers graduates in every country, so it is a rough guide rather than a target for any one market.` },
    { q: 'Why is there no payback for the NUS MBA on this page?', a: `A payback needs the full cost, and NUS publishes no living budget for Singapore. Without it, our model cannot add up the bill and does not rank the school. You can still run the calculator above with your own living estimate and the ${K.salary(slug)} average salary, or with the salary you expect in your own market.` },
  ],
  related: ['school:ntu-nanyang', 'school:smu', 'school:hku', 'best-mba-asia', 'mba-salary', 'mba-finder'],
});
