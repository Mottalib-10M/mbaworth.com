import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'georgia-tech-scheller';
const s = K.s(slug);
const o = K.roi(slug);
const ind = (k: string) => s.emp.industries.find((x) => x.key === k);
const cons = ind('consulting'), tech = ind('tech'), energy = ind('energy'), fin = ind('finance');
const fee = (x: (typeof K.schools)[number]) => (x.tuition ? x.tuition.v + (x.fees?.v ?? 0) : null);
const us = K.schools.filter((x) => x.country === 'US' && fee(x) !== null).sort((a, b) => fee(a)! - fee(b)!);
const cheapestUs = us[0]?.slug === slug;
const usCount = us.length;
const techRank = K.rank(slug, 'tech');
const usRank = K.rank(slug, 'z-us');
const bonus = s.emp.bonus;
const intern = s.emp.intern;
const fnMkt = s.emp.functions.find((f) => /Marketing/.test(f.label));

export default defineSchool({
  slug,
  title: 'Georgia Tech Scheller MBA 2026: Atlanta Fees and Salary',
  description: `Georgia Tech Scheller MBA 2026: ${K.tuition(slug)} tuition for two years in Atlanta, a ${K.salary(slug)} median base salary, ${K.share(slug, 'tech')} of graduates hired in tech, and your payback.`,
  intro: `${cheapestUs ? `The lowest tuition and fees of the ${usCount} American schools on this site` : `Tuition and fees of ${K.usd(fee(s)!)}`}, a class of ${K.num(s.classSize!)} and as many graduates hired by technology firms as by consultancies.`,
  resume: `The Georgia Tech Scheller full-time MBA costs ${K.tuition(slug)} in tuition for two years at the out-of-state rate, plus ${K.fees(slug)} of institute fees and a ${K.living(slug)} living budget, for ${K.direct(slug)} before the salary you give up. ${o ? `A person earning ${K.ref()} today adds ${K.usd(o.forgone)} of lost pay over ${s.months} months; the paid summer internship takes part of that back, and the total settles at ${K.usd(o.total)}.` : ''} The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}${o ? `, enough to repay that total ${K.payback(slug) ?? 'in more than 30 years'} after graduation, with a ten-year net present value of ${K.npv(slug)}` : ''}. Scheller is a small program inside an engineering university, and its report shows it: ${K.share(slug, 'consulting')} of graduates went into consulting and ${K.share(slug, 'tech')} into technology, while finance takes a much smaller share than at most American schools.`,
  body: (h) => `<h2>A technology pipeline from a small class</h2>
<p>With ${K.num(s.classSize!)} students in the class profile, Scheller runs a small full-time program, and its job report reads like that of a specialist school. Technology hired ${K.share(slug, 'tech')} of the class at a median of ${tech?.salary ? K.money(tech.salary, 'USD') : 'an unpublished figure'}, consulting ${K.share(slug, 'consulting')} at ${cons?.salary ? K.money(cons.salary, 'USD') : 'an unpublished figure'}, and finance only ${K.share(slug, 'finance')}${fin?.salary ? ` at ${K.money(fin.salary, 'USD')}` : ''}. ${techRank ? `That technology share places Georgia Tech number ${techRank.rank} of ${techRank.of} in our ${h.a('best-mba-tech', 'technology ranking')}, on the same model as every other school.` : ''} ${fnMkt ? `By job function, ${K.p(fnMkt.pct!)} of the class took marketing or sales roles, the second largest function after consulting.` : ''}</p>
<p>The energy line is small, ${K.share(slug, 'energy')} of the class, but worth a look for anyone drawn to the utilities around Atlanta: its median of ${energy?.salary ? K.money(energy.salary, 'USD') : 'an unpublished figure'} is the lowest of the sectors the school reports. With classes this small, one or two hires move a share by several points, so read the split as a direction rather than a forecast.</p>
${h.miniGoal(slug)}
<h2>Which tuition rate applies to you</h2>
<p>Georgia Tech is a public university and prices its MBA by residence. The ${K.tuition(slug)} used here is the out-of-state rate counted over two years; Georgia residents pay noticeably less, and students from outside the United States pay a slightly higher out-of-country rate plus a small international fee, so an international student should expect a little more than the figure above. The living budget is the university's standard allowance for any graduate student living off campus, not one written for MBA students. ${intern ? `The summer internship paid an average of ${K.money(intern.monthly, 'USD')} a month, which the calculator credits for about ${K.num(K.MODEL.internMonths, 1)} months.` : ''} ${bonus ? `${bonus.pct !== null ? `${K.p(bonus.pct)} of graduates` : 'Some graduates'} received a signing bonus, at a median of ${K.money(bonus.v, 'USD')}.` : ''}</p>
${o ? h.miniPayback(slug) : h.mini('forgone')}
<h2>A degree that keeps its graduates in the United States</h2>
<p>Practically the whole class that took a job, ${K.share(slug, 'z-us')}, works in the United States${usRank ? `, which ranks Scheller ${usRank.rank} of ${usRank.of} in our ranking for working there` : ''}. The report adds a detail that international applicants should read: graduates who needed a work visa reported a higher median salary than those with permanent status, and the report prints both medians side by side. ${K.intl(slug) ? `International students made up ${K.intl(slug)} of the class of 2025.` : ''} For a comparison with another public school at a similar price, see ${h.sc('indiana-kelley')} or ${h.sc('texas-mccombs')}.</p>`,
  faqs: [
    { q: 'How much does the Georgia Tech Scheller MBA cost?', a: `At the out-of-state rate, tuition is ${K.tuition(slug)} for the two years, fees ${K.fees(slug)} and the university's graduate living budget ${K.living(slug)}, for ${K.direct(slug)}. Georgia residents pay less tuition, students from abroad slightly more. ${o ? `With the salary given up at ${K.ref()} a year and the internship pay deducted, the total is ${K.usd(o.total)}.` : ''}` },
    { q: 'What do Georgia Tech Scheller MBA graduates earn?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}. Consulting paid a median of ${cons?.salary ? K.money(cons.salary, 'USD') : 'an unpublished figure'} and technology ${tech?.salary ? K.money(tech.salary, 'USD') : 'an unpublished figure'}, the two sectors that together hired most of the class. These are figures from a past class of graduates who reported their pay. ${bonus ? `A signing bonus, at a median of ${K.money(bonus.v, 'USD')}, went to ${bonus.pct !== null ? K.p(bonus.pct) : 'part'} of graduates.` : ''}` },
    { q: 'Is Georgia Tech Scheller a good MBA for a tech career?', a: `On the class of 2025 report, ${K.share(slug, 'tech')} of graduates went into technology at a ${tech?.salary ? K.money(tech.salary, 'USD') : 'unpublished'} median. ${techRank ? `Our technology ranking, which weighs that share, the salary and the ten-year value for a ${K.ref()} earner, places the school ${techRank.rank} of ${techRank.of}.` : ''} The class is small, so the share can move from one year to the next.` },
    { q: 'How long does it take to repay the Georgia Tech Scheller MBA?', a: `${o ? `For a person earning ${K.ref()} before the degree, ${K.payback(slug) ?? 'more than 30 years'} after graduation, assuming raises of ${Math.round(K.MODEL.g1 * 100)}% a year with the MBA and ${Math.round(K.MODEL.g0 * 100)}% without, before tax. ` : ''}A Georgia resident pays less tuition and repays sooner; a higher current salary pushes the date back. The calculator shows both cases.` },
  ],
  related: ['school:indiana-kelley', 'school:texas-mccombs', 'best-mba-tech', 'best-mba-usa', 'mba-finder'],
});
