import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'iim-calcutta';
const s = K.s(slug);
const o = K.roi(slug);
const R = (v: number) => K.money(v, 'INR');
const sal = s.emp.salary;
const isCtc = /CTC/.test(sal?.note ?? '');
const payWord = isCtc ? 'median CTC' : K.salaryKind(slug);
const women = K.schools.filter((x) => x.profile.women !== null).sort((a, b) => a.profile.women! - b.profile.women!);
const fewestWomen = women[0]?.slug === slug;
const batch = s.emp.cohort.split(' (')[0];
const indian = K.schools.filter((x) => x.country === 'IN');
const noFee = indian.filter((x) => x.tuition === null);
const onlyNoFee = noFee.length === 1 && noFee[0].slug === slug;
const ahm = K.s('iim-ahmedabad'), luck = K.s('iim-lucknow');

export default defineSchool({
  slug,
  title: 'IIM Calcutta MBAEx 2026: Package, Sectors, Missing Fee',
  description: `IIM Calcutta MBAEx 2026: a ${sal ? R(sal.v) : 'unpublished'} median CTC for the ${batch}, ${K.share(slug, 'tech')} of offers in tech, no fee or living budget published by the institute itself.`,
  intro: `The one-year MBA for Executives at IIM Calcutta publishes its graduates' pay but not its own price.`,
  resume: `IIM Calcutta's MBA for Executives, the one-year program once called PGPEX, ${onlyNoFee ? `is the only one of the ${indian.length} Indian programs on this site with no published fee` : 'publishes no fee'}: neither the official program pages nor the admission documents we read state the tuition, and the brochure sits behind a form. There is no living budget either, although the program is residential. ${o ? '' : `This page therefore shows no total cost and no payback, for the reference person earning ${K.ref()} or anyone else, until you type the fee you are quoted and your own salary in the calculator.`} What the institute does publish is pay. The ${batch}, which graduated in 2025, reported a ${payWord} of ${sal ? R(sal.v) : 'an unpublished amount'}${isCtc ? ', a cost-to-company figure that includes variable and other components, not a base salary' : ''}. Technology took ${K.share(slug, 'tech')} of the batch, the largest share, ahead of consulting at ${K.share(slug, 'consulting')}. The class is small, ${K.num(s.classSize!)} students in the current batch, and ${fewestWomen ? 'has the lowest share of women of any school on this site' : `${K.p(s.profile.women!)} women`}.`,
  body: (h) => `<h2>A package, not a base salary</h2>
<p>Indian institutes often report pay as CTC, the cost to the company of a hire, which can include a variable bonus, retirement contributions and allowances. ${isCtc ? `IIM Calcutta's ${R(sal!.v)} for the ${batch} is a median CTC in that sense.` : ''} It is therefore not directly comparable with the base salary medians of American or European schools, nor exactly with ${h.sc('iim-ahmedabad', 'IIM Ahmedabad PGPX')}, which reports an audited base median of ${ahm.emp.salary ? R(ahm.emp.salary.v) : 'an unpublished amount'}. ${luck.emp.salary ? `${h.sc('iim-lucknow', 'IIM Lucknow IPMX')} reports a CTC too, ${R(luck.emp.salary.v)}, which makes it the closer comparison.` : ''} The institute shows the median rising in each of its last three batches, a trend worth more than a single year's figure.</p>
<p>The report is short. It gives no count of students placed or unplaced, no split by job function, no locations, and no salary by sector; no statistics for the batch graduating in 2026 were online when we read it. Sectors are listed for the ${batch}: technology ${K.share(slug, 'tech')}, consulting ${K.share(slug, 'consulting')}, finance ${K.share(slug, 'finance')} and manufacturing ${K.share(slug, 'manufacturing')}, with a large group of other sectors. The named recruiters are ${K.listOf(K.employers(slug, 6))}.</p>
${h.miniGoal(slug)}
<h2>Working out the cost yourself</h2>
<p>Without a published fee, the honest way to cost the MBAEx is to ask the admissions office for the current fee schedule and enter it in the calculator at the top, with the hostel and food you expect to pay over ${s.months} months. Then type your current salary: the ${K.ref()} reference used for the American and European schools on this site is far above what most Indian managers earn before a one-year program, and it would make the payback look much worse than it is. The program admits only candidates with several years of work behind them, so your current salary is the figure that matters most. The converter below helps if you are quoted in rupees and think in another currency.</p>
${h.miniFx()}
<h2>A small, mostly male class</h2>
<p>The batch profiles give only the number of students, the number of women and a count of industries represented. ${s.profile.women !== null ? `The ${K.p(s.profile.women)} share of women is computed from the profile of the ${batch}.` : ''} ${fewestWomen ? `No other school on this site reports a lower share.` : ''} For a broader peer group, the ${h.a('best-mba-one-year', 'one-year MBA ranking')} lists the short programs that publish enough to be ranked.</p>`,
  faqs: [
    { q: 'How much does the IIM Calcutta MBAEx cost?', a: `IIM Calcutta does not publish the MBAEx fee on the official program pages, admission policy or application guidelines we read, and the brochure is behind a form. Figures quoted on third-party sites are not reused here. Ask the institute for the fee schedule and type it, with your living costs for ${s.months} months, in the calculator on this page.` },
    { q: 'What salary do IIM Calcutta MBAEx graduates earn?', a: `The ${batch}, graduating in 2025, reported a median CTC of ${sal ? R(sal.v) : 'an unpublished amount'}. CTC is the cost to the company, a total package that can include variable pay and benefits, so it is higher than a base salary would be. The institute reports the median rising in each of its last three batches.` },
    { q: 'Which sectors hire IIM Calcutta MBAEx graduates?', a: `Technology took ${K.share(slug, 'tech')} of the ${batch}, consulting ${K.share(slug, 'consulting')}, finance ${K.share(slug, 'finance')} and manufacturing ${K.share(slug, 'manufacturing')}. The named recruiters include ${K.listOf(K.employers(slug, 4))}. No salary by sector and no job function split are published, so the shares cannot be tied to pay, and a batch this small moves several points with a handful of hires.` },
  ],
  related: ['school:iim-ahmedabad', 'school:iim-bangalore', 'school:iim-lucknow', 'school:isb', 'best-mba-one-year'],
});
