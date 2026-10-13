import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'duke-fuqua';
const s = K.s(slug);
const o = K.roi(slug);
const rCons = K.rank(slug, 'consulting'), rHc = K.rank(slug, 'healthcare'), rLa = K.rank(slug, 'z-latam');
const fn = (re: RegExp) => s.emp.functions.find((f) => re.test(f.label) && f.salary !== null);
const ibF = fn(/^Investment Banking/), peF = fn(/Private Equity/), gm = fn(/General Management/), wm = fn(/Wealth/);
const usLiv = K.schools.filter((x) => x.country === 'US' && K.c(x.slug).living !== null).sort((a, b) => K.c(a.slug).living! - K.c(b.slug).living!);
const livPos = usLiv.findIndex((x) => x.slug === slug) + 1;
const usLa = K.schools.filter((x) => x.country === 'US' && K.shareRaw(x.slug, 'z-latam') !== null).sort((a, b) => K.shareRaw(b.slug, 'z-latam')! - K.shareRaw(a.slug, 'z-latam')!);
const laFirst = usLa[0]?.slug === slug;
const bonus = s.emp.bonus;
const consTop = s.emp.industries.filter((x) => x.salary !== null).every((x) => x.salary! <= (s.emp.industries.find((y) => y.key === 'consulting')?.salary ?? 0));
const pbAll = o?.payback ?? null, pbCons = K.roi(slug, 'consulting')?.payback ?? null;

export default defineSchool({
  slug,
  title: 'Duke Fuqua MBA 2026: Consulting Pay, Durham Costs, Payback',
  description: `Duke Fuqua MBA 2026: ${K.share(slug, 'consulting')} of graduates in consulting at ${K.segSalary(slug, 'consulting')}, ${K.direct(slug)} for two years in Durham, and a payback of ${K.payback(slug) ?? 'over thirty years'} on a ${K.ref()} pre-MBA salary.`,
  intro: `A consulting-first class, ${K.share(slug, 'consulting')} of graduates, with ${livPos ? `one of the ${livPos <= 3 ? 'lowest' : 'more modest'} living budgets among American schools` : 'a modest living budget'}.`,
  resume: `Two years at Duke's Fuqua School cost ${K.direct(slug)} in tuition, fees and the school's living budget, based on the first-year figures for the ${s.tuition?.cohort ?? 'next class'} counted twice; medical insurance is required but waivable and is left out. ${o ? `For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)}, for a total of ${K.usd(o.total)}.` : ''} The ${s.emp.cohort.toLowerCase()} reported a ${K.salaryKind(slug)} of ${K.salary(slug)}${bonus ? `, and ${bonus.pct !== null ? K.p(bonus.pct) : 'most'} received a signing bonus with a median of ${K.money(bonus.v, bonus.cur)}` : ''}. ${o ? `On those figures the degree is repaid ${K.payback(slug)} after graduation, with a ten-year net present value of ${K.npv(slug)}.` : ''} What sets Fuqua apart is a consulting pipeline${rCons ? ` that ranks number ${rCons.rank} of ${rCons.of} in our consulting list` : ''}, paired with a cost of living in Durham that is ${livPos ? `number ${livPos} from the lowest of the ${usLiv.length} American budgets in our data` : 'modest for a top program'}.`,
  body: (h) => `<h2>Consulting first, at the top median</h2>
<p>${K.share(slug, 'consulting')} of the ${s.emp.cohort.toLowerCase()} went into consulting at a median base of ${K.segSalary(slug, 'consulting') ?? 'an unpublished salary'}${consTop ? ', the highest of any industry in the report' : ''}. The employers the report names as hiring several graduates are led by strategy and advisory firms, and the function split confirms it: consulting is the largest function too. ${rCons ? `On share, salary and ten-year value, Fuqua is number ${rCons.rank} of ${rCons.of} in our ${h.a('best-mba-consulting', 'consulting ranking')}.` : ''} ${o ? `Aimed at consulting, the reference person repays the degree in ${K.payback(slug, 'consulting') ?? 'a similar time'}${pbAll !== null && pbCons !== null && pbCons < pbAll ? ', faster than on the school-wide median' : ''}.` : ''}</p>
<p>General management roles took ${gm?.pct != null ? K.p(gm.pct) : 'a sizeable share'}${gm ? ` at ${K.money(gm.salary!, gm.cur)}` : ''}, and healthcare, products and services together, took ${K.share(slug, 'healthcare')} of the class${rHc ? `, number ${rHc.rank} of ${rHc.of} in our healthcare list` : ''}.</p>
${h.miniGoal(slug)}
<h2>Finance by function, and why investing roles pay less here</h2>
<p>Fuqua reports finance by the job, not by the employer. ${ibF ? `Investment banking roles took ${K.p(ibF.pct!)} of the class at ${K.money(ibF.salary!, ibF.cur)}` : 'Investment banking roles take the largest finance group'}${peF ? `, while private equity, venture capital and similar investing roles took ${K.p(peF.pct!)} at a median of ${K.money(peF.salary!, peF.cur)}` : ''}${wm ? `; private wealth management took ${K.p(wm.pct!)} at ${K.money(wm.salary!, wm.cur)}` : ''}. The investing group mixes several kinds of firms, which pulls its median down; someone targeting buyouts specifically should not read it as a private equity salary. Corporate finance roles inside companies paid less than banking as well, and the calculator lets you test that lower salary against the cost of the two years.</p>
<h2>Where graduates went</h2>
<p>${K.share(slug, 'z-us')} of graduates who took a job stayed in the United States. ${K.share(slug, 'z-latam') ? `Latin America took ${K.share(slug, 'z-latam')}${laFirst ? ', the largest share of any American school in our data' : ''}${rLa ? `, which places Fuqua number ${rLa.rank} of ${rLa.of} in our Latin America ranking` : ''}. ` : ''}The report collects outcomes within four months of graduation and gives no salary by region, so the payback for someone heading home to Latin America cannot be computed from the school's figures. The ${h.a('compare-mba', 'comparison tool')} sets Fuqua next to ${h.sc('uva-darden')} or ${h.sc('unc-kenan-flagler')}, its neighbors in the Southeast.</p>
${h.miniPayback(slug)}`,
  faqs: [
    { q: 'How much does the Duke Fuqua MBA cost for two years?', a: `On the first-year figures counted twice, tuition is ${K.tuition(slug)}, fees ${K.fees(slug) ?? 'extra'} and the school's living budget ${K.living(slug)}, for ${K.direct(slug)}. Medical insurance is required unless you show other cover, and the first-year tuition includes a non-refundable deposit paid at admission. ${o ? `With the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)}.` : ''}` },
    { q: 'What do Duke Fuqua graduates earn in consulting?', a: `Consulting hires in the ${s.emp.cohort.toLowerCase()} reported a median base salary of ${K.segSalary(slug, 'consulting') ?? 'not published'}, against ${K.salary(slug)} for the whole class. ${bonus ? `${bonus.pct !== null ? K.p(bonus.pct) : 'Most'} of graduates received a signing bonus, with a median of ${K.money(bonus.v, bonus.cur)}.` : ''} Consulting was also the largest industry, ${K.share(slug, 'consulting')} of the class, and the largest job function.` },
    { q: 'How long does it take to repay a Duke Fuqua MBA?', a: `${o ? `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the school-wide median, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without. Aimed at consulting it falls to ${K.payback(slug, 'consulting') ?? 'a similar time'}; aimed at technology, where the median is lower, it is ${K.payback(slug, 'tech') ?? 'longer'}.` : 'The school publishes no figure that would let us compute it.'}` },
    { q: 'Is Duke Fuqua good for private equity?', a: `${peF ? `Private equity, venture capital and other investing roles took ${K.p(peF.pct!)} of the ${s.emp.cohort.toLowerCase()} at a median of ${K.money(peF.salary!, peF.cur)}` : 'Investing roles take a small share of the class'}${ibF ? `, below the ${K.money(ibF.salary!, ibF.cur)} of investment banking roles` : ''}. The school groups several kinds of investing firms together, so the figure is not a buyout salary; check the employers named in the report.` },
  ],
  related: ['school:uva-darden', 'school:unc-kenan-flagler', 'school:emory-goizueta', 'best-mba-consulting', 'consulting', 'compare-mba'],
});
