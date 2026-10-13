import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'uva-darden';
const s = K.s(slug);
const o = K.roi(slug)!;
const months = s.months ?? 21;
const nth = (r: { rank: number }) => (r.rank === 1 ? 'first' : `number ${r.rank}`);
const rc = K.rank(slug, 'consulting'), rall = K.rank(slug, 'all'), rFc = K.rank(slug, 'f-corpfin'), rMan = K.rank(slug, 'manufacturing');
const fnCon = s.emp.functions.find((f) => f.key === 'consulting');
const fnGm = s.emp.functions.find((f) => /General Management/.test(f.label));
const b = s.emp.bonus!;
const living = (sl: string) => K.c(sl).living;
const usTwo = K.schools.filter((x) => x.country === 'US' && x.twoYear && living(x.slug) !== null);
const cheaperLiving = usTwo.filter((x) => living(x.slug)! < living(slug)!).length;
const npvs = K.withRoi().map((x) => K.roi(x.slug)!.npv);
const npvAbove = npvs.filter((v) => v > o.npv).length;
const usEmp = K.schools.filter((x) => x.country === 'US').map((x) => x.emp.employed).filter((v): v is number => v !== null);
const empAboveUs = usEmp.filter((v) => v > (s.emp.employed ?? 0)).length;

export default defineSchool({
  slug,
  title: 'UVA Darden MBA 2026: Charlottesville Cost and Consulting',
  description: `UVA Darden MBA 2026: ${K.direct(slug)} for two years of study, a ${K.salary(slug)} median base salary, ${K.share(slug, 'consulting')} of hires in consulting, ${K.payback(slug)} payback for a ${K.ref()} earner.`,
  intro: `A two-year program in Charlottesville that ${rc?.rank === 1 ? 'tops our consulting ranking' : 'sends more than a third of its class into consulting'} and placed ${K.p(s.emp.employed!)} of job seekers within three months.`,
  resume: `The Darden MBA at the University of Virginia costs ${K.direct(slug)} for two years of tuition, fees and the school's living budget for an international student, counting the second year at the first-year figures the school publishes; Virginia residents and other American students pay less tuition. For a person earning ${K.ref()} today, the ${months} months away add ${K.usd(o.forgone)}, and since Darden publishes no internship pay, nothing is subtracted: the total is ${K.usd(o.total)}. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, ${K.p(b.pct!)} received a signing bonus at a median of ${K.money(b.v, 'USD')}, and ${K.p(s.emp.employed!)} of job seekers had accepted an offer within three months. On those figures the degree pays back ${K.payback(slug)} after graduation, with a ten-year net present value of ${K.npv(slug)}. Consulting is the largest destination, ${K.share(slug, 'consulting')} of the class at ${K.segSalary(slug, 'consulting')}${rc ? `, and Darden comes ${nth(rc)} of ${rc.of} in our consulting ranking` : ''}.`,
  body: (h) => `<h2>${rc?.rank === 1 ? 'Consulting first, and first in our ranking' : 'Consulting first, finance second'}</h2>
<p>${K.share(slug, 'consulting')} of graduates who took a job went into the consulting industry at a median of ${K.segSalary(slug, 'consulting')}${fnCon ? `, and ${K.p(fnCon.pct!)} hold a consulting job by function, a little more because some consultants work inside companies` : ''}. ${rc ? `Weighing that share, the salary and the ten-year value for the same person, our ${h.a('best-mba-consulting', 'consulting ranking')} places Darden ${nth(rc)} of ${rc.of}.` : ''} On the consulting median, the payback for the reference person is ${K.payback(slug, 'consulting')}.</p>
<p>Finance takes ${K.share(slug, 'finance')} at ${K.segSalary(slug, 'finance')}, though the report gives no split between banking, private equity and asset management, so the finance figures cannot be read segment by segment. ${rFc ? `By function, corporate finance is a strength: Darden ranks ${nth(rFc)} of ${rFc.of} there.` : ''} Technology is ${K.share(slug, 'tech')} at ${K.segSalary(slug, 'tech')}, where the payback stretches to ${K.payback(slug, 'tech') ?? 'beyond the model'}. ${fnGm ? `General management roles take ${K.p(fnGm.pct!)} of hires by function.` : ''} ${rMan ? `Manufacturing employers took ${K.share(slug, 'manufacturing')} of the class, enough for Darden to rank ${nth(rMan)} of ${rMan.of} in that industry.` : ''}</p>
${h.miniGoal(slug)}
<h2>Nearly every job seeker placed, and every graduate tracked</h2>
<p>${K.p(s.emp.employed!)} of the class seeking a job had accepted an offer three months after graduation; ${empAboveUs === 0 ? 'no American school on this site reports a higher rate' : `only ${empAboveUs} American school${empAboveUs === 1 ? '' : 's'} on this site report${empAboveUs === 1 ? 's' : ''} a higher one`}. ${s.emp.response !== null ? `The school tracked the outcomes of ${K.p(s.emp.response)} of the class, so the rate is not flattered by graduates who failed to answer.` : ''} ${rall ? `With salary and ten-year value, that places Darden ${nth(rall)} of ${rall.of} in our ${h.a('mba-roi', 'whole-class ranking')}` : ''}${npvAbove <= 3 ? `, and only ${npvAbove} school${npvAbove === 1 ? '' : 's'} of the ${npvs.length} we can compute leave${npvAbove === 1 ? 's' : ''} a higher ten-year value for the reference person` : ''}. ${K.share(slug, 'z-us')} of those jobs were in the United States. For an international student who wants to work at home right after the degree, the payback rests on an American salary; the ${h.a('best-mba-europe', 'Europe')} and ${h.a('best-mba-asia', 'Asia')} rankings show which schools place there.</p>
<h2>What the bill counts, and what it leaves out</h2>
<p>Charlottesville keeps the living budget at ${K.living(slug)} for two years, lower than all but ${cheaperLiving} of the ${usTwo.length} two-year American programs on this site that publish one. That budget is the international student's version, with travel home included; the school lists a computer allowance apart, and adds estimates for a spouse or a child. Tuition of ${K.tuition(slug)} is the international rate, which the school bundles with university fees in one line. The case fees add ${K.fees(slug)}. Darden does not publish summer internship pay, so the calculator gives no credit for those months and the total is on the high side.</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the UVA Darden MBA cost?', a: `Tuition and university fees, case fees and the school's living budget for an international student come to ${K.direct(slug)} for two years, counting the second year at the first-year rates. With ${K.usd(o.forgone)} of salary given up by a person earning ${K.ref()} today, the total reaches ${K.usd(o.total)}, with no internship pay subtracted. American students pay less tuition.` },
    { q: 'What salary do UVA Darden graduates earn?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}, and ${K.p(b.pct!)} received a signing bonus at a median of ${K.money(b.v, 'USD')}. Consulting paid a median of ${K.segSalary(slug, 'consulting')}, finance ${K.segSalary(slug, 'finance')} and technology ${K.segSalary(slug, 'tech')}, according to the school's employment report for that class, which tracked every graduate.` },
    { q: 'Is UVA Darden good for consulting?', a: `${K.share(slug, 'consulting')} of Darden graduates who took a job in 2025 went into consulting, at ${K.segSalary(slug, 'consulting')}. ${rc ? `Our ranking, which weighs that share, the salary and the ten-year value for a person earning ${K.ref()} before the MBA, places Darden ${nth(rc)} of ${rc.of} schools.` : ''} On that median the payback is ${K.payback(slug, 'consulting')}.` },
    { q: 'How quickly does a UVA Darden MBA pay back?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school-wide median, before tax, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, and ${K.payback(slug, 'consulting')} on the consulting median. A higher current salary lengthens both, since more pay is given up.` },
  ],
  related: ['school:tuck', 'school:duke-fuqua', 'school:michigan-ross', 'best-mba-consulting', 'mba-roi', 'consulting-case-interview'],
});
