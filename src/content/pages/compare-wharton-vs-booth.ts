import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const A = 'wharton', B = 'chicago-booth';
const a = K.s(A), b = K.s(B);
const cA = K.c(A), cB = K.c(B);
const oA = K.roi(A)!, oB = K.roi(B)!;
const pb = (y: number | null) => (y === null ? 'over 30 years' : K.yrs(y));
const rk = (slug: string, g: string) => { const r = K.rank(slug, g); return r ? `${r.rank} of ${r.of}` : 'unranked'; };
const rkN = (slug: string, g: string) => K.rank(slug, g)?.rank ?? 999;
const seg = (slug: string, key: string) => K.s(slug).emp.segments.find((x) => x.key === key) ?? null;
const sp = (slug: string, key: string) => { const x = seg(slug, key); return x && x.pct !== null ? K.p(x.pct) : 'not published'; };
const ss = (slug: string, key: string) => { const x = seg(slug, key); return x && x.salary ? K.money(x.salary, x.cur) : 'not published'; };
const dirA = cA.tuition! + cA.fees + cA.living!, dirB = cB.tuition! + cB.fees + cB.living!;
const inA = cA.intern ? Math.round(cA.intern * K.MODEL.internMonths) : 0;
const inB = cB.intern ? Math.round(cB.intern * K.MODEL.internMonths) : 0;
const hiresB = b.emp.employers.filter((e) => e.hires).slice(0, 3);
const hiresA = a.emp.employers.filter((e) => e.hires).length;
const qA = a.emp.salary?.p25 && a.emp.salary?.p75 ? `${K.money(a.emp.salary.p25, 'USD')} to ${K.money(a.emp.salary.p75, 'USD')}` : null;
const qB = b.emp.salary?.p25 && b.emp.salary?.p75 ? `${K.money(b.emp.salary.p25, 'USD')} to ${K.money(b.emp.salary.p75, 'USD')}` : null;
const low = 60000, high = 130000;
const lA = K.roi(A, 'all', low), lB = K.roi(B, 'all', low), hA = K.roi(A, 'all', high), hB = K.roi(B, 'all', high);
const bonusTxt = (s: typeof a) => (s.emp.bonus ? `${K.money(s.emp.bonus.v, s.emp.bonus.cur)} for ${s.emp.bonus.pct !== null ? K.p(s.emp.bonus.pct) : 'part'} of the class` : 'not published');
const ibB = rkN(B, 'ib') < rkN(A, 'ib');
const consLead = rkN(B, 'consulting') < rkN(A, 'consulting');

export default definePage({
  id: 'compare-wharton-vs-booth',
  group: 'compare',
  order: 6,
  slug: 'compare/wharton-vs-booth',
  nav: 'Wharton vs Booth',
  card: 'Philadelphia against Chicago: two finance schools, one leaning to private equity, one to consulting.',
  title: 'Wharton vs Booth MBA 2026: Cost, Salary and Payback',
  description: `Wharton vs Chicago Booth MBA in 2026: ${K.usd(oA.total)} against ${K.usd(oB.total)} in total for a ${K.ref()} earner, ${K.salary(A)} and ${K.salary(B)} medians, and who places graduates where.`,
  h1: 'Wharton or Chicago Booth',
  intro: `${a.short} costs ${K.usd(oA.total)} with the salary given up and pays back in ${pb(oA.payback)}; ${b.short} costs ${K.usd(oB.total)} and pays back in ${pb(oB.payback)}.`,
  resume: `${a.name} and ${b.name} are the two American schools most often weighed for a finance career, and on cost they are close. ${a.short} charges ${K.tuition(A)} of tuition and ${K.fees(A)} of fees over two years with a living budget of ${K.living(A)}; ${b.short} charges ${K.tuition(B)}, ${K.fees(B)} and budgets ${K.living(B)}. For a person earning ${K.ref()} today, the totals after summer internship pay are ${K.usd(oA.total)} and ${K.usd(oB.total)}. The class of 2025 reported a median base salary of ${K.salary(A)} at ${a.short} and ${K.salary(B)} at ${b.short}, which gives paybacks of ${pb(oA.payback)} and ${pb(oB.payback)} and ten-year values of ${K.npv(A)} and ${K.npv(B)}. In our whole-class ranking, ${a.short} is number ${rk(A, 'all')} and ${b.short} number ${rk(B, 'all')}. The classes differ more than the money: ${sp(A, 'pe')} of ${a.short}'s graduates went into private equity against ${sp(B, 'pe')} at ${b.short}, while ${K.share(B, 'consulting') ?? 'a larger share'} of ${b.short}'s class went into consulting against ${K.share(A, 'consulting') ?? 'a smaller share'}.`,
  faqs: [
    { q: 'Is Wharton or Booth more expensive for the MBA?', a: `${dirA >= dirB ? a.short : b.short}, by ${K.usd(Math.abs(dirA - dirB))} once tuition, fees and the school's own living budget are added: ${K.usd(dirA)} against ${K.usd(dirB)}. The summer internship moves it again: we count ${K.usd(inB)} of internship pay at ${b.short} and ${K.usd(inA)} at ${a.short}, from each school's median. The totals for a ${K.ref()} earner are ${K.usd(oA.total)} and ${K.usd(oB.total)}.` },
    { q: 'Wharton or Booth for private equity?', a: `${a.short}, on its report: ${sp(A, 'pe')} of the class went into private equity at a median of ${ss(A, 'pe')}, against ${sp(B, 'pe')} at ${ss(B, 'pe')} at ${b.short}. Our private equity ranking puts ${a.short} at ${rk(A, 'pe')} and ${b.short} at ${rk(B, 'pe')}. A larger share of a larger class: ${a.classSize && b.classSize ? `about ${K.num(Math.round((a.classSize * (seg(A, 'pe')?.pct ?? 0)) / 100))} graduates against ${K.num(Math.round((b.classSize * (seg(B, 'pe')?.pct ?? 0)) / 100))}` : 'many more graduates'}.` },
    { q: 'Is Booth better than Wharton for consulting?', a: `${consLead ? `On our ranking, yes: ${b.short} is number ${rk(B, 'consulting')}, ${a.short} number ${rk(A, 'consulting')}.` : `On our ranking, no: ${a.short} is number ${rk(A, 'consulting')}, ${b.short} number ${rk(B, 'consulting')}.`} ${b.short} sends ${K.share(B, 'consulting') ?? 'a large share'} of its class into consulting, ${a.short} ${K.share(A, 'consulting') ?? 'a smaller share'}, at the same median of ${K.segSalary(B, 'consulting') ?? 'an unpublished figure'}.${hiresB.length ? ` ${hiresB[0].name} alone hired ${K.num(hiresB[0].hires!)} ${b.short} graduates.` : ''}` },
    { q: 'Does the Wharton or the Booth MBA pay back faster for a lower salary?', a: `Both shorten as your current salary falls. At ${K.usd(low)} today, ${lA && lB ? `${a.short} repays in ${pb(lA.payback)} and ${b.short} in ${pb(lB.payback)}` : 'the model gives both'}; at ${K.usd(high)}, ${hA && hB ? `${pb(hA.payback)} and ${pb(hB.payback)}` : 'both lengthen'}. ${lA && lB && hA && hB ? (lA.payback ?? 99) <= (lB.payback ?? 99) && (hA.payback ?? 99) <= (hB.payback ?? 99) ? `${a.short}'s higher median keeps it ahead at both levels, before any scholarship and with the same raises assumed for both classes.` : 'The order between the two changes with the salary, so test your own figure in the tool before reading either result as final.' : ''}` },
  ],
  body: (h) => `<h2>Near twins on cost</h2>
<p>${h.sc(A)} and ${h.sc(B)} charge tuition within ${K.usd(Math.abs(cA.tuition! - cB.tuition!))} of each other: ${K.tuition(A)} and ${K.tuition(B)}. Fees and living budgets move the gap. ${a.short} adds ${K.fees(A)} of university fees and a living budget of ${K.living(A)} for two years; ${b.short} adds ${K.fees(B)} and ${K.living(B)}. Both programs last ${a.months} months, so a ${K.ref()} earner gives up ${K.usd(oA.forgone)} at either. The summer internship gives back ${K.usd(inA)} at ${a.short} and ${K.usd(inB)} at ${b.short}, at the medians each school reports, for ${K.num(K.MODEL.internMonths, 1)} months.</p>
<p>Add it up and the totals are ${K.usd(oA.total)} and ${K.usd(oB.total)}. ${a.short} reports ${K.salary(A)} as its median base salary, ${b.short} ${K.salary(B)}: the ${K.usd(Math.abs(cA.salary! - cB.salary!))} difference does most of the work in separating the paybacks, ${pb(oA.payback)} and ${pb(oB.payback)}, and the ten-year values, ${K.npv(A)} and ${K.npv(B)}.</p>
${h.miniTwo(A, B)}
<h2>Private equity in Philadelphia, consulting in Chicago</h2>
<p>Both schools send about a third of their class or more into finance: ${K.share(A, 'finance') ?? 'a large share'} at ${a.short}, ${K.share(B, 'finance') ?? 'a large share'} at ${b.short}. Inside finance, the split differs. ${a.short} places ${sp(A, 'ib')} in investment banking and ${sp(A, 'pe')} in private equity, at a median of ${ss(A, 'pe')}. ${b.short} places ${sp(B, 'ib')} in banking and ${sp(B, 'pe')} in private equity at ${ss(B, 'pe')}. In our rankings, ${a.short} is ${rk(A, 'pe')} for private equity and ${rk(A, 'ib')} for banking, ${b.short} ${rk(B, 'pe')} and ${rk(B, 'ib')}${ibB ? `: ${b.short}'s smaller banking share still ranks higher once salary and ten-year value enter the score` : ''}.</p>
<p>Consulting goes the other way. ${b.short} sends ${K.share(B, 'consulting') ?? 'a large share'} of its class into consulting against ${K.share(A, 'consulting') ?? 'a smaller share'} at ${a.short}, at the same ${K.segSalary(A, 'consulting') ?? 'standard'} median, which puts ${b.short} at ${rk(B, 'consulting')} in our consulting ranking against ${rk(A, 'consulting')}. Technology is a minority path at both, ${K.share(A, 'tech') ?? 'a small share'} and ${K.share(B, 'tech') ?? 'a small share'}, and pays less than finance and consulting at each.</p>
${h.miniGoal(B)}
<h2>What each school discloses</h2>
<p>The two reports follow the MBA CSEA standard but give different extras. ${b.short} names its employers with the number of hires${hiresB.length ? `: ${K.listOf(hiresB.map((e) => `${e.name} (${K.num(e.hires!)})`))} lead the list` : ''}. ${hiresA ? `${a.short} also counts hires by employer.` : `${a.short} publishes no such list in the documents we read.`} ${qA ? `${a.short} gives the first and third quartiles of base salary, ${qA}` : `${a.short} gives no quartiles`}${qB ? `; ${b.short} gives ${qB}.` : `, which ${b.short} does not.`} The signing bonus is ${bonusTxt(a)} at ${a.short} and ${bonusTxt(b)} at ${b.short}. Even the admissions test is reported differently: ${a.short} gives an ${a.profile.gmatLabel} GMAT of ${a.profile.gmat ?? 'n/a'}, ${b.short} a ${b.profile.gmatLabel} of ${b.profile.gmat ?? 'n/a'}, two measures that cannot be set side by side without that note.</p>
<h2>Who should pick which</h2>
<p>Pick ${a.short} for private equity${ibB ? '' : ' or investment banking'}, or for the larger class of ${a.classSize ?? 'close to nine hundred'}, and accept the slightly higher bill.${ibB ? ` For banking, the two are close: ${a.short} places more people, ${b.short} scores higher in our ranking.` : ''} Pick ${b.short} for strategy consulting, where its pipeline into the large firms is documented hire by hire, or for a class that is ${K.intl(B) ?? 'more'} international against ${K.intl(A) ?? 'less'} at ${a.short}. On money the two are close enough that a scholarship from either one should weigh more than the gap in the table.</p>`,
  tool: 'compare',
  toolArgs: { schools: ['wharton', 'chicago-booth'] },
  related: ['school:wharton', 'school:chicago-booth', 'compare-harvard-vs-stanford', 'best-mba-finance', 'best-mba-private-equity', 'best-mba-consulting'],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: ['wharton', 'chicago-booth'],
});
