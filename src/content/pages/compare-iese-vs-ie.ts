import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const A = 'iese', B = 'ie';
const a = K.s(A), b = K.s(B);
const cA = K.c(A), cB = K.c(B);
const ref = K.MODEL.refSalary;
const zone = (slug: string, z: string) => K.s(slug).emp.zones.find((x) => x.zone === z) ?? null;
const zp = (slug: string, z: string) => { const x = zone(slug, z); return x && x.pct !== null ? K.p(x.pct) : 'not published'; };
const rk = (slug: string, g: string) => { const r = K.rank(slug, g); return r ? `number ${r.rank} of ${r.of}` : 'not ranked'; };
const fg = (c: typeof cA) => Math.round((ref * (c.months ?? 0)) / 12);
/** What can be added without inventing the living budget: tuition, fees and salary given up. */
const part = (c: typeof cA) => c.tuition! + c.fees + fg(c);
const ind = (slug: string, key: string) => K.s(slug).emp.industries.find((x) => x.key === key)?.pct ?? null;
const lead = (slug: string) => [...K.s(slug).emp.industries].filter((x) => x.key !== 'other' && x.pct !== null).sort((x, y) => y.pct! - x.pct!)[0];
const lA = lead(A), lB = lead(B);
const fnB = b.emp.functions.slice(0, 3);

export default definePage({
  id: 'compare-iese-vs-ie',
  group: 'compare',
  order: 4,
  slug: 'compare/iese-vs-ie',
  nav: 'IESE vs IE',
  card: 'Barcelona against Madrid, two years against eleven months, and two employment reports with no salary we could read.',
  title: 'IESE vs IE MBA 2026: Cost, Length and Where Graduates Go',
  description: `IESE vs IE Business School in 2026: ${K.tuition(A)} for ${a.months} months against ${K.tuition(B)} for ${b.months}, the salary given up, where graduates go, and what neither school publishes.`,
  h1: 'IESE or IE Business School',
  intro: `${a.short} charges ${K.tuition(A)} for a two-year program in Barcelona, ${b.short} ${K.tuition(B)} plus ${K.fees(B) ?? 'no'} of fees for ${b.months} months in Madrid.`,
  resume: `${a.short} and ${b.short}, the two Spanish schools most applicants shortlist, differ on length before anything else. ${a.short} runs two academic years, which we count as ${a.months} months, for ${K.tuition(A)} of tuition; ${b.short} runs ${b.months} months for ${K.tuition(B)} and ${K.fees(B) ?? 'no'} of fees. For a person earning ${K.ref()} today, the salary given up is ${K.usd(fg(cA))} at ${a.short} and ${K.usd(fg(cB))} at ${b.short}, so tuition, fees and lost pay come to ${K.usd(part(cA))} and ${K.usd(part(cB))} before any living cost. Neither school publishes a student living budget we could use, and neither publishes a graduate salary on its open pages: ${a.short} keeps its full report behind a sign-up form, ${b.short} gives industry shares without pay. No payback can therefore be computed for either without inventing a figure, and we do not. What can be compared is where graduates go: ${ind(A, 'consulting') !== null ? K.p(ind(A, 'consulting')!) : 'a large share'} of ${a.short}'s class went into consulting, against ${ind(B, 'consulting') !== null ? K.p(ind(B, 'consulting')!) : 'a smaller share'} at ${b.short}.`,
  faqs: [
    { q: 'Is IESE or IE cheaper for an MBA?', a: `${b.short} on every line we can count. Its tuition is ${K.tuitionUsd(B)} against ${K.tuitionUsd(A)} at ${a.short}, converted at the ECB rate, and its ${b.months} months mean ${K.usd(fg(cB))} of salary given up for a ${K.ref()} earner, against ${K.usd(fg(cA))} over ${a.short}'s two years. A living budget, once you add your own, widens the gap further, since ${a.short} lasts ${a.months! - b.months!} months longer and rent is due every month.` },
    { q: 'Why is there no payback for IESE or IE on this site?', a: `Because neither publishes the two figures the model needs on its open pages: a graduate salary and a student living budget. ${a.short}'s full employment report sits behind a lead form, ${b.short} reports industry shares but no pay. We do not borrow salaries from rankings. Type a figure from the schools themselves into the calculator to get one.` },
    { q: 'Do IESE or IE graduates work outside Spain after the MBA?', a: `${a.short} says so clearly: ${zp(A, 'Europe')} of its class works in Europe, ${zp(A, 'Latin America')} in Latin America, ${zp(A, 'Asia')} in Asia and ${zp(A, 'Middle East')} in the Middle East. That puts it ${rk(A, 'z-latam')} in our Latin America ranking. ${b.short} publishes no split by region in the documents we read, so its placement abroad cannot be measured here.` },
    { q: 'IESE or IE for a career in technology?', a: `${b.short} sends a larger share into technology, ${ind(B, 'tech') !== null ? K.p(ind(B, 'tech')!) : 'a share it publishes'}, against ${ind(A, 'tech') !== null ? K.p(ind(A, 'tech')!) : 'a smaller share'} at ${a.short}, and lists ${K.listOf(K.employers(B, 10).filter((n) => /Amazon|Google|Uber|Salesforce/.test(n)).slice(0, 3)) || 'technology firms'} among its employers. With no salary published at either school, the comparison stops at the share placed: whether those tech jobs pay more than the consulting jobs ${a.short} graduates take cannot be checked on the schools' own documents.` },
    { q: 'Does IESE offer MBA scholarships, and does IE?', a: `${a.short} says individual awards usually cover between a tenth and a half of tuition, with a few full-tuition awards, but publishes no average award or share of the class aided. ${b.short} mentions merit aid, loans and program scholarships without amounts. Type an expected award into the calculator and it comes off the total cost directly.` },
  ],
  body: (h) => `<h2>Two years in Barcelona or ${b.months} months in Madrid</h2>
<p>The calendar decides most of the money here. ${h.sc(A)} sets its fee as a commitment deposit plus two annual installments, ${K.tuition(A)} in all for the ${a.tuition!.cohort.split(':')[0]}. ${h.sc(B)} charges ${K.tuition(B)} plus ${K.fees(B) ?? 'no'} of fees for an ${b.months}-month program, with the fee reviewed every year. Converted at the ECB rate of ${K.day(K.FX_DATE)}, that is ${K.tuitionUsd(A)} against ${K.usd(cB.tuition! + cB.fees)}. The months you do not work add ${K.usd(fg(cA))} at ${a.short} and ${K.usd(fg(cB))} at ${b.short} for a ${K.ref()} earner, which widens the gap between the two schools from ${K.usd(cA.tuition! + cA.fees - cB.tuition! - cB.fees)} to ${K.usd(part(cA) - part(cB))}.</p>
<p>A two-year program buys a summer internship and a second recruiting season. For someone changing industry or country, that time is often what makes the change possible. A program of ${b.months} months asks you to know where you are going on arrival, and it puts you back on a salary ${a.months! - b.months!} months sooner.</p>
${h.miniFx()}
<h2>What neither school publishes</h2>
<p>This is the comparison with the most blanks on the site, and we leave them blank. ${a.short} publishes no living budget on its fees or loans pages, only a remark that Barcelona costs less than other large European cities. ${b.short}'s student services list monthly price ranges for a room, groceries, transport and insurance, with no total and nothing specific to the MBA. A list of ranges is not a budget, so we do not add one up.</p>
<p>Salaries are missing too. ${a.short}'s open pages give shares by industry and region but put the full report, with pay, behind a lead form. ${b.short}'s pages give industry and function shares and an employer list, without pay and without a hiring rate within three months. Third-party figures exist in rankings; we do not reuse them, because they are not the school's own document and cannot be checked against one. The calculator above accepts a salary and a living budget you type yourself, from the schools' admissions offices.</p>
<h2>Where the classes go</h2>
<p>${a.short} sends ${lA ? `${K.p(lA.pct!)} of its class into ${lA.label.toLowerCase()}` : 'most of its class into consulting'}, with the large strategy firms in the employer list it publishes. It also reports ${a.emp.employed !== null ? K.p(a.emp.employed) : 'a share'} of graduates employed within three months. Geography is where ${a.short} stands out: ${zp(A, 'Latin America')} of its graduates work in Latin America, ${rk(A, 'z-latam')} in our ranking for that region, and ${zp(A, 'Middle East')} in the Middle East, ${rk(A, 'z-me')}.</p>
<p>${b.short} spreads its class more evenly. ${lB ? `${lB.label} leads with ${K.p(lB.pct!)}` : 'No industry leads'}, ahead of finance at ${ind(B, 'finance') !== null ? K.p(ind(B, 'finance')!) : 'a share it publishes'} and consulting at ${ind(B, 'consulting') !== null ? K.p(ind(B, 'consulting')!) : 'a share it publishes'}. By job, its largest groups are ${K.listOf(fnB.map((f) => `${f.label.toLowerCase()} (${f.pct !== null ? K.p(f.pct) : 'n/a'})`))}. Its class is ${K.intl(B) ?? 'largely'} international, from ${b.profile.countries ?? 'many'} countries, against ${K.intl(A) ?? 'a large share'} at ${a.short}.</p>
${h.miniGoal(A)}
<h2>Who should pick which</h2>
<p>Pick ${a.short} for strategy consulting, for a career in Latin America or for the time a two-year program gives to change direction. Pick ${b.short} for a shorter, cheaper year, a class that leans toward technology and sales roles, and a faster return to a salary. Before deciding, ask both schools for the salary pages of their reports and a realistic budget for the city; with those two figures, the ${h.a('compare-mba', 'comparison tool')} gives the payback that this page cannot.</p>`,
  tool: 'compare',
  toolArgs: { schools: ['iese', 'ie'] },
  related: ['school:iese', 'school:ie', 'best-mba-europe', 'compare-insead-vs-hec', 'mba-cost'],
  sources: ['ecb_fx', 'mbacsea', 'gmac'],
  schoolSources: ['iese', 'ie'],
});
