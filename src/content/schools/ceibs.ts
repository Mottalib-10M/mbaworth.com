import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'ceibs';
const s = K.s(slug);
const o = K.roi(slug);
const cn = K.schools.filter((x) => x.country === 'CN' && K.c(x.slug).tuition !== null).sort((a, b) => K.c(b.slug).tuition! - K.c(a.slug).tuition!);
const cnTop = cn[0]?.slug === slug;
const others = cn.filter((x) => x.slug !== slug).map((x) => x.slug);
const ind = (k: string) => s.emp.industries.find((x) => x.key === k);
const hc = ind('healthcare'), mf = ind('manufacturing'), tech = ind('tech');
const top = [...s.emp.industries].filter((x) => x.salary).sort((a, b) => b.salary! - a.salary!)[0];
const rAsia = K.rank(slug, 'z-asia');
const sal = s.emp.salary;
const mfAbove = K.schools.filter((x) => (K.shareRaw(x.slug, 'manufacturing') ?? 0) > (K.shareRaw(slug, 'manufacturing') ?? 100)).length;
const usMin = Math.min(...K.schools.filter((x) => x.country === 'US' && x.emp.salary?.usd).map((x) => x.emp.salary!.usd!));
const belowUs = !!sal?.usd && sal.usd < usMin;
const eu = s.emp.zones.find((z) => /europe/i.test(z.zone));
const coh = s.emp.cohort.replace(/\s*\(.*\)/, '').toLowerCase();

export default defineSchool({
  slug,
  title: 'CEIBS MBA 2026: Shanghai Tuition, Salaries and Sectors',
  description: `CEIBS MBA 2026: ${K.tuition(slug)} tuition for ${s.months} months in Shanghai, a ${K.salary(slug)} ${K.salaryKind(slug)}, ${K.share(slug, 'z-asia')} of graduates working in Asia, no living budget published.`,
  intro: `A ${s.months}-month MBA in Shanghai at ${K.tuition(slug)}, with a class that is mostly Chinese and stays almost entirely in Asia.`,
  resume: `CEIBS charges ${K.tuition(slug)} for its ${s.months}-month English-taught MBA, about ${K.tuitionUsd(slug)} at the ECB rate, for the ${s.tuition?.cohort ?? 'next'} class${cnTop ? `, the highest tuition of the ${cn.length} Chinese schools on this site` : ''}. The fee covers teaching materials and campus databases; the school publishes no full living budget, only the rent of a room in the campus dormitory, so this page cannot give a total cost for the reference person earning ${K.ref()} or a payback date. ${o ? '' : 'You can still run the calculator above by typing your own living costs in Shanghai.'} The ${coh} reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, about ${K.salaryUsd(slug)}, from a survey that every graduate answered. What sets CEIBS apart is the market it serves: ${K.share(slug, 'z-asia')} of graduates who took a job stayed in Asia, mostly in mainland China, and manufacturing hired ${K.share(slug, 'manufacturing')} of the class, a share ${mfAbove === 0 ? 'no other school in our data reaches' : mfAbove === 1 ? 'only one other school in our data exceeds' : `only ${mfAbove} schools in our data exceed`}.`,
  body: (h) => `<h2>Healthcare and manufacturing next to tech</h2>
<p>Technology is the largest sector, ${K.share(slug, 'tech')} of graduates, and the next two are industrial: manufacturing took ${mf?.pct != null ? K.p(mf.pct) : 'a large share'} and healthcare ${hc?.pct != null ? K.p(hc.pct) : 'a large share'}. Consulting took ${K.share(slug, 'consulting')} and finance ${K.share(slug, 'finance')}. ${top ? `On the school's measure, the best-paid sector was ${top.label.toLowerCase()}, at ${K.money(top.salary!, top.cur)}` : ''}${tech?.salary ? `, against ${K.money(tech.salary, tech.cur)} in technology` : ''}.</p>
<p>Those sector figures are not base salaries. CEIBS reports pay by sector, function and location as median annual guaranteed cash, which adds other guaranteed pay to the base, so they run above the school-wide ${K.salaryKind(slug)} of ${K.salary(slug)}. Compare sector with sector, not a sector figure with the base salary. The school also publishes ranges, and they are wide: a median tells you little about a single offer.</p>
${h.miniGoal(slug)}
<h2>A China career, priced in yuan</h2>
<p>${K.share(slug, 'z-asia')} of graduates who took a job stayed in Asia${rAsia ? `, which places CEIBS number ${rAsia.rank} of ${rAsia.of} in our ${h.a('best-mba-asia', 'Asia ranking')}` : ''}, and only ${K.share(slug, 'z-europe') ?? 'a small share'} went to Europe${eu?.salary ? `, at a median guaranteed cash of ${K.money(eu.salary, eu.cur)}` : ''}. The report splits destinations by nationality: international students went to mainland China less often than Chinese students, but a majority of them still started there. The class is ${K.intl(slug) ?? 'mostly not'} international, ${s.profile.women !== null ? K.p(s.profile.women) : 'about half'} women, with an average of ${s.profile.exp !== null ? K.num(s.profile.exp, 1) : 'several'} years of experience.</p>
<p>${sal?.usd ? `In dollars the base median is ${K.salaryUsd(slug)}${belowUs ? ', below the lowest school-wide figure of any American program on this site' : ''}, while tuition converts to ${K.tuitionUsd(slug)}. The comparison only makes sense for someone who plans to earn in yuan; the converter below shows how much the exchange rate moves both lines.` : ''}</p>
${h.miniFx()}
<h2>What is missing before you can compute a payback</h2>
<p>The school lists the dormitory rent but no budget for food, transport, health cover or travel home, so we leave the living line blank rather than guess. For a rough total, add ${s.months} months of your own Shanghai costs to the tuition in the calculator above. ${others.length ? `The ${h.a('best-mba-asia', 'Asia pages')} also cover ${others.map((x) => h.sc(x)).join(', ').replace(/, ([^,]*)$/, ' and $1')}, the other schools in China on this site.` : ''}</p>`,
  faqs: [
    { q: 'How much does the CEIBS MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${s.tuition?.cohort ?? 'next'} class, about ${K.tuitionUsd(slug)}, paid in two instalments. It covers teaching materials, internet and databases but not textbooks. CEIBS publishes no living budget, only dormitory rent, so the total depends on your own costs in Shanghai over ${s.months} months.` },
    { q: 'What is the median salary after a CEIBS MBA?', a: `The ${coh} reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, about ${K.salaryUsd(slug)} at the ECB rate, and ${s.emp.employed !== null ? K.p(s.emp.employed) : 'most'} of job seekers ${s.emp.employedLabel}. Sector figures in the report are guaranteed cash, base plus other guaranteed pay, so they sit above that base median.` },
    { q: 'Do CEIBS graduates work outside China?', a: `Few do. ${K.share(slug, 'z-asia')} of graduates who took a job in the ${coh} stayed in Asia and ${K.share(slug, 'z-europe') ?? 'a small share'} went to Europe. International students left mainland China more often than Chinese students, but most of them also started their careers there. The school publishes no figure for North America.` },
    { q: 'Why is there no payback for the CEIBS MBA on this page?', a: `A payback needs the full cost, and CEIBS does not publish a living budget, only the rent of a campus room. Without it, our model leaves the school out of the salary-based rankings. The ${K.salaryKind(slug)} of ${K.salary(slug)} is published, so typing your own living costs in the calculator gives a payback for your case.` },
  ],
  related: ['school:fudan', 'school:pku-guanghua', 'school:sjtu-antai', 'best-mba-asia', 'mba-finder'],
});
