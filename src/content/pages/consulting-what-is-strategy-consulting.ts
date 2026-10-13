import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

// Schools that split their consulting and strategy hires into several job lines, with a salary for each.
const lineRe = /consult|strateg/i;
const splitters = K.schools
  .map((s) => ({ s, rows: s.emp.functions.filter((r) => lineRe.test(r.label) && r.salary && r.pct) }))
  .filter((x) => x.rows.length >= 2);
const fn = (slug: string, re: RegExp) => K.s(slug).emp.functions.find((r) => re.test(r.label))!;
const rossMgmt = fn('michigan-ross', /Management/);
const rossTech = fn('michigan-ross', /Technology/);
const sternMgmt = fn('nyu-stern', /Consulting - Management/);
const sternStrat = fn('nyu-stern', /Consulting - Strategy/);
const gtwnGen = fn('georgetown-mcdonough', /General\/Strategy/);
const gtwnTech = fn('georgetown-mcdonough', /Technology/);
const yaleInt = fn('yale-som', /Internal/);
const yaleExt = fn('yale-som', /External/);
const kelStrat = fn('kellogg', /Corporate Strategy/);
const M = (r: { salary: number | null; cur: string }) => K.money(r.salary!, r.cur);
// BCG history page, read on 2026-10-13: "created in 1968" (growth share matrix).
const BCG_MATRIX = 1968;

export default definePage({
  id: 'consulting-what-is-strategy-consulting',
  group: 'consulting',
  order: 2,
  slug: 'consulting/what-is-strategy-consulting',
  nav: 'What strategy consulting is',
  card: 'Strategy consulting defined: the questions clients bring, who buys it and how it differs from operations or IT work.',
  title: 'Strategy Consulting 2026: Definition, Clients and Pay Gap',
  description: `Strategy consulting in 2026: the questions clients bring, who buys it, how it differs from IT and operations work, and the ${M(rossMgmt)} versus ${M(rossTech)} pay gap.`,
  h1: 'What strategy consulting is, and what it is not',
  intro: `Strategy consulting answers the questions of a chief executive; at ${K.s('michigan-ross').short}, graduates hired into management consulting reported ${M(rossMgmt)}, those in technology consulting ${M(rossTech)}.`,
  resume: `Strategy consulting is advice sold to the top of an organization on decisions that set its direction: which markets to enter or leave, whether to buy a company, how to price, where to cut costs, how to answer a new competitor. A small team works on one question for a few weeks or months and ends with a recommendation the board can act on. It is the narrow, senior end of management consulting; operations, technology and implementation consulting are larger trades that execute and run what strategy decides. The difference shows in pay. ${K.s('michigan-ross').short} reports a median of ${M(rossMgmt)} for its ${K.p(rossMgmt.pct!)} of graduates hired in management consulting and ${M(rossTech)} for technology consulting; ${K.s('georgetown-mcdonough').short} reports ${M(gtwnGen)} for general and strategy consulting and ${M(gtwnTech)} for technology, marketing and human capital consulting. The buyers are large companies, private equity funds checking a target, and governments.`,
  faqs: [
    { q: 'What kind of questions does a strategy consulting firm answer?', a: 'Questions with a decision at the end: should we enter this country, should we buy this competitor, why are margins falling, what price should the new product carry, which plants should close. Each one is turned into a hypothesis that the team proves or disproves with data in a few weeks. A question that only needs execution, such as installing a system, goes to another kind of firm.' },
    { q: 'How is strategy consulting different from operations consulting?', a: `Strategy decides what to do, operations work improves how it is done: procurement, supply chains, plants, service centers. Operations projects last longer, involve more people on site and are measured in costs saved. Many large firms do both. In the school reports the line is visible only where a school splits its consulting hires, as ${K.s('michigan-ross').short} and ${K.s('nyu-stern').short} do.` },
    { q: 'Is internal strategy at a company the same as strategy consulting?', a: `The work is similar and the employer is different. An internal strategy team serves one company and keeps working on what it decides. ${K.s('yale-som').short} separates the two: ${K.p(yaleExt.pct!)} of its graduates went into external consulting at ${M(yaleExt)}, ${K.p(yaleInt.pct!)} into internal consulting and strategy at ${M(yaleInt)}. Internal roles usually involve less travel.` },
    { q: 'Who pays for strategy consulting projects?', a: 'Mostly large companies, through the chief executive, the strategy department or a business unit head. Private equity funds buy short projects to test a company before buying it, called commercial due diligence. Governments and public bodies buy advice on reforms and programs. Small companies rarely buy strategy work from the large firms, whose fees are set for big budgets.' },
    { q: 'Why do schools report a lower salary for technology consulting than for strategy consulting?', a: `The employers differ. Graduates in management and strategy lines mostly join the large strategy firms, which pay one high base offer; technology consulting hires often join IT services firms or the technology arms of audit networks, which pay less. At ${K.s('georgetown-mcdonough').short} the gap was ${M(gtwnGen)} against ${M(gtwnTech)} in the last report.` },
  ],
  body: (h) => `<h2>A definition in one decision</h2>
<p>A strategy consulting project starts with a decision someone at the top has to make and ends with a recommendation on it. A food company wants to know whether to launch its brands in Indonesia. A fund is about to buy a chain of clinics and wants to know whether the market will keep growing. A bank's margins keep falling and the board wants to know why. The firm sends a small team, often a partner, a manager and a few consultants, who turn the question into a set of hypotheses and test each one with data, interviews and analysis. The output is a short document and a meeting where the client decides.</p>
<p>That focus on a decision is what separates strategy from the rest of consulting. Work that installs a system, redesigns a warehouse or trains a sales force is also consulting, and it can be very well paid, but its result is a change carried out, not a choice made. Its buyer sits at the top: the chief executive, the head of strategy, a business unit head or the board.</p>
<h2>Questions clients bring</h2>
<p>Most strategy projects fall into a handful of families. Growth questions ask where the next revenue comes from: a new country, a new customer segment, an adjacent product. Deal questions ask whether to buy, sell or merge, and at what value; private equity funds buy a short version called commercial due diligence before they bid. Profit questions ask why margins fall and what to do about it. Pricing questions ask what a product should cost and how competitors will react. Organization questions ask how to structure a company after a merger or a change of chief executive. Each family has its own type of ${h.a('consulting-case-interview', 'case interview')}, because firms test candidates on the work they sell.</p>
<p>Many of the tools of the trade were born in these projects. Boston Consulting Group's history page says its growth share matrix, the grid that sorts a company's businesses by market growth and market share, was created in ${BCG_MATRIX}; it is still taught in business schools. Today's projects lean more on data from the client's systems and less on frameworks, but the shape of the answer has not changed: a recommendation, the numbers behind it and what happens if the client does nothing.</p>
<h2>Strategy, operations, technology, implementation</h2>
<p>Operations consulting improves how a company works: buying, making, moving and serving. Projects last longer, put more people on the client's site and are judged on costs saved. Technology or IT consulting designs and installs systems, from accounting software to data platforms, and is the largest part of the market by people employed. Implementation consulting stays after the recommendation to carry it out, which is why many strategy firms now sell it too. Human capital and marketing consulting cover people and customers. The large strategy firms do some of all of these; audit networks and IT services firms do far more of the last three.</p>
<p>The school reports show what the split means for pay. Where a school breaks its consulting hires into lines, the strategy and management lines sit at the top. ${h.sc('michigan-ross')} reports ${M(rossMgmt)} for the ${K.p(rossMgmt.pct!)} of graduates in management consulting and ${M(rossTech)} for the ${K.p(rossTech.pct!)} in technology consulting. ${h.sc('nyu-stern')} reports ${M(sternMgmt)} for management consulting and ${M(sternStrat)} for a separate strategy line, a reminder that labels differ between schools. Internal strategy roles at companies, which ${h.sc('kellogg')} reports at ${M(kelStrat)} for ${K.p(kelStrat.pct!)} of its class, pay less than the large firms and involve less travel.</p>
${h.table(['School', 'Job line, as the school labels it', 'Share of class', 'Median'], splitters.flatMap((x) => x.rows.map((r) => [h.sc(x.s.slug), r.label, K.p(r.pct!), M(r)])), 'Consulting and strategy job lines at the schools that report several, each with its own salary, in the school currency.', ['l', 'l', 'r', 'r'])}
${h.miniTwo('michigan-ross', 'nyu-stern')}
<h2>Who buys it, and why it costs so much</h2>
<p>A strategy project is priced by the team's weeks, and the team is senior. The fee reflects the partner's time, the firm's data from other clients in the same industry and the speed: a question that would take an internal team many months is answered in a few weeks. Large companies buy it when a decision is big enough that a better answer pays for the fee many times. Funds buy it when they are about to commit a large sum to a deal. Governments buy it for reforms where they want an outside view. The calculator on this page turns a team size, a length and a weekly fee you choose into the cost of an engagement, so you can see why buyers are few and large.</p>
<p>For an MBA applicant, the practical point is that "consulting" on a school's report mixes these trades. A school with a high consulting share may send most of it to strategy firms or to technology and implementation work, and the salary line tells you which. The ${h.a('consulting', 'consulting rubric')} ranks schools on the consulting share and salary together, and ${h.a('consulting-what-do-consultants-do', 'what consultants do')} shows a strategy project from the inside.</p>`,
  tool: 'project',
  toolArgs: {},
  related: ['consulting', 'consulting-what-do-consultants-do', 'consulting-mbb', 'consulting-case-interview', 'school:michigan-ross'],
  sources: ['mbacsea', 'bls_ooh_ma'],
  schoolSources: ['michigan-ross', 'nyu-stern', 'georgetown-mcdonough', 'yale-som', 'kellogg'],
  extSources: [{ label: 'Boston Consulting Group, Our history', url: 'https://www.bcg.com/about/overview/our-history' }],
});
