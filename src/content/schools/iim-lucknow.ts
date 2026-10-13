import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'iim-lucknow';
const s = K.s(slug);
const o = K.roi(slug);
const R = (v: number) => K.money(v, 'INR');
const sal = s.emp.salary!;
const isCtc = /CTC/.test(sal.note);
const exp = K.schools.filter((x) => x.profile.exp !== null);
const maxExp = Math.max(...exp.map((x) => x.profile.exp!));
const mostExp = s.profile.exp !== null && s.profile.exp === maxExp;
const tiedExp = exp.filter((x) => x.profile.exp === maxExp).length;
const moreExp = exp.filter((x) => x.profile.exp! > (s.profile.exp ?? 0)).length;
const consFns = s.emp.functions.filter((f) => /Consulting/.test(f.label));
const consFnSum = consFns.reduce((t, f) => t + (f.pct ?? 0), 0);
const fnPm = s.emp.functions.find((f) => /^Project/.test(f.label));
const fnProd = s.emp.functions.find((f) => /^Product/.test(f.label));
const noAid = s.scholarship.v === 0;
const asOf = s.emp.cohort.match(/as of (.+)$/)?.[1] ?? 'graduation';
const fee = s.tuition!.v + (s.fees?.v ?? 0);

export default defineSchool({
  slug,
  title: 'IIM Lucknow IPMX 2026: Bundled Fee, Median CTC, Jobs',
  description: `IIM Lucknow IPMX 2026: a ${R(s.tuition!.v)} fee with room, food and the overseas module, a ${R(sal.v)} median CTC, ${K.p(s.emp.employed!)} placed by graduation, and no scholarships.`,
  intro: `A one-year MBA in Noida for managers with about ${K.num(s.profile.exp!)} years of experience, where one fee covers tuition, a room and meals.`,
  resume: `The IPMX, IIM Lucknow's one-year MBA for executives on its Noida campus near Delhi, charges ${R(s.tuition!.v)} for the ${s.tuition!.cohort} batch, plus a ${R(s.fees?.v ?? 0)} alumni fee. The price is unusually complete: it includes tuition, course material, a basic single room, food on campus and the academic part, visa and stay of the overseas module. Only the airfare for that module and spending abroad come on top. Because the institute publishes no separate living budget, ${o ? '' : `this page shows no total cost or payback for the reference person earning ${K.ref()}, a salary that would in any case be far above most Indian managers' pay before the program: type your own in the calculator.`} The class of 2026 reported a ${isCtc ? 'median CTC' : K.salaryKind(slug)} of ${R(sal.v)}${isCtc ? ', a cost-to-company package that here excludes joining bonuses, retention bonuses and stock' : ''}, and ${K.p(s.emp.employed!)} of those seeking a job had an offer by ${asOf}. The class is ${moreExp <= 3 ? 'among the most experienced on this site' : 'experienced'}, with about ${K.num(s.profile.exp!)} years of work on average${moreExp === 0 ? '; no school reports more' : moreExp <= 3 ? `; only ${moreExp} ${moreExp === 1 ? 'school reports' : 'schools report'} more` : ''}.`,
  body: (h) => `<h2>${mostExp ? 'The most experienced class' : 'An experienced class'}, and what that means for the cost</h2>
<p>${mostExp ? `An average of about ${K.num(s.profile.exp!)} years of work is the highest figure published by any school on this site${tiedExp > 1 ? `, shared with ${tiedExp - 1 === 1 ? 'one other school' : `${tiedExp - 1} others`}` : ''}.` : `The class averages about ${K.num(s.profile.exp!)} years of work.`} That makes the salary you give up the line to watch. Whether ${s.months} months of your pay outweigh the ${R(fee)} paid to the institute depends on what you earn now, and for a manager with that much experience the two can be of the same order. The calculator at the top lets you test that: type your current salary in dollars, a living budget close to zero since room and food are included, and the ${R(sal.v)} median as your salary after the degree.</p>
<p>The institute reports a large average rise from the salary before the IPMX to the one after, and that most of the class changed both function and industry. Read the median with its definition in mind: CTC is a total package, and the IPMX figure leaves out joining and retention bonuses and stock grants, which makes it more conservative than some Indian packages but still not a base salary.</p>
${h.miniGoal(slug)}
<h2>Where the class went</h2>
<p>Technology hired ${K.share(slug, 'tech')} of the class and consulting ${K.share(slug, 'consulting')}, with finance at ${K.share(slug, 'finance')}. By role, consulting jobs of all kinds add up to ${K.p(consFnSum)}${fnPm ? `, project management ${K.p(fnPm.pct!)}` : ''}${fnProd ? ` and product management ${K.p(fnProd.pct!)}` : ''}. The recruiters with final offers include ${K.listOf(K.employers(slug, 8))}. The report gives no salary by sector and no locations, so it cannot show whether any graduates left India.</p>
<p>The placement figure was measured on ${asOf}, close to graduation rather than three months after it, and counts offers obtained outside the campus process as well as students who rejoined their former employer.</p>
${h.miniFx()}
<h2>No scholarships, one price</h2>
<p>${noAid ? 'The IPMX offers no scholarships: the program FAQ answers the question with a plain no.' : 'Scholarships are limited.'} The fee is paid in instalments, a first payment followed by equal ones, and upgraded rooms cost extra at a rate the institute does not publish. For a comparison with the other one-year programs for managers in India, see ${h.sc('iim-ahmedabad', 'IIM Ahmedabad PGPX')}, ${h.sc('iim-bangalore', 'IIM Bangalore EPGP')} and ${h.sc('iim-calcutta', 'IIM Calcutta MBAEx')}.</p>`,
  faqs: [
    { q: 'How much does the IIM Lucknow IPMX cost?', a: `The fee for the ${s.tuition!.cohort} batch is ${R(s.tuition!.v)}, plus a ${R(s.fees?.v ?? 0)} alumni fee. It covers tuition, course material, a basic single room, food on campus and the overseas module's academic part, visa and stay. Airfare for the module, spending abroad and upgraded rooms are extra.` },
    { q: 'What is the median salary after the IIM Lucknow IPMX?', a: `The class of 2026 reported a median CTC of ${R(sal.v)}, measured on ${asOf} and excluding joining bonus, retention bonus and stock. CTC is a total package, not a base salary. ${K.p(s.emp.employed!)} of those seeking a job had an offer by that date, campus and outside offers combined.` },
    { q: 'Does the IIM Lucknow IPMX offer scholarships?', a: `${noAid ? 'No. The program FAQ states that no scholarship is available for the IPMX.' : 'Only limited aid is available.'} The ${R(s.tuition!.v)} fee is paid in instalments, and because room and food are included it is close to the full cost of the year on campus. Your main cost is the salary you give up for ${s.months} months.` },
    { q: 'Who studies on the IIM Lucknow IPMX?', a: `Managers with long careers: the class of 2026 averaged about ${K.num(s.profile.exp!)} years of experience, and the program requires several years of work at entry. The class counted ${K.num(s.classSize!)} students. The institute does not publish their average age, the share of women or the share of foreign students.` },
  ],
  related: ['school:iim-ahmedabad', 'school:iim-bangalore', 'school:iim-calcutta', 'school:isb', 'best-mba-one-year'],
});
