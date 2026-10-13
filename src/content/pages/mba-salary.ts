import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const paid = K.schools.filter((s) => s.emp.salary && s.emp.salary.usd).sort((a, b) => b.emp.salary!.usd! - a.emp.salary!.usd!);
const hi = paid[0];
const lo = paid[paid.length - 1];
const kinds = (k: string) => paid.filter((s) => s.emp.salary!.kind === k);
const medians = kinds('base-median');
const means = kinds('base-mean');
const totals = paid.filter((s) => s.emp.salary!.kind.startsWith('total'));
const missing = K.schools.filter((s) => !s.emp.salary);
const missingEu = missing.filter((s) => s.region === 'Europe' || s.region === 'UK');
const mode = (xs: number[]) => { const m = new Map<number, number>(); for (const x of xs) m.set(x, (m.get(x) ?? 0) + 1); return [...m.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0]; };
const usMed = medians.filter((s) => s.region === 'US').map((s) => s.emp.salary!.usd!);
const usMode = mode(usMed);
type Ind = { key: string; label: string };
const IND: Ind[] = [{ key: 'consulting', label: 'Consulting' }, { key: 'finance', label: 'Financial services' }, { key: 'tech', label: 'Technology' }, { key: 'healthcare', label: 'Healthcare' }, { key: 'consumer', label: 'Consumer goods' }];
const indStats = IND.map((g) => {
  const rows = K.schools.map((s) => ({ s, r: s.emp.industries.find((x) => x.key === g.key && x.usd) })).filter((x) => x.r);
  const v = rows.map((x) => x.r!.usd!);
  const top = [...rows].sort((a, b) => b.r!.usd! - a.r!.usd!)[0];
  const bot = [...rows].sort((a, b) => a.r!.usd! - b.r!.usd!)[0];
  return { ...g, n: rows.length, mode: v.length ? mode(v) : null, top, bot };
}).filter((x) => x.n > 0);
const cons = indStats.find((x) => x.key === 'consulting')!;
const tech = indStats.find((x) => x.key === 'tech')!;
const spread = K.schools.filter((s) => s.emp.salary?.p25 && s.emp.salary?.p75);
const wide = [...spread].sort((a, b) => (b.emp.salary!.p75! - b.emp.salary!.p25!) - (a.emp.salary!.p75! - a.emp.salary!.p25!))[0];
const L = K.s('lbs').emp.salary!;
const tops = paid.filter((s) => s.emp.salary!.usd === hi.emp.salary!.usd);
const nextOne = paid[tops.length];

export default definePage({
  id: 'mba-salary',
  group: 'tools',
  order: 4,
  slug: 'mba-salary',
  nav: 'MBA salary by school',
  card: 'The salary each school reports for its last class, with the kind of figure it is and its value in dollars.',
  title: 'MBA Salary 2026: Post-MBA Pay by School and by Industry',
  description: `MBA salary 2026 at ${paid.length} schools, from ${K.usd(lo.emp.salary!.usd!)} to ${K.usd(hi.emp.salary!.usd!)}: median or average, base or total pay, and what consulting, finance and tech paid the last class.`,
  h1: 'Post-MBA salary, school by school',
  intro: `The highest school-wide salary we read is ${K.usd(hi.emp.salary!.usd!)}, a ${K.salaryKind(hi.slug)} reported by ${K.listOf(tops.map((s) => s.short))}.`,
  resume: `Post-MBA salaries are what one past class reported to its school, and schools do not all report the same thing. Of the ${paid.length} schools that publish a figure, ${medians.length} give a median base salary, the standard of MBA CSEA reporting, ${means.length} give an average base salary and ${totals.length} an average or median of total pay, which includes bonuses. In US dollars at the ECB rate of ${K.day(K.FX_DATE)}, the figures run from ${K.usd(lo.emp.salary!.usd!)} at ${lo.short} to ${K.usd(hi.emp.salary!.usd!)} at ${hi.short}. The most common median among American schools is ${K.usd(usMode[0])}, shared by ${usMode[1]} of them. By industry, consulting pays the most uniform salary: ${cons.mode ? `${K.usd(cons.mode[0])} at ${cons.mode[1]} of the ${cons.n} schools that publish one` : 'few schools publish it'}. ${missing.length} schools publish no salary on their open pages, ${missingEu.length} of them in Europe and the UK.`,
  faqs: [
    { q: 'What is the average salary after an MBA in 2026?', a: `There is no single figure. The schools we read report school-wide salaries from ${K.usd(lo.emp.salary!.usd!)} to ${K.usd(hi.emp.salary!.usd!)} once converted to dollars, and ${medians.length} of them give a median rather than an average. Among American schools, ${usMode[1]} report the same median base salary, ${K.usd(usMode[0])}.` },
    { q: 'Which MBA school reports the highest post-MBA salary?', a: `${tops.length > 1 ? `${K.listOf(tops.map((s) => s.name))} share the top figure, a ${K.salaryKind(hi.slug)} of ${K.usd(hi.emp.salary!.usd!)}.` : `${hi.name}, with a ${K.salaryKind(hi.slug)} of ${K.money(hi.emp.salary!.v, hi.emp.salary!.cur)} for the ${hi.emp.cohort}.`} The next figure down, ${K.usd(nextOne.emp.salary!.usd!)}, is shared by ${paid.filter((s) => s.emp.salary!.usd === nextOne.emp.salary!.usd).length} schools. A school-wide figure mixes industries: a class heavy in consulting and private equity reports more than one heavy in marketing or nonprofits.` },
    { q: 'Is an average MBA salary higher than a median one?', a: `Usually, for the same class. A handful of large offers in finance or abroad lifts an average without moving the median. ${K.s('lbs').short} reports an average base salary of ${K.money(L.v, L.cur)}, so it cannot be ranked against a median from an American school without that caveat. We never convert one into the other.` },
    { q: 'Does the post-MBA salary include the signing bonus?', a: `Not in a base salary, which is what most schools report. The bonus is published apart, with the share of the class that received one, and our model adds it in the first year only. A total pay figure, as ${K.listOf(totals.slice(0, 3).map((s) => s.short))} publish, already includes bonuses and looks higher for that reason.` },
    { q: 'How much does an MBA in tech pay compared with consulting?', a: `Less, at most schools that publish both. ${cons.mode ? `Consulting medians cluster at ${K.usd(cons.mode[0])}` : 'Consulting pays the most uniform salary'}, while technology ranges from ${K.usd(tech.bot!.r!.usd!)} at ${tech.bot!.s.short} to ${K.usd(tech.top!.r!.usd!)} at ${tech.top!.s.short}. Stock grants, common in technology offers, are outside base salary and outside every figure here, so the comparison understates tech pay by an amount no school report measures.` },
  ],
  body: (h) => `<h2>One figure per school, four kinds of figure</h2>
<p>The table gives the school-wide salary each school publishes, in its own currency and in dollars, with the class it describes. The column that matters most is the third one. A median base salary is the pay of the graduate in the middle, without bonus; an average base salary adds everyone's base pay and divides, so a few large offers pull it up; a total pay figure includes the bonus. ${medians.length} schools publish the first kind, ${means.length} the second, ${totals.length} the third or fourth. Reading ${hi.short}'s ${K.salaryKind(hi.slug)} against an average from a European school mixes two measures.</p>
${h.table(['School', 'Salary as reported', 'Kind of figure', 'In US dollars', 'Class'], paid.map((s) => [h.sc(s.slug), K.money(s.emp.salary!.v, s.emp.salary!.cur), K.salaryKind(s.slug), K.usd(s.emp.salary!.usd!), s.emp.cohort]), `School-wide salary reported by each school for its latest class, highest first, converted at the ECB rate of ${K.day(K.FX_DATE)}.`, ['l', 'r', 'l', 'r', 'l'])}
<h2>Why so many American schools report the same number</h2>
<p>${usMode[1]} American schools report exactly ${K.usd(usMode[0])} as their median. It reflects how MBA hiring works: large consulting firms and banks tend to offer the same first-year base pay wherever they recruit, as the industry table below shows, and when they hire a big share of a class, the graduate in the middle often holds one of those offers. The median then says more about the firms that recruit at the school than about the school itself. Schools below that line usually place more of their class in industries with lower pay or in regions where salaries are lower.</p>
<h2>What a median does not tell you</h2>
<p>Half the class earned less than the median, and the spread can be wide. Only ${spread.length} schools publish the first and third quartiles; at ${wide.short}, the middle half of the class earned between ${K.money(wide.emp.salary!.p25!, wide.emp.salary!.cur)} and ${K.money(wide.emp.salary!.p75!, wide.emp.salary!.cur)}. The figure also covers only graduates who sought a job, accepted an offer and answered the survey: sponsored students returning to their employer and founders are usually outside it. Read it as the pay of a typical hire from that class, not a promise for the next one.</p>
${h.miniPosition('131111')}
<h2>Salary by industry</h2>
<p>Where schools split salaries by industry, the pattern is steady. Consulting pays the same headline salary almost everywhere, finance a little less in base pay, and technology the widest range. The table shows, for each industry, how many schools publish a salary for it, the figure most of them share, and the extremes.</p>
${h.table(['Industry', 'Schools publishing it', 'Most common figure', 'Highest', 'Lowest'], indStats.map((x) => [x.label, String(x.n), x.mode ? `${K.usd(x.mode[0])} (${x.mode[1]} schools)` : 'n/a', `${K.usd(x.top!.r!.usd!)}, ${h.sc(x.top!.s.slug)}`, `${K.usd(x.bot!.r!.usd!)}, ${h.sc(x.bot!.s.slug)}`]), 'Salary reported for graduates hired in each industry, in US dollars; each school uses its own kind of figure, mostly a median base salary.', ['l', 'r', 'r', 'r', 'r'])}
<p>The extremes often come from small groups: a school placing a handful of graduates in an industry can report a salary far from the rest. The ${h.a('mba-finder', 'finder')} shows the share of the class behind each figure, and the career pages for ${h.a('consulting', 'consulting')}, ${h.a('finance', 'finance')} and ${h.a('tech', 'technology')} set school figures against U.S. government wage data.</p>
<h2>Schools that publish no salary</h2>
<p>${missing.length} schools give no salary on their open pages, ${missingEu.length} of them in Europe and the United Kingdom: ${K.listOf(missingEu.slice(0, 6).map((s) => s.short))} among them. Some keep the report behind a sign-up form, others publish it as images we could not read. We do not borrow a figure from a ranking or a forum to fill the gap, so those schools have no payback on this site. Ask the admissions office for the report and type the salary into the calculator yourself.</p>
${h.mini('bonus')}`,
  tool: 'salary',
  toolArgs: { goal: 'all' },
  related: ['mba-roi', 'mba-employment-report', 'mba-finder', 'consulting-consultant-salary', 'compare-mba'],
  sources: ['mbacsea', 'ecb_fx', 'bls_oews', 'gmac'],
});
