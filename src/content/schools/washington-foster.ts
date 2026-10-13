import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'washington-foster';
const s = K.s(slug);
const o = K.roi(slug)!;
const months = s.months ?? 21;
const nth = (r: { rank: number }) => (r.rank === 1 ? 'first' : `number ${r.rank}`);
const us = K.schools.filter((x) => x.country === 'US');
const usTech = us.map((x) => K.shareRaw(x.slug, 'tech')).filter((v): v is number => v !== null);
const techTopUs = (K.shareRaw(slug, 'tech') ?? 0) >= Math.max(...usTech);
const usWomen = us.map((x) => x.profile.women).filter((v): v is number => v !== null);
const womenTopUs = (s.profile.women ?? 0) >= Math.max(...usWomen);
const usTwo = us.filter((x) => x.twoYear);
const tf = (sl: string) => { const c = K.c(sl); return c.tuition === null ? null : c.tuition + c.fees; };
const tfUs = usTwo.map((x) => tf(x.slug)).filter((v): v is number => v !== null);
const tfBelow = tfUs.filter((v) => v < tf(slug)!).length;
const livUs = us.map((x) => K.c(x.slug).living).filter((v): v is number => v !== null);
const livAbove = livUs.filter((v) => v > K.c(slug).living!).length;
const internBack = K.usd(o.direct + o.forgone - o.total);
const rTech = K.rank(slug, 'tech'), rCons = K.rank(slug, 'consumer'), rMk = K.rank(slug, 'f-marketing');
const techMedEqual = K.segSalary(slug, 'tech') === K.salary(slug);
const interns = K.schools.map((x) => x.emp.intern?.usd ?? null).filter((v): v is number => v !== null);
const internAbove = interns.filter((v) => v > (s.emp.intern?.usd ?? 0)).length;
const tech4 = K.employers(slug, 10).filter((n) => /Amazon|Microsoft|Google|Apple|Adobe/.test(n)).slice(0, 4);

export default defineSchool({
  slug,
  title: 'Washington Foster MBA 2026: Seattle Tech Pay and Payback',
  description: `Washington Foster MBA 2026: ${K.tuition(slug)} non-resident tuition, ${K.share(slug, 'tech')} of the class in tech, a ${K.salary(slug)} median base salary, ${K.payback(slug)} payback for a ${K.ref()} earner.`,
  intro: `A Seattle program where ${K.share(slug, 'tech')} of graduates took technology jobs${techTopUs ? ', more than at any other American school on this site' : ''}, for tuition below most two-year programs.`,
  resume: `The full-time MBA at the University of Washington's Foster School costs ${K.tuition(slug)} in tuition at the non-resident and international rate, plus ${K.fees(slug)} of fees, and the school estimates ${K.living(slug)} for living costs over two twelve-month years, for ${K.direct(slug)} in all. For a person earning ${K.ref()} today, the ${months} months away add ${K.usd(o.forgone)}, the paid summer internship gives back about ${internBack}, and the total comes to ${K.usd(o.total)}. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, which repays that total ${K.payback(slug)} after graduation and leaves a ten-year net present value of ${K.npv(slug)}. What sets Foster apart is technology: ${K.share(slug, 'tech')} of the class went into the industry${techTopUs ? ', the largest share of any American school on this site' : ''}${rTech ? `, and it ranks ${nth(rTech)} of ${rTech.of} in our tech ranking` : ''}.`,
  body: (h) => `<h2>${techTopUs ? 'The most technology-heavy class of the American schools here' : 'A class built around technology'}</h2>
<p>${K.share(slug, 'tech')} of the graduates who took a job went into technology${techTopUs ? ', a larger share than at any other American school whose report we read' : ''}${tech4.length ? `, and the employers the school names start with ${K.listOf(tech4)}` : ''}. The technology median, ${K.segSalary(slug, 'tech')}, ${techMedEqual ? 'is the same as the school-wide median' : `compares with a school-wide median of ${K.salary(slug)}`}, so the payback on a technology career is ${K.payback(slug, 'tech')} for the reference person. Consumer goods and retail add ${K.share(slug, 'consumer')}${rCons ? `, ${nth(rCons)} of ${rCons.of} in our consumer ranking` : ''}, and by function marketing and sales roles take ${K.share(slug, 'f-marketing')}${rMk ? `, ${nth(rMk)} of ${rMk.of} for marketing careers` : ''}. A candidate set on product management in a large technology company should also read the ${h.a('tech-product-manager', 'product manager guide')}.</p>
${h.miniGoal(slug)}
<h2>Consulting pays more, finance much less</h2>
<p>Consulting took ${K.share(slug, 'consulting')} of the class at ${K.segSalary(slug, 'consulting')}, the highest median in the report, and on that salary the payback falls to ${K.payback(slug, 'consulting')}. Finance is a small group at ${K.share(slug, 'finance')}, and its median of ${K.segSalary(slug, 'finance')} is below the school-wide figure, which stretches the payback to ${K.payback(slug, 'finance')}. For banking or investment careers, the ${h.a('best-mba-finance', 'finance ranking')} shows schools that place far more graduates there.</p>
<h2>Low tuition, a generous living estimate</h2>
<p>Only ${tfBelow} of the ${tfUs.length} two-year American programs on this site charge less in tuition and fees than Foster, and the rate is the same for both years of a class. Washington residents pay less. The living estimate goes the other way: the school prices a full twelve months twice, although the program runs ${months} months, so ${K.living(slug)} is an upper figure, and only ${livAbove} American school${livAbove === 1 ? '' : 's'} on this site publish${livAbove === 1 ? 'es' : ''} a higher one. The internship softens the bill: the class of 2026 reported a median of ${K.money(s.emp.intern!.monthly, 'USD')} a month, and only ${internAbove} of the ${interns.length} schools on this site that publish internship pay report more. ${K.share(slug, 'z-us')} of graduates took jobs in Washington State, the only location the school gives, so the share working in the United States is at least that. ${womenTopUs ? `The class is ${K.p(s.profile.women ?? 0)} women, the highest share of any American school on this site.` : ''}</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the Washington Foster MBA cost?', a: `Tuition is ${K.tuition(slug)} at the non-resident rate and fees ${K.fees(slug)}; the school's living estimate for two twelve-month years adds ${K.living(slug)}, for ${K.direct(slug)}. With ${K.usd(o.forgone)} of salary given up by a person earning ${K.ref()}, less about ${internBack} of internship pay, the total is ${K.usd(o.total)}. Washington residents pay lower tuition.` },
    { q: 'Is Washington Foster a good MBA for tech careers?', a: `${K.share(slug, 'tech')} of the class of 2025 went into technology at a median of ${K.segSalary(slug, 'tech')}${techTopUs ? ', the largest share of any American school on this site' : ''}. ${rTech ? `Our tech ranking, which weighs share, salary and ten-year value for a person earning ${K.ref()}, places Foster ${nth(rTech)} of ${rTech.of}.` : ''} The payback on that median is ${K.payback(slug, 'tech')}.` },
    { q: 'How long does the Washington Foster MBA take to pay back?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school-wide median, before tax, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without. On the consulting median it falls to ${K.payback(slug, 'consulting')}; on the finance median it rises to ${K.payback(slug, 'finance')}.` },
    { q: 'Do Washington Foster graduates stay in Seattle?', a: `${(K.shareRaw(slug, 'z-us') ?? 0) > 50 ? 'Most stay in the state' : 'Many stay in the state'}: ${K.share(slug, 'z-us')} of the class of 2025 took jobs in Washington State, the only location the school reports. The rest are not broken down, so this site counts that figure as a floor for the share working in the United States. An international student planning to work at home should read the payback above as an American case.` },
  ],
  related: ['school:berkeley-haas', 'school:ucla-anderson', 'school:stanford', 'best-mba-tech', 'tech-product-manager', 'mba-payback-calculator'],
});
