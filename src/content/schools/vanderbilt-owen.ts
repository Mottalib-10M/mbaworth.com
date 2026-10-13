import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'vanderbilt-owen';
const s = K.s(slug);
const o = K.roi(slug)!;
const months = s.months ?? 21;
const nth = (r: { rank: number }) => (r.rank === 1 ? 'first' : `number ${r.rank}`);
const b = s.emp.bonus!;
const counted = s.emp.employers.filter((e) => e.hires).slice(0, 3);
const countedTxt = K.listOf(counted.map((e) => `${e.name} with ${K.num(e.hires!)}`));
const withCounts = K.schools.filter((x) => x.emp.employers.some((e) => e.hires)).length;
const bonusPcts = K.schools.map((x) => x.emp.bonus?.pct ?? null).filter((v): v is number => v !== null);
const bonusAbove = bonusPcts.filter((v) => v > (b.pct ?? 0)).length;
const usTwo = K.schools.filter((x) => x.country === 'US' && x.twoYear);
const livUs = usTwo.map((x) => K.c(x.slug).living).filter((v): v is number => v !== null);
const livBelow = livUs.filter((v) => v < K.c(slug).living!).length;
const women = K.schools.map((x) => x.profile.women).filter((v): v is number => v !== null);
const womenBelow = women.filter((v) => v < (s.profile.women ?? 0)).length;
const strat = s.emp.functions.find((f) => /Management\/Strategy/.test(f.label));
const internal = s.emp.functions.find((f) => /Internal/.test(f.label));
const rUs = K.rank(slug, 'z-us'), rOps = K.rank(slug, 'f-operations'), rHc = K.rank(slug, 'healthcare');
const internBack = K.usd(o.direct + o.forgone - o.total);

export default defineSchool({
  slug,
  title: 'Vanderbilt Owen MBA 2026: Nashville Cost and Hiring Data',
  description: `Vanderbilt Owen MBA 2026: ${K.direct(slug)} for two years, ${K.salary(slug)} median base salary, ${K.p(b.pct!)} of hires paid a signing bonus, ${K.payback(slug)} payback for a ${K.ref()} earner.`,
  intro: `A Nashville program of ${K.num(s.classSize!)} students whose report says how many graduates each top employer hired.`,
  resume: `The Vanderbilt Owen full-time MBA costs ${K.tuition(slug)} in tuition and ${K.fees(slug)} in fees for two years, and the school budgets ${K.living(slug)} for living in Nashville, for ${K.direct(slug)} before the salary you stop earning. For a person earning ${K.ref()} today, the ${months} months away add ${K.usd(o.forgone)}, the summer internship gives back about ${internBack}, and the total is ${K.usd(o.total)}. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, and ${K.p(b.pct!)} of those hired received a signing bonus, at a median of ${K.money(b.v, 'USD')}. On those figures the degree pays back ${K.payback(slug)} after graduation, with a ten-year net present value of ${K.npv(slug)}. Owen stands out for what its report counts: hires by employer, ${countedTxt}, and a split of consulting jobs between strategy firms and internal teams.`,
  body: (h) => `<h2>Employers named with head counts</h2>
<p>${withCounts * 2 < K.schools.length ? 'Most schools list their recruiters without numbers. ' : ''}Owen gives numbers: ${countedTxt} were the largest hirers of the class of 2025. Only ${withCounts} of the ${K.schools.length} schools on this site publish hire counts at all. For a class of ${K.num(s.classSize!)}, a single employer taking ${K.num(counted[0].hires!)} graduates is a large share, which tells a candidate where the school's recruiting relationships run deepest; it also means one company changing its plans would move the figures for the next class.</p>
<p>The signing bonus is just as widely spread. ${K.p(b.pct!)} of graduates who took a job received one, ${bonusAbove === 0 ? 'the highest share of any school on this site that reports it' : `a share that only ${bonusAbove} school${bonusAbove === 1 ? '' : 's'} on this site exceed${bonusAbove === 1 ? 's' : ''}`}, at a median of ${K.money(b.v, 'USD')}. The calculator counts it once, in the first year.</p>
<h2>Consulting and finance at the same median</h2>
<p>Consulting took ${K.share(slug, 'consulting')} of the class and finance ${K.share(slug, 'finance')}, both at a median of ${K.segSalary(slug, 'consulting')}, so either path repays the degree in ${K.payback(slug, 'consulting')} for the reference person, faster than the school-wide ${K.payback(slug)}. The function table splits consulting in two: ${strat ? `${K.p(strat.pct!)} in management and strategy firms` : 'strategy firms'}${internal ? ` and ${K.p(internal.pct!)} in internal consulting teams inside companies` : ''}. Healthcare is the third group at ${K.share(slug, 'healthcare')}${rHc ? `, ${nth(rHc)} of ${rHc.of} in our healthcare ranking` : ''}, but its median of ${K.segSalary(slug, 'healthcare')} stretches the payback to ${K.payback(slug, 'healthcare')}. ${rOps ? `Operations is a smaller strength: Owen ranks ${nth(rOps)} of ${rOps.of} for operations jobs.` : ''}</p>
${h.miniGoal(slug)}
<h2>A Nashville budget, and what it leaves out</h2>
<p>The living budget of ${K.living(slug)} for two nine-month years is lower than at all but ${livBelow} of the ${livUs.length} two-year American programs on this site that publish one. It counts housing, food, personal costs and transport; the school lists health insurance and loan fees on separate lines, and both stay out of the figure here. A student who keeps the university health plan should add it. ${rUs ? `Nearly every graduate who took a job stayed in the United States, ${K.share(slug, 'z-us')}, which puts Owen ${nth(rUs)} of ${rUs.of} in our ${h.a('best-mba-usa', 'ranking for working in the United States')}.` : ''} The class is ${K.p(s.profile.women ?? 0)} women; ${womenBelow === 0 ? 'no school on this site reports a lower share' : `only ${womenBelow} school${womenBelow === 1 ? '' : 's'} on this site report${womenBelow === 1 ? 's' : ''} a lower one`}.</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the Vanderbilt Owen MBA cost?', a: `Tuition is ${K.tuition(slug)} and fees ${K.fees(slug)} for two years, and the school budgets ${K.living(slug)} for living costs, for ${K.direct(slug)}. Health insurance and loan fees are listed apart. Adding ${K.usd(o.forgone)} of salary given up by a person earning ${K.ref()} and taking off the internship pay, the total is ${K.usd(o.total)}.` },
    { q: 'What salary do Vanderbilt Owen graduates earn?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}. Consulting and finance both paid a median of ${K.segSalary(slug, 'consulting')}, technology ${K.segSalary(slug, 'tech')} and healthcare ${K.segSalary(slug, 'healthcare')}. ${K.p(b.pct!)} of graduates who took a job also received a signing bonus, at a median of ${K.money(b.v, 'USD')}. These medians describe graduates who accepted a job and reported their pay.` },
    { q: 'How long does the Vanderbilt Owen MBA take to repay?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school-wide median, before tax, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without. On the consulting or finance median it falls to ${K.payback(slug, 'consulting')}; on the healthcare median it rises to ${K.payback(slug, 'healthcare')}.` },
    { q: 'Which companies hire the most Vanderbilt Owen graduates?', a: `For the class of 2025 the report names ${countedTxt} as the largest hirers, with exact counts, a level of detail only ${withCounts} schools on this site publish. In a class of ${K.num(s.classSize!)}, those few employers account for a visible part of all hires, so check that the companies you target recruit there regularly.` },
  ],
  related: ['school:uva-darden', 'school:unc-kenan-flagler', 'school:emory-goizueta', 'best-mba-consulting', 'best-mba-usa', 'mba-payback-calculator'],
});
