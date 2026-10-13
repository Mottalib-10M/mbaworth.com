import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'ivey';
const s = K.s(slug);
const o = K.roi(slug);
const C = (v: number) => K.money(v, 'CAD');
const sal = s.emp.salary!;
const refCad = Math.round(K.MODEL.refSalary / K.FX.CAD);
const belowRef = sal.usd !== null && sal.usd < K.MODEL.refSalary;
const ind = (k: string) => s.emp.industries.find((x) => x.key === k);
const cons = ind('consulting'), fin = ind('finance'), tech = ind('tech');
const fnCons = s.emp.functions.find((f) => /^Consulting/.test(f.label));
const bonus = s.emp.bonus;
const caR = K.rank(slug, 'z-canada');
const toronto = s.emp.zones.find((z) => z.zone === 'Canada')?.label.match(/Toronto\/GTA (\d+)%/)?.[1];
const rotman = K.s('toronto-rotman');

export default defineSchool({
  slug,
  title: 'Ivey MBA 2026: Canadian Cost, Median Pay and Payback',
  description: `Ivey MBA 2026: ${K.tuition(slug)} tuition for one year in London, Ontario, a ${K.salary(slug)} median base salary, ${K.share(slug, 'z-canada')} hired in Canada, and the payback at your own salary.`,
  intro: `A one-year Canadian MBA where consultants reported a ${cons?.salary ? C(cons.salary) : 'higher'} median, far above the class-wide ${K.salary(slug)}.`,
  resume: `Ivey Business School charges ${K.tuition(slug)} in tuition for its one-year MBA, for the ${s.tuition!.cohort}, plus ${K.fees(slug)} of mandatory fees and course materials, and its monthly estimates for a student house in London, Ontario add up to ${K.living(slug)} a year, for ${K.direct(slug)}${K.directUsd(slug) ? `, about ${K.directUsd(slug)}` : ''}. The class of 2025 reported a ${K.salaryKind(slug)} of ${K.salary(slug)}, or ${K.salaryUsd(slug)}. ${belowRef && o ? `That is less than the ${K.ref()} the site assumes before the MBA, about ${C(refCad)}, so for the reference person the model barely repays the cost: ${K.payback(slug) ?? 'over 30 years'}, with a ten-year value of ${K.npv(slug)}. Those figures say more about the reference than about Ivey. Someone earning a Canadian salary before the program, typed in the calculator, sees a very different result.` : o ? `On that figure the reference person repays the cost ${K.payback(slug)} after graduation.` : ''} What sets Ivey apart is the spread inside its report: consulting pays a far higher median than the class as a whole, and ${K.share(slug, 'z-canada')} of graduates work in Canada${toronto ? `, ${toronto}% of them in Toronto` : ''}.`,
  body: (h) => `<h2>Consulting pays, finance hires</h2>
<p>Finance is the largest group in Ivey's report, ${K.share(slug, 'finance')} of reported salaries${fin?.salary ? `, at a median of ${C(fin.salary)}` : ''}, but consulting is where the money is: ${K.share(slug, 'consulting')} of the class${cons?.salary ? ` at ${C(cons.salary)}` : ''}${cons?.salary && fin?.salary ? `, ${C(cons.salary - fin.salary)} more than finance` : ''}. By role, consulting and corporate strategy jobs account for ${fnCons ? K.p(fnCons.pct!) : 'the largest share'} of graduates, a larger share than the consulting sector itself, so part of those roles sit in other industries. Technology hired ${K.share(slug, 'tech')}${tech?.salary ? ` at ${C(tech.salary)}` : ''}. The report's shares are those of graduates who reported a salary, and the median covers the share of acceptances that disclosed pay.</p>
<p>The difference between the median and the mean matters here. Ivey's mean base salary is noticeably higher than its median, pulled up by the highest offers, and its median total compensation, bonuses included, sits a little above the median base. ${bonus ? `${K.p(bonus.pct!)} of graduates received a signing bonus, at a median of ${C(bonus.v)}.` : ''} The calculator uses the median base, the most cautious of the three.</p>
${h.miniGoal(slug)}
<h2>A Canadian salary and the reference person</h2>
<p>This site compares all schools for one reference person earning ${K.ref()} before the MBA. Converted at the ECB rate, that is about ${C(refCad)}, ${belowRef ? `more than the ${K.salary(slug)} median after an Ivey MBA` : `close to Ivey's median`}. For that person the degree is a poor deal on paper, and our ranking places Ivey low for that reason${caR ? `, though it is ${caR.rank} of ${caR.of} for ${h.a('mba-finder', 'working in Canada')}` : ''}. For a Canadian applicant whose current salary is well below that reference, the picture changes: type your own current pay in the calculator below and keep the Ivey median as the salary after.</p>
${o ? h.miniPayback(slug) : h.mini('forgone')}
<h2>Scholarships for most of the class</h2>
<p>Ivey says about four in five incoming students, Canadian and international alike, receive an admission scholarship within a published range, without stating the average. International students also pay the provincial health plan on top of the fees counted here, and the living estimate uses the school's starting rents for a room in a student house. ${K.intl(slug)} of the class of 2025 came from abroad, with an average of ${K.num(s.profile.exp!)} years of experience. In Toronto, ${h.sc('toronto-rotman')} charges ${K.tuition('toronto-rotman') ?? 'an unpublished fee'} for a ${rotman.months}-month program.</p>
${o ? h.miniScholarship(slug) : h.miniFx()}`,
  faqs: [
    { q: 'How much does the Ivey MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${s.tuition!.cohort}, with ${K.fees(slug)} of mandatory fees and course materials on top. Ivey's monthly estimates for living in London, Ontario add up to ${K.living(slug)} a year, for ${K.direct(slug)}. International students also pay the provincial health plan, and optional health and dental cover is extra.` },
    { q: 'What salary do Ivey MBA graduates earn?', a: `The class of 2025 reported a median base salary of ${K.salary(slug)}, about ${K.salaryUsd(slug)}. Consulting reported a median of ${cons?.salary ? C(cons.salary) : 'an unpublished figure'} and finance ${fin?.salary ? C(fin.salary) : 'an unpublished figure'}. ${bonus ? `${K.p(bonus.pct!)} received a signing bonus, with a median of ${C(bonus.v)}.` : ''} The mean base salary is higher than the median, pulled up by the highest offers.` },
    { q: 'Why does the Ivey MBA take so long to pay back on this page?', a: `Because the reference person already earns ${K.ref()}, about ${C(refCad)}, ${belowRef ? `more than the ${K.salary(slug)} median after the degree` : 'close to the median after the degree'}. ${o ? `The model then gives ${K.payback(slug) ?? 'over 30 years'}.` : ''} A Canadian applicant with a lower salary before the MBA repays far sooner, since less pay is given up during the year: type your own figures in the calculator.` },
    { q: 'Do most Ivey MBA students get a scholarship?', a: `According to the school, about four in five incoming students receive an admission scholarship, both Canadian and international, within a published range. Ivey does not publish the average award. On a ${K.tuition(slug)} tuition, the tool on this page shows how an award shortens the payback for the reference person.` },
  ],
  related: ['school:toronto-rotman', 'school:queens-smith', 'best-mba-one-year', 'best-mba-consulting', 'mba-finder'],
});
