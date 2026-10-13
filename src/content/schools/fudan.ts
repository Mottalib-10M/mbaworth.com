import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'fudan';
const s = K.s(slug);
const o = K.roi(slug);
const forgone = s.months ? Math.round((K.MODEL.refSalary * s.months) / 12) : null;
const womenFirst = K.schools.every((x) => (x.profile.women ?? 0) <= (s.profile.women ?? 0));
const expLowest = K.schools.every((x) => x.profile.exp === null || x.profile.exp >= (s.profile.exp ?? 0));
const maxMonths = Math.max(...K.schools.filter((x) => x.months !== null).map((x) => x.months!));
const named = s.emp.industries.reduce((t, r) => t + (r.pct ?? 0), 0);
const coh = s.emp.cohort.replace(/\s*\(.*\)/, '').toLowerCase();
const cn = K.schools.filter((x) => x.country === 'CN' && x.slug !== slug && K.c(x.slug).tuition !== null);
const cheapest = cn.every((x) => K.c(x.slug).tuition! >= K.c(slug).tuition!);
const exps = K.schools.filter((x) => x.profile.exp !== null).map((x) => x.profile.exp!).sort((a, b) => a - b);
const medExp = exps.length ? exps[Math.floor(exps.length / 2)] : null;
const rAsia = K.rank(slug, 'z-asia');

export default defineSchool({
  slug,
  title: 'Fudan IMBA 2026: Shanghai Tuition, Class and Career Data',
  description: `Fudan International MBA 2026: ${K.tuition(slug)} for ${s.months} months in Shanghai, about ${K.tuitionUsd(slug)}, a class that is ${s.profile.women !== null ? K.p(s.profile.women) : 'mostly'} women, and no graduate salary or living budget published.`,
  intro: `A ${s.months}-month English-taught MBA in Shanghai for ${K.tuition(slug)}, with ${expLowest ? 'less work experience in the class than at any other school on this site' : 'an early-career class'}.`,
  resume: `The Fudan International MBA, run by Fudan University's School of Management in partnership with MIT Sloan, charges ${K.tuition(slug)} for its ${s.months}-month full-time program, about ${K.tuitionUsd(slug)} at the ECB rate${cheapest && cn.length ? `, the lowest tuition of the ${cn.length + 1} Chinese schools on this site` : ''}. The fees page does not say which intake the figure applies to. Fudan publishes no living budget, only dormitory rates from older images, and its ${coh} employment report gives no salary at all. ${o ? '' : `Without either figure, this page shows no total cost for the reference person earning ${K.ref()} and no payback, and our salary-based rankings leave Fudan out.`} The cost we can state is the salary given up: ${s.months} months away cost that person ${forgone ? K.usd(forgone) : 'two years of pay'}${s.months === maxMonths ? ', as long as any program in our data' : ''}. What sets Fudan apart is the class: ${s.profile.women !== null ? K.p(s.profile.women) : 'a majority of'} women${womenFirst ? ', the highest share in our data' : ''}, and an average of ${s.profile.exp !== null ? K.num(s.profile.exp, 1) : 'a few'} years of work experience${expLowest ? ', the lowest of any school here' : ''}.`,
  body: (h) => `<h2>An early-career MBA</h2>
<p>${medExp !== null ? `Across our data, the median class averages ${K.num(medExp)} years of experience. ` : ''}Fudan's latest published profile, for the ${s.profile.cohort.toLowerCase() || 'latest class'}, averages ${s.profile.exp !== null ? K.num(s.profile.exp, 1) : 'fewer'}${expLowest ? ', the lowest figure we have' : ''}, at an average age of ${s.profile.age !== null ? K.num(s.profile.age, 1) : 'under thirty'}. A shorter career before the degree usually means a lower salary to give up, which partly offsets the two-year length. Type your own salary in the calculator above: at a lower starting pay, ${s.months} months away cost much less than the ${forgone ? K.usd(forgone) : 'figure'} of the reference case.</p>
<p>The profile is older than the employment report, which is a weakness: the class described there is not the ${coh}. The school does not publish the share of international students.</p>
<h2>Where the class went</h2>
<p>The ${coh} report lists only the ${s.emp.industries.length} largest industries and the ${s.emp.functions.length} largest functions. Technology led with ${K.share(slug, 'tech')}, then healthcare at ${K.share(slug, 'healthcare')}, consulting at ${K.share(slug, 'consulting')} and finance at ${K.share(slug, 'finance')}; together with an "other" group these cover ${K.p(named)} of the class. By function, marketing came first and product management second. ${K.share(slug, 'z-asia')} of graduates worked in Asia${rAsia ? `, number ${rAsia.rank} of ${rAsia.of} in our ${h.a('best-mba-asia', 'Asia ranking')}` : ''}.</p>
<p>The report adds context without pay: graduates received more than one offer on average, a sizeable minority went into entrepreneurship or a family business, and most changed career. Private companies hired about two thirds of the class, foreign-owned firms most of the rest. ${s.emp.employed !== null ? `${K.p(s.emp.employed)} ${s.emp.employedLabel}.` : ''}</p>
${h.miniGoal(slug)}
<h2>Scholarships tied to test scores</h2>
<p>Fudan sets its entry scholarships largely by GMAT score, in bands that run up to full tuition for the highest scores, plus awards for diversity, entrepreneurship and women in leadership. It does not publish how many students receive them. Since tuition is billed in yuan, the dollar cost depends on the exchange rate on the day you pay; the converter below shows today's figure. ${cn.length ? `The other Chinese schools here, ${K.listOf(cn.map((x) => h.sc(x.slug)))}, can be compared on cost in the ${h.a('compare-mba', 'comparison tool')}.` : ''}</p>
${h.miniFx()}`,
  faqs: [
    { q: 'How much does the Fudan International MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${s.months}-month program, about ${K.tuitionUsd(slug)} at the ECB rate; the school does not state the intake year. Fudan publishes no living budget, so rent and living costs in Shanghai come on top. For a person earning ${K.ref()} before the MBA, the salary given up adds about ${forgone ? K.usd(forgone) : 'two years of pay'}.` },
    { q: 'What salary do Fudan MBA graduates earn?', a: `Fudan's report for the ${coh} publishes no salary figure. It gives the ${s.emp.industries.length} largest industries, led by technology at ${K.share(slug, 'tech')}, and states that ${s.emp.employed !== null ? K.p(s.emp.employed) : 'most'} of graduates ${s.emp.employedLabel}. Ask the school for pay data before comparing it with programs that publish a median.` },
    { q: 'How experienced is the Fudan MBA class?', a: `The latest published profile, for the ${s.profile.cohort.toLowerCase() || 'latest class'}, averages ${s.profile.exp !== null ? K.num(s.profile.exp, 1) : 'a few'} years of work experience${expLowest ? ', the lowest in our data' : ''}, an age of ${s.profile.age !== null ? K.num(s.profile.age, 1) : 'under thirty'} and ${s.profile.women !== null ? K.p(s.profile.women) : 'a majority of'} women. The class had ${s.classSize !== null ? K.num(s.classSize) : 'about ninety'} students; the school publishes no share of international students and no profile for any later class.` },
  ],
  related: ['school:ceibs', 'school:pku-guanghua', 'school:sjtu-antai', 'best-mba-asia', 'mba-scholarships', 'compare-mba'],
});
