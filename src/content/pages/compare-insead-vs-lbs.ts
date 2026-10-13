import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const A = 'insead', B = 'lbs';
const a = K.s(A), b = K.s(B);
const oA = K.roi(A)!, oB = K.roi(B)!;
const pb = (y: number | null) => (y === null ? 'over 30 years' : K.yrs(y));
const zone = (slug: string, z: string) => K.s(slug).emp.zones.find((x) => x.zone === z) ?? null;
const zp = (slug: string, z: string) => { const x = zone(slug, z); return x && x.pct !== null ? K.p(x.pct) : 'not published'; };
const rk = (slug: string, g: string) => { const r = K.rank(slug, g); return r ? `${r.rank} of ${r.of}` : 'unranked'; };
const usB = zone(B, 'US'), ukB = zone(B, 'UK'), meB = zone(B, 'Middle East');
const seg = (slug: string, key: string) => K.s(slug).emp.segments.find((x) => x.key === key) ?? null;
const bonA = a.emp.bonus, bonB = b.emp.bonus;
const internB = K.c(B).intern;
const minB = Number(/(\d+)\s*(?:to|-)\s*\d+\s*months/.exec(b.monthsNote)?.[1] ?? NaN);
const exitTxt = Number.isFinite(minB) ? `between ${minB} and ${b.months} months` : `before the full ${b.months} months`;
const segB = b.emp.segments.filter((x) => x.salary);
const segTxt = K.listOf(segB.map((x) => `${x.label.toLowerCase()} at ${K.money(x.salary!, x.cur)}`));
const high = 120000;
const hA = K.roi(A, 'all', high), hB = K.roi(B, 'all', high);

export default definePage({
  id: 'compare-insead-vs-lbs',
  group: 'compare',
  order: 2,
  slug: 'compare/insead-vs-lbs',
  nav: 'INSEAD vs LBS',
  card: 'A ten-month program against one of up to 21 months in London: cost, salary kind, region and payback.',
  title: 'INSEAD vs LBS 2026: MBA Cost, Salary, Payback Compared',
  description: `INSEAD vs London Business School in 2026: ${K.usd(oA.total)} against ${K.usd(oB.total)} in total for a ${K.ref()} earner, a median against an average salary, and where graduates work.`,
  h1: 'INSEAD or London Business School',
  intro: `For a ${K.ref()} earner, ${a.short} costs ${K.usd(oA.total)} with the salary given up and ${b.short} ${K.usd(oB.total)}; the paybacks are ${pb(oA.payback)} and ${pb(oB.payback)}.`,
  resume: `${a.short} and ${b.short} sit at the two ends of the European MBA calendar. ${a.short} runs ${a.months} months for ${K.tuition(A)} of tuition plus a living budget of ${K.living(A)}; ${b.short} runs up to ${b.months} months for ${K.tuition(B)} and ${K.fees(B) ?? 'no'} of fees, and since it publishes no student budget we count the UK visa minimum for London, ${K.living(B)}, as a floor. For someone earning ${K.ref()} today, the totals come to ${K.usd(oA.total)} and ${K.usd(oB.total)}. ${a.short} reports a ${K.salaryKind(A)} of ${K.salary(A)} and ${b.short} an ${K.salaryKind(B)} of ${K.salary(B)}, two different measures, which in dollars are ${K.salaryUsd(A)} and ${K.salaryUsd(B)}. The payback is ${pb(oA.payback)} at ${a.short} and ${pb(oB.payback)} at ${b.short}, and both ten-year values are below zero for that person, ${K.usd(oA.npv)} and ${K.usd(oB.npv)}. The choice rests on where you want to work: ${zp(B, 'UK')} of ${b.short}'s class stays in the United Kingdom, while ${zp(A, 'Europe')} of ${a.short}'s goes to continental Europe.`,
  faqs: [
    { q: 'Is INSEAD or LBS better value for a mid-career applicant?', a: `On our model, ${a.short} for most salaries, because it takes ${a.months} months of pay against up to ${b.months} at ${b.short}. At ${K.usd(high)} today, ${hA && hB ? `the ten-year values are ${K.usd(hA.npv)} and ${K.usd(hB.npv)}` : 'the model cannot compute both'}. Both are negative above a moderate salary, so the case rests on the move the degree makes possible.` },
    { q: 'Why does LBS report an average salary while INSEAD reports a median?', a: `Each school chooses its own measure. ${b.short} publishes an ${K.salaryKind(B)}, ${K.salary(B)}, and ${a.short} a ${K.salaryKind(A)}, ${K.salary(A)}. An average tends to sit above the median of the same class, so a median for ${b.short}, if it published one, would likely sit below its average. We keep both as published and label each.` },
    { q: 'Does LBS let you finish the MBA earlier than 21 months?', a: `Yes, the school allows an exit ${exitTxt}, and tuition does not change with the exit point. Our total uses the full ${b.months} months, both for the salary given up and for the visa living floor. ${Number.isFinite(minB) ? `Leaving at ${minB} months removes ${b.months! - minB} months of each, which shortens the payback without changing the fee.` : 'An early exit removes months of both, which shortens the payback without changing the fee.'}` },
    { q: 'Which pays more after the MBA in finance, INSEAD or LBS?', a: `${b.short} splits finance into segments and gives an average for each: ${segTxt || 'no segment salary'}, against ${K.segSalary(B, 'finance') ?? 'no figure'} for finance as a whole. ${a.short} gives one finance figure, ${K.segSalary(A, 'finance') ?? 'not published'}, a median for ${K.share(A, 'finance') ?? 'part'} of its class. The two cannot be ranked against each other without that caveat.` },
    { q: 'Where do INSEAD and LBS graduates work after the MBA?', a: `${b.short} keeps ${zp(B, 'UK')} in the United Kingdom and sends ${zp(B, 'US')} to North America. ${a.short} places ${zp(A, 'Europe')} in continental Europe, ${zp(A, 'Asia')} in Asia Pacific and ${zp(A, 'Middle East')} in Africa and the Middle East. ${a.short} is number ${rk(A, 'z-me')} in our Middle East ranking, ${b.short} number ${rk(B, 'z-me')}.` },
  ],
  body: (h) => `<h2>Tuition gap, then a calendar gap</h2>
<p>Converted at the ECB rate of ${K.day(K.FX_DATE)}, tuition is ${K.tuitionUsd(A)} at ${h.sc(A)} and ${K.tuitionUsd(B)} at ${h.sc(B)}, a gap of ${K.usd(K.c(B).tuition! - K.c(A).tuition!)}. The calendar widens it. ${a.short} finishes in ${a.months} months; ${b.short} lets students leave ${exitTxt}, with the same tuition whatever the exit point. We count the full length. For a ${K.ref()} earner, the salary given up is ${K.usd(oA.forgone)} at ${a.short} and ${K.usd(oB.forgone)} at ${b.short}${internB ? `, partly offset at ${b.short} by about ${K.usd(Math.round(internB * K.MODEL.internMonths))} of summer internship pay` : ''}.</p>
<p>Living costs are where the two files differ most. ${a.short} publishes its own budget, ${K.living(A)}. ${b.short} publishes none, so the line is the amount UK Visas and Immigration asks students in London to hold, ${K.money(K.P.ukvi.londonMonthly, 'GBP')} a month, counted for every month: ${K.living(B)}. The visa rule names the least a student must hold, not what a year in London costs, so treat ${b.short}'s total as a minimum.</p>
${h.miniTwo(A, B)}
<h2>Two salaries that are not the same measure</h2>
<p>${a.short}'s ${K.salary(A)} is the salary of the graduate in the middle of the class. ${b.short}'s ${K.salary(B)} is the average, which a few high offers can lift. In dollars the two are ${K.salaryUsd(A)} and ${K.salaryUsd(B)}, close enough that the measure matters. ${b.short} adds ${bonB ? `an average of ${K.money(bonB.v, bonB.cur)} in sign-on and year-end bonuses, received by ${bonB.pct !== null ? K.p(bonB.pct) : 'part'} of those who accepted an offer` : 'no bonus figure'}; ${a.short} reports ${bonA ? `a median bonus of ${K.money(bonA.v, bonA.cur)} without saying how many received it` : 'no bonus'}, so our model counts no bonus for it.</p>
<p>Where ${b.short} gives more detail is the split. It publishes salaries by region, and the gap is large: ${usB?.salary ? `${K.money(usB.salary, usB.cur)} for graduates in North America` : 'North America'} against ${ukB?.salary ? `${K.money(ukB.salary, ukB.cur)} in the United Kingdom` : 'the United Kingdom'}${meB?.salary ? ` and ${K.money(meB.salary, meB.cur)} in Africa and the Middle East` : ''}. It also splits finance by segment, with ${segB.length} segment salaries in its report. ${a.short} gives salaries by industry only, without regions or segments.</p>
<h2>Consulting, and where each class lands</h2>
<p>Consulting is the largest destination at both: ${K.share(A, 'consulting') ?? 'a large share'} of ${a.short}'s class at ${K.segSalary(A, 'consulting') ?? 'an unpublished salary'}, ${K.share(B, 'consulting') ?? 'a large share'} of ${b.short}'s at ${K.segSalary(B, 'consulting') ?? 'an unpublished salary'}. In our consulting ranking, which weighs share, salary and ten-year value, ${a.short} is number ${rk(A, 'consulting')} and ${b.short} number ${rk(B, 'consulting')}. Technology takes ${K.share(B, 'tech') ?? 'part'} of ${b.short}'s class and ${K.share(A, 'tech') ?? 'part'} of ${a.short}'s.</p>
<p>Geography separates them more. ${b.short} is a London school: ${zp(B, 'UK')} of its graduates stay in the United Kingdom, ${zp(B, 'Europe')} go to the rest of Europe. ${a.short} spreads its class wider, with ${zp(A, 'Asia')} in Asia Pacific, close to its Singapore campus, and ${zp(A, 'Middle East')} in Africa and the Middle East. ${b.short} sends ${zp(B, 'Latin America')} to Latin America, which puts it ${rk(B, 'z-latam')} in our ranking for that region.</p>
<h2>Who should pick which</h2>
<p>${a.short} suits someone who wants to be back at work within a year, aims at consulting in continental Europe, Asia or the Middle East, and earns little enough today that ${a.months} months of salary given up still leave a positive return. ${b.short} suits someone who wants a career in London or in finance, values an internship and a longer search, or plans to use the degree to reach North America, where its graduates report the highest regional salary in its report. Both ten-year values turn negative for a ${K.ref()} earner, so set your own salary in the tool above before reading either as a financial win.</p>`,
  tool: 'compare',
  toolArgs: { schools: ['insead', 'lbs'] },
  related: ['school:insead', 'school:lbs', 'compare-insead-vs-hec', 'best-mba-london', 'best-mba-europe'],
  sources: ['ecb_fx', 'ukvi_money', 'mbacsea'],
  schoolSources: ['insead', 'lbs'],
});
