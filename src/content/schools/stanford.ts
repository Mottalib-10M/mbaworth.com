import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.s('stanford');
const o = K.roi('stanford')!;
const seg = (k: string) => s.emp.segments.find((x) => x.key === k);
const vc = seg('vc'), pe = seg('pe'), am = seg('am');
const tech = K.rank('stanford', 'tech'), fin = K.rank('stanford', 'finance');
const fees = s.fees!.v;
const fee = (slug: string) => { const c = K.c(slug); return c.tuition === null ? -1 : c.tuition + c.fees; };
const dearest = [...K.schools].sort((a, b) => fee(b.slug) - fee(a.slug))[0].slug === 'stanford';

export default defineSchool({
  slug: 'stanford',
  title: 'Stanford GSB MBA 2026: Total Cost, Salary and Payback',
  description: `Stanford GSB MBA 2026: ${K.tuition('stanford')} tuition over two years, ${K.living('stanford')} living budget, ${K.salary('stanford')} median base salary, and the total cost and payback for your own salary.`,
  intro: `${dearest ? 'The highest tuition and fees of any school on this site' : `Tuition and fees of ${K.usd(fee('stanford'))} for two years`}, and a class that goes further than most into venture capital and private equity.`,
  resume: `Two years at Stanford GSB cost ${K.direct('stanford')} in tuition, fees and the school's own living budget, before the salary you stop earning. For a person earning ${K.ref()} today, the 21 months away add ${K.usd(o.forgone)} and the summer internship gives part of it back, for a total cost of ${K.usd(o.total)}. The class of 2025 reported a ${K.salaryKind('stanford')} of ${K.salary('stanford')}, which repays that total ${K.payback('stanford')} after graduation and leaves a ten-year net present value of ${K.npv('stanford')}. What sets Stanford apart is where the class goes: ${K.share('stanford', 'tech')} into technology and ${K.share('stanford', 'finance')} into finance, with ${vc ? K.p(vc.pct!) : 'a share'} in venture capital alone. A large part of the class does not look for a job at all: founders and sponsored students sit outside the salary figure.`,
  body: (h) => `<h2>Venture capital, private equity and the founders outside the count</h2>
<p>Stanford's finance graduates are investors more than bankers. Only ${K.share('stanford', 'ib') ?? 'a small share'} of the class went into investment banking, against ${pe ? K.p(pe.pct!) : 'a larger share'} in private equity${pe?.salary ? ` at a median ${K.money(pe.salary, 'USD')}` : ''}${vc?.salary ? ` and ${K.p(vc.pct!)} in venture capital at ${K.money(vc.salary, 'USD')}` : ''}${am?.salary ? `; asset management paid ${K.money(am.salary, 'USD')}` : ''}. ${fin ? `On these figures Stanford ranks ${fin.rank === 1 ? 'first' : `number ${fin.rank}`} of ${fin.of} schools in our ${h.a('best-mba-finance', 'finance ranking')}` : 'Our finance ranking compares it on the same basis'}${tech ? ` and ${tech.rank === 1 ? 'first' : `number ${tech.rank}`} of ${tech.of} for ${h.a('best-mba-tech', 'technology')}` : ''}.</p>
<p>The report is honest about what the median leaves out. Among graduates of the class of 2025, the school counts a sixth starting a new business and about one in eight sponsored by a company, neither of whom is in the salary statistics; the median describes the graduates who looked for a job and reported a base salary. A founder's first years usually pay far less, which the calculator cannot know: type your own expected salary in the field "Salary after the MBA" to see that path.</p>
${h.miniGoal('stanford')}
<h2>What makes the bill so high</h2>
<p>Tuition runs ${K.tuition('stanford')} for the two years, and the school adds ${K.money(fees, 'USD')} of mandatory fees and health cover. Its budget for a single student on or near the campus, ${K.living('stanford')} for the program, reflects rents in the Bay Area. At the reference salary, the 21 months of pay you give up are the second largest line after tuition; above ${K.usd(Math.ceil(s.tuition!.v / 1.75 / 1000) * 1000)} a year they become the largest. The class is small, ${K.num(s.classSize!)} students entering in 2025, which is one reason the school reports many segments with a single median rather than a range.</p>
${h.miniPayback('stanford')}
<h2>Staying in the United States, and in California</h2>
<p>${K.share('stanford', 'z-us')} of graduates who took a job stayed in the United States. For an international student planning to work at home soon after the degree, the payback above does not apply: the salary used is an American one. The ${h.a('best-mba-asia', 'Asia ranking')} and ${h.a('best-mba-europe', 'Europe ranking')} show which schools actually place there. Against its closest rival, the ${h.a('compare-harvard-vs-stanford', 'Harvard and Stanford comparison')} puts both reports side by side.</p>
${h.miniScholarship('stanford')}`,
  faqs: [
    { q: 'How much does the Stanford GSB MBA cost in total?', a: `Tuition and fees for the two years come to ${K.usd(s.directLocal!)}, and the school budgets ${K.living('stanford')} for living costs, for ${K.direct('stanford')}. Counting the salary you give up, a person earning ${K.ref()} today reaches a total of ${K.usd(o.total)} after the summer internship pay, the figure the calculator above starts from.` },
    { q: 'What do Stanford GSB graduates earn after the MBA?', a: `The class of 2025 reported a median base salary of ${K.salary('stanford')}. Medians were higher in private equity${pe?.salary ? ` (${K.money(pe.salary, 'USD')})` : ''} and in venture capital${vc?.salary ? ` (${K.money(vc.salary, 'USD')})` : ''}. Founders and sponsored students are not in these figures, which describe graduates who sought a job and reported pay.` },
    { q: 'How long does a Stanford GSB MBA take to pay back?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback('stanford')} after graduation, with salaries growing ${Math.round(K.MODEL.g1 * 100)}% a year after the MBA and ${Math.round(K.MODEL.g0 * 100)}% without, before tax. A higher current salary lengthens the payback, since you give up more pay for 21 months and gain less.` },
    { q: 'Is Stanford GSB the best MBA for venture capital?', a: `On the reports we read, Stanford sends ${vc ? K.p(vc.pct!) : 'the largest share'} of its class into venture capital${vc?.salary ? ` at a median of ${K.money(vc.salary, 'USD')}` : ''}, more than any other school that publishes the segment. Venture hiring is small and irregular, so a few graduates move the share from one year to the next.` },
  ],
  related: ['school:harvard', 'school:berkeley-haas', 'school:wharton', 'compare-harvard-vs-stanford', 'best-mba-tech', 'best-mba-private-equity'],
});
