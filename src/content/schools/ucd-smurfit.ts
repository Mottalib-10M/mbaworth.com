import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'ucd-smurfit';
const s = K.s(slug);
const c = K.c(slug);
const months = s.months ?? 12;
const goneRaw = (K.MODEL.refSalary * months) / 12;
const gone = K.usd(goneRaw);
const directUsdRaw = c.tuition !== null && c.living !== null ? c.tuition + c.fees + c.living : null;
const exps = K.schools.map((x) => x.profile.exp).filter((v): v is number => v !== null);
const expTop = (s.profile.exp ?? 0) >= Math.max(...exps);
const expAbove = exps.filter((v) => v > (s.profile.exp ?? 0)).length;
const named = K.employers(slug, 3);

export default defineSchool({
  slug,
  title: 'UCD Smurfit MBA 2026: Dublin Cost and No Salary Report',
  description: `UCD Smurfit MBA 2026 in Dublin: ${K.tuition(slug)} tuition, a ${K.fees(slug)} travel line and ${K.living(slug)} of on-campus living for ${months} months; the school publishes no graduate salary.`,
  intro: `A ${months}-month MBA in Dublin with a class that averages ${K.num(s.profile.exp ?? 0)} years of work experience, and no employment report.`,
  resume: `The full-time MBA at UCD Michael Smurfit Graduate Business School in Dublin charges ${K.tuition(slug)} in tuition, the same for EU and non-EU students, and the school adds a ${K.fees(slug)} line for the global network week, study tours and visas, part of it discretionary. Its budget for living on campus over the ${months} months is ${K.living(slug)}, for ${K.direct(slug)} in all, about ${K.directUsd(slug)}. A person earning ${K.ref()} today would also give up ${gone} of salary, ${directUsdRaw !== null && goneRaw > directUsdRaw ? 'more than all of those lines together' : 'close to all of those lines together'}. The total and the payback stop there: the school publishes no employment report and no graduate salary, so this site computes no payback and no ten-year value. What sets the class apart is its seniority: ${K.num(s.profile.exp ?? 0)} years of experience on average${expTop ? ', as high as at any school on this site' : ''}, with ${K.intl(slug)} of students from outside Ireland.`,
  body: (h) => `<h2>A senior class, and what that does to the bill</h2>
<p>${expTop ? 'No school on this site reports a more experienced class than UCD Smurfit' : `Only ${expAbove} school${expAbove === 1 ? '' : 's'} on this site report${expAbove === 1 ? 's' : ''} a more experienced class than UCD Smurfit`}: students arrive with ${K.num(s.profile.exp ?? 0)} years of work on average, at an average age of ${K.num(s.profile.age ?? 0)}. That matters more than the fees. A person at that stage often earns well above the reference salary of ${K.ref()}, and the pay given up during the ${months} months grows with it, while the tuition stays at ${K.tuitionUsd(slug)}. For the reference person the year away already costs ${gone}; for a manager earning twice that, it costs twice as much, and a one-year format keeps that line well below what a two-year program would take. Type your own salary below to see the figure for you.</p>
${h.mini('forgone')}
<h2>What the travel line and the living budget cover</h2>
<p>The ${K.fees(slug)} the school lists beside tuition pays for the global network week, study tours and visas. It is part of the school's own estimate of the year's cost, but some of it is discretionary spending, so a student who travels less pays less. Textbooks are listed separately. The living budget of ${K.living(slug)} assumes on-campus accommodation with utilities, plus food; the school's off-campus estimate is higher, so a student who rents in the city should budget above the figure counted here. Both figures come from the school's indicative investment table for a ${months}-month year.</p>
<h2>No employment report to read</h2>
<p>UCD Smurfit publishes no employment report and no salary for its graduates. The school quotes salary growth three years after the degree from the Financial Times survey of alumni, a measure of later careers that does not tell a new student what the first job pays. It lists employers that have hired its graduates over recent years${named.length ? `, ${K.listOf(named)} among them,` : ''} without hire counts or years. That is why the school is absent from our rankings, which need a salary and a share of the class by destination. Candidates should ask admissions for the most recent class's base salaries and the share that changed country before committing; the calculator at the top takes any figure you type.</p>
${h.miniFx()}`,
  faqs: [
    { q: 'How much does the UCD Smurfit MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${months}-month program, for EU and non-EU students alike. The school adds ${K.fees(slug)} for travel, study tours and visas, part of it optional, and budgets ${K.living(slug)} for living on campus, for ${K.direct(slug)} in all. A person earning ${K.ref()} also gives up ${gone} of salary during the year.` },
    { q: 'What salary do UCD Smurfit MBA graduates earn?', a: `The school does not say. It publishes no employment report and no graduating-class salary, only salary growth three years after the degree quoted from the Financial Times alumni survey. Without a starting salary, this site cannot compute a payback for UCD Smurfit, whose ${K.direct(slug)} of tuition, travel and living costs remain fully listed on this page.` },
    { q: 'Who studies the full-time MBA at UCD Smurfit?', a: `The class profile shows ${K.intl(slug)} international students, ${K.p(s.profile.women ?? 0)} women, an average age of ${K.num(s.profile.age ?? 0)} and ${K.num(s.profile.exp ?? 0)} years of work experience on average${expTop ? ', as high as at any school on this site' : ''}. A class this experienced gives up more salary than the ${K.ref()} reference used in our rankings, so personal figures matter more here.` },
  ],
  related: ['school:imperial', 'school:warwick', 'school:insead', 'best-mba-europe', 'best-mba-one-year', 'mba-employment-report'],
});
