import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const n = K.schools.length;
const c = K.top('consulting', 1)[0];
const pe = K.top('pe', 1)[0];
const asia = K.top('z-asia', 1)[0];

export default definePage({
  id: 'mba-finder',
  group: 'tools',
  order: 1,
  slug: 'mba-finder',
  nav: 'School finder by industry and region',
  card: 'Rank every school on your goal: industry, finance segment, region or job, recomputed on your salary.',
  title: 'MBA Finder 2026: Best School by Industry, Region and Job',
  description: `Find the best MBA for your goal in 2026: share of the class placed in consulting, banking, tech or a region, salary reported and payback, for ${n} schools.`,
  h1: 'Which MBA for which industry, region or job',
  intro: 'Pick a goal and your salary today: every school is re-ranked on what its own employment report says about that goal.',
  resume: `The best MBA depends on where you want to work. This finder takes, for each school, three figures from its own employment report: the share of the graduating class hired in the industry, finance segment, region or job you choose, the salary the school reports for it, and the ten-year net present value of the degree for a person with your current salary. Each figure becomes a percentile among the schools that publish it, and the fit score weighs them ${Math.round(K.MODEL.weights.share * 100)}, ${Math.round(K.MODEL.weights.salary * 100)} and ${Math.round(K.MODEL.weights.npv * 100)} percent. For consulting, ${c.short} comes first today with ${K.p(c.share)} of its class in the industry; for private equity, ${pe.short}; for working in Asia, where few schools give a regional salary and the share placed decides alone, ${asia.short}. Sort the table on any single column to see the schools in another order.`,
  faqs: [
    { q: 'What does the fit score measure?', a: `It is the weighted average of three percentile ranks among the schools shown: the share of the class placed in your goal (${Math.round(K.MODEL.weights.share * 100)}%), the salary reported for it (${Math.round(K.MODEL.weights.salary * 100)}%) and the ten-year NPV for your salary (${Math.round(K.MODEL.weights.npv * 100)}%). For regions, the share placed decides alone, since few schools publish a salary by region.` },
    { q: 'Why is a well-known school missing from the ranking?', a: `A school is ranked only when it publishes the figures the score needs. Some keep the report behind a sign-up form, others give no student living budget, and a school placing under ${K.MODEL.minShare!.ind}% of its class in an industry is listed apart. Every school still appears under the table with its share and the reason it is not ranked.` },
    { q: 'What does the star next to a salary mean?', a: 'The school does not publish a salary for that industry or job, so its school-wide salary stands in. For regions, the school-wide figure is used only when the region takes at least half of the class, because a salary earned mostly in New York says nothing about pay in Singapore.' },
    { q: 'How is the number of graduates estimated?', a: 'It is the share the school reports for your goal applied to the class size it publishes, rounded. Reports often count shares of graduates who accepted a job, not of the whole class, so read it as an order of magnitude: forty graduates is a pipeline, four is a handful of personal searches.' },
    { q: 'Does my salary change the ranking?', a: 'Yes, through the ten-year value. The salary you give up while studying is part of the cost, so a high current salary favors short programs and schools with high salaries in your target segment. Share and salary do not depend on you; the NPV and the payback do, and the order moves with them.' },
  ],
  body: (h) => `<h2>Three figures from the school, one from you</h2>
<p>Every school on this site publishes an employment report: who answered, who found a job within three months, in which industry, in which region, in which job and for what pay. The finder reads those lines for the goal you pick. The share of the class tells you whether the school is a real pipeline into that path, the salary tells you what the path paid last year, and the net present value tells you whether that salary repays the full cost for someone in your situation. Only the last one depends on you.</p>
<p>The reports use different words for the same thing, and we keep the school's own label on its page. Here they are grouped into one list of industries (consulting, finance, technology, healthcare, consumer goods, energy, manufacturing), four finance segments (investment banking, private equity, venture capital, asset management), nine regions and the most common job functions. The ${h.a('method', 'method page')} explains each grouping and the rules that keep two overlapping lines from being added together.</p>
${h.mini('response')}
<h2>Reading a share without being misled</h2>
<p>A share is a percentage of a group that the school defines: most often graduates who were seeking a job and accepted an offer within three months, sometimes the whole reported class. A school of 900 placing 20% in a sector sends more people there than a school of 200 placing 40%, which is why the column "about" shows the share applied to the class size. Small shares are fragile: a single graduate moves a share of 0.5% to 1%. Below ${K.MODEL.minShare!.ind}% of the class (${K.MODEL.minShare!.seg}% for a finance segment), a school is listed apart and not ranked.</p>
<p>Salaries are the school's own figure for the segment when it publishes one. Most American schools give a median by industry, many European and Asian schools give a school-wide figure only, and some give averages rather than medians. Averages are marked: they tend to sit above the median of the same class, because a few large offers pull them up.</p>
<h2>Regions are ranked on placement</h2>
<p>Very few schools publish what their graduates earn in each region, so a regional ranking that required a regional salary would be a ranking of three schools. For regions, the fit score is the share of the class placed there, and salary and payback are shown when they exist. This favors schools located in the region, which is the honest answer: an American program sending 2% of its class to Asia is not a route to Asia, however famous it is.</p>
<h2>What the finder cannot see</h2>
<p>Employment reports describe one past class. They say nothing about your visa, your language, your previous industry or the year's hiring cycle, and they leave out sponsored students who return to their employer. Use the finder to build a short list, then open each school page, read its report through the links we give, and use the ${h.a('compare-mba', 'comparison tool')} for the last two or three.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'consulting' },
  related: ['best-mba-consulting', 'best-mba-investment-banking', 'best-mba-europe', 'compare-mba', 'method'],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
});
