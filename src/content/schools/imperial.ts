import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'imperial';
const s = K.s(slug);
const o = K.roi(slug);
const G = (v: number) => K.money(v, 'GBP');
const ppp = /PPP/.test(s.emp.salary?.note ?? '');
const ukR = K.rank(slug, 'z-uk'), euR = K.rank(slug, 'z-europe'), techR = K.rank(slug, 'tech');
const lbs = K.s('lbs');
const lbsT = K.tuition('lbs');
const negative = o ? o.npv < 0 : false;
const inside = !!(o && o.payback !== null && o.payback < K.MODEL.horizonYears);
const ext = Number(s.monthsNote.match(/to (\d+) months/)?.[1]) || null;

export default defineSchool({
  slug,
  title: 'Imperial MBA 2026: London Fees, Salary and Payback',
  description: `Imperial College Business School MBA 2026: ${K.tuition(slug)} tuition, ${K.living(slug)} to live in London for a year, a ${K.salary(slug)} average base salary and the payback for you.`,
  intro: `A one-year London MBA where ${K.share(slug, 'z-uk')} of graduates stay in the United Kingdom and ${K.share(slug, 'tech')} join technology firms.`,
  resume: `Imperial Business School charges ${K.tuition(slug)} for its one-year full-time MBA, the same for British and international students, and the fee includes the flights and accommodation of the Global Experience Week. Imperial College's own estimate for a year in London with private accommodation adds ${K.living(slug)}, for ${K.direct(slug)}${K.directUsd(slug) ? `, about ${K.directUsd(slug)}` : ''}. ${o ? `For a person earning ${K.ref()} today, the ${s.months} months away cost ${K.usd(o.forgone)} in salary, and the total reaches ${K.usd(o.total)}.` : ''} The class of 2025 reported an ${K.salaryKind(slug)} of ${K.salary(slug)}${ppp ? ', a figure the school publishes in purchasing-power dollars, which we convert back to pounds' : ''}${o ? `; on that figure the cost is repaid ${K.payback(slug) ?? 'in more than 30 years'} after graduation, and the ten-year net present value is ${K.npv(slug)}` : ''}. Imperial is set apart by where its graduates work: ${K.share(slug, 'z-uk')} stay in the UK${ukR ? `, enough to rank it ${ukR.rank === 1 ? 'first' : ukR.rank} of ${ukR.of} for working there` : ''}. Its open pages publish little else about the class's jobs.`,
  body: (h) => `<h2>A salary published in purchasing-power dollars</h2>
<p>Imperial gives its graduate salary as an average in PPP dollars, rather than in pounds or as a median. ${ppp ? `We convert it to pounds with the World Bank's purchasing-power factor, which gives ${K.salary(slug)}, and then to US dollars at the market rate for the calculator, ${K.salaryUsd(slug)}.` : ''} An average is pulled up by a few high offers, so the typical graduate's salary is probably lower than this figure. The school states it covers graduates seeking work who shared their data.</p>
<p>${negative ? `At that salary the ten-year value is negative for the reference person, ${K.npv(slug)}: discounted over ten years, the gain from the degree does not quite cover what it costs${inside ? ', even though the payback date falls within those ten years' : ''}. A lower current salary, or a scholarship, changes the sign.` : `At that salary the ten-year value is ${K.npv(slug)} for the reference person.`} Type your own salary in the calculator; the payback moves quickly with it.</p>
${o ? h.miniPayback(slug) : h.mini('forgone')}
<h2>What the web page shows, and what sits behind a form</h2>
<p>The class of 2025 page publishes two shares: ${K.share(slug, 'tech')} of graduates in technology${techR ? `, which ranks Imperial ${techR.rank} of ${techR.of} in our ${h.a('best-mba-tech', 'technology ranking')}` : ''}, and ${K.share(slug, 'z-uk')} employed in the UK. The full breakdown by sector, function and region is in a report downloadable only through a form, which we have not used. The employers named, ${K.listOf(K.employers(slug, 7))}, are those of recent years, not of 2025 alone. ${euR ? `For working in Europe, UK included, our ranking places Imperial ${euR.rank} of ${euR.of}.` : ''}</p>
${h.miniGoal(slug)}
<h2>${s.months} months, or ${ext ?? 'longer'} at extra cost</h2>
<p>The program runs ${s.months} months, and students can extend it with an additional term, for an extra tuition fee the page does not state. The living estimate is Imperial College's figure for all its students in London in 2026, not one written for MBA students, and private rents can exceed it. The class profile shows ${K.p(s.profile.women!)} women, students from ${K.num(s.profile.countries!)} countries and an average age of ${K.num(s.profile.age!)}. ${lbsT ? `In the same city, ${h.sc('lbs')} charges ${lbsT} for a longer program of ${lbs.months} months; the ${h.a('best-mba-london', 'London MBA ranking')} compares the schools there on the same model.` : ''}</p>`,
  faqs: [
    { q: 'How much does the Imperial MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${s.tuition!.cohort}, the same for UK and international students, including Global Experience Week travel. Imperial's estimate for a year in London adds ${K.living(slug)}, for ${K.direct(slug)}. ${o ? `With the salary given up by a person earning ${K.ref()}, the total is ${K.usd(o.total)}.` : ''}` },
    { q: 'What salary do Imperial MBA graduates earn?', a: `The class of 2025 reported an average salary that the school publishes in purchasing-power dollars; converted to pounds it is ${K.salary(slug)}, or ${K.salaryUsd(slug)} at the market rate. There is no median and no salary by sector on the open pages. An average is pulled up by the highest offers.` },
    { q: 'Do Imperial MBA graduates stay in the UK?', a: `Most do: ${K.share(slug, 'z-uk')} of the class of 2025 were employed in the UK, the only regional figure on the school's page. ${ukR ? `That share puts Imperial ${ukR.rank === 1 ? 'first' : ukR.rank} of ${ukR.of} in our ranking for working in the UK.` : ''} Graduates who need a visa to stay should check the UK rules before counting on a British salary.` },
    { q: 'How long does the Imperial MBA take to pay back?', a: `${o ? `For a person earning ${K.ref()} before the MBA, ${K.payback(slug) ?? 'more than 30 years'} after graduation on the average salary, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax. ` : ''}The ten-year value is ${negative ? 'slightly negative' : K.npv(slug)} at that salary, so a scholarship or a lower current salary matters.` },
  ],
  related: ['school:lbs', 'school:oxford-said', 'school:cambridge-judge', 'best-mba-london', 'best-mba-one-year'],
});
