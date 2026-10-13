import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'hku';
const s = K.s(slug);
const o = K.roi(slug);
const women = [...K.schools].filter((x) => x.profile.women !== null).sort((a, b) => b.profile.women! - a.profile.women!);
const wPos = women.findIndex((x) => x.slug === slug) + 1;
const fnTop = [...s.emp.functions].sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0))[0];
const asiaR = K.rank(slug, 'z-asia');
const hkust = K.s('hkust');
const ent = s.emp.functions.find((f) => /Entrepreneur/.test(f.label));

export default defineSchool({
  slug,
  title: 'HKU MBA 2026: Hong Kong Fees, Living Costs and Jobs',
  description: `HKU full-time MBA 2026: ${K.tuition(slug)} tuition for ${s.months} months, ${K.living(slug)} to live in Hong Kong, ${K.share(slug, 'z-asia')} of graduates in Asia, and why this page shows no payback.`,
  intro: `A one-year Hong Kong MBA where ${K.p(s.profile.women!)} of the class are women and ${K.share(slug, 'z-asia')} of graduates stay in Asia, for ${K.direct(slug)} with living costs.`,
  resume: `The HKU full-time MBA charges a composition fee of ${K.tuition(slug)} for its ${s.months}-month program${K.tuitionUsd(slug) ? `, about ${K.tuitionUsd(slug)} at the ECB rate` : ''}, and the school's monthly estimate for a single student in Hong Kong adds ${K.living(slug)} over a year, for ${K.direct(slug)} before any salary you give up. ${o ? '' : `What this page cannot give is a total cost for a person earning ${K.ref()} or a payback date: HKU publishes no graduate salary on its career pages, so there is nothing to set the cost against, and our ranking leaves the school out except by region.`} The employment figures the school does publish pool two classes, those of 2024 and 2025, and they are clear on one point: ${K.share(slug, 'z-asia')} of graduates work in Asia, and finance is the first destination at ${K.share(slug, 'finance')}. The class itself is unusual, with ${K.p(s.profile.women!)} women and ${K.intl(slug)} of students from outside Hong Kong. Part of the year is spent abroad, at a partner school that depends on the track chosen.`,
  body: (h) => `<h2>A class where women are the majority</h2>
<p>${wPos > 0 && wPos <= 3 ? `HKU has the ${wPos === 1 ? 'highest' : wPos === 2 ? 'second highest' : 'third highest'} share of women of the ${women.length} schools on this site that publish one, ${K.p(s.profile.women!)}.` : `Women make up ${K.p(s.profile.women!)} of the class.`} The school labels its profile as covering the classes of 2026 and 2027 and gives ${K.num(s.classSize!)} students; it does not publish an average age, years of experience or a test score median, so the profile table on this page is short. ${K.intl(slug)} of the class come from outside Hong Kong.</p>
<p>The year is not spent entirely in Hong Kong. After most of the year on the HKU campus, students move for the last few months to a partner school, which can be London Business School, Columbia, Peking University or Fudan depending on the track. The school's budget of ${K.living(slug)} assumes ${s.months} months of Hong Kong living costs; for the months abroad the school publishes different monthly estimates, and London or New York rents can lift the real figure.</p>
${h.miniFx()}
<h2>What the career page says, and what it leaves out</h2>
<p>Finance and banking hired ${K.share(slug, 'finance')} of the pooled classes, technology ${K.share(slug, 'tech')}, and consulting ${K.share(slug, 'consulting')}. By job function, ${fnTop ? `${fnTop.label} was the largest at ${K.p(fnTop.pct!)}` : 'sales and business development led'}${ent ? `, and ${K.p(ent.pct!)} of graduates are listed as entrepreneurs, a group whose income no salary survey would capture well` : ''}. Because the two classes are pooled, the shares describe roughly two years of hiring rather than one. The named employers mix banks, technology firms and advisory firms: ${K.listOf(K.employers(slug, 6))}. On the page itself, the headings of the industry and function charts appear swapped; we assigned each chart by its content.</p>
<p>No salary is published for either class, and the employment rate shown on the page gives no time window, so it does not enter the table above. ${asiaR ? `Our ranking for ${h.a('best-mba-asia', 'working in Asia')}, which counts the share placed there, puts HKU ${asiaR.rank} of ${asiaR.of}.` : ''} To estimate a payback, type the salary you expect after the degree in the calculator at the top; ${h.sc('hkust')}, the other Hong Kong school on this site with a full page, charges ${K.tuition('hkust')} for a ${hkust.months}-month program and has the same gap in its salary data.</p>
${h.miniGoal(slug)}`,
  faqs: [
    { q: 'How much does the HKU full-time MBA cost?', a: `The composition fee is ${K.tuition(slug)} for the ${s.tuition!.cohort}, paid in instalments, with the deposit counted inside it. The school's monthly estimate for a single student comes to ${K.living(slug)} over ${s.months} months, for ${K.direct(slug)} in all${K.directUsd(slug) ? `, about ${K.directUsd(slug)}` : ''}. Tracks that spend months in London or New York cost more to live.` },
    { q: 'Does HKU publish the salary of its MBA graduates?', a: `No. The career page for the classes of 2024 and 2025 gives industries, job functions, regions and employers, but no salary. That is why this page shows no payback and our main ranking leaves HKU out. The calculator still works if you type the salary you expect after the MBA in Hong Kong or elsewhere in Asia.` },
    { q: 'Where do HKU MBA graduates work?', a: `${K.share(slug, 'z-asia')} of graduates in the pooled classes of 2024 and 2025 work in Asia, ${K.share(slug, 'z-us')} in North America and ${K.share(slug, 'z-europe')} in Europe. Finance took ${K.share(slug, 'finance')} of them and technology ${K.share(slug, 'tech')}. Someone who wants a career in Europe or the United States after the degree will find few classmates on that path.` },
    { q: 'Are there scholarships for the HKU MBA?', a: `Yes, merit-based only, and every admitted candidate is considered automatically. Offers fall within a published range set against the ${K.tuition(slug)} fee, and the school does not say what share of the class receives one. Without a salary figure, the effect of an award on the payback can only be tested with your own expected pay in the calculator.` },
  ],
  related: ['school:hkust', 'school:cuhk', 'school:nus', 'best-mba-asia', 'best-mba-one-year'],
});
