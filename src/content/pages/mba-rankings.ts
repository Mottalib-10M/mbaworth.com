import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const W = K.MODEL.weights;
const pc = (x: number) => `${Math.round(x * 100)}%`;
const all = K.ranking('all');
const ftCited = K.schools.filter((s) => K.ft(s.slug)).length;
const FT = 'https://rankings.ft.com/rankings/3006/mba-2026';
const USN = 'https://www.usnews.com/education/best-graduate-schools/articles/business-schools-methodology';
const BB = 'https://brp-prod-bcc.bloomberg.com/business-schools/methodology';
const QS = 'https://www.topuniversities.com/mba-rankings/methodology';

export default definePage({
  id: 'mba-rankings',
  group: 'guides',
  order: 3,
  slug: 'mba-rankings',
  nav: 'MBA rankings explained',
  card: 'What the Financial Times, US News, Bloomberg Businessweek and QS each measure, read on their own methodology pages, and how our ranking differs.',
  title: 'MBA Rankings 2026: What FT, US News and Bloomberg Measure',
  description: `MBA rankings in 2026: what the FT Global MBA table, US News, Bloomberg Businessweek and QS measure, how they weigh salary and surveys, and how ours differs.`,
  h1: 'MBA rankings: what each table measures',
  intro: 'Four publishers rank MBA programs every year, and each answers a different question; this page reads their methods, not their order.',
  resume: `The four MBA rankings most applicants read measure different things. The Financial Times Global MBA ranking 2026 lists 100 schools on criteria grouped into career progression (salary today, weighted salary, salary increase, career progress, aims achieved, employment at three months), programme assessment, diversity, international opportunities and faculty research. US News ranks American full-time programs only: 50% on employment rates and pay of the 2024 and 2025 graduates, 25% on ratings by deans and recruiters, 25% on test scores, grades and acceptance rate. Bloomberg Businessweek's 2026-27 edition weighs four indexes from surveys of students, alumni and employers, with compensation at 40.6% for American schools. QS combines employer opinion, return on investment and other indicators. None of these tables starts from your salary. Our own ranking orders schools on one goal at a time, using the share of the class placed in it (${pc(W.share)}), the salary reported for it (${pc(W.salary)}) and the ten-year value of the degree (${pc(W.npv)}), all read in each school's employment report.`,
  faqs: [
    { q: 'What does the FT Global MBA ranking measure?', a: 'Its 2026 table, published on rankings.ft.com, scores 100 schools on criteria in five groups: career progression (salary today, weighted salary, salary percentage increase, career progress, aims achieved, careers service, employment at three months), programme assessment (value for money, ESG teaching, overall satisfaction), diversity of faculty, students and board, international opportunities, and faculty expertise, including FT research rank. The salary columns describe alumni, labelled "salary today" in the table, rather than first offers at graduation.' },
    { q: 'How does the US News MBA ranking weigh salary and employment?', a: 'Half of the score is "attainment success": employment at graduation 7%, three months after 13%, mean starting salary and bonus 20% and salary by profession 10%, all on 2024 and 2025 graduates. Ratings by deans and recruiters add 25%, and student selectivity (test scores, undergraduate grades, acceptance rate) the last 25%. Only American full-time programs are ranked.' },
    { q: 'Where do the Bloomberg Businessweek MBA ranking weights come from?', a: 'From the people surveyed. Students, alumni and recruiters rank the factors that matter most to them, and their answers set the weights of four indexes. In the 2026-27 edition, for American schools, compensation weighs 40.6%, learning 26.6%, networking 21.3% and entrepreneurship 11.4%. Compensation mixes school-reported employment data under CSEA standards (52.5%) with survey answers (47.5%).' },
    { q: 'Why does MBA Worth not reproduce the FT or US News ranking tables?', a: `The tables belong to their publishers, and they answer questions other than ours. A rank mixes criteria you may not care about, such as research output or board diversity, with criteria you do. A school page on this site may cite one rank as a fact with its link (${ftCited} schools have an FT rank cited), but no table here is sorted on a publisher's order.` },
    { q: 'How is the MBA Worth ranking different from published MBA rankings?', a: `It ranks schools on one goal at a time, such as consulting, private equity or working in Asia, and only on figures from each school's own report: share placed (${pc(W.share)}), salary for that goal (${pc(W.salary)}) and ten-year value for a person earning ${K.ref()} (${pc(W.npv)}). The finder recomputes it on your own salary. ${all.unranked.length} schools without a required figure are listed apart.` },
  ],
  body: (h) => `<h2>Financial Times: alumni careers and an international view</h2>
<p>The ${h.ext(FT, 'FT Global MBA ranking 2026')} lists 100 schools, and its own table shows what goes into the score. The largest group is career progression: the salary of alumni today, the same salary weighted by the FT, the percentage increase compared with pay before the MBA, career progress, whether alumni achieved their aims, the careers service and the share employed three months after graduation. Programme assessment adds value for money, ESG and net zero teaching and overall satisfaction. A diversity block counts women and international members among faculty, students and the board, plus a sector diversity rank; international opportunities cover mobility and course experience; faculty expertise covers doctorates and the FT research rank. An alumni network rank and a carbon footprint rank also appear.</p>
<p>Two features matter when reading it. The salary measures describe alumni (the table calls the first one "salary today"), not graduates at the time of their first offer, so they reward schools whose alumni rise fast after leaving. And the salary increase rewards schools whose students earned little before, which lifts programs in countries with lower pre-MBA pay. Neither measure tells you what you, with your own salary, would gain.</p>
<h2>US News: outcomes, reputation and selectivity, American schools only</h2>
<p>The ${h.ext(USN, 'US News methodology')} for its Best Business Schools ranking is the most explicit of the four. Attainment success weighs 50%: employment rate at graduation (7%) and three months after (13%), mean starting salary and bonus (20%) and salary by profession compared with the average of ranked schools (10%), all on the graduates of 2024 and 2025 who were seeking a job. Quality assessment weighs 25%, split between a peer score from deans and directors of accredited programs (12.5%) and a recruiter score (12.5%), each on a scale from 1 to 5. Student selectivity weighs the last 25%: median GMAT and GRE scores (13%), median undergraduate grades (10%) and acceptance rate (2%). The publisher says the indicators and weights are the same as in the two prior editions, and schools in the bottom 10% appear in a range rather than with a number.</p>
<p>A quarter of the score therefore measures who gets in, not what happens after, and a quarter measures opinion. The salary is a mean that includes the signing bonus, a different figure from the median base salary most school reports put first.</p>
<h2>Bloomberg Businessweek: weights set by the people surveyed</h2>
<p>The ${h.ext(BB, 'Bloomberg Businessweek methodology')} for its 2026-27 Best B-Schools ranking asks students, alumni and recruiters which factors matter most and turns their answers into the weights of four indexes. For American schools, compensation weighs 40.6%, learning 26.6%, networking 21.3% and entrepreneurship 11.4%; schools in Europe, the Middle East, Asia-Pacific and Canada have their own weights. The compensation index combines employment and salary data that schools submit under the CSEA standards (52.5% of the index) with survey answers (47.5%). The edition drew on 4,842 students, 7,861 alumni and 617 employers and ranked 98 schools. Non-American salaries were converted into dollars at an average exchange rate and not adjusted for purchasing power.</p>
<h2>QS: a methodology we could not read</h2>
<p>QS publishes a Global MBA ranking and describes its method on ${h.ext(QS, 'its own site')}. On the day we checked, that page refused our reader, and we write nothing about a method we have not read on its source. Read it there before giving its rank any weight in your choice.</p>
${h.mini('response')}
<h2>Why their tables are not reproduced here</h2>
<p>A published rank is the answer to the publisher's question, with weights the publisher or its surveys chose. Someone aiming at private equity in New York and someone aiming at a manufacturing job in Germany would weigh research output, board diversity or test scores very differently, and a single order cannot serve both. The tables also belong to their publishers. A school page on this site may cite one rank as a fact, with a link to the source, and ${ftCited} school pages do so for the FT; no table, column or "top ten" on this site follows a publisher's order.</p>
<h2>How our ranking works instead</h2>
<p>Our ranking starts from your goal and from documents each school publishes. For a goal such as consulting, investment banking or working in Asia, each school gets three measures from its own employment report: the share of the class placed there, the salary reported for it and the ten-year net present value of the degree for the same person earning ${K.ref()} today. Each measure becomes a percentile among the schools that publish all three, weighted ${pc(W.share)}, ${pc(W.salary)} and ${pc(W.npv)}. For the whole class, ${all.ranked.length} schools can be ranked and ${all.unranked.length} are listed apart, most because they publish no salary or no living budget. The ${h.a('method', 'method page')} gives every formula, the ${h.a('mba-finder', 'finder')} recomputes the order on your own salary, and the ${h.a('best-mba-programs', 'overall ranking')} shows the result for the reference person.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'all' },
  related: ['mba-finder', 'best-mba-programs', 'method', 'mba-employment-report', 'mba-roi'],
  sources: ['ft_rankings', 'mbacsea', 'gmac'],
  extSources: [
    { label: 'Financial Times, Global MBA Ranking 2026 (criteria of the published table)', url: FT },
    { label: 'U.S. News & World Report, Best Business Schools methodology', url: USN },
    { label: 'Bloomberg Businessweek, Best B-Schools 2026-27 methodology', url: BB },
  ],
});
