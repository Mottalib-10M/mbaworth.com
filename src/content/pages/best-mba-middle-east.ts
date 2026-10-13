import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const G = 'z-me';
const R = K.ranking(G);
const T = R.ranked;
const [a, b, c] = T;
const line = (slug: string) => K.s(slug).emp.zones.find((z) => z.zone === 'Middle East');
const isMerged = (slug: string) => { const z = line(slug); return !!z && /africa/i.test(`${z.label} ${z.detail}`); };
const merged = T.filter((x) => isMerged(x.slug));
const pure = T.filter((x) => !isMerged(x.slug));
const paid = T.filter((x) => K.segSalary(x.slug, G) !== null);
const small = R.unranked.filter((u) => u.share !== null).sort((x, y) => y.share! - x.share!);
const smallMerged = small.filter((u) => isMerged(u.slug));
const gulfSchools = K.schools.filter((s) => s.region === 'Middle East');
const heads = [...T].filter((x) => x.placed !== null).sort((x, y) => y.placed! - x.placed!)[0];
const smallUs = small.filter((u) => K.s(u.slug).region === 'US').length;
const avgIntl = (slugs: string[]) => { const v = slugs.map((x) => K.s(x).profile.intl).filter((y): y is number => typeof y === 'number'); return v.length ? Math.round((v.reduce((p, q) => p + q, 0) / v.length) * 10) / 10 : null; };
const intlRanked = avgIntl(T.map((x) => x.slug));
const intlUs = avgIntl(small.filter((u) => K.s(u.slug).region === 'US').map((u) => u.slug));
const placedSum = T.filter((x) => x.placed !== null).reduce((p, x) => p + x.placed!, 0);
const min = K.MODEL.minShare!.zone;
const firstPure = pure[0];

export default definePage({
  id: 'best-mba-middle-east',
  group: 'best',
  order: 11,
  slug: 'best-mba-middle-east',
  nav: 'Best MBA for the Middle East',
  card: 'The few schools that report a measurable share of their class hired in the Middle East, ranked.',
  title: 'MBA for the Middle East 2026: Schools Ranked on Placement',
  description: `MBA for the Middle East in 2026: the ${T.length} schools placing ${min}% or more of their class in the region, with merged Africa lines flagged, from school reports.`,
  h1: 'Best MBA for working in the Middle East',
  intro: `${a.short} reports ${K.p(a.share)} of its class hired in the Middle East${isMerged(a.slug) ? ' (a line that includes Africa)' : ''}, the highest share among the ${T.length} schools we can rank.`,
  resume: `Only ${T.length} schools in our data place at least ${min}% of their class in the Middle East, and the share alone decides the order, since almost none publishes a salary for the region. ${a.short} leads today with ${K.p(a.share)}, followed by ${b.short} (${K.p(b.share)}) and ${c.short} (${K.p(c.share)}). Read those shares with care: ${merged.length ? `${merged.length} of the ${T.length} ranked schools, ${K.listOf(merged.map((x) => x.short))}, report the Middle East and Africa as a single line, so part of their figure is African jobs.` : 'every ranked school reports the Middle East as its own line.'} ${firstPure ? `The highest share for the Middle East on its own belongs to ${firstPure.short}, at ${K.p(firstPure.share)}.` : ''} Salary and payback appear only where a school publishes them, for a reference person earning ${K.ref()} before the MBA; change the salary in the finder above to recompute them.`,
  faqs: [
    { q: 'Why does the MBA Middle East ranking flag lines that include Africa?', a: `Because several schools report one figure for the Middle East and Africa together, and the share then counts jobs in Lagos or Johannesburg along with Dubai or Riyadh. ${merged.length ? `In the ranking, ${K.listOf(merged.map((x) => x.short))} ${merged.length === 1 ? 'is' : 'are'} in that case.` : ''} We do not split a merged line, so a merged share overstates the Middle East by an amount the report does not give.` },
    { q: 'Which MBA places the most graduates in the Middle East by number?', a: `${heads ? `${heads.short}, with about ${K.num(heads.placed!)} graduates in the region on the line it reports${isMerged(heads.slug) ? ', Africa included' : ''}` : 'The largest European schools'}. Some schools publish no class size we can apply the share to, so their headcount is not shown. At these numbers a single class can move the order: a few dozen graduates decide the position of a school.` },
    { q: 'Do American schools send MBA graduates to the Gulf?', a: `Very few, by their own reports. ${small.length ? `${K.listOf(small.slice(0, 4).map((u) => `${K.s(u.slug).short} (${K.p(u.share!)})`))} report a Middle East line under ${min}% of the class.` : ''} The schools that send a visible share to the region are mostly European, with international classes and many students from the Gulf, Levant or North Africa who return. A candidate with a Gulf employer in mind should read the employer list on each school page.` },
    { q: 'Is there a Middle East business school in the MBA Middle East ranking?', a: `${gulfSchools.length ? `Yes: ${K.listOf(gulfSchools.map((s) => s.short))}.` : 'Not today. No school based in the region is in our data, because we have not yet read a full employment report, fee schedule and living budget from one.'} Regional schools and the regional campuses of international schools may place more graduates in the Gulf than any school in this table; the table only covers schools whose reports we have read.` },
  ],
  body: (h) => `<h2>A short list, read line by line</h2>
<p>The Middle East is a small line in nearly every employment report. ${T.length} schools reach ${min}% of the class, and the ranking orders them on that share alone: almost no school gives a regional salary, and the few that do report it in pounds or euros for a handful of people. The table is therefore a list of the schools that send a measurable part of their class to the region, with the size of that part.</p>
${h.rankTable(G, 10)}
<p>The share is only as precise as the line behind it. Schools cut the world in their own way, and the label each school uses is what decides whether Africa is in the figure:</p>
${h.table(['School', 'Share', 'Line as the school labels it', 'Africa included'], T.map((x) => [h.sc(x.slug), K.p(x.share), line(x.slug)?.label ?? 'not given', isMerged(x.slug) ? 'yes' : 'no']), 'The Middle East line of each ranked school, with its own label.', ['l', 'r', 'l', 'l'])}
<p>${merged.length ? `${merged.length === T.length ? 'Every ranked school' : `${merged.length} of the ${T.length} ranked schools`} report${merged.length === 1 ? 's' : ''} a line that includes Africa or North Africa.` : 'No ranked school merges Africa into its Middle East line.'} ${pure.length ? `${K.listOf(pure.map((x) => h.sc(x.slug)))} give${pure.length === 1 ? 's' : ''} the Middle East alone, which makes ${pure.length === 1 ? 'its' : 'their'} share the cleaner figure.` : ''} A merged share and a clean share of the same size do not mean the same thing for someone who wants to live in Dubai.</p>
${h.miniGoal(a.slug)}
<h2>Why European schools fill the list</h2>
<p>${T.every((x) => ['Europe', 'UK'].includes(K.s(x.slug).region)) ? 'Every ranked school is in Europe or the United Kingdom.' : 'Most ranked schools are in Europe or the United Kingdom.'} Two things explain it. The first is the class: ${intlRanked !== null ? `international students make up on average ${K.p(intlRanked)} of the class at the ranked schools${intlUs !== null ? `, against ${K.p(intlUs)} at the American schools listed under the threshold` : ''}` : 'the ranked schools have highly international classes'}, and a class drawn from many countries, the Gulf, the Levant and North Africa among them, sends some of its graduates back. The second is distance: Gulf capitals are a few hours' flight from London, Paris, Barcelona or Geneva, and recruiters from the region can visit European campuses in a day. Added together, the ranked schools placed about ${K.num(placedSum)} graduates in the region on the lines they report${heads ? `, ${K.num(heads.placed!)} of them from ${h.sc(heads.slug)}` : ''}, a small community in which alumni know each other.</p>
<p>For someone who wants to work in Dubai, Abu Dhabi, Riyadh or Doha, that community matters more than the share. A school that sends twenty graduates a year to the region builds, over a decade, a network present in the sovereign funds, consulting offices and family groups that hire there.</p>
<h2>Where the regional figures exist</h2>
<p>${paid.length ? `${K.listOf(paid.map((x) => `${h.sc(x.slug)} (${K.segSalary(x.slug, G)})`))} ${paid.length === 1 ? 'is the only ranked school that publishes' : 'are the only ranked schools that publish'} a salary for the region, in the school's currency${paid.some((x) => isMerged(x.slug)) ? ', again for a line that includes Africa' : ''}.` : 'No ranked school publishes a salary for the region.'} Gulf employers often pay salaries free of personal income tax, along with housing or schooling allowances, and the reports compare none of it: a base salary in Dubai and the same base in London are not the same income. For that reason the payback column means little for this region, and we leave salary out of the score.</p>
<h2>Schools that send a few graduates</h2>
<p>${small.length ? `${K.listOf(small.slice(0, 6).map((u) => `${h.sc(u.slug)} (${K.p(u.share!)})`))}${small.length > 6 ? ', among others,' : ''} report a Middle East line under ${min}% and are listed but not ranked.` : `No school is held back for a share under ${min}%.`} ${smallMerged.length ? `${K.listOf(smallMerged.map((u) => K.s(u.slug).short))} ${smallMerged.length === 1 ? 'merges' : 'merge'} Africa into that line as well.` : ''} ${smallUs ? `${smallUs * 2 > small.length ? 'Most' : `${smallUs}`} of them are American schools, where a share` : 'At that level, a share'} of one or two percent means a few individual graduates, often people returning to their home country or to a family business.</p>
<h2>What these reports cannot tell you</h2>
<p>In the Gulf states, a work permit is usually tied to an employer that sponsors it, so the decisive question is whether the firms you target recruit at your school, not whether you may stay after graduation. Reports do not say how many graduates in the region were nationals returning home or sponsored employees going back to their company. Hiring there also follows public investment programs and energy prices, which move the share from one class to the next. Read the employer list on each school page, and compare the two or three schools that remain with the ${h.a('compare-mba', 'comparison tool')}.</p>`,
  tool: 'finder',
  toolArgs: { goal: 'z-me' },
  related: ['best-mba-europe', 'best-mba-asia', 'mba-finder', 'compare-mba', `school:${a.slug}`],
  sources: ['mbacsea', 'ecb_fx', 'gmac'],
  schoolSources: [a.slug, b.slug, c.slug],
});
