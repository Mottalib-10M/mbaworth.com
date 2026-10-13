import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'insead';
const s = K.s(slug);
const o = K.roi(slug);
const E = (v: number) => K.money(v, 'EUR');
const ind = (k: string) => s.emp.industries.find((x) => x.key === k);
const cons = ind('consulting'), fin = ind('finance'), tech = ind('tech');
const months = K.schools.filter((x) => x.months !== null);
const shortest = Math.min(...months.map((x) => x.months!)) === s.months;
const consTop = [...K.schools].filter((x) => K.shareRaw(x.slug, 'consulting') !== null).sort((a, b) => K.shareRaw(b.slug, 'consulting')! - K.shareRaw(a.slug, 'consulting')!);
const cPos = consTop.findIndex((x) => x.slug === slug) + 1;
const meR = K.rank(slug, 'z-me'), latR = K.rank(slug, 'z-latam'), consR = K.rank(slug, 'consulting');
const bonus = s.emp.bonus, intern = s.emp.intern;
const cohort = s.emp.cohort.split(' (')[0];
const sing = s.campuses.find((c) => /Singapore/.test(c));

export default defineSchool({
  slug,
  title: `INSEAD MBA 2026: ${s.months}-Month Cost, Salary and Payback`,
  description: `INSEAD MBA 2026: ${K.tuition(slug)} tuition for ${s.months} months, a ${K.living(slug)} living budget, a ${K.salary(slug)} median annual salary and ${K.share(slug, 'consulting')} of the class hired by consulting firms.`,
  intro: `${shortest ? 'The shortest program on this site' : `A ${s.months}-month program`}, on two campuses, sending ${K.share(slug, 'consulting')} of its graduates into consulting.`,
  resume: `INSEAD charges ${K.tuition(slug)} for its ${s.months}-month MBA, for the ${s.tuition!.cohort}, and the fee already includes health insurance, course materials, student council and alumni subscriptions. The school budgets ${K.living(slug)} for a single student at Fontainebleau over the program, for ${K.direct(slug)}${K.directUsd(slug) ? `, about ${K.directUsd(slug)}` : ''}. ${o ? `For a person earning ${K.ref()} today, ${s.months} months without pay cost ${K.usd(o.forgone)}, and the total reaches ${K.usd(o.total)}.` : ''} The ${cohort.replace(/^Classes/, 'classes')} reported a ${K.salaryKind(slug)} of ${K.salary(slug)}${o ? `, which repays that total ${K.payback(slug) ?? 'in more than 30 years'} after graduation; the ten-year net present value is ${K.npv(slug)}` : ''}. INSEAD's distinction is the consulting pipeline: ${K.share(slug, 'consulting')} of graduates joined consulting firms${cPos > 0 && cPos <= 3 ? `, the ${cPos === 1 ? 'largest' : cPos === 2 ? 'second largest' : 'third largest'} share on this site` : ''}, with the strategy houses at the top of the employer list. Its graduates also scatter widely, with ${K.share(slug, 'z-me')} in the Middle East and Africa.`,
  body: (h) => `<h2>A class of consultants, paid in euros</h2>
<p>The employer list reads like a directory of strategy firms: ${K.listOf(K.employers(slug, 6))}. Consulting took ${K.share(slug, 'consulting')} of the two classes at a median of ${cons?.salary ? E(cons.salary) : 'an unpublished figure'}, against ${fin?.salary ? E(fin.salary) : 'an unpublished figure'} in finance and ${tech?.salary ? E(tech.salary) : 'an unpublished figure'} in technology. ${consR ? `On share, salary and ten-year value, our ${h.a('best-mba-consulting', 'consulting ranking')} places INSEAD ${consR.rank} of ${consR.of}, with the salary converted to dollars at the ECB rate.` : ''}</p>
<p>The salary is labelled as an annual salary on the school's page rather than explicitly as base pay, and it covers the share of the class that reported full salary information. ${bonus ? `Signing bonuses had a median of ${E(bonus.v)}, which the calculator does not add.` : ''} ${s.emp.employed !== null ? `${K.p(s.emp.employed)} of graduates ${s.emp.employedLabel}${s.emp.response !== null ? `, with ${K.p(s.emp.response)} of the class answering the survey` : ''}.` : ''}</p>
${h.miniGoal(slug)}
<h2>${s.months} months, two campuses, two intakes</h2>
<p>INSEAD admits a class in August and another in January, each finishing ${s.months} months later, and students can move between ${sing ? 'Fontainebleau and Singapore' : 'its campuses'}. The short program is the main lever in the cost: at the reference salary, ${o ? `the ${K.usd(o.forgone)} of lost pay is ${o.forgone < K.c(slug).tuition! ? 'less than' : 'more than'} the tuition itself` : 'the salary given up is a smaller line than at a two-year school'}. The Singapore budget is slightly higher than the Fontainebleau one, and a partner adds about a third to living costs according to the school. ${intern ? `Students in the December class can take a summer internship, and those who did reported a median of ${E(intern.monthly)} a month.` : ''}</p>
${o ? h.miniPayback(slug) : h.mini('forgone')}
<h2>Where the class goes</h2>
<p>${K.share(slug, 'z-europe')} of graduates work in Europe, ${K.share(slug, 'z-asia')} in Asia and the Pacific, ${K.share(slug, 'z-me')} in the Middle East and Africa, ${K.share(slug, 'z-latam')} in South America and only ${K.share(slug, 'z-us')} in North America. ${meR ? `The Middle East share ranks INSEAD ${meR.rank === 1 ? 'first' : meR.rank} of ${meR.of} in our ${h.a('best-mba-middle-east', 'Middle East ranking')}` : ''}${latR ? `, and the South American share ${latR.rank} of ${latR.of} for Latin America` : ''}. For anyone aiming at a job in the United States, the payback above is not the right guide. The ${h.a('compare-insead-vs-hec', 'INSEAD and HEC comparison')} and the ${h.a('compare-insead-vs-lbs', 'INSEAD and LBS comparison')} set its report against those of HEC Paris and LBS.</p>`,
  faqs: [
    { q: 'How much does the INSEAD MBA cost in total?', a: `Tuition is ${K.tuition(slug)} for the ${s.tuition!.cohort}, with health insurance included, and the school budgets ${K.living(slug)} to live at Fontainebleau as a single student, for ${K.direct(slug)}. ${o ? `With the salary given up by a person earning ${K.ref()}, the total cost is ${K.usd(o.total)}.` : ''} Singapore living costs are a little higher.` },
    { q: 'What salary do INSEAD MBA graduates earn?', a: `The ${cohort.replace(/^Classes/, 'classes')} reported a median salary of ${K.salary(slug)}${bonus ? `, with a median signing bonus of ${E(bonus.v)}` : ''}. Consulting paid ${cons?.salary ? E(cons.salary) : 'an unpublished median'}, finance ${fin?.salary ? E(fin.salary) : 'an unpublished median'} and technology ${tech?.salary ? E(tech.salary) : 'an unpublished median'}. The figures cover graduates who reported full salary information, and describe past classes rather than a forecast.` },
    { q: 'How long does it take to repay the INSEAD MBA?', a: `${o ? `For a person earning ${K.ref()} before the MBA, ${K.payback(slug) ?? 'more than 30 years'} after graduation, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax. ` : ''}The ten-year value is ${K.npv(slug)} at that salary: the median is in euros, so a lower current salary helps more than at an American school.` },
    { q: 'Is INSEAD a good MBA for a consulting career?', a: `It sends ${K.share(slug, 'consulting')} of its graduates into consulting, at a median of ${cons?.salary ? E(cons.salary) : 'an unpublished figure'}, and the strategy firms lead its employer list. ${consR ? `Our consulting ranking, which weighs share, salary in dollars and ten-year value for the same person, places it ${consR.rank} of ${consR.of}.` : ''} Across all sectors, most graduates work in Europe, Asia or the Middle East rather than the United States.` },
  ],
  related: ['school:hec-paris', 'school:lbs', 'compare-insead-vs-hec', 'compare-insead-vs-lbs', 'best-mba-consulting', 'best-mba-one-year'],
});
