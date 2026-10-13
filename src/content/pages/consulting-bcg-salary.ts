import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

type S = (typeof K.schools)[number];
// Boston Consulting Group in the employer lists the schools publish (our count).
const F = { bcg: /boston consulting|\bBCG\b/i, mck: /mckinsey/i, bain: /\bbain\b/i };
const lists = K.schools.filter((s) => s.emp.employers.length > 0);
const names = (s: S, re: RegExp) => s.emp.employers.some((e) => re.test(e.name));
const hires = (s: S, re: RegExp) => s.emp.employers.filter((e) => re.test(e.name)).reduce((a, e) => a + (e.hires ?? 0), 0);
const naming = lists.filter((s) => names(s, F.bcg));
const cons = (s: S) => s.emp.industries.find((x) => x.key === 'consulting');
const counted = naming.filter((s) => hires(s, F.bcg) > 0).map((s) => ({ s, bcg: hires(s, F.bcg), mck: hires(s, F.mck), bain: hires(s, F.bain), top: [...s.emp.employers].sort((a, b) => (b.hires ?? 0) - (a.hires ?? 0))[0] })).sort((a, b) => b.bcg - a.bcg);
const leads = counted.filter((x) => x.bcg >= Math.max(...x.s.emp.employers.filter((e) => !F.bcg.test(e.name)).map((e) => e.hires ?? 0)));
const meds = [...new Set(counted.map((x) => cons(x.s)?.salary).filter((v): v is number => !!v))].sort((a, b) => a - b);
const ratio = meds[meds.length - 1] / K.P.bls.occupations['131111'].median;
const sum = (k: 'bcg' | 'mck' | 'bain') => counted.reduce((a, x) => a + x[k], 0);
const first = counted[0];
// Boston Consulting Group official pages, read on 2026-10-13: overview ("33.5k global employees",
// "$14.4b annual revenue", "offices in more than 100 cities in over 50 countries") and history
// (Bruce Henderson, "Founder and CEO, 1963-1980"; growth share matrix "created in 1968").
const BCG = { people: 33500, revenue: 14.4e9, cities: 100, countries: 50, founded: 1963, ceoUntil: 1980, matrix: 1968 };
const perHead = Math.round(BCG.revenue / BCG.people / 1000) * 1000;
const tuckRoi = K.roi('tuck', 'consulting');

export default definePage({
  id: 'consulting-bcg-salary',
  group: 'consulting',
  order: 6,
  slug: 'consulting/bcg-salary',
  nav: 'BCG salary',
  card: 'BCG pay after an MBA: where the firm hires most, the consulting medians of those schools and the firm in its own figures.',
  title: 'BCG Salary 2026: MBA Hires, School Medians, Firm Figures',
  description: `BCG salary in 2026: no public grid, but ${first.s.short} alone reports ${first.bcg} BCG hires, consulting medians reach ${K.money(cons(first.s)!.salary!, 'USD')} and the firm earns ${K.usd(perHead)} per head.`,
  h1: 'BCG salary: what the hiring numbers say',
  intro: `Boston Consulting Group is the largest single recruiter at the schools that count their hires: first or joint first employer at ${leads.length} of the ${counted.length} schools that publish numbers.`,
  resume: `Boston Consulting Group does not publish what it pays MBA hires, and no government file we could read gives a BCG offer, so this page has no BCG salary figure as such. It has something close. Among the schools on this site that publish hire counts by employer, BCG is the first or joint first employer at ${leads.length} of ${counted.length}; ${first.s.short} alone reports ${first.bcg} BCG hires, against ${first.mck} for McKinsey and ${first.bain} for Bain. ${first.s.short} reports a consulting median of ${K.money(cons(first.s)!.salary!, 'USD')}, which is the best public proxy for the BCG base offer in the United States. BCG's own site gives the scale of the firm: ${K.num(BCG.people)} employees and ${K.usd(BCG.revenue / 1e9, 1)} billion of annual revenue, about ${K.usd(perHead)} of revenue per person by our division. At ${K.s('tuck').short}, the payback of the degree on that consulting salary is ${tuckRoi?.payback ? K.yrs(tuckRoi.payback) : 'not computable'} for a person earning ${K.ref()} before.`,
  faqs: [
    { q: 'How much does BCG pay MBA graduates?', a: `BCG publishes no pay grid. The schools where it hires most report consulting medians of ${K.money(cons(first.s)!.salary!, 'USD')} in the United States, and since BCG is the first or joint first employer at ${leads.length} of the ${counted.length} that count hires, that figure is the closest public proxy for its American base offer. Signing and performance bonuses come on top and are not in the reports.` },
    { q: 'Which MBA school sends the most graduates to BCG?', a: `Of the schools that publish hire counts, ${first.s.short} reports the most BCG hires, ${first.bcg}, followed by ${counted[1].s.short} with ${counted[1].bcg} and ${counted[2].s.short} with ${counted[2].bcg}. Most schools name BCG without a count: ${naming.length} of the ${lists.length} schools with an employer list mention the firm.` },
    { q: 'Does BCG hire more MBAs than McKinsey?', a: `At the schools that count, yes: their reports add up to ${sum('bcg')} BCG hires against ${sum('mck')} for McKinsey and ${sum('bain')} for Bain. Those are ${counted.length} American schools only. McKinsey is named by slightly more schools overall, so the answer elsewhere is unknown.` },
    { q: 'How big is Boston Consulting Group?', a: `BCG's own overview page gives ${K.num(BCG.people)} employees worldwide, ${K.usd(BCG.revenue / 1e9, 1)} billion of annual revenue and offices in more than ${BCG.cities} cities in over ${BCG.countries} countries. Its history page names Bruce Henderson as founder and chief executive from ${BCG.founded} to ${BCG.ceoUntil}. Revenue per employee comes to about ${K.usd(perHead)} by our division.` },
    { q: 'Is the BCG MBA salary the same outside the United States?', a: `No. Offices abroad pay in local currency. The non-American schools that name BCG and publish a consulting figure include ${naming.filter((s) => s.country !== 'US' && cons(s)?.salary).slice(0, 2).map((s) => `${s.short} at ${K.money(cons(s)!.salary!, cons(s)!.cur)}`).join(' and ')}, below the American medians once converted. Those figures cover all consulting hires at each school, so they describe the local market more than BCG's own scale abroad.` },
  ],
  body: (h) => `<h2>BCG leads the hiring counts</h2>
<p>Few schools publish how many graduates joined each employer, but those that do tell a consistent story. Among them, BCG has the most hires, or shares the first place, at ${leads.length} of ${counted.length}. The table gives the three large strategy firms side by side for each school that counts, with the consulting median that school reports.</p>
${h.table(['School', 'BCG', 'McKinsey', 'Bain', 'First employer listed', 'Consulting median'], counted.map((x) => [h.sc(x.s.slug), K.num(x.bcg), x.mck ? K.num(x.mck) : 'not counted', x.bain ? K.num(x.bain) : 'not counted', x.top.name, cons(x.s)?.salary ? K.money(cons(x.s)!.salary!, cons(x.s)!.cur) : 'not published']), 'Hires by firm in the last class, as each school reports them; consulting median for all consulting hires.', ['l', 'r', 'r', 'r', 'l', 'r'])}
<p>Summed across those schools, BCG accounts for ${sum('bcg')} hires, McKinsey ${sum('mck')} and Bain ${sum('bain')}. At ${first.s.short}, BCG hires are about ${first.s.classSize ? K.p(Math.round((first.bcg / first.s.classSize) * 1000) / 10) : 'a large part'} of the class. The schools are large American programs, so the result describes BCG's recruiting in the United States; outside it, ${naming.filter((s) => s.country !== 'US').length} schools name BCG without numbers. The full count across all firms is on ${h.a('consulting-consulting-firms', 'consulting firms that hire MBAs')}.</p>
<p>Two cautions apply. A school's count covers graduates who accepted an offer and reported it, so a firm hiring sponsored students back from leave, or graduates who answered late, may be undercounted. And a count for one class can move by a few hires from one year to the next, enough to swap the first and second firm at a given school. The pattern across schools is more solid than any single ranking within one of them.</p>
${h.miniTwo(counted[0].s.slug, counted[1].s.slug)}
<h2>From hires to a salary proxy</h2>
<p>A school whose consulting hires are dominated by one or two large firms reports their base offer as its median, because most of its consulting graduates received it. The schools in the table report consulting medians between ${K.money(meds[0], 'USD')} and ${K.money(meds[meds.length - 1], 'USD')}, and most give the top figure. That is the strongest public evidence of BCG's American base offer to MBA graduates, but it remains a median of all consulting hires at a school, not a figure published by the firm. We found no government source that could replace it: the Department of Labor's visa wage files, which sometimes show a firm's declared wage, could not be downloaded when we wrote.</p>
<p>Base salary is one part of pay. Signing bonuses and the yearly performance bonus are not in the consulting lines of the reports. The national ${h.a('consulting-consultant-salary', 'consultant salary')} figures from the BLS show the other end of the scale: a median of ${K.usd(K.P.bls.occupations['131111'].median)} for all management analysts in ${K.P.bls.period}.</p>
<h2>The firm in its own figures</h2>
<p>BCG's overview page states ${K.num(BCG.people)} employees and ${K.usd(BCG.revenue / 1e9, 1)} billion of annual revenue, with offices in more than ${BCG.cities} cities in over ${BCG.countries} countries. Its history page names Bruce Henderson as founder and chief executive from ${BCG.founded} to ${BCG.ceoUntil} and dates the growth share matrix, the firm's best-known idea, to ${BCG.matrix}. Dividing revenue by people gives about ${K.usd(perHead)} per employee, all staff included. That ratio is what pays the base, the bonuses and the offices, and it is why the large strategy firms can offer an MBA hire a base ${K.num(ratio, 1)} times the national median of the profession.</p>
<h2>Paying for the route: one school as an example</h2>
<p>The calculator at the top of this page is set on ${K.s('tuck').short}, one of the schools that name BCG and send ${K.share('tuck', 'consulting')} of the class into consulting, at a consulting median of ${K.segSalary('tuck', 'consulting')}. For a person earning ${K.ref()} before the degree, the total cost with the salary given up is ${tuckRoi ? K.usd(tuckRoi.total) : 'not computable'}, and the payback on the consulting salary ${tuckRoi?.payback ? K.yrs(tuckRoi.payback) : 'cannot be computed'} after graduation, on the assumptions of our model. Change the school or the salary to test your own case; the ${h.a('best-mba-consulting', 'consulting ranking')} does it for every school at once, and ${h.a('consulting-mbb', 'MBB')} compares BCG with its two peers.</p>`,
  tool: 'roi',
  toolArgs: { school: 'tuck', goal: 'consulting' },
  related: ['consulting-mbb', 'consulting-mckinsey-salary', 'consulting-bain-salary', 'school:tuck', 'consulting-consulting-firms'],
  sources: ['bls_oews', 'mbacsea'],
  schoolSources: [...counted.map((x) => x.s.slug), 'tuck'],
  extSources: [
    { label: 'Boston Consulting Group, About BCG (overview)', url: 'https://www.bcg.com/about/overview' },
    { label: 'Boston Consulting Group, Our history', url: 'https://www.bcg.com/about/overview/our-history' },
  ],
});
