import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'rice-jones';
const s = K.s(slug);
const o = K.roi(slug);
const ord = (n: number) => (n === 1 ? 'first' : `number ${n}`);
const en = K.shareRaw(slug, 'energy')!;
const enAbove = K.schools.filter((x) => x.slug !== slug && (K.shareRaw(x.slug, 'energy') ?? 0) > en).length;
const enNext = [...K.schools].filter((x) => x.slug !== slug).sort((a, b) => (K.shareRaw(b.slug, 'energy') ?? 0) - (K.shareRaw(a.slug, 'energy') ?? 0))[0];
const award = s.scholarship.v;
const awardShare = award ? Math.round((award / s.tuition!.v) * 100) : null;
const energyNames = ['Chevron', 'ExxonMobil', 'Phillips 66', 'CenterPoint Energy'].filter((n) => s.emp.employers.some((e) => e.name === n));
const rkUs = K.rank(slug, 'z-us');
const forgone = Math.round((K.MODEL.refSalary * s.months!) / 12);
const intern = s.emp.intern;
const conSal = s.emp.industries.find((r) => r.key === 'consulting')?.salary ?? 0;
const withEmp = K.schools.filter((x) => x.emp.employed !== null);
const higherEmp = withEmp.filter((x) => x.emp.employed! > s.emp.employed!).length;
const sameCons = K.shareRaw(slug, 'consulting') === en;
const enSal = s.emp.industries.find((r) => r.key === 'energy')?.salary ?? 0;

export default defineSchool({
  slug,
  title: 'Rice Jones MBA 2026: Houston Energy Jobs, Fees and Pay',
  description: `Rice Jones MBA 2026: ${K.tuition(slug)} tuition for two years in Houston, a ${K.salary(slug)} median base salary, ${K.share(slug, 'energy')} of graduates in energy, and no living budget published.`,
  intro: `${K.share(slug, 'energy')} of the Rice Jones class of 2025 went into energy${enAbove === 0 ? ', more than at any other school in our data' : ''}, ${sameCons ? 'and as many into consulting' : `and ${K.share(slug, 'consulting')} into consulting`}, at a school median of ${K.salary(slug)}.`,
  resume: `The Rice full-time MBA at the Jones Graduate School of Business charges ${K.tuition(slug)} in tuition for two years, the ${s.tuition!.cohort} rate counted twice, plus ${K.fees(slug)} of required fees; health insurance is extra unless waived. Rice publishes no current living budget for Houston on its business school pages, and the cost-of-attendance documents we found are several years old, so this page does not count one. ${o ? '' : `Without it our model computes no total cost and no payback for the reference person earning ${K.ref()}, even though the salary is known.`} The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, and ${K.p(s.emp.bonus!.pct!)} received a signing bonus at a median of ${K.money(s.emp.bonus!.v, 'USD')}. ${award ? `Scholarships change the price a great deal: the school says nearly all full-time students receive one, with an average award of ${K.money(award, 'USD')}, without saying whether that is per year or for the program.` : ''} What sets Rice apart is energy: ${K.share(slug, 'energy')} of graduates joined the sector, ${energyNames.length ? `with ${K.listOf(energyNames)} among the named employers` : 'in and around Houston'}.`,
  body: (h) => `<h2>The energy school</h2>
<p>${enAbove === 0 ? `${enNext && (K.shareRaw(enNext.slug, 'energy') ?? 0) < en / 2 ? 'No other school in our data comes close on energy' : 'No other school in our data sends more graduates into energy'}${enNext ? `: the next largest share is ${K.share(enNext.slug, 'energy')}, at ${h.sc(enNext.slug)}` : ''}.` : `${enAbove} other schools in our data send a larger share into energy.`} Energy jobs paid a median of ${K.segSalary(slug, 'energy')}${conSal > enSal ? `, well below consulting at ${K.segSalary(slug, 'consulting')}` : ''}, ${sameCons ? 'which took the same share of the class' : `which took ${K.share(slug, 'consulting')} of it`}. The two paths through Rice therefore lead to very different salaries: a candidate who wants an energy career should plan on the energy median, not the school-wide ${K.salary(slug)}. Financial services took ${K.share(slug, 'finance')} at ${K.segSalary(slug, 'finance')} and technology ${K.share(slug, 'tech')} at ${K.segSalary(slug, 'tech')}.</p>
<p>Almost everyone stays in the country, ${K.share(slug, 'z-us')} of graduates, most of them in the Southwest region around Houston${rkUs ? `; that places Rice ${ord(rkUs.rank)} of ${rkUs.of} in our ranking for working in the United States` : ''}. The school also reports that graduates with temporary work authorization earned a higher median than those with permanent authorization, a point worth knowing for international applicants.</p>
${h.miniGoal(slug)}
<h2>A scholarship-heavy price</h2>
<p>${award && awardShare !== null ? `An average award of ${K.money(award, 'USD')} would cover about ${K.p(awardShare)} of the two-year tuition if it applies to the whole program${award && award * 2 >= s.tuition!.v ? ', and the whole of it if the amount is annual' : ''}.` : 'Scholarships are common at Rice.'} Either way, the list price overstates what most students pay, and the school considers every admitted student automatically. That makes the scholarship field of the calculator above the most important input on this page, together with the living budget you will have to estimate yourself for Houston.</p>
<h2>What the calculator needs from you</h2>
<p>Two numbers are missing from the school's side: a living budget and the award you are offered. ${intern ? `The summer internship gives some of the cost back: the school reports an average of ${K.money(intern.monthly, 'USD')} a month for the class of 2026, which you can set against the months without salary.` : ''} ${K.p(s.emp.employed!)} of graduates seeking a job ${s.emp.employedLabel}; ${higherEmp} of the ${withEmp.length} schools in our data that publish this rate report a higher one, so allow for a slower start. At ${K.ref()} a year, the ${s.months} months away alone cost about ${K.usd(forgone)} in salary.</p>
${h.mini('forgone')}`,
  faqs: [
    { q: 'How much does the Rice Jones MBA cost?', a: `Tuition is ${K.tuition(slug)} for two years at the ${s.tuition!.cohort} rate, plus ${K.fees(slug)} of required fees; health insurance is added unless waived. Rice publishes no current living budget for Houston on its business school pages, so the full cost depends on your own estimate. ${award ? `The average scholarship of ${K.money(award, 'USD')} lowers the price for most students.` : ''}` },
    { q: 'What is the median salary after a Rice Jones MBA?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}. Consulting paid ${K.segSalary(slug, 'consulting')}, financial services ${K.segSalary(slug, 'finance')}, technology ${K.segSalary(slug, 'tech')} and energy ${K.segSalary(slug, 'energy')}. ${K.p(s.emp.bonus!.pct!)} of graduates received a signing bonus with a median of ${K.money(s.emp.bonus!.v, 'USD')}. Those figures describe graduates who accepted a job and reported pay, under the CSEA standard the school follows.` },
    { q: 'Is Rice Jones a good MBA for the energy industry?', a: `On the reports we read, ${enAbove === 0 ? 'it sends the largest share of any school into energy' : 'it sends a large share into energy'}: ${K.share(slug, 'energy')} of the class of 2025, at a median of ${K.segSalary(slug, 'energy')}${energyNames.length ? `, with ${K.listOf(energyNames.slice(0, 3))} among the employers` : ''}. That median is below the school-wide ${K.salary(slug)}, so an energy career at Rice starts on lower pay than consulting, the other path that took as large a share of the class.` },
    { q: 'Why does Rice Jones have no payback on this page?', a: `Rice publishes no current living budget for its full-time MBA on the pages we read, and the older cost-of-attendance documents are out of date. Without a living cost, our model cannot add up the bill. Enter your own Houston budget and your scholarship in the calculator above to get a payback.` },
  ],
  related: ['school:texas-mccombs', 'school:vanderbilt-owen', 'school:uva-darden', 'best-mba-usa', 'mba-scholarships', 'mba-finder'],
});
