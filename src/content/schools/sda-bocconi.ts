import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'sda-bocconi';
const s = K.s(slug);
const o = K.roi(slug);
const m = s.months ?? 12;
const sal = s.emp.salary!;
const rng = /([\d,]+)\s*-\s*([\d,]+)\s*EUR per month/i.exec(s.livingMissing ?? '');
const lo = rng ? Number(rng[1].replace(/,/g, '')) : null;
const hi = rng ? Number(rng[2].replace(/,/g, '')) : null;
const z = (k: string) => s.emp.zones.find((x) => x.zone === k);
const us = z('US'), eu = z('Europe'), asia = z('Asia'), me = z('Middle East'), la = z('Latin America');
const ind = (k: string) => s.emp.industries.find((x) => x.key === k)?.salary ?? null;
const fin = ind('finance'), man = ind('manufacturing'), con = ind('consulting'), tech = ind('tech');
const gmF = s.emp.functions.find((f) => f.label === 'General Management');
const forgone = Math.round((K.MODEL.refSalary * m) / 12);
const ratio = us?.salary && eu?.salary ? Math.round((us.salary / eu.salary) * 10) / 10 : null;
const cohort = s.emp.cohort.toLowerCase();
const intake = s.tuition!.cohort.replace(/^Full-Time MBA\s*/i, '');

export default defineSchool({
  slug,
  title: 'SDA Bocconi MBA 2026: Milan Fees and Salary by Region',
  description: `SDA Bocconi MBA 2026: ${K.tuition(slug)} tuition for ${m} months in Milan, a ${K.salary(slug)} average salary package for the ${cohort}, pay by region, and why no payback.`,
  intro: `SDA Bocconi publishes what its ${cohort} earned in each region, from ${asia?.salary ? K.money(asia.salary, 'EUR') : 'a low figure'} on average in Asia to ${us?.salary ? K.money(us.salary, 'EUR') : 'a high one'} in North America, on tuition of ${K.tuition(slug)}.`,
  resume: `SDA Bocconi charges ${K.tuition(slug)} for its ${m}-month full-time MBA in Milan, for the ${intake} class, paid in instalments and exempt from VAT; there is no other mandatory fee beyond the application fee. The school gives no total living budget, only an estimate of monthly personal expenses based on what recent students report${lo && hi ? `, ${K.money(lo, 'EUR')} to ${K.money(hi, 'EUR')} a month` : ''}. The ${cohort} reported a mean salary package of ${K.salary(slug)}, about ${K.salaryUsd(slug)}, which we record as ${K.salaryKind(slug)} because the school calls it an overall salary package without saying whether bonuses are inside it. ${K.p(s.emp.employed!)} of graduates seeking a job were ${s.emp.employedLabel}. ${o ? '' : `Without a published living budget, our model computes no total cost and no payback for the reference person earning ${K.ref()}, and the school is not ranked.`} What sets Bocconi apart is the detail of its pay data: average salaries by industry, by function and by region, though without the share of the class in each.`,
  body: (h) => `<h2>Salaries by region, shares unknown</h2>
<p>The regional table is the most useful part of the Bocconi report and the one that needs most care. ${us?.salary ? `Graduates working in North America averaged ${K.money(us.salary, 'EUR')}` : ''}${ratio ? `, about ${K.num(ratio, 1)} times the European average of ${K.money(eu!.salary!, 'EUR')}` : ''}. ${me?.salary ? `The Middle East paid ${K.money(me.salary, 'EUR')}` : ''}${la?.salary ? `, Latin America ${K.money(la.salary, 'EUR')}` : ''}${asia?.salary ? ` and Asia ${K.money(asia.salary, 'EUR')}` : ''}. The school does not say how many graduates sit behind each figure. A regional mean can rest on a handful of jobs, so treat the highest figures as a ceiling rather than a plan, and use the European figure if you intend to stay in Italy or nearby.</p>
<p>By industry, ${fin ? `finance led at ${K.money(fin, 'EUR')}` : 'finance paid most'}${man ? `, then manufacturing at ${K.money(man, 'EUR')}` : ''}${con ? ` and consulting at ${K.money(con, 'EUR')}` : ''}${tech ? `, with technology lower at ${K.money(tech, 'EUR')}` : ''}. ${gmF?.salary ? `General management roles averaged ${K.money(gmF.salary, 'EUR')}, far above any industry, the kind of gap a mean drawn from a small group can produce.` : ''} Every one of these figures is a mean, and the industry chart on the school's page shows shares only as bars, without numbers, so this page leaves the shares blank.</p>
${h.miniFx()}
<h2>A year in Milan, priced by the student</h2>
<p>${lo && hi ? `Over ${m} months, the school's monthly estimate gives ${K.money(lo * m, 'EUR')} to ${K.money(hi * m, 'EUR')} of personal expenses, which is a range, not a budget we can count.` : 'The school gives a monthly estimate of personal expenses, not a budget we can count.'} Type your own figure for rent and daily costs in the calculator at the top together with tuition, and the tool gives the payback this page cannot. Scholarships are merit-based tuition waivers from a partial share up to the full fee, drawn from a fixed pool each year; the school publishes no average award.</p>
<h2>The salary you leave behind</h2>
<p>With a class of ${K.num(s.classSize!)}, ${K.num(s.profile.age!)} years old on average and about ${K.num(s.profile.exp!)} years into their careers, a student who leaves a job gives up a full year of salary. At ${K.ref()}, ${m} months away cost about ${K.usd(forgone)} before tax, ${forgone > K.c(slug).tuition! ? 'more than the tuition' : 'close to the tuition'}. The mini below puts your own salary in place of that figure.</p>
${h.mini('forgone')}`,
  faqs: [
    { q: 'How much does the SDA Bocconi full-time MBA cost?', a: `Tuition for the ${intake} class is ${K.tuition(slug)}, about ${K.tuitionUsd(slug)} at the ECB rate, paid in instalments with no other mandatory fee. The school publishes no total living budget for Milan, only a monthly estimate of personal expenses${lo && hi ? ` of ${K.money(lo, 'EUR')} to ${K.money(hi, 'EUR')}` : ''}, so the full cost depends on how you live.` },
    { q: 'What is the average salary after an SDA Bocconi MBA?', a: `The ${cohort} reported an average salary package of ${K.salary(slug)}, about ${K.salaryUsd(slug)}, without saying whether bonuses are included. It is a mean, not a median. By region it ranged from ${asia?.salary ? K.money(asia.salary, 'EUR') : 'less'} in Asia to ${us?.salary ? K.money(us.salary, 'EUR') : 'more'} in North America, and the school does not say how many graduates each region holds.` },
    { q: 'Why is there no payback for SDA Bocconi on this page?', a: `A payback needs the full cost, and SDA Bocconi publishes no total living budget for Milan, only a monthly range of personal expenses. Our model does not turn a range into a budget, so it computes no total cost and the school is not ranked. Enter your own living estimate in the calculator above to get a payback on the ${K.salary(slug)} average.` },
  ],
  related: ['school:insead', 'school:hec-paris', 'school:iese', 'best-mba-europe', 'best-mba-one-year', 'mba-salary'],
});
