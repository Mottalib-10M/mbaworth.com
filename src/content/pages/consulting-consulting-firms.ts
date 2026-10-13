import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

type S = (typeof K.schools)[number];
// OUR count: how many schools of this site name each consulting firm in their published employer list.
// One school counts once per firm, whatever the number of lines (EY and EY-Parthenon, PwC and Strategy&).
const FIRMS: Array<{ name: string; type: string; re: RegExp }> = [
  { name: 'McKinsey & Company', type: 'Strategy', re: /mckinsey/i },
  { name: 'Boston Consulting Group', type: 'Strategy', re: /boston consulting|\bBCG\b/i },
  { name: 'Bain & Company', type: 'Strategy', re: /\bbain\b/i },
  { name: 'Deloitte', type: 'Audit network', re: /deloitte/i },
  { name: 'PwC, Strategy& included', type: 'Audit network', re: /pwc|strategy&/i },
  { name: 'EY, EY-Parthenon included', type: 'Audit network', re: /\bEY\b|ernst|parthenon/i },
  { name: 'KPMG', type: 'Audit network', re: /kpmg/i },
  { name: 'Accenture', type: 'Technology and strategy', re: /accenture/i },
  { name: 'Kearney', type: 'Strategy', re: /kearney/i },
  { name: 'Roland Berger', type: 'Strategy', re: /roland berger/i },
  { name: 'Oliver Wyman', type: 'Strategy', re: /oliver wyman/i },
  { name: 'AlixPartners', type: 'Turnaround and performance', re: /alixpartners/i },
  { name: 'Alvarez & Marsal', type: 'Turnaround and performance', re: /alvarez/i },
  { name: 'L.E.K. Consulting', type: 'Strategy', re: /l\.e\.k/i },
  { name: 'ZS Associates', type: 'Sales and life sciences', re: /zs associates/i },
  { name: 'Simon-Kucher', type: 'Pricing', re: /simon-kucher/i },
  { name: 'FTI Consulting', type: 'Economic and financial', re: /fti consulting/i },
  { name: 'Infosys Consulting', type: 'Technology', re: /infosys consulting/i },
  { name: 'Grant Thornton', type: 'Audit network', re: /grant thornton/i },
];
const lists = K.schools.filter((s) => s.emp.employers.length > 0);
const hires = (s: S, re: RegExp) => s.emp.employers.filter((e) => re.test(e.name)).reduce((a, e) => a + (e.hires ?? 0), 0);
const rows = FIRMS.map((f) => {
  const naming = lists.filter((s) => s.emp.employers.some((e) => f.re.test(e.name)));
  const counted = naming.filter((s) => hires(s, f.re) > 0);
  return { ...f, n: naming.length, us: naming.filter((s) => s.country === 'US').length, abroad: naming.filter((s) => s.country !== 'US').length, hires: counted.reduce((a, s) => a + hires(s, f.re), 0), countedAt: counted.length };
}).filter((r) => r.n > 0).sort((a, b) => b.n - a.n || b.hires - a.hires);
const usLists = lists.filter((s) => s.country === 'US').length;
const abroadLists = lists.length - usLists;
const r0 = rows[0];
const r1 = rows[1];
const accenture = rows.find((r) => /Accenture/.test(r.name))!;
const kearney = rows.find((r) => /Kearney/.test(r.name))!;
const roland = rows.find((r) => /Roland/.test(r.name))!;
const consNames = lists.map((s) => s.emp.employers.filter((e) => FIRMS.some((f) => f.re.test(e.name))).length);
const avgCons = consNames.reduce((a, b) => a + b, 0) / lists.length;
const noList = K.schools.length - lists.length;
const booth = K.s('chicago-booth');
const boothCons = booth.emp.employers.filter((e) => FIRMS.some((f) => f.re.test(e.name)));
const boothConsHires = boothCons.reduce((a, e) => a + (e.hires ?? 0), 0);
const boothAll = booth.emp.employers.reduce((a, e) => a + (e.hires ?? 0), 0);
const euroOnly = rows.filter((r) => r.abroad > r.us);
const countSchools = lists.filter((s) => s.emp.employers.some((e) => e.hires && FIRMS.some((f) => f.re.test(e.name))));
const nCount = countSchools.length;
const allUs = countSchools.every((s) => s.country === 'US');
const list = (n: number) => `${K.num(n)} ${n === 1 ? 'list' : 'lists'}`;
const byHires = [...rows].sort((a, b) => b.hires - a.hires)[0];
const boothMbb = booth.emp.employers.filter((e) => /mckinsey|boston consulting|\bBCG\b|\bbain\b/i.test(e.name)).reduce((a, e) => a + (e.hires ?? 0), 0);
const accAbroadRate = accenture.abroad / abroadLists;
const accUsRate = accenture.us / usLists;

export default definePage({
  id: 'consulting-consulting-firms',
  group: 'consulting',
  order: 10,
  slug: 'consulting/consulting-firms',
  nav: 'Consulting firms that hire MBAs',
  card: 'Our count of the consulting firms named in MBA employer lists, with hire numbers where schools publish them.',
  title: 'Consulting Firms 2026: Which Ones MBA Schools Name Most',
  description: `Consulting firms in 2026, ranked by our own count: how many of ${lists.length} MBA employer lists name each firm, from ${r0.name.split(" ")[0]} (${r0.n}) down, with hire counts where published.`,
  h1: 'Consulting firms that hire MBA graduates, counted school by school',
  intro: `We read the employer list of every school on this site that publishes one, ${lists.length} schools, and counted which consulting firms they name.`,
  resume: `The consulting firms that hire MBA graduates most widely are, on our count of ${lists.length} school employer lists, ${rows.slice(0, 5).map((r) => `${r.name.replace(/, .*$/, '')} (${r.n} schools)`).join(', ')}. This is not a ranking of quality or prestige and it borrows nothing from published firm rankings: it counts, for each firm, how many schools on this site name it among the employers of their last class, once per school whatever the number of lines. ${rows.length} consulting firms appear at least once. ${nCount} schools also publish the number of hires per consulting firm, which shows volume where names alone do not: the strategy firms and the audit networks dominate both. Abroad, firms with European roots such as ${roland.name} (${roland.abroad} schools outside the United States, ${roland.us} inside) gain ground. ${noList} schools of the site publish no employer list and are not counted. A school naming a firm proves that the firm hired there, not how many people it took.`,
  faqs: [
    { q: 'Which consulting firms hire the most MBA graduates in 2026?', a: `By the number of schools that name them, ${r0.name.replace(/, .*$/, '')} comes first in our count, named by ${r0.n} of ${lists.length} employer lists, then ${r1.name.replace(/, .*$/, '')} with ${r1.n}. By hires, where schools publish them, ${byHires.name.replace(/, .*$/, '')} leads, with ${byHires.hires} at ${byHires.countedAt} American schools. The lists describe the class of 2025 at most schools, so 2026 hiring may differ.` },
    { q: 'Is this list a ranking of the best consulting firms?', a: 'No. It counts how many MBA schools name each firm as an employer, which measures how widely a firm recruits on campus, not how good it is to work for or how it pays. We do not reuse rankings published by career guides or magazines; every count here comes from the schools\' own employment reports, and the method is stated on the page.' },
    { q: 'How many schools name Accenture and Kearney among MBA employers?', a: `On our count, Accenture appears in ${accenture.n} employer lists, ${accenture.abroad} of them outside the United States, and Kearney in ${kearney.n}. Both rank below the three strategy firms and the large audit networks by the number of schools, and their hire counts are published by few schools, so their volume is harder to measure.` },
    { q: 'Why are some well-known consulting firms missing from the count?', a: `Either no school on this site names them, or the school groups them under "other". Employer lists are short and favor the largest recruiters. ${noList} schools publish no list at all, among them several large programs, so a firm that recruits mainly there is undercounted.` },
    { q: 'Do European MBA schools list different consulting firms from American schools?', a: `Partly. The three strategy firms appear on both sides. ${euroOnly.length ? `${K.listOf(euroOnly.filter((r) => !/Accenture/.test(r.name)).slice(0, 4).map((r) => r.name.replace(/, .*$/, '')))} are among the firms named by more schools outside the United States than inside.` : ''} ${accAbroadRate > accUsRate ? `Accenture is also named by a larger share of non-American lists, ${K.p(Math.round(accAbroadRate * 100))}, than of American ones, ${K.p(Math.round(accUsRate * 100))}.` : `Accenture is named by ${K.p(Math.round(accAbroadRate * 100))} of non-American lists and ${K.p(Math.round(accUsRate * 100))} of American ones.`}` },
  ],
  body: (h) => `<h2>How we counted</h2>
<p>Every school on this site publishes an employment report, and ${lists.length} of them include a list of employers: sometimes the top employers by hires, sometimes an alphabetical sample, sometimes a full list. We read each list and looked for ${FIRMS.length} consulting firms, with their usual variants (BCG and Boston Consulting Group, EY and EY-Parthenon, PwC and Strategy&). A school counts once per firm, whatever the number of lines. The count measures how widely a firm recruits across business schools, not its size, its quality or its pay.</p>
<p>We do not use the firm rankings published by career guides or magazines. Those are built from surveys of consultants that we cannot check; this count can be checked by anyone with the schools' reports, which are linked from each school page.</p>
<h2>The count</h2>
${h.table(['Firm', 'Type', 'Schools naming it', 'In the US', 'Outside the US', 'Hires, where counted'], rows.map((r) => [r.name, r.type, K.num(r.n), K.num(r.us), K.num(r.abroad), r.hires ? `${K.num(r.hires)} at ${r.countedAt} ${r.countedAt === 1 ? 'school' : 'schools'}` : 'not published']), `Our count, ${lists.length} employer lists (${usLists} American schools, ${abroadLists} elsewhere), last class reported by each school.`, ['l', 'l', 'r', 'r', 'r', 'r'])}
<p>${r0.name.replace(/, .*$/, '')} and ${r1.name.replace(/, .*$/, '')} sit at the top, close together, followed by the large audit networks and Bain. The list then thins quickly: below the first ten, firms appear in a handful of lists, often at schools in one region. On average a school's list names ${K.num(avgCons, 1)} of the ${FIRMS.length} firms we track, a sign that consulting is among the first employers of most programs.</p>
${h.miniGoal('chicago-booth')}
<h2>Names versus volume</h2>
<p>A firm named in a list hired at least one graduate; it may have hired fifty. ${nCount} schools publish hires per consulting firm${allUs ? ', all of them American,' : ','} and they show how concentrated consulting recruiting is. At ${h.sc('chicago-booth')}, the consulting firms in its list account for ${K.num(boothConsHires)} of the ${K.num(boothAll)} hires it attributes to named employers, and McKinsey, BCG and Bain take ${K.num(boothMbb)} of them. The hire column of the table sums those counts: it favors firms strong at those ${nCount} schools and says little about Europe or Asia, where almost no school publishes counts.</p>
<p>${byHires.name !== r0.name ? `That is why the leader by names, ${r0.name.replace(/, .*$/, '')}, and the leader by hires, ${byHires.name.replace(/, .*$/, '')}, are not the same: one recruits more widely, the other more heavily where it recruits.` : `${r0.name.replace(/, .*$/, '')} leads on both measures.`} The ${h.a('consulting-mbb', 'MBB page')} sets the three strategy firms side by side, and ${h.a('consulting-big-4-consulting', 'Big 4 consulting')} covers the audit networks, with their own published figures.</p>
<h2>Outside the United States</h2>
<p>${abroadLists} of the employer lists come from schools outside the United States. The strategy firms are just as present there, but the rest of the list changes. ${roland.name} appears in ${list(roland.abroad)} outside the United States against ${list(roland.us)} inside; Accenture in ${list(accenture.abroad)} against ${list(accenture.us)}. In India and China, the lists also name technology and analytics firms that do consulting work under other labels. For an applicant aiming at one region, the firms named by the schools of that region are a better guide than the global count; each school page lists the employers its report names.</p>
<h2>Using the count</h2>
<p>Start from the firms you want, then check which schools name them and how much of the class goes into consulting. The finder at the top of this page ranks schools on the consulting share, the consulting salary and the ten-year value of the degree for your salary. A school that names every firm on your list but sends a small share of its class into consulting is a weaker pipeline than one that names fewer firms and sends a third of the class; the ${h.a('best-mba-consulting', 'consulting ranking')} shows both figures together.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'consulting' },
  related: ['consulting-mbb', 'consulting-big-4-consulting', 'best-mba-consulting', 'consulting', 'mba-employment-report'],
  sources: ['mbacsea', 'gmac'],
  schoolSources: ['chicago-booth', 'kellogg', 'columbia', 'michigan-ross', 'mit-sloan', 'nyu-stern'],
});
