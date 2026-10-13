import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

type S = (typeof K.schools)[number];
// The four audit networks and their consulting arms in the schools' employer lists (our count).
const BIG4 = [
  { name: 'Deloitte', arm: 'Deloitte Consulting, Monitor Deloitte', re: /deloitte/i },
  { name: 'PwC', arm: 'PwC Advisory, Strategy&', re: /pwc|strategy&/i },
  { name: 'EY', arm: 'EY Consulting, EY-Parthenon', re: /\bEY\b|ernst|parthenon/i },
  { name: 'KPMG', arm: 'KPMG Advisory', re: /kpmg/i },
];
const MBB = /mckinsey|boston consulting|\bBCG\b|\bbain\b/i;
const lists = K.schools.filter((s) => s.emp.employers.length > 0);
const hires = (s: S, re: RegExp) => s.emp.employers.filter((e) => re.test(e.name)).reduce((a, e) => a + (e.hires ?? 0), 0);
const stats = BIG4.map((f) => {
  const naming = lists.filter((s) => s.emp.employers.some((e) => f.re.test(e.name)));
  return { ...f, naming, n: naming.length, counted: naming.filter((s) => hires(s, f.re) > 0).map((s) => ({ s, h: hires(s, f.re) })).sort((a, b) => b.h - a.h) };
});
const anyBig4 = lists.filter((s) => s.emp.employers.some((e) => BIG4.some((f) => f.re.test(e.name))));
const big4NoMbb = anyBig4.filter((s) => !s.emp.employers.some((e) => MBB.test(e.name)));
const parthenon = lists.filter((s) => s.emp.employers.some((e) => /parthenon/i.test(e.name))).length;
const strategyAnd = lists.filter((s) => s.emp.employers.some((e) => /strategy&/i.test(e.name))).length;
const bls = K.P.bls.occupations['131111'];
const cons = (s: S) => s.emp.industries.find((x) => x.key === 'consulting');
const dl = stats[0];
const maxC = stats.flatMap((f) => f.counted.map((x) => ({ f: f.name, ...x }))).sort((a, b) => b.h - a.h)[0];
const col = K.s('columbia');
// Official releases read on 2026-10-13 (network-wide figures, all services, not consulting alone):
// Deloitte FY2025 (year to 31 May 2025): US$70.5 billion, workforce "over 470,000", "more than 150 countries and territories".
// EY FY25 (year to June 2025): US$53,219 million, Consulting US$16,400 million, Strategy and Transactions (EY-Parthenon)
//   US$6,235 million, 406,209 people, "more than 150 countries and territories".
// KPMG FY25 (year to 30 September 2025): US$39.8 billion, Advisory US$16.4 billion, 276,030 people, 138 countries and territories.
const DEL = { rev: 70.5e9, people: 470000, countries: 150 };
const EYF = { rev: 53219e6, consulting: 16400e6, parthenon: 6235e6, people: 406209, countries: 150 };
const KPM = { rev: 39.8e9, advisory: 16.4e9, people: 276030, countries: 138 };
const bn = (v: number) => `${K.usd(v / 1e9, 1)} billion`;
const pc = (a: number, b: number) => K.p(Math.round((a / b) * 1000) / 10);

export default definePage({
  id: 'consulting-big-4-consulting',
  group: 'consulting',
  order: 9,
  slug: 'consulting/big-4-consulting',
  nav: 'Big 4 consulting',
  card: 'Deloitte, PwC, EY and KPMG consulting after an MBA: which schools list them, their size in their own figures and what the pay data show.',
  title: 'Big 4 Consulting 2026: Deloitte, PwC, EY, KPMG for MBAs',
  description: `Big 4 consulting salary and hiring in 2026: Deloitte is named by ${dl.n} MBA schools, EY-Parthenon by ${parthenon}, against a BLS management analyst median of ${K.usd(bls.median)}.`,
  h1: 'Big 4 consulting after an MBA: Deloitte, PwC, EY and KPMG',
  intro: `The four audit networks run large consulting arms; ${anyBig4.length} of the ${lists.length} schools on this site that publish an employer list name at least one of them.`,
  resume: `Big 4 consulting means the advisory and consulting businesses of Deloitte, PwC, EY and KPMG, the four global audit networks. They hire MBA graduates into strategy units (Monitor Deloitte, Strategy& at PwC, EY-Parthenon) and into larger technology, operations and risk practices. ${anyBig4.length} of the ${lists.length} schools on this site that publish an employer list name at least one of them: Deloitte appears at ${dl.n}, EY at ${stats[2].n}, PwC at ${stats[1].n}, KPMG at ${stats[3].n}. At ${big4NoMbb.length} schools a Big 4 firm is named and none of McKinsey, BCG or Bain is, which makes the Big 4 the main consulting door for those programs. The firms publish no salary grid. The BLS puts the median management analyst at ${K.usd(bls.median)} in ${K.P.bls.period}, and schools whose consulting hires lean toward Big 4 and technology work report lower consulting medians than those dominated by strategy firms. EY's own figures show consulting at ${pc(EYF.consulting, EYF.rev)} of its global revenue.`,
  faqs: [
    { q: 'What is Big 4 consulting?', a: `It is the consulting business of the four audit networks, Deloitte, PwC, EY and KPMG. Each has a strategy unit (Monitor Deloitte, Strategy&, EY-Parthenon) and larger practices in technology, operations, risk and deals. On this site, ${anyBig4.length} schools name at least one of the four among their employers, Deloitte most often, at ${dl.n} schools.` },
    { q: 'How much do Big 4 consultants earn after an MBA?', a: `The firms publish no grid. The school reports suggest less than at the large strategy firms: schools sending many graduates to Big 4 and technology consulting report lower consulting medians. As a floor, the BLS median for management analysts was ${K.usd(bls.median)} in ${K.P.bls.period}, with three quarters under ${K.usd(bls.p75)}. Strategy units such as EY-Parthenon or Strategy& tend to pay closer to the strategy firms.` },
    { q: 'Which Big 4 firm hires the most MBA graduates?', a: `Deloitte, on the employer lists: it is named by ${dl.n} of the ${lists.length} schools that publish one. ${dl.counted.length ? `Where counts exist, ${dl.counted[0].s.short} reports ${dl.counted[0].h} Deloitte hires.` : ''} The largest single count is ${maxC.f} at ${maxC.s.short}, ${maxC.h} hires. KPMG is named least, by ${stats[3].n} schools.` },
    { q: 'What is EY-Parthenon and how does it differ from EY consulting?', a: `EY-Parthenon is the strategy and transactions arm of EY, reported separately from EY Consulting in EY's results: ${bn(EYF.parthenon)} of revenue in the year to June 2025, against ${bn(EYF.consulting)} for consulting. In the school lists, EY-Parthenon is named by ${parthenon} schools, often next to McKinsey, BCG and Bain, which places it in strategy recruiting.` },
    { q: 'How large are the Big 4 networks?', a: `In their own latest releases, Deloitte reported ${bn(DEL.rev)} of revenue and over ${K.num(DEL.people)} people, EY ${bn(EYF.rev)} and ${K.num(EYF.people)} people, KPMG ${bn(KPM.rev)} and ${K.num(KPM.people)} people. PwC's site refused our requests, so we give no PwC figure. These cover audit and tax as well as consulting.` },
  ],
  body: (h) => `<h2>Four networks, several consulting arms</h2>
<p>Deloitte, PwC, EY and KPMG began as audit firms and remain the four largest. Each now runs consulting businesses that are larger, by people, than the strategy firms: technology implementation, operations, risk, human capital, deals advisory, and a strategy unit at the top. Monitor Deloitte, Strategy& at PwC and EY-Parthenon recruit MBA graduates on the same campuses and with the same ${h.a('consulting-case-interview', 'case interviews')} as ${h.a('consulting-mbb', 'McKinsey, BCG and Bain')}. The other practices hire MBA graduates as senior consultants or managers, often for a specific industry or function.</p>
<p>Because the networks also audit companies, regulators limit the consulting they can sell to their own audit clients. That rule shapes their client base more than their recruiting, but it explains why consulting is run as a separate business line in their results.</p>
<h2>Which schools name them</h2>
<p>We counted, in each school's employer list, the names of the four networks and their consulting arms. Deloitte is the most widely named; EY appears often through EY-Parthenon (${parthenon} schools), PwC often through Strategy& (${strategyAnd} schools).</p>
${h.table(['Network', 'Consulting arms listed', 'Schools naming it', 'Largest count reported'], stats.map((f) => [f.name, f.arm, `${K.num(f.n)} of ${K.num(lists.length)}`, f.counted.length ? `${f.counted[0].h} at ${h.sc(f.counted[0].s.slug)}` : 'no count published']), 'Our count from each school\'s employer list; any line naming the network or one of its consulting arms counts once per school.', ['l', 'l', 'r', 'l'])}
<p>The more telling figure is where the Big 4 recruit without the strategy firms. At ${big4NoMbb.length} schools, among them ${K.listOf(big4NoMbb.slice(0, 5).map((s) => h.sc(s.slug)))}, a Big 4 network is named and none of McKinsey, BCG or Bain appears. For those programs the Big 4 are the main consulting employer, and the school's consulting figures describe Big 4 pay more than strategy pay. At the largest schools the two groups appear together: ${h.sc('columbia')} reports ${hires(col, stats[1].re)} PwC and ${hires(col, stats[0].re)} Deloitte hires next to its strategy firm counts.</p>
${h.miniTwo('vanderbilt-owen', 'indiana-kelley')}
<h2>The networks in their own figures</h2>
<p>The networks publish global results each year. These cover every service, audit and tax included, and are quoted as each release gives them.</p>
${h.table(['Network', 'Year', 'Global revenue', 'Consulting or advisory line', 'People', 'Countries and territories'], [
    ['Deloitte', 'to May 2025', bn(DEL.rev), 'not given in dollars', `over ${K.num(DEL.people)}`, `more than ${DEL.countries}`],
    ['EY', 'to June 2025', bn(EYF.rev), `Consulting ${bn(EYF.consulting)}; EY-Parthenon ${bn(EYF.parthenon)}`, K.num(EYF.people), `more than ${EYF.countries}`],
    ['KPMG', 'to September 2025', bn(KPM.rev), `Advisory ${bn(KPM.advisory)}`, K.num(KPM.people), K.num(KPM.countries)],
    ['PwC', 'n/a', 'site refused our requests', 'n/a', 'n/a', 'n/a'],
  ], 'Global figures from each network\'s own results release, read on October 13, 2026.', ['l', 'l', 'r', 'l', 'r', 'r'])}
<p>By our division, consulting is ${pc(EYF.consulting, EYF.rev)} of EY's revenue and EY-Parthenon ${pc(EYF.parthenon, EYF.rev)}; advisory is ${pc(KPM.advisory, KPM.rev)} of KPMG's. Deloitte reports growth for its consulting units but no dollar amount. PwC's sites returned an access error to every request we made, so no PwC figure is written here. The headcounts include auditors and tax advisers; none of the releases gives the number of consultants.</p>
<h2>Pay: what can and cannot be said</h2>
<p>No Big 4 network publishes an MBA salary. The Bureau of Labor Statistics gives the floor for the whole occupation: management analysts earned a median of ${K.usd(bls.median)} in ${K.P.bls.period}, with a first quartile of ${K.usd(bls.p25)} and a third of ${K.usd(bls.p75)}. The schools show the gap with the strategy firms indirectly. Schools where consulting hires are mostly at the strategy firms report the standard strategy base; schools where the Big 4 and technology practices weigh more report lower consulting medians, and schools that split consulting lines put technology consulting below strategy, as the ${h.a('consulting-what-is-strategy-consulting', 'strategy consulting page')} shows with each school's own labels.</p>
<p>The strategy units are the exception. EY-Parthenon and Strategy& appear in the same employer lists as the three strategy firms, at schools such as ${h.sc('chicago-booth')} and ${h.sc('kellogg')}, and recruit the same candidates; their offers are not public either. For the national distribution by city, use the calculator at the top of the page, and for the pay of strategy firms, ${h.a('consulting-consultant-salary', 'consultant salary')}.</p>`,
  tool: 'bls',
  toolArgs: { mode: '131111' },
  related: ['consulting-consulting-firms', 'consulting-mbb', 'consulting-consultant-salary', 'consulting', 'school:vanderbilt-owen'],
  sources: ['bls_oews', 'mbacsea'],
  schoolSources: ['columbia', 'vanderbilt-owen', 'indiana-kelley'],
  extSources: [
    { label: 'Deloitte, Global revenue announcement FY2025', url: 'https://www.deloitte.com/global/en/about/press-room/global-revenue-announcement-2025.html' },
    { label: 'EY, EY announces global revenue of US$53.2b for fiscal year 2025', url: 'https://www.ey.com/en_gl/newsroom/2025/10/ey-announces-global-revenue-of-us-53-2b-for-fiscal-year-2025' },
    { label: 'KPMG, KPMG delivers rise in global revenue (FY25 release)', url: 'https://kpmg.com/kw/en/media/2025/12/kpmg-delivers-rise-in-global-revenue.html' },
  ],
});
