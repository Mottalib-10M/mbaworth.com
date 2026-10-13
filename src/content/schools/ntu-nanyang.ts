import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'ntu-nanyang';
const s = K.s(slug);
const o = K.roi(slug);
const m = s.months ?? 12;
const forgone = Math.round((K.MODEL.refSalary * m) / 12);
const rng = /S\$([\d,]+)\s*-\s*([\d,]+)/.exec(s.livingMissing ?? '');
const lo = rng ? Number(rng[1].replace(/,/g, '')) : null;
const hi = rng ? Number(rng[2].replace(/,/g, '')) : null;
const nus = K.s('nus');
const nusT = nus.tuition ? nus.tuition.v : null;
const diff = nusT !== null ? Math.round(nusT - s.tuition!.v) : null;
const emps = K.employers(slug, 10);

export default defineSchool({
  slug,
  title: 'Nanyang (NTU) MBA 2026: Singapore Fees and Missing Salary',
  description: `Nanyang (NTU) MBA 2026: ${K.tuition(slug)} tuition with GST for ${m} months in Singapore, ${K.p(s.emp.employed!)} employed within three months, and why no payback can be shown here.`,
  intro: `A ${m}-month Singapore MBA at ${K.tuition(slug)}, whose graduates are ${K.p(s.emp.employed!)} employed within three months by the school's count, but whose starting salary is not published.`,
  resume: `The Nanyang MBA at Nanyang Technological University charges ${K.tuition(slug)} for the ${s.tuition!.cohort}, goods and services tax included, plus a one-time ${K.fees(slug)} miscellaneous fee, about ${K.tuitionUsd(slug)} in tuition at the ECB rate. Singapore citizens, permanent residents, NTU alumni and company-sponsored students receive grants off that price. The school gives no total living budget, only a monthly range for a student in a campus dormitory${lo && hi ? ` of ${K.money(lo, 'SGD')} to ${K.money(hi, 'SGD')}` : ''}. On outcomes it states that ${K.p(s.emp.employed!)} of graduates were ${s.emp.employedLabel}, without naming the class, and it publishes no starting salary; the only salary on its page is an alumni average with no date, which this site does not use as a starting figure. ${o ? '' : `So our model cannot compute a total cost or a payback for the reference person earning ${K.ref()}, and the school is not ranked.`} What it does show is a short, Singapore-based program whose students average ${K.num(s.profile.age!)} years of age and ${K.num(s.profile.exp!)} years of work experience.`,
  body: (h) => `<h2>A one-year price in Singapore dollars</h2>
<p>Tuition of ${K.tuition(slug)} covers the ${m}-month program; the school also runs longer double-degree routes with partners in Japan and Europe, at different prices. ${diff !== null && diff > 0 ? `Another Singapore school on this site, ${h.sc('nus')}, charges ${K.money(nusT!, 'SGD')}${nus.months && nus.months > m ? ` for a program of up to ${nus.months} months` : ''}, ${K.money(diff, 'SGD')} more than Nanyang.` : diff !== null ? `${h.sc('nus')} charges ${K.money(nusT!, 'SGD')} for its own program.` : ''} Because both are priced in Singapore dollars, a student paying from savings in another currency should convert the fee at the date of each payment, not at the date of the offer.</p>
${lo && hi ? `<p>The monthly living range, ${K.money(lo, 'SGD')} to ${K.money(hi, 'SGD')}, assumes a room in a campus dormitory. Over ${m} months that gives ${K.money(lo * m, 'SGD')} to ${K.money(hi * m, 'SGD')} before travel. We do not turn that into a budget of our own: the school does not publish one, and a dormitory range says nothing about the rent of a private flat.</p>` : ''}
${h.miniFx()}
<h2>Employment without a salary</h2>
<p>The career statistics on the program page give a placement rate of ${K.p(s.emp.employed!)} within three months and say that most graduates changed sector, country or function. They give no median or average base salary for a dated class, no split by industry or region, and no hire counts. A fuller career report exists behind a download form, which we did not submit, so none of its figures appear here. The employers the school names, all without counts, include ${K.listOf(emps.slice(0, 6))}, a list that covers the graduate programs of the whole business school rather than the MBA alone.</p>
<p>To use the calculator above, type the salary you expect after the degree in the market you plan to work in. Asking admissions for the dated report is worth the effort, since the gap between a low and a high guess changes the payback by years.</p>
<h2>Who sits in the class</h2>
<p>The class profile shows an average age of ${K.num(s.profile.age!)}, about ${K.num(s.profile.exp!)} years of work experience and ${K.p(s.profile.women!)} women${s.profile.countries ? `, from ${K.num(s.profile.countries)} nationalities` : ''}; the school does not date the profile. Those are figures for a mid-career class, so the salary given up matters: at ${K.ref()} a year, the ${m} months away cost about ${K.usd(forgone)} before tax.</p>
${h.mini('forgone')}`,
  faqs: [
    { q: 'How much does the Nanyang (NTU) MBA cost?', a: `Tuition for the ${s.tuition!.cohort} is ${K.tuition(slug)} including goods and services tax, plus a ${K.fees(slug)} one-time fee, about ${K.tuitionUsd(slug)} at the ECB rate of ${K.day(K.FX_DATE)}. Singaporeans, permanent residents, NTU alumni and sponsored students get grants off the fee. The school gives no total living budget, only a monthly range for campus housing.` },
    { q: 'What salary do Nanyang (NTU) MBA graduates earn?', a: `The school publishes no starting salary for a dated class on its program pages. The salary it shows is an alumni average with no time frame, which this site does not treat as a starting figure, and the full career report sits behind a form. Without a salary, no payback can be computed; type your own expected salary in the calculator above.` },
    { q: 'What share of Nanyang (NTU) MBA graduates find a job?', a: `The school states that ${K.p(s.emp.employed!)} of graduates were ${s.emp.employedLabel}, without naming the class or the number of graduates surveyed. It names employers such as ${K.listOf(emps.slice(0, 4))}, without hire counts. No split by industry, function or country is published on the open pages.` },
  ],
  related: ['school:nus', 'school:smu', 'school:insead', 'best-mba-asia', 'best-mba-one-year', 'mba-finder'],
});
