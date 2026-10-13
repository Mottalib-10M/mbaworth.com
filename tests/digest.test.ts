/**
 * Prints what the kit knows, for writers: DIGEST=1 npx vitest run tests/digest.test.ts
 * Writes digest.txt (or DIGEST_OUT). DIGEST=insead,lbs prints those schools only; DIGEST=rank prints our ranking for every goal.
 */
import { it } from 'vitest';
import { writeFileSync } from 'node:fs';
import { KIT as K } from '../src/lib/kit';
import { GOAL_LIST } from '../src/lib/goals';
const want = process.env.DIGEST;
it('digest', () => {
  if (!want) return;
  const out: string[] = [];
  if (want === '1' || want === 'rank') {
    for (const g of GOAL_LIST) {
      const r = K.ranking(g.id);
      out.push(`\n## ${g.id} (${g.label}): ${r.ranked.length} ranked, ${r.unranked.length} unranked`);
      for (const x of r.ranked.slice(0, 12)) out.push(`  ${x.rank}. ${x.slug} share ${x.share}% salary ${K.usd(x.salary)}${x.fallback ? '*' : ''} payback ${x.payback === null ? '>30' : x.payback.toFixed(1)} npv ${K.usd(x.npv)} score ${x.score.toFixed(0)}`);
      if (r.unranked.length) out.push(`  unranked: ${r.unranked.map((u) => `${u.slug} ${u.share}% (${u.why})`).join('; ')}`);
    }
  }
  if (want !== 'rank') {
    const slugs = want === '1' ? K.schools.map((s) => s.slug) : want.split(',');
    for (const slug of slugs) {
      const s = K.s(slug);
      out.push(`\n# ${slug} | ${s.name} | ${s.city} ${s.country} | ${s.months} months${s.monthsDerived ? ' (derived)' : ''} | class ${s.classSize ?? s.classSizeText}`);
      out.push(`  tuition ${K.tuition(slug)} (${K.tuitionUsd(slug)}) fees ${K.fees(slug)} living ${K.living(slug)} [${s.living?.basis ?? 'none'}] direct ${K.direct(slug)}`);
      out.push(`  salary ${K.salary(slug)} ${K.salaryKind(slug)} (${K.salaryUsd(slug)}) | cost ref ${K.cost(slug)} payback ${K.payback(slug)} npv ${K.npv(slug)} | employed ${s.emp.employed}% ${s.emp.employedLabel} | cohort ${s.emp.cohort}`);
      out.push(`  industries: ${s.emp.industries.map((i) => `${i.key} ${i.pct}%${i.salary ? ' ' + K.money(i.salary, i.cur) : ''}`).join(', ')}`);
      if (s.emp.segments.length) out.push(`  segments: ${s.emp.segments.map((i) => `${i.key} ${i.pct}%${i.salary ? ' ' + K.money(i.salary, i.cur) : ''}`).join(', ')}`);
      out.push(`  zones: ${s.emp.zones.map((z) => `${z.zone} ${z.pct}%${z.salary ? ' ' + K.money(z.salary, z.cur) : ''}`).join(', ')}`);
      if (s.emp.functions.length) out.push(`  functions: ${s.emp.functions.slice(0, 8).map((f) => `${f.label} ${f.pct}%`).join(', ')}`);
      out.push(`  employers: ${s.emp.employers.slice(0, 10).map((e) => e.name + (e.hires ? ` (${e.hires})` : '')).join(', ')}`);
      const p = s.profile; out.push(`  profile: intl ${p.intl} women ${p.women} age ${p.age} exp ${p.exp} gmat ${p.gmat} (${p.gmatLabel}) | ranks ${s.ranks.map((r) => `${r.ranking} ${r.rank}`).join(', ')}`);
      const rk = GOAL_LIST.map((g) => [g.id, K.rank(slug, g.id)] as const).filter((x) => x[1]).map(([g, r]) => `${g} #${r!.rank}/${r!.of}`);
      out.push(`  our ranks: ${rk.join(', ')}`);
      if (s.livingMissing) out.push(`  living missing: ${s.livingMissing}`);
      if (s.emp.salaryMissing) out.push(`  salary missing: ${s.emp.salaryMissing}`);
    }
  }
  writeFileSync(process.env.DIGEST_OUT ?? 'digest.txt', out.join('\n') + '\n');
});
