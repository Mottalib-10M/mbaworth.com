import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'skk-gsb';
const s = K.s(slug);
const c = K.c(slug);
const months = s.months ?? 18;
const goneRaw = (K.MODEL.refSalary * months) / 12;
const gone = K.usd(goneRaw);
const ratio = c.tuition ? Math.floor(goneRaw / c.tuition) : 0;
const tuitions = K.schools.map((x) => K.c(x.slug).tuition).filter((v): v is number => v !== null);
const cheaper = tuitions.filter((v) => c.tuition !== null && v < c.tuition).length;
const consShares = K.schools.map((x) => K.shareRaw(x.slug, 'consumer')).filter((v): v is number => v !== null);
const consTop = (K.shareRaw(slug, 'consumer') ?? 0) >= Math.max(...consShares);
const employed = s.emp.employed !== null ? `${K.p(s.emp.employed)} of graduates ${s.emp.employedLabel.startsWith('employed') ? 'were' : 'had'} ${s.emp.employedLabel}` : 'the school gives no employment rate';

export default defineSchool({
  slug,
  title: `SKK GSB MBA 2026: Seoul Tuition, Jobs and Missing Pay`,
  description: `SKK GSB MBA 2026 in Seoul: ${K.tuition(slug)} tuition (${K.tuitionUsd(slug)}) for ${months} months, ${K.share(slug, 'consumer')} of the class in consumer goods, and no living budget or graduate salary published.`,
  intro: `An English-language MBA in Seoul for ${K.tuitionUsd(slug)} of tuition, ${consTop ? 'whose graduates go into consumer goods more than at any other school on this site' : 'with a class weighted toward consumer goods'}.`,
  resume: `SKK GSB, the graduate business school of Sungkyunkwan University in Seoul, charges ${K.tuition(slug)} in tuition for its ${months}-month full-time MBA taught in English, about ${K.tuitionUsd(slug)} at the ECB rate, plus an entrance fee of ${K.fees(slug)}. That is the whole bill the school publishes. It gives no living budget for Seoul and no salary for its graduating class, so the total cost for a person earning ${K.ref()} today cannot be completed here, and there is no payback or ten-year value to show. What can be counted is the pay that person gives up: ${gone} over the ${months} months, more than ${K.num(ratio)} times the tuition. The figure that sets the school apart is where its class goes: ${K.share(slug, 'consumer')} of the class of 2025 went into consumer goods and retail${consTop ? ', the largest share in that industry of any school on this site' : ''}, and ${employed}.`,
  body: (h) => `<h2>A consumer-goods pipeline, on the figures it shows</h2>
<p>${consTop ? 'No school on this site reports a larger share of its class in consumer goods than SKK GSB.' : 'Few schools on this site report a larger share of the class in consumer goods than SKK GSB.'} ${K.share(slug, 'consumer')} of the class of 2025 went into consumer goods, retail and e-commerce, against ${K.share(slug, 'finance')} in financial services. Consulting comes second at ${K.share(slug, 'consulting')}, and manufacturing third at ${K.share(slug, 'manufacturing')}. For a candidate aiming at a brand, sales or strategy role with a Korean or global consumer group, that mix is the most useful signal the school gives. For banking it is a weak one: the finance share is small, and the school prints no salary by industry to say what those jobs pay.</p>
<p>The employment rate needs the same caution. The school says ${employed}, but the image that carries the figure does not say which class it describes, and no employer list or split by country is published.</p>
${h.miniGoal(slug)}
<h2>What the school leaves out, and why it matters here</h2>
<p>SKK GSB publishes no starting salary for its graduates. The number it puts forward is an alumni salary three years after the degree, expressed in purchasing power parity dollars and taken from the Financial Times alumni survey. That measures a later stage of a career on another currency basis, so we do not use it as a starting salary. The school also gives no living budget for Seoul. Without those two lines there is no payback to compute, and SKK GSB stays out of our rankings while its cost lines remain complete on this page.</p>
<p>The time away can still be counted. The program runs ${months} months, so a person earning ${K.ref()} gives up ${gone} of pay before tax, against ${K.tuitionUsd(slug)} of tuition. A class that arrives with ${K.num(s.profile.exp ?? 0, 1)} years of work on average often earns more than the reference figure, which raises that line further: type your own salary in the calculator at the top, then add your own rent and food in Seoul.</p>
${h.mini('forgone')}
<h2>Tuition in won, below most schools on this site</h2>
<p>Only ${cheaper} of the ${tuitions.length} schools on this site that publish tuition charge less than SKK GSB's ${K.tuition(slug)} for three semesters. Merit scholarships are awarded at admission and apply to tuition in Korea only, not to semesters spent at a partner school; the school does not say how many students receive one. Because the bill is in won, a candidate paid in dollars, euros or another currency carries the exchange rate for the whole program. The converter below uses the ECB rate this site is built on.</p>
${h.miniFx()}`,
  faqs: [
    { q: 'How much does the SKK GSB MBA cost?', a: `Tuition is ${K.tuition(slug)} for the three semesters of the ${months}-month program, about ${K.tuitionUsd(slug)}, and the entrance fee adds ${K.fees(slug)}. The school publishes no living budget for Seoul, so rent and food must be priced separately. For a person earning ${K.ref()} before the MBA, the salary given up over the program reaches ${gone}, the largest line of the real cost.` },
    { q: 'Does SKK GSB publish a starting salary for its MBA graduates?', a: `No. The school shows an alumni salary three years after graduation, in purchasing power parity dollars from the Financial Times survey, which is not a starting salary and is not used here. It does report that ${employed}, without naming the class. With no salary and no living budget, this site cannot compute a payback for SKK GSB, and the school sits outside our rankings.` },
    { q: 'Which industries hire SKK GSB graduates?', a: `For the class of 2025, ${K.share(slug, 'consumer')} went into consumer goods and retail, ${K.share(slug, 'consulting')} into consulting, ${K.share(slug, 'manufacturing')} into manufacturing and ${K.share(slug, 'finance')} into financial services. The school publishes no salary by industry, no split by country and no list of employers, so these shares are the only placement detail available when you compare it with other Asian programs.` },
    { q: 'Is SKK GSB cheaper than other MBA programs?', a: `On tuition, yes for most: only ${cheaper} of the ${tuitions.length} schools on this site with published tuition charge less than its ${K.tuition(slug)}, about ${K.tuitionUsd(slug)}. The comparison holds for tuition alone. The salary you stop earning for ${months} months, ${gone} at a ${K.ref()} salary, weighs more than the fees, and the school gives no living budget to complete the bill.` },
  ],
  related: ['school:kaist', 'school:nus', 'school:hkust', 'best-mba-asia', 'mba-cost', 'mba-finder'],
});
