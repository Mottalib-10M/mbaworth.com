import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const A = 'harvard', B = 'stanford';
const a = K.s(A), b = K.s(B);
const cA = K.c(A), cB = K.c(B);
const oA = K.roi(A)!, oB = K.roi(B)!;
const pb = (y: number | null) => (y === null ? 'over 30 years' : K.yrs(y));
const rk = (slug: string, g: string) => { const r = K.rank(slug, g); return r ? `${r.rank} of ${r.of}` : 'unranked'; };
const rkN = (slug: string, g: string) => K.rank(slug, g)?.rank ?? 999;
const seg = (slug: string, key: string) => K.s(slug).emp.segments.find((x) => x.key === key) ?? null;
const sp = (slug: string, key: string) => { const x = seg(slug, key); return x && x.pct !== null ? K.p(x.pct) : 'not published'; };
const indSal = (slug: string) => K.s(slug).emp.industries.filter((x) => x.salary).length;
const sA = a.emp.salary!, sB = b.emp.salary!;
const q = (s: typeof sA) => (s.p25 && s.p75 ? `${K.money(s.p25, s.cur)} to ${K.money(s.p75, s.cur)}` : 'not published');
const sameSal = sA.v === sB.v;
const salPair = sameSal ? `the same ${K.salaryKind(A)}, ${K.salary(A)}` : `${K.salaryKind(A)}s of ${K.salary(A)} at ${a.short} and ${K.salary(B)} at ${b.short}`;
const npvGap = Math.abs(oA.npv - oB.npv);
const tiny = npvGap < 0.03 * Math.max(Math.abs(oA.npv), Math.abs(oB.npv));
const internB = cB.intern ? Math.round(cB.intern * K.MODEL.internMonths) : 0;
const dirA = cA.tuition! + cA.fees + cA.living!, dirB = cB.tuition! + cB.fees + cB.living!;
const ratio = a.classSize && b.classSize ? a.classSize / b.classSize : null;
const big = 300;
const techBig = K.schools.filter((s) => (s.classSize ?? 0) >= big).sort((x, y) => (K.shareRaw(y.slug, 'tech') ?? 0) - (K.shareRaw(x.slug, 'tech') ?? 0))[0];
const usA = K.shareRaw(A, 'z-us'), usB = K.shareRaw(B, 'z-us');
const ibLead = rkN(A, 'ib') < rkN(B, 'ib');
const schPb = (() => { const v = a.scholarship.v; if (!v) return null; const total = oA.total - 2 * v; let cum = 0; for (let t = 0; t < oA.gains.length; t++) { const g = oA.gains[t]; if (g > 0 && cum + g >= total) return t + (total - cum) / g; cum += g; } return null; })();
const hires = (slug: string) => K.s(slug).emp.employers.some((e) => e.hires);

export default definePage({
  id: 'compare-harvard-vs-stanford',
  group: 'compare',
  order: 3,
  slug: 'compare/harvard-vs-stanford',
  nav: 'Harvard vs Stanford',
  card: 'Two programs with almost the same payback: where the classes go, what each report discloses, who fits which.',
  title: 'Harvard vs Stanford MBA 2026: Cost, Salary and Payback',
  description: `Harvard vs Stanford MBA in 2026: ${K.direct(A)} against ${K.direct(B)} before the salary given up, ${sameSal ? `the same ${K.salary(A)} median` : `${K.salary(A)} and ${K.salary(B)} medians`}, and the payback for your own salary today.`,
  h1: 'Harvard Business School or Stanford GSB',
  intro: `For a ${K.ref()} earner, ${a.short} repays its cost in ${pb(oA.payback)} and ${b.short} in ${pb(oB.payback)}; their ten-year values differ by ${K.usd(npvGap)}.`,
  resume: `On money alone, ${a.name} and ${b.name} are close to a tie. ${a.short} charges ${K.tuition(A)} of tuition and ${K.fees(A)} of fees for two years and budgets ${K.living(A)} for living; ${b.short} charges ${K.tuition(B)}, ${K.fees(B)} and budgets ${K.living(B)}. For a person earning ${K.ref()} today, the totals with the salary given up are ${K.usd(oA.total)} and ${K.usd(oB.total)}. The class of 2025 reported ${salPair}. ${a.short} repays in ${pb(oA.payback)} after graduation and ${b.short} in ${pb(oB.payback)}, and the ten-year values, ${K.usd(oA.npv)} and ${K.usd(oB.npv)}, are ${tiny ? 'within a few percent of each other' : `${K.usd(npvGap)} apart`}. What separates them is the shape of the class: ${b.short} sends ${K.share(B, 'tech') ?? 'a large share'} of its graduates into technology against ${K.share(A, 'tech') ?? 'a smaller share'} at ${a.short}, and ${a.short} sends ${K.share(A, 'consulting') ?? 'more'} into consulting against ${K.share(B, 'consulting') ?? 'fewer'}.`,
  faqs: [
    { q: 'Is Harvard or Stanford more expensive for the MBA?', a: `${dirB >= dirA ? b.short : a.short}, by ${K.usd(Math.abs(dirB - dirA))} in tuition, fees and the school's living budget over two years: ${K.directUsd(B)} at ${b.short} against ${K.directUsd(A)} at ${a.short}. With the salary given up by a ${K.ref()} earner, the totals are ${K.usd(oB.total)} and ${K.usd(oA.total)}${internB ? `, the gap narrowed by ${b.short}'s paid summer internship, which we count at ${K.usd(internB)}` : ''}.` },
    { q: 'Do Harvard and Stanford MBA graduates earn the same?', a: `Close to it. The class of 2025 reported ${salPair}. The middle half earned ${q(sA)} at ${a.short} and ${q(sB)} at ${b.short}. A signing bonus went to ${a.emp.bonus?.pct != null ? K.p(a.emp.bonus.pct) : 'part'} of the ${a.short} class and ${b.emp.bonus?.pct != null ? K.p(b.emp.bonus.pct) : 'part'} of the ${b.short} class.` },
    { q: 'Harvard or Stanford for private equity and venture capital?', a: `Both rank near the top of our tables. ${b.short} places ${sp(B, 'pe')} of its class in private equity and ${sp(B, 'vc')} in venture capital, and is number ${rk(B, 'pe')} and ${rk(B, 'vc')} in those rankings. ${a.short} places ${sp(A, 'pe')} and ${sp(A, 'vc')}, number ${rk(A, 'pe')} and ${rk(A, 'vc')}.${ratio && ratio > 1.5 ? ` ${a.short} sends more people in absolute terms, with a class ${ratio >= 2 ? 'more than twice' : 'much'} the size.` : ''}` },
    { q: 'Which publishes more detail, the Harvard or the Stanford employment report?', a: `${b.short} gives a salary for ${indSal(B)} industries and ${a.short} for ${indSal(A)}; both give the first and third quartiles of the class. ${cA.intern ? 'Both publish internship pay.' : `${a.short} publishes no internship pay in the documents we read, which ${b.short} does, so only ${b.short}'s total gets that credit.`} ${b.short} follows the MBA CSEA reporting standard.` },
    { q: 'Do Harvard and Stanford give MBA scholarships?', a: `Both give need-based aid only. Each school reports an average award of about ${a.scholarship.v ? K.money(a.scholarship.v, 'USD') : 'a published amount'} a year, close to twice that over the program. The calculator takes a scholarship as a deduction from the total cost, so an award of that size over two years ${schPb !== null && oA.payback !== null ? `brings ${a.short}'s payback from ${pb(oA.payback)} to ${pb(schPb)} for a ${K.ref()} earner` : 'shortens the payback at either school'}.` },
  ],
  body: (h) => `<h2>A tie on money, a split on direction</h2>
<p>Few pairs of schools produce such close figures. ${h.sc(A)} costs ${K.directUsd(A)} before the salary you give up, ${h.sc(B)} ${K.directUsd(B)}. Both programs last ${a.months} months, so a ${K.ref()} earner gives up the same ${K.usd(oA.forgone)} at either. ${b.short} reports a median summer internship pay${cB.intern ? ` of ${K.money(cB.intern, 'USD')} a month` : ''}, which the model takes back from its total; ${cA.intern ? `${a.short} does too.` : `${a.short} publishes none, so its total gets no such credit.`} The result is two totals ${K.usd(Math.abs(oA.total - oB.total))} apart and two ten-year values ${K.usd(npvGap)} apart.</p>
<p>With money out of the way, the question is where you want to go, and the two reports describe different classes. Use the mini below with your own salary: the gap between the two schools stays small at any level, because the programs have the same length and similar salaries.</p>
${h.miniTwo(A, B)}
<h2>Technology at Stanford, consulting at Harvard</h2>
<p>${b.short} sends ${K.share(B, 'tech') ?? 'a large share'} of its class into technology${techBig?.slug === B ? `, the largest share among schools with a class of ${big} or more` : ''}, at a median of ${K.segSalary(B, 'tech') ?? 'a level it does not split out'}. It stands number ${rk(B, 'tech')} in our tech ranking, ${a.short} number ${rk(A, 'tech')}. Finance takes about a third of each class: ${K.share(A, 'finance') ?? 'part'} at ${a.short}, ${K.share(B, 'finance') ?? 'part'} at ${b.short}, where the finance median is ${K.segSalary(B, 'finance') ?? 'not published'}.</p>
<p>The clearest gap is consulting: ${K.share(A, 'consulting') ?? 'a share'} of ${a.short}'s class against ${K.share(B, 'consulting') ?? 'a share'} of ${b.short}'s. Investment banking takes ${sp(A, 'ib')} of ${a.short}'s class against ${sp(B, 'ib')} at ${b.short}; in our banking ranking ${ibLead ? `${a.short} comes ahead, number ${rk(A, 'ib')} against ${rk(B, 'ib')}` : `${b.short} comes ahead, number ${rk(B, 'ib')} against ${rk(A, 'ib')}`}. ${ratio ? `A class of ${a.classSize} at ${a.short} against ${b.classSize} at ${b.short} means that the same share sends ${ratio >= 2 ? 'more than twice' : 'far more'} as many people into each firm.` : ''}</p>
<p>Geography does not separate them: ${usA !== null ? K.p(usA) : 'nearly all'} of ${a.short}'s class and ${usB !== null ? K.p(usB) : 'nearly all'} of ${b.short}'s took a job in the United States. Applicants planning to return to Europe or Asia right after the degree should look at the ${h.a('best-mba-europe', 'European')} and ${h.a('best-mba-asia', 'Asian')} rankings before either.</p>
<h2>What each report leaves out</h2>
<p>${b.short} follows the MBA CSEA reporting standard and gives a median for ${indSal(B)} industries and for most finance segments, plus the first and third quartiles of the class: ${q(sB)}. ${a.short} gives quartiles too, ${q(sA)}, and salaries for ${indSal(A)} industries${indSal(A) === 0 ? ', so in our sector rankings it carries its school-wide median, marked with an asterisk' : ''}. ${cA.intern ? '' : `${a.short}'s report gives no internship pay. `}${hires(A) || hires(B) ? 'Only one of the two lists employers with the number of hires.' : 'Neither school lists employers with the number of hires in the documents we read.'}</p>
<h2>Who should pick which</h2>
<p>Pick ${b.short} for technology, venture capital or a smaller class in California, where its shares in those paths lead our rankings. Pick ${a.short} for consulting or general management, and for the reach of a much larger class and alumni base, which also sends more people into banking in headcount. Admission, not cost, is the constraint at both: once in, the choice turns on the industry, and the money will not decide it for you. A need-based award changes the totals more than anything in the fee lists, as the mini below shows.</p>
${h.miniScholarship(B)}`,
  tool: 'compare',
  toolArgs: { schools: ['harvard', 'stanford'] },
  related: ['school:harvard', 'school:stanford', 'compare-wharton-vs-booth', 'best-mba-usa', 'best-mba-tech', 'best-mba-private-equity'],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: ['harvard', 'stanford'],
});
