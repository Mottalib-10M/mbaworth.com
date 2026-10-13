import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'essec';
const s = K.s(slug);
const o = K.roi(slug);
const long = s.format.match(/(\d+) months/)?.[1];
const forgone = s.months ? Math.round((K.MODEL.refSalary * s.months) / 12) : null;
const forgoneLong = long ? Math.round((K.MODEL.refSalary * Number(long)) / 12) : null;
const intlFirst = K.schools.every((x) => (x.profile.intl ?? 0) <= (s.profile.intl ?? 0));
const campuses = s.campuses.map((c) => c.replace(/\s*\(.*\)/, ''));
const fr = ['insead', 'hec-paris', 'edhec'].filter((x) => K.c(x).tuition !== null);

export default defineSchool({
  slug,
  title: 'ESSEC Global MBA 2026: What the School Publishes, and Not',
  description: `ESSEC Global MBA 2026: a ${s.months}-month program in Paris and Singapore with a ${K.intl(slug)} international class, but no open tuition, budget or salary figures to test.`,
  intro: `A class that is ${K.intl(slug) ?? 'entirely'} international on the school's own count, and almost no other figure in the open.`,
  resume: `The ESSEC Global MBA runs ${s.months} months, extendable to ${long ?? 'a longer track'}, across the ${K.listOf(campuses)} campuses. We could not find its tuition on the school's own pages: the financing tab of the program page was empty when we read it and the brochure is behind a form. Figures quoted on third-party sites are not used here. The school publishes no living budget, and its employment report is released only through a lead form, so there is no graduate salary either. ${o ? '' : `This page therefore shows no total cost for the reference person earning ${K.ref()} and no payback, and our rankings leave ESSEC out.`} What we can work out is the salary given up: ${forgone ? `${K.usd(forgone)} for the ${s.months} months` : 'a year of pay'}${forgoneLong ? ` and ${K.usd(forgoneLong)} on the longer track` : ''} at the reference salary. What sets ESSEC apart in the data that is public is the class: ${K.intl(slug) ?? 'all'} international${intlFirst ? ', the highest share in our data' : ''}, ${s.profile.women !== null ? K.p(s.profile.women) : 'many'} women, an average age of ${s.profile.age !== null ? K.num(s.profile.age) : 'thirty'}.`,
  body: (h) => `<h2>A class built entirely from abroad</h2>
<p>ESSEC describes its Global MBA class as ${K.intl(slug) ?? 'fully'} international${intlFirst ? ', a share no other school in our data reaches' : ''}, with ${s.profile.women !== null ? K.p(s.profile.women) : 'many'} women and an average of ${s.profile.exp !== null ? K.num(s.profile.exp) : 'several'} years of work experience. The school's own breakdown of origins puts Asia and Oceania well ahead of every other region, with Europe the smallest group. On those figures, every student in the class comes from outside France.</p>
<p>The program lists two campuses, ${K.listOf(campuses)}. The pages we read do not say how the class divides between them, how many students take the longer track, or how large the class is, so we cannot tell how many follow each path. Each extra month on the longer track costs about ${K.usd(Math.round(K.MODEL.refSalary / 12))} of pay at the reference salary.</p>
${h.mini('forgone')}
<h2>What is missing, and how to fill it in</h2>
<p>A payback needs the full cost and the salary after the degree, and ESSEC publishes neither in the open. Its career landing page offers only two percentages from the last career survey, that most graduates changed sector and nearly all changed function, and an older version of the same page gave lower figures, which shows how much these headline shares move. Neither says anything about pay.</p>
<p>Before applying, ask the school in writing for the tuition for your intake with every mandatory fee, an estimate of living costs in Paris and in Singapore, and the employment report with the median base salary, the response rate and the share of the class seeking a job. Then type them into the calculator above. The school does list several scholarships, including an early-application award with a fixed amount, but no share of the class that receives one.</p>
${h.miniFx()}
<h2>French schools with fuller data</h2>
<p>${fr.length ? `${K.listOf(fr.map((x) => h.sc(x)))} publish their tuition${fr.some((x) => K.s(x).emp.salary) ? ', and some of them a graduate salary,' : ''} so you can compute a cost for them today. ` : ''}The ${h.a('best-mba-europe', 'Europe ranking')} lists every school in our data that publishes enough to rank, and the ${h.a('mba-finder', 'MBA finder')} lets you filter by region and length.</p>`,
  faqs: [
    { q: 'How much does the ESSEC Global MBA cost?', a: `We could not find the tuition on ESSEC's own pages for the next intake; the brochure is gated and third-party figures are not used here. The school also publishes no living budget. What you can count on is the salary given up: ${forgone ? `${K.usd(forgone)} for the ${s.months} months` : 'about a year of pay'} for a person earning ${K.ref()}, before tax.` },
    { q: 'What salary do ESSEC Global MBA graduates earn?', a: `ESSEC does not publish a graduate salary on its open pages; the employment report requires a lead form. Its landing page says only that most graduates of the last survey changed sector and nearly all changed function. Ask the school for the median base salary and the response rate before comparing it with schools that publish them.` },
    { q: 'How international is the ESSEC Global MBA class?', a: `The school states that its class is ${K.intl(slug) ?? 'entirely'} international${intlFirst ? ', the highest share in our data' : ''}, with ${s.profile.women !== null ? K.p(s.profile.women) : 'many'} women, an average age of ${s.profile.age !== null ? K.num(s.profile.age) : 'thirty'} and ${s.profile.exp !== null ? K.num(s.profile.exp) : 'several'} years of experience. Asia and Oceania supply the largest group of students, Europe the smallest. The school does not publish the size of the class.` },
  ],
  related: ['school:insead', 'school:hec-paris', 'school:edhec', 'best-mba-europe', 'best-mba-one-year', 'mba-finder'],
});
