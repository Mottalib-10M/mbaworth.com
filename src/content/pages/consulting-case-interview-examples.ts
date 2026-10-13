import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

// Three cases written for this page. EVERY number below is an assumption of the exercise, not data.
// Case 1, break-even: a fitness club opening.
const G = { fixed: 900_000, fee: 50, varYear: 120, capacity: 3_000 };
const gAnnual = G.fee * 12;
const gMargin = gAnnual - G.varYear;
const gBreak = G.fixed / gMargin;
const gSafety = 1 - gBreak / G.capacity;
const gFull = G.capacity * gMargin - G.fixed;
// Case 2, market entry: electric scooter rental in one city.
const E = { adults: 1_500_000, users: 0.04, rides: 6, price: 3.5, share: 0.25, costRide: 2.2, fleetCost: 2_000_000 };
const eMarket = E.adults * E.users * E.rides * 12 * E.price;
const eRides = E.adults * E.users * E.rides * 12 * E.share;
const eRev = eMarket * E.share;
const eProfit = eRides * (E.price - E.costRide);
const ePayback = E.fleetCost / eProfit;
// Case 3, acquisition: a bakery chain.
const A = { price: 30_000_000, profit: 2_500_000, synergy: 1_000_000, rate: 0.1, growth: 0 };
const aTotal = A.profit + A.synergy;
const aValueAlone = A.profit / A.rate;
const aValueSyn = aTotal / A.rate;
const aPayback = A.price / aTotal;
const m = (v: number) => K.usd(v);
const mm = (v: number) => `${K.usd(v / 1e6, 1)} million`;
const pct = (v: number) => K.p(Math.round(v * 1000) / 10);
const share = K.top('consulting', 1)[0];

export default definePage({
  id: 'consulting-case-interview-examples',
  group: 'consulting',
  order: 12,
  slug: 'consulting/case-interview-examples',
  nav: 'Case interview examples',
  card: 'Three consulting cases written for this site, a break-even, a market entry and an acquisition, each solved with stated numbers.',
  title: 'Case Interview Examples 2026: Three Cases Solved in Full',
  description: `Case interview examples for 2026: a break-even at ${K.num(Math.ceil(gBreak))} members, a market entry paid back in ${K.num(ePayback, 1)} years and a ${mm(A.price)} acquisition, all solved step by step.`,
  h1: 'Case interview examples, solved with every number shown',
  intro: 'Three practice cases written for this site, each with its assumptions stated, its arithmetic shown and a recommendation at the end.',
  resume: `These three case interview examples cover the shapes that come back most often after the profit case: a break-even, a market entry and an acquisition. Every figure is an assumption of the exercise, the kind an interviewer hands you, and is stated as such. A fitness club with ${mm(G.fixed)} of fixed costs and a ${m(G.fee)} monthly fee breaks even at ${K.num(Math.ceil(gBreak))} members, ${pct(gSafety)} below its capacity of ${K.num(G.capacity)}. An electric scooter service entering a city of ${K.num(E.adults)} adults faces a market of ${mm(eMarket)} a year; with a quarter of it, the fleet of ${mm(E.fleetCost)} is paid back in ${K.num(ePayback, 1)} years. A bakery chain priced at ${mm(A.price)} is worth ${mm(aValueAlone)} on its own profit and ${mm(aValueSyn)} with the synergies, so the deal makes sense only if the synergies are real. Each case ends with the sentence a candidate would say to close it. The calculator on this page runs the break-even with your own numbers.`,
  faqs: [
    { q: 'How do you solve a break-even case in a consulting interview?', a: `Find the margin each unit brings, price minus variable cost, then divide fixed costs by it. In the fitness club example, a ${m(G.fee)} monthly fee gives ${m(gAnnual)} a year, minus ${m(G.varYear)} of variable cost per member, so each member brings ${m(gMargin)}; ${mm(G.fixed)} of fixed costs divided by that gives ${K.num(Math.ceil(gBreak))} members. Then compare with capacity.` },
    { q: 'What does a market entry case example look like?', a: `The client asks whether to enter a market. Size it, estimate the share the client can win, compute the profit on that share and compare it with the investment. In the scooter example on this page, the city market is ${mm(eMarket)} a year, a ${pct(E.share)} share brings ${mm(eRev)} of revenue and the fleet is repaid in ${K.num(ePayback, 1)} years, on the stated assumptions.` },
    { q: 'How do you value an acquisition in a case interview without a spreadsheet?', a: `Use a perpetuity: yearly profit divided by the required return. In the bakery example, ${mm(A.profit)} of profit at a ${pct(A.rate)} return is worth ${mm(aValueAlone)}, below the ${mm(A.price)} price. Adding ${mm(A.synergy)} of yearly synergies raises the value to ${mm(aValueSyn)}. The decision then rests on how sure the synergies are.` },
    { q: 'Are the numbers in these case interview examples real?', a: 'No. They are assumptions written for the exercises, chosen to give round arithmetic, as an interviewer would. They do not describe a real company or market. What transfers to a real interview is the method: state each assumption, compute aloud, check that the result is plausible and close with a recommendation and its main risk.' },
  ],
  body: (h) => `<h2>Case 1: does the new fitness club cover its costs?</h2>
<p><em>Assumptions of the exercise:</em> the client plans a fitness club with fixed costs of ${mm(G.fixed)} a year (rent, staff, equipment), a membership fee of ${m(G.fee)} a month, a variable cost of ${m(G.varYear)} per member per year (towels, cleaning, card fees) and room for ${K.num(G.capacity)} members. The question: how many members does it need to break even, and is that realistic?</p>
<p><strong>Step 1.</strong> Yearly revenue per member: ${m(G.fee)} times 12 is ${m(gAnnual)}.</p>
<p><strong>Step 2.</strong> Margin per member: ${m(gAnnual)} minus ${m(G.varYear)} is ${m(gMargin)}.</p>
<p><strong>Step 3.</strong> Break-even: ${mm(G.fixed)} divided by ${m(gMargin)} gives ${K.num(gBreak, 0)} members.</p>
<p><strong>Step 4.</strong> Sanity check: that is ${pct(gBreak / G.capacity)} of capacity, so the club has a safety margin of ${pct(gSafety)}. Full, it would earn ${mm(gFull)} a year.</p>
<p><strong>Close.</strong> "The club breaks even at about ${K.num(Math.ceil(gBreak))} members, ${pct(gBreak / G.capacity)} of capacity. I would go ahead if the local market supports that many members within the first year; the next step is to check the number of people living within a short drive and the clubs already there."</p>
<p>Interviewers often follow up with a change: the rent rises, the fee falls, a competitor opens. Rerun the division with the new number; the calculator at the top does it for you.</p>
<h2>Case 2: should a scooter service enter a new city?</h2>
<p><em>Assumptions of the exercise:</em> the city has ${K.num(E.adults)} adults; ${pct(E.users)} of them would use rented scooters, ${E.rides} rides a month each, at ${K.usd(E.price, 2)} a ride. The client expects to win ${pct(E.share)} of rides, each costs it ${K.usd(E.costRide, 2)} in charging, repairs and staff, and the fleet costs ${mm(E.fleetCost)}.</p>
<p><strong>Step 1, size the market.</strong> ${K.num(E.adults)} adults times ${pct(E.users)} is ${K.num(E.adults * E.users)} users; times ${E.rides} rides times 12 months is ${K.num(E.adults * E.users * E.rides * 12)} rides a year; at ${K.usd(E.price, 2)}, ${mm(eMarket)}.</p>
<p><strong>Step 2, the client's share.</strong> ${pct(E.share)} of rides is ${K.num(eRides)} rides and ${mm(eRev)} of revenue.</p>
<p><strong>Step 3, profit.</strong> Each ride earns ${K.usd(E.price - E.costRide, 2)} after its cost, so ${mm(eProfit)} a year before overheads.</p>
<p><strong>Step 4, payback.</strong> ${mm(E.fleetCost)} divided by ${mm(eProfit)} is ${K.num(ePayback, 1)} years.</p>
<p><strong>Close.</strong> "On these assumptions the city repays the fleet in about ${K.num(ePayback, 1)} years. The answer is most sensitive to the share of adults who ride; before entering, I would check usage in a comparable city and the city's permit rules, which can cap the fleet."</p>
${h.mini('sizing')}
<h2>Case 3: should the client buy a bakery chain?</h2>
<p><em>Assumptions of the exercise:</em> a food group can buy a bakery chain for ${mm(A.price)}. The chain earns ${mm(A.profit)} a year and is not growing; combining purchasing and delivery would save ${mm(A.synergy)} a year. The group requires a ${pct(A.rate)} return.</p>
<p><strong>Step 1, value alone.</strong> A steady profit valued as a perpetuity is the profit divided by the return: ${mm(A.profit)} divided by ${pct(A.rate)} is ${mm(aValueAlone)}, less than the price.</p>
<p><strong>Step 2, value with synergies.</strong> ${mm(aTotal)} a year divided by ${pct(A.rate)} is ${mm(aValueSyn)}, more than the price.</p>
<p><strong>Step 3, payback.</strong> The price divided by the combined yearly profit is ${K.num(aPayback, 1)} years.</p>
<p><strong>Close.</strong> "The chain is worth ${mm(aValueAlone)} on its own, so at ${mm(A.price)} we would be paying for synergies. With the ${mm(A.synergy)} of savings, the deal is worth ${mm(aValueSyn)}. I would recommend it only after checking those savings line by line, and I would offer less than the asking price."</p>
<h2>How to use these cases</h2>
<p>Read the question, close the page and solve it aloud before reading the steps. Then change one assumption and solve again: interviewers rarely stop at the first answer. The profit tree, the most common shape, is solved on ${h.a('consulting-case-interview', 'the case interview page')}, and estimation drills are on ${h.a('consulting-market-sizing', 'market sizing questions')}. At schools where consulting takes a large share of the class, ${K.p(share.share)} at ${h.sc(share.slug)}, students run these drills in pairs through the first months of the program; the ${h.a('consulting', 'consulting rubric')} explains when the interviews come.</p>`,
  tool: 'case',
  toolArgs: { mode: 'breakeven' },
  related: ['consulting-case-interview', 'consulting-market-sizing', 'consulting-how-to-become-a-consultant', 'consulting'],
  sources: ['mbacsea', 'gmac'],
  schoolSources: [share.slug],
});
