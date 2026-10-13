import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

type S = (typeof K.schools)[number];
// Bain & Company in the employer lists the schools publish (our count).
const RE = /\bbain\b/i;
const MCK = /mckinsey/i;
const lists = K.schools.filter((s) => s.emp.employers.length > 0);
const naming = lists.filter((s) => s.emp.employers.some((e) => RE.test(e.name)));
const hires = (s: S, re: RegExp) => s.emp.employers.filter((e) => re.test(e.name)).reduce((a, e) => a + (e.hires ?? 0), 0);
const cons = (s: S) => s.emp.industries.find((x) => x.key === 'consulting');
const abroad = naming.filter((s) => s.country !== 'US');
const abroadPaid = abroad.filter((s) => cons(s)?.salary && cons(s)?.usd).sort((a, b) => cons(b)!.usd! - cons(a)!.usd!);
const usPaid = naming.filter((s) => s.country === 'US' && cons(s)?.usd).map((s) => cons(s)!.usd!).sort((a, b) => b - a);
const counted = naming.filter((s) => hires(s, RE) > 0).map((s) => ({ s, bain: hires(s, RE), mck: hires(s, MCK) })).sort((a, b) => b.bain - a.bain);
const ratioAll = counted.reduce((a, x) => a + x.bain, 0) / counted.reduce((a, x) => a + x.mck, 0);
const regionName = new Intl.DisplayNames(['en'], { type: 'region' });
const ctry = (c: string) => (c === 'GB' ? 'United Kingdom' : regionName.of(c) ?? c);
const abroadCountries = [...new Set(abroad.map((s) => ctry(s.country)))];
// Bain & Company, About page, read on 2026-10-13: "Since 1973", "Across 67 cities in 40 countries",
// "investing $1 billion of pro bono consulting work".
const BAIN = { since: 1973, cities: 67, countries: 40, proBono: 1e9 };
const top = abroadPaid[0];
const nMck = lists.filter((s) => s.emp.employers.some((e) => MCK.test(e.name))).length;
const nBcg = lists.filter((s) => s.emp.employers.some((e) => /boston consulting|\bBCG\b/i.test(e.name))).length;
const below = counted.filter((x) => x.bain < x.mck).length;
const allBelow = abroadPaid.every((s) => cons(s)!.usd! < usPaid[0]);

export default definePage({
  id: 'consulting-bain-salary',
  group: 'consulting',
  order: 7,
  slug: 'consulting/bain-salary',
  nav: 'Bain salary',
  card: 'Bain pay after an MBA in and outside the United States: the schools that name Bain and what they report for consulting.',
  title: 'Bain Salary 2026: MBA Consulting Pay in the US and Abroad',
  description: `Bain salary in 2026: no public grid, but ${naming.length} MBA schools name Bain; abroad they report consulting pay of ${K.usd(cons(abroadPaid[abroadPaid.length - 1])!.usd!)} to ${K.usd(cons(top)!.usd!)}, in the US up to ${K.usd(usPaid[0])}.`,
  h1: 'Bain salary after an MBA, office by office',
  intro: `Bain names ${BAIN.cities} cities in ${BAIN.countries} countries on its site; ${abroad.length} of the ${naming.length} schools that list it as an employer are outside the United States.`,
  resume: `Bain & Company publishes no salary for MBA hires, and we found no official file that gives one, so the figures here are what the schools that hire for Bain report for all their consulting graduates. ${naming.length} of the ${lists.length} schools on this site that publish an employer list name Bain. In the United States, those schools report consulting medians from ${K.usd(usPaid[usPaid.length - 1])} to ${K.usd(usPaid[0])}. Outside it, where Bain recruits for offices in ${abroadCountries.length} other countries of our sample, the consulting figure is paid in local currency and lower once converted: ${abroadPaid.slice(0, 3).map((s) => `${K.money(cons(s)!.salary!, cons(s)!.cur)} at ${s.short}`).join(', ')}. At the American schools that count hires by firm, Bain takes about ${K.num(ratioAll * 100)} hires for every 100 McKinsey hires. Bain's site says it has worked with clients since ${BAIN.since}, across ${BAIN.cities} cities in ${BAIN.countries} countries.`,
  faqs: [
    { q: 'What is the Bain salary for an MBA consultant in the United States?', a: `Bain does not publish it. The American schools that name Bain among their employers report consulting medians from ${K.usd(usPaid[usPaid.length - 1])} to ${K.usd(usPaid[0])}, and the top of that range is the standard base of the large strategy firms. That is a median for all consulting hires at those schools, so treat it as a proxy, with bonuses on top.` },
    { q: 'How much does Bain pay MBA hires in Europe?', a: `The European schools that name Bain report consulting figures in euros or pounds: ${abroadPaid.filter((s) => ['EUR', 'GBP'].includes(cons(s)!.cur)).slice(0, 3).map((s) => `${K.money(cons(s)!.salary!, cons(s)!.cur)} at ${s.short}`).join(', ')}. These cover every consulting hire of the school, at Bain and elsewhere, and graduates working in many countries, so they describe the market Bain pays into rather than its own scale.` },
    { q: 'Does Bain hire as many MBA graduates as McKinsey and BCG?', a: `Fewer, at the schools that count. Their reports give about ${K.num(ratioAll * 100)} Bain hires for every 100 McKinsey hires, and BCG has more than either. Bain is also named by fewer schools: ${naming.length}, against ${nMck} for McKinsey and ${nBcg} for BCG. The MBB page compares the three on the same data.` },
    { q: 'How big is Bain and Company?', a: `Bain's About page says the firm has partnered with clients since ${BAIN.since} and operates across ${BAIN.cities} cities in ${BAIN.countries} countries as one global team. It gives no headcount on that page. It also states a commitment to invest ${K.usd(BAIN.proBono / 1e9)} billion of pro bono consulting work. We quote only what the page says.` },
    { q: 'Which schools outside the United States list Bain as an employer?', a: `${K.listOf(abroad.slice(0, 6).map((s) => s.short))}${abroad.length > 6 ? ` and ${abroad.length - 6} more` : ''}, in ${K.listOf(abroadCountries.slice(0, 5))}${abroadCountries.length > 5 ? ' and other countries' : ''}. None of them publishes how many graduates joined Bain, so a name in the list proves that the firm recruited there in the last class but says nothing about how many offers it made.` },
  ],
  body: (h) => `<h2>Bain's offices, as Bain describes them</h2>
<p>Bain's About page says the firm has partnered with clients since ${BAIN.since} and works "across ${BAIN.cities} cities in ${BAIN.countries} countries" as one global team. It does not give a headcount, a revenue figure or a pay scale. It does state a commitment to invest ${K.usd(BAIN.proBono / 1e9)} billion of pro bono consulting work. For a salary question, the useful fact is the footprint: every one of those offices hires and pays in its own market, and an MBA graduate joining Bain in Madrid or Singapore is paid on a different scale from one joining in Boston.</p>
<p>The school reports let us see that difference, if not Bain's own numbers. The method is the same as on the ${h.a('consulting-mckinsey-salary', 'McKinsey page')}: take the schools that name the firm as an employer and read the consulting salary each reports. The angle here is geographic, because Bain's presence in the employer lists of European and Asian schools is where its pay is least documented.</p>
<h2>Outside the United States: the consulting figure in local currency</h2>
<p>${abroad.length} schools outside the United States name Bain as an employer. The table shows those that publish a consulting salary, converted at the ECB rate of ${K.day(K.FX_DATE)}.</p>
${h.table(['School', 'Country', 'Share in consulting', 'Consulting salary', 'In US dollars'], abroadPaid.map((s) => [h.sc(s.slug), ctry(s.country), cons(s)!.pct === null ? 'not published' : K.p(cons(s)!.pct!), K.money(cons(s)!.salary!, cons(s)!.cur), K.usd(cons(s)!.usd!)]), 'Schools outside the United States that name Bain among their employers, with the consulting salary they report for all consulting hires.', ['l', 'l', 'r', 'r', 'r'])}
<p>${top.short} reports the highest figure, ${K.money(cons(top)!.salary!, cons(top)!.cur)}, about ${K.usd(cons(top)!.usd!)}. ${allBelow ? `Every figure in the table is below the ${K.usd(usPaid[0])} reported by the top American schools.` : `Most figures in the table are below the ${K.usd(usPaid[0])} reported by the top American schools.`} Three things explain the gap: offices pay at local market levels, the schools' consulting lines include graduates at smaller firms, and some report averages that mix countries with very different pay. ${abroad.length - abroadPaid.length} of the schools abroad that name Bain publish no consulting salary at all.</p>
${h.miniFx()}
<h2>In the United States: fewer hires than its two peers</h2>
<p>American schools are where Bain's recruiting can be counted. At the schools that publish hires by firm, Bain's count is below McKinsey's at ${below} of ${counted.length}:</p>
${h.table(['School', 'Bain hires', 'McKinsey hires', 'Bain per 100 McKinsey'], counted.map((x) => [h.sc(x.s.slug), K.num(x.bain), x.mck ? K.num(x.mck) : 'not counted', x.mck ? K.num((x.bain / x.mck) * 100) : 'n/a']), 'Hires reported by each school for its last class.', ['l', 'r', 'r', 'r'])}
<p>Across those schools, Bain takes about ${K.num(ratioAll * 100)} hires for every 100 at McKinsey. The salary does not follow the volume: the American schools that name Bain report consulting medians up to ${K.usd(usPaid[0])}, the same top figure as for its peers, because the large strategy firms make the same base offer. A smaller intake means fewer places, not lower pay.</p>
<h2>Choosing a school for Bain abroad</h2>
<p>The calculator at the top compares ${h.sc('tuck')}, ${h.sc('uva-darden')} and ${h.sc('insead')}: two American two-year programs that name Bain, and a one-year program in Europe and Asia that does too. For an applicant aiming at a Bain office outside the United States, the trade is visible in it: the American programs report higher consulting medians but cost two years of salary, while ${K.s('insead').short} costs less time and places ${K.share('insead', 'consulting')} of its class in consulting, mostly outside the United States. The ${h.a('best-mba-europe', 'Europe ranking')} and ${h.a('consulting-mbb', 'MBB')} pages go further.</p>`,
  tool: 'compare',
  toolArgs: { schools: ['tuck', 'uva-darden', 'insead'], goal: 'consulting' },
  related: ['consulting-mbb', 'consulting-mckinsey-salary', 'consulting-bcg-salary', 'school:insead', 'best-mba-europe'],
  sources: ['ecb_fx', 'mbacsea', 'bls_oews'],
  schoolSources: [...abroadPaid.map((s) => s.slug), ...counted.map((x) => x.s.slug)].filter((v, i, a) => a.indexOf(v) === i),
  extSources: [{ label: 'Bain & Company, About Bain', url: 'https://www.bain.com/about/' }],
});
