import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'imd';
const s = K.s(slug);
const o = K.roi(slug);
const C = (v: number) => K.money(v, 'CHF');
const ind = (k: string) => s.emp.industries.find((x) => x.key === k);
const energy = ind('energy'), cons = ind('consulting'), mfg = ind('manufacturing'), tech = ind('tech'), fin = ind('finance');
const named = s.emp.industries.filter((r) => r.key !== 'other' && r.salary);
const topNamed = [...named].sort((a, b) => b.salary! - a.salary!)[0];
const chfM = s.emp.salary?.note.match(/approx\. CHF ([\d,]+)/);
const chf = chfM ? Number(chfM[1].replace(/,/g, '')) : null;
const enBeatsCons = !!(energy?.salary && cons?.salary && energy.salary > cons.salary);
const emp = K.schools.filter((x) => x.emp.employed !== null).sort((a, b) => a.emp.employed! - b.emp.employed!);
const lowestEmp = emp[0]?.slug === slug;
const enR = K.rank(slug, 'energy'), prodR = K.rank(slug, 'f-product'), genR = K.rank(slug, 'f-general'), euR = K.rank(slug, 'z-europe');

export default defineSchool({
  slug,
  title: 'IMD MBA 2026: Lausanne Cost, Total Pay and Payback',
  description: `IMD MBA 2026 in Lausanne: ${C(s.tuition!.v)} tuition and ${C(s.fees!.v)} of fees for a year, ${K.salary(slug)} average total pay, and a payback of ${K.payback(slug)} from a ${K.ref()} salary.`,
  intro: `A Lausanne class of ${K.num(s.classSize!)} managers averaging ${K.num(s.profile.age!)} years of age${enBeatsCons ? ', and an energy sector that pays more than consulting' : ''}.`,
  resume: `IMD charges ${C(s.tuition!.v)} in tuition for its one-year MBA and ${C(s.fees!.v)} of mandatory fees on top, which pay for the pre-program course, the travel and stays of school-organized projects, coaching, books, lunches on campus days and help with relocation and visas. The school puts the living cost of a single person in Lausanne at ${K.living(slug)}, for ${K.direct(slug)}${K.directUsd(slug) ? `, about ${K.directUsd(slug)}` : ''}. ${o ? `A person earning ${K.ref()} today gives up ${K.usd(o.forgone)} over ${s.months} months, for a total cost of ${K.usd(o.total)}.` : ''} The class of 2025 reported an ${K.salaryKind(slug)} of ${K.salary(slug)} in nominal dollars, a mean of total compensation rather than a base median${o ? `; on that figure the reference person repays the cost ${K.payback(slug) ?? 'in more than 30 years'} after graduation, with a ten-year net present value of ${K.npv(slug)}` : ''}. IMD is set apart by its size and age profile: ${K.num(s.classSize!)} students, ${K.num(s.profile.exp!)} years of experience on average, and graduates who mostly stay in Europe.`,
  body: (h) => `<h2>Energy and manufacturing, not only consulting</h2>
<p>Consulting is still the first destination, ${K.share(slug, 'consulting')} of the class${cons?.salary ? ` at an average of ${K.money(cons.salary, 'USD')}` : ''}, but the next sectors are industrial ones. Manufacturing took ${K.share(slug, 'manufacturing')}${mfg?.salary ? ` at ${K.money(mfg.salary, 'USD')}` : ''}, technology ${K.share(slug, 'tech')}${tech?.salary ? ` at ${K.money(tech.salary, 'USD')}` : ''}, and energy ${K.share(slug, 'energy')}${energy?.salary ? ` at ${K.money(energy.salary, 'USD')}` : ''}${topNamed && topNamed.key === 'energy' ? ', the highest average of any named sector in the report' : ''}. Finance is small at ${K.share(slug, 'finance')}${fin?.salary ? ` and pays ${K.money(fin.salary, 'USD')}` : ''}. ${enR ? `That energy figure puts IMD ${enR.rank === 1 ? 'first' : `number ${enR.rank}`} of ${enR.of} in our energy ranking` : ''}${prodR ? `, and its product management roles rank it ${prodR.rank === 1 ? 'first' : prodR.rank} of ${prodR.of} by job function` : ''}${genR ? `; for general management it is ${genR.rank} of ${genR.of}` : ''}.</p>
<p>All these figures are averages of total compensation, bonuses included, converted by the school into nominal dollars; ${chf ? `IMD says the overall figure equals roughly ${C(chf)}.` : ''} The career page also shows a larger dollar figure adjusted for purchasing power, which is the one quoted in its banners: the calculator uses the nominal one.</p>
${h.miniGoal(slug)}
<h2>A slower job search, for a smaller class</h2>
<p>${s.emp.employed !== null ? `${K.p(s.emp.employed)} of graduates ${s.emp.employedLabel}${lowestEmp ? ', the lowest rate among the schools on this site that publish one' : ''}.` : ''} Most participants switch role, industry or country, which can lengthen a search; the payback above assumes a job from the first month after graduation, so a slower start lengthens it. ${K.share(slug, 'z-europe')} of those placed work in Europe, Switzerland included${euR ? `, which ranks IMD ${euR.rank} of ${euR.of} for ${h.a('best-mba-europe', 'working in Europe')}` : ''}; ${K.share(slug, 'z-asia')} went to Asia and ${K.share(slug, 'z-me')} to the Middle East and Africa. The school publishes no list of employers.</p>
${o ? h.miniPayback(slug) : h.mini('forgone')}
<h2>Scholarships for almost half the class</h2>
<p>The class of 2026 has ${K.num(s.classSize!)} participants from ${K.num(s.profile.countries!)} countries. IMD says nearly half of its students received a scholarship from the school, and that more than half of its awards go to women, who are ${K.p(s.profile.women!)} of the current class. It does not publish an average amount. A scholarship comes off the ${C(s.tuition!.v)} tuition, not off the fees or the living budget. ${o ? 'The tool below shows by how much for the reference person.' : ''}</p>
${o ? h.miniScholarship(slug) : h.miniFx()}`,
  faqs: [
    { q: 'How much does the IMD MBA cost in total?', a: `Tuition is ${C(s.tuition!.v)} and mandatory fees ${C(s.fees!.v)}, which cover projects, coaching and other program costs. IMD estimates ${K.living(slug)} to live in Lausanne as a single person, for ${K.direct(slug)}. ${o ? `With the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)}.` : ''}` },
    { q: 'What do IMD MBA graduates earn?', a: `The class of 2025 reported average total compensation of ${K.salary(slug)} in nominal dollars, bonuses included, ${chf ? `which IMD equates to about ${C(chf)}` : 'as converted by the school'}. Energy paid an average of ${energy?.salary ? K.money(energy.salary, 'USD') : 'an unpublished figure'} and consulting ${cons?.salary ? K.money(cons.salary, 'USD') : 'an unpublished figure'}. A base salary median, the figure Harvard or Wharton report, would be lower than these averages of total pay.` },
    { q: 'How long does it take to repay the IMD MBA?', a: `${o ? `For a person earning ${K.ref()} before the MBA, ${K.payback(slug) ?? 'more than 30 years'} after graduation, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax. ` : ''}The salary used is an average of total pay, so a base salary or a slow job search lengthens the payback.` },
    { q: 'How many IMD MBA graduates find a job quickly?', a: `${s.emp.employed !== null ? `${K.p(s.emp.employed)} of the class of 2025 ${s.emp.employedLabel}.` : ''} ${lowestEmp ? 'No school on this site that publishes the rate reports a lower one.' : ''} The class is small and experienced, and most participants switch role, industry or country after the program, which can lengthen the search. Most of those placed work in Europe.` },
  ],
  related: ['school:insead', 'school:lbs', 'school:hec-paris', 'best-mba-europe', 'best-mba-one-year'],
});
