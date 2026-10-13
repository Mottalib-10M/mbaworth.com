import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'mit-sloan';
const s = K.s(slug);
const o = K.roi(slug)!;
const ord = (n: number) => (n === 1 ? 'first' : `number ${n}`);
const sal = s.emp.salary!;
const withResp = K.schools.filter((x) => x.emp.response !== null);
const higherResp = withResp.filter((x) => x.emp.response! > s.emp.response!).length;
const withQuart = K.schools.filter((x) => x.emp.salary?.p25 && x.emp.salary?.p75).length;
const fn = (label: string) => s.emp.functions.find((f) => f.label === label);
const pm = fn('Product Management/Development'), bd = fn('Business Development'), ops = fn('Operations/Project Management'), ba = fn('Business Analytics');
const rkHc = K.rank(slug, 'healthcare'), rkPm = K.rank(slug, 'f-product'), rkT = K.rank(slug, 'tech'), rkAll = K.rank(slug, 'all');
const vc = s.emp.segments.find((x) => x.key === 'vc');
const intern = s.emp.intern!;
const internBack = Math.round(intern.monthly * K.MODEL.internMonths);

export default defineSchool({
  slug,
  title: 'MIT Sloan MBA 2026: Product Roles, Total Cost and Payback',
  description: `MIT Sloan MBA 2026: ${K.direct(slug)} for two years in Cambridge, a ${K.salary(slug)} median base salary, ${K.share(slug, 'tech')} of graduates in tech, and the payback for your own salary.`,
  intro: `MIT Sloan's class of 2025 answered its employment survey almost to the last graduate and reported a ${K.salary(slug)} median base salary, on a two-year bill of ${K.direct(slug)}.`,
  resume: `The MIT Sloan MBA costs ${K.direct(slug)} for two years in tuition, MIT student fees and the university's graduate living budget, before the salary you give up; the tuition figure already includes the MBA program fee. For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)}, the paid summer internship gives back about ${K.usd(internBack)}, and the total comes to ${K.usd(o.total)}. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, with the middle half of salaries between ${K.money(sal.p25!, 'USD')} and ${K.money(sal.p75!, 'USD')}. On the median, the model repays the cost ${K.payback(slug)} after graduation and leaves a ten-year net present value of ${K.npv(slug)}. What sets Sloan apart is the weight of operational and product jobs next to consulting: ${pm ? `${K.p(pm.pct!)} of graduates went into product management` : 'product management is a large function'}${ops ? `, ${K.p(ops.pct!)} into operations` : ''} and ${K.share(slug, 'healthcare')} into healthcare.`,
  body: (h) => `<h2>Figures you can lean on</h2>
<p>${K.p(s.emp.response!)} of the class of 2025 answered the employment survey. ${higherResp === 0 ? 'No school in our data reports a higher response rate' : `Only ${higherResp} of the ${withResp.length} schools in our data that publish a response rate report a higher one`}, and Sloan is one of ${withQuart} schools that give the 25th and 75th percentiles of salary as well as the median. That matters when you use the calculator: the middle half of the class earned between ${K.money(sal.p25!, 'USD')} and ${K.money(sal.p75!, 'USD')}, so typing the lower figure gives a cautious case that still describes a real quarter of graduates rather than a guess.</p>
<h2>Product, operations and healthcare</h2>
<p>Consulting is still the largest industry, ${K.share(slug, 'consulting')} of the class at ${K.segSalary(slug, 'consulting')}. The rest of the report reads differently from the finance schools. ${pm ? `Product management took ${K.p(pm.pct!)} of graduates${pm.salary ? ` at a ${K.money(pm.salary, 'USD')} median${pm.salary > sal.v ? ', above the school-wide figure' : ''}` : ''}` : 'Product management is a large function'}${rkPm ? `, ${ord(rkPm.rank)} of ${rkPm.of} in our product management ranking` : ''}. ${bd && ops ? `Business development and operations each took ${bd.pct === ops.pct ? K.p(bd.pct!) : `${K.p(bd.pct!)} and ${K.p(ops.pct!)}`}` : ''}${ba ? `, and business analytics ${K.p(ba.pct!)}` : ''}. Technology employs ${K.share(slug, 'tech')} of the class at ${K.segSalary(slug, 'tech')}${rkT ? `, ${ord(rkT.rank)} of ${rkT.of} in our tech ranking` : ''}.</p>
<p>Healthcare is where Sloan places highest among the industry rankings: ${K.share(slug, 'healthcare')} of the class at ${K.segSalary(slug, 'healthcare')}${rkHc ? `, which places the school ${ord(rkHc.rank)} of ${rkHc.of} for healthcare` : ''}. Graduates from engineering or science backgrounds who want to move into healthcare management should test the healthcare median in the calculator, since it sits below the school-wide figure. ${vc?.salary ? `Venture capital is small, ${K.p(vc.pct!)}, and pays below the school median at ${K.money(vc.salary, 'USD')}.` : ''}</p>
${h.miniGoal(slug)}
<h2>Why the bill is high</h2>
<p>Tuition is ${K.money(s.tuition!.v / 2, 'USD')} a year. The living budget of ${K.living(slug)} is the MIT graduate budget for two nine-month years, not a Sloan figure, and it counts the MIT health plan, rent, food, books, personal costs and transport in Cambridge; a first-year computer allowance is left out. Summer is paid: the class of 2026 reported a median internship salary of ${K.money(intern.monthly, 'USD')} a month, which the calculator subtracts for ${K.num(K.MODEL.internMonths, 1)} months. ${rkAll ? `On the overall model, Sloan ranks ${ord(rkAll.rank)} of ${rkAll.of}.` : ''} Above about ${K.usd(Math.ceil(s.tuition!.v / 1.75 / 1000) * 1000)} of current salary, the pay you give up becomes the largest line of the bill.</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the MIT Sloan MBA cost in total?', a: `Tuition, MIT student fees and the university's graduate living budget come to ${K.direct(slug)} for the two years starting in 2026. Counting the salary given up by a person earning ${K.ref()}, net of the summer internship pay, the total reaches ${K.usd(o.total)}. The tuition figure already includes the MBA program fee the school charges each year.` },
    { q: 'What salary do MIT Sloan MBA graduates earn?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}, with a quarter of graduates below ${K.money(sal.p25!, 'USD')} and a quarter above ${K.money(sal.p75!, 'USD')}. ${K.p(s.emp.bonus!.pct!)} received a signing bonus at a median of ${K.money(s.emp.bonus!.v, 'USD')}. Consulting paid ${K.segSalary(slug, 'consulting')}, technology ${K.segSalary(slug, 'tech')} and healthcare ${K.segSalary(slug, 'healthcare')}, all for graduates who accepted a job and reported pay.` },
    { q: 'How long does it take to pay back an MIT Sloan MBA?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school median, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax. On the 25th percentile salary of ${K.money(sal.p25!, 'USD')}, the payback is longer; the calculator above shows it once you type that figure.` },
    { q: 'Is MIT Sloan a good MBA for product management?', a: `${pm ? `${K.p(pm.pct!)} of the class of 2025 took product management or development roles${pm.salary ? ` at a ${K.money(pm.salary, 'USD')} median` : ''}` : 'Product management is one of its largest functions'}${rkPm ? `, ${ord(rkPm.rank)} of ${rkPm.of} schools in our ranking for that function` : ''}. Technology as an industry took ${K.share(slug, 'tech')} of graduates at ${K.segSalary(slug, 'tech')}, ${K.shareRaw(slug, 'tech')! > K.shareRaw(slug, 'finance')! ? 'ahead of' : 'next to'} finance at ${K.share(slug, 'finance')}, so product roles sit inside a broad tech recruiting base.` },
  ],
  related: ['school:harvard', 'school:stanford', 'school:berkeley-haas', 'best-mba-tech', 'tech-product-manager', 'mba-finder'],
});
