/** Home page text. Every figure comes from the kit (school files, params), never typed by hand. */
import type { Helpers, FAQ } from '../lib/page-types';
import { KIT as K } from '../lib/kit';

const n = K.schools.length;
const ranked = K.withRoi().length;
const w = K.roi('wharton')!;
const ins = K.roi('insead')!;
const topC = K.top('consulting', 3);
const topF = K.top('finance', 3);
const fee = (slug: string) => { const c = K.c(slug); return c.tuition === null ? null : c.tuition + c.fees; };
const byFee = K.schools.filter((s) => fee(s.slug) !== null).sort((a, b) => fee(a.slug)! - fee(b.slug)!);
const cheap = byFee[0], dear = byFee[byFee.length - 1];

export const HOME = {
  title: 'MBA ROI Calculator 2026: Cost, Payback and Best School',
  description: `MBA ROI 2026 for ${n} schools: total cost with the salary you give up, payback, ten-year value and the best school for consulting, finance, tech or a region.`,
  h1: 'What an MBA really costs, and when it pays you back',
  intro: `Tuition, living costs and the salary you give up, against what the last class earned: ${n} schools, each figure read in the school’s own documents.`,
  resume: `An MBA costs far more than its tuition, because the largest line is usually the salary you stop earning. At Wharton, tuition and fees for two years come to ${K.money(w.direct - K.c('wharton').living!, 'USD')} and the school's living budget adds ${K.living('wharton')}; for someone earning ${K.ref()} today, the 21 months away add ${K.usd(w.forgone)}, for a total cost of ${K.usd(w.total)} once the summer internship is counted. With the ${K.salary('wharton')} median base salary of the class of 2025, that is repaid ${K.yrs(w.payback!)} after graduation. A ten-month program such as INSEAD's costs ${K.usd(ins.total)} for the same person, because the salary given up is smaller, but its median salary is lower too. The calculator above does this for any of the ${n} schools with your own salary, your scholarship and the industry you aim for; ${ranked} of them publish enough to be ranked.`,
  tableTitle: 'Every school, for the same person',
  tableIntro: (h: Helpers) => `<p>The table below runs the same calculation for each school for a person earning ${K.ref()} before the MBA. Total cost includes the salary given up for the length of the program; payback counts the years after graduation until the extra salary has repaid it. Schools that publish no living budget or no graduate salary show "n/a": their page gives what they do publish. To rank schools for an industry or a region rather than for the class as a whole, use the ${h.a('mba-finder', 'school finder')}; to put two or three schools side by side, the ${h.a('compare-mba', 'comparison tool')}.</p>`,
  foldTitle: 'How to read these numbers',
  sections: (h: Helpers) => [
    {
      title: 'The salary you give up is the largest cost',
      html: `<p>Most cost pages stop at tuition. Yet for a two-year program the salary you do not earn is often as large as the fees: at ${h.sc('wharton')}, ${K.usd(w.forgone)} of the ${K.usd(w.total)} total for a person earning ${K.ref()}. The higher your salary today, the more the MBA costs you, and the longer it takes to repay, because the gain is the difference between what you will earn after and what you would have earned anyway. That is why the same school can pay back in four years for one applicant and never for another.</p><p>The calculator counts the salary given up as your current salary times the length of the program, minus what a two-year student earns during the summer internship. It then grows both paths, with and without the MBA, at rates shown under the result, which you can read on the ${h.a('method', 'method page')}.</p>`,
    },
    {
      title: 'One year or two',
      html: `<p>One-year programs in Europe and Asia cut the salary given up roughly in half. INSEAD lasts ${K.months('insead')} months, ${h.sc('wharton')} ${K.months('wharton')}. The trade-off shows in the reports: two-year American schools publish higher median salaries, and their summer internship is the main door into investment banking and many consulting offices. A one-year program suits someone who already knows the industry they want; a two-year program gives a second chance to switch. The ${h.a('best-mba-one-year', 'one-year ranking')} compares the short programs among themselves, on the same reference person.</p>`,
    },
    {
      title: 'Median, average, base or total: read the label',
      html: `<p>Schools that follow the MBA CSEA standards publish a median base salary of graduates who accepted a full-time job, without the signing bonus. Others publish an average, which a few very high offers pull up, and some an average of total pay including bonuses. The site never converts one into another: each figure carries its label, and our ranking treats them as published. London Business School, for example, gives an ${K.salaryKind('lbs')} of ${K.salary('lbs')}, not a median. A guide explains ${h.a('mba-employment-report', 'how to read an employment report')}, including the response rate and who is left out.</p>`,
    },
    {
      title: 'Which school for which industry',
      html: `<p>A school's average salary says little about your own path. What matters is how much of the class goes where you want to go, and what that segment pays. On our numbers, the best fit for consulting is ${K.listOf(topC.map((x) => h.sc(x.slug)))}, each placing a large share of the class at ${K.usd(topC[0].salary!)} or so; for finance, ${K.listOf(topF.map((x) => h.sc(x.slug)))}. The pages ${h.a('best-mba-consulting', 'best MBA for consulting')}, ${h.a('best-mba-investment-banking', 'for investment banking')}, ${h.a('best-mba-private-equity', 'for private equity')} and ${h.a('best-mba-tech', 'for tech')} give the full ranking, with the share, the number of graduates it means and the payback of each school.</p><p>The rubrics on ${h.a('consulting', 'consulting')}, ${h.a('finance', 'finance')} and ${h.a('tech', 'tech')} explain what the jobs are, how pay is set and how recruiting works, with their own calculators.</p>`,
    },
    {
      title: 'Which school for which region',
      html: `<p>Where you want to live after the MBA narrows the list more than any ranking. American schools place more than nine graduates in ten in the United States; INSEAD sends ${K.share('insead', 'z-europe')} of its class to European jobs and ${K.share('insead', 'z-asia')} to Asia; ${h.sc('lbs')} places ${K.share('lbs', 'z-uk')} in the United Kingdom. Few schools publish a salary by region, so our regional rankings rest on the share of the class placed there: see ${h.a('best-mba-europe', 'working in Europe')}, ${h.a('best-mba-asia', 'in Asia')} and ${h.a('best-mba-middle-east', 'in the Middle East')}.</p>`,
    },
    {
      title: 'When an MBA does not pay back',
      html: `<p>Raise the salary in the calculator and watch the payback stretch. At some point the salary after the MBA no longer beats the salary you would have kept, raises included, and the result reads "over 30 years". This happens most with high earners going to schools whose graduates earn about what they earn already, and with applicants from countries where pay is lower than at the school's main market. A scholarship, a sponsored seat or an executive format, where you keep your salary, changes the picture: the ${h.a('executive-mba', 'executive MBA page')} computes that case.</p>`,
    },
    {
      title: 'Why we do not reuse the published rankings',
      html: `<p>The Financial Times, QS, US News and Bloomberg each rank schools on their own surveys and weights, and their tables belong to them. A school page here may quote one rank as a fact, with its link. Every ordering on this site is ours: computed from each school's own employment report and fees, with the formula of the ${h.a('method', 'method page')}, and recomputed on your salary. The page on ${h.a('mba-rankings', 'MBA rankings')} explains what each publisher measures, so that you can read their rank next to ours.</p>`,
    },
  ],
  faqs: [
    { q: 'How much does an MBA cost in total?', a: `For a full-time program, tuition and fees for the whole program run from ${K.usd(fee(cheap.slug)!)} at ${cheap.short} to ${K.usd(fee(dear.slug)!)} at ${dear.short} among the ${byFee.length} schools on this site. Add the living budget and, above all, the salary you give up: for a person earning ${K.ref()}, the total reaches ${K.usd(w.total)} at Wharton. The calculator gives the figure for your own salary.` },
    { q: 'Is an MBA worth it financially?', a: `It depends on your salary today and the path you aim for. For a person earning ${K.ref()}, the Wharton MBA is repaid ${K.yrs(w.payback!)} after graduation and leaves a ten-year net present value of ${K.usd(w.npv)}. Someone earning far more, or heading to a lower-paid sector, can see the payback pass ten years. Type your own figures above.` },
    { q: 'Which MBA has the best return on investment?', a: `On the whole class and for a person earning ${K.ref()}, ${K.top('all', 1)[0].short} comes first in our ranking, which combines the share of graduates hired, the salary reported and the ten-year value. The answer changes with the goal: the best school for consulting or for Asia is not the same, and the finder recomputes it for your salary.` },
    { q: 'Do you use the Financial Times ranking?', a: 'No. Our rankings are calculated from each school’s own employment report and fees, with a published formula. A school page may quote a rank from the Financial Times or another publisher as a fact with its link, but no table, column or sort is taken from them, and no third-party rank enters our calculation.' },
    { q: 'Why do some schools show no payback?', a: 'Because they do not publish what the model needs. Some keep their employment report behind a sign-up form, others give no living budget for students. Their page still shows the tuition and what they do publish, and says what is missing. We never fill a gap with a figure taken from a forum or a third-party website.' },
    { q: 'Are the salaries before or after tax?', a: 'Before tax, as the schools publish them. The model compares gross salaries with and without the MBA, so a tax rate would shrink both the gain and the cost of the salary given up. It changes the size of the result more than the order of the schools, which is why the default is gross and the method page says so.' },
    { q: 'How often are the figures updated?', a: `Schools publish new fees and employment reports between September and December. Every school file was read in October 2026, and each page shows the class, the intake and the day of reading. Exchange rates are the European Central Bank rates of ${K.day(K.FX_DATE)}.` },
  ] as FAQ[],
  sources: ['ecb_fx', 'ukvi_money', 'bls_oews', 'mbacsea', 'gmac'],
};
