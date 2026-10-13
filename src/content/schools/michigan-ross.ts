import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'michigan-ross';
const s = K.s(slug);
const o = K.roi(slug)!;
const ord = (n: number) => (n === 1 ? 'first' : `number ${n}`);
const rkCon = K.rank(slug, 'consumer'), rkHc = K.rank(slug, 'healthcare'), rkC = K.rank(slug, 'consulting'), rkAll = K.rank(slug, 'all');
const fn = (label: string) => s.emp.functions.find((f) => f.label === label);
const brand = fn('Marketing/Sales - Brand/Product Management');
const gm = fn('General Management');
const ibf = fn('Finance - Investment Banking');
const ops = fn('Operations/Logistics');
const finF = fn('Finance (total)');
const hires = (n: string) => s.emp.employers.find((e) => e.name === n)?.hires ?? null;
const bcg = hires('Boston Consulting Group'), mck = hires('McKinsey & Co.');
const yearRate = s.tuition!.v / s.tuition!.mult;
const oldRates = /2025-26/.test(s.tuition!.cohort);

export default defineSchool({
  slug,
  title: 'Michigan Ross MBA 2026: Consumer Jobs, Cost and Payback',
  description: `Michigan Ross MBA 2026: ${K.direct(slug)} for two years in Ann Arbor, Michigan, a ${K.salary(slug)} median base salary, ${K.share(slug, 'consulting')} in consulting, and the payback for your own salary.`,
  intro: `${rkCon?.rank === 1 ? 'First in our consumer goods ranking' : 'A large consumer goods pipeline'}, ${K.share(slug, 'consulting')} of the class in consulting, and a ${K.salary(slug)} median base salary for the Michigan Ross class of 2025.`,
  resume: `Two years of the Michigan Ross full-time MBA cost ${K.direct(slug)} in tuition, fees and the school's living budget at the rate for non-Michigan residents and international students, before the salary you stop earning. ${oldRates ? `These are the ${s.tuition!.cohort} rates, the latest the school's page showed when we read it, counted for both years, so the bill for an entering student may be higher.` : ''} For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)} and the total reaches ${K.usd(o.total)}. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, and ${K.p(s.emp.bonus!.pct!)} received a signing bonus with a median of ${K.money(s.emp.bonus!.v, 'USD')}. On the salary alone, the model repays the total ${K.payback(slug)} after graduation, with a ten-year net present value of ${K.npv(slug)}. What sets Ross apart is the range of the class: ${K.share(slug, 'consulting')} in consulting, ${K.share(slug, 'consumer')} in consumer goods and retail and ${K.share(slug, 'healthcare')} in healthcare.`,
  body: (h) => `<h2>The consumer goods pipeline</h2>
<p>${rkCon ? `Ross ranks ${ord(rkCon.rank)} of ${rkCon.of} schools in our consumer goods ranking` : 'Ross sends a large share of its class into consumer goods'}, on ${K.share(slug, 'consumer')} of graduates in packaged goods and retail. The function table explains how: ${brand ? `${K.p(brand.pct!)} of the class took brand or product management roles${brand.salary ? ` at a ${K.money(brand.salary, 'USD')} median` : ''}` : 'brand management is a large function'}, the usual entry into packaged goods companies. That salary sits well below the consulting median of ${K.segSalary(slug, 'consulting')}, so a brand manager repays the degree later than a consultant: test the brand figure in the calculator rather than the school median.</p>
<p>Healthcare is the other unusual line, ${K.share(slug, 'healthcare')} of the class at ${K.segSalary(slug, 'healthcare')}${rkHc ? `, ${ord(rkHc.rank)} of ${rkHc.of} in our healthcare ranking` : ''}. General management took ${gm ? K.p(gm.pct!) : 'a large share'} of graduates${gm && finF && gm.pct! > finF.pct! ? `, more than finance as a function at ${K.p(finF.pct!)}` : ''}, and operations ${ops ? K.p(ops.pct!) : 'a smaller share'}.</p>
${h.miniGoal(slug)}
<h2>Consulting and banking still lead</h2>
<p>None of this makes Ross a small consulting school. ${K.share(slug, 'consulting')} of the class went into the industry at ${K.segSalary(slug, 'consulting')}${bcg !== null && mck !== null ? `, with Boston Consulting Group and McKinsey hiring ${bcg === mck ? `${K.num(bcg)} graduates each` : `${K.num(bcg)} and ${K.num(mck)} graduates`}` : ''}${rkC ? `, which puts the school ${ord(rkC.rank)} of ${rkC.of} in our consulting ranking` : ''}. On the consulting median, the reference person repays the full cost ${K.payback(slug, 'consulting')} after graduation. Ross reports finance by function rather than by segment: ${ibf ? `investment banking took ${K.p(ibf.pct!)} of graduates${ibf.salary ? ` at ${K.money(ibf.salary, 'USD')}` : ''}` : 'investment banking is its largest finance function'}. ${K.share(slug, 'z-us')} of graduates took a job in the United States, with the Midwest, the New York area and the West Coast the main destinations. International students who want to work at home afterwards will find few precedents in this report.</p>
<h2>Reading the cost lines</h2>
<p>Tuition is ${K.money(yearRate, 'USD')} a year for non-residents; Michigan residents pay less. The ${K.living(slug)} living figure is the school's estimate for one academic year in Ann Arbor, counted twice, and it shows no line for transport or health insurance; students on F or J visas also pay an extra service fee each term on top of the fees counted here. Expect the real budget to land above it, and add both before trusting the payback below. Choosing Ross for consumer goods also means typing the brand management median into the salary field: the gap with the school median is the price of that path. ${rkAll ? `On the overall model, Ross ranks ${ord(rkAll.rank)} of ${rkAll.of}.` : ''}</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the Michigan Ross MBA cost for two years?', a: `At the ${s.tuition!.cohort} rates for non-residents, tuition, fees and the school's living budget come to ${K.direct(slug)} for two years. Counting the salary you give up, a person earning ${K.ref()} reaches a total of ${K.usd(o.total)}. Michigan residents pay a lower tuition rate, and a later intake will pay the rates set for its own years.` },
    { q: 'What is the median salary after a Michigan Ross MBA?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}. Consulting paid ${K.segSalary(slug, 'consulting')} and financial services ${K.segSalary(slug, 'finance')}, while healthcare paid ${K.segSalary(slug, 'healthcare')}. ${K.p(s.emp.bonus!.pct!)} of graduates received a signing bonus, with a median of ${K.money(s.emp.bonus!.v, 'USD')}, which the payback here does not count. These figures describe graduates who accepted a job and reported pay.` },
    { q: 'Is Michigan Ross a good MBA for consumer goods and marketing?', a: `On the reports we read, yes: ${K.share(slug, 'consumer')} of the class of 2025 joined consumer goods or retail${rkCon ? `, ${ord(rkCon.rank)} of ${rkCon.of} schools in our consumer ranking` : ''}. ${brand ? `${K.p(brand.pct!)} took brand or product management roles${brand.salary ? ` at a ${K.money(brand.salary, 'USD')} median` : ''}, ` : ''}below the school-wide ${K.salary(slug)}, so the payback on that path is longer.` },
    { q: 'How long does a Michigan Ross MBA take to pay back?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school median, and ${K.payback(slug, 'consulting')} on a consulting salary. The model assumes raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax, and does not count the signing bonus.` },
  ],
  related: ['school:kellogg', 'school:uva-darden', 'school:chicago-booth', 'best-mba-consulting', 'best-mba-usa', 'mba-finder'],
});
