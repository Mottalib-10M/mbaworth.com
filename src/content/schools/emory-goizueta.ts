import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'emory-goizueta';
const s = K.s(slug);
const o = K.roi(slug);
const pb = (x: string) => K.roi(x)?.payback ?? null;
const byPb = K.schools.filter((x) => pb(x.slug) !== null).sort((a, b) => pb(a.slug)! - pb(b.slug)!);
const pbFirst = byPb[0]?.slug === slug;
const next = byPb.find((x) => x.slug !== slug);
const peers = K.schools.filter((x) => x.slug !== slug && x.emp.salary?.usd && s.emp.salary?.usd && x.emp.salary.usd >= s.emp.salary.usd && K.c(x.slug).tuition !== null);
const cheaperThan = peers.filter((x) => K.c(x.slug).tuition! > K.c(slug).tuition!).length;
const rHc = K.rank(slug, 'healthcare'), rCons = K.rank(slug, 'consulting'), rAll = K.rank(slug, 'all');
const consFn = s.emp.functions.find((f) => /^Consulting/.test(f.label));
const intern = s.emp.intern, bonus = s.emp.bonus;
const coh = s.emp.cohort.replace(/^Two-Year MBA /i, '').toLowerCase();
const internTop = K.schools.every((x) => (x.emp.intern?.usd ?? 0) <= (intern?.usd ?? 0));

export default defineSchool({
  slug,
  title: 'Emory Goizueta MBA 2026: Fast Payback, Cost and Salary',
  description: `Emory Goizueta two-year MBA 2026: ${K.direct(slug)} in Atlanta, a ${K.salary(slug)} ${K.salaryKind(slug)} and a payback of ${K.payback(slug) ?? 'several years'} for someone earning ${K.ref()} before the degree.`,
  intro: `${pbFirst ? 'The shortest payback of any school on this site for our reference person' : `A payback of ${K.payback(slug)} for our reference person`}, on a median salary ${cheaperThan ? 'that matches more expensive programs' : 'that is high for the price'}.`,
  resume: `Two years at Emory's Goizueta Business School cost ${K.direct(slug)} in tuition, mandatory fees with the required health plan, and the school's living estimate for Atlanta, before the salary you give up. ${o ? `For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)}${intern ? `, the summer internship at a median ${K.money(intern.monthly, intern.cur)} a month gives back part of it,` : ''} and the total reaches ${K.usd(o.total)}.` : ''} The ${coh} reported a ${K.salaryKind(slug)} of ${K.salary(slug)}${bonus ? `, and ${bonus.pct !== null ? K.p(bonus.pct) : 'most'} of those reporting pay received a signing bonus with a median of ${K.money(bonus.v, bonus.cur)}` : ''}, with a survey that reached ${s.emp.response !== null ? K.p(s.emp.response) : 'nearly all'} of graduates. ${o ? `That repays the total ${K.payback(slug)} after graduation${pbFirst ? ', faster than any other school in our data' : ''}, with a ten-year net present value of ${K.npv(slug)}.` : ''} What sets Goizueta apart is that ratio: ${cheaperThan ? (cheaperThan === peers.length ? `every one of the ${peers.length} schools whose median is at least as high charges more tuition` : `of the ${peers.length} schools whose median is at least as high, ${cheaperThan} charge more tuition`) : 'the median is high for the price'}. The class is small and leans heavily toward consulting.`,
  body: (h) => `<h2>Why the payback is so short</h2>
<p>The payback depends on two numbers more than any other: what the degree costs and how far the salary rises. Goizueta's median is ${K.salary(slug)} and its tuition ${K.tuition(slug)}. ${cheaperThan ? `In our data, ${cheaperThan} schools report a median at least as high and charge more tuition for it.` : ''} ${next ? `The next-fastest school in our data, ${h.sc(next.slug)}, takes ${K.payback(next.slug)}, so the lead is narrow and could change with the next report.` : ''} Fees look high at ${K.fees(slug)} because they include about two years of the required health plan, which some schools put in the living budget instead, so compare the full ${K.direct(slug)} rather than tuition alone.</p>
<p>Two cautions. A small class, ${s.classSize !== null ? K.num(s.classSize) : 'little more than a hundred'} students entering a year, means a few offers can move the median, and the school's mean base salary is lower than its median. The report also shows a higher median for graduates without permanent US work authorization than for those with it, a sign that the median sits on a cluster of standard consulting and banking offers.</p>
${h.miniPayback(slug)}
<h2>A consulting school with a healthcare lead</h2>
<p>Consulting took ${K.share(slug, 'consulting')} of graduates by industry and ${consFn?.pct != null ? K.p(consFn.pct) : 'more'} by function, at ${K.segSalary(slug, 'consulting') ?? 'an unpublished median'}${rCons ? `, number ${rCons.rank} of ${rCons.of} in our ${h.a('best-mba-consulting', 'consulting ranking')}` : ''}. Healthcare took ${K.share(slug, 'healthcare')} at ${K.segSalary(slug, 'healthcare') ?? 'an unpublished median'}${rHc ? `, which puts Goizueta number ${rHc.rank} of ${rHc.of} in our healthcare list` : ''}; the employer list includes a large kidney care company next to the strategy firms and regional banks. Finance took ${K.share(slug, 'finance')} at ${K.segSalary(slug, 'finance') ?? 'an unpublished median'}.</p>
<p>Technology is the weak spot: ${K.share(slug, 'tech')} of the class at ${K.segSalary(slug, 'tech') ?? 'a lower median'}. ${o ? `Aimed at tech, the payback for the reference person stretches to ${K.payback(slug, 'tech') ?? 'more than thirty years'}.` : ''} ${K.share(slug, 'z-us')} of graduates stayed in the United States.</p>
${h.miniGoal(slug)}
<h2>The paid summer and the people in the room</h2>
<p>${intern ? `The class of interns reported a median of ${K.money(intern.monthly, intern.cur)} a month${internTop ? ', as high as any school in our data' : ''}, and the calculator subtracts about ${K.num(K.MODEL.internMonths, 1)} months of it from the cost. ` : ''}The ${s.profile.cohort || 'latest class'} is ${K.intl(slug) ?? 'partly'} international and ${s.profile.women !== null ? K.p(s.profile.women) : 'partly'} women, with an average of ${s.profile.exp !== null ? K.num(s.profile.exp) : 'several'} years of experience before the MBA. The fees, budget and employment figures on this page all refer to the two-year program, which the school reports separately from its other tracks. The ${h.a('mba-payback-calculator', 'payback calculator')} adds a loan to the same model.</p>`,
  faqs: [
    { q: 'How much does the Emory Goizueta two-year MBA cost?', a: `Tuition is ${K.tuition(slug)} for the program, fees with the required health plan add ${K.fees(slug)}, and the school estimates ${K.living(slug)} for living costs, for ${K.direct(slug)}. ${o ? `With the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)} after internship pay.` : ''} The health plan can be waived with proof of other cover.` },
    { q: 'Why does Emory Goizueta have such a short MBA payback?', a: `${o ? `For a person earning ${K.ref()} before the MBA, the payback is ${K.payback(slug)}${pbFirst ? ', the shortest in our data' : ''}, because the ${K.salaryKind(slug)} of ${K.salary(slug)} matches ${cheaperThan ? 'schools with higher tuition' : 'larger programs'} while tuition is ${K.tuition(slug)}.` : 'The school publishes no figure that would let us compute it.'} A small class means the median can move from one year to the next.` },
    { q: 'Is Emory Goizueta good for a healthcare career?', a: `${K.share(slug, 'healthcare')} of the ${coh} went into healthcare at a median of ${K.segSalary(slug, 'healthcare') ?? 'not published'}${rHc ? `, and our healthcare ranking places Goizueta number ${rHc.rank} of ${rHc.of}` : ''}, on share, salary and ten-year value for a person earning ${K.ref()} before the degree. Consulting is still the larger destination by far.` },
    { q: 'What do Emory Goizueta MBA graduates earn?', a: `The ${coh} reported a ${K.salaryKind(slug)} of ${K.salary(slug)}. Consulting and finance both paid ${K.segSalary(slug, 'consulting') ?? 'the same median'}, healthcare ${K.segSalary(slug, 'healthcare') ?? 'less'} and technology ${K.segSalary(slug, 'tech') ?? 'less'}. ${bonus ? `${bonus.pct !== null ? K.p(bonus.pct) : 'Most'} of salary reporters received a signing bonus, median ${K.money(bonus.v, bonus.cur)}, which the calculator does not count.` : ''} Pay outside these industries is not split out.` },
  ],
  related: ['school:duke-fuqua', 'school:uva-darden', 'school:vanderbilt-owen', 'best-mba-consulting', 'mba-payback-calculator', 'mba-roi'],
});
