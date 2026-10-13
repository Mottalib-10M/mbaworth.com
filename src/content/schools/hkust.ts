import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'hkust';
const s = K.s(slug);
const o = K.roi(slug);
const fins = s.emp.functions.find((f) => /Banking/.test(f.label));
const adm = s.emp.functions.find((f) => /Administration/.test(f.label));
const asiaR = K.rank(slug, 'z-asia');
const hku = K.s('hku');
const perMonth = Math.round(s.living!.v / s.months!);
const accel = Number(s.monthsNote.match(/(\d+)-month Accelerator/)?.[1]) || null;
const saved = accel ? s.months! - accel : null;

export default defineSchool({
  slug,
  title: 'HKUST MBA 2026: Fees, Living Budget and Career Data',
  description: `HKUST MBA 2026: ${K.tuition(slug)} program fee for ${s.months} months, a ${K.living(slug)} living budget, ${K.p(s.emp.employed!)} of the intake with an accepted offer, and why no payback can be shown.`,
  intro: `${K.p(s.emp.employed!)} of the full-time intake of 2025 ${s.emp.employedLabel}, yet the school keeps the salary behind a download form.`,
  resume: `The HKUST full-time MBA charges a program fee of ${K.tuition(slug)}${K.tuitionUsd(slug) ? `, about ${K.tuitionUsd(slug)}` : ''}, which already covers core textbooks and some activities. The school's living budget is written for ${s.living!.period}; scaled to the ${s.months}-month standard mode, which includes a summer internship, it comes to ${K.living(slug)}, for ${K.direct(slug)} before any salary you give up. ${o ? '' : `No total cost for a person earning ${K.ref()} and no payback can be shown here: the career report with the salary is gated behind a form, and the open pages publish none.`} What the school does publish is a headline under the MBA CSEA standard: ${K.p(s.emp.employed!)} of the intake ${s.emp.employedLabel}. The sector, function and location splits shown below come from a different source, the university-wide graduate survey, which counted only a few dozen MBA respondents. They point to Hong Kong and finance, but they are thin. A shorter ${accel ? `${accel}-month ` : ''}accelerator mode exists for students who skip the internship.`,
  body: (h) => `<h2>Two sources that do not describe the same group</h2>
<p>HKUST reports its MBA careers in two places. The career development page gives the headline for the intake of 2025, measured under the MBA CSEA rules. The detailed tables come from the HKUST Graduate Employment Survey, which covers every taught master's program; its MBA rows rest on a small sample and use broad sectors instead of consulting, finance and technology. That is why the industry table on this page shows a single "other" line, and why every respondent appears in Asia. The two sources may not even count the same people: the headline follows the intake, while the survey counts MBA graduates of the year who chose to answer it.</p>
<p>Read by job nature instead, ${fins ? `${K.p(fins.pct!)} of the survey respondents work in banking or finance roles` : 'banking and finance roles lead'}${adm ? ` and ${K.p(adm.pct!)} in administration and management` : ''}. ${asiaR ? `On that location data our ranking for ${h.a('best-mba-asia', 'working in Asia')} puts HKUST ${asiaR.rank} of ${asiaR.of}, a result that weighs only the share placed in the region and rests on the same small survey.` : ''} The survey's salary figures are monthly gross income with bonuses and allowances, not an annual base salary, so we do not use them.</p>
${h.miniFx()}
<h2>The standard mode or the accelerator</h2>
<p>The standard mode lasts ${s.months} months and leaves room for a summer internship; the accelerator mode finishes ${saved ? `${saved} months sooner` : 'sooner'}. The program fee is the same ${K.tuition(slug)}, so the choice changes only living costs and the salary you give up. At the school's budget, each extra month in Hong Kong costs about ${K.money(perMonth, 'HKD')}. For someone who already has a job lined up or is sponsored, the shorter mode removes ${saved ? `about ${K.money(perMonth * saved, 'HKD')} of living costs and ${saved} months` : 'several months'} without pay; for a career switcher, the internship is the chance to test a new sector before signing.</p>
<p>Scholarships are merit-based and every applicant is considered automatically. The school names a few endowed awards, including a small number of trade leadership scholarships, but publishes no average amount or share of the class aided. ${h.sc('hku')}, the other Hong Kong school with a full page here, charges ${K.tuition('hku')} for ${hku.months} months and also publishes no salary.</p>
${h.mini('forgone')}`,
  faqs: [
    { q: 'How much does the HKUST MBA cost?', a: `The program fee is ${K.tuition(slug)} for the ${s.tuition!.cohort.toLowerCase()}, with core textbooks included. The school's living budget, scaled to the ${s.months}-month standard mode, adds ${K.living(slug)}, for ${K.direct(slug)}${K.directUsd(slug) ? `, about ${K.directUsd(slug)}` : ''}. Optional field trips are not counted, and the accelerator mode saves several months of living costs.` },
    { q: 'What salary do HKUST MBA graduates earn?', a: `HKUST does not publish one on its open pages: the MBA CSEA career report with salaries sits behind a download form. The university survey gives monthly gross income for a small group of MBA respondents, bonuses included, which is not comparable with the annual base salaries other schools report. The calculator works if you type the salary you expect.` },
    { q: 'How many HKUST MBA graduates find a job?', a: `For the full-time intake of 2025, ${K.p(s.emp.employed!)} ${s.emp.employedLabel}, measured under the MBA CSEA standard. The share is high, but without the gated report there is no way to see salaries, sectors or employers for the same group. The detailed tables on this page come from a separate university survey.` },
  ],
  related: ['school:hku', 'school:cuhk', 'school:nus', 'best-mba-asia', 'best-mba-one-year', 'mba-cost'],
});
