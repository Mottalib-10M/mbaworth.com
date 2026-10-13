import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'melbourne-mbs';
const s = K.s(slug);
const o = K.roi(slug);
const m = s.months ?? 23;
const forgone = Math.round((K.MODEL.refSalary * m) / 12);
const dom = /domestic\s+AUD\s+([\d,]+)/i.exec(s.tuition?.cohort ?? '');
const domestic = dom ? Number(dom[1].replace(/,/g, '')) : null;
const agsm = K.s('agsm-unsw');
const agsmT = K.tuitionUsd('agsm-unsw');
const longer = K.schools.filter((x) => x.months !== null && x.months > m).length;
const tUsd = K.tuitionUsd(slug);

export default defineSchool({
  slug,
  title: 'Melbourne Business School MBA 2026: Fees and Missing Data',
  description: `Melbourne Business School MBA 2026: ${K.tuition(slug)} international tuition for ${m} months, about ${tUsd}, and why no salary, living budget or payback is shown.`,
  intro: `A ${m}-month Melbourne MBA priced at ${K.tuition(slug)} for international students, whose school publishes no graduate salary we could use.`,
  resume: `Melbourne Business School, the business school of the University of Melbourne, charges international students ${K.tuition(slug)} for its full-time MBA in 2026, about ${tUsd} at the ECB rate${domestic ? `, and Australian students ${K.money(domestic, 'AUD')}` : ''}. That is all the cost data this page can give. The school publishes no living budget on the pages we could read, and its careers page carries no employment statistics: no salary, no share of graduates in work, no split by industry or region. ${o ? '' : `Without a salary and a budget, our model cannot compute a total cost or a payback for the reference person earning ${K.ref()}, and the school stays out of our rankings.`} What we can say is how long the program keeps you out of work: ${m} months, which at ${K.ref()} a year means about ${K.usd(forgone)} of salary given up before tax${forgone > (K.c(slug).tuition ?? Infinity) ? ', more than the tuition itself' : ''}, a cost the fee alone hides.`,
  body: (h) => `<h2>Nearly two years away from a salary</h2>
<p>The full-time MBA runs ${m} months. ${longer === 0 ? 'No other school in our data runs longer' : `Only ${longer} of the ${K.schools.length} schools in our data run longer`}, and the length shapes the cost more than the fee does. For the reference person on ${K.ref()}, the months without pay add up to about ${K.usd(forgone)}, ${tUsd && forgone > K.c(slug).tuition! ? 'more than the whole tuition' : 'close to the tuition itself'}. Anyone earning more pays proportionally more, and a sponsored candidate whose employer keeps paying a salary pays almost nothing on this line. The mini below converts any salary into what ${m} months away cost you.</p>
${h.mini('forgone')}
<h2>What a careful applicant has to ask the school</h2>
<p>A payback needs three numbers the school does not publish on its open pages. The first is a salary for recent graduates, with its nature: median or average, base or total pay, and for which class. The second is a living budget for ${m} months in Melbourne, including health cover. The third is the share of the class that found work within three months, since a salary describes only those who did. Ask admissions for the latest employment report and check whether it follows a standard such as CSEA, which fixes how the figures are counted.</p>
<p>Once you have a salary, type it in the calculator at the top together with your own estimate of rent and daily costs: the tool then gives the payback that this page cannot. Test a low and a high case, since the gap between them says more than either figure alone, and treat any salary quoted without a class year as an alumni figure rather than a starting one.</p>
<h2>Paying in Australian dollars</h2>
<p>The fee is billed in Australian dollars, so its cost in your currency moves with the exchange rate between the offer and each payment. ${agsmT ? `The other Australian school on this site, ${h.sc('agsm-unsw')}, charges ${agsmT} for a ${agsm.months}-month program and publishes a living budget, which makes it the easier of the two to price.` : ''} For a comparison across Asia and the Pacific on the schools that do publish their outcomes, the ${h.a('best-mba-asia', 'Asia ranking')} uses the same model as every page here.</p>
${h.miniFx()}`,
  faqs: [
    { q: 'How much does the Melbourne Business School MBA cost?', a: `Tuition for the 2026 full-time MBA is ${K.tuition(slug)} for international students${domestic ? ` and ${K.money(domestic, 'AUD')} for domestic students` : ''}, about ${tUsd} at the ECB rate of ${K.day(K.FX_DATE)}. The school publishes no living budget on the pages we read, so the full cost of ${m} months in Melbourne is not known from its own figures.` },
    { q: 'What salary do Melbourne Business School MBA graduates earn?', a: `The school publishes no graduate salary on its careers page, and we found no employment report to read. Figures quoted by third-party rankings are not used on this site. You can still type the salary you expect in the calculator above; for a person on ${K.ref()}, the ${m} months of study alone mean about ${K.usd(forgone)} of pay given up.` },
    { q: 'Why does Melbourne Business School have no payback on this page?', a: `A payback compares the full cost with the salary after the degree. Melbourne Business School publishes neither a living budget nor a graduate salary on the pages we read, so the model has nothing to compute against. It is not ranked for the same reason. Its tuition of ${K.tuition(slug)} is shown so that you can complete the calculation with your own figures.` },
  ],
  related: ['school:agsm-unsw', 'school:nus', 'best-mba-asia', 'mba-cost', 'mba-finder'],
});
