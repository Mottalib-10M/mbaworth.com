import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const A = 'insead', B = 'hec-paris';
const a = K.s(A), b = K.s(B);
const ref = K.MODEL.refSalary;
/** Total cost for the reference person, computed from the kit even when the school publishes no salary. */
const total = (slug: string) => { const c = K.c(slug); if (c.tuition === null || c.living === null || !c.months) return null; const intern = c.twoYear && c.intern ? c.intern * K.MODEL.internMonths : 0; return c.tuition + c.fees + c.living + (ref * c.months) / 12 - intern; };
const zone = (slug: string, z: string) => K.s(slug).emp.zones.find((x) => x.zone === z) ?? null;
const zp = (slug: string, z: string) => { const x = zone(slug, z); return x && x.pct !== null ? K.p(x.pct) : 'not published'; };
const rk = (slug: string, g: string) => { const r = K.rank(slug, g); return r ? `number ${r.rank} of ${r.of}` : 'not ranked'; };
const tA = total(A)!, tB = total(B);
const oA = K.roi(A);
const fgA = (ref * a.months!) / 12, fgB = (ref * b.months!) / 12;
const meA = zone(A, 'Middle East'), meB = zone(B, 'Middle East');
const asA = zone(A, 'Asia'), asB = zone(B, 'Asia');
const dA = K.c(A).tuition! + K.c(A).fees + K.c(A).living!, dB = K.c(B).tuition! + K.c(B).fees + K.c(B).living!;
/** Current salary below which HEC Paris's longer program becomes the cheaper total. */
const flip = Math.round((((dA - dB) * 12) / (b.months! - a.months!)) / 1000) * 1000;

export default definePage({
  id: 'compare-insead-vs-hec',
  group: 'compare',
  order: 1,
  slug: 'compare/insead-vs-hec',
  nav: 'INSEAD vs HEC Paris',
  card: 'Ten months against sixteen, a published salary against a report we could not read, and where each class goes.',
  title: 'INSEAD vs HEC Paris 2026: MBA Cost, Salary and Payback',
  description: `INSEAD vs HEC Paris MBA in 2026: ${K.tuition(A)} against ${K.tuition(B)} of tuition, ${a.months} against ${b.months} months, total cost, salary published and where each class goes to work.`,
  h1: 'INSEAD or HEC Paris',
  intro: `${a.short} costs ${K.direct(A)} for ${a.months} months and HEC Paris ${K.direct(B)} for ${b.months}; only ${a.short} publishes a salary we could read.`,
  resume: `${a.short} and ${b.short} are the two French MBAs most applicants weigh against each other, and they differ first in length. ${a.short} runs ${a.months} months for ${K.tuition(A)} of tuition and a school budget of ${K.living(A)} for living costs; ${b.short} runs ${b.months} months for ${K.tuition(B)} and a budget of ${K.living(B)}. For someone earning ${K.ref()} today, the total with the salary given up comes to ${K.usd(tA)} at ${a.short} and ${tB === null ? 'an amount we cannot compute' : K.usd(tB)} at ${b.short}, the gap coming mostly from ${b.months! - a.months!} more months without pay. ${a.short} reports a ${K.salaryKind(A)} of ${K.salary(A)}${oA ? `, which gives a payback of ${K.payback(A) ?? 'over 30 years'} and a ten-year value of ${K.npv(A)}` : ''}. ${b.short} publishes no salary we could read for its class of 2025, so its payback stays blank here. Both send close to half their class into European jobs; ${a.short} sends ${zp(A, 'Middle East')} to the line it calls ${meA ? meA.label : 'the Middle East'}, against ${zp(B, 'Middle East')} at ${b.short}.`,
  faqs: [
    { q: 'Is INSEAD or HEC Paris cheaper for an MBA?', a: `On tuition, ${b.short}: ${K.tuition(B)} against ${K.tuition(A)}. In total, ${a.short}, because it is ${b.months! - a.months!} months shorter: for a ${K.ref()} earner, ${K.usd(tA)} against ${tB === null ? 'a total we cannot compute' : K.usd(tB)}, salary given up included. ${flip > 0 ? `Below a current salary of about ${K.usd(flip)}, the order flips, because ${b.months! - a.months!} months of pay then weigh less than the fee gap.` : 'The fee gap is too small to flip the order at any salary.'}` },
    { q: 'Does HEC Paris publish its MBA salary like INSEAD does?', a: `Not in a form we could read. ${b.short}'s report for the class of 2025 is hosted as a flipbook whose page images are signed and could not be opened, so we show no salary and no payback for it. ${a.short} publishes a ${K.salaryKind(A)} of ${K.salary(A)} for its December 2024 and July 2025 classes.` },
    { q: 'Which places more graduates in Asia, INSEAD or HEC Paris?', a: `${b.short} reports ${zp(B, 'Asia')} of its class in the line it calls ${asB ? asB.label : 'Asia'}, ${a.short} ${zp(A, 'Asia')} in ${asA ? asA.label : 'Asia'}. ${a.short} also runs a campus in Singapore, which its students can attend for part of the year. In our Asia ranking, ${a.short} is ${rk(A, 'z-asia')} and ${b.short} ${rk(B, 'z-asia')}, both on the share placed alone.` },
    { q: 'Which is better for consulting, INSEAD or HEC Paris?', a: `${a.short} is the clearer pipeline on what it publishes: ${K.share(A, 'consulting') ?? 'a large share'} of its class went into consulting, at ${K.segSalary(A, 'consulting') ?? 'a salary it does not split out'}, and the large strategy firms lead the employer list it publishes. ${b.short} gives no industry split in the documents we read, so the comparison rests on ${a.short}'s figures and on what ${b.short}'s admissions team will show you.` },
    { q: 'How long is the HEC Paris MBA compared with INSEAD?', a: `${b.short} lasts ${b.months} months, with a shorter track possible for the January intake, against ${a.months} months at ${a.short}. For someone earning ${K.ref()}, those lengths mean ${K.usd(fgB)} and ${K.usd(fgA)} of salary not earned. The longer program leaves room for an internship before the final job search.` },
  ],
  body: (h) => `<h2>The calendar, not the fee list</h2>
<p>The fee lists are close: ${K.tuition(A)} at ${h.sc(A)} (${a.tuition!.cohort}), ${K.tuition(B)} at ${h.sc(B)} (${b.tuition!.cohort}). The school budgets for living costs are close too, ${K.living(A)} and ${K.living(B)}. What separates the two is the calendar. ${a.short} finishes in ${a.months} months; ${b.short} takes ${b.months}. For a person earning ${K.ref()}, that is ${K.usd(fgA)} against ${K.usd(fgB)} of salary given up, and it explains most of the gap between the two totals, ${K.usd(tA)} and ${tB === null ? 'a figure we cannot compute' : K.usd(tB)}.</p>
<p>The longer program buys time. The extra months leave more room for an internship and a second recruiting season, which matters for anyone changing industry. Ten months mean recruiting starts almost on arrival. If you already know the firm you want and it hires on campus, the short calendar costs little; if you are still deciding, it can be tight.</p>
${h.miniPayback(A)}
<h2>One salary published, one we could not read</h2>
<p>${a.short} reports a ${K.salaryKind(A)} of ${K.salary(A)}, about ${K.salaryUsd(A)} at the ECB rate of ${K.day(K.FX_DATE)}, for ${a.emp.cohort}. It splits the figure by industry: consulting at ${K.segSalary(A, 'consulting') ?? 'a level it does not publish'}, finance at ${K.segSalary(A, 'finance') ?? 'a level it does not publish'}, technology at ${K.segSalary(A, 'tech') ?? 'a level it does not publish'}. ${b.short} has put its class of 2025 report online only as a flipbook whose pages are images behind signed links; we could not read them and we do not copy a figure from a ranking or a forum. The page for ${b.short} therefore shows no salary, no payback and no ten-year value, and the calculator asks you to type a salary if you have one from the school.</p>
<p>${b.short} does publish where its graduates work and how many accepted an offer within three months: ${b.emp.employed !== null ? K.p(b.emp.employed) : 'a share we could not read'}, against ${a.emp.employed !== null ? K.p(a.emp.employed) : 'a share not published'} of ${a.short}'s class with an offer in the same window. The two labels are not identical, accepted against received, so read them as close rather than equal.</p>
<h2>Where the two classes go</h2>
<p>Both schools keep the largest group in Europe: ${zp(A, 'Europe')} at ${a.short}, ${zp(B, 'Europe')} at ${b.short}. The differences sit elsewhere. ${a.short} places ${zp(A, 'Middle East')} in ${meA ? meA.label : 'the Middle East'}, which puts it ${rk(A, 'z-me')} in our Middle East ranking; ${b.short} places ${zp(B, 'Middle East')} in ${meB ? meB.label : 'the Middle East'} and stands ${rk(B, 'z-me')}. North America takes ${zp(A, 'US')} of ${a.short}'s class and ${zp(B, 'US')} of ${b.short}'s. ${b.short}'s class is ${K.intl(B) ?? 'largely'} international, from ${b.profile.countries ?? 'many'} countries; ${a.short} counts ${a.profile.countries ?? 'many'} nationalities in a class of ${a.classSizeText || 'several hundred'} a year.</p>
${h.miniGoal(B)}
<h2>Who should pick which</h2>
<p>Choose ${a.short} if you want the shortest time out of work, a route into strategy consulting that its own report documents, or a job in Africa, the Middle East or Asia, where its placement shares are high and its second campus, in Singapore, sits. Choose ${b.short} if you want a longer program with an internship, a smaller class of about ${b.classSize ?? 'a few hundred'}, and a base near Paris. Before deciding on ${b.short}, ask the admissions office for the salary pages of the employment report: without them, no payback can be computed, here or anywhere else that does not borrow a figure. Then run both schools in the ${h.a('compare-mba', 'comparison tool')} with your own salary.</p>`,
  tool: 'compare',
  toolArgs: { schools: ['insead', 'hec-paris'] },
  related: ['school:insead', 'school:hec-paris', 'compare-insead-vs-lbs', 'best-mba-europe', 'best-mba-one-year'],
  sources: ['ecb_fx', 'mbacsea', 'gmac'],
  schoolSources: ['insead', 'hec-paris'],
});
