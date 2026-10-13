import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const CASES = ['wharton', 'insead', 'texas-mccombs'];
const LEVELS = [60000, 100000, 150000];
const pb = (y: number | null) => (y === null ? 'over 30 years' : K.yrs(y));
const grid = CASES.map((slug) => ({ slug, at: LEVELS.map((s0) => K.roi(slug, 'all', s0)) }));
/** Current salary at which the ten-year NPV reaches zero (bisection on the kit's model). */
const breakEven = (slug: string) => {
  if (!K.roi(slug)) return null;
  let lo = 0, hi = 600000;
  if ((K.roi(slug, 'all', lo)?.npv ?? -1) < 0) return null;
  for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (K.roi(slug, 'all', mid)!.npv >= 0) lo = mid; else hi = mid; }
  return Math.round(lo / 1000) * 1000;
};
const be = Object.fromEntries(CASES.map((s) => [s, breakEven(s)]));
const all = K.withRoi();
const neg = all.filter((s) => K.roi(s.slug)!.npv < 0);
const negHigh = all.filter((s) => K.roi(s.slug, 'all', LEVELS[2])!.npv < 0);
const W = K.roi('wharton')!;
const I = K.roi('insead')!;
const T = K.roi('texas-mccombs');
const cell = (o: ReturnType<typeof K.roi>) => (o ? `${pb(o.payback)} / ${K.usd(o.npv)}` : 'n/a');
const consShare = K.share('insead', 'consulting');
const everyHigh = negHigh.length === all.length;
const highTxt = everyHigh ? `every one of the ${all.length} schools we model ends ten years below zero` : `${negHigh.length} of the ${all.length} schools we model end ten years below zero`;
const wPos = grid[0].at.filter((o) => o && o.npv >= 0).length;

export default definePage({
  id: 'is-an-mba-worth-it',
  group: 'tools',
  order: 5,
  slug: 'is-an-mba-worth-it',
  nav: 'Is an MBA worth it?',
  card: 'Three questions and the numbers for your salary: placement, payback, and whether ten years leave you ahead.',
  title: 'MBA Worth It in 2026? Payback at Three Salary Levels',
  description: `Is an MBA worth it in 2026? Worked cases at three salaries for ${K.s('wharton').short}, ${K.s('insead').short} and ${K.s('texas-mccombs').short}, the salary where it stops paying back, and your own result.`,
  h1: 'Is an MBA worth it? The answer depends on what you earn now',
  intro: `For a ${K.ref()} earner, ${neg.length} of the ${all.length} schools we can model end ten years below zero; at ${K.usd(LEVELS[2])}, ${everyHigh ? 'all of them do' : `${negHigh.length} do`}.`,
  resume: `An MBA is worth it when three things hold: the school places a real share of its class where you want to go, the salary it reports is well above yours, and you can carry the cost until the gap repays it. The model on this site tests the last two for ${all.length} schools. For someone earning ${K.usd(LEVELS[0])} today, ${K.s('wharton').short} repays its ${K.usd(grid[0].at[0]?.total ?? W.total)} total ${pb(grid[0].at[0]?.payback ?? null)} after graduation. At ${K.usd(LEVELS[1])}, the same degree takes ${pb(grid[0].at[1]?.payback ?? null)}; at ${K.usd(LEVELS[2])}, ${pb(grid[0].at[2]?.payback ?? null)}. ${K.s('insead').short}, shorter and cheaper, reports a lower salary, so its ten-year value turns negative from a current salary of about ${be.insead ? K.usd(be.insead) : 'a level the model cannot find'}. Above roughly ${be.wharton ? K.usd(be.wharton) : 'the top of the range'}, even ${K.s('wharton').short} no longer pays back within ten years on salary alone, and the case rests on a change of career the figures cannot price.`,
  faqs: [
    { q: 'Is an MBA worth it if I already earn a high salary?', a: `Less often. Each extra dollar earned now is a dollar given up during the program and a smaller gap afterwards. At ${K.usd(LEVELS[2])}, ${highTxt}. Past about ${be.wharton ? K.usd(be.wharton) : 'that level'}, even ${K.s('wharton').short}, the top school of our ranking, stops paying back within ten years on salary alone.` },
    { q: 'Is a one-year MBA like INSEAD worth it compared with a two-year program?', a: `It costs less: ${K.usd(I.total)} in total for a ${K.ref()} earner against ${K.usd(W.total)} at ${K.s('wharton').short}, because ten months away cost less than 21. Its graduates also report less, a ${K.salaryKind('insead')} of ${K.salary('insead')}, so its ten-year value is ${K.usd(I.npv)} against ${K.usd(W.npv)}. Below about ${be.insead ? K.usd(be.insead) : 'a modest salary'}, INSEAD comes out positive.` },
    { q: 'Is an MBA worth it for a career switch?', a: `This is where the averages help least and the degree helps most. A switch into consulting or banking runs through on-campus recruiting, and the share placed tells you whether the path is real: ${consShare ? `${consShare} of INSEAD's class went into consulting` : 'INSEAD publishes its consulting share'}. The payback then compares the new salary with the one you would have kept in your old field.` },
    { q: 'At what salary does an MBA stop being worth it financially?', a: `In our model, the ten-year value of ${K.s('texas-mccombs').short} reaches zero at a current salary of about ${be['texas-mccombs'] ? K.usd(be['texas-mccombs']) : 'a level we cannot compute'}, ${K.s('wharton').short} at ${be.wharton ? K.usd(be.wharton) : 'a level we cannot compute'} and ${K.s('insead').short} at ${be.insead ? K.usd(be.insead) : 'a level we cannot compute'}. Those points assume you land the reported salary, raises of ${Math.round(K.MODEL.g1 * 100)}% with the degree and ${Math.round(K.MODEL.g0 * 100)}% without, and no scholarship.` },
    { q: 'Does a scholarship change whether an MBA is worth it?', a: 'Directly, since it comes off the total cost in our model, dollar for dollar. It matters most at schools whose ten-year value is close to zero for you: there, a scholarship covering a fifth of tuition can move the result from negative to positive. At schools far above zero, it shortens the payback but rarely changes the decision.' },
  ],
  body: (h) => `<h2>Question one: does the school send people where you want to go?</h2>
<p>No return calculation matters if the path you want does not run through the school. A program that places a large share of its class in consulting, or keeps most of its graduates in the country you want to live in, is a pipeline; one that places a few percent there leaves you to search on your own. The ${h.a('mba-finder', 'finder')} ranks schools on that share for each industry, finance segment and region. Start there, keep five or six names, and only then look at money.</p>
<h2>Question two: is the gap big enough for your salary?</h2>
<p>The calculator above tests this on any school. To show how strongly the answer depends on your starting point, here are three schools at three current salaries, with the same assumptions as everywhere on this site: the salary the school reports, raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, a ${Math.round(K.MODEL.r * 100)}% discount rate, no tax and no scholarship.</p>
${h.table(['School', ...LEVELS.map((s) => `Earning ${K.usd(s)} today`), 'NPV reaches zero at'], grid.map((g) => [h.sc(g.slug), ...g.at.map(cell), be[g.slug] ? K.usd(be[g.slug]!) : 'n/a']), 'Payback after graduation / ten-year net present value, for three current salaries. US dollars at the ECB rate of the build.', ['l', 'r', 'r', 'r', 'r'])}
<p>${K.s('wharton').short} reports a ${K.salaryKind('wharton')} of ${K.salary('wharton')}, among the highest we read, and ${wPos === LEVELS.length ? 'stays positive at every level shown' : wPos === 0 ? 'is negative at every level shown' : `stays positive at the ${wPos === 1 ? 'lowest level' : 'two lower levels'} and turns negative at ${K.usd(LEVELS[wPos])}`}. ${T ? `${K.s('texas-mccombs').short} costs ${K.usd(T.total)} for the reference person, less than ${K.s('wharton').short}'s ${K.usd(W.total)}, and its ${K.salaryKind('texas-mccombs')} of ${K.salary('texas-mccombs')} keeps it above zero until a current salary of about ${be['texas-mccombs'] ? K.usd(be['texas-mccombs']) : 'a level we cannot compute'}.` : ''} ${K.s('insead').short} is the sharpest case: a short program with a moderate salary, positive for someone coming from a lower-paid job or a lower-wage country, and negative for someone who already earns close to what its graduates report.</p>
${h.miniPayback('insead')}
<h2>Question three: can you carry the cost until it pays back?</h2>
<p>A positive ten-year value does not pay the rent during the program. The total cost falls in the first one or two years, while the gains arrive over the next five to ten. Someone financing ${K.usd(W.total)} at ${K.s('wharton').short} needs savings, a loan or a sponsor for the months of study and for the first years of repayment. Loan interest adds to the cost and lengthens the payback; the ${h.a('mba-payback-calculator', 'payback calculator with a loan')} shows by how much.</p>
<h2>When the MBA does not pay back</h2>
<p>${neg.length} of the ${all.length} schools we can model end ten years below zero for a ${K.ref()} earner, and ${everyHigh ? 'all of them' : negHigh.length} at ${K.usd(LEVELS[2])}. The pattern is the same in every case: the school reports a salary not far above what the applicant already earns, so the yearly gain is too small to cover a cost that includes one or two years of pay. That does not make those programs bad. It means the reason to go has to be something the salary line misses: a move to another country, a switch out of a shrinking industry, a network in a region, or a job that requires the degree.</p>
<p>Two figures should make you pause. If the hiring rate within three months is low, the reported salary describes a smaller group than it seems. If you earn more than the salary the school reports, every year after graduation shows a loss in the model, and only a different career path can change that. Run your own numbers in the tool, then check the ${h.a('mba-roi', 'ROI ranking')} for schools that fit your salary better.</p>
${h.mini('forgone')}`,
  tool: 'worth',
  toolArgs: { school: 'insead' },
  related: ['mba-roi', 'mba-cost', 'mba-payback-calculator', 'mba-scholarships', 'school:insead', 'school:wharton'],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: ['wharton', 'insead', 'texas-mccombs'],
});
