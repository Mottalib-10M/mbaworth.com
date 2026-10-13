import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const ke = K.roi('indiana-kelley')!;
const keDirect = K.c('indiana-kelley');
const keD = keDirect.tuition! + keDirect.fees + keDirect.living!;
const share = Math.round((ke.forgone / ke.total) * 100);
const ke150 = K.roi('indiana-kelley', 'all', 150000)!;
const s = K.s('indiana-kelley');
const withReport = K.schools.filter((x) => x.emp.salary !== null).length;

export default definePage({
  id: 'online-mba',
  group: 'guides',
  order: 2,
  slug: 'online-mba',
  nav: 'Online MBA vs full-time',
  card: 'The salary you keep with an online MBA, what full-time employment reports cannot tell you about online degrees, and how to judge the return.',
  title: 'Online MBA 2026: The Salary You Keep and What Reports Miss',
  description: `Online MBA in 2026: how keeping your salary changes cost more than tuition, what full-time employment reports cannot say about online degrees, and payback.`,
  h1: 'Online MBA: keeping the salary, losing the report',
  intro: `At Kelley's full-time MBA, the salary a ${K.ref()} earner gives up is ${share}% of the total cost; an online degree keeps that salary and leaves the rest of the question open.`,
  resume: `The main financial difference between an online MBA and a full-time one is not the tuition but the salary. A full-time student stops earning for one or two years, and that lost salary is usually the largest line of the cost. At Indiana Kelley, for example, the full-time MBA costs ${K.usd(keD)} in tuition, fees and the school's living budget, but ${K.usd(ke.total)} in total for a person earning ${K.ref()} today, because ${K.usd(ke.forgone)} of salary is given up over 21 months, net of the summer internship. At ${K.usd(150000)}, the total reaches ${K.usd(ke150.total)}. An online student keeps that income, studies in the evenings and pays tuition only. The other side of the trade is evidence: the employment reports that this site reads describe full-time graduates who changed jobs through campus recruiting, and they say nothing about what an online degree does for someone who stays in work. Type the tuition of the online program and the raise you expect in the calculator below, rather than borrowing a full-time median.`,
  faqs: [
    { q: 'Why does an online MBA cost less in total than a full-time MBA?', a: `Mainly because you keep earning. For a person earning ${K.ref()}, ${K.usd(ke.forgone)} of the ${K.usd(ke.total)} total cost of Kelley's full-time MBA is salary not earned during the program, net of the internship. An online student also avoids moving, so the living budget is not an extra cost. Tuition is often similar, sometimes lower; that part varies by school and you should read it on its page.` },
    { q: 'Do employment reports cover online MBA graduates?', a: `Not the ones this site reads. Full-time reports follow the MBA CSEA standards and count graduates of the full-time program who were seeking a job, three months after graduation. Online students mostly keep their job, so a share hired in consulting or a median base salary does not describe them. Of the ${K.schools.length} schools we read, ${withReport} publish a full-time salary, and none of those figures covers online students.` },
    { q: 'How do I estimate the payback of an online MBA myself?', a: 'Take the tuition you will pay, minus any employer contribution, and divide it by the yearly raise you expect from the degree, before tax. If the raise would come anyway with promotion, count only the part due to the degree. The executive MBA calculator on this site does exactly this, since the arithmetic is the same: no salary given up, tuition only.' },
    { q: 'Is an online MBA a good route for changing career?', a: 'It is a weaker route than a full-time program for a change of industry or country, because the change usually happens through the summer internship and the on-campus recruiting that online formats lack. It works better for progressing in your current field, for moving to management inside your employer, or when the degree is a formal requirement for a promotion.' },
  ],
  body: (h) => `<h2>The opportunity cost is the real price</h2>
<p>Economists call it opportunity cost: the value of what you give up to do something. For a full-time MBA, it is the salary you would have earned during the program, and it is usually larger than the tuition. Take Kelley's two-year program as an example from the data. Tuition is ${K.tuition('indiana-kelley')}, fees ${K.fees('indiana-kelley')}, and the school's budget for living costs ${K.living('indiana-kelley')}. For a person earning ${K.ref()}, 21 months away mean ${K.usd(ke.forgone)} of salary not earned once the summer internship pay is counted back. The salary line is ${share}% of the total, and it grows with your pay: at ${K.usd(150000)}, it becomes ${K.usd(ke150.forgone)}.</p>
<p>An online program removes that line. You keep your salary, your pension contributions and your place in the company, and you avoid moving to a campus town. That is the strongest argument for the format, and it is a financial one. Use the calculator below to see how much salary a full-time program would cost you, with your own figures.</p>
${h.mini('forgone')}
<h2>What a full-time employment report cannot tell you</h2>
<p>Every outcome figure on this site comes from a full-time report: the share of the class hired in consulting, the median base salary, the payback built on that salary. Those numbers describe a precise group. They are graduates who left work, used the summer internship and the campus recruiting season, and were seeking a new job when they answered the survey. Kelley's class of ${s.classSize ? K.num(s.classSize) : 'full-time students'} is that kind of group: ${K.p(s.emp.employed!)} ${s.emp.employedLabel}, at a ${K.salary('indiana-kelley')} ${K.salaryKind('indiana-kelley')}.</p>
<p>An online student is in a different position. Most stay with their employer, so there is no new job to count; many are further into their career; and the gain, if there is one, arrives as a promotion or a raise over several years rather than as an offer at graduation. Applying a full-time median to an online degree would mix two effects, the degree and the job change, and credit the online student with a job change they did not make. Schools that report on online programs use their own surveys, with their own definitions, and we have not read them, so this page publishes no online outcome figure.</p>
<h2>A payback you compute yourself</h2>
<p>Without a salary report, the honest method is to start from what you know. Write down the tuition the online program charges, take away what your employer pays, and estimate the raise the degree adds, beyond what you would get anyway. The ratio gives the years to repay, before tax. The calculator below does it in one step; it was built for executive programs, and the arithmetic is the same since neither format costs a salary.</p>
${h.mini('emba')}
<h2>When the online route makes sense</h2>
<p>The format fits three situations well. You want to progress in your current field, where the degree is valued but the employer does not change. Your employer requires a master's degree for a promotion or pays for part of it. Or your salary is high enough that the full-time route would cost far more than the tuition of any program. It fits badly when the goal is a different industry, a different country or a firm that hires mostly through campus recruiting, such as the large consulting firms and investment banks, because those changes go through the summer internship that online formats do not include.</p>
<p>Before choosing, compare the online tuition with the total cost of a short full-time program in the ${h.a('mba-cost', 'cost calculator')}, read the ${h.a('executive-mba', 'executive MBA page')} for the other salary-keeping format, and check the ${h.a('mba-employment-report', 'guide to employment reports')} to see what a school's figures can and cannot prove.</p>`,
  tool: 'roi',
  toolArgs: { school: 'indiana-kelley' },
  related: ['executive-mba', 'mba-cost', 'mba-employment-report', 'is-an-mba-worth-it', 'school:indiana-kelley'],
  sources: ['mbacsea', 'gmac', 'ecb_fx'],
  schoolSources: ['indiana-kelley'],
});
