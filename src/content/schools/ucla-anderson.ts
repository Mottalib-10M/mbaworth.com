import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'ucla-anderson';
const s = K.s(slug);
const o = K.roi(slug)!;
const months = s.months ?? 21;
const nth = (r: { rank: number }) => (r.rank === 1 ? 'first' : `number ${r.rank}`);
const ib = s.emp.segments.find((x) => x.key === 'ib');
const am = s.emp.segments.find((x) => x.key === 'am');
const rIb = K.rank(slug, 'ib'), rTech = K.rank(slug, 'tech'), rMk = K.rank(slug, 'f-marketing');
const pm = s.emp.functions.find((f) => /Product Management/.test(f.label));
const feesAll = K.schools.map((x) => K.c(x.slug).fees).filter((v) => v > 0);
const feesAbove = feesAll.filter((v) => v > K.c(slug).fees).length;
const usLiv = K.schools.filter((x) => x.country === 'US').map((x) => K.c(x.slug).living).filter((v): v is number => v !== null);
const livAbove = usLiv.filter((v) => v > K.c(slug).living!).length;
const internBack = K.usd(o.direct + o.forgone - o.total);
const asiaSal = K.segSalary(slug, 'z-asia');

export default defineSchool({
  slug,
  title: 'UCLA Anderson MBA 2026: Tech, Banking and the Full Bill',
  description: `UCLA Anderson MBA 2026: ${K.direct(slug)} for tuition, fees and living, a ${K.salary(slug)} median base salary, ${K.share(slug, 'tech')} of the class in tech, and the payback for your own salary.`,
  intro: `A Los Angeles program where technology is the largest destination and investment banking still takes ${ib ? K.p(ib.pct!) : 'a large share'} of the class.`,
  resume: `Two years at UCLA Anderson cost ${K.direct(slug)} in tuition, mandatory fees with health insurance, and the school's living budget, before the salary you stop earning. For a person earning ${K.ref()} today, the ${months} months away add ${K.usd(o.forgone)}, the summer internship gives back about ${internBack}, and the total reaches ${K.usd(o.total)}. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, and ${K.p(s.emp.bonus!.pct!)} received a signing bonus at a median of ${K.money(s.emp.bonus!.v, 'USD')}. On those figures the degree pays back ${K.payback(slug)} after graduation, with a ten-year net present value of ${K.npv(slug)}, before tax and on the model's raise assumptions. Anderson's mix is what sets it apart: technology is the largest industry at ${K.share(slug, 'tech')}, yet ${ib ? `${K.p(ib.pct!)} of the class went into investment banking` : 'investment banking remains a large group'}${rIb ? `, enough to rank ${nth(rIb)} of ${rIb.of} in our banking ranking` : ''}.`,
  body: (h) => `<h2>Technology first, investment banking close behind</h2>
<p>${K.share(slug, 'tech')} of the class of 2025 went into technology at a median of ${K.segSalary(slug, 'tech')}${rTech ? `, which places Anderson ${nth(rTech)} of ${rTech.of} in our ${h.a('best-mba-tech', 'tech ranking')}` : ''}. That median is below the school-wide figure, so a technology career repays the degree in ${K.payback(slug, 'tech')} for the reference person, against ${K.payback(slug, 'consulting')} in consulting and ${K.payback(slug, 'finance')} in finance, both at ${K.segSalary(slug, 'consulting')}. ${ib ? `Investment banking alone took ${K.p(ib.pct!)} of the class at ${K.money(ib.salary!, 'USD')}${rIb ? `, ${nth(rIb)} of ${rIb.of} schools in our ${h.a('best-mba-investment-banking', 'investment banking ranking')}` : ''}, next to the larger technology group.` : ''}${am?.salary ? ` Asset management is small, ${K.p(am.pct!)}, and pays ${K.money(am.salary, 'USD')}, well under the school median.` : ''}</p>
<p>By function, marketing and sales jobs make up ${K.share(slug, 'f-marketing')} of hires${rMk ? `, which ranks Anderson ${nth(rMk)} of ${rMk.of} for marketing careers` : ''}${pm ? `, and product management ${K.p(pm.pct!)}` : ''}. Many of those roles sit inside technology and consumer companies, which is why the industry and function tables below do not add up the same way, and why a candidate aiming at brand or product work should read both before choosing a goal in the calculator.</p>
${h.miniGoal(slug)}
<h2>Health cover makes the fee line heavy</h2>
<p>Mandatory fees come to ${K.fees(slug)} over the two years, ${feesAbove === 0 ? 'the highest of any school on this site' : `more than at all but ${feesAbove} school${feesAbove === 1 ? '' : 's'} on this site`}. Most of that is the university health insurance, which the school lists as a required charge; some schools count health cover in the living budget instead, so compare the sum of both lines. Tuition itself is ${K.tuition(slug)}, built from two estimated annual program fees. The living budget of ${K.living(slug)} covers rent, food, books, transport and personal costs in Los Angeles, and only ${livAbove} American school${livAbove === 1 ? '' : 's'} on this site publish${livAbove === 1 ? 'es' : ''} a higher one.</p>
${h.miniPayback(slug)}
<h2>Who stays in the United States</h2>
<p>${K.share(slug, 'z-us')} of graduates who took a job stayed in the United States, the figure our ranking for working in the country reads. The small group that left earned less: ${K.share(slug, 'z-asia') ?? 'a few percent'} took jobs in Asia${asiaSal ? ` at a median of ${asiaSal}` : ''}, and ${K.share(slug, 'z-latam') ?? 'a few'} in Latin America${K.segSalary(slug, 'z-latam') ? ` at ${K.segSalary(slug, 'z-latam')}` : ''}. For an international student planning to return home, the payback shown above rests on an American salary${K.payback(slug, 'z-asia') ? `; on the Asian median it stretches to ${K.payback(slug, 'z-asia')}` : ''}. The ${h.a('best-mba-asia', 'Asia ranking')} shows which schools place more graduates there.</p>`,
  faqs: [
    { q: 'How much does the UCLA Anderson MBA cost in total?', a: `Tuition is ${K.tuition(slug)}, mandatory fees with health insurance ${K.fees(slug)}, and the school's living budget ${K.living(slug)}, for ${K.direct(slug)} over two years, before any scholarship. A person earning ${K.ref()} today also gives up ${K.usd(o.forgone)} of salary; after about ${internBack} of internship pay the total reaches ${K.usd(o.total)}, the starting point of the calculator above.` },
    { q: 'What do UCLA Anderson graduates earn after the MBA?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}. Consulting and finance both paid medians of ${K.segSalary(slug, 'consulting')}, technology ${K.segSalary(slug, 'tech')}. ${K.p(s.emp.bonus!.pct!)} of graduates also received a signing bonus, at a median of ${K.money(s.emp.bonus!.v, 'USD')}. These figures describe graduates who accepted a job within the survey window and reported their pay to the school.` },
    { q: 'Is UCLA Anderson good for investment banking?', a: `${ib ? `${K.p(ib.pct!)} of the class of 2025 went into investment banking at a median of ${K.money(ib.salary!, 'USD')}.` : 'The school reports a sizable banking group.'} ${rIb ? `Among the ${rIb.of} schools that publish the segment, our investment banking ranking puts Anderson ${nth(rIb)}, on share, salary and ten-year value for a person earning ${K.ref()} before the MBA. Bank hiring moves with deal volumes, so the share can shift from one class to the next.` : ''}` },
    { q: 'How long does the UCLA Anderson MBA take to pay back?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school-wide median, before tax, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without. On the technology median it takes ${K.payback(slug, 'tech')}, on the consulting median ${K.payback(slug, 'consulting')}. A higher salary today lengthens every one of these figures.` },
  ],
  related: ['school:usc-marshall', 'school:berkeley-haas', 'school:stanford', 'best-mba-tech', 'best-mba-investment-banking', 'compare-mba'],
});
