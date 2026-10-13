import { definePage } from '../../lib/page-types';
import { KIT as K, type RankRow } from '../../lib/kit';

const R = K.ranking('all');
const T = R.ranked;
const [a, b, c] = T;
const pay = (x: RankRow) => (x.salary === null ? 'no published salary' : `${K.usd(x.salary)} ${K.salaryKind(x.slug)}`);
const top10 = T.slice(0, 10);
const usIn10 = top10.filter((x) => K.s(x.slug).country === 'US').length;
const firstAbroad = T.find((x) => K.s(x.slug).country !== 'US');
const biggest = [...T].filter((x) => x.placed !== null).sort((x, y) => y.placed! - x.placed!)[0];
const smallest = [...top10].filter((x) => x.placed !== null).sort((x, y) => x.placed! - y.placed!)[0];
const noSal = R.unranked.filter((u) => u.why.startsWith('no salary') && u.share !== null).sort((x, y) => y.share! - x.share!);
const noLiv = R.unranked.filter((u) => u.why === 'no living budget published' && u.share !== null).sort((x, y) => y.share! - x.share!);
const usLine = usIn10 === top10.length ? `All of the first ${top10.length} schools are American.` : `Today ${usIn10} of the first ${top10.length} schools are American.`;
const absent = K.schools.filter((s) => !T.some((x) => x.slug === s.slug) && !R.unranked.some((u) => u.slug === s.slug));
const oneYear = T.filter((x) => (K.s(x.slug).months ?? 99) <= 13);
const sources = [a, b, c].filter(Boolean).map((x) => x.slug);

export default definePage({
  id: 'best-mba-programs',
  group: 'best',
  order: 1,
  slug: 'best-mba-programs',
  nav: 'Best MBA programs, our ranking',
  card: 'Every school ranked on its own employment report: job rate, salary, payback and ten-year value.',
  title: 'MBA Programs 2026: Schools Ranked on Jobs, Pay and Payback',
  description: `MBA programs ranked for 2026 on each school's own report: share of the class hired, salary, payback and ten-year value, for ${T.length} schools, on your own pay.`,
  h1: 'Best MBA programs in 2026, ranked on what graduates get',
  intro: `${a.short} leads our whole-class ranking today, on its employment rate, its reported salary and the ten-year value of the degree.`,
  resume: `Our ranking of MBA programs reads one document per school, its latest employment report, and asks three questions: how much of the class had a job within three months, what salary the school reports, and what the degree is worth over ten years once tuition, living costs and the salary you stop earning are paid. On those terms ${a.short} leads today, with ${K.p(a.share)} of its class employed and a reported ${pay(a)}, followed by ${b.short} (${K.p(b.share)} employed, ${b.salary === null ? 'no salary' : K.usd(b.salary)}) and ${c.short} (${K.p(c.share)}, ${c.salary === null ? 'no salary' : K.usd(c.salary)}). The return is computed for a reference person earning ${K.ref()} before the MBA. ${T.length} schools publish every figure the score needs and ${R.unranked.length} more are listed apart with the reason. Type your own salary into the finder above and the order is recomputed, because the pay you give up while studying is part of the price.`,
  faqs: [
    { q: 'Which figures decide our ranking of the best MBA programs?', a: `Three, all read in the school's own employment report and fees pages: the share of the class employed within three months (${Math.round(K.MODEL.weights.share * 100)}% of the score), the school-wide salary (${Math.round(K.MODEL.weights.salary * 100)}%) and the ten-year net present value for someone earning ${K.ref()} before the MBA (${Math.round(K.MODEL.weights.npv * 100)}%). Each becomes a percentile among the ranked schools. Reputation, research output and survey votes play no part.` },
    { q: 'Why do American schools dominate the best MBA programs ranking here?', a: `Because they report the highest base salaries in dollars and most add a paid summer internship, which lowers the net cost. Today ${usIn10 === top10.length ? 'all' : usIn10} of the ${top10.length} leading schools are in the United States. A European one-year program saves a year of forgone pay, yet the salaries its graduates report convert to fewer dollars, and the ten-year value usually ends lower for the reference person.` },
    { q: 'Is a top MBA program in this ranking the best one for me?', a: `Not necessarily. The whole-class view mixes consulting, banking, technology and every other path. If you already know your target industry or the country you want to work in, the goal-specific pages and the finder rank schools on that line of the report instead, and the order changes a lot: a school in the middle here can lead for one sector or one region.` },
    { q: 'How often is this MBA programs ranking updated?', a: `Each time a school publishes a new employment report or new fees, usually between September and December, and whenever the European Central Bank rates used for currency conversion are refreshed at the build. Every school page shows the class the figures describe and the date we read them, so you can check that the row you compare is the latest one available.` },
    { q: 'Can a school pay to appear among the best MBA programs on this site?', a: `No. Radif Partners publishes the site, has no declared tie with any school and takes no fee for a listing or a position. A school enters the table when its public documents give a job rate, a salary and a living budget. If one of those is missing, the school is listed under the table with the reason, never placed by hand.` },
  ],
  body: (h) => `<h2>${T.length} employment reports, one scoring rule</h2>
<p>A school that wants to be compared on outcomes has to publish three things: how many of its graduates found work, what they were paid, and what a student spends to get there. We take those figures as the school prints them, convert currencies at the European Central Bank rate, and compute for every school the same return for the same person: someone earning ${K.ref()} a year before the MBA, who pays tuition, fees and the school's own living budget and gives up salary for the length of the program. The table below is the result. Newspaper and magazine rankings exist (${h.src('ft_rankings', 'the Financial Times publishes one')}) and blend many criteria such as research and alumni surveys; ours keeps none of their columns and none of their order, and uses only the documents each school puts its name to.</p>
${h.rankTable('all', 10)}
<p>The share column is the employment rate as the school defines it, most often graduates seeking a job who accepted an offer within three months. The salary is school-wide, mostly a median base salary without the signing bonus; where a school prints an average instead, the school page says so, because an average sits above the median of the same class.</p>
<h2>Why dollar salaries fill the upper rows</h2>
<p>${usLine} The reason is arithmetic more than prestige. A two-year program in the United States costs more in tuition and in salary given up, but its graduates report base salaries that convert to more dollars than any European or Asian school reports, and the summer internship between the two years pays back part of the bill. ${firstAbroad ? `The first school outside the United States, ${h.sc(firstAbroad.slug)}, appears at rank ${firstAbroad.rank} with ${firstAbroad.salary === null ? 'no salary published' : `a reported salary of ${K.usd(firstAbroad.salary)}`}.` : 'No school outside the United States reaches the ranked list today.'} ${oneYear.length} of the ranked schools run a program of about one year; they gain on cost and lose on salary, and the ${h.a('best-mba-one-year', 'one-year ranking')} compares them with each other instead.</p>
<h2>Class size changes what a rate means</h2>
<p>An employment rate of ninety percent says something different for a class of eight hundred and for a class of sixty. ${biggest ? `${h.sc(biggest.slug)} turns its rate into about ${K.num(biggest.placed!)} employed graduates, the largest pool in the table` : 'The largest schools turn their rate into several hundred employed graduates'}${smallest && biggest && smallest.slug !== biggest.slug ? `, while ${h.sc(smallest.slug)}, also among the first ten, places about ${K.num(smallest.placed!)}` : ''}. A large class means more alumni in each firm and more employers who come back every year; a small class means more attention per student and a single bad hiring year weighs more on the rate. The "graduates, about" column is the share applied to the class size the school publishes, an order of magnitude rather than a headcount.</p>
<h2>Well-known schools that sit outside the table</h2>
<p>${noSal.length ? `Some programs report a strong employment rate but no salary we can use: ${K.listOf(noSal.slice(0, 5).map((u) => `${h.sc(u.slug)} (${K.p(u.share!)} employed)`))}. Without a salary there is no payback and no ten-year value, so the score cannot be computed.` : 'Every school with an employment rate also publishes a salary today.'} ${noLiv.length ? `Others publish a salary but no student living budget: ${K.listOf(noLiv.slice(0, 5).map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))}. We do not guess what a year in their city costs, so they stay unranked too.` : ''} Being outside the table is a statement about disclosure, not about quality: each school page shows what the school does publish, and the finder still lists these schools with their share.</p>
<p>${absent.length ? `${absent.length > 5 ? `${absent.slice(0, 5).map((x) => h.sc(x.slug)).join(', ')} and ${absent.length - 5} other schools` : K.listOf(absent.map((x) => h.sc(x.slug)))} are missing from both lists` : 'A school can also be missing from both lists'} because the report gives no employment rate for the whole class in a form we can use. They still rank on industry and region pages when the report gives those lines, as on the ${h.a('best-mba-consulting', 'consulting ranking')} or the ${h.a('best-mba-europe', 'ranking for working in Europe')}.</p>
${h.miniTwo(a.slug, b.slug)}
<h2>Your salary today reorders the list</h2>
<p>The ten-year value depends on what you earn now. For the reference person, ${a.short} shows a payback of ${a.payback === null ? 'more than thirty years' : K.yrs(a.payback)} and a ten-year value of ${a.npv === null ? 'no figure' : K.usd(a.npv)}. Raise your current salary in the finder and every two-year program loses more ground than a short one, because the pay you stop earning grows with you while the post-MBA salary does not. Lower it and the expensive American programs climb, since the jump in pay is larger. The finder above the table does this for you; the comparison just above sets two schools side by side.</p>
<h2>What this ranking cannot measure</h2>
<p>A report describes one past class. It does not say whether you need a visa to work where the school sits, how many hires were sponsored by an employer who already paid the tuition, or whether the year of the report was a strong or weak hiring cycle. It does not tell you how many graduates chose to start a company and are counted as not seeking. Read the rate as the experience of people who looked for a job, then open the report through the school page before you decide. The ${h.a('method', 'method page')} lists every assumption the return uses, and you can change each one.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'all' },
  related: ['mba-finder', 'best-mba-one-year', 'best-mba-consulting', 'mba-roi', 'method'],
  sources: ['mbacsea', 'ecb_fx', 'gmac', 'ft_rankings'],
  schoolSources: sources,
});
