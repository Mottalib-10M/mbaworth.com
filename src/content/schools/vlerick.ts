import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'vlerick';
const s = K.s(slug);
const c = K.c(slug);
const months = s.months ?? 10;
const goneRaw = (K.MODEL.refSalary * months) / 12;
const gone = K.usd(goneRaw);
const nth = (r: { rank: number }) => (r.rank === 1 ? 'first' : `number ${r.rank}`);
const sizes = K.schools.map((x) => x.classSize).filter((v): v is number => v !== null);
const smallest = (s.classSize ?? Infinity) <= Math.min(...sizes);
const shorter = K.schools.filter((x) => x.months !== null && x.months < months).length;
const rEu = K.rank(slug, 'z-europe');
const eu = K.share(slug, 'z-europe');

export default defineSchool({
  slug,
  title: 'Vlerick MBA 2026: Brussels Tuition, Small Class, No Salary',
  description: `Vlerick MBA 2026 in Brussels: ${K.tuition(slug)} (${K.tuitionUsd(slug)}) for ${months} months with books and coaching included, a class of ${K.num(s.classSize ?? 0)}, and no graduate salary or living budget.`,
  intro: `A ${months}-month MBA in Brussels with a class of ${K.num(s.classSize ?? 0)}${smallest ? ', the smallest of any school on this site' : ''}, and ${eu} of graduates placed in Europe.`,
  resume: `The Vlerick full-time MBA in Brussels costs ${K.tuition(slug)}, about ${K.tuitionUsd(slug)}, for ${months} months from September to June, and the fee already includes electives, textbooks, career coaching and alumni membership. There is no separate mandatory fee. The school gives a monthly range for living costs rather than one budget, and publishes no salary for its graduates, only a percentage salary increase with no class or basis stated. So the total cost for a person earning ${K.ref()} today cannot be completed here, and there is no payback or ten-year value. The salary given up can be counted: ${gone} for that person over the ${months} months, ${goneRaw > (c.tuition ?? 0) ? 'more than the tuition' : 'close to the tuition'}. What sets Vlerick apart is scale: a class of ${K.num(s.classSize ?? 0)}${smallest ? ', the smallest on this site' : ''}, ${K.intl(slug)} of it from outside Belgium, and ${eu} of graduates working in Europe afterwards.`,
  body: (h) => `<h2>${smallest ? 'The smallest class on this site' : 'One of the smallest classes on this site'}</h2>
<p>Vlerick admits ${K.num(s.classSize ?? 0)} students to its full-time MBA${smallest ? ', fewer than any other school whose figures we read' : ''}. A class that size makes every percentage the school publishes fragile, since one graduate is about ${K.p(100 / (s.classSize ?? 1))} of the class. The students are ${K.intl(slug)} international, ${K.p(s.profile.women ?? 0)} women, ${K.num(s.profile.age ?? 0)} years old on average. Only ${shorter} school${shorter === 1 ? '' : 's'} on this site run${shorter === 1 ? 's' : ''} a shorter program than Vlerick's ${months} months, so the time out of work, and the salary given up, are short too. A candidate weighing Vlerick against a two-year program gives up less than half the pay for the reference salary.</p>
<p>The fee is billed in euros. For a candidate paid in another currency, the converter below uses the ECB rate the site is built on.</p>
${h.miniFx()}
<h2>What the fee includes, and what it does not</h2>
<p>The ${K.tuition(slug)} covers tuition, electives, textbooks, career services and coaching, campus facilities and alumni membership, so the figure is closer to the full academic bill than a bare tuition line. Two things stay outside. The international study course, in Asia or Africa, is paid separately: the school estimates flights, visas and accommodation as an extra. Living costs are given only as a monthly range for a single student in Brussels, with rent the largest part; the school names no single figure, and we do not build one for it. Pick a monthly amount you trust, multiply by ${months}, and type the result in the Living budget field of the calculator at the top. Scholarships cover part of tuition, awarded mostly on merit and on a first-come basis.</p>
${h.mini('forgone')}
<h2>Placement in Europe, without a salary</h2>
<p>The school states that ${eu} of graduates work in Europe after the MBA${rEu ? `, which places Vlerick ${nth(rEu)} of ${rEu.of} in our ${h.a('best-mba-europe', 'Europe ranking')} on the share placed there` : ''}. It publishes no report behind that figure: no class year, no split by industry, no list of employers with hires, no starting salary. The salary claim on its pages is a percentage increase with no statement of the class, the statistic or the base it compares with, so it cannot be turned into a salary. Ask admissions for the base salaries of the last class and type the median into the field "Salary after the MBA" to see a payback for yourself.</p>
${h.miniGoal(slug)}`,
  faqs: [
    { q: 'How much does the Vlerick full-time MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${months}-month program, about ${K.tuitionUsd(slug)}, with textbooks, electives, coaching and alumni membership included. The international study course is paid apart, and living costs in Brussels come on top: the school gives only a monthly range. A person earning ${K.ref()} also gives up ${gone} of salary while studying.` },
    { q: 'What salary do Vlerick MBA graduates earn?', a: `Vlerick does not publish one. Its pages give a percentage salary increase without the class, the statistic or the base it is measured on, which cannot be read as a starting salary. Without a salary and a single living budget, this site computes no payback for Vlerick, although the ${K.tuition(slug)} fee and the ${eu} placed in Europe are known.` },
    { q: 'How big is the Vlerick MBA class?', a: `${K.num(s.classSize ?? 0)} students in the current class${smallest ? ', the smallest of any school on this site' : ''}, with ${K.intl(slug)} from outside Belgium and ${K.p(s.profile.women ?? 0)} women. In a class that size one graduate counts for about ${K.p(100 / (s.classSize ?? 1))} of any placement figure, so a share such as the ${eu} working in Europe can move noticeably from year to year.` },
  ],
  related: ['school:insead', 'school:iese', 'school:rsm', 'best-mba-europe', 'best-mba-one-year', 'mba-finder'],
});
