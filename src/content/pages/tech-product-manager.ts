import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const R = K.ranking('f-product');
const pmRow = (slug: string) => K.s(slug).emp.functions.filter((f) => f.key === 'product').sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0))[0];
const pure = ['stanford', 'mit-sloan', 'chicago-booth', 'kellogg', 'ucla-anderson', 'texas-mccombs', 'wharton', 'nyu-stern'].map((s) => ({ s, r: pmRow(s) })).filter((x) => x.r && x.r.salary);
const mixed = ['imd', 'michigan-ross', 'columbia', 'cmu-tepper'].map((s) => ({ s, r: pmRow(s) })).filter((x) => x.r);
const hi = [...pure].sort((a, b) => b.r.salary! - a.r.salary!);
const mit = K.roi('mit-sloan', 'f-product')!;
const cis = K.P.bls.occupations['113021'];
const sd = K.P.bls.occupations['151252'];

export default definePage({
  id: 'tech-product-manager',
  group: 'tech',
  order: 2,
  slug: 'tech/product-manager',
  nav: 'Product manager after an MBA',
  card: 'The product manager job after an MBA, the schools that publish a product management line and the salaries they report for it.',
  title: 'Product Manager After an MBA 2026: Salary and Schools',
  description: `Product manager after an MBA in 2026: what the job is, which schools report a product management share, medians from ${K.money(hi[hi.length - 1].r.salary!, 'USD')} to ${K.money(hi[0].r.salary!, 'USD')} and payback.`,
  h1: 'Product manager after an MBA: the job and what schools report',
  intro: `MIT counts ${K.p(pmRow('mit-sloan').pct!)} of its class in product management and Stanford ${K.p(pmRow('stanford').pct!)}; most schools that publish the line place between one graduate in twenty and one in ten there.`,
  resume: `Product management is the job most MBA graduates in tech aim for: owning what a product does and in what order, with engineers and designers who do not report to the product manager. Only some schools publish it as a separate function, and their figures are close. In the class of 2025, MIT Sloan reported ${K.p(pmRow('mit-sloan').pct!)} of its graduates in product management at a ${K.money(pmRow('mit-sloan').salary!, 'USD')} median base, Stanford ${K.p(pmRow('stanford').pct!)} at ${K.money(pmRow('stanford').salary!, 'USD')}, Kellogg ${K.p(pmRow('kellogg').pct!)} at ${K.money(pmRow('kellogg').salary!, 'USD')} and UCLA ${K.p(pmRow('ucla-anderson').pct!)} at ${K.money(pmRow('ucla-anderson').salary!, 'USD')}. Those medians sit near the ${K.usd(cis.median)} BLS median for computer and information systems managers, and below the consulting medians of the same schools. Stock grants, a large part of product manager pay at big tech firms, are left out of every report. For a person earning ${K.ref()} today, MIT's product management median repays the degree in ${K.yrs(mit.payback!)}.`,
  faqs: [
    { q: 'What does a product manager do after an MBA?', a: 'A product manager decides what a product should do next and why: talking to customers, reading usage data, writing the requirements, setting priorities with engineering and design, and answering for the launch. MBA hires usually start as product manager or senior product manager, one level above graduates hired from college. The authority is informal, because the engineers report to their own managers.' },
    { q: 'Which MBA programs report the most graduates in product management?', a: `Among schools that publish a pure product management line, MIT reports ${K.p(pmRow('mit-sloan').pct!)}, Stanford ${K.p(pmRow('stanford').pct!)}, Kellogg ${K.p(pmRow('kellogg').pct!)} and UCLA ${K.p(pmRow('ucla-anderson').pct!)}. Larger figures exist, such as Michigan's ${K.p(pmRow('michigan-ross').pct!)}, but they combine product management with brand management, a marketing job in consumer goods, so they count a wider group of graduates.` },
    { q: 'How much does an MBA product manager earn in base salary?', a: `The medians schools report for product management in the class of 2025 run from ${K.money(hi[hi.length - 1].r.salary!, 'USD')} at ${K.s(hi[hi.length - 1].s).short} to ${K.money(hi[0].r.salary!, 'USD')} at ${K.s(hi[0].s).short}. That is base salary only: restricted stock units and annual bonuses at large tech firms often add a significant amount, and the reports do not count them.` },
    { q: 'Is product management harder to enter after an MBA than consulting?', a: `In numbers, yes. MIT places ${K.p(pmRow('mit-sloan').pct!)} of its class in product roles against ${K.share('mit-sloan', 'f-consulting')} in consulting and strategy functions; Kellogg ${K.p(pmRow('kellogg').pct!)} against ${K.share('kellogg', 'f-consulting')}. Tech firms hire fewer MBAs per company than consulting firms do, and many product teams prefer candidates with a technical or product background before the degree.` },
  ],
  body: (h) => `<h2>The job between engineering and the customer</h2>
<p>A product manager is responsible for what a product does without being anyone's boss. The engineers who build it report to engineering managers, the designers to a design lead, and the product manager's authority comes from knowing the customer and the numbers better than anyone else in the room. The week mixes customer interviews, usage data, writing specifications, setting priorities for the next releases and explaining to sales and marketing what is coming. Success is measured on adoption, revenue or retention, often months after the decisions that produced it.</p>
<p>MBA graduates usually join large tech firms as product manager or senior product manager, through a summer internship in a two-year program. Some companies run rotational associate product manager programs for college graduates, which is one reason a product role after the MBA tends to go to people with some prior exposure to software: engineers who want to move to the business side, consultants who worked on digital projects, founders.</p>
<h2>Which schools publish a product management line</h2>
<p>Product management appears in the job function table, not the industry table, and not every school separates it. Among those that do, ${K.listOf(pure.map((x) => `${K.s(x.s).short} ${K.p(x.r.pct!)} at ${K.money(x.r.salary!, 'USD')}`))} in the class of 2025. Read the label before the number. ${K.listOf(mixed.map((x) => `${K.s(x.s).short} reports "${x.r.label}" (${K.p(x.r.pct!)})`))}: these lines mix product management with brand management, product marketing or sales, so a larger share does not mean more product managers. IMD's line, ${R.ranked[0].slug === 'imd' ? 'which our ranking puts first, ' : ''}is "${pmRow('imd').label}", an average of total pay for a mixed group in a one-year program.</p>
${h.rankTable('f-product', 10)}
<p>The ranking above uses each school's largest product line, whatever its label, because that is what the school publishes. The finder at the top of the page lets you sort on salary or share alone, and the school pages show every function line in full.</p>
${h.miniGoal('mit-sloan')}
<h2>Base pay, stock and the payback</h2>
<p>The base medians are close to each other: ${K.money(hi[0].r.salary!, 'USD')} at ${K.s(hi[0].s).short}, ${K.money(pmRow('mit-sloan').salary!, 'USD')} at MIT, ${K.money(pmRow('kellogg').salary!, 'USD')} at Kellogg, ${K.money(pmRow('nyu-stern').salary!, 'USD')} at ${K.s('nyu-stern').short}. They sit below the consulting medians of the same schools: MIT reports ${K.segSalary('mit-sloan', 'consulting')} for consulting. The difference with consulting lies in what is not counted. Large tech firms pay part of the package in restricted stock units that vest over several years and an annual bonus, and employment reports, which follow the MBA CSEA standards, count base salary and signing bonus only. A product offer at a listed firm can be worth more than a consulting offer with a higher base, or less if the share price falls.</p>
<p>The calculator at the top is set on MIT Sloan and the product management goal. For a person earning ${K.ref()} before the degree, the total cost of ${K.usd(mit.total)} is repaid in ${K.yrs(mit.payback!)} with MIT's product median, before tax and without stock. Change the school or your salary: since the product medians differ little, the cost of the program and the salary you give up decide most of the result.</p>
${h.miniTwo('mit-sloan', 'kellogg')}
<h2>What engineering pay says about the role</h2>
<p>The Bureau of Labor Statistics has no product manager occupation. The closest lines show what the people around a product manager earn: computer and information systems managers had a median wage of ${K.usd(cis.median)} in ${K.P.bls.period}, with a top quarter above ${K.usd(cis.p75)}, and software developers ${K.usd(sd.median)}. MBA product medians fall near the first line. The degree does not buy a premium over the engineering managers a product manager works with; it buys a way into the role for someone without the engineering path. Type a salary in the box below to see where it falls among systems managers.</p>
${h.miniPosition('113021')}
<h2>Preparing for a product role during the MBA</h2>
<p>Recruiting for product internships runs in the first year of a two-year program, and interviews test product sense (how you would improve a product), analytical questions on metrics and, at some firms, a basic understanding of how software is built. Schools close to the large employers have an advantage in access, as the ${h.a('tech', 'tech overview')} shows with the West Coast shares, but large firms recruit at MIT, Kellogg, Booth and McCombs as well. Before choosing a school on this goal, compare its product line with its consulting line in the ${h.a('best-mba-tech', 'tech ranking')}: a school where product management is a small share of the class can still be the right choice if you plan to start in consulting and move to tech later.</p>`,
  tool: 'roi',
  toolArgs: { school: 'mit-sloan', goal: 'f-product' },
  related: ['tech', 'best-mba-tech', 'school:mit-sloan', 'school:kellogg', 'school:stanford', 'mba-finder'],
  sources: ['bls_oews', 'mbacsea', 'ecb_fx'],
  schoolSources: ['mit-sloan', 'stanford', 'kellogg', 'ucla-anderson', 'chicago-booth', 'texas-mccombs', 'michigan-ross'],
});
