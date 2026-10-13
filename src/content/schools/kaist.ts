import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'kaist';
const s = K.s(slug);
const o = K.roi(slug);
const W = (v: number) => K.money(v, 'KRW');
const year = s.tuition!.cohort.match(/(\d{4}) academic year/)?.[1] ?? null;
const perYear = Math.round(s.tuition!.v / 2);
const livYear = s.living?.raw ?? null;
const cheaper = K.schools.filter((x) => x.tuition !== null).map((x) => ({ slug: x.slug, t: K.c(x.slug).tuition! })).sort((a, b) => a.t - b.t);
const cheapPos = cheaper.findIndex((x) => x.slug === slug) + 1;
const skk = K.s('skk-gsb');

export default defineSchool({
  slug,
  title: 'KAIST MBA 2026: Seoul Tuition, Budget and Missing Data',
  description: `KAIST MBA 2026 in Seoul: ${K.tuition(slug)} tuition for two years from KAIST's ${year ?? 'latest'} cost table, ${K.living(slug)} to live, no salary or class profile published yet.`,
  intro: `${cheapPos > 0 && cheapPos <= 5 ? 'One of the least expensive MBAs on this site' : 'A low-cost Seoul MBA'}, ${K.tuitionUsd(slug)} in tuition for two years, with almost nothing published about where graduates go.`,
  resume: `The KAIST full-time MBA in Seoul is priced here from the university's cost table for international graduate students, which gives ${W(perYear)} of tuition a year for the ${year ?? 'latest'} academic year, or ${K.tuition(slug)} for the two years of the program${K.tuitionUsd(slug) ? `, about ${K.tuitionUsd(slug)}` : ''}. The same table budgets ${livYear ? W(livYear) : 'a yearly amount'} a year for on-campus housing, meals, books, health insurance, travel and phone, which we count twice for ${K.living(slug)}, for ${K.direct(slug)} in all. Neither figure is specific to the MBA, and both are dated. KAIST publishes no employment report, no graduate salary and no class profile for this program on the pages we read. ${o ? '' : `So this page cannot show a total cost for a person earning ${K.ref()} or a payback date, and our ranking cannot place the school.`} The program, launched in 2023, centres on a business analytics track, and KAIST runs other full-time MBAs in impact and finance that are not covered here.`,
  body: (h) => `<h2>A price taken from a university table</h2>
<p>${cheapPos > 0 && cheapPos <= 5 ? `At ${K.tuitionUsd(slug)} for two years, KAIST's tuition is number ${cheapPos} from the bottom of the ${cheaper.length} schools on this site that publish a fee.` : `At ${K.tuitionUsd(slug)} for two years, KAIST's tuition is low by the standards of this site.`} The figure deserves caution. It comes from KAIST's general cost of attendance for international graduate students, which covers research and professional programs alike and is labelled with the ${year ?? 'earlier'} academic year. We found no MBA-specific fee page. An applicant should ask the admissions office for the current MBA tuition before relying on it, and enter that figure in the calculator.</p>
<p>The living budget has the same limits. It lists on-campus housing, meals, books, the national health insurance premium, the student health association fee, local travel and telecommunication, and assumes a single student in university housing. Renting privately in Seoul costs more, and the table's age means prices have likely moved since. Because the budget is in won, its value in your currency follows the exchange rate.</p>
${h.miniFx()}
<h2>Scholarships, and what is missing</h2>
<p>KAIST's MBA scholarship page describes full or partial tuition waivers for international applicants over the two years, with a monthly living stipend for selected students and a minimum grade average to keep the award. It does not publish the number of recipients or the average award. A figure of almost universal aid that appears on the university's admissions pages concerns international graduate students as a whole, not the MBA, and we do not apply it here.</p>
<p>There is no employment report on the English site: no salary, no sectors, no destinations, no employers, and no class profile with age, experience or the share of women. Without them, the page cannot say what the degree leads to. ${h.sc('skk-gsb')}, the other Seoul school on this site, charges ${K.tuition('skk-gsb') ?? 'a fee it does not publish'} for a ${skk.months}-month program; the ${h.a('best-mba-asia', 'Asia ranking')} lists the schools in the region that publish placements. To test KAIST anyway, type in the calculator the salary you expect after the degree and the one you would give up.</p>
${h.mini('forgone')}`,
  faqs: [
    { q: 'How much does the KAIST MBA cost?', a: `On KAIST's cost table for international graduate students, dated ${year ?? 'some years ago'}, tuition is ${W(perYear)} a year, or ${K.tuition(slug)} for the two-year MBA, and living costs on campus ${livYear ? W(livYear) : 'a published amount'} a year. The table is not MBA-specific, so ask the school for the current MBA fee before you budget.` },
    { q: 'What salary do KAIST MBA graduates earn?', a: `KAIST does not publish one. We found no employment report, salary, sector split or employer list for the full-time MBA on the school's English site. That is why no payback appears on this page and our ranking leaves KAIST out. The calculator works if you type the salary you expect after the MBA in Korea or elsewhere.` },
    { q: 'Are there scholarships for the KAIST MBA?', a: `Yes. International applicants can receive full or partial tuition waivers for the two years, and selected students a monthly living stipend, provided they keep a minimum grade average. KAIST does not publish how many students receive them or the average amount. On ${K.tuition(slug)} of tuition, a full waiver leaves mainly living costs and lost salary.` },
  ],
  related: ['school:skk-gsb', 'school:nus', 'school:hkust', 'best-mba-asia', 'mba-cost'],
});
