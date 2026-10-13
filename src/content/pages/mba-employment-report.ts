import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const S = K.schools;
const csea = S.filter((s) => /MBA CSEA/.test(s.emp.standard)).length;
const kinds = (k: string) => S.filter((s) => s.emp.salary?.kind === k).length;
const noSal = S.filter((s) => s.emp.salary === null).length;
const gated = S.filter((s) => s.emp.salaryMissing && /gated|lead form|request form|behind/i.test(s.emp.salaryMissing)).map((s) => s.short);
const ftOnly = S.filter((s) => s.emp.salaryMissing && /\bFT\b/.test(s.emp.salaryMissing)).map((s) => s.short);
const w = K.s('wharton');
const wb = w.emp.bonus!;
const iv = K.s('ivey');
const ivMean = iv.emp.salary?.note.match(/mean CAD ([\d,]+)/)?.[1] ?? null;
const ivShare = iv.emp.salary?.note.match(/of the (\d+)% of acceptances/)?.[1] ?? null;
const insShare = K.s('insead').emp.salary?.note.match(/(\d+)% of the class reported/)?.[1] ?? null;
const resp = S.filter((s) => s.emp.response !== null).sort((a, b) => b.emp.response! - a.emp.response!);
const lowResp = resp[resp.length - 1];
const lab = (l: string) => S.filter((s) => s.emp.employedLabel === l).length;

export default definePage({
  id: 'mba-employment-report',
  group: 'guides',
  order: 4,
  slug: 'how-to-read-an-mba-employment-report',
  nav: 'Reading an employment report',
  card: 'Median or mean, base or total pay, response rate, who is left out and shares of what: the questions to ask of any MBA employment report.',
  title: 'MBA Employment Report 2026: Reading Salary, Shares and Gaps',
  description: `MBA employment reports in 2026: median or mean, base versus total pay, response rates, who is excluded, offers versus acceptances: examples from ${S.length} schools.`,
  h1: 'How to read an MBA employment report',
  intro: `Of the ${S.length} schools we read, ${kinds('base-median')} publish a median base salary, ${kinds('base-mean')} an average base, ${kinds('total-mean')} an average of total pay and ${noSal} no usable salary at all.`,
  resume: `An MBA employment report describes one past class: who looked for a job, who found one within three months, in which industry and region, and at what pay. The figures are only comparable if you check five things. First, the statistic: of the ${S.length} schools on this site, ${kinds('base-median')} publish a median base salary, ${kinds('base-mean')} an average base salary and ${kinds('total-mean')} an average of total pay, and an average sits above the median of the same class. Second, base or total: the headline is usually base salary, with the signing bonus apart (Wharton's median bonus is ${K.money(wb.v, 'USD')}, for the ${K.p(wb.pct!)} who received one). Third, who answered, since salary figures cover only graduates who reported pay. Fourth, who is left out: sponsored students and founders are usually outside the salary figure. Fifth, shares of what: most reports give percentages of graduates who accepted a job, not of the whole class. ${noSal} schools publish no starting salary on their open pages, some behind a form.`,
  faqs: [
    { q: 'What is the difference between median and mean salary in an MBA employment report?', a: `The median is the salary of the graduate in the middle; the mean is the total divided by the number of graduates, so a few large offers pull it up. ${ivMean ? `Ivey reports both for the same class: a median of ${K.salary('ivey')} and a mean of CAD ${ivMean}.` : 'A school that publishes only a mean looks better paid than one that publishes a median.'} LBS and Oxford publish means only, so never compare them directly with a median.` },
    { q: 'Does the salary in an MBA employment report include the signing bonus?', a: `Usually not. Under the MBA CSEA standards the headline is base salary, and the signing bonus is reported apart with the share of graduates who received one: Wharton's median signing bonus is ${K.money(wb.v, 'USD')}, paid to ${K.p(wb.pct!)} of graduates reporting a salary. A few schools, such as IMD, publish an average of total pay instead, which is a different figure.` },
    { q: 'Why does the response rate matter in an MBA employment report?', a: `Because salary statistics cover only graduates who reported pay, and those who did well are more likely to answer. MIT reports a response rate of ${K.p(K.s('mit-sloan').emp.response!)}; ${lowResp.short} ${K.p(lowResp.emp.response!)}. ${insShare ? `INSEAD says ${insShare}% of its class reported full salary information.` : ''} The lower that share, the less the median describes the whole class.` },
    { q: 'Who is excluded from the salary figures of an MBA employment report?', a: 'Sponsored students who return to their employer, graduates who start a company, those continuing their studies and those not seeking a job are usually outside the salary statistics, and often outside the employment rate as well. LBS states that its salary excludes sponsored and self-employed graduates. A school with many sponsored students therefore reports on a smaller group than its class size suggests.' },
    { q: 'What does an MBA employment report mean by the share placed in an industry?', a: `Most reports give the industry share as a percentage of graduates who accepted a job, not of the whole class. ${lab('accepted an offer within three months')} of the schools we read describe employment as accepted offers within three months, ${lab('had an offer within three months')} as offers received and ${lab('employed within three months')} as employment. An offer received counts graduates who may have turned it down.` },
  ],
  body: (h) => `<h2>The standard most reports follow</h2>
<p>American business schools agreed long ago on a common way to report the outcomes of their full-time MBA classes, now maintained by MBA CSEA, the association of MBA career services and employers. The standards define who counts as seeking a job, when the count is taken (at graduation and three months after), which salary is reported (base salary, with signing and other bonuses apart) and which graduates are left out. Of the ${S.length} schools we read, ${csea} say they follow these standards; the others use their own rules, which may be close or quite different. The first page of a report, or its footnotes, usually says which applies. When it does not, read the definitions before the numbers.</p>
<h2>Median, mean, and the quartiles that tell you more</h2>
<p>The median is the salary of the graduate in the middle of the list. The mean adds all salaries and divides by the number of people, so a few very large offers pull it up. ${ivMean ? `Ivey publishes both for the same class: the median is ${K.salary('ivey')}, the mean CAD ${ivMean}. ` : ''}London Business School publishes means only, ${K.salary('lbs')} for the class of 2025, as does Oxford, ${K.salary('oxford-said')}. On this site every salary carries its statistic, and the rankings never mix the two silently. The more useful figures are the quartiles, when a school gives them: Wharton's middle half of salaries runs from ${K.money(w.emp.salary!.p25!, 'USD')} to ${K.money(w.emp.salary!.p75!, 'USD')} around its ${K.salary('wharton')} median, a narrow band that says most of the class lands on similar offers.</p>
<h2>Base salary, signing bonus and the pay nobody reports</h2>
<p>The headline salary is base pay. The signing bonus is reported apart, usually as a median among those who received one, together with that share: at Wharton, ${K.money(wb.v, 'USD')} for ${K.p(wb.pct!)} of graduates. A few schools publish a total: IMD gives an average of total pay, ${K.salary('imd')}, and HEC Paris an average salary package, ${K.salary('hec-paris')}. What no report can include is pay decided after graduation: year-end bonuses in banking, carried interest in private equity, stock grants that vest over years in tech. Our calculators add the signing bonus in the first year, weighted by the share who received it, and nothing else. Try a bonus of your own below.</p>
${h.mini('bonus')}
<h2>Who answered, and who was left out</h2>
<p>A salary statistic covers only graduates who reported a salary, and that group is never the whole class. Some schools publish the response rate: MIT ${K.p(K.s('mit-sloan').emp.response!)}, Booth ${K.p(K.s('chicago-booth').emp.response!)}, ${lowResp.short} ${K.p(lowResp.emp.response!)}.${insShare ? ` INSEAD states that ${insShare}% of its class reported full salary information.` : ''}${ivShare ? ` Ivey's salary covers the ${ivShare}% of graduates with an accepted offer who reported pay.` : ''} Graduates with good offers tend to answer, so a low response rate usually flatters the median.</p>
<p>Several groups are left out by design. Sponsored students, whose employer paid for the degree and who return to it, are not seeking a job and are excluded from the employment rate and the salary. So are graduates who start a company, those who continue their studies and those who say they are not looking. LBS writes that its salary figure excludes sponsored and self-employed graduates. A school with many sponsored students reports on a smaller group than its class size, and the share "employed within three months" is a share of that smaller group. Use the calculator below to see how a response rate changes what a median can tell you.</p>
${h.mini('response')}
<h2>Offers, acceptances and shares of what</h2>
<p>Three words that look alike measure different things. "Had an offer" counts graduates who received at least one offer, including those who turned it down; "accepted an offer" counts those who said yes; "employed" may count those who have started. Of the ${S.length} schools we read, ${lab('accepted an offer within three months')} report accepted offers within three months, ${lab('had an offer within three months')} report offers received, among them INSEAD and Oxford, and ${lab('employed within three months')} report employment. The first figure is always the highest of the three for the same class.</p>
<p>Industry and region shares raise the same question. Most reports give them as percentages of graduates who accepted a job, not of the class. A school that says 40% of graduates went to consulting may mean 40% of the 85% who found a job, about a third of the whole class. The finder on this site shows the share as the school publishes it and an estimate of the number of graduates, which is easier to compare between a class of 900 and a class of 100.</p>
<h2>When the report is gated, missing or borrowed</h2>
<p>Not every school publishes a report anyone can read. ${gated.length ? `${K.listOf(gated)} keep their full report behind a request or download form, and we did not use figures we could not read openly. ` : ''}${ftOnly.length ? `${K.listOf(ftOnly)} show, on their open pages, figures taken from the Financial Times ranking, which describe alumni some years out rather than starting salaries, so we do not use them as a graduation salary. ` : ''}HEC Paris hosts its report as an online flipbook. In total, ${noSal} of the ${S.length} schools have no starting salary we could use, which is why they appear on this site with their fees and shares but without a payback. The ${h.a('method', 'method page')} lists every rule we apply, and the ${h.a('mba-salary', 'salary table')} shows each school's figure with its statistic.</p>`,
  tool: 'salary',
  toolArgs: { goal: 'all' },
  related: ['mba-salary', 'method', 'mba-rankings', 'mba-finder', 'school:lbs', 'school:wharton'],
  sources: ['mbacsea', 'gmac', 'ecb_fx'],
  schoolSources: ['wharton', 'lbs', 'oxford-said', 'ivey', 'insead', 'mit-sloan', 'imd', 'hec-paris'],
});
