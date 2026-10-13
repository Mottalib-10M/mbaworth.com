import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'iim-ahmedabad';
const s = K.s(slug);
const o = K.roi(slug);
const R = (v: number) => K.money(v, 'INR');
const ind = (k: string) => s.emp.industries.find((x) => x.key === k);
const health = ind('healthcare'), cons = ind('consulting'), fin = ind('finance'), energy = ind('energy');
const eu = s.emp.zones.find((z) => z.zone === 'Europe');
const emp = K.schools.filter((x) => x.emp.employed !== null).sort((a, b) => b.emp.employed! - a.emp.employed!);
const empTop = emp[0]?.slug === slug;
const bonus = s.emp.bonus;
const fnTop = [...s.emp.functions].sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0))[0];
const asiaR = K.rank(slug, 'z-asia');
const isb = K.s('isb');
const indian = K.schools.filter((x) => x.country === 'IN');
const audited = indian.filter((x) => /IPRS/.test(x.emp.standard));
const onlyAudit = audited.length === 1 && audited[0].slug === slug;
const ages = K.schools.filter((x) => x.profile.age !== null);
const younger = ages.filter((x) => x.profile.age! < s.profile.age!).length;
const consFn = s.emp.functions.find((f) => /^Consulting/.test(f.label));

export default defineSchool({
  slug,
  title: 'IIM Ahmedabad PGPX 2026: One-Year MBA Fee and Audited Pay',
  description: `IIM Ahmedabad PGPX 2026: ${R(s.tuition!.v)} fee with campus housing, a ${R(s.emp.salary!.v)} audited median base salary, ${K.p(s.emp.employed!)} placed, and the cost worked out at your own salary.`,
  intro: `${empTop ? 'The highest placement rate of any school on this site' : `${K.p(s.emp.employed!)} of job seekers placed`}, on salary figures audited under the Indian placement standard.`,
  resume: `The PGPX, IIM Ahmedabad's one-year MBA for experienced managers, charges a bundled fee of ${R(s.tuition!.v)}${K.tuitionUsd(slug) ? ` (about ${K.tuitionUsd(slug)})` : ''} for the ${s.tuition!.cohort} batch, covering tuition, course materials and a single room on campus. The institute publishes no budget for food and personal spending, so ${o ? '' : `this page shows no total cost for the reference person earning ${K.ref()} and no payback. That reference salary is, in any case, far above what most Indian managers earn before the PGPX: type your own current salary and a monthly budget in the calculator to get a figure that means something.`} The class of 2026 reported a ${K.salaryKind(slug)} of ${R(s.emp.salary!.v)}, audited under the Indian Placement Reporting Standards, and ${K.p(s.emp.employed!)} of those who sought a job through the institute ${s.emp.employedLabel.replace('within three months', 'by the end of the placement season')}. What sets the PGPX apart is that audit${onlyAudit ? `, the only one among the ${indian.length} Indian programs on this site` : ''}, and a class whose average age of ${K.num(s.profile.age!)} is above that of ${younger} of the ${ages.length} schools here that publish one.`,
  body: (h) => `<h2>An audited report, read carefully</h2>
<p>The PGPX report for the class of 2026 was checked by an outside firm: ${s.emp.standard}. ${onlyAudit ? `No other Indian school on this site publishes an audited report.` : ''} The numbers carry details worth reading. ${bonus ? `Beyond the base salary, ${K.p(bonus.pct!)} of accepted offers included a one-time cash component, with a median of ${R(bonus.v)}; the calculator does not add it.` : ''} The placement season ran from November to June, so the acceptance rate describes the position at graduation rather than three months later, and students who were sponsored, went back to their employer or started a business are outside it.</p>
<p>By sector, technology took ${K.share(slug, 'tech')} of the class, consulting ${K.share(slug, 'consulting')}${cons?.salary ? ` at a median of ${R(cons.salary)}` : ''}, health care ${K.share(slug, 'healthcare')}${health?.salary ? ` at ${R(health.salary)}, the highest sector median in the report` : ''}, and finance ${K.share(slug, 'finance')}${fin?.salary ? ` at ${R(fin.salary)}` : ''}. ${energy?.salary ? `Energy, a small group, paid the least at ${R(energy.salary)}.` : ''} By role, ${fnTop ? `${fnTop.label.toLowerCase()} led at ${K.p(fnTop.pct!)}` : 'consulting roles led'}${consFn && cons && consFn.pct! > cons.pct! ? `, a larger share than the consulting firms themselves hired, so many of those roles sit inside companies` : ''}. The institute names ${K.listOf(K.employers(slug, 7))} as the firms that made the most offers.</p>
${h.miniGoal(slug)}
<h2>What the fee covers, and what you still pay</h2>
<p>The ${R(s.tuition!.v)} is the price for single student housing; married student housing costs more. The fee includes accommodation, books, library and computing, but not the international immersion program, whose cost and travel are billed separately, nor food, utilities and personal spending, for which the institute gives no estimate. Scholarships at entry can cover up to a quarter of the fee for several groups of candidates, and graduation awards reward performance, but their number and average are not published.</p>
<p>Almost the whole class stays in India: ${K.share(slug, 'z-asia')} of accepted offers were there${eu?.salary ? `, and the few offers in Europe paid a median of ${K.money(eu.salary, 'USD')}` : ''}. ${asiaR ? `That share ranks the PGPX ${asiaR.rank} of ${asiaR.of} in our ${h.a('best-mba-asia', 'Asia ranking')}.` : ''} Against ${h.sc('isb')}, the other large Indian one-year program, the PGPX class is older: an average age of ${K.num(s.profile.age!)} against ${isb.profile.age !== null ? K.num(isb.profile.age) : 'an unpublished figure'}.</p>
${h.miniFx()}`,
  faqs: [
    { q: 'How much does the IIM Ahmedabad PGPX cost?', a: `The bundled fee for the ${s.tuition!.cohort} batch is ${R(s.tuition!.v)}, with tuition, course materials and a single room on campus included. The international immersion program, food and personal spending come on top, and the institute publishes no budget for them. In US dollars the fee is about ${K.tuitionUsd(slug)} at the ECB rate.` },
    { q: 'What is the median salary after the IIM Ahmedabad PGPX?', a: `The class of 2026 reported a median base salary of ${R(s.emp.salary!.v)}, audited under the Indian Placement Reporting Standards. ${bonus ? `${K.p(bonus.pct!)} of accepted offers added a one-time cash component, at a median of ${R(bonus.v)}.` : ''} Health care paid the highest sector median${health?.salary ? `, ${R(health.salary)}` : ''}. These are offers to a past class, not a forecast for the next one.` },
    { q: 'How long does the IIM Ahmedabad PGPX take to pay back?', a: `This page cannot say for the reference person, because the institute publishes no living budget and the ${K.ref()} reference salary is far above typical Indian pay before the program. Type your current salary, a monthly budget for ${s.months} months and the median of ${R(s.emp.salary!.v)} in the calculator to get your own payback.` },
    { q: 'Who is the IIM Ahmedabad PGPX class?', a: `The ${s.profile.cohort} batch has an average age of ${K.num(s.profile.age!)}, ${K.p(s.profile.women!)} women and an average GMAT of ${K.num(s.profile.gmat!)}. The program is meant for managers with several years of work behind them, and the class of 2026 counted ${K.num(s.classSize!)} students. The institute does not publish a share of foreign students.` },
  ],
  related: ['school:isb', 'school:iim-bangalore', 'school:iim-calcutta', 'best-mba-asia', 'best-mba-one-year'],
});
