import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'iim-bangalore';
const s = K.s(slug);
const o = K.roi(slug);
const R = (v: number) => K.money(v, 'INR');
const sal = s.emp.salary!;
const belowRef = sal.usd !== null && sal.usd < K.MODEL.refSalary;
const consR = K.rank(slug, 'consulting');
const waiver = s.scholarship.v;
const fees = s.fees?.v ?? 0;
const billed = s.tuition!.v + fees;
const indian = K.schools.filter((x) => x.country === 'IN' && x.emp.industries.some((r) => r.key === 'consulting'));
const consTop = [...indian].sort((a, b) => (K.shareRaw(b.slug, 'consulting') ?? 0) - (K.shareRaw(a.slug, 'consulting') ?? 0))[0]?.slug === slug;

export default defineSchool({
  slug,
  title: 'IIM Bangalore EPGP 2026: Fees, Median Pay, Consulting',
  description: `IIM Bangalore EPGP 2026: ${R(s.tuition!.v)} tuition plus ${fees ? `a ${R(fees)} immersion` : 'travel'}, a ${R(sal.v)} median salary, ${K.share(slug, 'consulting')} of the class in consulting, and your own payback.`,
  intro: `${K.share(slug, 'consulting')} of the one-year EPGP class went into consulting, ${consTop ? 'the largest share of any Indian program on this site' : 'a large share'}, at a ${R(sal.v)} median salary.`,
  resume: `The EPGP, IIM Bangalore's one-year MBA for experienced professionals, charges ${R(s.tuition!.v)} in tuition for the ${s.tuition!.cohort} batch${fees ? `, plus an international immersion billed at an indicative ${R(fees)}, for ${R(billed)} before living costs${K.c(slug).tuition !== null ? `, about ${K.usd(K.c(slug).tuition! + K.c(slug).fees)}` : ''}` : ''}. The institute bills the campus hostel and mess but publishes no budget for the rest of a year's living costs, ${o ? 'so the figures above use its billed amount.' : `so this page shows no total cost and no payback for the reference person earning ${K.ref()}.`} The class graduating in 2026 reported a ${K.salaryKind(slug)} of ${R(sal.v)}, without saying how much of it is fixed and how much variable. ${belowRef ? `Converted to dollars that median is ${K.salaryUsd(slug)}, lower than the ${K.ref()} the site assumes before the MBA, so the reference person is the wrong yardstick here in any case.` : ''} Type your own current salary and a monthly budget in the calculator: for most Indian managers the salary before the program is far lower, and the result changes completely. What sets the EPGP apart is its tilt to consulting: ${K.share(slug, 'consulting')} of the class went there, ahead of technology at ${K.share(slug, 'tech')}.`,
  body: (h) => `<h2>A consulting pipeline from a one-year class</h2>
<p>Of the ${K.num(s.classSize!)} students of the ${s.profile.cohort.replace('EPGP Class Profile ', '')} batch, ${K.share(slug, 'consulting')} joined consulting, ${K.share(slug, 'tech')} technology and ${K.share(slug, 'finance')} financial services; manufacturing, health care and a few others took the rest. The recruiters list mixes the large advisory firms with analytics and technology services: ${K.listOf(K.employers(slug, 8))}. ${consR ? `Our ${h.a('best-mba-consulting', 'consulting ranking')} places the EPGP ${consR.rank} of ${consR.of}.` : `Our ${h.a('best-mba-consulting', 'consulting ranking')} cannot place the EPGP without a full living budget, so compare it on share alone.`}</p>
<p>The report has gaps. It gives no salary by sector, no split by job function and no breakdown by city or country, and it does not say how many students sought a job through the institute or by what date offers were counted. It is not audited under the Indian Placement Reporting Standards, unlike the ${h.sc('iim-ahmedabad', 'IIM Ahmedabad PGPX')} report. The median is useful as a level, less so as a promise.</p>
${h.miniGoal(slug)}
<h2>Your salary, not the reference one</h2>
<p>The calculator at the top starts from ${K.ref()} a year before the MBA, a figure meant for the American and European schools on this site. For the EPGP it leads nowhere, since the median after the program is ${belowRef ? 'lower than that starting salary' : 'close to it'}. Replace it with what you earn today, in dollars at the current rate, keep the school's median as the salary after the degree or type the offer you expect, and add a living budget: the hostel and mess the institute bills, plus your own food beyond the mess, travel and personal costs. ${fees ? `The ${R(fees)} immersion is an estimate that the institute limits to actual travel, stay and partner-school fees.` : ''}</p>
${o ? h.miniPayback(slug) : h.miniFx()}
<h2>Scholarships and family housing</h2>
<p>${waiver ? `The institute offers a merit tuition waiver of ${R(waiver)} to the top rank holders of each admission round, a small number of awards for the whole batch.` : 'Merit waivers exist for the top candidates.'} Students who live with family outside the campus pay more than the hostel rate, which the institute shows in its own fee table. The ${h.a('best-mba-one-year', 'one-year MBA ranking')} and the ${h.a('best-mba-asia', 'Asia ranking')} compare the EPGP with ${h.sc('isb')} and the other short programs.</p>`,
  faqs: [
    { q: 'How much does the IIM Bangalore EPGP cost?', a: `Tuition is ${R(s.tuition!.v)} for the ${s.tuition!.cohort} batch${fees ? ` and the international immersion adds an indicative ${R(fees)}, for ${R(billed)}` : ''}. The campus hostel and mess are billed on top, while food beyond the mess, travel and personal spending are not estimated by the institute. Family accommodation off campus costs more than the hostel.` },
    { q: 'What salary do IIM Bangalore EPGP graduates earn?', a: `The batch graduating in 2026 reported a median salary of ${R(sal.v)}, without stating how much is fixed and how much variable. The institute gives no salary by sector, and its report is not audited under the Indian standard. ${K.share(slug, 'consulting')} of the class went into consulting and ${K.share(slug, 'tech')} into technology.` },
    { q: 'How long does the IIM Bangalore EPGP take to pay back?', a: `It depends almost entirely on your salary before the program, and this page shows no figure for the reference person because the institute publishes no full living budget. Type what you earn today, a budget for ${s.months} months and the ${R(sal.v)} median as the salary after in the calculator, and the payback becomes a real figure.` },
    { q: 'Are there scholarships for the IIM Bangalore EPGP?', a: `${waiver ? `Yes, a merit tuition waiver of ${R(waiver)} goes to the top rank holders of each admission round, a small number of awards in all.` : 'Merit waivers go to the top candidates.'} The institute does not publish other aid for the EPGP on the page we read, and the waiver applies to tuition only, not to the immersion or the hostel.` },
  ],
  related: ['school:iim-ahmedabad', 'school:isb', 'school:iim-calcutta', 'best-mba-consulting', 'best-mba-one-year'],
});
