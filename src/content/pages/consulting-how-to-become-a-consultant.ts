import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

// The MBA route into consulting, costed with our model for three current salaries.
const t = K.top('consulting', 10);
const t1 = t[0];
const one = 'insead';
const SALARIES = [60000, 90000, 150000];
const route = (slug: string) => SALARIES.map((s0) => ({ s0, o: K.roi(slug, 'consulting', s0) }));
const rUs = route(t1.slug);
const rOne = route(one);
const ins = K.roi(one, 'consulting')!;
const us = K.roi(t1.slug, 'consulting')!;
const bls = K.P.bls.occupations['131111'];
const yr = (o: { payback: number | null } | null) => (o === null ? 'n/a' : o.payback === null ? 'over 30 years' : K.yrs(o.payback));
const placedTop = t.reduce((a, x) => a + (x.placed ?? 0), 0);
// BLS Occupational Outlook Handbook, Management Analysts, read on 2026-10-13 (source bls_ooh_ma):
// typical entry-level education "Bachelor's degree"; about 94,100 openings a year projected over the decade.
const OOH = { openings: 94100 };

export default definePage({
  id: 'consulting-how-to-become-a-consultant',
  group: 'consulting',
  order: 14,
  slug: 'consulting/how-to-become-a-consultant',
  nav: 'How to become a consultant',
  card: 'The three routes into management consulting, the MBA route year by year and what it costs for your salary.',
  title: 'Becoming a Consultant 2026: Routes In and the MBA Cost',
  description: `How to become a management consultant in 2026: the undergraduate, MBA and experienced-hire routes, the MBA timeline, and a payback of ${yr(us)} at ${t1.short}.`,
  h1: 'How to become a consultant: three routes, and what the MBA one costs',
  intro: `There are three doors into consulting: straight from a first degree, through an MBA, or as an experienced hire; the MBA door at ${t1.short} leads ${K.p(t1.share)} of its class into consulting.`,
  resume: `To become a management consultant you enter through one of three routes. Most firms hire graduates of a first degree as analysts; the BLS gives a bachelor's degree as the typical entry-level education for management analysts, whose median pay was ${K.usd(bls.median)} in ${K.P.bls.period}. The second route is the MBA, which leads to the consultant or associate level after a summer internship: the ten schools at the top of our consulting ranking placed about ${K.num(placedTop)} graduates in consulting in their last class, ${K.p(t1.share)} of the class at ${t1.short}. The third is the experienced hire, for people with deep expertise in an industry or function. The MBA route costs the most. For a person earning ${K.ref()} today, the total cost with salary given up is ${K.usd(us.total)} at ${t1.short}, repaid in ${yr(us)} on its consulting salary, against ${K.usd(ins.total)} and ${yr(ins)} at ${K.s(one).short}, a one-year program. The higher your salary today, the longer the payback.`,
  faqs: [
    { q: 'Can you become a management consultant without an MBA?', a: `Yes. The large firms hire most of their junior staff from undergraduate programs, and the BLS lists a bachelor's degree as the typical entry-level education for management analysts. Experienced professionals also join without an MBA when they bring industry or technical expertise. The MBA helps most when you need to change industry or country, or to enter above the analyst level.` },
    { q: 'How long does it take to become a consultant through an MBA?', a: `Allow most of a year to prepare the GMAT or GRE and apply, then the program itself, ${K.months(t1.slug)} months at ${t1.short} or ${K.months(one)} at ${K.s(one).short}. In a two-year program, recruiting for the summer internship starts in the first year and the full-time offer usually follows the internship. One-year programs recruit directly for full-time roles.` },
    { q: 'Is an MBA worth it to become a consultant if I already earn a high salary?', a: `It depends on how much you give up. On our model, the payback at ${t1.short} on its consulting salary is ${yr(rUs[0].o)} for someone earning ${K.usd(SALARIES[0])} today and ${yr(rUs[2].o)} for someone earning ${K.usd(SALARIES[2])}. Above a certain salary the consulting base after the MBA adds little, and the time to repay stretches.` },
    { q: 'Which MBA programs send the most graduates into consulting?', a: `In our consulting ranking, which weighs the share of the class placed, the consulting salary and the ten-year value, ${K.listOf(t.slice(0, 3).map((x) => x.short))} come first, with ${K.listOf(t.slice(0, 3).map((x) => K.p(x.share)))} of their classes in consulting. Larger schools send more graduates in total with a smaller share; the ranking page shows both.` },
    { q: 'How do experienced hires get into consulting firms?', a: 'Through a separate track. Firms recruit doctors, engineers, data scientists, bankers and industry managers into expert or consultant roles where their knowledge is the asset. They usually go through case interviews adapted to their field, plus interviews on their expertise. Pay and title depend on seniority. This route skips the MBA but requires a deep, scarce specialty.' },
  ],
  body: (h) => `<h2>Three routes into consulting</h2>
<p><strong>From a first degree.</strong> The large firms hire most of their junior staff straight out of university, as business analysts or associates. They recruit on campus at a set of universities, test with online assessments and ${h.a('consulting-case-interview', 'case interviews')}, and expect strong grades. For the occupation as a whole, the BLS handbook gives a bachelor's degree as the typical entry-level education and projects about ${K.num(OOH.openings)} openings a year for management analysts over the decade, most of them outside the strategy firms.</p>
<p><strong>Through an MBA.</strong> Graduates join one level up, as consultants or associates, after a summer internship in a two-year program or direct recruiting in a one-year one. It is the main route for people who did something else first: engineers, officers, teachers, people from countries where the firms recruit little at university level. It is also the most expensive route, which the rest of this page costs.</p>
<p><strong>As an experienced hire.</strong> Firms hire specialists into expert tracks and, increasingly, into consultant roles: doctors for health practices, engineers for energy or industrials, data scientists for analytics. These hires skip the MBA, but they need expertise the firm sells, and they are interviewed on it.</p>
<p>A fourth path runs through the ${h.a('consulting-big-4-consulting', 'Big 4 consulting arms')} or a specialist firm, and later a move to a strategy firm. It works, but the move is easier at the MBA point than later.</p>
<h2>The MBA route, year by year</h2>
<p><strong>Year before.</strong> Prepare the GMAT or GRE, choose schools by their consulting share, and apply. The share matters more than the name: a school placing a third of its class in consulting has firms on campus every week of the autumn.</p>
<p><strong>First autumn.</strong> Firm presentations, coffee chats, networking with alumni of the offices you want. Case practice starts at once; the ${h.a('consulting-case-interview-examples', 'case examples')} and ${h.a('consulting-market-sizing', 'market sizing drills')} on this site are written for that stage.</p>
<p><strong>First winter.</strong> Interviews for the summer internship, usually in more than one round.</p>
<p><strong>Summer.</strong> The internship, which our model counts as about ${K.num(K.MODEL.internMonths, 1)} months, works as a long interview and ends with a decision on a full-time offer.</p>
<p><strong>Second year.</strong> With an offer in hand, the second year is study; without one, a second recruiting season in the autumn, with fewer places. One-year programs squeeze all of this into a few months and recruit directly for full-time roles.</p>
${h.mini('forgone')}
<h2>Which schools the route runs through</h2>
<p>Our ranking for consulting weighs the share of the class hired in the industry, the consulting salary and the ten-year value of the degree. The ten schools at the top placed about ${K.num(placedTop)} graduates in consulting in their last report.</p>
${h.rankTable('consulting', 10)}
<p>The table favors mid-sized American programs, where consulting takes the largest share of the class. Outside the United States, ${h.sc('insead')} sends ${K.share('insead', 'consulting')} of its class into consulting and ${h.sc('lbs')} ${K.share('lbs', 'consulting')}, in one and two years of study. ${h.a('best-mba-consulting', 'The full consulting ranking')} lists every school, with the reason some are not ranked.</p>
<h2>What the MBA route costs, for three salaries</h2>
<p>The cost of an MBA is tuition, fees and living costs plus the salary you stop earning, minus the internship. The payback below uses each school's consulting salary and our model's assumptions: raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the MBA and ${Math.round(K.MODEL.g0 * 100)}% without, before tax.</p>
${h.table(['Salary today', `${t1.short}: total cost`, `${t1.short}: payback`, `${K.s(one).short}: total cost`, `${K.s(one).short}: payback`], SALARIES.map((s0, i) => [K.usd(s0), rUs[i].o ? K.usd(rUs[i].o!.total) : 'n/a', yr(rUs[i].o), rOne[i].o ? K.usd(rOne[i].o!.total) : 'n/a', yr(rOne[i].o)]), `Total cost with the salary given up and payback on the consulting salary each school reports, our model, US dollars at the ECB rate of ${K.day(K.FX_DATE)}.`, ['r', 'r', 'r', 'r', 'r'])}
<p>Two patterns stand out. The one-year program costs less in salary given up, but ${K.s(one).short} reports a lower consulting salary than the American schools, ${K.segSalary(one, 'consulting')} against ${K.segSalary(t1.slug, 'consulting')} at ${t1.short}, so its payback is ${SALARIES.every((_, i) => (rOne[i].o?.payback ?? 99) > (rUs[i].o?.payback ?? 99)) ? 'longer at each of the three salaries' : SALARIES.every((_, i) => (rOne[i].o?.payback ?? 99) < (rUs[i].o?.payback ?? 99)) ? 'shorter at each of the three salaries' : 'shorter at some salaries and longer at others'}. And for both, the payback lengthens as your current salary rises, because you give up more and the consulting salary after the degree does not move. Someone already earning close to the post-MBA figure gains little in pay and should weigh the route on the change of career it buys.</p>
<p>The calculator at the top of the page is set on ${K.s(one).short} for consulting; change the school or type your own salary to cost your route. The ${h.a('consulting', 'consulting rubric')} covers the job itself, and ${h.a('consulting-consultant-salary', 'consultant salary')} what the profession pays outside the MBA route.</p>`,
  tool: 'roi',
  toolArgs: { school: 'insead', goal: 'consulting' },
  related: ['best-mba-consulting', 'consulting', 'consulting-case-interview', 'school:insead', 'mba-roi'],
  sources: ['bls_ooh_ma', 'bls_oews', 'mbacsea', 'gmac', 'ecb_fx'],
  schoolSources: [t1.slug, 'insead', 'lbs'],
});
