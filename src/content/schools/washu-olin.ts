import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'washu-olin';
const s = K.s(slug);
const months = s.months ?? 21;
const goneRaw = (K.MODEL.refSalary * months) / 12;
const gone = K.usd(goneRaw);
const tf = s.directLocal ?? 0;
const nth = (r: { rank: number }) => (r.rank === 1 ? 'first' : `number ${r.rank}`);
const yr = Number((s.emp.cohort.match(/20\d\d/) ?? ['2024'])[0]);
const coh = `class of ${yr}`;
const newer = K.schools.filter((x) => { const m = x.emp.cohort.match(/20\d\d/g); return m && Number(m[m.length - 1]) > yr; }).length;
const us = K.schools.filter((x) => x.country === 'US');
const salBelow = us.filter((x) => x.emp.salary?.usd && x.emp.salary.usd < (s.emp.salary?.usd ?? 0)).length;
const usExp = us.map((x) => x.profile.exp).filter((v): v is number => v !== null);
const expLowUs = (s.profile.exp ?? 99) <= Math.min(...usExp);
const conFn = s.emp.functions.find((f) => f.key === 'consulting');
const rUs = K.rank(slug, 'z-us');
const entry = (s.tuition?.cohort ?? '').split(',')[0].replace('entering ', '').replace('Fall', 'fall');
const mostInside = !!conFn && conFn.pct! > 2 * (K.shareRaw(slug, 'consulting') ?? 0);
const tie = K.shareRaw(slug, 'finance') === K.shareRaw(slug, 'tech');

export default defineSchool({
  slug,
  title: 'WashU Olin MBA 2026: St. Louis Fees, Jobs and Salary',
  description: `WashU Olin MBA 2026: ${K.money(tf, 'USD')} tuition and fees, a ${K.salary(slug)} median base salary for the ${coh}, ${K.share(slug, 'finance')} of hires in finance, and no living budget published.`,
  intro: `A St. Louis program whose ${coh} split evenly between finance and technology, and whose cost page leaves out living expenses.`,
  resume: `The full-time MBA at Olin Business School, Washington University in St. Louis, costs ${K.tuition(slug)} in tuition and ${K.fees(slug)} in program, student government and wellness fees over four semesters, ${K.money(tf, 'USD')} in all for students entering in ${entry}, and the school says these rates usually rise each year. It publishes no living budget, so the total cost for a person earning ${K.ref()} today cannot be completed, and this site shows no payback or ten-year value. That person would give up ${gone} of salary over the ${months} months, more than the tuition and fees together. The latest report, for the ${coh}, gives a ${K.salaryKind(slug)} of ${K.salary(slug)}. What sets Olin apart is balance: ${tie ? `finance and technology each took ${K.share(slug, 'finance')} of hires` : `finance took ${K.share(slug, 'finance')} and technology ${K.share(slug, 'tech')}`}, and every graduate who accepted a job stayed in North America.`,
  body: (h) => `<h2>Finance and technology, side by side</h2>
<p>${tie ? `The ${coh} divided almost exactly between two industries: ${K.share(slug, 'finance')} into financial services and the same share into technology.` : `Financial services took ${K.share(slug, 'finance')} of the ${coh} and technology ${K.share(slug, 'tech')}.`} They do not pay alike. Technology paid a median of ${K.segSalary(slug, 'tech')}, finance ${K.segSalary(slug, 'finance')}, below the school-wide figure of ${K.salary(slug)}, which makes finance the slower path to repay the degree. Healthcare is the third industry at ${K.share(slug, 'healthcare')}, at ${K.segSalary(slug, 'healthcare')}. Consulting firms hired only ${K.share(slug, 'consulting')} of the class, at ${K.segSalary(slug, 'consulting')}, yet ${conFn ? `${K.p(conFn.pct!)} hold a consulting job by function` : 'more hold consulting roles by function'}${mostInside ? ', most of them inside companies rather than at consulting firms' : ''}. A candidate aiming at a large consulting firm will find more of a pipeline in our ${h.a('best-mba-consulting', 'consulting ranking')}.</p>
${h.miniGoal(slug)}
<h2>A salary one class older than most</h2>
<p>Olin's most recent public report covers the ${coh}; ${newer} of the ${K.schools.length} schools on this site already publish a later class. The median of ${K.salary(slug)} is therefore a year behind its peers, and only ${salBelow} of the ${us.length} American schools here report a lower one. Part of the gap may come from the class itself: students arrive with ${K.num(s.profile.exp ?? 0, 1)} years of work on average${expLowUs ? ', the least of any American school on this site' : ''}. That same profile cuts the salary given up: someone earning less than ${K.ref()} today forgoes less, so type your own figure in the calculator. ${rUs ? `On placement in the United States the school does well, ${nth(rUs)} of ${rUs.of} in our ${h.a('best-mba-usa', 'US ranking')}, since all reported hires stayed in North America.` : ''}</p>
<h2>No living budget, so no payback here</h2>
<p>The cost page lists tuition and fees semester by semester and stops there: no rent, food, insurance or transport. Without that line, the payback cannot be computed, and Olin sits outside our salary-based rankings even though its salary is known. You can complete it yourself: price a St. Louis rent and living costs for ${months} months and type the sum in the Living budget field at the top, then the calculator shows the total and the payback on the ${K.salary(slug)} median. The summer internship paid a median of ${K.money(s.emp.intern!.monthly, 'USD')} a month, though the school does not say for which class, and the calculator subtracts it from the salary you give up.</p>
${h.mini('forgone')}`,
  faqs: [
    { q: 'How much does the WashU Olin MBA cost?', a: `Tuition is ${K.tuition(slug)} and fees ${K.fees(slug)} for the four semesters, ${K.money(tf, 'USD')} for students entering in ${entry}, with yearly increases expected. WashU Olin publishes no living budget, so rent and food in St. Louis must be added. A person earning ${K.ref()} before the MBA also gives up ${gone} of salary over the ${months} months.` },
    { q: 'What is the median salary after the WashU Olin MBA?', a: `The ${coh}, the latest public report, had a median base salary of ${K.salary(slug)}. Technology paid ${K.segSalary(slug, 'tech')}, finance ${K.segSalary(slug, 'finance')}, healthcare ${K.segSalary(slug, 'healthcare')}. ${K.p(s.emp.employed!)} of job seekers had accepted an offer within three months. ${newer * 2 > K.schools.length ? 'Most schools on this site already report a later class' : `${newer} schools on this site already report a later class`}, so compare with care.` },
    { q: 'Why is there no payback for WashU Olin on this page?', a: `The school publishes no living budget, and a payback needs the full cost. The salary, ${K.salary(slug)} for the ${coh}, is known. Type your own estimate of living costs for St. Louis into the Living budget field of the calculator at the top, and it will compute the total and payback on top of the ${K.money(tf, 'USD')} of tuition and fees.` },
  ],
  related: ['school:vanderbilt-owen', 'school:indiana-kelley', 'school:notre-dame-mendoza', 'best-mba-usa', 'mba-salary', 'mba-cost'],
});
