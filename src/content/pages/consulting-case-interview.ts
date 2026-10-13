import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

// Worked profit case. Every number below is an ASSUMPTION of the exercise, written for this page.
const Y1 = { cups: 2_000_000, price: 4.0, varCost: 1.5, fixed: 3_500_000 };
const Y2 = { cups: 2_000_000, price: 4.0, varCost: 1.9, fixed: 3_600_000 };
const P = (y: typeof Y1) => ({ rev: y.cups * y.price, vc: y.cups * y.varCost, fc: y.fixed, profit: y.cups * (y.price - y.varCost) - y.fixed });
const p1 = P(Y1);
const p2 = P(Y2);
const drop = p1.profit - p2.profit;
const dVar = p2.vc - p1.vc;
const dFix = p2.fc - p1.fc;
// Option tested: a price rise, with an assumed loss of volume.
const rise = 0.5;
const volLoss = 0.05;
const opt = P({ ...Y2, price: Y2.price + rise, cups: Y2.cups * (1 - volLoss) });
const beVol = Y2.fixed + p1.profit; // profit target: back to last year
const cupsNeeded = beVol / (Y2.price + rise - Y2.varCost);
const maxLoss = 1 - cupsNeeded / Y2.cups;
const m = (v: number) => K.usd(v, 2);
const lossPct = K.p(Math.round(maxLoss * 1000) / 10);
const recovered = (opt.profit - p2.profit) / drop;
const mm = (v: number) => `${K.usd(v / 1e6, 2)} million`;
const top = K.top('consulting', 3);
// Bain & Company, Interviewing page, read on 2026-10-13: the consulting process "typically consists of different
// steps – a digital assessment and then case interview(s)"; a written assignment where "You'll likely have three days".
const BAIN_WRITTEN_DAYS = 3;

export default definePage({
  id: 'consulting-case-interview',
  group: 'consulting',
  order: 11,
  slug: 'consulting/case-interview',
  nav: 'Case interview',
  card: 'The consulting case interview: format, the five common case types and a profit case solved step by step.',
  title: 'Case Interview 2026: Format, Five Case Types, Profit Case',
  description: `Case interview guide for 2026: how the consulting case works, the five case types and a profit case solved step by step, with every assumption stated.`,
  h1: 'The case interview: how it works, with a profit case solved',
  intro: 'A case interview gives you a business problem and part of an interview slot to structure it, run the numbers and recommend.',
  resume: `A case interview is the consulting firms' main selection test: an interviewer describes a client's problem, and the candidate structures it, asks for data, does the arithmetic aloud and ends with a recommendation. It tests how you think, not what you know about an industry. Five types cover most cases: profitability (why profits fell), market entry (should we enter), market sizing (how big is it), mergers and acquisitions (should we buy), and pricing or growth. Bain describes its consulting process as a digital assessment followed by case interviews, and some firms add a written case; Bain says its take-home version gives about ${BAIN_WRITTEN_DAYS} days. This page solves a profit case with stated assumptions: a coffee chain whose profit fell from ${mm(p1.profit)} to ${mm(p2.profit)}, where higher variable costs explain ${K.p(Math.round((dVar / drop) * 100))} of the fall, and a price rise of ${m(rise)} a cup wins back ${K.p(Math.round(recovered * 100))} of the lost profit if volume falls by ${K.p(volLoss * 100)}, all of it only if volume falls by less than ${lossPct}.`,
  faqs: [
    { q: 'How long does a consulting case interview last?', a: 'Usually a single interview slot shared between a short conversation about your experience and the case itself, which takes the larger part. Firms rarely publish exact timings, and they vary by office and round. Plan for a case you can structure quickly, analyze in the middle and close with a short recommendation, whatever the length of the slot.' },
    { q: 'What are the five most common types of case interview?', a: 'Profitability, market entry, market sizing, mergers and acquisitions, and pricing or growth. Profitability cases ask why profit fell and are solved with revenue and cost trees. Market entry and acquisition cases ask for a yes or no backed by market, competition and economics. Sizing cases test estimation. Pricing cases weigh value to the customer against cost and competitors.' },
    { q: 'Is the case interview candidate-led or interviewer-led?', a: 'Both formats exist. In a candidate-led case, you drive: you propose the structure, ask for the data you want and decide where to dig. In an interviewer-led case, the interviewer asks a sequence of set questions, often a structure, a chart to read, a calculation and a recommendation. Practice both, because the skills are the same and only the rhythm changes.' },
    { q: 'How do you solve a profitability case interview?', a: `Split profit into revenue and costs, then revenue into volume and price, costs into fixed and variable. Compare each piece across years to find what moved. In the example on this page, variable cost per cup rose from ${m(Y1.varCost)} to ${m(Y2.varCost)}, which explains ${mm(dVar)} of a ${mm(drop)} fall. Then test remedies with numbers and recommend one.` },
    { q: 'How many practice cases do you need before a consulting interview?', a: 'No official figure exists and the firms do not publish one. What matters is coverage and feedback: practice each of the five case types several times with a partner who can push back, time your structure, and do the arithmetic aloud without a calculator. Track the mistakes you repeat; the last weeks should go to those.' },
  ],
  body: (h) => `<h2>The format</h2>
<p>A case interview starts with a short prompt: a client, a problem, sometimes a figure. "Our client is a regional coffee chain whose profit has fallen sharply this year. What is going on and what should it do?" The candidate asks a few clarifying questions, takes a moment to lay out a structure, then works through it with the interviewer, who hands over data when asked: a table, a chart, a cost breakdown. The case ends with a recommendation stated first, followed by the reasons and the risks.</p>
<p>Firms present the process in their own terms. Bain's interviewing page says its consulting process "typically consists of different steps", a digital assessment and then case interviews, and describes a written assignment where candidates are likely to have ${BAIN_WRITTEN_DAYS} days, sometimes followed by a presentation of the result. Other firms use online tests, written cases or group cases at some stages. The common core is the live case with an interviewer, combined with questions about your past experience.</p>
<h2>What the interviewer is scoring</h2>
<p>Four things, more or less explicitly. Structure: can you break the problem into parts that do not overlap and together cover it. Numbers: can you compute quickly and correctly aloud, and say what a figure means. Judgment: do you dig where the answer is likely, and do you notice when a result is implausible. Communication: do you lead with the answer and keep the interviewer with you. Industry knowledge counts for little; an MBA student from engineering or medicine starts on equal terms with a former analyst.</p>
<h2>The five case types</h2>
<p><strong>Profitability.</strong> Profit fell or is too low; find out why and fix it. The tool is the profit tree: revenue as volume times price, costs as fixed plus variable. It is the most common type and the base of the others.</p>
<p><strong>Market entry.</strong> Should the client enter a country, a segment or a product line? Look at the market (size, growth, profitability), the competition, the client's ability to win and the economics of entry.</p>
<p><strong>Market sizing.</strong> How big is a market? Built from a population, a share that buys, a frequency and a price, each stated as an assumption. The ${h.a('consulting-market-sizing', 'market sizing page')} works two in full.</p>
<p><strong>Mergers and acquisitions.</strong> Should the client buy a company? Judge the target's market and performance, the fit with the client, the synergies and the price.</p>
<p><strong>Pricing and growth.</strong> What should a product cost, or how can the client grow? Weigh value to the customer, cost and competitors' prices; for growth, list the levers and size each one.</p>
${h.mini('breakeven')}
<h2>A profit case solved step by step</h2>
<p>The figures below are assumptions of this exercise, written for this page, not data about a real company. The client is a coffee chain. Last year it sold ${K.num(Y1.cups)} cups at ${m(Y1.price)} with a variable cost of ${m(Y1.varCost)} a cup and fixed costs of ${mm(Y1.fixed)}. This year it sold the same number of cups at the same price, but profit fell.</p>
<p><strong>Step 1: structure.</strong> Profit equals volume times the margin per cup, minus fixed costs. Ask for each piece in both years.</p>
<p><strong>Step 2: compute last year.</strong> Revenue is ${K.num(Y1.cups)} times ${m(Y1.price)}, ${mm(p1.rev)}. Variable costs are ${mm(p1.vc)}, fixed costs ${mm(p1.fc)}, so profit was ${mm(p1.profit)}.</p>
<p><strong>Step 3: compute this year.</strong> Revenue is unchanged at ${mm(p2.rev)}. The variable cost per cup rose to ${m(Y2.varCost)}, so variable costs are ${mm(p2.vc)}; fixed costs rose to ${mm(p2.fc)}. Profit is ${mm(p2.profit)}, down ${mm(drop)}.</p>
<p><strong>Step 4: find the cause.</strong> Of the ${mm(drop)} fall, ${mm(dVar)} comes from variable costs and ${mm(dFix)} from fixed costs: variable costs explain ${K.p(Math.round((dVar / drop) * 100))}. The next question is which input drove the cost per cup up, beans, milk or cups, and whether the rise is temporary.</p>
<p><strong>Step 5: test a remedy.</strong> Suppose the chain raises its price by ${m(rise)} and loses ${K.p(volLoss * 100)} of its volume, a second assumption. Profit becomes ${mm(opt.profit)}, which wins back ${K.p(Math.round(recovered * 100))} of the fall. To earn last year's full ${mm(p1.profit)}, the chain needs ${K.num(Math.round(cupsNeeded))} cups at the new price, so the price rise alone restores the old profit only if volume falls by less than ${lossPct}.</p>
<p><strong>Step 6: recommend.</strong> "Profit fell by ${mm(drop)} mainly because each cup costs ${m(Y2.varCost - Y1.varCost)} more to make. I recommend a ${m(rise)} price rise, which wins back about ${K.p(Math.round(recovered * 100))} of the loss if we lose ${K.p(volLoss * 100)} of volume, together with a review of bean and milk contracts to close the rest. The risk is a competitor holding its price; I would test the rise in a few shops first."</p>
<p>The calculator at the top of the page runs the same tree with any numbers you type. More cases with different shapes are on ${h.a('consulting-case-interview-examples', 'case interview examples')}.</p>
<h2>Where the case sits in MBA recruiting</h2>
<p>For MBA students, case interviews arrive early in the first year, after the firms' autumn presentations, so most practice happens in the first months of the program. Schools with large consulting classes run case clubs and peer practice: ${K.listOf(top.map((x) => h.sc(x.slug)))}, the first three of our ${h.a('best-mba-consulting', 'consulting ranking')}, each place at least ${K.p(Math.min(...top.map((x) => x.share)))} of the class in consulting, ${K.p(top[0].share)} at ${top[0].short}. The ${h.a('consulting', 'consulting rubric')} gives the full recruiting calendar.</p>`,
  tool: 'case',
  toolArgs: { mode: 'profit' },
  related: ['consulting-case-interview-examples', 'consulting-market-sizing', 'consulting-how-to-become-a-consultant', 'consulting', 'best-mba-consulting'],
  sources: ['mbacsea'],
  schoolSources: top.map((x) => x.slug),
  extSources: [{ label: 'Bain & Company, Interviewing (hiring process)', url: 'https://www.bain.com/careers/hiring-process/interviewing/' }],
});
