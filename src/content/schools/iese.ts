import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'iese';
const s = K.s(slug);
const o = K.roi(slug);
const num = (re: RegExp) => { const m = s.tuition!.cohort.match(re); return m ? Number(m[1].replace(/,/g, '')) : null; };
const commit = num(/commitment fee ([\d,]+)/), y1 = num(/Year 1 ([\d,]+)/), y2 = num(/Year 2 ([\d,]+)/);
const zone = (z: string) => s.emp.zones.find((x) => x.zone === z);
const latam = zone('Latin America'), eu = zone('Europe'), me = zone('Middle East'), asia = zone('Asia');
const latR = K.rank(slug, 'z-latam'), meR = K.rank(slug, 'z-me');
const latAll = K.schools.filter((x) => x.emp.zones.some((z) => z.zone === 'Latin America' && z.pct !== null)).sort((a, b) => (b.emp.zones.find((z) => z.zone === 'Latin America')!.pct ?? 0) - (a.emp.zones.find((z) => z.zone === 'Latin America')!.pct ?? 0));
const latTop = latAll[0]?.slug === slug;
const forg = Math.round((K.MODEL.refSalary * s.months!) / 12);
const consFn = s.emp.functions.find((f) => /^Consulting/.test(f.label));

export default defineSchool({
  slug,
  title: 'IESE MBA 2026: Barcelona Fees and Where Graduates Go',
  description: `IESE MBA 2026 in Barcelona: ${K.tuition(slug)} tuition over two years, ${K.share(slug, 'consulting')} of graduates in consulting, ${K.share(slug, 'z-latam')} working in Latin America, and no salary from the school.`,
  intro: `${latTop ? 'More graduates in Latin America than any other school on this site' : `${K.share(slug, 'z-latam')} of graduates in Latin America`}, and a two-year Barcelona MBA billed at ${K.tuition(slug)}.`,
  resume: `IESE charges ${K.tuition(slug)} in tuition for its two-year MBA, the ${s.tuition!.cohort.split(':')[0]}, paid as ${commit ? `a ${K.money(commit, 'EUR')} commitment fee` : 'a commitment fee'}${y1 && y2 ? `, ${K.money(y1, 'EUR')} for the first year and ${K.money(y2, 'EUR')} for the second` : ' and two yearly payments'}. The school publishes no living budget, only a remark that Barcelona costs less than other large European cities, and no graduate salary on its open pages: the full employment report sits behind a lead form. ${o ? '' : `This page therefore cannot show a total cost for a person earning ${K.ref()} or a payback date, and our main ranking leaves IESE out.`} What it does publish is a regional split that stands out: ${K.share(slug, 'z-europe')} of graduates of the class of 2025 work in Europe and ${K.share(slug, 'z-latam')} in Latin America, with the Middle East and Asia close behind. Consulting is the dominant sector, at ${K.share(slug, 'consulting')} of the class, and ${s.emp.employed !== null ? `${K.p(s.emp.employed)} of graduates were ${s.emp.employedLabel}` : 'most graduates found work quickly'}.`,
  body: (h) => `<h2>A European school with a Latin American alumni base</h2>
<p>${latam ? `${K.p(latam.pct!)} of IESE's class of 2025 went to work in Latin America` : 'A large part of the class went to Latin America'}${latR ? `, which puts the school ${latR.rank === 1 ? 'first' : `number ${latR.rank}`} of ${latR.of} in our ranking for working there` : ''}. ${eu ? `Europe takes ${K.p(eu.pct!)}` : 'Europe takes the largest share'}, ${me ? `the Middle East ${K.p(me.pct!)}` : 'the Middle East a sizable share'}${meR ? `, enough for ${meR.rank === 1 ? 'first' : `number ${meR.rank}`} of ${meR.of} in our ${h.a('best-mba-middle-east', 'Middle East ranking')}` : ''}, and ${asia ? `Asia ${K.p(asia.pct!)}` : 'Asia a smaller share'}. North America and Africa are small. For a student from Mexico, Colombia or Brazil who wants to go home with a European degree, this is the pattern to look for; for someone set on New York, it is not.</p>
<p>Consulting dominates both ways of reading the report: ${K.share(slug, 'consulting')} of graduates joined consulting firms, and ${consFn ? `${K.p(consFn.pct!)} took consulting roles, including inside companies` : 'more took consulting roles'}. Finance follows at ${K.share(slug, 'finance')}, technology at ${K.share(slug, 'tech')}. The named employers include ${K.listOf(K.employers(slug, 6))}, a list led by strategy firms and technology companies.</p>
${h.miniGoal(slug)}
<h2>The second year costs more than the first</h2>
<p>${y1 && y2 ? `Tuition rises from ${K.money(y1, 'EUR')} in the first year to ${K.money(y2, 'EUR')} in the second, a jump of ${K.money(y2 - y1, 'EUR')}.` : 'Tuition is billed per year.'} The total also moves between intakes, and the class entering in September 2026 paid less than the next one, so the figure here applies only to the intake named. Scholarships typically cover between a tenth and half of tuition, with excellence awards for the top admitted candidates and several awards for women, but the school does not publish an average or the share of the class aided.</p>
<p>Without a living budget from the school, the calculator leaves that field for you to fill: type your monthly rent and costs in Barcelona multiplied over the two years, then the salary you expect after the degree. At the reference salary of ${K.ref()}, the ${s.months} months without pay come to ${K.usd(forg)}, ${forg > K.c(slug).tuition! ? 'more than' : 'less than'} the ${K.tuitionUsd(slug)} of tuition.</p>
${h.mini('forgone')}
<h2>Against IE, the other Spanish school</h2>
<p>${h.sc('ie')} in Madrid charges ${K.tuition('ie')} for an ${K.s('ie').months}-month program, and also publishes neither salary nor living budget. The ${h.a('compare-iese-vs-ie', 'IESE and IE comparison')} sets the two reports side by side: IESE ${K.shareRaw(slug, 'consulting')! > (K.shareRaw('ie', 'consulting') ?? 0) ? 'sends more graduates into consulting' : 'sends fewer graduates into consulting'} and publishes a regional split; IE has the shorter format and no regional data.</p>`,
  faqs: [
    { q: 'How much does the IESE MBA cost?', a: `Tuition for the ${s.tuition!.cohort.split(':')[0]} is ${K.tuition(slug)}${y1 && y2 ? `: ${K.money(y1, 'EUR')} in year one and ${K.money(y2, 'EUR')} in year two, after a commitment fee` : ''}. IESE publishes no living budget for Barcelona, so add your own rent and costs for two years in the calculator, plus the salary you will not earn during the program.` },
    { q: 'What salary do IESE MBA graduates earn?', a: `IESE does not publish a salary on its open pages for the class of 2025; the full report is released only after filling in a lead form. We do not reuse third-party figures, so this page shows no payback for the reference person earning ${K.ref()}. The calculator gives one when you type the salary you expect.` },
    { q: 'Where do IESE MBA graduates work after the degree?', a: `In the class of 2025, ${K.share(slug, 'z-europe')} work in Europe, ${K.share(slug, 'z-latam')} in Latin America, ${K.share(slug, 'z-asia')} in Asia and ${K.share(slug, 'z-me')} in the Middle East, with small shares in North America and Africa. The school does not give a salary for any region. ${s.emp.employed !== null ? `${K.p(s.emp.employed)} were ${s.emp.employedLabel}.` : ''}` },
    { q: 'Is IESE a good MBA for consulting?', a: `Consulting is its largest sector: ${K.share(slug, 'consulting')} of the class of 2025 joined consulting firms, and ${consFn ? K.p(consFn.pct!) : 'more'} held consulting roles. The named recruiters include ${K.listOf(K.employers(slug, 4).filter((n) => /Bain|Boston|McKinsey|Kearney|Accenture|Strategy/.test(n)))}. Without a published salary, our consulting ranking cannot place IESE, so compare it on share alone with the schools in the consulting ranking.` },
  ],
  related: ['school:ie', 'school:esade', 'compare-iese-vs-ie', 'best-mba-consulting', 'best-mba-europe'],
});
