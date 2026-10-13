import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'unc-kenan-flagler';
const s = K.s(slug);
const o = K.roi(slug)!;
const months = s.months ?? 21;
const nth = (r: { rank: number }) => (r.rank === 1 ? 'first' : `number ${r.rank}`);
const rFin = K.rank(slug, 'finance'), rHc = K.rank(slug, 'healthcare'), rEn = K.rank(slug, 'energy'), rAll = K.rank(slug, 'all');
const fn = (re: RegExp) => s.emp.functions.find((f) => re.test(f.label));
const finAll = fn(/Finance \(all\)/), ibFn = fn(/Investment Banking/), reFn = fn(/Real Estate/);
const hcShares = K.schools.map((x) => K.shareRaw(x.slug, 'healthcare')).filter((v): v is number => v !== null);
const hcAbove = hcShares.filter((v) => v > (K.shareRaw(slug, 'healthcare') ?? 0)).length;
const usAll = K.schools.filter((x) => x.country === 'US');
const usIntern = usAll.filter((x) => x.emp.intern !== null).length;
const energyNames = K.employers(slug, 10).filter((n) => /Energy|Exxon/.test(n));

export default defineSchool({
  slug,
  title: 'UNC Kenan-Flagler MBA 2026: Finance Jobs, Cost, Payback',
  description: `UNC Kenan-Flagler MBA 2026: ${K.direct(slug)} for two years, a ${K.salary(slug)} average base salary, ${K.share(slug, 'finance')} of the class in finance, ${K.payback(slug)} payback for a person earning ${K.ref()}.`,
  intro: `A Chapel Hill program where ${finAll ? K.p(finAll.pct!) : K.share(slug, 'finance')} of graduates hold a finance job, and whose salary headline is an average rather than a median.`,
  resume: `The UNC Kenan-Flagler full-time MBA costs ${K.tuition(slug)} in tuition and mandatory fees at the rate for students from outside North Carolina, and the school budgets ${K.living(slug)} for living costs, for ${K.direct(slug)} over two years. The school publishes one year only, and expects tuition to rise, so the two-year figure is a floor. For a person earning ${K.ref()} today, the ${months} months away add ${K.usd(o.forgone)}; the school publishes no internship pay to subtract, so the total is ${K.usd(o.total)}. The class of 2025 reported an ${K.salaryKind(slug)} of ${K.salary(slug)}, which repays that total ${K.payback(slug)} after graduation and leaves a ten-year net present value of ${K.npv(slug)}. What sets the school apart is finance: ${finAll ? `${K.p(finAll.pct!)} of graduates took a finance job by function` : `${K.share(slug, 'finance')} went into financial services`}${rFin ? `, and it ranks ${nth(rFin)} of ${rFin.of} in our finance ranking` : ''}.`,
  body: (h) => `<h2>Finance by function, not only by industry</h2>
<p>Financial services was the largest industry for the class of 2025, ${K.share(slug, 'finance')} at a median of ${K.segSalary(slug, 'finance')}. The function table shows a wider reach: ${finAll ? `${K.p(finAll.pct!)} of graduates hold a finance job` : 'more graduates hold a finance job than work in the industry'}, because corporate finance and real estate roles sit in companies outside the banks. ${ibFn ? `Investment banking accounts for ${K.p(ibFn.pct!)} by function` : ''}${reFn ? ` and real estate for ${K.p(reFn.pct!)}, a group few schools report separately` : ''}. ${rFin ? `On share, salary and ten-year value, Kenan-Flagler comes ${nth(rFin)} of ${rFin.of} in our ${h.a('best-mba-finance', 'finance ranking')}.` : ''} Consulting is second at ${K.share(slug, 'consulting')}, at the same median of ${K.segSalary(slug, 'consulting')}.</p>
${h.miniGoal(slug)}
<h2>An average salary, and why the payback looks long</h2>
<p>The headline ${K.salary(slug)} is a mean of base salaries, while the figures by industry are medians, and the two do not line up: both finance and consulting report medians above the school-wide average. On the finance median, the payback for the reference person is ${K.payback(slug, 'finance')}, against ${K.payback(slug, 'all')} on the school-wide figure. The gap comes from the mix of the class, with lower-paid groups pulling the average down, and from comparing a mean with medians. The ten-year value of ${K.npv(slug)} is small next to a total cost of ${K.usd(o.total)}: for someone with no clear goal, the degree only just pays for itself over a decade on this model.</p>
<p>One line works against the school on this page. It publishes no summer internship pay, so the calculator subtracts nothing for those months; ${usIntern} of the ${usAll.length} American schools on this site publish that figure and get a credit for it. A paid internship would shorten the payback shown.</p>
${h.miniPayback(slug)}
<h2>Healthcare and energy, larger than at most schools</h2>
<p>${K.share(slug, 'healthcare')} of the class went into healthcare at ${K.segSalary(slug, 'healthcare')}; only ${hcAbove} school${hcAbove === 1 ? '' : 's'} on this site report${hcAbove === 1 ? 's' : ''} a larger share${rHc ? `, and Kenan-Flagler ranks ${nth(rHc)} of ${rHc.of} for healthcare careers` : ''}. Energy took ${K.share(slug, 'energy')} at ${K.segSalary(slug, 'energy')}${rEn ? `, ${nth(rEn)} of ${rEn.of} in our energy ranking` : ''}${energyNames.length ? `, with ${K.listOf(energyNames)} among the employers the school names` : ''}. Both medians are below the school average, so these careers repay more slowly: ${K.payback(slug, 'healthcare')} on the healthcare median. ${rAll ? `Across the whole class, counting the ${K.p(s.emp.employed!)} employed within three months, the school ranks ${nth(rAll)} of ${rAll.of} in our ${h.a('mba-roi', 'whole-class ranking')}.` : ''}</p>`,
  faqs: [
    { q: 'How much does the UNC Kenan-Flagler MBA cost?', a: `Tuition and mandatory fees come to ${K.tuition(slug)} for two years at the non-resident rate, a floor since the school publishes one year and expects increases. The living budget adds ${K.living(slug)}, for ${K.direct(slug)}. With ${K.usd(o.forgone)} of salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)}. North Carolina residents pay less tuition.` },
    { q: 'Is the UNC Kenan-Flagler salary a median or an average?', a: `An average. The class of 2025 reported a mean base salary of ${K.salary(slug)} and a mean signing bonus of ${K.money(s.emp.bonus!.v, 'USD')}, while the figures by industry are medians: ${K.segSalary(slug, 'finance')} in finance and consulting, ${K.segSalary(slug, 'healthcare')} in healthcare. A mean and a median are not interchangeable, so compare like with like across schools.` },
    { q: 'How long does the UNC Kenan-Flagler MBA take to pay back?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the average salary, before tax, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without. On the finance median it shortens to ${K.payback(slug, 'finance')}. No internship pay is subtracted, because the school does not publish it.` },
    { q: 'Is UNC Kenan-Flagler a good MBA for finance careers?', a: `${finAll ? `${K.p(finAll.pct!)} of the class of 2025 took a finance job by function` : `${K.share(slug, 'finance')} went into financial services`}, ${ibFn ? `${K.p(ibFn.pct!)} of it in investment banking, ` : ''}and the industry median was ${K.segSalary(slug, 'finance')}. ${rFin ? `Our finance ranking, which weighs share, salary and ten-year value for the same person, places the school ${nth(rFin)} of ${rFin.of}.` : ''} Real estate and corporate finance roles widen the choice beyond the banks.` },
  ],
  related: ['school:duke-fuqua', 'school:uva-darden', 'school:vanderbilt-owen', 'best-mba-finance', 'best-mba-usa', 'mba-roi'],
});
