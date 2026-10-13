import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'cuhk';
const s = K.s(slug);
const o = K.roi(slug);
const long = s.monthsNote.match(/or (\d+) months/)?.[1];
const forgone = s.months ? Math.round((K.MODEL.refSalary * s.months) / 12) : null;
const forgoneLong = long ? Math.round((K.MODEL.refSalary * Number(long)) / 12) : null;
const hk = ['hku', 'hkust'].filter((x) => K.schools.some((y) => y.slug === x));
const hkSal = hk.filter((x) => K.s(x).emp.salary !== null);
const rAsia = K.rank(slug, 'z-asia');

export default defineSchool({
  slug,
  title: 'CUHK MBA 2026: Hong Kong Tuition and What Is Not Published',
  description: `CUHK full-time MBA 2026: ${K.tuition(slug)} tuition for ${s.months} or ${long ?? 'more'} months in Hong Kong, about ${K.tuitionUsd(slug)}, with no living budget, class profile or salary data published.`,
  intro: `One fee of ${K.tuition(slug)} for a ${s.months}-month or ${long ?? 'longer'}-month track, and almost nothing else in the open.`,
  resume: `The CUHK full-time MBA lists a single tuition of ${K.tuition(slug)}, about ${K.tuitionUsd(slug)} at the ECB rate, whether you take the ${s.months}-month track or the ${long ?? 'longer'}-month one with an exchange or a dual degree. Beyond that figure, the school's open pages give very little: no budget for living in Hong Kong, no class profile and no current employment report, since the links to its former reports no longer work. ${o ? '' : `Without a living budget or a salary, this page cannot give a total cost for the reference person earning ${K.ref()} or a payback date, and our salary-based rankings leave CUHK out.`} What we can say is what the tuition and the months away add up to: at the reference salary, the ${s.months} months cost ${forgone ? K.usd(forgone) : 'a year'} of pay${forgoneLong ? `, and the longer track ${K.usd(forgoneLong)}` : ''}, before rent and food. The homepage states that ${K.share(slug, 'z-asia') ?? 'most'} of full-time graduates work in Asia, without saying which class.`,
  body: (h) => `<h2>One fee, two lengths</h2>
<p>CUHK charges the same ${K.tuition(slug)} whether the program takes ${s.months} months or ${long ?? 'longer'} with an exchange semester or a second degree. The fee does not change, but the salary you give up does: ${forgone && forgoneLong ? `at ${K.ref()} a year, the longer track costs about ${K.usd(forgoneLong - forgone)} more in pay you do not earn` : 'each extra month away costs a month of salary'}. For most people that makes the shorter track the cheaper one by a wide margin, unless the exchange or the second degree is the reason for choosing CUHK.</p>
<p>Tuition is billed in Hong Kong dollars. The converter below shows the dollar figure at today's rate and the cost in other currencies.</p>
${h.miniFx()}
<h2>What the school does not publish</h2>
<p>We looked for a living budget, a class profile and an employment report on the school's readable pages and found none of them. The class brochure sits behind a form, and the reports for earlier classes now return an error. The only employment figure left in the open is a line on the homepage: ${K.share(slug, 'z-asia') ?? 'most'} of full-time graduates employed in Asia, with no year attached and no salary. An older banner on the same page gave a higher figure for an earlier class, which is a reminder that a headline share without a cohort cannot be compared with anything.</p>
<p>The school site mentions some entry scholarships, but we could not verify their amounts at the source, so we do not list them. ${rAsia ? `On the share placed in Asia alone, CUHK appears at number ${rAsia.rank} of ${rAsia.of} in our ${h.a('best-mba-asia', 'Asia ranking')}, which for regions weighs the share only.` : ''}</p>
${h.miniGoal(slug)}
<h2>How to judge it without the data</h2>
<p>If CUHK is on your list, ask admissions for the latest employment report with the median salary, the share of the class that answered the survey and the split by industry, and for the school's own estimate of living costs. Then type those figures into the calculator above. ${hk.length ? `For a comparison inside Hong Kong, ${hk.map((x) => h.sc(x)).join(' and ')} also have pages here${hkSal.length ? `; ${hkSal.map((x) => K.s(x).short).join(' and ')} ${hkSal.length > 1 ? 'publish' : 'publishes'} a graduate salary` : ', though neither publishes a graduate salary we could use'}.` : ''} The ${h.a('best-mba-one-year', 'one-year MBA ranking')} shows how short programs elsewhere in Asia compare when their data is complete.</p>`,
  faqs: [
    { q: 'How much is the CUHK full-time MBA tuition?', a: `The school lists ${K.tuition(slug)}, about ${K.tuitionUsd(slug)} at the ECB rate, for the ${s.months}-month or ${long ?? 'longer'}-month track. It publishes no separate mandatory fee and no living budget on the pages we read, so rent, food and travel in Hong Kong come on top and depend on your own choices.` },
    { q: 'What salary do CUHK MBA graduates earn?', a: `CUHK publishes no current graduate salary. Its former employment reports are no longer online, and the only figure on the homepage is that ${K.share(slug, 'z-asia') ?? 'most'} of full-time graduates work in Asia, with no year given. Ask admissions for the latest report before comparing CUHK with schools that publish a median.` },
    { q: 'Is the longer CUHK MBA track worth the extra months?', a: `The fee is the same ${K.tuition(slug)} for both tracks, so the extra cost is the salary you do not earn. ${forgone && forgoneLong ? `For a person earning ${K.ref()} a year, the longer track adds about ${K.usd(forgoneLong - forgone)} of pay given up before tax.` : ''} It makes sense if the exchange or the second degree serves a specific career plan.` },
  ],
  related: ['school:hku', 'school:hkust', 'school:nus', 'best-mba-asia', 'best-mba-one-year', 'mba-employment-report'],
});
