import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'nova-sbe';
const s = K.s(slug);
const o = K.roi(slug);
const m = s.months ?? 12;
const forgone = Math.round((K.MODEL.refSalary * m) / 12);
const europe = K.schools.filter((x) => (x.region === 'Europe' || x.region === 'UK') && x.tuition && x.slug !== slug);
const cheaper = europe.filter((x) => K.c(x.slug).tuition! < K.c(slug).tuition!).length;
const lowest = cheaper === 0;
const median = (xs: number[]) => { const a = [...xs].sort((p, q) => p - q); return a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2; };
const euMedian = Math.round(median(europe.map((x) => K.c(x.slug).tuition!)));
const tUsd = K.tuitionUsd(slug);
const cat = s.tuition!.cohort.replace(/\s*\(.*\)$/, '');
const fuller = europe.filter((x) => x.months !== null && x.months <= 12 && K.roi(x.slug) !== null).map((x) => x.slug).slice(0, 3);

export default defineSchool({
  slug,
  title: lowest ? 'Lisbon MBA (Nova SBE / Católica) 2026: Low Fees, No Salary' : 'Lisbon MBA (Nova SBE / Católica) 2026: Fees and Data Gaps',
  description: `Lisbon MBA Católica|Nova 2026: ${K.tuition(slug)} tuition for a ${m}-month joint degree, about ${tUsd}, and why no living budget, salary or payback can be shown here.`,
  intro: `${lowest ? 'The lowest tuition of any European school in our data' : `Tuition of ${K.tuition(slug)}`}, for a ${m}-month MBA run jointly by two Lisbon business schools that publish no employment report.`,
  resume: `The Lisbon MBA is a joint degree of Nova SBE and Católica Lisbon, ranked as one program, and its full-time international track charges ${K.tuition(slug)} for ${m} months according to the ${cat}, about ${tUsd} at the ECB rate. ${lowest ? 'No other European school in our data charges less.' : `${cheaper} European schools in our data charge less.`} The rest of the cost is unknown from official sources: the program's own website blocks automated reading, and the university catalogue gives no fee schedule beyond tuition and no living budget. There is no employment report either, so no salary for recent graduates; the only pay figures the schools quote come from a third-party ranking survey of alumni, which this site does not use. ${o ? '' : `Our model therefore cannot compute a total cost or a payback for the reference person earning ${K.ref()}, and the program stays out of our rankings.`} What we can say is that ${m} months away cost that person about ${K.usd(forgone)} in salary, more than the tuition itself.`,
  body: (h) => `<h2>Two schools, one degree</h2>
<p>Nova SBE and Católica Lisbon are separate schools, yet the international MBA is a single joint degree carrying both names, and rankings treat it as one program. The catalogue describes a ${m}-month accelerated program that includes a short immersion at ${h.sc('mit-sloan', 'MIT Sloan')}. The class figures the schools publish describe a mixed room: ${s.profile.intl !== null ? `${K.p(s.profile.intl)} international` : 'a large international share'}, ${s.profile.women !== null ? `${K.p(s.profile.women)} women` : ''}${s.profile.countries ? `, ${K.num(s.profile.countries)} nationalities` : ''}, quoted in a school news item rather than a dated class profile.</p>
<h2>Cheap tuition, unknown everything else</h2>
<p>${tUsd} of tuition compares with a median of ${K.usd(euMedian)} across the ${europe.length} other European schools in our data. That gap is the whole case for the program on price. It does not tell you the cost of a year in Lisbon, which the schools leave to you; type your own rent and living estimate in the calculator above. It also does not tell you what graduates earn. A school that cites only ranking-survey salaries measured a few years after graduation gives you no starting salary to repay the cost against. An alumni average a few years out mixes promotions, career changes and moves abroad, so it says little about the first job after a Lisbon degree.</p>
<p>The practical test is simple: ask admissions for the latest employment report, with the share of graduates employed within three months, the median base salary and the countries where they work. If they cannot supply one, price the degree on what you would earn in Portugal or in your target market, ${fuller.length ? `and compare with one-year European programs that publish a salary and a living budget, such as ${K.listOf(fuller.map((x) => h.sc(x)))}` : 'and compare with schools that publish a salary and a living budget'}.</p>
${h.miniFx()}
<h2>The cost that does not depend on the school</h2>
<p>For the reference person earning ${K.ref()}, the ${m} months of study mean about ${K.usd(forgone)} of salary given up before tax, ${forgone > K.c(slug).tuition! ? 'more than the tuition' : 'close to the tuition'}. On a program this inexpensive, the salary you leave behind is the main line of the bill, so the earlier in your career you go, the cheaper the degree becomes. The mini below converts your own salary into that cost.</p>
${h.mini('forgone')}`,
  faqs: [
    { q: 'How much does the Lisbon MBA (Nova SBE / Católica) cost?', a: `Tuition for the full-time international MBA is ${K.tuition(slug)} for ${m} months, according to the ${cat}, about ${tUsd} at the ECB rate of ${K.day(K.FX_DATE)}. The schools publish no living budget and no mandatory fees beyond tuition on the pages we could read, so the total for a year in Lisbon depends on your own estimate.` },
    { q: 'What salary do Lisbon MBA (Nova SBE / Católica) graduates earn?', a: `The schools publish no employment report and no starting salary. The pay figures they quote come from a third-party ranking survey of alumni a few years after graduation, which this site does not use. Without a salary, our model cannot compute a payback; for a person on ${K.ref()}, the ${m} months of study still mean about ${K.usd(forgone)} of pay given up.` },
    { q: 'Is the Lisbon MBA a joint degree of Nova SBE and Católica?', a: `Yes. The Lisbon MBA Católica|Nova is run by both schools as a single ${m}-month joint degree, and it appears in rankings as one program. ${s.profile.intl !== null ? `The schools report a class that is ${K.p(s.profile.intl)} international${s.profile.countries ? ` from ${K.num(s.profile.countries)} nationalities` : ''}.` : ''} The program includes a short immersion at MIT Sloan in the United States.` },
  ],
  related: ['school:ie', 'school:esade', 'school:mit-sloan', 'best-mba-europe', 'best-mba-one-year', 'mba-cost'],
});
