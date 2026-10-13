import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'georgetown-mcdonough';
const s = K.s(slug);
const o = K.roi(slug);
const ind = (k: string) => s.emp.industries.find((x) => x.key === k);
const cons = ind('consulting'), fin = ind('finance'), tech = ind('tech');
const fn = (re: RegExp) => s.emp.functions.filter((f) => re.test(f.label)).reduce((t, f) => t + (f.pct ?? 0), 0);
const consFn = fn(/^Consulting/);
const ibpe = s.emp.functions.find((f) => /Investment Banking/.test(f.label));
const intern = s.emp.intern;
const bonus = s.emp.bonus;
const consOverFin = cons?.salary && fin?.salary ? cons.salary - fin.salary : null;
const even = K.shareRaw(slug, 'consulting') === K.shareRaw(slug, 'finance');
const mfg = K.rank(slug, 'manufacturing');
const ops = K.rank(slug, 'f-operations');

export default defineSchool({
  slug,
  title: 'Georgetown McDonough MBA 2026: Cost, Pay and Payback',
  description: `Georgetown McDonough MBA 2026: ${K.tuition(slug)} tuition over two years in Washington, a ${K.salary(slug)} median base salary and a payback of ${K.payback(slug) ?? 'over 30 years'} for a ${K.ref()} earner.`,
  intro: `A Washington MBA where consulting ${even ? `and finance each take ${K.share(slug, 'consulting')}` : `takes ${K.share(slug, 'consulting')} and finance ${K.share(slug, 'finance')}`} of the class, for ${K.direct(slug)} in tuition, fees and living costs over two years.`,
  resume: `Georgetown McDonough charges ${K.tuition(slug)} in tuition for the two years of its full-time MBA, a rate the school locks in for the entering class, plus ${K.fees(slug)} of fees and a ${K.living(slug)} living budget of its own, for ${K.direct(slug)} before any lost salary. ${o ? `A person earning ${K.ref()} before the degree gives up ${K.usd(o.forgone)} over ${s.months} months; once the summer internship pay is subtracted, the total cost comes to ${K.usd(o.total)}.` : ''} The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}${o ? `, which repays that total ${K.payback(slug) ?? 'in more than 30 years'} after graduation and leaves a ten-year net present value of ${K.npv(slug)}` : ''}. What sets the school apart is the balance of its class: consulting takes ${K.share(slug, 'consulting')} and finance ${K.share(slug, 'finance')}${consOverFin !== null && consOverFin > 0 ? ', and consulting pays the higher median of the two' : ''}. The report is also frank about a gap between American and international students in how fast offers were accepted, which matters to anyone who will need a visa.`,
  body: (h) => `<h2>Consulting pays more than finance in this class</h2>
<p>In Georgetown's report the strategy firms, not the banks, set the top of the pay scale: consultants from the class of 2025 reported a median of ${cons?.salary ? K.money(cons.salary, 'USD') : 'an unpublished figure'}, finance hires ${fin?.salary ? K.money(fin.salary, 'USD') : 'an unpublished figure'}${consOverFin !== null && consOverFin > 0 ? `, a gap of ${K.money(consOverFin, 'USD')} in favor of consulting` : ''}. Read by job function rather than by employer, consulting roles of every kind add up to ${K.p(consFn)} of the class, with general and strategy consulting the largest line, while ${ibpe ? `${K.p(ibpe.pct!)} took investment banking or private equity roles` : 'banking roles are a smaller group'}. Technology follows at ${K.share(slug, 'tech')} of the class${tech?.salary ? `, paid ${K.money(tech.salary, 'USD')} at the median` : ''}.</p>
<p>The firms the school names as top hirers mix strategy houses, Big Four firms, banks and large companies: ${K.listOf(K.employers(slug, 6))}. ${mfg ? `A smaller manufacturing group places Georgetown number ${mfg.rank} of ${mfg.of} in our manufacturing ranking` : 'Manufacturing is a small group'}${ops ? `, and its operations roles rank it ${ops.rank} of ${ops.of} by job function` : ''}.</p>
${h.miniGoal(slug)}
<h2>A tuition rate frozen for two years, a budget that is not</h2>
<p>The ${K.tuition(slug)} covers both years at the rate charged to the class entering in fall 2026, because Georgetown keeps first-year tuition for the second year as well. That removes one uncertainty that American students at other schools face, a second-year increase. The school's living budget, ${K.living(slug)} for the program, is twice its published allowance for the fall and spring terms, and Washington rents can push a real budget above it. ${intern ? `The summer between the two years pays an average of ${K.money(intern.monthly, 'USD')} a month, which the calculator credits for about ${K.num(K.MODEL.internMonths, 1)} months.` : ''} ${bonus ? `Signing bonuses averaged ${K.money(bonus.v, 'USD')}, a mean rather than a median, and the school does not say how many graduates received one.` : ''}</p>
${o ? h.miniPayback(slug) : h.mini('forgone')}
<h2>What the acceptance rate means for international students</h2>
<p>${s.emp.employed !== null ? `${K.p(s.emp.employed)} of graduates ${s.emp.employedLabel}` : 'The school reports a three-month acceptance rate'}, and the report splits the figure: American students moved faster than international students, who are ${K.intl(slug) ?? 'a large part'} of the class entering in 2026. Almost every graduate who took a job, ${K.share(slug, 'z-us')}, works in the United States, so the salary used above is an American one. For someone planning to return to Europe or Asia soon after the degree, the regional rankings such as ${h.a('best-mba-europe', 'working in Europe')} show the schools that actually place there.</p>`,
  faqs: [
    { q: 'How much does the Georgetown McDonough MBA cost in total?', a: `Tuition for the two years is ${K.tuition(slug)}, fees add ${K.fees(slug)} and the school budgets ${K.living(slug)} to live in Washington, for ${K.direct(slug)}. ${o ? `With the salary given up by a person earning ${K.ref()}, less the summer internship pay, the total reaches ${K.usd(o.total)}.` : ''} Rent above the school's allowance raises the figure.` },
    { q: 'What salary do Georgetown McDonough MBA graduates earn?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}. Consulting led at ${cons?.salary ? K.money(cons.salary, 'USD') : 'an unpublished median'}, ahead of finance at ${fin?.salary ? K.money(fin.salary, 'USD') : 'an unpublished median'} and technology at ${tech?.salary ? K.money(tech.salary, 'USD') : 'an unpublished median'}. These figures describe a past class and the graduates who reported their pay, not a promise for the next class, and a signing bonus comes on top for some of them.` },
    { q: 'How long does a Georgetown McDonough MBA take to pay back?', a: `${o ? `For a person earning ${K.ref()} before the MBA, ${K.payback(slug) ?? 'more than 30 years'} after graduation, assuming raises of ${Math.round(K.MODEL.g1 * 100)}% a year with the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax. ` : ''}Someone already earning more gives up more for ${s.months} months and gains less from the same median, so the payback stretches: type your salary in the calculator.` },
    { q: 'Does Georgetown McDonough lock its MBA tuition?', a: `Yes. The rate charged when you enter, ${K.money(s.tuition!.v / 2, 'USD')} a year for the class starting in fall 2026, applies to the second year as well, for ${K.tuition(slug)} in all. Fees of ${K.fees(slug)} and the living budget of ${K.living(slug)} are not frozen in the same way and can rise between the two years.` },
  ],
  related: ['school:uva-darden', 'school:duke-fuqua', 'best-mba-consulting', 'best-mba-usa', 'mba-cost', 'compare-mba'],
});
