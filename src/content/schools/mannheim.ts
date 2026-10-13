import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'mannheim';
const s = K.s(slug);
const o = K.roi(slug);
const ord = (n: number) => (n === 1 ? 'first' : `number ${n}`);
const europe = K.schools.filter((x) => (x.region === 'Europe' || x.region === 'UK') && x.tuition);
const cheaper = europe.filter((x) => K.c(x.slug).tuition! < K.c(slug).tuition!).length;
const sized = K.schools.filter((x) => x.classSize !== null);
const smaller = sized.filter((x) => x.classSize! < s.classSize!).length;
const de = s.emp.zones.find((z) => z.zone === 'Europe');
const rkEu = K.rank(slug, 'z-europe'), rkAll = K.rank(slug, 'all');
const sectors = s.emp.industries.map((r) => r.label.replace(/\s*\(.*\)$/, '').toLowerCase());
const cohort = s.emp.cohort.toLowerCase();
const aged = K.schools.filter((x) => x.profile.age !== null);
const younger = aged.filter((x) => x.profile.age! < s.profile.age!).length;
const start = s.tuition!.cohort;
const newer = K.schools.filter((x) => /2025|2026/.test(x.emp.cohort)).length;

export default defineSchool({
  slug,
  title: 'Mannheim MBA 2026: One-Year Cost, Salary and Payback',
  description: `Mannheim MBA 2026: ${K.tuition(slug)} tuition for a one-year program, a ${K.living(slug)} living budget, a ${K.salary(slug)} average base salary for the ${cohort}, and the payback.`,
  intro: `A German MBA of up to ${K.num(s.classSize!)} students that costs ${K.direct(slug)} with a year of living costs, and whose ${cohort} reported an average base salary of ${K.salary(slug)}.`,
  resume: `Mannheim Business School charges ${K.tuition(slug)} for its full-time MBA for the ${start}, a fee that already covers course materials, IT and the accommodation on study trips, plus a ${K.fees(slug)} application fee. The school's own guideline for a year of rent, health insurance, food and social life in Mannheim is ${K.living(slug)}, the middle of the range it publishes, for ${K.direct(slug)} in all${K.directUsd(slug) ? `, about ${K.directUsd(slug)}` : ''}. ${o ? `For a person earning ${K.ref()} today, the ${s.months} months without salary bring the total to ${K.usd(o.total)}. ` : ''}The most recent salary on the open pages is for the ${cohort}: an ${K.salaryKind(slug)} of ${K.salary(slug)}, published in US dollars. ${o ? `Against it, the model repays the cost ${K.payback(slug)} after graduation and leaves a ten-year net present value of ${K.npv(slug)}. ` : ''}What sets Mannheim apart is its size and its pull towards Germany: ${de?.pct ? `${K.p(de.pct)} of that class work in Germany` : 'most of the class works in Germany'}, and ${cheaper === 0 ? 'no other European school in our data charges less tuition' : `only ${cheaper} European schools in our data charge less tuition`}.`,
  body: (h) => `<h2>A small class that mostly stays in Germany</h2>
<p>With places for up to ${K.num(s.classSize!)} students, Mannheim runs ${smaller === 0 ? 'the smallest full-time class of any school in our data that states its size' : `one of the smallest classes in our data: only ${smaller} of the ${sized.length} schools that state a class size admit fewer`}. Participants arrive at ${K.num(s.profile.age!)} on average, older than the class average at ${younger} of the ${aged.length} schools that publish one, with about ${K.num(s.profile.exp!, 1)} years of work behind them, and ${K.p(s.profile.women!)} are women. ${de?.pct ? `The career page says ${K.p(de.pct)} of the ${cohort} now work in Germany` : 'Most of the class stays in Germany'}${rkEu ? `, which places Mannheim ${ord(rkEu.rank)} of ${rkEu.of} in our ranking for working in Europe` : ''}. For someone who wants a career in the German economy, that concentration is the point of the program; for someone who wants to work in London or Asia afterwards, it is a warning.</p>
<p>The open pages name the three largest sectors in order, ${K.listOf(sectors)}, without their shares or salaries. The detailed employment report sits behind a request form that we did not fill in, so this page shows no split by industry, function or employer.</p>
<h2>A ${cohort} salary, in another currency</h2>
<p>The salary is the weak point of the data. It describes the ${cohort}, while ${newer} of the ${K.schools.length} schools in our data already report a class of 2025 or later, and Mannheim publishes it in US dollars while charging its fees in euros. The calculator converts both at the same ECB rate, which is right for comparing schools but not what a graduate earning in euros sees. ${s.emp.employed !== null ? `The programme page adds that ${K.p(s.emp.employed)} of graduates ${s.emp.employedLabel}, without naming the class.` : ''} ${rkAll ? `On these figures Mannheim ranks ${ord(rkAll.rank)} of ${rkAll.of} in our overall ranking, where its short program and low bill weigh as much as the salary.` : ''}</p>
${h.miniFx()}
<h2>Discounts that change the bill</h2>
<p>The fee has several ways down. The school lists early-application discounts, a bonus for German speakers and a smaller one for a GMAT or GRE score, and several scholarship categories, one of them need-based; it publishes no average award. Each reduction shortens the payback, and the calculator's scholarship field lets you test one. The living guideline is a range, so a student who rents alone near the centre should type the top of it rather than the middle used here.</p>
${o ? h.miniPayback(slug) : h.mini('forgone')}`,
  faqs: [
    { q: 'How much does the Mannheim full-time MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${start}, with a ${K.fees(slug)} application fee. The school's guideline for a year of living in Mannheim is ${K.living(slug)}, for ${K.direct(slug)} in all. ${o ? `Counting the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)}.` : ''} Early-application discounts and scholarships can lower the fee.` },
    { q: 'What salary do Mannheim MBA graduates earn?', a: `The latest figure on the school's open pages is an average base salary of ${K.salary(slug)} for the ${cohort}, published in US dollars, about ${K.money(Math.round(s.emp.salary!.v / K.FX.EUR), 'EUR')} at the ECB rate of ${K.day(K.FX_DATE)}. No median and no salary by sector is public; those sit in a report the school sends on request.` },
    { q: 'Do Mannheim MBA graduates stay in Germany?', a: `Mostly. ${de?.pct ? `The school reports that ${K.p(de.pct)} of the ${cohort} work in Germany.` : 'The school reports that most of the class works in Germany.'} With a class of up to ${K.num(s.classSize!)}, a few graduates moving abroad would change that share by several points from one year to the next. The open pages give no share for any other country or region.` },
    { q: 'How long does a Mannheim MBA take to pay back?', a: `${o ? `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the average salary of the ${cohort}, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax.` : 'The model cannot compute it without a salary and a budget.'} The program lasts ${s.months} months, which keeps the salary given up below that of a two-year MBA.` },
  ],
  related: ['school:esmt-berlin', 'school:hec-paris', 'school:rsm', 'best-mba-europe', 'best-mba-one-year', 'mba-finder'],
});
