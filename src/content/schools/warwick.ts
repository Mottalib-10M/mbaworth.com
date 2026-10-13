import { defineSchool } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const slug = 'warwick';
const s = K.s(slug);
const o = K.roi(slug)!;
const months = s.months ?? 12;
const nth = (r: { rank: number }) => (r.rank === 1 ? 'first' : `number ${r.rank}`);
const af = K.shareRaw(slug, 'z-africa') ?? 0;
const afShares = K.schools.map((x) => K.shareRaw(x.slug, 'z-africa')).filter((v): v is number => v !== null);
const afTop = af > 0 && af >= Math.max(...afShares);
const totals = K.withRoi().map((x) => K.roi(x.slug)!.total);
const cheaperTotal = totals.filter((v) => v < o.total).length;
const rMan = K.rank(slug, 'manufacturing'), rEn = K.rank(slug, 'energy'), rUk = K.rank(slug, 'z-uk');
const ukSal = K.segSalary(slug, 'z-uk');
const sal = s.emp.salary!;

export default defineSchool({
  slug,
  title: 'Warwick MBA 2026: One-Year Cost, PPP Salaries, Payback',
  description: `Warwick MBA 2026: ${K.tuition(slug)} tuition and ${K.living(slug)} living for ${months} months, a ${K.salary(slug)} average salary read from PPP dollars, ${K.payback(slug)} payback at a ${K.ref()} salary.`,
  intro: `A one-year MBA in Coventry whose graduates spread from the UK to Asia and Africa, and whose salaries are printed in purchasing-power dollars.`,
  resume: `The Warwick full-time MBA costs ${K.tuition(slug)} for the ${months}-month format, the same for home and international students, and the university advises ${K.living(slug)} for a year of living costs, for ${K.direct(slug)} in all, about ${K.directUsd(slug)}. For a person earning ${K.ref()} today, the year away adds ${K.usd(o.forgone)}, for a total of ${K.usd(o.total)}${cheaperTotal <= 5 ? `, one of the ${cheaperTotal + 1} lowest totals among the ${totals.length} schools this site can compute` : ''}. The class of 2025 reported an ${K.salaryKind(slug)} of ${K.salary(slug)}, a figure the school prints in purchasing-power dollars and that we convert back to pounds. On it the degree repays the total ${K.payback(slug)} after graduation, with a ten-year net present value of ${K.npv(slug)}. What sets Warwick apart is the spread of its graduates: ${K.share(slug, 'z-uk')} stayed in the UK, ${K.share(slug, 'z-asia')} went to Asia and ${K.share(slug, 'z-africa')} to Africa${afTop ? ', the largest African share of any school on this site' : ''}.`,
  body: (h) => `<h2>Graduates spread across four continents</h2>
<p>${(K.shareRaw(slug, 'z-uk') ?? 0) < 50 ? "Fewer than half of Warwick's graduates stay in the country where they studied. " : ''}${K.share(slug, 'z-uk')} took jobs in the UK, at an average of ${ukSal ?? 'a salary not published'}${rUk ? `, which places Warwick ${nth(rUk)} of ${rUk.of} in our ${h.a('best-mba-london', 'UK ranking')}` : ''}. ${K.share(slug, 'z-asia')} went to Asia, ${K.share(slug, 'z-africa')} to Africa${afTop ? ', a larger share than at any other school we read' : ''}, and the rest split between Europe, North America, Latin America and the Middle East. A class that is ${K.intl(slug)} international, from ${K.num(s.profile.countries ?? 0)} countries, sits behind that spread. The school publishes a salary for the UK group only, so the payback for a graduate going to Asia or Africa rests on the UK-based average, which may not hold there.</p>
<p>By industry, technology and finance tie at ${K.share(slug, 'tech')} each. Manufacturing takes ${K.share(slug, 'manufacturing')}${rMan ? `, enough to rank Warwick ${nth(rMan)} of ${rMan.of} for manufacturing careers` : ''}, and energy ${K.share(slug, 'energy')}${rEn ? `, ${nth(rEn)} of ${rEn.of} in our energy ranking` : ''}.</p>
${h.miniGoal(slug)}
<h2>Salaries published in purchasing-power dollars</h2>
<p>Warwick reports pay in purchasing power parity dollars, a unit that adjusts for the cost of living in each country rather than a currency anyone is paid in. To compare it with the pound and dollar salaries of other schools, we convert it back to pounds with the World Bank factor for the UK, which gives ${K.salary(slug)}, about ${K.usd(sal.usd ?? 0)} at the ECB rate. That figure is an average, not a median, and a few high salaries can lift it. Sector salaries are printed for three groups only, because the school lacked complete pay data for the others: finance at ${K.segSalary(slug, 'finance')}, energy at ${K.segSalary(slug, 'energy')} and technology at ${K.segSalary(slug, 'tech')}. The technology figure is low enough to stretch the payback to ${K.payback(slug, 'tech')}, against ${K.payback(slug, 'finance')} on the finance figure.</p>
${h.miniPayback(slug)}
<h2>A short program with a light bill</h2>
<p>Only ${cheaperTotal} of the ${totals.length} schools that this site can compute come out cheaper in total for the reference person. Two things keep the figure down: a single year away from work, and a living budget of ${K.living(slug)}, the university's advice for a year of study in Coventry rather than in London. The fee covers the overseas elective's travel and accommodation; residential stays and capstone travel are not included. Scholarships cover part of tuition for the next intake, and the school does not say how many students receive one or the average award. The tool below shows how an award changes the payback.</p>
${h.miniScholarship(slug)}`,
  faqs: [
    { q: 'How much does the Warwick full-time MBA cost?', a: `Tuition is ${K.tuition(slug)} for the ${months}-month format, and the university advises ${K.living(slug)} for a year of living costs, for ${K.direct(slug)}, about ${K.directUsd(slug)}. A person earning ${K.ref()} before the MBA also gives up ${K.usd(o.forgone)} of salary, which brings the total to ${K.usd(o.total)}. The longer formats cost a little more.` },
    { q: 'Why are Warwick MBA salaries shown in pounds and not as published?', a: `Warwick publishes salaries in purchasing power parity dollars, which adjust for living costs and are not a currency. We convert them back to pounds with the World Bank factor so they compare with other schools: the class of 2025 average becomes ${K.salary(slug)}, about ${K.usd(sal.usd ?? 0)}. The UK group averaged ${ukSal ?? 'a figure not published'} on the same basis.` },
    { q: 'How long does the Warwick MBA take to pay back?', a: `For a person earning ${K.ref()} before the MBA, ${K.payback(slug)} after graduation on the average salary, before tax, with raises of ${Math.round(K.MODEL.g1 * 100)}% a year after the degree and ${Math.round(K.MODEL.g0 * 100)}% without. The finance figure gives ${K.payback(slug, 'finance')}; the technology figure, much lower, gives ${K.payback(slug, 'tech')}. A one-year format keeps the salary given up small, which helps every case.` },
    { q: 'Where do Warwick MBA graduates work after the degree?', a: `In the class of 2025, ${K.share(slug, 'z-uk')} worked in the UK, ${K.share(slug, 'z-asia')} in Asia and ${K.share(slug, 'z-africa')} in Africa${afTop ? ', the largest African share of any school on this site' : ''}. Continental Europe took ${K.p(s.emp.zones.find((z) => z.zone === 'Europe')?.pct ?? 0)}, North America ${K.share(slug, 'z-us')} and Latin America ${K.share(slug, 'z-latam')}. Only the UK group has a published salary, ${ukSal ?? 'not given'}, so other destinations rest on the school average.` },
  ],
  related: ['school:imperial', 'school:alliance-manchester', 'school:lbs', 'school:oxford-said', 'best-mba-europe', 'best-mba-one-year'],
});
