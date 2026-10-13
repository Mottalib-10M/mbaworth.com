import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'edhec';
const s = K.s(slug);
const o = K.roi(slug);
const withExp = K.schools.filter((x) => x.profile.exp !== null);
const expAbove = withExp.filter((x) => x.profile.exp! > (s.profile.exp ?? 99)).length;
const minMonths = Math.min(...K.schools.filter((x) => x.months !== null).map((x) => x.months!));
const shortest = s.months === minMonths;
const mkt = s.emp.functions.find((f) => /Marketing/i.test(f.label));
const mktAbove = K.schools.filter((x) => x.emp.functions.some((f) => /Marketing/i.test(f.label) && (f.pct ?? 0) > (mkt?.pct ?? 100))).length;
const exps = withExp.map((x) => x.profile.exp!).sort((a, b) => a - b);
const medExp = exps.length ? exps[Math.floor(exps.length / 2)] : null;
const fr = ['insead', 'hec-paris'].filter((x) => K.s(x).emp.salary !== null);
const forgone = s.months ? Math.round((K.MODEL.refSalary * s.months) / 12) : null;
const rEu = K.rank(slug, 'z-europe');
const tCoh = (s.tuition?.cohort ?? 'next intake').replace(/\s*\(.*\)/, '');
const coh = s.emp.cohort.replace(/\s*\(.*\)/, '').toLowerCase();

export default defineSchool({
  slug,
  title: `EDHEC Global MBA 2026: ${s.months}-Month Cost in Nice and Careers`,
  description: `EDHEC Global MBA 2026: ${K.tuition(slug)} for ${s.months} months in Nice, a class with ${s.profile.exp !== null ? K.num(s.profile.exp) : 'many'} years of experience on average, and why this page shows no salary and no payback.`,
  intro: `A ${s.months}-month MBA on the Riviera for ${K.tuition(slug)}, taken by a class with ${expAbove === 0 ? 'as much work experience as any other on this site' : 'more work experience than most on this site'}.`,
  resume: `The EDHEC Global MBA charges ${K.tuition(slug)} in tuition for a ${s.months}-month program in Nice${shortest ? ', as short as any full-time MBA in our data' : ''}, about ${K.tuitionUsd(slug)} at the ECB rate, plus a ${K.fees(slug) ?? 'small'} application fee. The fee covers accommodation on the global business trips but not flights, and the school states that rent, living costs and books are not included, without giving a budget. It also publishes no graduate salary: the alumni pay quoted on its program page has no cohort or source, so we do not use it. ${o ? '' : `This page therefore shows no total cost for the reference person earning ${K.ref()} and no payback.`} What we can say is that ${s.months} months away cost that person ${forgone ? K.usd(forgone) : 'most of a year'} in salary. The class is what sets EDHEC apart: an average age of ${s.profile.age !== null ? K.num(s.profile.age) : 'over thirty'} and ${s.profile.exp !== null ? K.num(s.profile.exp) : 'many'} years of work experience${expAbove === 0 ? ', as much as any school in our data' : ''}, and ${s.profile.women !== null ? K.p(s.profile.women) : 'many'} women.`,
  body: (h) => `<h2>An MBA for people already well into a career</h2>
<p>${medExp !== null ? `The typical class in our data arrives with about ${K.num(medExp)} years of experience. ` : ''}EDHEC's ${s.profile.cohort || 'latest class'} averages ${s.profile.exp !== null ? K.num(s.profile.exp) : 'more'}${expAbove === 0 ? ', tied for the highest figure in our data' : expAbove <= 3 ? `, a figure only ${expAbove} school${expAbove > 1 ? 's' : ''} in our data exceed${expAbove > 1 ? '' : 's'}` : ''}. That changes the economics. Someone ${s.profile.exp !== null ? K.num(s.profile.exp) : 'many'} years into a career is likely to earn more than the ${K.ref()} we use as a reference, so the salary given up during the ${s.months} months is larger, and the short format matters more than it would for a younger candidate. Type your own salary in the calculator above to see that cost.</p>
<p>The class is small, ${s.classSize !== null ? K.num(s.classSize) : 'a few dozen'} students from ${s.profile.countries !== null ? K.num(s.profile.countries) : 'many'} nationalities, so a handful of graduates move any share in the employment figures.</p>
<h2>Sales and marketing roles, and a healthcare tilt</h2>
<p>${mkt?.pct != null ? `${K.p(mkt.pct)} of the ${coh} took marketing and sales jobs` : 'Marketing and sales roles lead the function split'}${mkt && mktAbove === 0 ? ', the largest share in that function of any school in our data' : ''}, ahead of consulting at ${K.share(slug, 'f-consulting') ?? 'a smaller share'}. By sector, healthcare led with ${K.share(slug, 'healthcare')}, and finance, consulting, technology and energy took about the same share each. Named employers run from aerospace and food to strategy consulting. ${s.emp.employed !== null ? `${K.p(s.emp.employed)} of graduates were ${s.emp.employedLabel}.` : ''}</p>
<p>${K.share(slug, 'z-europe')} of graduates took jobs in Europe${rEu ? `, number ${rEu.rank} of ${rEu.of} in our ${h.a('best-mba-europe', 'Europe ranking')}` : ''}, and ${K.share(slug, 'z-asia') ?? 'a share'} in Asia. The report also says that most graduates changed function after the MBA and that a majority work outside their home country.</p>
${h.miniGoal(slug)}
<h2>What you need to add before the numbers mean anything</h2>
<p>Two lines are missing for a full cost: a living budget for ${s.months} months on the Côte d'Azur, which the school leaves to you, and the flights to the business trips. For the return side, the school's report gives shares but no salary. Before applying, ask EDHEC for the median base salary of the last class and the share of graduates who reported it. EDHEC also offers merit scholarships for self-funded candidates, one per student, as a percentage of tuition. ${fr.length ? `${fr.map((x) => h.sc(x)).join(' and ')} ${fr.length > 1 ? 'are' : 'is'} the closest French comparison${fr.length > 1 ? 's' : ''} that publish${fr.length > 1 ? '' : 'es'} a salary;` : ''} the ${h.a('best-mba-one-year', 'one-year MBA ranking')} lists short programs with complete data.</p>
${h.miniFx()}`,
  faqs: [
    { q: 'How much does the EDHEC Global MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${tCoh}, about ${K.tuitionUsd(slug)}, plus a ${K.fees(slug) ?? 'small'} application fee. It includes accommodation during the global business trips but not the flights. Rent and living costs in Nice for ${s.months} months are extra, and the school gives no budget for them.` },
    { q: 'What salary do EDHEC Global MBA graduates earn?', a: `EDHEC's report for the ${coh} gives no graduate salary. The program page shows an average alumni salary with no cohort or source, which looks like ranking survey data on alumni some years after the degree, so we do not use it. ${s.emp.employed !== null ? `The report does state that ${K.p(s.emp.employed)} were ${s.emp.employedLabel}.` : ''}` },
    { q: 'How experienced is the EDHEC Global MBA class?', a: `The ${s.profile.cohort || 'latest class'} averages ${s.profile.exp !== null ? K.num(s.profile.exp) : 'many'} years of work experience and an age of ${s.profile.age !== null ? K.num(s.profile.age) : 'over thirty'}${expAbove === 0 ? ', tied for the highest experience in our data' : ''}. ${s.profile.women !== null ? `${K.p(s.profile.women)} are women, from ${s.profile.countries !== null ? K.num(s.profile.countries) : 'many'} nationalities.` : ''} A longer career before the MBA usually means a higher salary to give up for the ${s.months} months.` },
    { q: 'Where do EDHEC Global MBA graduates work?', a: `${K.share(slug, 'z-europe')} of the ${coh} took jobs in Europe, ${K.share(slug, 'z-asia') ?? 'a share'} in Asia, ${K.share(slug, 'z-us') ?? 'a small share'} in the United States and ${K.share(slug, 'z-latam') ?? 'a small share'} in Latin America. Healthcare was the largest sector, ${K.share(slug, 'healthcare')} of the class, and no salary is published for any region or sector, so the payback for a given destination cannot be computed.` },
  ],
  related: ['school:insead', 'school:hec-paris', 'school:essec', 'best-mba-one-year', 'best-mba-europe', 'mba-cost'],
});
