import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'nyu-stern';
const s = K.s(slug);
const o = K.roi(slug)!;
const ord = (n: number) => (n === 1 ? 'first' : `number ${n}`);
const ib = s.emp.segments.find((x) => x.key === 'ib')!;
const ibOf = (x: typeof s) => x.emp.segments.find((g) => g.key === 'ib')?.pct ?? 0;
const ibAbove = K.schools.filter((x) => x.slug !== slug && ibOf(x) > ib.pct!).length;
const ibNext = [...K.schools].filter((x) => x.slug !== slug).sort((a, b) => ibOf(b) - ibOf(a))[0];
const livAbove = K.schools.filter((x) => x.slug !== slug && (K.c(x.slug).living ?? 0) > K.c(slug).living!).length;
const totAbove = K.withRoi().filter((x) => x.slug !== slug && (K.costRaw(x.slug) ?? 0) > o.total).length;
const rkIb = K.rank(slug, 'ib'), rkF = K.rank(slug, 'finance'), rkAll = K.rank(slug, 'all');
const small = s.emp.segments.filter((g) => g.key !== 'ib');
const allSmall = small.length > 0 && small.every((g) => (g.pct ?? 0) < 2);
const peers = K.withRoi().filter((x) => x.slug !== slug && x.emp.salary?.usd === s.emp.salary!.usd && (K.roi(x.slug)!.payback ?? 99) < (o.payback ?? 99) && (K.c(x.slug).living ?? 0) < K.c(slug).living!).map((x) => x.slug).slice(0, 2);
const fn = (label: string) => s.emp.functions.find((f) => f.label === label);
const mgmt = fn('Consulting - Management');
const hires = (n: string) => s.emp.employers.find((e) => e.name === n)?.hires ?? null;
const jpm = hires('J.P. Morgan'), mck = hires('McKinsey & Company'), gs = hires('Goldman Sachs & Co.');

export default defineSchool({
  slug,
  title: 'NYU Stern MBA 2026: Banking Jobs, New York Cost, Payback',
  description: `NYU Stern MBA 2026: ${K.direct(slug)} for two years in New York, a ${K.salary(slug)} median base salary, ${K.p(ib.pct!)} of graduates in investment banking, and the payback for you.`,
  intro: `${K.p(ib.pct!)} of NYU Stern's class of 2025 went into investment banking${ibAbove === 0 ? ', the largest share of any school in our data' : ''}, on a two-year New York bill of ${K.direct(slug)}.`,
  resume: `The NYU Stern full-time MBA costs ${K.direct(slug)} for two years in tuition, fees and the school's cost-of-attendance budget for New York, before the salary you give up. Tuition is ${K.money(s.tuition!.v / 2, 'USD')} a year, the same rate for first- and second-year students in 2026-27, counted for both years. For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)} and bring the total to ${K.usd(o.total)}${totAbove === 0 ? ', the highest total of any school we can price' : ''}. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)} and a median signing bonus of ${K.money(s.emp.bonus!.v, 'USD')}. On the salary, the model repays the cost ${K.payback(slug)} after graduation, with a ten-year net present value of ${K.npv(slug)}. What sets Stern apart is Wall Street: ${K.p(ib.pct!)} of graduates took investment banking jobs at ${K.money(ib.salary!, 'USD')}, and ${K.share(slug, 'finance')} of the class went into financial services in all.`,
  body: (h) => `<h2>The banking school</h2>
<p>${ibAbove === 0 ? `No school in our data sends a larger share of its class into investment banking than Stern's ${K.p(ib.pct!)}${ibNext ? `; the next is ${h.sc(ibNext.slug)} at ${K.p(ibOf(ibNext))}` : ''}.` : `Stern sends ${K.p(ib.pct!)} of its class into investment banking, behind ${ibAbove} other ${ibAbove === 1 ? 'school' : 'schools'} in our data.`} ${jpm !== null && gs !== null ? `J.P. Morgan hired ${K.num(jpm)} graduates and Goldman Sachs ${K.num(gs)}. ` : ''}${rkIb ? `On share, salary and ten-year value, Stern ranks ${ord(rkIb.rank)} of ${rkIb.of} in our ${h.a('best-mba-investment-banking', 'investment banking ranking')}` : ''}${rkF ? ` and ${ord(rkF.rank)} of ${rkF.of} for finance as a whole` : ''}. The banking median equals the school median, ${K.money(ib.salary!, 'USD')}, so the payback for a banker is the same ${K.payback(slug, 'ib')} as the headline.${allSmall ? ` Private equity, venture capital and asset management are small at Stern, ${K.listOf(small.map((g) => K.p(g.pct!)))} of the class.` : ''}</p>
<p>Consulting is nearly as large as finance: ${K.share(slug, 'consulting')} of graduates at ${K.segSalary(slug, 'consulting')}${mgmt ? `, with management consulting roles alone at ${K.p(mgmt.pct!)}${mgmt.salary ? ` and a ${K.money(mgmt.salary, 'USD')} median` : ''}` : ''}${mck !== null ? `; McKinsey hired ${K.num(mck)}` : ''}. Technology took ${K.share(slug, 'tech')} at ${K.segSalary(slug, 'tech')}.</p>
${h.miniGoal(slug)}
<h2>What New York adds to the bill</h2>
<p>The ${K.living(slug)} living budget covers two nine-month academic years of rent, food, books, transport, personal costs, health insurance and loan fees. ${livAbove === 0 ? 'It is the largest living budget of any school in our data' : `Only ${livAbove} ${livAbove === 1 ? 'school' : 'schools'} in our data publish a larger one`}, and it does not cover the summer, the time of the internship, whose pay the school reports by the week rather than by the month. The calculator subtracts nothing for that internship, so the total above is a cautious one. Merit scholarships go to a minority of admitted two-year students, most of them full or half tuition, according to the school; ${s.tuition!.v > o.forgone ? 'a full-tuition award removes the largest line of the bill, larger even than the salary given up by the reference person.' : 'a full-tuition award removes the second largest line of the bill.'}</p>
<h2>Staying in the Northeast</h2>
<p>${K.share(slug, 'z-us')} of graduates who took a job stayed in the United States, the great majority of them in the Northeast and New York. For an international student, the school's three-year figures show that most graduates without American work authorization also stayed in the country, many in the city. That makes Stern a direct route into the New York job market, and a long detour for anyone who plans to work in Europe or Asia right after the degree. ${rkAll ? `On the overall model, Stern ranks ${ord(rkAll.rank)} of ${rkAll.of}.` : ''}</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the NYU Stern MBA cost?', a: `Tuition, fees and the school's New York budget come to ${K.direct(slug)} for the two years, at the 2026-27 rates counted twice. Counting the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)}. The budget covers two nine-month academic years; the summer internship between them, which the school reports as weekly pay, is not subtracted here.` },
    { q: 'How many NYU Stern graduates go into investment banking?', a: `In the class of 2025, ${K.p(ib.pct!)} of graduates went into investment banking at a ${K.money(ib.salary!, 'USD')} median base salary${ibAbove === 0 ? ', the largest share of any school in our data' : ''}. ${jpm !== null ? `J.P. Morgan alone hired ${K.num(jpm)} of them. ` : ''}Financial services as a whole took ${K.share(slug, 'finance')} of the class, counting commercial banking, insurance and the small buy-side groups.` },
    { q: 'What is the median salary after NYU Stern?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}, with a median signing bonus of ${K.money(s.emp.bonus!.v, 'USD')}. ${K.segSalary(slug, 'consulting') === K.money(ib.salary!, 'USD') ? `Consulting and banking both paid ${K.segSalary(slug, 'consulting')}` : `Consulting paid ${K.segSalary(slug, 'consulting')} and banking ${K.money(ib.salary!, 'USD')}`}, technology ${K.segSalary(slug, 'tech')}. The usable salary data came from ${K.p(s.emp.response!)} of graduates who accepted an offer within three months, so the median rests on most of the class.` },
    { q: 'How long does it take to pay back an NYU Stern MBA?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax. ${peers.length ? `${K.listOf(peers.map((x) => K.s(x).short))} ${peers.length === 1 ? 'reports' : 'report'} the same median with a smaller living budget and ${peers.length === 1 ? 'repays' : 'repay'} sooner. Signing bonuses are not counted in either case.` : 'The New York living budget weighs on that result.'}` },
  ],
  related: ['school:columbia', 'school:wharton', 'school:chicago-booth', 'best-mba-investment-banking', 'finance-investment-banking', 'best-mba-finance'],
});
