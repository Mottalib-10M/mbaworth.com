import { definePage } from '../../lib/page-types';
import { KIT as K, type RankRow } from '../../lib/kit';

const G = 'consulting';
const R = K.ranking(G);
const T = R.ranked;
const [a, b, c] = T;
const sal = (x: RankRow) => (x.salary === null ? 'no salary published' : `${K.usd(x.salary)}${x.estimated ? ' est.' : x.fallback ? ' (school-wide figure)' : ''}`);
const own = T.filter((x) => x.salary !== null && !x.fallback && !x.estimated);
const tally = new Map<number, number>();
for (const x of own) tally.set(x.salary!, (tally.get(x.salary!) ?? 0) + 1);
const [modal, modalN] = [...tally.entries()].sort((x, y) => y[1] - x[1])[0] ?? [0, 0];
const deepest = [...T].sort((x, y) => y.share - x.share)[0];
const most = [...T].filter((x) => x.placed !== null).sort((x, y) => y.placed! - x.placed!)[0];
const noSal = R.unranked.filter((u) => u.why.startsWith('no salary') && u.share !== null).sort((x, y) => y.share! - x.share!);
const noLiv = R.unranked.filter((u) => u.why === 'no living budget published' && u.share !== null).sort((x, y) => y.share! - x.share!);
const small = R.unranked.filter((u) => u.why.startsWith('under'));
const min = K.MODEL.minShare!.ind;

export default definePage({
  id: 'best-mba-consulting',
  group: 'best',
  order: 2,
  slug: 'best-mba-consulting',
  nav: 'Best MBA for consulting',
  card: 'Schools ranked on the share of their class hired by consulting firms, the pay reported and the payback.',
  title: 'MBA for Consulting 2026: Schools Ranked on Placement and Pay',
  description: `Which MBA sends the most graduates into consulting in 2026: share of the class hired, consulting salary and payback for ${T.length} schools, read in their reports.`,
  h1: 'Best MBA for consulting: our 2026 ranking',
  intro: `${a.short} places ${K.p(a.share)} of its class in consulting at a reported ${sal(a)}, the strongest combination in our ranking today.`,
  resume: `For consulting, the best MBA is the one whose class goes there in numbers and whose report shows what the firms paid. Reading each school's latest employment report, ${a.short} comes first today with ${K.p(a.share)} of its graduates hired in consulting and a consulting salary of ${sal(a)}, ahead of ${b.short} (${K.p(b.share)}, ${sal(b)}) and ${c.short} (${K.p(c.share)}, ${sal(c)}). Pay barely separates the leaders: ${modalN} ranked schools report exactly ${K.usd(modal)} for the industry, so the share of the class and the cost of the degree make the difference. The ten-year value is computed for a reference person earning ${K.ref()} before the MBA. Enter your own salary in the finder above to re-rank the ${T.length} schools; ${R.unranked.length} more are listed under the table with the reason they are not ranked.`,
  faqs: [
    { q: 'Why do so many schools report the same MBA consulting salary?', a: `Because the large strategy firms pay a standard base to every post-MBA hire in a given office and year, and most consulting graduates of the leading schools join those firms. Today ${modalN} ranked schools report ${K.usd(modal)} as their consulting median. A school reporting less usually sends more people to smaller firms, internal strategy teams or offices outside the United States.` },
    { q: 'Which MBA has the highest share of its class in consulting?', a: `Among ranked schools, ${deepest.short} reports the largest share, ${K.p(deepest.share)} of the class. The share is not the whole answer: it is a percentage of the school's own reporting group, so a large school with a lower share can still send more graduates. The "graduates, about" column of the table turns each share into an approximate headcount.` },
    { q: 'Does an MBA consulting ranking tell me my chance of an offer?', a: `No. It describes where last year's graduates went, not the odds for any single applicant. Firms hire through case interviews and fit rounds, and the result depends on your prior experience, your interview preparation and the office you target. A school with a high share has more classmates in the process and more alumni inside the firms, which helps, but it guarantees nothing.` },
    { q: 'Is consulting pay in the MBA reports base salary or total pay?', a: `Base salary, in nearly every case. Reports that follow the MBA CSEA standards give the median base salary of graduates who accepted a full-time job, with the signing bonus counted apart and the performance bonus paid after the first year left out. Total compensation in the first year is therefore higher than the figure in the table, by an amount the reports do not publish.` },
    { q: 'Should I pick a school for consulting on share or on cost?', a: `On both, which is what the fit score does. The share counts ${Math.round(K.MODEL.weights.share * 100)}% and the consulting salary and ten-year value ${Math.round(K.MODEL.weights.salary * 100)}% each. Since the salary is close to identical among the leaders, cost decides more than people expect: a school with a cheaper program or a city with lower living costs gains ground at the same consulting pay.` },
  ],
  body: (h) => `<h2>Same starting pay, different pipelines</h2>
<p>Consulting is the industry where MBA salaries converge most. The firms that hire the most graduates set one base salary for their post-MBA associates in each country and pay it to everyone in the class of new hires, whatever the school. In the reports we read, ${modalN} of the ${T.length} ranked schools print the same figure, ${K.usd(modal)}. That leaves two things to separate schools: how much of the class the firms take, and what the degree costs. The table weighs both, with the salary still counted for the schools whose graduates land in smaller firms or abroad at a lower base.</p>
${h.rankTable(G, 10)}
<p>${h.sc(deepest.slug)} has the deepest pipeline in proportion, with ${K.p(deepest.share)} of its graduates in consulting${most && most.slug !== deepest.slug ? `, while ${h.sc(most.slug)} sends the largest number, about ${K.num(most.placed!)} people, because its class is larger` : ''}. Both facts matter for a candidate: a high share means the curriculum, the clubs and the second-year students are organized around case interviews; a large number means more alumni in each office and more interview slots for the school.</p>
<h2>Recruiting runs on the firms' calendar</h2>
<p>Consulting hires MBA students mostly through the summer internship. Firms present on campus in the first autumn, case interviews for the internship take place in the first winter, and a good summer ends with a full-time offer before the second year starts. A student who arrives without a plan and decides in the spring has already missed the main round for that year. One-year programs compress the same steps into a few months and recruit mostly for direct full-time roles, which is why their consulting share can swing from one class to the next. Our ${h.a('consulting-case-interview', 'case interview guide')} covers what the rounds test.</p>
<h2>Strong consulting schools outside the ranking</h2>
<p>${noSal.length ? `Several schools send a large part of their class to consulting without publishing what those graduates earn: ${K.listOf(noSal.slice(0, 4).map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))}. Without a salary the payback and the ten-year value cannot be computed, so these schools are shown apart rather than scored on a guess.` : 'Every school with a consulting line also publishes a salary today.'} ${noLiv.length ? `${K.listOf(noLiv.slice(0, 4).map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} publish a salary but no student living budget, which leaves the total cost open.` : ''} ${small.length ? `${K.listOf(small.map((u) => h.sc(u.slug)))} report a consulting line under ${min}% of the class, too thin to rank.` : `No school is excluded for a share under ${min}% of the class.`} If one of these schools is on your list, its page shows the full report line and the reason the figure is missing.</p>
${h.miniTwo(a.slug, b.slug)}
<h2>What a consulting offer pays beyond the base</h2>
<p>The salary column is a base. Post-MBA consulting offers usually add a signing bonus, sometimes a tuition reimbursement for sponsored students who return, and a performance bonus after the first year that depends on the firm and the rating. Reports give the signing bonus as a separate median when they give it at all, and none publishes the performance bonus. The ten-year value counts the signing bonus times the share of the class that received one, and nothing for the later bonuses, so it errs on the low side for a consultant who stays several years.</p>
<p>The wide gap between a strategy firm and the national average is visible in public data. The U.S. Bureau of Labor Statistics counts all management analysts, at every level and in every firm size, and its percentiles sit well below what the leading schools report:</p>
${h.miniPosition('131111')}
<h2>What the table cannot tell you</h2>
<p>Consulting firms hire by office. A school's report rarely says how many of its consulting hires needed a work visa, how many joined in the country of the school, or how many were sponsored students returning to a firm that paid for the degree. In a weak year firms can hire fewer associates or push start dates back, and the report of that class shows a lower share without anything changing at the school. Read the ranking as a picture of the last cycle, and check the employer list on each school page for the firms you actually want. The ${h.a('consulting', 'consulting career page')} explains the career path itself.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'consulting' },
  related: ['consulting', 'consulting-mbb', 'consulting-case-interview', 'mba-finder', `school:${a.slug}`],
  sources: ['mbacsea', 'ecb_fx', 'gmac', 'bls_oews'],
  schoolSources: [a.slug, b.slug, c.slug],
});
