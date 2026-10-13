import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'toronto-rotman';
const s = K.s(slug);
const months = s.months ?? 20;
const gone = K.usd((K.MODEL.refSalary * months) / 12);
const intern = s.emp.intern;
const internTxt = intern ? `${K.money(intern.monthly, intern.cur)} a month on average${intern.usd ? ` (about ${K.usd(intern.usd)})` : ''}` : null;

export default defineSchool({
  slug,
  title: 'Toronto Rotman MBA 2026: Fees, Living Costs, Gated Report',
  description: `Toronto Rotman MBA 2026: ${K.tuition(slug)} international tuition (${K.tuitionUsd(slug)}), a ${K.living(slug)} living budget for ${months} months, and no public salary to compute a payback.`,
  intro: `A ${months}-month MBA in Toronto whose tuition and living budget are public while its employment report is sent only on request.`,
  resume: `The Rotman full-time MBA at the University of Toronto lists academic fees of ${K.tuition(slug)} for international students, about ${K.tuitionUsd(slug)}; Canadian students pay less, and university incidental fees come on top without a published amount. The school's minimum living budget for a single student downtown, counted here for the length of the program, gives ${K.living(slug)}, for ${K.direct(slug)} before any salary is counted. A person earning ${K.ref()} today would also give up ${gone} of pay over the ${months} months. The total and the payback stop there: Rotman publishes no base salary for a graduating class, only a three-year average of total pay that includes bonuses, so this site computes no payback and no ten-year value. What sets the program apart is a paid internship built into its ${months} months${internTxt ? `, which paid ${internTxt} for the class of 2025` : ''}.`,
  body: (h) => `<h2>A salary figure that cannot be set beside the others</h2>
<p>Rotman's public pages give one pay figure for its graduates: an average of total compensation, base salary plus bonus and other pay, across three graduating classes. Every school that this site ranks on salary publishes something narrower, a base salary for one class, usually a median. Putting the Rotman figure in the same column would add bonuses that the others leave out and blend three hiring years into one, so we do not use it. The full employment and salary report, with industries and destinations, is sent only to people who fill in a request form, and the last edition that was freely downloadable is several years old.</p>
<p>The consequence on this page is plain. There is no payback, no ten-year value and no place in our rankings for Rotman, and the tables below show no industries or regions. The cost lines are complete, and the calculator at the top accepts any salary you type: if the school sends you its current report, enter the median base salary it gives for your target industry to see your own payback.</p>
${h.mini('forgone')}
<h2>Reading the cost lines</h2>
<p>The academic fees of ${K.tuition(slug)} are the international rate; Canadian citizens and permanent residents pay a lower one. They exclude the university's incidental and ancillary fees, which the program page does not quantify. The living budget starts from the school's own minimum for the first twelve months in Toronto, with rent at the low end of its range; this site scales those twelve months to the ${K.s(slug).months} months of the program. Since it starts from the lowest estimate the school gives, a candidate renting alone downtown should expect to spend above it.</p>
<h2>A paid internship inside the program</h2>
<p>The ${months} months include a paid work term between the two years of study. ${internTxt ? `The class of 2025 reported ${internTxt}, a figure that includes bonuses. Those months of pay reduce the salary given up: in the converter below, set your own currency, then subtract the internship earnings from the ${gone} that a person earning ${K.ref()} forgoes.` : 'The school does not publish what it paid.'} Fees are billed in Canadian dollars, so a candidate paid in another currency carries the exchange rate for the whole program.</p>
${h.miniFx()}`,
  faqs: [
    { q: 'How much does the Toronto Rotman MBA cost for international students?', a: `Academic fees are ${K.tuition(slug)} for the program, about ${K.tuitionUsd(slug)}, before incidental university fees that are not quantified. The living budget counted here, built from the school's minimum for a single student, is ${K.living(slug)}, for ${K.direct(slug)} in all. A person earning ${K.ref()} also gives up ${gone} of salary over the ${months} months.` },
    { q: 'Why is there no payback for the Toronto Rotman MBA?', a: `Rotman publishes no base salary for a single graduating class. Its only public figure averages total pay, including bonuses, over three classes, which cannot be compared with the base salaries used for other schools. Without a salary there is no payback or ten-year value. The ${K.living(slug)} living budget and ${K.tuition(slug)} fees remain complete, and the calculator accepts any salary you type.` },
    { q: 'Is the Toronto Rotman internship paid?', a: `${internTxt ? `Yes. The class of 2025 reported ${internTxt} during the work term, a figure that includes bonuses.` : 'The school describes the work term as paid but publishes no amount.'} The internship sits inside the ${months} months of the program, so its pay reduces the ${gone} of salary that a person earning ${K.ref()} gives up while studying. Pay varies widely by employer and industry.` },
    { q: 'Where can I find the Toronto Rotman employment report?', a: `The school sends its full employment and salary report to people who submit a request form; the public site shows only headline figures. The last freely downloadable edition is several years old. Ask for the current one before applying and type its median base salary into the calculator above to see a payback on a ${K.tuition(slug)} fee bill.` },
  ],
  related: ['school:ivey', 'school:queens-smith', 'mba-employment-report', 'mba-cost', 'mba-salary', 'mba-finder'],
});
