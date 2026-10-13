import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'usc-marshall';
const s = K.s(slug);
const months = s.months ?? 21;
const goneRaw = (K.MODEL.refSalary * months) / 12;
const gone = K.usd(goneRaw);
const tf = s.directLocal ?? 0;
const feesAll = K.schools.map((x) => K.c(x.slug).fees).filter((v) => v > 0);
const feesAbove = feesAll.filter((v) => v > K.c(slug).fees).length;
const emps = K.schools.map((x) => x.emp.employed).filter((v): v is number => v !== null);
const empBelow = emps.filter((v) => v < (s.emp.employed ?? 0)).length;
const gmats = K.schools.map((x) => x.profile.gmat).filter((v): v is number => v !== null);
const gmatAbove = gmats.filter((v) => v > (s.profile.gmat ?? 0)).length;
const ind = [...s.emp.industries].filter((r) => r.salary).sort((a, b) => (b.salary ?? 0) - (a.salary ?? 0));
const indTxt = K.listOf(ind.map((r) => `${r.label.toLowerCase()} at ${K.money(r.salary!, 'USD')}`));
const below = ind.filter((r) => (r.salary ?? 0) < s.emp.salary!.v).map((r) => r.label.toLowerCase());

export default defineSchool({
  slug,
  title: 'USC Marshall MBA 2026: Fees, Average Pay, Missing Budget',
  description: `USC Marshall MBA 2026: ${K.tuition(slug)} tuition and ${K.fees(slug)} of fees, a ${K.salary(slug)} average base salary, and no living budget, so this site can compute no payback.`,
  intro: `A Los Angeles MBA that publishes salaries by industry but not how many graduates went into each, and no budget for living costs.`,
  resume: `The full-time MBA at USC Marshall costs ${K.tuition(slug)} in tuition at 2026-27 rates, and the school adds ${K.fees(slug)} of university, program and health fees, for ${K.money(tf, 'USD')} over two years. The school warns that rates rise each year. It publishes no living budget on its own pages; the university's cost of attendance sits in an interactive tool, so the total for a person earning ${K.ref()} today cannot be completed. That person would also give up ${gone} of salary over the ${months} months. The class of 2025 reported an ${K.salaryKind(slug)} of ${K.salary(slug)} and a mean signing bonus of ${K.money(s.emp.bonus!.v, 'USD')}, but without a living budget there is no payback or ten-year value on this page. What sets Marshall apart is how little it publishes on placement: salaries by industry, with no share of the class beside them.`,
  body: (h) => `<h2>Salaries by industry, without the shares</h2>
<p>Marshall's public outcomes page gives an average starting salary for four groups, ${indTxt}, and stops there. It does not say how many graduates went into each, and no detailed employment report is posted. That leaves a candidate unable to tell whether consulting is a quarter of the class or a handful of hires, and it is why Marshall has no place in our industry rankings, which need a share. ${below.length ? `The school-wide average of ${K.salary(slug)} falls between them, above ${K.listOf(below)}; without shares, that is as far as the figures can be read.` : ''} The employers named run from the large consulting firms to technology companies and an asset manager, listed alphabetically and without hire counts.</p>
<h2>Fees that run high, and a budget left out</h2>
<p>Mandatory fees of ${K.fees(slug)} are ${feesAbove === 0 ? 'the highest of any school on this site' : `higher than at all but ${feesAbove} school${feesAbove === 1 ? '' : 's'} on this site`}. They combine university services and health fees, program fees, a one-time first-year program fee and student health insurance, which can be waived with equivalent cover. Tuition and fees together reach ${K.money(tf, 'USD')} before rent. The living budget is the missing line: Marshall's tuition page excludes housing and living costs, and the university shows its graduate cost of attendance only through an interactive tool. Price rent and food for Los Angeles yourself, type the sum in the Living budget field of the calculator at the top, and the total and payback appear for your case.</p>
<p>The salary you stop earning weighs more than the fees. For the reference person it is ${gone}; a candidate earning more today gives up more, while the average after the MBA stays where it is.</p>
${h.mini('forgone')}
<h2>A slower hiring pace than most</h2>
<p>${K.p(s.emp.employed!)} of the class of 2025 was ${s.emp.employedLabel} of graduation, and only ${empBelow} school${empBelow === 1 ? '' : 's'} on this site report${empBelow === 1 ? 's' : ''} a lower rate. The school does not say what share of the class answered its survey or how many were seeking a job, so the rate cannot be read against a defined group. The entering class has an average GMAT of ${K.num(s.profile.gmat ?? 0)}${gmatAbove === 0 ? ', as high as any school on this site reports' : `, with ${gmatAbove} school${gmatAbove === 1 ? '' : 's'} on this site reporting a higher figure`}. The mean signing bonus, ${K.money(s.emp.bonus!.v, 'USD')}, is published without the share who received one; the calculator below shows what a bonus is worth on average when only part of the class gets it.</p>
${h.mini('bonus')}`,
  faqs: [
    { q: 'How much does the USC Marshall MBA cost?', a: `Tuition is ${K.tuition(slug)} over two years at 2026-27 rates, and mandatory fees add ${K.fees(slug)}, for ${K.money(tf, 'USD')}. USC Marshall publishes no living budget on its own pages, so rent and food in Los Angeles come on top. A person earning ${K.ref()} before the MBA also gives up ${gone} of salary over the ${months} months.` },
    { q: 'What do USC Marshall MBA graduates earn?', a: `The class of 2025 reported an average base salary of ${K.salary(slug)} and an average signing bonus of ${K.money(s.emp.bonus!.v, 'USD')}. By industry, the school gives averages only: ${indTxt}. These are means, which large salaries pull up, and the school does not say how many graduates each group includes.` },
    { q: 'Why does this site show no payback for USC Marshall?', a: `Because the school publishes no living budget on its pages, and the payback needs one. The salary, ${K.salary(slug)} on average, is there; the cost of living in Los Angeles is not. Type your own rent and food estimate into the Living budget field of the calculator at the top to complete the ${K.money(tf, 'USD')} of tuition and fees and see a payback for your own case.` },
    { q: 'How fast do USC Marshall graduates find jobs?', a: `${K.p(s.emp.employed!)} of the class of 2025 was ${s.emp.employedLabel} of graduation, a lower rate than at most schools on this site; only ${empBelow} report${empBelow === 1 ? 's' : ''} a lower one. The school does not publish how many graduates were seeking a job or answered its survey, so the base of that percentage is not known.` },
  ],
  related: ['school:ucla-anderson', 'school:berkeley-haas', 'school:stanford', 'mba-employment-report', 'mba-cost', 'best-mba-usa'],
});
