import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'lbs';
const s = K.s(slug);
const o = K.roi(slug);
const ord = (n: number) => (n === 1 ? 'first' : `number ${n}`);
const maxZone = (x: typeof s) => Math.max(0, ...x.emp.zones.map((z) => z.pct ?? 0));
const own = maxZone(s);
const withZones = K.schools.filter((x) => x.emp.zones.some((z) => z.pct !== null));
const lessConcentrated = withZones.filter((x) => x.slug !== slug && maxZone(x) < own).length;
const bigZones = s.emp.zones.filter((z) => (z.pct ?? 0) >= 10).length;
const rkMe = K.rank(slug, 'z-me'), rkLa = K.rank(slug, 'z-latam');
const visa = s.living?.basis === 'visa';
const eu = s.emp.zones.find((z) => z.zone === 'Europe')?.pct ?? null;
const pe = s.emp.segments.find((x) => x.key === 'pe');

export default defineSchool({
  slug,
  title: 'LBS MBA 2026: London Fees, Average Pay and Time to Repay',
  description: `LBS MBA 2026: ${K.tuition(slug)} tuition, a ${K.salary(slug)} average base salary, only ${K.share(slug, 'z-uk')} of graduates staying in the UK, and the total cost and payback for your own salary.`,
  intro: `Only ${K.share(slug, 'z-uk')} of London Business School's class of 2025 took a job in the United Kingdom, for an average base salary of ${K.salary(slug)}.`,
  resume: `London Business School charges ${K.tuition(slug)} in tuition for the MBA starting in 2026, plus a ${K.fees(slug)} student association fee, and the price does not change whether you leave at the earliest exit point or stay the full ${s.months} months. The school publishes no living budget, so this page counts the UK student visa minimum for London over ${s.months} months, ${K.living(slug)}, as a floor rather than a real budget. ${o ? `For a person earning ${K.ref()} today, the salary given up brings the total to ${K.usd(o.total)}. ` : ''}The class of 2025 reported an ${K.salaryKind(slug)} of ${K.salary(slug)}, about ${K.salaryUsd(slug)}; LBS publishes averages only, never a median. ${o ? `On that figure the model repays the cost ${K.payback(slug)} after graduation, with a ten-year net present value of ${K.npv(slug)}. ` : ''}What sets LBS apart is where the class goes: ${K.share(slug, 'z-uk')} stayed in Britain and the rest spread over ${s.emp.zones.length - 1} other regions, from the United States to Latin America.`,
  body: (h) => `<h2>A London school that sends most graduates elsewhere</h2>
<p>The largest region in the LBS report, the United Kingdom, takes ${K.p(own)} of graduates who reported a job location. ${lessConcentrated === 0 ? `No other school in our data` : `Only ${lessConcentrated} of the ${withZones.length - 1} other schools in our data that publish regions`} spread their class more widely than that. In all, ${bigZones} regions each took a tenth of the class or more. ${rkMe ? `The Middle East share of ${K.share(slug, 'z-me')} places LBS ${ord(rkMe.rank)} of ${rkMe.of} in our Middle East ranking` : ''}${rkLa ? `, and Latin America at ${K.share(slug, 'z-latam')} ${ord(rkLa.rank)} of ${rkLa.of} for that region` : ''}.</p>
<p>Region also explains most of the gap in pay. Graduates who went to North America averaged ${K.segSalary(slug, 'z-us')}, those in Britain ${K.segSalary(slug, 'z-uk')} and those in Asia ${K.segSalary(slug, 'z-asia')}. For the reference person, that is the difference between a payback of ${K.payback(slug, 'z-us') ?? 'a few years'} on the American salary and ${K.payback(slug, 'z-asia') ?? 'a much longer one'} on the Asian one. The school-wide average mixes all of these, so pick the salary of the market where you intend to work.</p>
${h.miniGoal(slug)}
<h2>Why the average needs care</h2>
<p>An average is pulled up by a few very high offers, and LBS gives no median to check it against. Its salary figure also leaves out sponsored and self-employed graduates. Next to base pay, ${K.p(s.emp.bonus!.pct!)} of graduates who accepted an offer received what the school calls other compensation, sign-on and end-of-year bonuses together, at an average of ${K.money(s.emp.bonus!.v, 'GBP')}; the calculator does not count it, which makes the payback above a cautious one.</p>
<p>By sector, consulting took ${K.share(slug, 'consulting')} of the class at ${K.segSalary(slug, 'consulting')}, finance ${K.share(slug, 'finance')} at ${K.segSalary(slug, 'finance')}${pe?.salary ? `, with private equity alone at ${K.p(pe.pct!)} and ${K.money(pe.salary, 'GBP')}` : ''}, and technology ${K.share(slug, 'tech')} at ${K.segSalary(slug, 'tech')}. The ${h.a('compare-insead-vs-lbs', 'INSEAD and LBS comparison')} sets these lines against the other large European class.</p>
<h2>The cost line that is missing</h2>
<p>${visa ? `The visa minimum is the amount UK Visas and Immigration asks a student to hold for each month in London. It is a legal minimum, not a spending estimate, and LBS publishes no figure of its own for rent or daily costs. Every pound you spend above that floor lengthens the payback shown here.` : `The living budget is the school's own figure.`} Tuition is paid in pounds and the salary is reported in pounds too, so for a graduate who stays in Britain the exchange rate matters less than for one who pays fees from savings in another currency.</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the LBS MBA cost for the 2026 intake?', a: `Tuition is ${K.tuition(slug)} and the student association fee ${K.fees(slug)}. LBS publishes no living budget; at the UK visa minimum for London, ${K.living(slug)} over ${s.months} months, the direct cost is ${K.direct(slug)}. ${o ? `Counting the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)}.` : ''} Real living costs in London run above the visa floor.` },
    { q: 'What is the average salary after an LBS MBA?', a: `The class of 2025 reported an average base salary of ${K.salary(slug)}, about ${K.salaryUsd(slug)}, excluding sponsored and self-employed graduates. LBS publishes no median, so the figure can sit above what a typical graduate earned. By region, the average ran from ${K.segSalary(slug, 'z-asia')} in Asia to ${K.segSalary(slug, 'z-us')} in North America, and ${K.p(s.emp.bonus!.pct!)} also received bonuses averaging ${K.money(s.emp.bonus!.v, 'GBP')}.` },
    { q: 'Where do LBS graduates work after the MBA?', a: `${K.share(slug, 'z-uk')} of the class of 2025 took a job in the United Kingdom, ${K.share(slug, 'z-asia')} in Asia, ${K.share(slug, 'z-us')} in North America, ${K.share(slug, 'z-me')} in Africa and the Middle East, ${K.share(slug, 'z-latam')} in Latin America ${eu !== null ? `and ${K.p(eu)} in continental Europe` : 'and the rest in continental Europe'}. Working outside Britain depends on visas in the country concerned, which the school notes in its report.` },
    { q: 'How long does it take to repay an LBS MBA?', a: `${o ? `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school's average salary, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax.` : 'The model cannot compute it.'} Because the living cost counted is only the visa floor, a real London budget makes the payback longer.` },
  ],
  related: ['school:insead', 'school:oxford-said', 'school:imperial', 'compare-insead-vs-lbs', 'best-mba-london', 'best-mba-europe'],
});
