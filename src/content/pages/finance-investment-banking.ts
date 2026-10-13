import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const R = K.ranking('ib');
const bySize = [...R.ranked].sort((a, b) => b.share - a.share);
const big = bySize.slice(0, 5);
const first = R.ranked[0];
const seg = (slug: string) => K.s(slug).emp.segments.find((x) => x.key === 'ib')!;
const ibMed = seg('nyu-stern').salary!;
const sa = K.P.bls.occupations['413031'];
const banks = /JPMorgan|J\.P\. Morgan|JP Morgan|Goldman|Bank of America|Citi|Evercore|Jefferies|Barclays/i;
const bankHires = (slug: string) => K.s(slug).emp.employers.filter((e) => banks.test(e.name) && e.hires !== null);
const cb = bankHires('columbia');
const nb = bankHires('nyu-stern');
const fnIb = (slug: string) => K.s(slug).emp.functions.find((f) => f.key === 'ib')!;
const wb = K.s('wharton').emp.bonus!;
const nyb = K.s('nyu-stern').emp.bonus!;

export default definePage({
  id: 'finance-investment-banking',
  group: 'finance',
  order: 2,
  slug: 'finance/investment-banking',
  nav: 'Investment banking after an MBA',
  card: 'The associate job, the base pay banks set for MBA hires, and the schools that send the largest share of their class to banks.',
  title: 'Investment Banking After an MBA 2026: Associate Pay, Schools',
  description: `Investment banking after an MBA in 2026: associate role, the ${K.money(ibMed, 'USD')} median base most schools report, signing bonuses and the classes sending most to banks.`,
  h1: 'Investment banking after an MBA: the associate seat',
  intro: `${K.s(big[0].slug).short} sends ${K.p(big[0].share)} of its class to investment banks, and nearly every American school reports the same ${K.money(ibMed, 'USD')} median base for them.`,
  resume: `An MBA graduate joins an investment bank as an associate, the rung above the analysts hired from college, and works in a deal team on mergers, acquisitions and capital raising. The base salary is set by the banks for the whole associate class: ${K.s('nyu-stern').short}, Columbia, Wharton, Booth, Yale and Tuck all report the same ${K.money(ibMed, 'USD')} median for investment banking in the class of 2025. What differs is the number of seats. ${big.slice(0, 3).map((r) => `${r.short} placed ${K.p(r.share)} of its class in banks`).join(', ')}, against ${K.share('stanford', 'ib')} at Stanford. A signing bonus comes on top, which reports give for the whole class only (Wharton ${K.money(wb.v, 'USD')} median, for ${K.p(wb.pct!)} of graduates), and the year-end bonus that makes up a large part of banking pay appears in no report. For a person earning ${K.ref()} before the degree, the payback at the large banking schools runs from ${K.yrs(Math.min(...big.filter((r) => r.payback !== null).map((r) => r.payback!)))} to ${K.yrs(Math.max(...big.filter((r) => r.payback !== null).map((r) => r.payback!)))} after graduation.`,
  faqs: [
    { q: 'What does an investment banking associate do after an MBA?', a: 'The associate runs the daily work of a deal team: the financial model, the pitch book, the due diligence lists and the coordination with lawyers and the client. Analysts hired from college do much of the spreadsheet work under the associate, and vice presidents and managing directors handle the client relationship. The job is project work on several deals at once, with long and unpredictable weeks.' },
    { q: 'Is the investment banking associate salary the same at every MBA school?', a: `In the reports we read, almost. ${K.s('nyu-stern').short}, Columbia, Wharton, Booth, UCLA and Yale all give ${K.money(ibMed, 'USD')} as the median base for banking hires, because banks pay one rate for the whole associate class. The school changes the number of offers and the city, not the base. Bonuses and later promotions are where pay separates.` },
    { q: 'Which MBA programs send the most graduates into investment banking?', a: `By share of the class, ${big.slice(0, 4).map((r) => `${r.short} (${K.p(r.share)})`).join(', ')} lead among the schools that publish a banking line. In numbers of people, a large class matters: Columbia's report lists ${cb.slice(0, 2).map((e) => `${e.name} with ${e.hires} hires`).join(' and ')}.` },
    { q: 'How does the BLS wage for financial sales agents compare with MBA banking pay?', a: `The BLS line for securities, commodities and financial services sales agents had a median wage of ${K.usd(sa.median)} in ${K.P.bls.period}, with a quarter of workers above ${K.usd(sa.p75)}. It covers brokers and advisers at every level and firm size, so it sits well below the ${K.money(ibMed, 'USD')} base that MBA associates report. Read it as a floor for the wider occupation.` },
    { q: 'Do investment banking employment reports include the year-end bonus?', a: `No. MBA reports give the base salary and the signing bonus, usually for the whole class rather than for banking alone: ${K.s('nyu-stern').short} reports a ${K.money(nyb.v, 'USD')} median signing bonus. The performance bonus paid after the first year is not known at graduation, so no school can report it. Total pay in banking is therefore higher than every figure shown here.` },
  ],
  body: (h) => `<h2>The seat between analysts and vice presidents</h2>
<p>A bank's deal team is a small pyramid. Analysts, hired straight from college, build the spreadsheets and the slides. The associate, the seat an MBA graduate takes, checks that work, drafts the parts of the pitch that require judgment and keeps the transaction moving between the client, the lawyers and the other banks. Vice presidents and managing directors win the mandate and speak for the bank. The associate is usually on several live deals at once, in a coverage group (an industry such as healthcare or technology) or a product group (mergers and acquisitions, leveraged finance, equity capital markets), and the weeks follow the deals rather than the calendar.</p>
<p>That workload is the main trade of the job. The reports measure what graduates are paid, not how many hours they work, and no school publishes a figure for hours. What they do show is the size of the intake, and banking hires more MBA graduates than any other part of finance.</p>
${h.rankTable('ib', 10)}
<p>Our ranking for investment banking puts ${first.short} first${first.fallback ? `, with ${K.p(first.share)} of its class in banking and a school-wide salary standing in for a banking one it does not publish, which lifts its ten-year value` : ''}. Since the base is the same almost everywhere, the order is decided mostly by the share placed and by the cost of the program. Sort the table in the ${h.a('best-mba-investment-banking', 'banking ranking')} on share alone and ${K.s(big[0].slug).short} comes first with ${K.p(big[0].share)}.</p>
<h2>Base salary: one rate for the whole associate class</h2>
<p>Read across the reports, the median base for banking is a single number: ${K.money(ibMed, 'USD')} at ${K.listOf(R.ranked.filter((r) => K.s(r.slug).emp.segments.find((x) => x.key === 'ib')?.salary === ibMed).slice(0, 7).map((r) => r.short))}. Banks set the first-year associate salary for everyone hired that year, so the school does not change it. This is a median of base pay only. It leaves out the signing bonus, which the reports give for the whole class, and the year-end bonus, which nobody knows at graduation.</p>
<p>The signing bonus is reported school-wide: Wharton's median is ${K.money(wb.v, 'USD')} for the ${K.p(wb.pct!)} of the class who received one, ${K.s('nyu-stern').short}'s ${K.money(nyb.v, 'USD')}. The calculators add it in the first year, weighted by the share who received one. Try a banking bonus of your own in the mini-calculator below: it changes the first year a lot and the payback a little.</p>
${h.mini('bonus')}
<h2>Where the associates come from</h2>
<p>New York schools place the largest shares. ${K.s('nyu-stern').short} sends ${K.share('nyu-stern', 'ib')} of its class to banks and lists ${nb.slice(0, 3).map((e) => `${e.name} (${e.hires})`).join(', ')} among its main employers; Columbia sends ${K.share('columbia', 'ib')}, with ${cb.slice(0, 4).map((e) => `${e.name} (${e.hires})`).join(', ')}. Outside New York, Yale (${K.share('yale-som', 'ib')}), UCLA (${K.share('ucla-anderson', 'ib')}) and Tuck (${K.share('tuck', 'ib')}) place more than a tenth of their class in banking. The two most famous schools are not banking schools by share: Harvard puts ${K.share('harvard', 'ib')} of its class there and Stanford ${K.share('stanford', 'ib')}, because their graduates in finance lean toward funds.</p>
<p>Schools also count banking twice in some reports, once in the industry table and once in the job function table, and the two lines differ. Columbia's function line for investment banking is ${K.p(fnIb('columbia').pct!)} against ${K.share('columbia', 'ib')} in the industry segment, and ${K.s('nyu-stern').short}'s ${K.p(fnIb('nyu-stern').pct!)} against ${K.share('nyu-stern', 'ib')}. The function counts what people do, the industry who employs them: a banker hired by a bank's internal strategy team is in one and not the other. We rank on the industry segment and show both on the school pages.</p>
${h.miniTwo('nyu-stern', 'columbia')}
<h2>The wider occupation, measured by the BLS</h2>
<p>The U.S. Bureau of Labor Statistics has no line for investment bankers alone. The nearest occupation, securities, commodities and financial services sales agents, counted ${K.num(sa.employment)} jobs in ${K.P.bls.period}, with a median wage of ${K.usd(sa.median)}, a bottom quarter under ${K.usd(sa.p25)} and a top quarter above ${K.usd(sa.p75)}. It mixes brokers, advisers and bankers of every level and firm size, so it sits far below the MBA associate base. It is the right reference for a different question: what this kind of work pays outside the bulge-bracket and elite boutique banks that recruit on MBA campuses. Use the calculator at the top to place a salary of your own in that distribution.</p>
<h2>Is the degree needed to become an associate?</h2>
<p>Not always: banks promote their own analysts to associate after a few years, and some hire experienced professionals directly. The MBA is the usual entry for people coming from another field, through the paid summer internship between the two years of an American program. For a person already in banking, the gain is smaller, because the salary given up is high and the post-MBA base is fixed. The ${h.a('finance', 'finance overview')} compares banking with the buy side, and the ${h.a('mba-payback-calculator', 'payback calculator')} shows how a loan changes the result.</p>
${h.miniPosition('413031')}`,
  tool: 'bls',
  toolArgs: { mode: '413031' },
  related: ['finance', 'best-mba-investment-banking', 'finance-private-equity', 'mba-payback-calculator', 'school:nyu-stern', 'school:wharton'],
  sources: ['bls_oews', 'bls_api', 'mbacsea'],
  schoolSources: ['nyu-stern', 'columbia', 'wharton', 'yale-som', 'ucla-anderson', 'tuck'],
});
