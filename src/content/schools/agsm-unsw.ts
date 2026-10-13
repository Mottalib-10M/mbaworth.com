import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'agsm-unsw';
const s = K.s(slug);
const o = K.roi(slug);
const named = s.emp.industries.reduce((t, r) => t + (r.pct ?? 0), 0);
const rest = Math.max(0, 100 - named);
const mel = K.s('melbourne-mbs');
const melT = K.tuitionUsd('melbourne-mbs');

export default defineSchool({
  slug,
  title: 'AGSM UNSW MBA 2026: Sydney Fees, Living Costs and Jobs',
  description: `AGSM UNSW full-time MBA 2026: ${K.tuition(slug)} tuition for ${s.months} months, ${K.living(slug)} a year to live in Sydney, the sectors hiring graduates and why no payback is shown.`,
  intro: `A Sydney MBA of about ${s.classSize ?? 'sixty'} students that costs ${K.direct(slug) ?? K.tuition(slug)} with a year of living costs, and publishes no graduate salary.`,
  resume: `The AGSM full-time MBA at UNSW Business School charges ${K.tuition(slug)} in tuition for its ${s.months}-month program, priced per course, and the university's own estimate for a modest year in Sydney adds ${K.living(slug) ?? 'an amount it does not publish'}, for ${K.direct(slug) ?? 'a total it does not state'} before any salary you give up${K.directUsd(slug) ? ` (about ${K.directUsd(slug)})` : ''}. ${o ? `For a person earning ${K.ref()} today the total reaches ${K.usd(o.total)} and repays in ${K.payback(slug)}.` : `What this page cannot give you is a total cost for the reference person earning ${K.ref()} with a payback date: AGSM states how much salaries rose after the degree but never the salary itself, so there is no figure to repay the cost against.`} The employment page for the ${s.emp.cohort.toLowerCase()} reports that ${s.emp.employed !== null ? K.p(s.emp.employed) : 'most'} of the class ${s.emp.employedLabel}, and names only its ${s.emp.industries.length} largest sectors. The program is small, around ${s.classSize ?? 'sixty'} students a year, a very different room from the large American classes, and one of only ${K.schools.filter((x) => x.country === s.country).length} Australian schools in our data.`,
  body: (h) => `<h2>Priced by the course, in Australian dollars</h2>
<p>AGSM does not quote a yearly fee. It charges per course, and the program total of ${K.tuition(slug)}${K.tuitionUsd(slug) ? `, about ${K.tuitionUsd(slug)} at the ECB rate,` : ''} is the school's estimate for all the courses of the degree at the ${s.tuition?.cohort ?? 'current'} rate. Students who take the extension year pay more, and the school lists no mandatory fee beyond tuition on the pages we read, so health cover and student services charges sit outside the figure. ${melT ? `For comparison, ${h.sc('melbourne-mbs')}, the other Australian school on this site, charges ${melT} for its ${mel.months}-month program.` : ''}</p>
<p>The living figure is the university's lower estimate, for a student on campus who keeps spending modest. Renting your own apartment in Sydney costs noticeably more, so treat ${K.living(slug) ?? 'the budget'} as a floor. Because everything is billed in Australian dollars, the cost in your own currency moves with the exchange rate between the day you accept the offer and the day you pay.</p>
${h.miniFx()}
<h2>What the employment page leaves out</h2>
<p>The ${s.emp.cohort.toLowerCase()} figures name the sectors that hired the most graduates: ${K.share(slug, 'finance') ?? 'a share'} went into financial services, ${K.share(slug, 'tech') ?? 'a share'} into technology and ${K.share(slug, 'consulting') ?? 'a share'} into consulting. Together with media, these named sectors cover ${K.p(named)} of the class; the other ${K.p(rest)} are not broken down. There is no salary level, no split by job function, no list of countries where graduates work and no employer list. With a class this small, a handful of hires can move a sector share by several points from one year to the next.</p>
<p>Without a salary, our ranking cannot place AGSM, and the calculator above needs you to type the salary you expect after the degree. A realistic way to fill it is to look at what the employers you target pay in Sydney for post-MBA roles, then test a low and a high case to see how far apart the two payback dates land.</p>
${h.miniGoal(slug)}
<h2>Who the program suits</h2>
<p>A one-year format keeps the salary you give up to ${s.months} months, which is the main argument for AGSM against a two-year program abroad for someone who wants to stay in Australia. The school publishes no average age, no average experience and no share of international students, so you cannot check from the data who sits next to you in class. If staying in Asia or the Pacific is the plan, the ${h.a('best-mba-asia', 'Asia ranking')} lists the schools that publish placements in the region, and the ${h.a('best-mba-one-year', 'one-year MBA ranking')} compares short programs on the same model.</p>`,
  faqs: [
    { q: 'How much does the AGSM UNSW full-time MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${s.months}-month program at the ${s.tuition?.cohort ?? 'current'} course rate. The university estimates ${K.living(slug) ?? 'an unpublished amount'} a year to live modestly on campus in Sydney, for ${K.direct(slug) ?? 'a total it does not state'} in all. Health cover and other student charges are not included, and renting privately raises the living cost above that estimate.` },
    { q: 'Does AGSM UNSW publish the salary of its MBA graduates?', a: `No. The school reports the rise in salary after the degree but not the salary itself, for the ${s.emp.cohort.toLowerCase()}. That is why this page shows no payback and our ranking leaves the school out. The calculator still works if you type the salary you expect after the MBA in Sydney.` },
    { q: 'Where do AGSM UNSW MBA graduates work after the program?', a: `In the ${s.emp.cohort.toLowerCase()}, ${K.share(slug, 'finance') ?? 'a share'} joined financial services, ${K.share(slug, 'tech') ?? 'a share'} technology and ${K.share(slug, 'consulting') ?? 'a share'} consulting, and ${s.emp.employed !== null ? K.p(s.emp.employed) : 'most'} ${s.emp.employedLabel}. The remaining ${K.p(rest)} of the class is not split by sector, and the school gives no country breakdown, no salary by sector and no employer list for that class.` },
    { q: 'Is the AGSM UNSW MBA a one-year program?', a: `Yes, the full-time MBA runs ${s.months} months, with an optional extension year that adds tuition. The class takes about ${s.classSize ?? 'sixty'} students, small for a full-time MBA. A shorter program means fewer months without salary: at ${K.ref()} a year, every month away costs about ${K.usd(Math.round(K.MODEL.refSalary / 12))} of pay before tax.` },
  ],
  related: ['school:melbourne-mbs', 'best-mba-asia', 'best-mba-one-year', 'mba-cost', 'mba-finder'],
});
