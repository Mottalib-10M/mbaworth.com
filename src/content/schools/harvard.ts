import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'harvard';
const s = K.s(slug);
const o = K.roi(slug);
const sal = s.emp.salary;
const seg = (k: string) => s.emp.segments.find((x) => x.key === k);
const pe = seg('pe'), vc = seg('vc'), am = seg('am'), ib = seg('ib');
const ind = (k: string) => s.emp.industries.find((x) => x.key === k);
const cons = ind('consulting'), tech = ind('tech'), health = ind('healthcare');
const spread = (x: (typeof K.schools)[number]) => (x.emp.salary?.p25 && x.emp.salary?.p75 && x.emp.salary.cur === 'USD' ? x.emp.salary.p75 - x.emp.salary.p25 : null);
const spreads = K.schools.filter((x) => spread(x) !== null).sort((a, b) => spread(a)! - spread(b)!);
const spreadPos = spreads.findIndex((x) => x.slug === slug) + 1;
const biggest = [...K.schools].filter((x) => x.classSize).sort((a, b) => b.classSize! - a.classSize!);
const sizePos = biggest.findIndex((x) => x.slug === slug) + 1;
const fin = K.rank(slug, 'finance'), techR = K.rank(slug, 'tech'), all = K.rank(slug, 'all'), bd = K.rank(slug, 'f-bizdev');
const aid = s.scholarship.v;
const ord = (n: number) => (n === 1 ? 'the' : n === 2 ? 'the second' : n === 3 ? 'the third' : `number ${n} for the`);

export default defineSchool({
  slug,
  title: 'Harvard MBA 2026: HBS Cost, Median Pay and Payback',
  description: `Harvard Business School MBA 2026: ${K.tuition(slug)} tuition, ${K.living(slug)} living budget, a ${K.salary(slug)} median base salary and a payback of ${K.payback(slug)} for a ${K.ref()} earner.`,
  intro: `A class of ${K.num(s.classSize!)} whose salaries sit close together: half of the graduates who reported pay earned between ${K.money(sal!.p25!, 'USD')} and ${K.money(sal!.p75!, 'USD')}.`,
  resume: `Harvard Business School charges ${K.tuition(slug)} in tuition for its two-year MBA at the ${s.tuition!.cohort} rate, ${K.fees(slug)} of fees and health cover, and budgets ${K.living(slug)} for living costs, for ${K.direct(slug)} before the salary you stop earning. ${o ? `For a person earning ${K.ref()} today, ${s.months} months without pay add ${K.usd(o.forgone)} and the total reaches ${K.usd(o.total)}; the school publishes no internship pay, so the calculator gives nothing back for the summer.` : ''} The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}${o ? `, which repays that total ${K.payback(slug)} after graduation and leaves a ten-year net present value of ${K.npv(slug)}` : ''}. Two things set the school apart in the data. Its salaries are tightly grouped, with the middle half spanning only ${K.money(sal!.p75! - sal!.p25!, 'USD')}. And its scholarships are awarded on need alone, ${aid ? `averaging ${K.money(aid, 'USD')} a year` : 'with no merit awards'}, which changes the real price for many admitted students.`,
  body: (h) => `<h2>Salaries packed close to the median</h2>
<p>Harvard publishes the quartiles of its salaries as well as the median, and they sit close together. ${spreadPos > 0 ? `Of the ${spreads.length} schools on this site that publish both quartiles in dollars, Harvard has ${ord(spreadPos)} narrowest gap between them.` : ''} For an applicant, a tight range means the median is a fair guide to the offer a typical graduate takes, rather than an average pulled up by a few large finance packages. ${sal?.p25 ? `A graduate at the lower quartile still reported ${K.money(sal.p25, 'USD')}.` : ''}</p>
<p>Finance is the largest destination at ${K.share(slug, 'finance')} of the class, and Harvard splits it finely: ${pe ? `${K.p(pe.pct!)} in private equity at ${K.money(pe.salary!, 'USD')}` : 'private equity'}, ${am ? `${K.p(am.pct!)} in investment management and hedge funds at ${K.money(am.salary!, 'USD')}` : 'asset management'}, ${ib ? `${K.p(ib.pct!)} in investment banking at ${K.money(ib.salary!, 'USD')}` : 'investment banking'} and ${vc ? `${K.p(vc.pct!)} in venture capital at ${K.money(vc.salary!, 'USD')}, the highest median in the report` : 'venture capital'}. Technology took ${K.share(slug, 'tech')}${tech?.salary ? ` at ${K.money(tech.salary, 'USD')}` : ''}, consulting ${K.share(slug, 'consulting')}${cons?.salary ? ` at ${K.money(cons.salary, 'USD')}` : ''}, and health care ${K.share(slug, 'healthcare')}${health?.salary ? ` at ${K.money(health.salary, 'USD')}` : ''}. ${fin ? `These figures rank Harvard ${fin.rank} of ${fin.of} in our ${h.a('best-mba-finance', 'finance ranking')}` : ''}${techR ? ` and ${techR.rank} of ${techR.of} for ${h.a('best-mba-tech', 'technology')}` : ''}${bd ? `; by job function it comes first in business development` : ''}.</p>
${h.miniGoal(slug)}
<h2>Need-based aid and what it does to the bill</h2>
<p>Harvard gives no merit scholarships. Awards depend on the family's finances, and the school reports that about half of the class receives one, ${aid ? `with an average of ${K.money(aid, 'USD')} a year, or about ${K.money(aid * 2, 'USD')} over the program` : 'without stating an average'}, and that a small share receives full tuition. An admitted student with modest savings may therefore pay far less than the ${K.direct(slug)} on the sticker, while one with high income or assets pays it all. The calculator above starts from the full price; the scholarship tool below shows how an award shortens the payback.</p>
${o ? h.miniScholarship(slug) : h.mini('forgone')}
<h2>The size of the class, and who is not in the salary</h2>
<p>${sizePos > 0 && sizePos <= 3 ? `With ${K.num(s.classSize!)} students in the class of 2027, Harvard is ${sizePos === 1 ? 'the largest' : sizePos === 2 ? 'the second largest' : 'the third largest'} full-time class on this site.` : `The class of 2027 counts ${K.num(s.classSize!)} students.`} Not all of them look for a job. Founders, sponsored students returning to their employer and those who go on studying sit outside the salary figures, which describe the graduates who sought work and reported their pay. ${s.emp.employed !== null ? `Of those job seekers, ${K.p(s.emp.employed)} ${s.emp.employedLabel}.` : ''} ${K.share(slug, 'z-us')} of graduates who took a job stayed in the United States, so the payback above uses an American salary. ${all ? `Across the whole class, our model places Harvard ${all.rank} of ${all.of}.` : ''} For the closest comparison, the ${h.a('compare-harvard-vs-stanford', 'Harvard and Stanford comparison')} puts both reports side by side.</p>
${o ? h.miniPayback(slug) : ''}`,
  faqs: [
    { q: 'How much does Harvard Business School cost for the full MBA?', a: `For the two years at the ${s.tuition!.cohort} rate, tuition is ${K.tuition(slug)}, fees and health cover ${K.fees(slug)}, and the school's living budget ${K.living(slug)}, for ${K.direct(slug)}. ${o ? `Counting the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)}, with no internship pay deducted because the school does not publish it.` : ''}` },
    { q: 'What is the median salary after the Harvard MBA?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}, with the middle half between ${K.money(sal!.p25!, 'USD')} and ${K.money(sal!.p75!, 'USD')}. ${s.emp.bonus ? `${s.emp.bonus.pct !== null ? K.p(s.emp.bonus.pct) : 'Part'} of graduates also received a signing bonus, at a median of ${K.money(s.emp.bonus.v, 'USD')}.` : ''} Venture capital had the highest median of the finance segments${vc?.salary ? `, ${K.money(vc.salary, 'USD')}` : ''}, though it hired only a small group of graduates.` },
    { q: 'Does Harvard Business School give merit scholarships?', a: `No. HBS awards are need-based only, judged on income and assets. About half of students receive one, ${aid ? `averaging ${K.money(aid, 'USD')} a year` : 'with no average published'}. ${o ? `For a ${K.ref()} earner without aid, the program repays in ${K.payback(slug)}; an award of that size shortens it, as the scholarship tool on this page shows.` : ''}` },
    { q: 'How many Harvard MBA graduates go into private equity?', a: `${pe ? `${K.p(pe.pct!)} of the class of 2025 who reported jobs went into private equity, at a median base of ${K.money(pe.salary!, 'USD')}` : 'The school reports a private equity share'}. Finance as a whole took ${K.share(slug, 'finance')} of the class. ${K.rank(slug, 'pe') ? `Our private equity ranking places Harvard ${K.rank(slug, 'pe')!.rank} of ${K.rank(slug, 'pe')!.of}, on share, salary and ten-year value for the same person.` : ''}` },
  ],
  related: ['school:stanford', 'school:wharton', 'compare-harvard-vs-stanford', 'best-mba-private-equity', 'best-mba-finance', 'mba-scholarships'],
});
