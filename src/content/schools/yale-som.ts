import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'yale-som';
const s = K.s(slug);
const o = K.roi(slug)!;
const months = s.months ?? 21;
const nth = (r: { rank: number }) => (r.rank === 1 ? 'first' : `number ${r.rank}`);
const sal = s.emp.salary!;
const b = s.emp.bonus!;
const ib = s.emp.segments.find((x) => x.key === 'ib');
const ibShares = K.schools.map((x) => K.shareRaw(x.slug, 'ib')).filter((v): v is number => v !== null);
const ibAbove = ibShares.filter((v) => v > (ib?.pct ?? 0)).length;
const conTot = s.emp.functions.find((f) => /Consulting \(total\)/.test(f.label));
const conInt = s.emp.functions.find((f) => /Internal/.test(f.label));
const rIb = K.rank(slug, 'ib'), rFc = K.rank(slug, 'f-consulting'), rCo = K.rank(slug, 'consulting');
const usAll = K.schools.filter((x) => x.country === 'US');
const usIntern = usAll.filter((x) => x.emp.intern !== null).length;
const np = s.emp.industries.find((r) => r.key === 'nonprofit');
const sch = s.scholarship.v ? K.money(s.scholarship.v, 'USD') : null;

export default defineSchool({
  slug,
  title: 'Yale SOM MBA 2026: Consulting, Banking and Total Cost',
  description: `Yale SOM MBA 2026: ${K.direct(slug)} for two years, a ${K.salary(slug)} median base salary, ${K.share(slug, 'consulting')} of the class in consulting firms, ${K.payback(slug)} payback for a ${K.ref()} earner.`,
  intro: `A New Haven program where ${conTot ? K.p(conTot.pct!) : K.share(slug, 'consulting')} of graduates hold a consulting job, and ${ib ? K.p(ib.pct!) : 'a large share'} went into investment banking.`,
  resume: `Two years at the Yale School of Management cost ${K.direct(slug)} in tuition, fees and the school's living budget, counting the second year at the rates published for 2026-27. For a person earning ${K.ref()} today, the ${months} months away add ${K.usd(o.forgone)}, for a total of ${K.usd(o.total)}; Yale publishes internship pay only by the week, so nothing is subtracted for the summer. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, with the middle half earning between ${K.money(sal.p25!, 'USD')} and ${K.money(sal.p75!, 'USD')}, and ${K.p(b.pct!)} received a signing bonus at a median of ${K.money(b.v, 'USD')}. On those figures the degree repays the total ${K.payback(slug)} after graduation, with a ten-year net present value of ${K.npv(slug)}. What sets Yale apart is the weight of two careers: consulting firms took ${K.share(slug, 'consulting')} of the class and investment banks ${ib ? K.p(ib.pct!) : 'a large share'}.`,
  body: (h) => `<h2>${conTot && conTot.pct! >= 40 && conTot.pct! < 50 ? 'Close to half the class in a consulting role' : 'Consulting, inside and outside the firms'}</h2>
<p>Consulting firms hired ${K.share(slug, 'consulting')} of the class of 2025 at a median of ${K.segSalary(slug, 'consulting')}, the highest of any industry in the report. The function table goes further: ${conTot ? `${K.p(conTot.pct!)} of graduates hold a consulting job` : 'more graduates hold a consulting job than work at the firms'}${conInt ? `, ${K.p(conInt.pct!)} of them in internal consulting and strategy teams inside companies` : ''}. ${rFc ? `By function Yale ranks ${nth(rFc)} of ${rFc.of} for consulting work` : ''}${rCo ? `, and ${nth(rCo)} of ${rCo.of} in our ${h.a('best-mba-consulting', 'consulting ranking')} by industry` : ''}. On the consulting median, the payback for the reference person falls to ${K.payback(slug, 'consulting')}.</p>
<p>Technology is a small group here, ${K.share(slug, 'tech')}, at ${K.segSalary(slug, 'tech')}, which stretches the payback to ${K.payback(slug, 'tech')}. Healthcare takes ${K.share(slug, 'healthcare')} at ${K.segSalary(slug, 'healthcare')}${np?.pct ? `, and nonprofit work ${K.p(np.pct)}` : ''}.</p>
${h.miniGoal(slug)}
<h2>${ibAbove === 1 ? 'A banking pipeline second to one school' : 'A large banking pipeline'}</h2>
<p>${ib ? `Investment banking took ${K.p(ib.pct!)} of the class at a median of ${K.money(ib.salary!, 'USD')}. ${ibAbove === 0 ? 'No school that publishes the segment reports a larger share.' : `Only ${ibAbove} of the ${ibShares.length} schools that publish the segment report${ibAbove === 1 ? 's' : ''} a larger share.`}${rIb ? ` On share, salary and ten-year value Yale comes ${nth(rIb)} of ${rIb.of} in our ${h.a('best-mba-investment-banking', 'investment banking ranking')}.` : ''}` : 'The school reports a large finance group.'} Finance as a whole is ${K.share(slug, 'finance')} of the class at ${K.segSalary(slug, 'finance')}. ${ib?.salary === sal.v ? 'Banking pays the same median as the school as a whole, so' : 'On the finance median'} the degree repays in ${K.payback(slug, 'finance')}, while consulting is faster. A small share of graduates also reported a guaranteed year-end bonus, which the calculator does not count.</p>
${h.miniPayback(slug)}
<h2>Why the total includes no internship pay</h2>
<p>${usIntern * 2 > usAll.length ? 'Most' : `${usIntern} of the ${usAll.length}`} American schools on this site give a monthly internship figure that the calculator subtracts from the salary you give up. Yale publishes a weekly median only, and we do not convert it, so the ${K.usd(o.total)} total and the payback are both higher than they would be with a paid summer counted. The living budget of ${K.living(slug)} for two years assumes a single student in shared housing with a modest lifestyle, and it includes the university health plan, which can be waived with other cover. ${sch ? `On aid, the school reports a median award of ${sch} for the class of 2027, without saying whether that is per year or for the program; the tool below shows what an award of your own size does to the payback.` : 'The tool below shows what a scholarship does to the payback.'}</p>
${h.miniScholarship(slug)}`,
  faqs: [
    { q: 'How much does the Yale SOM MBA cost for two years?', a: `Tuition is ${K.tuition(slug)} and fees ${K.fees(slug)}, counting the second year at 2026-27 rates, and the school budgets ${K.living(slug)} for living, for ${K.direct(slug)}. A person earning ${K.ref()} today also gives up ${K.usd(o.forgone)} of salary, for a total of ${K.usd(o.total)}. No internship pay is subtracted, since Yale gives it only by the week.` },
    { q: 'What salary do Yale SOM graduates earn?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}, with the middle half between ${K.money(sal.p25!, 'USD')} and ${K.money(sal.p75!, 'USD')}. Consulting paid ${K.segSalary(slug, 'consulting')}, finance ${K.segSalary(slug, 'finance')} and technology ${K.segSalary(slug, 'tech')}. ${K.p(b.pct!)} of graduates also received a signing bonus, at a median of ${K.money(b.v, 'USD')}. The figures cover graduates who accepted a job and reported pay to the school.` },
    { q: 'How long does the Yale SOM MBA take to pay back?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school-wide median, before tax, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without. On the consulting median it falls to ${K.payback(slug, 'consulting')}; on the technology median it rises to ${K.payback(slug, 'tech')}. A higher salary today lengthens each figure.` },
    { q: 'Is Yale SOM good for investment banking?', a: `${ib ? `${K.p(ib.pct!)} of the class of 2025 went into investment banking at a median of ${K.money(ib.salary!, 'USD')}` : 'The school reports a large banking group'}${ibAbove === 1 ? ', a share only one school on this site exceeds' : ''}. ${rIb ? `Our investment banking ranking places Yale SOM ${nth(rIb)} of ${rIb.of}, weighing share, salary and ten-year value for a person earning ${K.ref()} before the MBA.` : ''}` },
  ],
  related: ['school:tuck', 'school:columbia', 'school:nyu-stern', 'best-mba-consulting', 'best-mba-investment-banking', 'compare-mba'],
});
