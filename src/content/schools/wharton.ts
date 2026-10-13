import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.s('wharton');
const o = K.roi('wharton')!;
const pe = s.emp.segments.find((x) => x.key === 'pe')!;
const ib = s.emp.segments.find((x) => x.key === 'ib')!;
const intern = s.emp.intern!;
const rk = K.rank('wharton', 'pe');

export default defineSchool({
  slug: 'wharton',
  title: 'Wharton MBA Cost 2026: Tuition, Salary and Payback',
  description: `Wharton MBA 2026: ${K.tuition('wharton')} tuition for two years, ${K.living('wharton')} living budget, ${K.salary('wharton')} median base salary, and the total cost and payback for your own salary.`,
  intro: `Two years in Philadelphia cost ${K.direct('wharton')} before the salary you give up; the class of 2025 reported a ${K.salary('wharton')} median base salary.`,
  resume: `The Wharton MBA costs ${K.direct('wharton')} in tuition, university fees and the school's own living budget for the two years starting in 2026, before counting the salary you stop earning. For a person earning ${K.ref()} today, the 21 months away add ${K.usd(o.forgone)}, the summer internship gives back about ${K.usd(Math.round(intern.monthly * K.MODEL.internMonths))}, and the total comes to ${K.usd(o.total)}. The class of 2025 reported a median base salary of ${K.salary('wharton')}, with a median signing bonus of ${K.money(s.emp.bonus!.v, 'USD')} for the ${K.p(s.emp.bonus!.pct!)} who received one. On those figures the degree is repaid ${K.payback('wharton')} after graduation and leaves a ten-year net present value of ${K.npv('wharton')}. Wharton is the most finance-heavy school on this site: ${K.share('wharton', 'finance')} of the class went into financial services, ${K.p(pe.pct!)} into private equity alone.`,
  body: (h) => `<h2>A finance school that also feeds consulting</h2>
<p>Wharton's report splits financial services into more segments than most schools, and the numbers explain its reputation. Of the class of 2025, ${K.p(ib.pct!)} went into investment banking at a median ${K.money(ib.salary!, 'USD')}, and ${K.p(pe.pct!)} into private equity and buyouts at ${K.money(pe.salary!, 'USD')}, the highest median of any large segment in the report. ${rk ? `That places Wharton ${rk.rank === 1 ? 'first' : `number ${rk.rank}`} of ${rk.of} in our ${h.a('best-mba-private-equity', 'private equity ranking')}. ` : ''}Consulting still takes ${K.share('wharton', 'consulting')} of the class at ${K.segSalary('wharton', 'consulting')}, the same median as the large strategy firms pay at other top schools.</p>
<p>Technology is smaller than at the West Coast schools, ${K.share('wharton', 'tech')} of the class, and pays less than finance and consulting, ${K.segSalary('wharton', 'tech')}. Someone aiming for product management in California should compare with ${h.sc('berkeley-haas')} and ${h.sc('stanford')} in the ${h.a('best-mba-tech', 'tech ranking')}.</p>
${h.miniGoal('wharton')}
<h2>Where the cost of two years comes from</h2>
<p>Tuition is ${K.money(s.tuition!.v / 2, 'USD')} a year and university fees ${K.money(s.fees!.v / 2, 'USD')}, for ${K.tuition('wharton')} and ${K.fees('wharton')} over the program. The school's own budget for a single student adds ${K.money(s.living!.v / 2, 'USD')} a year for rent, food, health insurance, books and transport, and that budget includes the university health plan, which many students forget to count. The summer between the two years is paid: the class of 2026 reported a median internship pay of ${K.money(intern.monthly, 'USD')} a month, which the calculator subtracts for about ${K.num(K.MODEL.internMonths, 1)} months.</p>
<p>The salary you give up weighs more than any of these lines once you earn more than ${K.usd(Math.ceil(s.tuition!.v / 1.75 / 1000) * 1000)} a year, the point where 21 months of salary exceed the whole tuition. Type your own salary in the calculator at the top: above a certain level, the payback stretches quickly, because the median after the MBA does not move.</p>
${h.miniPayback('wharton')}
<h2>Almost everyone stays in the United States</h2>
<p>${K.share('wharton', 'z-us')} of the graduates who took a job stayed in the United States; the report puts close to half of the class in New York City alone. The school counts ${K.share('wharton', 'z-asia')} in Asia and ${K.share('wharton', 'z-europe')} in Europe. For an international student who wants to return home after the degree, a two-year American program is a long and expensive detour unless the plan is to work a few years in the United States first: compare the regional rankings, such as ${h.a('best-mba-europe', 'working in Europe')}, before applying. The class entering in 2025 is ${K.intl('wharton')} international, from ${K.num(s.profile.countries!)} countries.</p>
${h.miniScholarship('wharton')}`,
  faqs: [
    { q: 'How much does the Wharton MBA cost in total?', a: `Tuition and fees for the two years starting in 2026 are ${K.usd(s.directLocal!)}, and the school budgets ${K.living('wharton')} for living costs, for ${K.direct('wharton')}. Add the salary you give up: for a person earning ${K.ref()}, the total reaches ${K.usd(o.total)} after the summer internship pay.` },
    { q: 'What is the median salary after a Wharton MBA?', a: `The class of 2025 reported a median base salary of ${K.salary('wharton')}, with the middle half between ${K.money(s.emp.salary!.p25!, 'USD')} and ${K.money(s.emp.salary!.p75!, 'USD')}. ${K.p(s.emp.bonus!.pct!)} also received a signing bonus, at a median of ${K.money(s.emp.bonus!.v, 'USD')}. Private equity had the highest median of the large segments, ${K.money(pe.salary!, 'USD')}, ahead of consulting.` },
    { q: 'How long does it take to repay a Wharton MBA?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback('wharton')} after graduation, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the MBA and ${Math.round(K.MODEL.g0 * 100)}% without, before tax. The payback lengthens as your current salary rises, since you give up more and gain less.` },
    { q: 'Is Wharton better than other schools for private equity?', a: `It places ${K.p(pe.pct!)} of its class in private equity and buyouts at a ${K.money(pe.salary!, 'USD')} median, one of the largest pipelines in the reports we read. ${rk ? `Our private equity ranking puts it ${rk.rank === 1 ? 'first' : `number ${rk.rank}`} of ${rk.of} schools,` : 'Our ranking compares it'} on share, salary and ten-year value for the same person.` },
  ],
  related: ['school:harvard', 'school:stanford', 'best-mba-private-equity', 'best-mba-investment-banking', 'compare-mba'],
});
