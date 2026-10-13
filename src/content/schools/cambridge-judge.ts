import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'cambridge-judge';
const s = K.s(slug);
const o = K.roi(slug);
const rAll = K.rank(slug, 'all'), rAsia = K.rank(slug, 'z-asia');
const eu = K.schools.filter((x) => ['UK', 'Europe'].includes(x.region) && K.shareRaw(x.slug, 'z-asia') !== null).sort((a, b) => K.shareRaw(b.slug, 'z-asia')! - K.shareRaw(a.slug, 'z-asia')!);
const asiaFirst = eu[0]?.slug === slug;
const sal = s.emp.salary;
const coh = s.emp.cohort.replace(/\s*\(.*\)\s*/, '').toLowerCase();
const strat = s.emp.functions.find((f) => /Strategy/i.test(f.label));
const fit = (() => { let best: number | null = null; for (let v = 30000; v <= 150000; v += 5000) { const pb = K.roi(slug, 'all', v)?.payback; if (pb !== null && pb !== undefined && pb <= 6) best = v; } return best; })();

export default defineSchool({
  slug,
  title: 'Cambridge Judge MBA 2026: One-Year Cost, Salary, Payback',
  description: `Cambridge Judge MBA 2026: ${K.tuition(slug)} tuition, ${K.living(slug)} of living costs for the year, a ${K.salary(slug)} ${K.salaryKind(slug)} and the ${K.share(slug, 'z-asia')} of graduates who took jobs in Asia.`,
  intro: `One year in Cambridge for ${K.direct(slug)}, and a class whose average starting pay, converted at market rates, barely clears our reference salary.`,
  resume: `The Cambridge Judge MBA costs ${K.tuition(slug)} in tuition for the ${s.tuition?.cohort ?? 'next intake'}, the same for British and overseas students, and the school's budget for the year adds ${K.living(slug)}, for ${K.direct(slug)} before the salary you give up. ${o ? `For a person earning ${K.ref()} today, the ${s.months} months away add ${K.usd(o.forgone)}, for a total of ${K.usd(o.total)}.` : ''} The report on the ${coh} gives an ${K.salaryKind(slug)} of ${K.salary(slug)}, with no median, which is about ${K.salaryUsd(slug)} at the ECB rate. ${o ? `Against the reference salary that repays the total ${K.payback(slug) ?? 'only after thirty years'} after graduation, and the ten-year net present value is ${K.npv(slug)}${rAll ? `, placing Cambridge number ${rAll.rank} of ${rAll.of} in our overall ranking` : ''}.` : ''} Most of that result comes from converting pounds into dollars, as the first section below explains. What stands out in the report is where graduates went: ${K.share(slug, 'z-uk')} stayed in the United Kingdom and ${K.share(slug, 'z-asia')} took jobs in Asia.`,
  body: (h) => `<h2>Why Cambridge lands low in a dollar model</h2>
<p>Our model compares the salary after the MBA with the salary before it, in US dollars. Cambridge pays its graduates in pounds, and ${sal ? `${K.money(sal.v, sal.cur)} converts to about ${K.salaryUsd(slug)}` : 'its average converts to a modest dollar figure'}, close to the ${K.ref()} we assume before the degree. The gain from the MBA is then small, and the ${K.usd(o?.forgone ?? 0)} of salary given up takes a long time to recover. The school's own report quotes a much higher dollar figure because it converts at purchasing power parity, which adjusts for prices in each country; that is a fair way to compare living standards, but it is not money you can spend on a loan in dollars.</p>
<p>The model fits better for someone who earns less before the degree, or who plans to stay in Britain and compares pounds with pounds. ${fit ? `On the same figures, the payback falls to six years or less for a pre-MBA salary of up to about ${K.usd(fit)}.` : ''} The figure is also an average, not a median, so a handful of high offers in finance can lift it above what a typical graduate earns.</p>
${h.miniPayback(slug)}
<h2>A British MBA with an Asian pipeline</h2>
<p>${K.share(slug, 'z-asia')} of the class took jobs in Asia${asiaFirst ? `, the highest share of any European or British school in our data` : ''}${rAsia ? `, and number ${rAsia.rank} of ${rAsia.of} in our ${h.a('best-mba-asia', 'Asia ranking')}` : ''}. Another ${K.share(slug, 'z-us') ?? 'small share'} went to the United States. Graduates took jobs in many countries, and the report notes that a large part of those who changed country after the MBA went to Britain, while others went back to the country they came from. The employer list mixes strategy firms, a pharmaceutical group, a social media company and private equity, with no hire counts.</p>
${h.miniGoal(slug)}
<h2>Strategy jobs inside companies</h2>
<p>The function split adds detail. ${strat?.pct != null ? `${K.p(strat.pct)} of graduates went into corporate planning and strategy roles` : 'Corporate strategy roles lead the split'}, ahead of external consulting at ${K.share(slug, 'f-consulting') ?? 'a smaller share'}, and product management took ${K.share(slug, 'f-product') ?? 'a share'}. By sector, technology at ${K.share(slug, 'tech')} and finance at ${K.share(slug, 'finance')} edge out consulting at ${K.share(slug, 'consulting')}. The class of ${s.classSize !== null ? K.num(s.classSize) : 'about two hundred'} comes from ${s.profile.countries !== null ? K.num(s.profile.countries) : 'many'} nationalities with an average of ${s.profile.exp !== null ? K.num(s.profile.exp) : 'several'} years of experience. The ${h.a('compare-oxford-vs-cambridge', 'Oxford and Cambridge comparison')} sets both reports side by side.</p>`,
  faqs: [
    { q: 'How much does the Cambridge Judge MBA cost in total?', a: `Tuition is ${K.tuition(slug)} for the ${s.tuition?.cohort ?? 'next intake'} and the school's budget for the year is ${K.living(slug)}, for ${K.direct(slug)}. ${o ? `With the salary given up by a person earning ${K.ref()}, the total reaches ${K.usd(o.total)}.` : ''} Set-up costs such as a laptop or a bike, travel and utilities are extra, according to the school.` },
    { q: 'What do Cambridge Judge MBA graduates earn?', a: `The ${coh} report gives an ${K.salaryKind(slug)} of ${K.salary(slug)}, about ${K.salaryUsd(slug)} at the ECB rate; no median is published, and no salary by sector or region. ${s.emp.employed !== null ? `${K.p(s.emp.employed)} were ${s.emp.employedLabel}.` : ''} The report's dollar figure is higher because it uses purchasing power parity rather than the exchange rate.` },
    { q: 'Why does the Cambridge Judge MBA take so long to pay back here?', a: `${o ? `For a person earning ${K.ref()} before the MBA, the ${K.usd(o.total)} total is repaid ${K.payback(slug) ?? 'only after thirty years'} after graduation, because the average salary after the degree converts to ${K.salaryUsd(slug)}, close to the starting salary.` : 'The school publishes no figure that would let us compute it.'} Someone earning less before the MBA sees a much shorter payback in the calculator; convert a British salary to dollars before typing it.` },
    { q: 'Do Cambridge Judge MBA graduates find jobs in Asia?', a: `Yes, ${K.share(slug, 'z-asia')} of the ${coh} took jobs in Asia, against ${K.share(slug, 'z-uk')} in the United Kingdom and ${K.share(slug, 'z-us') ?? 'a small share'} in the United States${asiaFirst ? '. No other European or British school in our data sends a larger share to Asia' : ''}. The school publishes no salary for any region.` },
  ],
  related: ['school:oxford-said', 'school:lbs', 'compare-oxford-vs-cambridge', 'best-mba-one-year', 'best-mba-asia', 'best-mba-europe'],
});
