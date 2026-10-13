import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'ie';
const s = K.s(slug);
const o = K.roi(slug);
const iese = K.s('iese');
const gap = iese.tuition && s.tuition ? iese.tuition.v - s.tuition.v : null;
const fnSorted = [...s.emp.functions].sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0));
const fn1 = fnSorted[0], fn2 = fnSorted[1];
const expAll = K.schools.filter((x) => x.profile.exp !== null);
const expBelow = expAll.filter((x) => x.profile.exp! < s.profile.exp!).length;
const sec = s.emp.industries.filter((r) => r.key !== 'other').sort((a, b) => (b.pct ?? 0) - (a.pct ?? 0));

export default defineSchool({
  slug,
  title: 'IE MBA 2026: Madrid Tuition, Missing Salary, Sectors',
  description: `IE International MBA 2026 in Madrid: ${K.tuition(slug)} tuition for ${s.months} months, ${K.fees(slug)} foundation fee, ${K.share(slug, 'tech')} of graduates in tech, and the cost at your own salary.`,
  intro: `An ${s.months}-month Madrid MBA whose graduates split almost evenly between technology, finance and consulting, at ${K.tuition(slug)} in tuition.`,
  resume: `IE Business School charges ${K.tuition(slug)} in tuition for its International MBA, the same price for the ${s.months}-month format and the longer option, plus a one-off ${K.fees(slug)} contribution to the IE Foundation at enrolment, for ${K.usd(K.c(slug).tuition! + K.c(slug).fees)} at the ECB rate. Two figures every other line depends on are missing from the school's pages. IE publishes no living budget for MBA students, only a list of monthly cost ranges for rent, food and transport in Madrid, and it publishes no graduate salary. ${o ? '' : `So this page cannot show a total cost for a person earning ${K.ref()}, nor a payback date, and our ranking cannot place the school.`} What IE does publish is a sector split with unusual balance: ${K.share(slug, 'tech')} of graduates went into technology, ${K.share(slug, 'finance')} into finance and ${K.share(slug, 'consulting')} into consulting. The class is ${K.intl(slug)} international, from ${K.num(s.profile.countries!)} countries, with about ${K.num(s.profile.exp!)} years of experience on average.`,
  body: (h) => `<h2>Three sectors within a few points of each other</h2>
<p>IE's career outcomes block has no dominant destination: ${sec.slice(0, 3).map((r) => `${r.label.toLowerCase()} ${K.p(r.pct!)}`).join(', ')}, then ${sec.slice(3).map((r) => `${r.label.toLowerCase()} ${K.p(r.pct!)}`).join(', ')}. By role, ${fn1 ? `${fn1.label.toLowerCase()} lead at ${K.p(fn1.pct!)}` : 'sales roles lead'}${fn2 ? `, just ahead of ${fn2.label.toLowerCase()} at ${K.p(fn2.pct!)}` : ''}. The employers named include ${K.listOf(K.employers(slug, 6))}.</p>
<p>The block has limits worth knowing. It does not state the graduating year, gives no breakdown by country or region, and no salary for any sector. The shares are printed to two decimals, yet the school gives no count of respondents to judge them by. With no region data, the page cannot tell you how many graduates stay in Spain; with ${K.intl(slug)} of the class from abroad, many will not.</p>
<p>The class is also experienced: about ${K.num(s.profile.exp!)} years of work on average, more than at ${expBelow} of the ${expAll.length} schools on this site that publish the figure. More experience usually means a higher salary before the MBA, and a higher salary given up during it, so the reference person earning ${K.ref()} may understate what an IE student actually forgoes.</p>
${h.mini('forgone')}
<h2>Building your own living budget for Madrid</h2>
<p>The university's student services list monthly ranges for a room in a shared apartment or a studio, groceries, transport, private health insurance, internet and water, without a total and without an MBA-specific figure. The calculator at the top of this page leaves the living budget field blank for IE: type the sum of your own monthly costs times ${s.months}, then add the salary you expect after the degree. Payment plans with many instalments carry a small administration fee, and scholarships, loans and merit awards exist but with no published amount.</p>
<p>The nearest comparison is ${h.sc('iese')} in Barcelona, which charges ${K.tuition('iese')} for a two-year program${gap !== null && gap > 0 ? `, ${K.money(gap, 'EUR')} more than IE before counting the second year of living costs and lost salary` : ''}. The ${h.a('compare-iese-vs-ie', 'IESE and IE comparison')} sets the two side by side, and the ${h.a('best-mba-one-year', 'one-year MBA ranking')} lists the short programs that publish enough to be ranked.</p>
${h.miniGoal(slug)}`,
  faqs: [
    { q: 'How much does the IE International MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${s.months}-month or the longer format, plus a one-off ${K.fees(slug)} foundation contribution, about ${K.usd(K.c(slug).tuition! + K.c(slug).fees)} in all. IE publishes no living budget for Madrid, so living costs and the salary you give up must be added from your own figures in the calculator.` },
    { q: 'What salary do IE MBA graduates earn?', a: `IE does not publish a graduate salary on its pages, for any sector or year. Figures quoted elsewhere come from third-party surveys, which we do not reuse. Without a salary, no payback can be computed for the reference person earning ${K.ref()}; type your expected salary after the MBA in the calculator to get your own.` },
    { q: 'Which industries hire IE MBA graduates?', a: `Technology took ${K.share(slug, 'tech')} of graduates, finance ${K.share(slug, 'finance')} and consulting ${K.share(slug, 'consulting')}, with energy at ${K.share(slug, 'energy')} and consumer goods at ${K.share(slug, 'consumer')}. The school names ${K.listOf(K.employers(slug, 4))} among its recruiters. It does not state the graduating year of these figures or the number of respondents.` },
  ],
  related: ['school:iese', 'school:esade', 'compare-iese-vs-ie', 'best-mba-europe', 'best-mba-one-year'],
});
