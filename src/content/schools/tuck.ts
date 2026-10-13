import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'tuck';
const s = K.s(slug);
const o = K.roi(slug)!;
const months = s.months ?? 21;
const nth = (r: { rank: number }) => (r.rank === 1 ? 'first' : `number ${r.rank}`);
const rc = K.rank(slug, 'consulting'), rAll = K.rank(slug, 'all'), rAm = K.rank(slug, 'am');
const ib = s.emp.segments.find((x) => x.key === 'ib');
const am = s.emp.segments.find((x) => x.key === 'am');
const firms = ['McKinsey', 'Bain', 'Boston Consulting'].map((f) => s.emp.employers.find((e) => e.name.includes(f))?.name).filter((n): n is string => !!n);
const consultShares = K.schools.map((x) => K.shareRaw(x.slug, 'consulting')).filter((v): v is number => v !== null);
const above = consultShares.filter((v) => v > (K.shareRaw(slug, 'consulting') ?? 0)).length;
const placed = Math.round(((K.shareRaw(slug, 'consulting') ?? 0) / 100) * (s.classSize ?? 0));
const us = K.schools.filter((x) => x.country === 'US');
const livUs = us.map((x) => K.c(x.slug).living).filter((v): v is number => v !== null);
const livAbove = livUs.filter((v) => v > K.c(slug).living!).length;
const usIntl = us.map((x) => x.profile.intl).filter((v): v is number => v !== null);
const intlBelow = usIntl.filter((v) => v < (s.profile.intl ?? 0)).length;
const b = s.emp.bonus!;
const sameCon = K.schools.filter((x) => x.slug !== slug && K.segSalary(x.slug, 'consulting') === K.segSalary(slug, 'consulting')).length;
const sch = s.scholarship.v ? K.money(s.scholarship.v, 'USD') : null;

export default defineSchool({
  slug,
  title: 'Dartmouth Tuck MBA 2026: Consulting Pay, Cost and Payback',
  description: `Dartmouth Tuck MBA 2026: ${K.tuition(slug)} tuition over two years in Hanover, ${K.share(slug, 'consulting')} of the class in consulting at ${K.segSalary(slug, 'consulting')}, and ${K.payback(slug)} payback for a ${K.ref()} earner.`,
  intro: `A two-year program in Hanover, New Hampshire, whose graduates go into consulting more than at ${above <= 2 ? 'almost any other school on this site' : 'most schools on this site'}.`,
  resume: `The Tuck MBA at Dartmouth costs ${K.direct(slug)} for two years of tuition, program fees and the school's own living budget. Tuck publishes the first year only and warns of an increase for the second, so this total, which counts the second year at the first-year rate, is a floor. For a person earning ${K.ref()} today, the ${months} months away add ${K.usd(o.forgone)}; the school publishes no internship pay to subtract, which brings the total to ${K.usd(o.total)}. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, and ${K.p(b.pct!)} received a signing bonus at a median of ${K.money(b.v, 'USD')}. On those figures the degree repays the total ${K.payback(slug)} after graduation, with a ten-year net present value of ${K.npv(slug)}. Tuck's distinctive figure is consulting: ${K.share(slug, 'consulting')} of the graduates who took a job went into it, at a median of ${K.segSalary(slug, 'consulting')}${rc ? `, which puts the school ${nth(rc)} of ${rc.of} in our consulting ranking` : ''}.`,
  body: (h) => `<h2>${K.share(slug, 'consulting')} of the class goes to the consulting firms</h2>
<p>${above === 0 ? 'No school on this site reports a larger share of its class in consulting than Tuck.' : `Only ${above} school${above > 1 ? 's' : ''} on this site report${above > 1 ? '' : 's'} a larger share of the class in consulting than Tuck.`} With ${K.num(s.classSize!)} students in a class, ${K.share(slug, 'consulting')} means about ${K.num(placed)} graduates a year in the industry${firms.length ? `, and ${K.listOf(firms)} appear among the employers the school names` : ''}. The consulting median, ${K.segSalary(slug, 'consulting')}, is the highest of any industry in the report, and on it the payback for the reference person drops to ${K.payback(slug, 'consulting')}. ${sameCon > 0 ? `${sameCon} other school${sameCon === 1 ? '' : 's'} on this site report${sameCon === 1 ? 's' : ''} the same consulting median, so the choice between Tuck and a larger program for consulting turns on the share and the network more than the pay.` : 'The choice between Tuck and a larger program for consulting turns on the share and the network as much as the pay.'} The ${h.a('best-mba-consulting', 'consulting ranking')} sets the schools side by side.</p>
<p>Finance takes ${K.share(slug, 'finance')} of the class at ${K.segSalary(slug, 'finance')}${ib ? `, ${K.p(ib.pct!)} of it in investment banking at ${K.money(ib.salary!, 'USD')}` : ''}${am?.salary ? ` and ${K.p(am.pct!)} in asset management at ${K.money(am.salary, 'USD')}${rAm ? `, ${nth(rAm)} of ${rAm.of} in our asset management ranking` : ''}` : ''}. Technology is smaller, ${K.share(slug, 'tech')}, at a lower median of ${K.segSalary(slug, 'tech')}, which stretches the payback to ${K.payback(slug, 'tech')}.</p>
${h.miniGoal(slug)}
<h2>Hanover, and what the budget leaves out</h2>
<p>Tuition is ${K.money(s.tuition!.v / 2, 'USD')} a year and the program fee ${K.money(s.fees!.v / 2, 'USD')}. The living budget, ${K.living(slug)} for two years, is the school's estimate for a single student in campus housing, and ${livAbove} American school${livAbove === 1 ? '' : 's'} on this site publish${livAbove === 1 ? 'es' : ''} a higher one. It leaves out health insurance, which the school lists as an additional expense, and it rises for students who live off campus or bring a partner or a child; the school gives its own estimates for each. The calculator also has no internship pay to subtract, since Tuck does not publish it, so the total shown is on the high side. Above a current salary of ${K.usd(Math.ceil(s.tuition!.v / (months / 12) / 1000) * 1000)}, the pay you give up becomes the largest line of the bill.</p>
${h.miniPayback(slug)}
<h2>An American career, mostly</h2>
<p>${K.share(slug, 'z-us')} of graduates who took a job stayed in the United States. For an international student who wants to return home at once, the payback shown rests on an American salary and will not hold; the ${h.a('best-mba-europe', 'Europe')} and ${h.a('best-mba-asia', 'Asia')} rankings show which schools place there. ${K.intl(slug) ? `The class is ${K.intl(slug)} international, from ${K.num(s.profile.countries ?? 0)} countries; ${intlBelow === 0 ? 'no American school on this site reports a smaller share' : `only ${intlBelow} American school${intlBelow === 1 ? '' : 's'} on this site report${intlBelow === 1 ? 's' : ''} a smaller one`}.` : ''} ${rAll ? `Across the whole class, Tuck ranks ${nth(rAll)} of ${rAll.of} in our ${h.a('mba-roi', 'return ranking')}.` : ''} ${sch ? `Merit scholarships averaged ${sch} per academic year, renewed in the second; the tool below shows what an award does to the payback.` : ''}</p>
${h.miniScholarship(slug)}`,
  faqs: [
    { q: 'How much does the Dartmouth Tuck MBA cost in total?', a: `Tuition, program fees and the school's living budget come to ${K.direct(slug)} for two years, counting the second year at the first-year rate Tuck publishes, so the real figure is likely higher. With ${K.usd(o.forgone)} of salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)}. Health insurance is listed separately by the school.` },
    { q: 'Is Dartmouth Tuck a good MBA for consulting?', a: `On the numbers, yes: ${K.share(slug, 'consulting')} of Tuck graduates who took a job in 2025 went into consulting, at a median base salary of ${K.segSalary(slug, 'consulting')}. ${rc ? `Our consulting ranking places Tuck ${nth(rc)} of ${rc.of} schools, on share, salary and ten-year value for a person earning ${K.ref()} before the MBA.` : ''}` },
    { q: 'What salary do Dartmouth Tuck graduates report?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}, and ${K.p(b.pct!)} received a signing bonus at a median of ${K.money(b.v, 'USD')}. Pay varies by industry: ${K.segSalary(slug, 'consulting')} in consulting, ${K.segSalary(slug, 'finance')} in finance and ${K.segSalary(slug, 'tech')} in technology. These medians cover graduates who accepted a job and reported pay.` },
    { q: 'How long does the Dartmouth Tuck MBA take to repay?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation, before tax, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the MBA and ${Math.round(K.MODEL.g0 * 100)}% without. Aiming for consulting shortens it to ${K.payback(slug, 'consulting')}, since that industry pays above the school median; technology lengthens it to ${K.payback(slug, 'tech')}.` },
  ],
  related: ['school:uva-darden', 'school:yale-som', 'school:cornell-johnson', 'best-mba-consulting', 'consulting', 'compare-mba'],
});
