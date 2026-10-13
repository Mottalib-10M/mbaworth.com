import { definePage } from '../../lib/page-types';
import { KIT as K, type RankRow } from '../../lib/kit';

const short = (s: { months: number | null }) => (s.months ?? 99) <= 13;
const R = K.ranking('all', short);
const T = R.ranked;
const [a, b, c] = T;
const pay = (x: RankRow) => (x.salary === null ? 'no salary published' : K.usd(x.salary));
const two = K.top('all', 10).find((x) => (K.s(x.slug).months ?? 0) > 13);
const fa = K.roi(a.slug);
const ft = two ? K.roi(two.slug) : null;
const HIGH = 150000;
const npvHiA = K.roi(a.slug, 'all', HIGH);
const npvHiT = two ? K.roi(two.slug, 'all', HIGH) : null;
const noSal = R.unranked.filter((u) => u.why.startsWith('no salary') && u.share !== null).sort((x, y) => y.share! - x.share!);
const noLiv = R.unranked.filter((u) => u.why === 'no living budget published' && u.share !== null).sort((x, y) => y.share! - x.share!);
const absent = K.schools.filter((s) => short(s) && !T.some((x) => x.slug === s.slug) && !R.unranked.some((u) => u.slug === s.slug));
const lens = T.map((x) => K.s(x.slug).months!).filter((m) => typeof m === 'number');
const minLen = Math.min(...lens);
const maxLen = Math.max(...lens);
const pos = T.filter((x) => x.npv !== null && x.npv > 0).length;

export default definePage({
  id: 'best-mba-one-year',
  group: 'best',
  order: 12,
  slug: 'best-mba-one-year',
  nav: 'Best one-year MBA',
  card: 'One-year MBA programs ranked on employment, salary and the ten-year value of a shorter degree.',
  title: 'One-Year MBA 2026: Programs Ranked on Jobs, Pay and Payback',
  description: `One-year MBA programs in 2026 ranked on jobs, salary, payback and ten-year value, with the salary you give up counted, for ${T.length} schools of 13 months or less.`,
  h1: 'Best one-year MBA programs in 2026',
  intro: `Among programs of 13 months or less, ${a.short} leads our ranking today on employment, salary and ten-year value.`,
  resume: `A one-year MBA costs less in the item most people forget, the salary you stop earning, and our ranking of the programs of 13 months or less counts it. On the whole class, ${a.short} comes first today with ${K.p(a.share)} of graduates employed and a reported ${pay(a)} ${K.salaryKind(a.slug)}, followed by ${b.short} (${K.p(b.share)}, ${pay(b)}) and ${c.short} (${K.p(c.share)}, ${pay(c)}). ${T.length} short programs publish every figure the score needs and ${R.unranked.length} more are listed apart. For the reference person earning ${K.ref()} before the MBA, ${fa ? `${a.short} costs ${K.usd(fa.forgone)} in salary given up` : 'the salary given up is about one year of pay'}${ft && two ? `, against ${K.usd(ft.forgone)} for ${two.short}, the leading two-year school` : ''}. Enter your own salary in the finder above: a higher salary raises the pay given up, which hurts long programs most, and shrinks the jump in pay, which hurts the schools whose graduates earn least.`,
  faqs: [
    { q: 'Is a one-year MBA worth less to employers than a two-year one?', a: 'Not by title: it is the same degree. The difference is the time to recruit. Without a summer internship, a one-year student meets employers during the courses and has no trial period with a firm, so career switchers find it harder. Graduates who stay in their industry, or who move with a clear target, lose little and save a year of salary.' },
    { q: 'How much salary do I give up in a one-year MBA?', a: `About the length of the program times your current salary. ${fa ? `For the reference person earning ${K.ref()}, ${a.short} means ${K.usd(fa.forgone)} given up${ft && two ? `, against ${K.usd(ft.forgone)} for ${two.short}, a two-year program` : ''}.` : ''} The finder above recomputes this for your own salary, together with tuition and the school's living budget, and shows how the payback changes.` },
    { q: 'Which one-year MBA programs are missing from this ranking?', a: `Those whose reports lack a figure the score needs. ${noSal.length ? `${K.listOf(noSal.slice(0, 3).map((u) => K.s(u.slug).short))} publish no usable salary` : ''}${noSal.length && noLiv.length ? '; ' : ''}${noLiv.length ? `${K.listOf(noLiv.slice(0, 3).map((u) => K.s(u.slug).short))} publish no living budget` : ''}. ${absent.length ? `${absent.length} other short programs give no employment rate for the whole class.` : ''} Each one still has its page with what it does publish.` },
    { q: 'Does a high current salary make a one-year MBA the better deal?', a: `Not automatically. A high salary raises the pay given up, which weighs more on a two-year program, but it also shrinks the raise the MBA brings, which weighs more on a school whose graduates earn less. ${npvHiA && npvHiT && two ? `At a current salary of ${K.usd(HIGH)}, the ten-year value is ${K.usd(npvHiA.npv)} for ${a.short} and ${K.usd(npvHiT.npv)} for ${two.short}.` : ''} The finder shows where the balance falls for you.` },
  ],
  body: (h) => `<h2>Shorter program, smaller hole in your income</h2>
<p>The largest cost of most MBAs is not tuition. It is the salary you stop earning while you study, and it scales with the length of the program. A program of ${minLen === maxLen ? `${minLen} months` : `${minLen} to ${maxLen} months`}, as in the table below, takes roughly half of that cost away compared with ${two ? `a two-year program such as ${h.sc(two.slug)}, which runs ${K.s(two.slug).months} months` : 'a two-year American program'}. We rank the programs of 13 months or less on the same three figures as the ${h.a('best-mba-programs', 'whole-class ranking')}: employment rate, school-wide salary and ten-year value for a reference person earning ${K.ref()} before the MBA.</p>
${h.rankTable('all', 10, (s) => (s.months ?? 99) <= 13, `Our ranking of MBA programs of 13 months or less, whole class: reference person earning ${K.ref()} before the MBA, salaries converted to US dollars at the ECB rate of ${K.day(K.FX_DATE)}.`)}
<p>${pos === T.length ? 'Every ranked program' : `${pos} of the ${T.length} ranked programs`} show${pos === 1 ? 's' : ''} a positive ten-year value for the reference person. Salaries are lower than at the American two-year schools, so a shorter program does not automatically pay back faster: ${fa && ft && two ? `${a.short} saves ${K.usd(ft.forgone - fa.forgone)} of forgone salary compared with ${two.short}, but its reported salary is ${a.salary !== null && two.salary !== null ? (a.salary < two.salary ? 'lower' : 'not lower') : 'different'}, and the payback is ${a.payback === null ? 'over thirty years' : K.yrs(a.payback)} against ${two.payback === null ? 'over thirty years' : K.yrs(two.payback)}.` : 'the lower salary eats part of the saving.'}</p>
<h2>The salary you earn today decides</h2>
<p>The reference person is an assumption, and the comparison with a two-year program turns on it. A higher current salary works in two directions. It raises the pay given up, ${two ? `which costs a ${K.s(two.slug).months}-month student at ${two.short} more than a ${K.s(a.slug).months}-month one at ${a.short}` : 'which costs a two-year student more than a one-year one'}. It also shrinks the gain after graduation, and that hurts most where the reported salary is closest to what you earn now. ${npvHiA && npvHiT && two ? `At ${K.usd(HIGH)} today, the ten-year value is ${K.usd(npvHiA.npv)} for ${h.sc(a.slug)} and ${K.usd(npvHiT.npv)} for ${h.sc(two.slug)}; at ${K.ref()}, it is ${a.npv === null ? 'not computable' : K.usd(a.npv)} and ${two.npv === null ? 'not computable' : K.usd(two.npv)}. ${npvHiA.npv > npvHiT.npv ? 'At the higher salary the short program comes out ahead, because the year of pay it saves outweighs its lower salary.' : 'Even at the higher salary the two-year school stays ahead here, because its graduates report a salary far enough above the current one to repay the longer absence' + (a.salary !== null && a.salary < HIGH ? ', while the short program\'s reported salary sits below it.' : '.')}` : ''} A short program pays off best for someone whose current salary is clearly below what its graduates earn, which the finder above shows once you type your own figure.</p>
${h.miniTwo(a.slug, b.slug)}
<h2>No summer, no trial run</h2>
<p>What a one-year program removes is the internship between the two years. In American two-year programs, the summer is the main route into consulting, banking and many technology roles: a ten-week trial that ends with a full-time offer. A one-year student recruits for a full-time job from the first weeks, while learning finance and strategy at the same time. That suits a candidate who stays in an industry, comes back to a sponsor or changes function inside a familiar sector. It is harder for a full career switch, and harder still in a country where the student needs a new work permit. The ${h.a('best-mba-europe', 'Europe ranking')} shows where the graduates of the many European short programs end up.</p>
<h2>Short programs outside the table</h2>
<p>${noSal.length ? `${K.listOf(noSal.map((u) => `${h.sc(u.slug)} (${K.p(u.share!)} employed)`))} publish an employment rate but no salary we can use.` : ''} ${noLiv.length ? `${K.listOf(noLiv.map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))} publish a salary but no student living budget, so the total cost and the payback stay open.` : ''} ${absent.length ? `${absent.length > 6 ? `${absent.slice(0, 6).map((s) => h.sc(s.slug)).join(', ')} and ${absent.length - 6} others` : K.listOf(absent.map((s) => h.sc(s.slug)))} run programs of 13 months or less without an employment rate for the whole class in a form we can rank.` : ''} Several of them still rank on industry or region pages, where only the line for that goal is needed.</p>
<h2>What the ranking leaves to you</h2>
<p>A school's length in months is the taught program; some add a project period or an optional exchange that extends it, and the school page says so. The employment rate counts graduates who looked for a job, often within three months of the end of the program, so a short program's graduates are counted sooner after the start than a two-year class. Visa rules for staying after a short degree differ by country. Use the table to shortlist, then check the ${h.a('mba-payback-calculator', 'payback calculator')} with your own salary and any loan.</p>
${h.mini('forgone')}`,
  tool: 'finder',
  toolArgs: { goal: 'all', length: 'one' },
  related: ['best-mba-programs', 'best-mba-europe', 'mba-payback-calculator', 'mba-finder', `school:${a.slug}`],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: [a.slug, b.slug, c.slug],
});
