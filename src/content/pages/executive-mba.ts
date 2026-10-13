import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const w = K.roi('wharton')!;
const ins = K.roi('insead')!;
const wShare = Math.round((w.forgone / w.total) * 100);
const iShare = Math.round((ins.forgone / ins.total) * 100);
const hi = K.roi('wharton', 'all', 150000)!;
const mf = K.P.bls.occupations['113031'];
const gm = K.P.bls.occupations['111021'];
const exps = K.schools.map((s) => s.profile.exp).filter((x): x is number => x !== null);

export default definePage({
  id: 'executive-mba',
  group: 'guides',
  order: 1,
  slug: 'executive-mba',
  nav: 'Executive MBA',
  card: 'Why an executive MBA costs only its tuition, when an employer pays, and why full-time employment figures do not describe it.',
  title: 'Executive MBA 2026: Cost Without the Salary You Give Up',
  description: `Executive MBA in 2026: the cost is the tuition alone because you keep your salary, what an employer may pay, and why full-time MBA salary reports do not apply.`,
  h1: 'Executive MBA: a degree without the salary gap',
  intro: `For a person earning ${K.ref()}, the salary given up is ${wShare}% of the total cost of a full-time Wharton MBA; in an executive MBA that part is zero.`,
  resume: `An executive MBA is taught on weekends or in blocks of a week while you keep your job, so its cost is the tuition, travel and time, but not the salary you give up. That missing line is most of what a full-time degree costs. For a person earning ${K.ref()} before the degree, the full-time MBA at Wharton costs ${K.usd(w.total)} in total, of which ${K.usd(w.forgone)} (${wShare}%) is salary not earned during 21 months; at INSEAD, a ten-month program, the salary given up is ${iShare}% of ${K.usd(ins.total)}. The executive format removes that share and often adds an employer contribution: in the United States, an employer can pay up to $5,250 a year of graduate tuition tax-free for the employee, according to IRS Publication 15-B (2026). The return is harder to measure, because executive students rarely change job at graduation and schools publish no employment report comparable to the full-time ones. Type the tuition of the program you are considering in the calculator below, with your expected raise, to see the payback.`,
  faqs: [
    { q: 'Why is an executive MBA cheaper than a full-time MBA in total?', a: `Because you keep your salary. For a person earning ${K.ref()}, the full-time Wharton MBA costs ${K.usd(w.total)}, of which ${K.usd(w.forgone)} is salary given up; at ${K.usd(150000)} a year, the salary given up rises to ${K.usd(hi.forgone)}. An executive program's tuition may be as high as a full-time one's, but that second line disappears.` },
    { q: 'Can an employer pay for an executive MBA tax-free in the United States?', a: 'Partly. IRS Publication 15-B (2026) lets an employer exclude up to $5,250 a year of educational assistance from the employee\'s income, and the exclusion applies to graduate-level courses. Anything above that is taxable unless it qualifies under another rule. Many employers also attach a repayment clause if you leave within a set period, which the IRS publication does not cover.' },
    { q: 'Do full-time MBA salary reports apply to executive MBA graduates?', a: `No. Full-time reports describe graduates who were seeking a new job, three months after graduation, mostly about five years into their career. Executive MBA students are usually older, stay with their employer and are counted by no MBA CSEA report. A full-time median such as ${K.salary('wharton')} at Wharton says nothing about the raise an executive student will get.` },
    { q: 'How long does an executive MBA take to pay back?', a: `It depends on two figures you know better than any school: the tuition left to you after any employer contribution, and the raise you expect. With ${K.usd(100000)} of tuition left and a raise of ${K.usd(25000)} a year, the payback is about four years before tax. With a promotion that does not depend on the degree, the honest answer is never.` },
    { q: 'Who should choose an executive MBA over a full-time program?', a: 'Someone who wants to progress in the same company or industry, whose employer supports the degree, and whose salary is high enough that giving it up for one or two years would cost more than the whole tuition. A full-time program remains the usual choice for a change of industry or country, which needs the internship and the campus recruiting an executive format lacks.' },
  ],
  body: (h) => `<h2>The line that disappears</h2>
<p>The total cost of an MBA on this site has four parts: tuition and fees, the living budget, the salary you give up, and, for two-year programs, the internship pay that comes back in the summer. In an executive program, the living budget becomes your ordinary cost of living, which you would pay anyway, and the salary keeps arriving. What remains is tuition, travel to the teaching weekends or modules, and the time taken from work and family.</p>
<p>The weight of the missing line grows with your salary. For a person earning ${K.ref()} before the degree, the salary given up is ${K.usd(w.forgone)} of the ${K.usd(w.total)} a full-time Wharton MBA costs. At ${K.usd(150000)}, the salary given up reaches ${K.usd(hi.forgone)} and the total ${K.usd(hi.total)}. A one-year program cuts the line rather than removing it: INSEAD's ten months still cost ${K.usd(ins.forgone)} in salary for the reference person. Use the mini-calculator below to put your own salary and program length into the comparison.</p>
${h.mini('forgone')}
<h2>What you type, and why we do not</h2>
<p>This site reads full-time programs only: their tuition, the student budget the school publishes and their employment report. Executive programs publish their fees on separate pages, often with travel, accommodation during modules and materials priced differently, and we have not read them. Rather than guess, the calculator below asks for the tuition you will pay, the part your employer covers and the raise you expect. It then gives the number of years for that raise to repay what is left to you. It counts no salary given up, because there is none.</p>
${h.mini('emba')}
<h2>When an employer pays</h2>
<p>Employer sponsorship is common in executive programs and rare in full-time ones, because the employer keeps an employee who is still working. The amounts vary by company and are not public. In the United States, the tax rule sets one reference point: under IRS Publication 15-B (2026), an employer can exclude up to $5,250 a year of educational assistance from the employee's taxable income, and the exclusion applies to graduate-level courses. Above that amount, the benefit is generally taxable as wages unless another rule applies. Sponsorship often comes with conditions, such as staying with the company for a period after the degree or repaying part of the cost, and those conditions change the calculation: a clause that ties you to the employer limits the raise you can negotiate elsewhere.</p>
<p>Ask three questions before counting on it: how much the employer pays and over how many years, what you owe if you leave, and whether the employer expects a role change after the degree. A sponsorship that covers half the tuition and requires two years of service is worth less to a person planning to change jobs than the headline amount suggests.</p>
<h2>Why the full-time numbers of this site do not apply</h2>
<p>Every salary on this site comes from a full-time employment report, and those reports describe a specific group: graduates who left their job to study, were seeking a new one, and answered the school's survey three months after graduation. The median student of the schools we read arrives with about ${K.num(exps.sort((a, b) => a - b)[Math.floor(exps.length / 2)], 0)} years of experience. Executive MBA students are further into their careers, mostly stay with their employer and are counted by no MBA CSEA report. A full-time median such as ${K.salary('wharton')} at Wharton is the result of a job change, not of the degree alone, and applying it to an executive student would overstate the gain.</p>
<p>Occupational wages give a more useful frame for a manager who stays in place. The BLS median for financial managers was ${K.usd(mf.median)} in ${K.P.bls.period}, for general and operations managers ${K.usd(gm.median)}, each with a wide spread between the bottom and top quarters. The question an executive student should ask is whether the degree moves them up that distribution faster than they would move without it, and only the employer's own promotion practice answers it.</p>
${h.miniPosition('111021')}
<h2>Choosing between the two formats</h2>
<p>The executive format fits a person who wants to grow in the same company or industry, whose employer supports the degree and whose salary makes two years without it expensive. The full-time format fits a change of industry, of function or of country, because it gives a summer internship, campus recruiting and time to look for the new job. The ${h.a('mba-cost', 'MBA cost page')} breaks down the full-time total, the ${h.a('online-mba', 'online MBA page')} covers the third route, and the ${h.a('is-an-mba-worth-it', 'worth-it guide')} weighs the decision as a whole.</p>`,
  tool: 'roi',
  toolArgs: { school: 'wharton' },
  related: ['online-mba', 'mba-cost', 'is-an-mba-worth-it', 'mba-roi', 'school:wharton'],
  sources: ['mbacsea', 'bls_oews', 'gmac'],
  schoolSources: ['wharton', 'insead'],
  extSources: [{ label: 'IRS, Publication 15-B (2026), Employer’s Tax Guide to Fringe Benefits: educational assistance', url: 'https://www.irs.gov/publications/p15b' }],
});
