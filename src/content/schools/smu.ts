import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'smu';
const s = K.s(slug);
const months = s.months ?? 15;
const gone = K.usd((K.MODEL.refSalary * months) / 12);
const asia = K.share(slug, 'z-asia');
const ra = K.rank(slug, 'z-asia');
const nth = (r: { rank: number }) => (r.rank === 1 ? 'first' : `number ${r.rank}`);
const sizes = K.schools.map((x) => x.classSize).filter((v): v is number => v !== null);
const smaller = sizes.filter((v) => s.classSize !== null && v < s.classSize).length;
const banks = K.employers(slug, 10).filter((n) => /Bank|UOB/.test(n));
const fnTop = [...s.emp.functions].sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0))[0];
const yr = Number((s.emp.cohort.match(/\d{4}/) ?? ['2019'])[0]);
const coh = `class of ${yr}`;
const gap = 2025 - yr;
const intake = (s.tuition?.cohort ?? '').replace(/ \(.*\)/, '');
const fnFin = s.emp.functions.find((f) => /Finance/.test(f.label));
const sch = s.scholarship.v ? K.money(s.scholarship.v, 'SGD') : null;

export default defineSchool({
  slug,
  title: 'SMU MBA 2026: Singapore Fees, Asian Jobs, Old Salary Data',
  description: `SMU MBA 2026 in Singapore: ${K.tuition(slug)} tuition (${K.tuitionUsd(slug)}) for ${months} months, ${asia} of graduates placed in Asia, and why its old salary is left out of comparisons.`,
  intro: `A ${months}-month MBA in Singapore whose last public employment report, for the ${coh}, placed ${asia} of graduates in Asia.`,
  resume: `The SMU MBA, run by the Lee Kong Chian School of Business at Singapore Management University, lists tuition of ${K.tuition(slug)} for the ${intake}, about ${K.tuitionUsd(slug)}, with ${K.fees(slug)} of miscellaneous fees on top. The school publishes no living budget, so the total cost for a person earning ${K.ref()} today cannot be completed; that person would give up ${gone} of salary over the ${months} months. The only salary SMU has published is a mean for the ${coh}, ${K.num(gap)} classes older than the 2025 reports used for other schools, so we leave it out of every comparison and compute no payback. What the ${yr} report does show is a regional school: ${asia} of graduates took jobs in Asia${ra ? `, which places SMU ${nth(ra)} of ${ra.of} in our Asia ranking on the share placed there` : ''}, and ${s.emp.employed !== null ? `${K.p(s.emp.employed)} had accepted an offer` : 'the employment rate is not given'}.`,
  body: (h) => `<h2>Nearly every graduate stays in Asia</h2>
<p>SMU's ${yr} report shows a class that studies in Singapore and works in the region: ${asia} of the graduates who took a job did so in Asia, ${K.share(slug, 'z-africa') ?? 'a small share'} in Africa, and none in Europe or the United States. ${ra ? `On the share placed in Asia, SMU comes ${nth(ra)} of ${ra.of} schools in our ${h.a('best-mba-asia', 'Asia ranking')}, a placement that holds even without a salary.` : `The ${h.a('best-mba-asia', 'Asia ranking')} sets it against the other schools of the region.`} The employers the school names lean toward finance and payments${banks.length ? `, with ${K.listOf(banks)} among them` : ''}, and financial services was the largest industry at ${K.share(slug, 'finance')}, ahead of technology at ${K.share(slug, 'tech')}.</p>
<p>By job, the picture differs: ${fnTop ? `${fnTop.label.toLowerCase()} was the largest function at ${K.p(fnTop.pct!)}` : 'the school publishes a split by function'}, ${fnFin ? `ahead of finance and accounting roles at ${K.p(fnFin.pct!)}` : 'ahead of finance roles'}, so the industry and function tables tell different stories about the same class.</p>
${h.miniGoal(slug)}
<h2>Why the ${yr} salary is left out</h2>
<p>A salary from ${K.num(gap)} graduating classes ago describes another hiring market. Putting it next to the 2025 medians of other schools would make SMU look cheaper to repay or dearer than it is, depending on how pay moved since, and neither can be checked. So this page shows no salary, no payback and no ten-year value for SMU. The school does not publish a living budget either, which would also stop the calculation. A newer report may sit behind the school's employment page, which our readers could not open; until one is public, the cost lines on this page are the reliable part, and a candidate should ask the admissions team for the latest class figures before deciding.</p>
${h.mini('forgone')}
<h2>A small class and a capped scholarship</h2>
<p>The class counted in the ${yr} report had ${K.num(s.classSize ?? 0)} students; only ${smaller} school${smaller === 1 ? '' : 's'} on this site report${smaller === 1 ? 's' : ''} a smaller one, and no newer figure is published. ${sch ? `Partial scholarships reach at most ${sch} of tuition, with no service bond attached, so the lowest possible tuition after an award is ${K.money((s.tuition?.v ?? 0) - (s.scholarship.v ?? 0), 'SGD')}.` : 'The school does not publish scholarship amounts.'} Tuition is quoted in Singapore dollars and includes the goods and services tax; for a candidate paid in another currency, the converter below uses the ECB rate the site is built on.</p>
${h.miniFx()}`,
  faqs: [
    { q: 'How much does the SMU MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${intake}, about ${K.tuitionUsd(slug)}, with ${K.fees(slug)} of miscellaneous fees over the program. SMU publishes no living budget for Singapore, so rent and food must be priced separately. For a person earning ${K.ref()} before the MBA, the ${months} months away also mean ${gone} of salary not earned.` },
    { q: 'Why does this site show no salary for SMU graduates?', a: `The only salary SMU has made public is a mean for the ${coh}, ${K.num(gap)} classes older than the 2025 figures used for the other schools here. Comparing them would mislead, so we leave it out and compute no payback. The ${yr} report still shows that ${s.emp.employed !== null ? `${K.p(s.emp.employed)} of graduates had accepted an offer` : 'most graduates found work'} and that ${asia} worked in Asia.` },
    { q: 'Where do SMU MBA graduates work?', a: `In the ${yr} report, ${asia} of graduates who took a job worked in Asia, most of them in Singapore. Financial services took ${K.share(slug, 'finance')} of the class, technology ${K.share(slug, 'tech')}, consulting ${K.share(slug, 'consulting')}. ${ra ? `On the share placed in Asia, SMU ranks ${nth(ra)} of ${ra.of} in our ranking for the region.` : ''}` },
    { q: 'What scholarships does SMU offer for its MBA?', a: `${sch ? `Partial awards reach at most ${sch} of tuition, with no bond to serve afterwards, against a tuition of ${K.tuition(slug)}.` : `The school does not publish scholarship amounts against a tuition of ${K.tuition(slug)}.`} The share of the class that receives one is not published. The awards cover academic merit, leadership, community impact and women in business, among other criteria listed by the school.` },
  ],
  related: ['school:nus', 'school:ntu-nanyang', 'school:insead', 'best-mba-asia', 'best-mba-one-year', 'mba-finder'],
});
