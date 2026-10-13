import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'sjtu-antai';
const s = K.s(slug);
const o = K.roi(slug);
const m = s.months ?? 24;
const forgone = Math.round((K.MODEL.refSalary * m) / 12);
const tUsd = K.c(slug).tuition!;
const pku = K.c('pku-guanghua').tuition;
const pkuRatio = pku ? Math.round((tUsd / pku) * 10) / 10 : null;
const oldYear = Number(/(\d{4})/.exec(s.emp.cohort)?.[1] ?? 0);
const age = oldYear ? Number(K.FX_DATE.slice(0, 4)) - oldYear : null;
const breakEven = Math.ceil((tUsd * 12) / m / 1000) * 1000;
const lc = (x: string) => (/^[A-Z]{2}/.test(x) ? x : x[0].toLowerCase() + x.slice(1));
const top3 = s.emp.industries.slice(0, 3).map((r) => lc(r.label));
const intake = s.tuition!.cohort.replace(/\s*\(.*\)$/, '').replace(/ intake IMBA$/, ' IMBA intake');
const times = (r: number) => (r === 2 ? 'about twice' : `about ${K.num(r, 1)} times`);
const latest = /latest/i.test(s.tuition!.cohort);

export default defineSchool({
  slug,
  title: 'SJTU Antai MBA 2026: Shanghai IMBA Fees and Old Job Data',
  description: `SJTU Antai IMBA 2026: ${K.tuition(slug)} for the ${m}-month English-taught MBA in Shanghai, about ${K.tuitionUsd(slug)}, no current salary data, and why no payback can be shown.`,
  intro: `Shanghai Jiao Tong's English-taught IMBA charges ${K.tuition(slug)} for ${m} months, and the newest employment report on its site describes the ${s.emp.cohort.replace(/\s*\(.*\)$/, '').toLowerCase()}.`,
  resume: `Antai College of Economics and Management at Shanghai Jiao Tong University charges ${K.tuition(slug)} for its ${m}-month International MBA, the English-taught full-time track, about ${K.tuitionUsd(slug)} at the ECB rate. That figure is for the ${intake}${latest ? ', the latest the school had published when we read it' : ''}, so a later intake may pay more. No other mandatory fee is listed. The school gives no total living budget, only ranges for campus rooms, shared flats and monthly living costs, and two of its own pages disagree on the monthly figure. On outcomes, the most recent IMBA employment report on the site is for the ${s.emp.cohort.replace(/\s*\(.*\)$/, '').toLowerCase()}${age ? `, about ${K.num(age)} years old` : ''}, and it gives no salary at all. ${o ? '' : `So our model computes no total cost and no payback for the reference person earning ${K.ref()}, and the school is not ranked.`} What stands out is the length of the program: ${m} months away from work cost that person about ${K.usd(forgone)} in salary.`,
  body: (h) => `<h2>An employment report from another era</h2>
<p>The industry figures shown in the tables of this page come from that old report: ${K.listOf(top3)} were the three largest sectors for those graduates. The school publishes no salary level for that class. A later news item from the school mentions a report on the full-time Chinese-taught MBA with a growth rate but no salary either. We show the old shares because they are the school's own data, not because they predict where a class entering now will work.</p>
<p>Ask admissions for current placement figures for the English-taught IMBA in particular: the share employed within three months, a median salary and the cities where graduates work. Without them, the calculator above needs your own estimate of the salary you would earn in Shanghai or wherever you plan to work afterwards.</p>
<h2>Fees, scholarships and the living range</h2>
<p>${pkuRatio ? `Tuition of ${K.tuitionUsd(slug)} is ${times(pkuRatio)} what ${h.sc('pku-guanghua')} charges for its own ${m}-month English-taught MBA in Beijing.` : `Tuition is ${K.tuitionUsd(slug)} at the ECB rate.`} Antai offers scholarships tied to the GMAT score and to the interview ranking, plus early-application and CFA awards; its own pages give different shares of students receiving performance scholarships, so treat any figure on that point as approximate. Living costs depend heavily on the choice between a campus room and a flat in the city, and the school's ranges span that choice without adding up a year.</p>
${h.miniFx()}
<h2>Two years away from a salary</h2>
<p>The format runs ${m} months, so the salary you stop earning outweighs tuition for anyone earning more than about ${K.usd(breakEven)} a year. For the reference person on ${K.ref()}, that is about ${K.usd(forgone)} before tax, ${K.num(Math.round((forgone / tUsd) * 10) / 10, 1)} times the tuition. A candidate whose employer sponsors the program and keeps paying a salary avoids most of that cost${forgone > tUsd ? ': on these figures, keeping a salary is worth more than a full tuition waiver' : ''}. The mini below converts your own salary into the cost of the months away.</p>
${h.mini('forgone')}`,
  faqs: [
    { q: 'How much does the SJTU Antai IMBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${m}-month program, about ${K.tuitionUsd(slug)} at the ECB rate of ${K.day(K.FX_DATE)}, at the rate for the ${intake}. The school lists no other mandatory fee and publishes no total living budget, only ranges for housing and monthly costs in Shanghai, so the full cost depends on your own estimate.` },
    { q: 'What salary do SJTU Antai IMBA graduates earn?', a: `The school publishes no salary. Its most recent IMBA employment report is for the ${s.emp.cohort.replace(/\s*\(.*\)$/, '').toLowerCase()} and gives only sector shares, led by ${top3[0] ?? 'finance'}. Without a current salary, our model cannot compute a payback; for a person on ${K.ref()}, the ${m} months of study mean about ${K.usd(forgone)} of salary given up.` },
    { q: 'Is the SJTU Antai IMBA taught in English?', a: `Yes. The International MBA is the full-time, English-taught track of Antai College at Shanghai Jiao Tong University, and it lasts ${m} months. Tuition is ${K.tuition(slug)}${pkuRatio ? `, ${times(pkuRatio)} the fee of the English-taught Global MBA at Peking Guanghua` : ''}. The school publishes no class profile for the track on its English site.` },
  ],
  related: ['school:pku-guanghua', 'school:ceibs', 'school:fudan', 'best-mba-asia', 'mba-cost', 'mba-finder'],
});
