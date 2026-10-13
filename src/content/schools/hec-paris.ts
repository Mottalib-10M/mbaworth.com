import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'hec-paris';
const s = K.s(slug);
const o = K.roi(slug);
const ind = (k: string) => s.emp.industries.find((x) => x.key === k);
const tech = ind('tech'), fin = ind('finance'), cons = ind('consulting');
const zone = (z: string) => s.emp.zones.find((x) => x.zone === z);
const asia = zone('Asia'), us = zone('US'), eu = zone('Europe');
const topSector = Math.max(...s.emp.industries.map((r) => r.salary ?? 0));
const allBelow = s.emp.salary ? topSector > 0 && topSector < s.emp.salary.v : false;
const bonus = s.emp.bonus;
const eur = K.rank(slug, 'z-europe'), me = K.rank(slug, 'z-me'), asiaR = K.rank(slug, 'z-asia');

export default defineSchool({
  slug,
  title: 'HEC Paris MBA 2026: 16 Months Near Paris, Cost and Pay',
  description: `HEC Paris MBA 2026: ${K.tuition(slug)} tuition for ${s.months} months, a ${K.living(slug)} living budget, ${K.salary(slug)} average total pay and the payback for the salary you earn today.`,
  intro: `${K.intl(slug)} of the class comes from abroad, and only ${K.share(slug, 'z-europe')} of graduates who took a job stayed in Europe.`,
  resume: `The HEC Paris MBA costs ${K.tuition(slug)} in tuition for a ${s.months}-month program on the Jouy-en-Josas campus south-west of Paris, with no separate mandatory fee, and the school budgets ${K.living(slug)} for a single student over the same period, for ${K.direct(slug)} before lost salary. ${o ? `A person earning ${K.ref()} today gives up ${K.usd(o.forgone)} over those ${s.months} months, which brings the total to ${K.usd(o.total)}.` : ''} The class of 2025 reported an ${K.salaryKind(slug)} of ${K.salary(slug)}, a package that includes bonuses rather than a base salary${o ? `; on that figure the reference person repays the cost ${K.payback(slug) ?? 'in more than 30 years'} after graduation, with a ten-year net present value of ${K.npv(slug)}` : ''}. What makes HEC unusual is how far its graduates spread: ${K.share(slug, 'z-asia')} went to work in Asia and Oceania and ${K.share(slug, 'z-me')} in Africa and the Middle East, against ${K.share(slug, 'z-europe')} in Europe, France included. Technology, not consulting, is the largest sector.`,
  body: (h) => `<h2>A package figure, and sector lines that sit lower</h2>
<p>HEC reports its class of 2025 under the MBA CSEA standard, but the headline it prints is an average salary package of ${K.salary(slug)}, base and bonuses together. The school also gives a lower median beneath it. ${allBelow ? `Every sector median in the report is below that package: technology ${tech?.salary ? K.money(tech.salary, 'USD') : 'n/a'}, finance ${fin?.salary ? K.money(fin.salary, 'USD') : 'n/a'}, consulting ${cons?.salary ? K.money(cons.salary, 'USD') : 'n/a'}.` : ''} Compare sector lines with each other, not with the headline, and treat the payback above as an upper estimate of what the degree earns back. ${bonus ? `Signing bonuses had a median of ${K.money(bonus.v, 'USD')}.` : ''}</p>
<p>Technology took ${K.share(slug, 'tech')} of the class, ahead of finance at ${K.share(slug, 'finance')} and consulting at ${K.share(slug, 'consulting')}. That order differs from INSEAD, its neighbor in the ${h.a('compare-insead-vs-hec', 'INSEAD and HEC comparison')}, where consulting takes ${K.share('insead', 'consulting')} of the class. Employers named by the school for two hires or more include ${K.listOf(K.employers(slug, 5))}.</p>
${h.miniGoal(slug)}
<h2>Where the class goes after Jouy-en-Josas</h2>
<p>The regional split is the most useful part of the report for a non-European applicant. ${eu ? `${K.p(eu.pct!)} of graduates who took a job work in Europe` : 'Europe takes the largest share'}, ${asia ? `${K.p(asia.pct!)} in Asia and Oceania${asia.salary ? ` at ${K.money(asia.salary, 'USD')}` : ''}` : 'a quarter in Asia'}, ${us ? `${K.p(us.pct!)} in North America${us.salary ? ` at ${K.money(us.salary, 'USD')}` : ''}` : 'a small share in North America'}, and the rest in the Middle East, Africa and Latin America. ${asia?.salary && us?.salary ? `The gap between the American and Asian figures, ${K.money(us.salary - asia.salary, 'USD')}, is a reminder that the headline salary mixes very different labor markets.` : ''} ${eur ? `In our ranking for ${h.a('best-mba-europe', 'working in Europe')}, HEC is ${eur.rank} of ${eur.of}` : ''}${asiaR ? `; for ${h.a('best-mba-asia', 'Asia')} it is ${asiaR.rank} of ${asiaR.of}` : ''}${me ? ` and for the ${h.a('best-mba-middle-east', 'Middle East')} ${me.rank} of ${me.of}` : ''}.</p>
<p>Many graduates move country and sector at the same time: the report says most found jobs outside their home country and more than half switched sector. ${s.emp.employed !== null ? `${K.p(s.emp.employed)} ${s.emp.employedLabel}.` : ''}</p>
${o ? h.miniPayback(slug) : h.mini('forgone')}
<h2>Paying in euros, deposit first</h2>
<p>The fee is billed in euros, a deposit first and two instalments after, so the dollar cost moves with the exchange rate. The living budget is the school's figure for a single student on campus; a couple living on campus pays noticeably more, as the school states. The January intake can finish in about a year, which shortens the months without salary. The converter below turns the euro amounts into your own currency at the ECB rate, and the ${h.a('mba-scholarships', 'scholarship guide')} shows what an award changes.</p>
${h.miniFx()}`,
  faqs: [
    { q: 'How much does the HEC Paris MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${s.tuition!.cohort}, and the school budgets ${K.living(slug)} for a single student over ${s.months} months, for ${K.direct(slug)}. ${o ? `Counting the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)} at the current exchange rate.` : ''} A partner on campus raises the living cost.` },
    { q: 'What salary do HEC Paris MBA graduates report?', a: `The class of 2025 reported an average salary package of ${K.salary(slug)}, which includes bonuses, with a lower median printed beneath it. By sector, technology paid ${tech?.salary ? K.money(tech.salary, 'USD') : 'an unpublished figure'} and consulting ${cons?.salary ? K.money(cons.salary, 'USD') : 'an unpublished figure'}. By region, North America paid ${us?.salary ? K.money(us.salary, 'USD') : 'an unpublished figure'} and Asia ${asia?.salary ? K.money(asia.salary, 'USD') : 'an unpublished figure'}. All amounts are in US dollars, as the school publishes them.` },
    { q: 'Do HEC Paris MBA graduates stay in France?', a: `Not mostly. ${eu ? `${K.p(eu.pct!)} of graduates who took a job work in Europe, France included,` : 'Europe takes the largest share,'} while ${K.share(slug, 'z-asia')} went to Asia and Oceania and ${K.share(slug, 'z-me')} to Africa and the Middle East. With ${K.intl(slug)} of the class from abroad, many return to their home region or move to a third country.` },
    { q: 'How long does it take to repay the HEC Paris MBA?', a: `${o ? `For a person earning ${K.ref()} before the degree, ${K.payback(slug) ?? 'more than 30 years'} after graduation on the average package, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the MBA and ${Math.round(K.MODEL.g0 * 100)}% without, before tax. ` : ''}Because the package includes bonuses, a base salary repays more slowly; type the base you expect in the calculator.` },
  ],
  related: ['school:insead', 'school:essec', 'compare-insead-vs-hec', 'best-mba-europe', 'best-mba-one-year'],
});
