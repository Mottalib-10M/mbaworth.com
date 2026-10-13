import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

// Two worked sizings. EVERY number below is an assumption of the exercise, declared on the page, not data.
// Example 1, demand side: yearly market for child car seats in an imaginary country.
const C = { people: 60_000_000, birthRate: 0.011, seatsPerChild: 2, secondCar: 0.2, price: 180 };
const cBirths = C.people * C.birthRate;
const cSeats = cBirths * C.seatsPerChild * (1 + C.secondCar);
const cMarket = cSeats * C.price;
// Example 2, supply side: cups of coffee sold per day at one large train station.
const S = { kiosks: 4, baristas: 2, cupsPerMin: 1, peakHours: 4, peakUse: 0.8, offHours: 12, offUse: 0.25, price: 3.2 };
const perHourFull = S.baristas * S.cupsPerMin * 60;
const sPerKiosk = perHourFull * (S.peakHours * S.peakUse + S.offHours * S.offUse);
const sDay = sPerKiosk * S.kiosks;
const sRevYear = sDay * S.price * 365;
const pct = (v: number) => K.p(Math.round(v * 1000) / 10);
const mm = (v: number) => `${K.usd(v / 1e6, 1)} million`;
const top = K.top('consulting', 2);

export default definePage({
  id: 'consulting-market-sizing',
  group: 'consulting',
  order: 13,
  slug: 'consulting/market-sizing',
  nav: 'Market sizing',
  card: 'Market sizing questions in consulting interviews: the method, two estimates worked in full and the traps that cost candidates.',
  title: 'Market Sizing Questions 2026: Method, Two Worked Examples',
  description: `Market sizing questions for 2026 interviews: top-down and supply-side methods, a ${mm(cMarket)} car seat market, a station coffee estimate and the usual traps.`,
  h1: 'Market sizing questions: the method and two estimates in full',
  intro: 'A market sizing question asks how big something is with no data in the room: you build the answer from assumptions you state and numbers you can multiply aloud.',
  resume: `A market sizing question asks for an estimate, such as the yearly sales of child car seats in a country or the cups of coffee sold at a station, and is scored on the method, not on the final figure. The method has four moves: choose the unit (people, households, cars, shops), cut it down to those who buy, multiply by how often and at what price, then check the result against something you know. Demand-side sizing starts from the buyers; supply-side sizing starts from what sellers can produce. The two examples here use declared assumptions. A country of ${K.num(C.people)} people with a birth rate of ${pct(C.birthRate)} buys about ${K.num(cSeats)} car seats a year at ${K.usd(C.price)}, a market of ${mm(cMarket)}. A station with ${S.kiosks} coffee kiosks sells about ${K.num(sDay)} cups a day, ${mm(sRevYear)} a year. The traps are double counting, mixing monthly and yearly figures, forgetting replacement, and skipping the sanity check.`,
  faqs: [
    { q: 'What is a market sizing question in a consulting interview?', a: 'It is a request to estimate a quantity without data: how many electric cars are sold in a country, how much a city spends on dog food, how many flights leave an airport each day. The interviewer scores the logic, the stated assumptions and the arithmetic. A round, plausible answer reached by a clear path beats a precise figure with no method behind it.' },
    { q: 'Should I use a top-down or a bottom-up approach to size a market?', a: `Pick the one whose assumptions you can defend. Top-down starts from a population and narrows it, as in the car seat example where ${K.num(C.people)} people lead to ${K.num(cBirths)} births a year. Bottom-up or supply-side starts from the sellers, as in the station example built from kiosk capacity. When time allows, do both and compare: a large gap points to a wrong assumption.` },
    { q: 'What are the most common mistakes in market sizing questions?', a: 'Counting the same buyer twice, mixing monthly and yearly figures, forgetting that durable goods are bought once every few years, using a share that is too precise to defend, and giving a final number without checking it against anything. Each one is easy to avoid if you write the units next to every number and say the result back as a sentence.' },
    { q: 'How precise does the answer to a market sizing question need to be?', a: 'Within the right order of magnitude, built from defensible steps. Round every assumption to an easy number, keep two significant figures in the arithmetic and say what would change the answer most. Interviewers often ask which assumption you are least sure of; having an answer ready shows judgment more than a decimal place does.' },
    { q: 'Do I need to know real statistics to answer market sizing questions?', a: 'A few anchors help: the population of your country and of a large city, a typical household size, a rough life expectancy. Beyond that, the interviewer expects assumptions, not facts. Say each one aloud as an assumption, as this page does, and adjust if the interviewer offers a better figure. Memorizing data is not the skill being tested.' },
  ],
  body: (h) => `<h2>The method in four moves</h2>
<p><strong>Choose the unit.</strong> Decide what you will count: people, households, cars, shops, flights. The unit should be the one that buys or uses the product. Child car seats are bought per child; coffee is bought per person per visit; elevators are bought per building.</p>
<p><strong>Cut to the buyers.</strong> Narrow the unit to those who buy: households with a car, adults who commute, buildings over a certain height. Use shares you can defend in one sentence, rounded.</p>
<p><strong>Multiply by frequency and price.</strong> How often does each buyer buy, and at what price? For durable goods, divide by the replacement cycle: a product kept for five years is bought by a fifth of its owners each year.</p>
<p><strong>Check.</strong> Compare the result with something you know: the size of a related market, the revenue of a large company in the sector, the number of shops you have seen. If the answer would make every household spend more on the product than on rent, an assumption is wrong.</p>
<p>Two families of approach exist. Demand-side sizing starts from the buyers, as above. Supply-side sizing starts from what sellers can produce: the number of shops, their capacity and how busy they are. It suits questions about one place, such as a station, an airport or a street.</p>
${h.mini('sizing')}
<h2>Example 1: the yearly market for child car seats</h2>
<p><em>Assumptions declared for the exercise:</em> a country of ${K.num(C.people)} people; a birth rate of ${pct(C.birthRate)} a year; each child needs ${C.seatsPerChild} seats over childhood (one for babies, one for older children); ${pct(C.secondCar)} of families buy a second set for a second car; an average price of ${K.usd(C.price)}.</p>
<p><strong>Births.</strong> ${K.num(C.people)} times ${pct(C.birthRate)} is ${K.num(cBirths)} children a year.</p>
<p><strong>Seats.</strong> Each needs ${C.seatsPerChild} seats, and ${pct(C.secondCar)} more for second cars: ${K.num(cBirths)} times ${C.seatsPerChild} times ${K.num(1 + C.secondCar, 1)} is ${K.num(cSeats)} seats a year. Using births instead of all children avoids counting the same child every year; the seat is bought once per stage.</p>
<p><strong>Market.</strong> ${K.num(cSeats)} seats at ${K.usd(C.price)} is ${mm(cMarket)} a year.</p>
<p><strong>Check.</strong> That is about ${K.usd(cMarket / cBirths)} spent on car seats per newborn, spread over several years: plausible for a product most parents with a car buy. "I estimate the market at about ${mm(cMarket)} a year. The assumption I am least sure of is the second-car share; at double that share, the market grows by ${pct((C.secondCar) / (1 + C.secondCar))}."</p>
<h2>Example 2: coffee sold at a large train station, from the supply side</h2>
<p><em>Assumptions declared for the exercise:</em> the station has ${S.kiosks} coffee kiosks, each with ${S.baristas} baristas who can each serve ${S.cupsPerMin} cup a minute; kiosks are open ${S.peakHours + S.offHours} hours, of which ${S.peakHours} are rush hours at ${pct(S.peakUse)} of capacity and ${S.offHours} are quieter at ${pct(S.offUse)}; a cup costs ${K.usd(S.price, 2)}.</p>
<p><strong>Capacity.</strong> ${S.baristas} baristas at ${S.cupsPerMin} cup a minute is ${perHourFull} cups an hour per kiosk.</p>
<p><strong>Use.</strong> Rush hours give ${S.peakHours} times ${pct(S.peakUse)}, quiet hours ${S.offHours} times ${pct(S.offUse)}: ${K.num(S.peakHours * S.peakUse + S.offHours * S.offUse, 1)} full hours a day, so ${K.num(sPerKiosk)} cups per kiosk.</p>
<p><strong>Station.</strong> ${S.kiosks} kiosks make ${K.num(sDay)} cups a day, and at ${K.usd(S.price, 2)} a cup, ${mm(sRevYear)} a year.</p>
<p><strong>Check.</strong> Supply-side sizing assumes the kiosks are the bottleneck. If queues are short at rush hour, demand is lower than capacity and the estimate is too high; if queues are long, people give up and the true demand is higher than what is sold. Say which you believe.</p>
<h2>The traps that cost points</h2>
<p><strong>Double counting.</strong> Counting all children every year for a product bought once, or counting both commuters and train trips for the same purchase.</p>
<p><strong>Mixed periods.</strong> Multiplying a monthly frequency by a yearly population share without converting. Write the unit next to every figure.</p>
<p><strong>Forgotten replacement.</strong> A phone, a mattress or a car is not bought every year; divide owners by the years they keep it.</p>
<p><strong>False precision.</strong> "23.7% of households" invites the question where it comes from. Round, and say why.</p>
<p><strong>No sanity check.</strong> Ending on a number without comparing it with anything is the most common reason a correct method still scores poorly.</p>
<p>Sizing is often the first step of a larger case: a ${h.a('consulting-case-interview', 'market entry case')} needs the size of the market before the share and the economics, as in the scooter case of ${h.a('consulting-case-interview-examples', 'case interview examples')}. At schools where consulting is the main destination, such as ${h.sc(top[0].slug)} and ${h.sc(top[1].slug)}, with ${K.p(top[0].share)} and ${K.p(top[1].share)} of the class in the industry, students drill these questions for months before interviews.</p>`,
  tool: 'case',
  toolArgs: { mode: 'sizing' },
  related: ['consulting-case-interview', 'consulting-case-interview-examples', 'consulting-how-to-become-a-consultant', 'consulting'],
  sources: ['mbacsea', 'gmac'],
  schoolSources: top.map((x) => x.slug),
});
