import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'berkeley-haas';
const s = K.s(slug);
const o = K.roi(slug);
const seg = (k: string) => s.emp.segments.find((x) => x.key === k);
const ib = seg('ib'), pe = seg('pe');
const rTech = K.rank(slug, 'tech'), rGen = K.rank(slug, 'f-general');
const techTop = K.top('tech', 1)[0];
const ind = (k: string) => s.emp.industries.find((x) => x.key === k);
const gap = ind('consulting')?.salary && ind('tech')?.salary ? ind('consulting')!.salary! - ind('tech')!.salary! : null;
const intern = s.emp.intern;
const liv = K.schools.filter((x) => K.c(x.slug).living !== null).sort((a, b) => K.c(b.slug).living! - K.c(a.slug).living!);
const livPos = liv.findIndex((x) => x.slug === slug) + 1;
const tf = (x: string) => { const c = K.c(x); return c.tuition === null ? null : c.tuition + c.fees; };
const gsbMore = (tf('stanford') ?? 0) > (tf(slug) ?? 0);
const bonus = s.emp.bonus;

export default defineSchool({
  slug,
  title: 'Berkeley Haas MBA 2026: Tech Pay, Total Cost and Payback',
  description: `Berkeley Haas MBA 2026: ${K.share(slug, 'tech')} of the class in tech, a ${K.salary(slug)} ${K.salaryKind(slug)}, ${K.direct(slug)} for two years, and the payback worked out on your own salary.`,
  intro: `${K.share(slug, 'tech')} of the class went into technology${rTech ? `, number ${rTech.rank} in our tech ranking` : ''}, yet consulting hires earned ${gap ? `${K.usd(gap)} more at the median` : 'more'}.`,
  resume: `Two years at Berkeley Haas cost ${K.direct(slug)} for a non-resident student in tuition, campus fees and the school's living budget, before the salary you stop earning. ${o ? `For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)}, the paid summer gives part of it back, and the total comes to ${K.usd(o.total)}. The ${s.emp.cohort.toLowerCase()} reported a ${K.salaryKind(slug)} of ${K.salary(slug)}${bonus ? `, and ${bonus.pct !== null ? K.p(bonus.pct) : 'many'} received a signing bonus with a median of ${K.money(bonus.v, bonus.cur)}` : ''}. On those figures the degree is repaid ${K.payback(slug)} after graduation, with a ten-year net present value of ${K.npv(slug)}.` : 'The school publishes no figure that would let us compute a payback.'} The cost figures rest on the school's first-year rates doubled; Haas tells students to plan for a yearly increase, so the second year will cost a little more. What sets Haas apart is the mix: ${K.share(slug, 'tech')} of graduates went into technology and ${K.share(slug, 'consulting')} into consulting, with almost the whole class staying in the United States.`,
  body: (h) => `<h2>Technology takes the most graduates, consulting pays the most</h2>
<p>The Haas report is led by technology. Technology took ${K.share(slug, 'tech')} of graduates at a median of ${K.segSalary(slug, 'tech') ?? 'an unpublished salary'}${rTech ? `, enough for number ${rTech.rank} of ${rTech.of} in our ${h.a('best-mba-tech', 'tech ranking')}${techTop && techTop.slug !== slug ? `, behind ${h.sc(techTop.slug)}` : ''}` : ''}. Consulting took ${K.share(slug, 'consulting')} at ${K.segSalary(slug, 'consulting') ?? 'an unpublished salary'}${gap ? `, ${K.usd(gap)} more a year at the median` : ''}. Someone choosing between a product role and a strategy firm after Haas is choosing a lower base salary in exchange for equity and the tech career path, which a base-salary median does not capture.</p>
<p>Finance is smaller, ${K.share(slug, 'finance')} of the class at ${K.segSalary(slug, 'finance') ?? 'an unpublished salary'}${ib ? `, with ${K.p(ib.pct!)} in investment banking` : ''}${pe ? ` and ${K.p(pe.pct!)} in private equity` : ''}. The function split adds a detail the industries hide: ${rGen ? `on general management roles, Haas is number ${rGen.rank} of ${rGen.of} in our function ranking` : 'general management roles take a sizeable share'}, a group that rarely stands out at other schools.</p>
${h.miniGoal(slug)}
<h2>Public university, private-school price</h2>
<p>Berkeley is part of the University of California, yet a non-resident pays tuition close to that of the private schools. Most of the bill is a professional degree supplement that sits on top of regular university tuition; California residents skip one line and pay less. The fees here exclude the student health plan, which is waivable, and the living budget is the school's figure for a single student over nine months, doubled for two years. ${livPos ? `Of the ${liv.length} living budgets in our data, it ranks ${livPos === 1 ? 'first' : `number ${livPos}`} from the highest, a reflection of Bay Area rents.` : ''}</p>
<p>${intern ? `The paid summer offsets part of it: the class of interns reported a median of ${K.money(intern.monthly, intern.cur)} a month, which the calculator subtracts for about ${K.num(K.MODEL.internMonths, 1)} months. ` : ''}The ${s.profile.cohort || 'current class'} is ${K.intl(slug) ?? 'partly'} international, from ${s.profile.countries !== null ? K.num(s.profile.countries) : 'many'} countries, yet ${K.share(slug, 'z-us')} of graduates who took a job stayed in the United States, so the salary used here is an American one.</p>
<h2>Where Haas sits against its neighbors</h2>
<p>For a tech goal, the closest comparison is ${h.sc('stanford')}, the other Bay Area school${gsbMore ? ', with higher tuition and fees' : ''}, and for consulting with a West Coast base, ${h.sc('ucla-anderson')}. The ${h.a('compare-mba', 'comparison tool')} puts any two reports side by side on the same reference person.</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the Berkeley Haas MBA cost for two years?', a: `For a non-resident, tuition is ${K.tuition(slug)} and campus fees ${K.fees(slug) ?? 'extra'} over two years at first-year rates, and the school budgets ${K.living(slug)} to live, for ${K.direct(slug)}. California residents pay less tuition, the waivable health plan is extra, and the school advises planning for a yearly rise in fees.` },
    { q: 'What do Berkeley Haas graduates earn in tech compared with consulting?', a: `In the ${s.emp.cohort.toLowerCase()}, technology hires reported a median base salary of ${K.segSalary(slug, 'tech') ?? 'not published'} and consulting hires ${K.segSalary(slug, 'consulting') ?? 'not published'}. The school-wide median was ${K.salary(slug)}. A base-salary median leaves out any stock grant in an offer, so the gap in total pay can differ from the gap in base pay.` },
    { q: 'How long does it take to repay a Berkeley Haas MBA?', a: `${o ? `For a person earning ${K.ref()} before the MBA, the ${K.usd(o.total)} total is repaid ${K.payback(slug)} after graduation on the school-wide median, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without. Aimed at consulting, it takes ${K.payback(slug, 'consulting') ?? 'about the same'}; aimed at tech, ${K.payback(slug, 'tech') ?? 'about the same'}.` : 'The school publishes no figure that would let us compute it.'}` },
    { q: 'Do Berkeley Haas MBA graduates stay in California?', a: `${K.share(slug, 'z-us')} of graduates who accepted a job in the ${s.emp.cohort.toLowerCase()} stayed in the United States, and only ${K.share(slug, 'z-asia') ?? 'a small share'} went to Asia. The school does not split the United States by region, so the report cannot tell you how many stayed in California itself; its employer list is led by strategy firms and large tech companies.` },
  ],
  related: ['school:stanford', 'school:ucla-anderson', 'school:wharton', 'best-mba-tech', 'tech-product-manager', 'compare-mba'],
});
