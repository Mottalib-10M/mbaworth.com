import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const s = K.s('tuck');
const o = K.roi('tuck')!;
const rc = K.rank('tuck', 'consulting');
const ib = s.emp.segments.find((x) => x.key === 'ib');
const firms = ['McKinsey', 'Bain', 'Boston Consulting'].filter((f) => s.emp.employers.some((e) => e.name.includes(f)));
const consultShares = K.schools.map((x) => K.shareRaw(x.slug, 'consulting')).filter((v): v is number => v !== null);
const above = consultShares.filter((v) => v > (K.shareRaw('tuck', 'consulting') ?? 0)).length;

export default defineSchool({
  slug: 'tuck',
  title: 'Tuck MBA 2026: Dartmouth Cost, Consulting Pay and Payback',
  description: `Tuck MBA 2026 at Dartmouth: ${K.tuition('tuck')} tuition for two years, ${K.share('tuck', 'consulting')} of the class in consulting at ${K.segSalary('tuck', 'consulting')}, and the payback for your salary.`,
  intro: `A small two-year program in rural New Hampshire whose graduates go into consulting more than almost anywhere else.`,
  resume: `The Tuck MBA at Dartmouth costs ${K.direct('tuck')} for two years of tuition, fees and the school's own living budget, which it publishes for the first year; the calculator counts the second year at the same rate. For a person earning ${K.ref()} today, adding the 21 months of salary given up and taking off the summer internship gives a total of ${K.usd(o.total)}. The class of 2025 reported a ${K.salaryKind('tuck')} of ${K.salary('tuck')}, which repays that total ${K.payback('tuck')} after graduation, with a ten-year net present value of ${K.npv('tuck')}. Tuck's distinctive figure is consulting: ${K.share('tuck', 'consulting')} of the graduates who took a job went into it, at a median of ${K.segSalary('tuck', 'consulting')}${rc ? `, which puts the school ${rc.rank === 1 ? 'first' : `number ${rc.rank}`} of ${rc.of} in our consulting ranking` : ''}.`,
  body: (h) => `<h2>Four graduates in ten go to the consulting firms</h2>
<p>${above === 0 ? 'No school on this site reports a larger share of its class in consulting than Tuck.' : `Only ${above} school${above > 1 ? 's' : ''} on this site report${above > 1 ? '' : 's'} a larger share of the class in consulting than Tuck.`} With ${K.num(s.classSize!)} students entering in 2025, ${K.share('tuck', 'consulting')} means about ${K.num(Math.round((K.shareRaw('tuck', 'consulting')! / 100) * s.classSize!))} graduates a year in the industry, most of them at the large strategy firms${firms.length ? `, and ${K.listOf(firms)} appear among the employers the school names` : ''}. The median consulting salary, ${K.segSalary('tuck', 'consulting')}, is the figure the large firms pay at every top school, so the choice between Tuck and a larger program for consulting is about the share and the network, not about pay. Our ${h.a('best-mba-consulting', 'consulting ranking')} sets the schools side by side.</p>
<p>Finance takes ${K.share('tuck', 'finance')} of the class${ib ? `, ${K.p(ib.pct!)} of it in investment banking at ${K.money(ib.salary!, 'USD')}` : ''}. Technology is smaller, ${K.share('tuck', 'tech')}, at a lower median of ${K.segSalary('tuck', 'tech')}.</p>
${h.miniGoal('tuck')}
<h2>Hanover, and what it does to the budget</h2>
<p>Tuition is ${K.money(s.tuition!.v / 2, 'USD')} a year. The living budget, ${K.living('tuck')} for two years, is lower than at the schools in New York, Boston or California, and it is the school's own estimate for a single student, so a partner, a car or frequent travel to recruiting events come on top. Above a current salary of ${K.usd(Math.ceil(s.tuition!.v / 1.75 / 1000) * 1000)}, the 21 months of pay you give up become the largest line of the bill.</p>
${h.miniPayback('tuck')}
<h2>An American career, mostly</h2>
<p>${K.share('tuck', 'z-us')} of graduates who took a job stayed in the United States. For an international student who wants to return home at once, the payback shown is computed on an American salary and will not hold; the ${h.a('best-mba-europe', 'Europe')} and ${h.a('best-mba-asia', 'Asia')} rankings show which schools place there. ${K.intl('tuck') ? `The class entering in 2025 is ${K.intl('tuck')} international.` : ''}</p>`,
  faqs: [
    { q: 'How much does the Tuck MBA cost in total?', a: `Tuition, fees and the school's living budget come to ${K.direct('tuck')} for the two years, counting the second year at the first-year rate the school publishes. With the salary given up, a person earning ${K.ref()} today reaches ${K.usd(o.total)} after the summer internship pay.` },
    { q: 'Is Tuck a good MBA for consulting?', a: `Yes on the numbers: ${K.share('tuck', 'consulting')} of Tuck graduates who took a job in 2025 went into consulting, at a median base salary of ${K.segSalary('tuck', 'consulting')}. ${rc ? `Our consulting ranking places Tuck ${rc.rank === 1 ? 'first' : `number ${rc.rank}`} of ${rc.of} schools, on share, salary and ten-year value.` : ''}` },
    { q: 'What salary do Tuck graduates report?', a: `The class of 2025 reported a median base salary of ${K.salary('tuck')}, the same as at most large American programs. It varies by industry: ${K.segSalary('tuck', 'consulting')} in consulting, ${K.segSalary('tuck', 'finance')} in finance and ${K.segSalary('tuck', 'tech')} in technology.` },
    { q: 'How long does the Tuck MBA take to repay?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback('tuck')} after graduation, before tax, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the MBA and ${Math.round(K.MODEL.g0 * 100)}% without. Aiming for consulting shortens it, since that segment pays above the school median.` },
  ],
  related: ['school:uva-darden', 'school:yale-som', 'school:cornell-johnson', 'best-mba-consulting', 'consulting', 'compare-mba'],
});
