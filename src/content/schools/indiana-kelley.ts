import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'indiana-kelley';
const s = K.s(slug);
const o = K.roi(slug);
const ind = (k: string) => s.emp.industries.find((x) => x.key === k);
const cons = ind('consulting'), tech = ind('tech'), mfg = ind('manufacturing'), cg = ind('consumer'), fin = ind('finance');
const bonus = s.emp.bonus, intern = s.emp.intern;
const bonusRank = K.schools.filter((x) => x.emp.bonus?.pct != null).sort((a, b) => b.emp.bonus!.pct! - a.emp.bonus!.pct!);
const bPos = bonusRank.findIndex((x) => x.slug === slug) + 1;
const mfgR = K.rank(slug, 'manufacturing'), cgR = K.rank(slug, 'consumer'), allR = K.rank(slug, 'all');
const consGap = cons?.salary && s.emp.salary ? cons.salary - s.emp.salary.v : null;
const thin = o ? o.npv < 20000 && o.npv > 0 : false;

export default defineSchool({
  slug,
  title: 'Indiana Kelley MBA 2026: Bloomington Cost and Payback',
  description: `Indiana Kelley MBA 2026: ${K.tuition(slug)} nonresident tuition for two years, a ${K.salary(slug)} median base salary, a signing bonus for ${K.p(bonus!.pct!)}, and a payback of ${K.payback(slug)}.`,
  intro: `A small two-year MBA in Bloomington where ${K.p(bonus!.pct!)} of graduates received a signing bonus and consultants earned ${cons?.salary ? K.money(cons.salary, 'USD') : 'the highest median'}.`,
  resume: `Indiana University's Kelley School charges ${K.tuition(slug)} in tuition for the two years of its full-time MBA at the ${s.tuition!.cohort.split(',')[0]} nonresident rate, the one international students pay, plus ${K.fees(slug)} of program, health and technology fees and a ${K.living(slug)} living budget, for ${K.direct(slug)}. ${o ? `A person earning ${K.ref()} today gives up ${K.usd(o.forgone)} over ${s.months} months; the summer internship pays part of it back, for a total of ${K.usd(o.total)}.` : ''} The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}${o ? `, which repays that total ${K.payback(slug) ?? 'in more than 30 years'} after graduation, with a ten-year net present value of ${K.npv(slug)}` : ''}. Two features stand out in the report. Signing bonuses are almost universal, ${bonus ? `${K.p(bonus.pct!)} of graduates at a median of ${K.money(bonus.v, 'USD')}` : 'for most graduates'}, and the spread of sectors is wide, with manufacturing and consumer goods as large as finance. The second year can be taken online.`,
  body: (h) => `<h2>Bonuses for nearly everyone, and a consulting premium</h2>
<p>${bPos > 0 && bPos <= 3 ? `Kelley has the ${bPos === 1 ? 'highest' : bPos === 2 ? 'second highest' : 'third highest'} share of graduates with a signing bonus among the ${bonusRank.length} schools on this site that publish one` : 'Most graduates received a signing bonus'}${bonus ? `, at a median of ${K.money(bonus.v, 'USD')}` : ''}. The calculator does not add bonuses, so the payback above is slightly cautious. Consulting is where pay jumps: ${K.share(slug, 'consulting')} of the class at a median of ${cons?.salary ? K.money(cons.salary, 'USD') : 'n/a'}${consGap !== null && consGap > 0 ? `, ${K.money(consGap, 'USD')} above the school-wide median` : ''}. Technology hired the largest group, ${K.share(slug, 'tech')}${tech?.salary ? ` at ${K.money(tech.salary, 'USD')}` : ''}.</p>
<p>The rest of the class spreads across industries that many schools barely report. Manufacturing took ${K.share(slug, 'manufacturing')}${mfg?.salary ? ` at ${K.money(mfg.salary, 'USD')}` : ''}, finance ${K.share(slug, 'finance')}${fin?.salary ? ` at ${K.money(fin.salary, 'USD')}` : ''} and consumer goods ${K.share(slug, 'consumer')}${cg?.salary ? ` at ${K.money(cg.salary, 'USD')}` : ''}. ${mfgR ? `In our manufacturing ranking Kelley comes ${mfgR.rank} of ${mfgR.of}` : ''}${cgR ? `, and ${cgR.rank} of ${cgR.of} for consumer goods` : ''}. The employers with the most hires show the mix: ${K.listOf(s.emp.employers.slice(0, 6).map((e) => (e.hires ? `${e.name} (${e.hires})` : e.name)))}.</p>
${h.miniGoal(slug)}
<h2>A cost that depends on residency, and a thin ten-year margin</h2>
<p>The ${K.tuition(slug)} is the nonresident rate counted over two years; Indiana residents pay much less, and the second-year rate may differ from the first. ${intern ? `The summer internship paid a median of ${K.money(intern.monthly, 'USD')} a month, which the calculator credits for about ${K.num(K.MODEL.internMonths, 1)} months.` : ''} ${thin ? `For the reference person the ten-year value is barely positive, ${K.npv(slug)}: the degree pays back, but with little left over after ten years once the money is discounted. A resident, or someone earning less before the MBA, sees a far better result.` : `For the reference person the ten-year value is ${K.npv(slug)}.`} ${allR ? `Across the whole class, our model places Kelley ${allR.rank} of ${allR.of}.` : ''}</p>
${o ? h.miniPayback(slug) : h.mini('forgone')}
<h2>A small class, and a second year online</h2>
<p>The current class profile counts ${K.num(s.classSize!)} students with an average age of ${K.num(s.profile.age!)} and ${K.num(s.profile.exp!)} years of experience; ${K.intl(slug)} are international. The Full-Time +Flex format lets students take the second year online, which can lower living costs and, for some, allow a return to work. The school's scholarships are usually given per year, within a range it publishes, but without the share of the class that receives one. The tool below shows what an award does to the payback; ${h.sc('georgia-tech-scheller')} is the other public school on this site at a similar price.</p>
${o ? h.miniScholarship(slug) : h.miniFx()}`,
  faqs: [
    { q: 'How much does the Indiana Kelley MBA cost?', a: `At the nonresident rate, tuition is ${K.tuition(slug)} for two years, fees ${K.fees(slug)} and the school's living budget ${K.living(slug)}, for ${K.direct(slug)}. Indiana residents pay much lower tuition. ${o ? `For a person earning ${K.ref()} who moves to Bloomington, the total with salary given up and internship pay deducted is ${K.usd(o.total)}.` : ''}` },
    { q: 'What salary do Indiana Kelley MBA graduates earn?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}${bonus ? `, and ${K.p(bonus.pct!)} received a signing bonus with a median of ${K.money(bonus.v, 'USD')}` : ''}. Consulting paid the highest sector median, ${cons?.salary ? K.money(cons.salary, 'USD') : 'n/a'}, and technology ${tech?.salary ? K.money(tech.salary, 'USD') : 'n/a'}. These figures describe a past class and the graduates who reported pay, not a promise for the next one.` },
    { q: 'How long does the Indiana Kelley MBA take to repay?', a: `${o ? `For a person earning ${K.ref()} before the MBA, ${K.payback(slug) ?? 'more than 30 years'} after graduation at the nonresident rate, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without, before tax. ` : ''}An Indiana resident pays less tuition and repays sooner; bonuses, not counted here, shorten it too.` },
    { q: 'Can the Indiana Kelley MBA second year be taken online?', a: `Yes. The Full-Time +Flex format lets students complete the second year online after a first year in Bloomington. That can cut the second year of the ${K.living(slug)} living budget, though tuition stays at ${K.money(s.tuition!.v / 2, 'USD')} a year at the nonresident rate, and it may suit someone who wants to return to work.` },
  ],
  related: ['school:georgia-tech-scheller', 'school:michigan-ross', 'school:notre-dame-mendoza', 'best-mba-usa', 'mba-finder'],
});
