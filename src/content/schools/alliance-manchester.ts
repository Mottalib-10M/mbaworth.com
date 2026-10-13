import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'alliance-manchester';
const s = K.s(slug);
const o = K.roi(slug);
const uk = K.schools.filter((x) => x.region === 'UK' && K.c(x.slug).tuition !== null).sort((a, b) => K.c(a.slug).tuition! - K.c(b.slug).tuition!);
const ukPos = uk.findIndex((x) => x.slug === slug) + 1;
const ukSeat = ukPos === 1 ? `the lowest tuition of the ${uk.length} UK schools on this site` : `tuition that ranks ${ukPos} of ${uk.length} from cheapest among UK schools on this site`;
const rUk = K.rank(slug, 'z-uk'), rMe = K.rank(slug, 'z-me'), rLa = K.rank(slug, 'z-latam');
const abroad = 100 - (K.shareRaw(slug, 'z-uk') ?? 100);
const short = s.monthsNote.match(/^(\d+) or/)?.[1] ?? 'fewer';
const ukZ = K.schools.filter((x) => x.region === 'UK' && K.shareRaw(x.slug, 'z-uk') !== null);
const more = ukZ.filter((x) => K.shareRaw(x.slug, 'z-uk')! > (K.shareRaw(slug, 'z-uk') ?? 0)).length;
const mkt = s.emp.functions.find((f) => /Marketing/i.test(f.label));

export default defineSchool({
  slug,
  title: 'Alliance MBS MBA 2026: Manchester Fees and Where Grads Work',
  description: `Alliance MBS full-time MBA 2026: ${K.tuition(slug)} for up to ${s.months} months in Manchester, ${K.share(slug, 'z-uk')} of graduates working in the UK and no salary published.`,
  intro: `${K.tuition(slug)} of tuition whether you finish in ${short} or ${s.months} months, and a class that spreads across more regions than most British MBAs.`,
  resume: `Alliance Manchester Business School charges ${K.tuition(slug)} for its full-time MBA, the same fee whether the program takes ${short} or ${s.months} months, and that is ${ukSeat}. Over the longer track, the University of Manchester's postgraduate living estimate comes to ${K.living(slug) ?? 'an amount it does not publish'}, for ${K.direct(slug) ?? 'a total it does not state'} before the salary you give up${K.directUsd(slug) ? `, about ${K.directUsd(slug)}` : ''}. ${o ? `For a person earning ${K.ref()} the total reaches ${K.usd(o.total)}, repaid in ${K.payback(slug)}.` : `The report gives no graduate starting salary, only the alumni pay three years out that a newspaper ranking collects, so we cannot compute a total cost for the reference person earning ${K.ref()} or a payback date.`} What sets the school apart is reach: in the ${s.emp.cohort.toLowerCase()}, ${K.share(slug, 'z-uk')} of employed graduates stayed in the United Kingdom and the rest went to Asia, the Middle East, Latin America and North America, from a class that is ${K.intl(slug) ?? 'mostly'} international.`,
  body: (h) => `<h2>A British MBA that sends ${K.p(abroad)} of its graduates abroad</h2>
<p>${more ? `${more} of the ${ukZ.length} UK schools that publish the figure place a larger share of their class in Britain.` : `No other UK school in our data places a larger share in Britain.`} Alliance MBS places ${K.share(slug, 'z-uk')} there, and the rest of the map is unusually wide for a class of ${s.classSize ?? 'about a hundred'}: ${K.share(slug, 'z-asia') ?? 'a share'} in Asia, ${K.share(slug, 'z-me') ?? 'a share'} in the Middle East and ${K.share(slug, 'z-latam') ?? 'a share'} in Latin America. ${rUk ? `On the share placed in Britain it ranks number ${rUk.rank} of ${rUk.of} in our UK list` : 'Our UK list compares it on the same basis'}${rMe ? `, number ${rMe.rank} of ${rMe.of} for the Middle East` : ''}${rLa ? ` and number ${rLa.rank} of ${rLa.of} for Latin America` : ''}. With ${K.intl(slug) ?? 'a large share of'} international students from ${s.profile.countries !== null ? K.num(s.profile.countries) : 'many'} countries, a good part of those placements are people going home with a British degree.</p>
<p>The report also stresses that most graduates changed country after the MBA, which is consistent with that spread. For someone who intends to settle in the UK, the ${h.a('best-mba-london', 'London and UK comparison')} shows which schools place more of their class there.</p>
${h.miniGoal(slug)}
<h2>Sales and finance jobs rather than strategy firms</h2>
<p>The function split tells more than the sectors here. ${mkt?.pct != null ? `${K.p(mkt.pct)} of graduates took marketing and sales roles` : 'Marketing and sales roles lead the function split'}, a larger group than finance and accounting, while consulting as a function took ${K.share(slug, 'f-consulting') ?? 'a smaller share'}. By sector, financial services and banking led with ${K.share(slug, 'finance')} and technology followed with ${K.share(slug, 'tech')}, with manufacturing, energy and healthcare each taking a few percent. Named employers run from card issuers and global banks to pharmaceutical groups and big tech, with no hire counts, so the list says who recruits rather than how many.</p>
<h2>No starting salary, so no payback</h2>
<p>The school's report prints an average weighted salary and a salary increase, but both come from alumni three years after the degree, as a third-party ranking surveys them, not from graduates at the time they start. We do not use those figures: a salary three years in includes promotions that a starting salary does not, and it would make the payback look shorter than it is. Until the school publishes what the class earns when it leaves, type the salary you expect in the calculator above, in pounds converted to dollars, to see your own payback.</p>
${h.miniFx()}`,
  faqs: [
    { q: 'How much does the Alliance MBS full-time MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${s.tuition?.cohort ?? 'current'}, the same whether you finish in ${short} or ${s.months} months. The University of Manchester's living estimate over the longer track adds ${K.living(slug) ?? 'an unpublished amount'}, for ${K.direct(slug) ?? 'a total it does not state'}. The salary you stop earning comes on top, and the school lists no separate mandatory fee.` },
    { q: 'What salary do Alliance MBS graduates earn after the MBA?', a: `The school does not publish a starting salary for the ${s.emp.cohort.toLowerCase()}. Its report quotes alumni pay three years after graduation from a newspaper ranking survey, which includes several years of raises and is not comparable with the base salaries other schools report at graduation. We leave the salary blank, and the school is not ranked on pay or payback here.` },
    { q: 'Where do Alliance MBS MBA graduates find jobs?', a: `${K.share(slug, 'z-uk')} of employed graduates in the ${s.emp.cohort.toLowerCase()} stayed in the United Kingdom, ${K.share(slug, 'z-asia') ?? 'a share'} went to Asia, ${K.share(slug, 'z-me') ?? 'a share'} to the Middle East and ${K.share(slug, 'z-latam') ?? 'a share'} to Latin America. ${s.emp.employed !== null ? `${K.p(s.emp.employed)} were ${s.emp.employedLabel}.` : ''} Only ${K.share(slug, 'z-us') ?? 'a small share'} went to North America.` },
  ],
  related: ['school:warwick', 'school:cambridge-judge', 'best-mba-london', 'best-mba-europe', 'best-mba-middle-east', 'mba-finder'],
});
