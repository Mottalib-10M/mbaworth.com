/** Home page text. Every figure is read with the kit (RECETTE §17.4 point 7). */
import { KIT as K } from '../lib/kit';
import type { Helpers, FAQ } from '../lib/page-types';

const S = K.schools;
const newer = S.filter((s) => s.adm?.newer).length;
const under10 = S.filter((s) => s.adm && s.adm.rate < 0.1).length;
const blind = S.filter((s) => s.testStatus === 'blind').length;
const pub = S.filter((s) => s.control === 'public');
const priv = S.filter((s) => s.control === 'private');
const med = (xs: number[]) => { const v = [...xs].sort((a, b) => a - b); return v[Math.floor(v.length / 2)]; };
const nn = (xs: Array<number | null>) => xs.filter((x): x is number => typeof x === 'number');
const privLow = med(nn(priv.map((s) => s.netByIncome[0])));
const pubLow = med(nn(pub.map((s) => s.netByIncome[0])));
const privHigh = med(nn(priv.map((s) => s.netByIncome[4])));
const pubHigh = med(nn(pub.map((s) => s.netByIncome[4])));
const privCoa = med(nn(priv.map((s) => s.coa)));
const cheapLow = [...S].filter((s) => s.netByIncome[0] !== null).sort((a, b) => a.netByIncome[0]! - b.netByIncome[0]!).slice(0, 3);
const h = K.s('harvard');
const ucla = K.s('ucla');
const a30 = K.actToSat(30)!;
const lowest = [...S].filter((s) => s.adm).sort((a, b) => a.adm!.rate - b.adm!.rate)[0];

export const HOME = {
  title: 'College Acceptance Rates 2026: Odds and Net Price by Income',
  description: `Acceptance rate, SAT and ACT range and 2026 net price by family income for ${S.length} US universities. Enter your score and income: no account, no e-mail asked.`,
  h1: 'College acceptance rates and the price families really pay',
  intro: `Pick a university, enter a score and your family income: the admit rate of its newest cycle, where you stand in its score range and what families like yours paid appear at once.`,
  resume: `An acceptance rate only means something with its year and the price only means something with your income, so this site shows both, school by school. For ${S.length} universities the calculator above gives the admit rate of the newest cycle on file, read in the school's own Common Data Set or class profile for ${newer} of them and in the federal fall 2024 data for the rest, with the entering class named each time. It places your SAT or ACT score inside the middle 50% of enrolled students, applies one published rule to label the school a reach, a target or a likely, and reads the net price that families on federal aid actually paid in your income band in ${K.meta.years.net}, from the College Scorecard. At private universities the median of those net prices for incomes under $30,000 was ${K.usd(privLow)}, against ${K.usd(privHigh)} above $110,000. No account, no e-mail and no phone number stand between you and the figures.`,
  tableTitle: `${S.length} universities: admit rate, SAT range and price`,
  tableIntro: (x: Helpers) => `<p>The table gives the four figures families ask about first, for every university on the site. ${under10} of them admit fewer than one applicant in ten; the lowest rate on file is ${x.rate(lowest.slug)} at ${x.c(lowest.slug, lowest.name)}. ${blind} universities are test-free and show no SAT range. The net price column uses the middle income band, $48,001 to $75,000; the ${x.a('net-price-calculator', 'net price page')} ranks all of them for your own income. Each name opens the university's page, with its full cost of attendance, its admissions by cycle and a calculator locked on that school.</p>`,
  foldTitle: 'How to read acceptance rates, test ranges and prices',
  sections: (x: Helpers) => [
    {
      title: 'Why an admit rate needs its year',
      html: `<p>The most repeated error about admissions is a rate without its entering class. A university's rate moves every year with the size of its applicant pool, and articles rarely say which year they quote. At Harvard the federal figure for fall 2024 is ${x.pct(h.admRate!, 2)}, while its Common Data Set gives ${x.rate('harvard')} for fall 2025: both are correct, for different classes. This site therefore names the class every time. When a university has published its Common Data Set 2025-2026 or an official fall 2025 profile, that cycle is used and linked; otherwise the page shows the fall 2024 rate from IPEDS, the federal survey every college answers, and says so.</p><p>Rates also mix very different groups. Early rounds usually admit a larger share than regular decision, public universities admit residents and nonresidents at different rates, and engineering or nursing can admit at a fraction of the school-wide figure. The overall rate is the right starting point for a list, not the final word on one application.</p>`,
    },
    {
      title: 'What the SAT and ACT ranges tell you, and what they hide',
      html: `<p>Universities report the 25th and 75th percentiles of the scores sent by enrolled first-years. A quarter of the class scored below the lower figure. Being inside the range does not mean an even chance: at a school admitting one applicant in twenty, most students inside the range are still turned down, because the range describes the admitted class, not the applicants. At test-optional schools the range is also flattered, since students with lower scores often do not send them.</p>${x.miniSatNational()}<p>Nationally, the College Board reports a mean SAT of ${x.num(x.P.sat.meanTotal)} for the ${x.num(x.P.sat.takers)} students of the class of ${x.P.sat.classOf}, with half scoring below ${x.num(x.P.sat.p50)}. The ${x.a('what-is-a-good-sat-score', 'SAT score page')} places any total against those figures and against the ${S.length} universities, and the ${x.a('act-to-sat-conversion', 'ACT to SAT conversion')} uses the official concordance: an ACT of 30 corresponds to an SAT of ${x.num(a30.point)}.</p>`,
    },
    {
      title: 'Why the net price by income changes everything',
      html: `<p>The sticker price and the net price are two different numbers. The sticker price is the cost of attendance a university publishes: tuition, fees, housing, food, books and personal costs. The net price is what is left after grants and scholarships. At private universities with large endowments the gap is enormous for low and middle incomes: the median private sticker price in ${x.meta.years.coa} was ${x.usd(privCoa)}, yet the median net price for families earning under $30,000 was ${x.usd(privLow)}. The universities with the lowest average net price for that band on this site are ${x.listOf(cheapLow.map((s) => x.c(s.slug, s.name)))}.</p><p>Public universities work differently. Their sticker price for residents is lower, but their grants are thinner, so the net price varies less with income: the public median was ${x.usd(pubLow)} under $30,000 and ${x.usd(pubHigh)} above $110,000. For a nonresident the picture turns around, because out-of-state tuition can triple the bill. That is why a family earning $70,000 can find a private university cheaper than its own flagship campus, and a family earning $250,000 usually cannot.</p><p>These figures come from the College Scorecard, which reads what each university reports to the Department of Education for first-time students receiving federal aid. They are averages, not quotes: your own price depends on assets, siblings in college and each school's formula, which the university's own net price calculator applies.</p>`,
    },
    {
      title: 'Reach, target, likely: the rule we use',
      html: `<p>The calculator does not invent a percentage chance. It applies one fixed rule to the published figures. Any university admitting under ${x.num(x.rule.reachBelow * 100)}% of applicants is a reach for everyone. Otherwise a score below the 25th percentile makes it a reach, and a score at or above the median at a school admitting at least ${x.num(x.rule.likelyAbove * 100)}% makes it likely; the rest are targets. A balanced list usually holds a few of each, with at least two likely schools whose net price the family can pay. The ${x.a('acceptance-rates', 'acceptance rates table')} applies this rule to your score across all ${S.length} universities at once.</p>`,
    },
    {
      title: 'Public universities: residency is half the price',
      html: `<p>At a public university the first question is not the income but the state. In-state students pay a subsidized tuition; out-of-state students pay a rate that often sits near private prices. At ${x.c('ucla', 'UCLA')} tuition and fees were ${x.usd(ucla.tuitionIn!)} for Californians and ${x.usd(ucla.tuitionOut!)} for nonresidents in ${x.meta.years.tuition}. The federal net price covers residents only, so the calculator adds the published tuition gap when you answer "no" to the residency question. Some states and campuses give nonresident scholarships that reduce that gap; the ${x.a('college-tuition', 'tuition page')} lists the gap for every public university on the site.</p>`,
    },
    {
      title: 'Comparing two or three offers',
      html: `<p>Once the admission letters arrive, the comparison is between net prices, not stickers. The ${x.a('compare-colleges', 'comparison tool')} puts two or three universities side by side for your income and score: net price, sticker price, admit rate, score position, graduation rate, median earnings ten years after entry and median federal debt at graduation. A school that costs ${x.usd(5000)} more a year but graduates far more of its students on time can end up cheaper, since a fifth or sixth year is paid in full. The ${x.a('cost-of-attendance', 'cost of attendance page')} splits each budget into its lines, so you can see what housing and personal costs add to tuition.</p>`,
    },
  ],
  faqs: [
    { q: 'Which US universities have the lowest acceptance rates?', a: `Among the ${S.length} universities on this site, ${under10} admitted fewer than one applicant in ten in their newest cycle. The lowest on file is ${lowest.name} at ${K.rate(lowest.slug)} (${lowest.adm!.label}). Most of the others under 10% are Ivy League universities, Stanford, MIT, Caltech and a few small liberal arts colleges.` },
    { q: 'What is the difference between sticker price and net price?', a: `The sticker price is the full cost of attendance a college publishes for a year: tuition, fees, housing, food, books and personal costs. The net price is what remains after grants and scholarships, before any loan. At private universities on this site the median net price for families under $30,000 was ${K.usd(privLow)} in ${K.meta.years.net}.` },
    { q: 'Can I see my chances without creating an account?', a: 'Yes. Nothing on this site asks for an account, an e-mail address or a phone number. The calculator runs in your browser: you pick a university, type a score and a family income, and it shows the published admit rate, where your score falls among enrolled students and the label given by the site’s fixed rule.' },
    { q: 'Do test-optional schools still look at SAT scores?', a: 'They look at scores that students choose to send, and the published ranges come only from those students, which tends to raise them. Test-free campuses, such as the University of California and the California State University, do not look at scores at all. A growing number of selective schools, Harvard, MIT and Dartmouth among them, require a score again.' },
    { q: 'Why do sites give different acceptance rates for the same college?', a: 'Mostly because they quote different entering classes without saying so, or round the figure. A rate computed from the Common Data Set counts of fall 2025 differs from the federal fall 2024 figure and from a newspaper estimate made in March. This site gives the counts, the class and the document for every rate it shows.' },
    { q: 'How accurate is the net price for my family?', a: `It is the average paid in ${K.meta.years.net} by first-year students on federal aid in your income band, so families with high savings, several children in college or unusual income can be far from it. Every university must post a net price calculator by federal law; ours links to it from each university page for an individual estimate.` },
  ] as FAQ[],
  sources: ['scorecard', 'scorecard_doc', 'ipeds_netprice', 'cds', 'sat_report', 'act_class2025', 'concordance', 'npc_center'],
};
