import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const A = 'oxford-said', B = 'cambridge-judge';
const a = K.s(A), b = K.s(B);
const oA = K.roi(A), oB = K.roi(B);
const pb = (o: ReturnType<typeof K.roi>) => (!o ? 'not computable' : o.payback === null ? 'over 30 years' : K.yrs(o.payback));
const npv = (o: ReturnType<typeof K.roi>) => (o ? K.usd(o.npv) : 'not computable');
const tot = (o: ReturnType<typeof K.roi>) => (o ? K.usd(o.total) : 'not computable');
const zone = (slug: string, z: string) => K.s(slug).emp.zones.find((x) => x.zone === z) ?? null;
const zp = (slug: string, z: string) => { const x = zone(slug, z); return x && x.pct !== null ? K.p(x.pct) : 'not published'; };
const rk = (slug: string, g: string) => { const r = K.rank(slug, g); return r ? `${r.rank} of ${r.of}` : 'unranked'; };
const indSal = (slug: string) => K.s(slug).emp.industries.filter((x) => x.salary).length;
const visaA = a.living?.basis === 'visa', visaB = b.living?.basis === 'visa';
const P = K.P.ukvi;
const floor = Math.round(P.outsideMonthly * (b.months ?? 12));
const usA = zone(A, 'US'), ukA = zone(A, 'UK'), asA = zone(A, 'Asia');
const fnB = b.emp.functions.slice(0, 3);
const oxRange = /min GBP ([\d,]+), max GBP ([\d,]+)/.exec(a.emp.salary?.note ?? '');
const ppp = /PPP/.test(b.emp.salary?.note ?? '');
const sA = K.c(A).salary, sB = K.c(B).salary;
const asiaTop = K.schools.filter((s) => s.region === 'UK').every((s) => s.slug === B || (K.shareRaw(s.slug, 'z-asia') ?? 0) < (K.shareRaw(B, 'z-asia') ?? 0));

export default definePage({
  id: 'compare-oxford-vs-cambridge',
  group: 'compare',
  order: 5,
  slug: 'compare/oxford-vs-cambridge',
  nav: 'Oxford vs Cambridge MBA',
  card: 'Two one-year MBAs with nearly the same fee: salary, living costs, where each class goes and the payback.',
  title: 'Oxford vs Cambridge MBA 2026: Fees, Salary and Payback',
  description: `Oxford vs Cambridge MBA in 2026: ${K.tuition(A)} against ${K.tuition(B)} for one year, ${K.salary(A)} against ${K.salary(B)} average base salaries, and what that means for the payback.`,
  h1: 'Oxford Saïd or Cambridge Judge',
  intro: `The two one-year MBAs charge within ${K.money(Math.abs(a.tuition!.v - b.tuition!.v), 'GBP')} of each other; ${a.short}'s graduates report ${K.salary(A)} on average, ${b.short}'s ${K.salary(B)}.`,
  resume: `${a.name} and ${b.name} sell almost the same product on paper: a ${a.months}-month MBA in a university town, for ${K.tuition(A)} and ${K.tuition(B)} of tuition. They part ways on what comes after. ${a.short} reports an ${K.salaryKind(A)} of ${K.salary(A)} for the ${a.emp.cohort}, ${b.short} an ${K.salaryKind(B)} of ${K.salary(B)} for the ${b.emp.cohort}. For a person earning ${K.ref()} today, the totals with the salary given up are ${tot(oA)} and ${tot(oB)}, the paybacks ${pb(oA)} and ${pb(oB)}, and both ten-year values are ${oA && oB && oA.npv < 0 && oB.npv < 0 ? 'negative' : 'shown below'}: ${npv(oA)} and ${npv(oB)}. ${visaA ? `The living line is not built the same way: ${b.short} publishes its own budget, ${K.living(B)}, while ${a.short} gives none, so we count the UK visa minimum outside London, ${K.living(A)}, as a floor.` : `Both publish a living budget for the year, ${K.living(A)} at ${a.short} and ${K.living(B)} at ${b.short}.`} The classes also go to different places: ${zp(B, 'Asia')} of ${b.short}'s graduates work in Asia against ${zp(A, 'Asia')} at ${a.short}.`,
  faqs: [
    { q: 'Is the Oxford or the Cambridge MBA cheaper?', a: `On tuition, ${b.tuition!.v < a.tuition!.v ? b.short : a.short}, by ${K.money(Math.abs(a.tuition!.v - b.tuition!.v), 'GBP')}. In total, the lines are close: ${tot(oA)} at ${a.short} and ${tot(oB)} at ${b.short} for a ${K.ref()} earner. ${visaA ? `The comparison is uneven, though: ${b.short}'s total uses the school's own living budget, ${a.short}'s the UK visa minimum, which is lower.` : `Both totals use the school's own living budget, ${K.living(A)} and ${K.living(B)}, so the comparison is like for like.`}` },
    { q: 'Do Oxford MBA graduates earn more than Cambridge MBA graduates?', a: `On the figures each school publishes, yes: an ${K.salaryKind(A)} of ${K.salary(A)} at ${a.short} against ${K.salary(B)} at ${b.short}, both averages, which makes this one of the few pairs where like is compared with like. ${a.short} also splits salaries by industry and region; ${b.short} gives ${indSal(B) === 0 ? 'no salary' : `salaries for ${indSal(B)} industries`} beyond its school-wide average.` },
    { q: 'Why does the Cambridge MBA take longer to pay back than Oxford?', a: `Because its graduates report a lower average salary, ${K.salaryUsd(B)} against ${K.salaryUsd(A)} once converted, while costs are similar. For a ${K.ref()} earner, the yearly gain after the degree is thin, so the payback is ${pb(oB)} against ${pb(oA)}. Someone earning less today sees both shorten sharply; the mini on this page shows it.` },
    { q: 'Which places more graduates in Asia, Oxford or Cambridge?', a: `${b.short}, clearly: ${zp(B, 'Asia')} of its class against ${zp(A, 'Asia')} at ${a.short}, which puts ${b.short} at ${rk(B, 'z-asia')} in our Asia ranking. ${a.short} keeps more of its class in the United Kingdom, ${zp(A, 'UK')} against ${zp(B, 'UK')}, and sends ${zp(A, 'US')} to North America.` },
    { q: 'Oxford or Cambridge MBA for asset management and finance?', a: `${a.short} sends ${K.share(A, 'finance') ?? 'a large share'} of its class into finance, ${K.share(A, 'am') ?? 'a part'} into investment and asset management alone, and stands ${rk(A, 'am')} in our asset management ranking. ${b.short} places ${K.share(B, 'finance') ?? 'a smaller share'} in finance and gives no asset management line in the documents we read, so it is absent from that ranking; its finance hires sit inside a broader industry figure.` },
  ],
  body: (h) => `<h2>One year each: fees, living and the pay you forgo</h2>
<p>Tuition for the year is ${K.tuition(A)} at ${h.sc(A)} and ${K.tuition(B)} at ${h.sc(B)}. Both programs last ${a.months} months, so a ${K.ref()} earner gives up the same salary at either. ${visaA ? 'The difference in the totals comes from how living costs are counted.' : `The difference in the totals comes from tuition and from the two living budgets${(a.tuition!.v > b.tuition!.v) !== ((a.living?.v ?? 0) > (b.living?.v ?? 0)) ? ', which pull in opposite directions' : ''}.`} ${b.short} publishes a budget for a full-time student, ${K.living(B)} for the year. ${visaA ? `${a.short} publishes none we could read, so the line is the amount UK Visas and Immigration requires students outside London to hold, ${K.money(P.outsideMonthly, 'GBP')} a month for each month: ${K.living(A)}.` : `${a.short} publishes ${K.living(A)}.`} ${!visaB ? `Both sit above the UK visa minimum for a year outside London, ${K.money(floor, 'GBP')}, which is the least a student must show, not a cost estimate.` : ''}</p>
<p>${visaA ? `Read the two totals with that in mind: ${tot(oA)} for ${a.short} is a minimum, ${tot(oB)} for ${b.short} is the school's own estimate.` : `The totals, ${tot(oA)} and ${tot(oB)}, are therefore built the same way.`} If you plan to live in college accommodation or share a house, type your own budget in the tool above.</p>
${oA && oB ? h.miniTwo(A, B) : h.miniFx()}
<h2>Two averages, and why the gap matters</h2>
<p>Both schools publish an average base salary rather than a median, so for once the two figures measure the same thing. ${a.short}'s ${K.salary(A)} ${oxRange ? `covers offers from £${oxRange[1]} to £${oxRange[2]}, a range wide enough to pull an average around` : 'is an average of very different offers'}. ${b.short}'s ${K.salary(B)} is lower${sA && sB ? ` by ${K.usd(sA - sB)} once converted at the ECB rate` : ''}${ppp ? '; the school also prints a dollar figure converted at purchasing power parity, which we do not use, since every amount on this site goes through the same market rate' : ''}.</p>
<p>That gap decides the payback. With costs this close, ${pb(oA)} at ${a.short} against ${pb(oB)} at ${b.short} comes almost entirely from the salary line. For a ${K.ref()} earner, neither program repays within ten years in our model; for someone coming from a lower salary or a lower-wage country, both can. ${a.short} also reports where the pay differs: ${usA?.salary ? `${K.money(usA.salary, usA.cur)} for graduates in North America` : 'North America'}, ${ukA?.salary ? `${K.money(ukA.salary, ukA.cur)} in the United Kingdom` : 'the United Kingdom'} and ${asA?.salary ? `${K.money(asA.salary, asA.cur)} in Asia` : 'Asia'}, a sign that the destination weighs more than the school.</p>
<h2>Finance and London at Oxford, Asia and strategy roles at Cambridge</h2>
<p>${a.short}'s class leans toward finance: ${K.share(A, 'finance') ?? 'a large share'} of graduates, with ${K.share(A, 'am') ?? 'a part'} in investment and asset management, at ${K.segSalary(A, 'finance') ?? 'a salary it does not split out'}. Consulting takes ${K.share(A, 'consulting') ?? 'a share'} at ${K.segSalary(A, 'consulting') ?? 'a salary it does not split out'}. ${zp(A, 'UK')} stay in the United Kingdom, which puts ${a.short} ${rk(A, 'z-uk')} in our UK ranking.</p>
<p>${b.short}'s class is spread across technology (${K.share(B, 'tech') ?? 'a share'}), finance (${K.share(B, 'finance') ?? 'a share'}) and consulting (${K.share(B, 'consulting') ?? 'a share'}). By job, its largest groups are ${K.listOf(fnB.map((f) => `${f.label.toLowerCase()} (${f.pct !== null ? K.p(f.pct) : 'n/a'})`))}. Its distinctive feature is Asia: ${zp(B, 'Asia')} of the class works there, ${rk(B, 'z-asia')} in our Asia ranking${asiaTop ? ', the highest share of any British school we read' : ''}.</p>
<h2>Who should pick which</h2>
<p>Choose ${a.short} for a finance or asset management career in London, or for the higher average salary its graduates report. Choose ${b.short} for a return to Asia, a strategy or product role, or a smaller class of ${b.classSize ?? 'about two hundred'} against ${a.classSize ?? 'about three hundred and fifty'}. Both cost about the same; the salary you earn now decides whether either repays within a decade, so run your own figure through the ${h.a('compare-mba', 'comparison tool')} before treating either as an investment.</p>`,
  tool: 'compare',
  toolArgs: { schools: ['oxford-said', 'cambridge-judge'] },
  related: ['school:oxford-said', 'school:cambridge-judge', 'best-mba-one-year', 'best-mba-europe', 'compare-insead-vs-lbs'],
  sources: ['ecb_fx', 'ukvi_money', 'mbacsea'],
  schoolSources: ['oxford-said', 'cambridge-judge'],
});
