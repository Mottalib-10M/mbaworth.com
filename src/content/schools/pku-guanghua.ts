import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'pku-guanghua';
const s = K.s(slug);
const o = K.roi(slug);
const m = s.months ?? 24;
const forgone = Math.round((K.MODEL.refSalary * m) / 12);
const tUsd = K.c(slug).tuition!;
const priced = K.schools.filter((x) => x.tuition);
const cheaper = priced.filter((x) => K.c(x.slug).tuition! < tUsd).length;
const ratio = Math.round(forgone / tUsd);
const sj = K.s('sjtu-antai');
const sjT = sj.tuition ? K.c('sjtu-antai').tuition : null;
const cn = K.schools.filter((x) => x.country === 'CN');
const cnRoi = cn.filter((x) => K.roi(x.slug) !== null).map((x) => x.slug);

export default defineSchool({
  slug,
  title: 'Peking Guanghua MBA 2026: Beijing Fees and the Salary Gap',
  description: `Peking Guanghua Global MBA 2026: ${K.tuition(slug)} for the whole ${m}-month program, about ${K.tuitionUsd(slug)}, taught in English, and why no salary or payback can be shown.`,
  intro: `The English-taught Global MBA at Peking University's Guanghua School costs ${K.tuition(slug)} in tuition for ${m} months${cheaper <= 5 ? ', one of the lowest fees in our data,' : ''} and publishes no current employment report.`,
  resume: `Guanghua School of Management at Peking University charges ${K.tuition(slug)} for the whole of its full-time Global MBA, the English-taught track for the ${s.tuition!.cohort}, about ${K.tuitionUsd(slug)} at the ECB rate. ${cheaper === 0 ? 'No school in our data charges less.' : `Only ${cheaper} of the ${priced.length} schools in our data with a published fee charge less.`} No other mandatory fee is listed beyond the application fee, and no living budget or housing cost appears on the pages we read. The school's career office links only to employment reports several years old, too old to describe today's market, so there is no salary, no placement rate and no split by industry. ${o ? '' : `Without them our model cannot compute a total cost or a payback for the reference person earning ${K.ref()}.`} The figure that matters most is not on the fee page: ${m} months away from work cost that person about ${K.usd(forgone)} in salary, roughly ${K.num(ratio)} times the tuition.`,
  body: (h) => `<h2>When tuition is the small line</h2>
<p>At ${K.tuitionUsd(slug)}, tuition is a minor part of what a Guanghua degree costs anyone with a professional salary. The ${m}-month format is what drives the bill: for the reference person on ${K.ref()}, the salary given up is about ${K.usd(forgone)}, so a candidate earning half as much would still give up about ${K.num(Math.round(ratio / 2))} times the fee. The calculator above takes your own salary and any living estimate you type, and the mini below isolates the salary line.</p>
${h.mini('forgone')}
<h2>An English track inside a Chinese school</h2>
<p>The Global MBA is a small program taught in English, separate from the larger Chinese-taught MBA. The class statistics the school publishes are brief: an average age of ${K.num(s.profile.age!)}, about ${K.num(s.profile.exp!)} years of work experience, and a group in which the largest share came from finance and banking before the program. There is no class size, no share of women and no share of international students on the pages we read.</p>
<p>Scholarships are generous relative to the fee. The top award waives the whole tuition, and the school lists need-based, women's leadership and municipal government awards with published ranges; it does not say how many students receive one. ${sjT !== null ? `For comparison, ${h.sc('sjtu-antai')} in Shanghai charges ${K.tuitionUsd('sjtu-antai')} for its own ${sj.months}-month English-taught MBA, ${sjT > tUsd ? 'more than' : 'less than'} Guanghua.` : ''}</p>
<h2>What is missing, and where to look</h2>
<p>A payback needs a recent salary and a living budget, and Guanghua's open pages give neither. ${cnRoi.length ? `Among the Chinese schools in our data, ${K.listOf(cnRoi.map((x) => h.sc(x)))} ${cnRoi.length === 1 ? 'publishes' : 'publish'} both, which makes ${cnRoi.length === 1 ? 'it' : 'them'} the ones to compare on the same model.` : 'None of the Chinese schools in our data publishes both, so no Chinese program can be compared on the same model.'} Ask admissions for the most recent placement figures of the English-taught class specifically, since a report on the Chinese-taught MBA describes a different group. For the salary field of the calculator, the honest input is what the role you want pays in the city where you plan to work; a salary from another market converted into dollars says little about pay in Beijing. The fee is set in renminbi, so the cost in your own currency moves with the exchange rate.</p>
${h.miniFx()}`,
  faqs: [
    { q: 'How much does the Peking Guanghua Global MBA cost?', a: `Tuition is ${K.tuition(slug)} for the whole ${m}-month program for the ${s.tuition!.cohort}, about ${K.tuitionUsd(slug)} at the ECB rate of ${K.day(K.FX_DATE)}. The school lists no other mandatory fee beyond the application fee and publishes no living budget for Beijing, so housing and daily costs come on top of that figure.` },
    { q: 'Does Peking Guanghua publish MBA salaries?', a: `Not for recent classes. The career office links only to employment reports several years old, which this site treats as too old to use, and its Chinese pages list none. Without a salary, no payback can be computed; for a person on ${K.ref()}, the ${m} months of study still mean about ${K.usd(forgone)} of salary given up.` },
    { q: 'Can a Peking Guanghua MBA be done for free?', a: `In part, for some students. The school's top scholarship waives the full ${K.tuition(slug)} tuition, and other awards cover smaller amounts. It does not publish how many students receive them. Even with a full waiver, the salary given up over ${m} months remains: about ${K.usd(forgone)} for a person earning ${K.ref()} before the program.` },
  ],
  related: ['school:sjtu-antai', 'school:ceibs', 'school:fudan', 'best-mba-asia', 'mba-cost', 'mba-finder'],
});
