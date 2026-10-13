/**
 * Every page file is checked before it reaches the build (CONTRIBUTING-PAGES.md): snippet lengths,
 * answer block, FAQ length and uniqueness, links, sources, banned phrases, prose length, minis.
 * Some pages only: PAGE_FILES=school:insead,mba-finder npx vitest run tests/pages.test.ts
 */
import { describe, it, expect } from 'vitest';
import { PAGES, SCHOOL_PAGES, schoolId } from '../src/lib/pages';
import { HOME } from '../src/content/home';
import { helpers, SOURCES } from '../src/lib/helpers';
import { MINIS } from '../src/lib/mini-specs';
import { ROUTES } from '../src/i18n/routes';
import { schoolBySlug, hasSchool } from '../src/lib/data';
import { GOAL_LIST } from '../src/lib/goals';

const only = (process.env.PAGE_FILES ?? '').split(',').filter(Boolean);
const pages = only.length ? PAGES.filter((p) => only.includes(p.id)) : PAGES;
const schools = only.length ? SCHOOL_PAGES.filter((p) => only.includes(schoolId(p.slug))) : SCHOOL_PAGES;
const words = (s: string) => s.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const BANNED = [/—/, /–/, /&mdash;/, /&ndash;/, /it[’']s important to note/i, /dive into/i, /whether you[’']re/i, /in today[’']s world/i, /\bMoreover\b/, /\bAdditionally\b/, /\bFurthermore\b/, /navigat(e|ing) the/i, /\bdelve\b/i, /taxineo/i, /\bMines\b/, /linkedin/i, /\bgame[- ]changer\b/i, /\bunlock\b/i, /\btapestry\b/i, /\blandscape\b/i, /\bseamless/i];
const allQ = [...HOME.faqs.map((f) => f.q), ...PAGES.flatMap((p) => p.faqs.map((f) => f.q)), ...SCHOOL_PAGES.flatMap((p) => p.faqs.map((f) => f.q))];
const allTitles = [HOME.title, ...PAGES.map((p) => p.title), ...SCHOOL_PAGES.map((p) => p.title)];
const allDesc = [HOME.description, ...PAGES.map((p) => p.description), ...SCHOOL_PAGES.map((p) => p.description)];
const ids = new Set(ROUTES.map((r) => r.id));
const h = helpers();
const snippet = (title: string, description: string) => {
  expect(title.length, title).toBeGreaterThanOrEqual(50); expect(title.length, title).toBeLessThanOrEqual(60);
  expect(description.length, description).toBeGreaterThanOrEqual(150); expect(description.length, description).toBeLessThanOrEqual(160);
  expect(title).toMatch(/2026/); expect(description).toMatch(/2026/);
  expect(title, 'key term first, never a tool word or a question (RECETTE §11)').not.toMatch(/^(calculator|calculate|how|what|when|why|is|about|faq|methodology|the|best|top)\b/i);
  expect(allTitles.filter((t) => t === title).length, title).toBe(1);
  expect(allDesc.filter((t) => t === description).length, description).toBe(1);
};
const faqCheck = (faqs: Array<{ q: string; a: string }>, min: number, max: number) => {
  expect(faqs.length).toBeGreaterThanOrEqual(min); expect(faqs.length).toBeLessThanOrEqual(max);
  for (const f of faqs) {
    const n = words(f.a); expect(n, f.q).toBeGreaterThanOrEqual(42); expect(n, f.q).toBeLessThanOrEqual(88);
    expect(allQ.filter((q) => q === f.q).length, f.q).toBe(1);
  }
};
const clean = (text: string) => {
  for (const b of BANNED) expect(text, String(b)).not.toMatch(b);
  expect(text).not.toMatch(/NaN|undefined|\[object|Infinity|\bnull\b/);
};
const minis = (html: string) => { for (const m of html.matchAll(/<!--mini:([A-Za-z0-9_-]+)(?:\|([A-Za-z0-9+/=]+))?-->/g)) { expect(MINIS[m[1]], m[1]).toBeTruthy(); const arg = m[2] ? Buffer.from(m[2], 'base64').toString('utf8') : undefined; const spec = MINIS[m[1]](arg); const out = spec.run(Object.fromEntries(spec.inputs.map((i) => [i.id, i.def]))); expect(out.head[1], m[1]).not.toMatch(/NaN|undefined/); } };
/** A mini sits right before an <h2> or ends the body (check-layout sees a gap otherwise). */
const miniPlace = (html: string) => { for (const m of html.matchAll(/<!--mini:[^>]*-->(\s*)(<[a-z0-9]+)?/g)) expect(!m[2] || m[2] === '<h2', `mini followed by ${m[2]}`).toBe(true); };

describe('home', () => {
  it('snippets, answer block, FAQ, sections', () => {
    snippet(HOME.title, HOME.description);
    expect(words(HOME.resume)).toBeGreaterThanOrEqual(120);
    faqCheck(HOME.faqs, 6, 8);
    const secs = HOME.sections(h);
    expect(secs.length).toBeGreaterThanOrEqual(5);
    clean([HOME.resume, HOME.intro, HOME.tableIntro(h), ...secs.map((s) => s.title + s.html), ...HOME.faqs.flatMap((f) => [f.q, f.a])].join(' '));
    for (const k of HOME.sources) expect(SOURCES[k], k).toBeTruthy();
  });
});

describe.each(pages.map((p) => [p.id, p] as const))('page %s', (_id, p) => {
  it('snippets (RECETTE §11)', () => { snippet(p.title, p.description); expect(p.slug).toMatch(/^[a-z0-9-]+(\/[a-z0-9-]+)?$/); });
  it('answer block of 120 words or more (RECETTE §21)', () => expect(words(p.resume)).toBeGreaterThanOrEqual(120));
  it('FAQ: 4 to 8, unique, 42 to 88 words (RECETTE §7)', () => faqCheck(p.faqs, 4, 8));
  it('links, sources, tool arguments', () => {
    expect(() => p.body(h)).not.toThrow();
    for (const r of p.related) expect(ids.has(r), `related ${r}`).toBe(true);
    expect(p.related.length).toBeGreaterThanOrEqual(3);
    expect(p.sources.length + (p.schoolSources?.length ?? 0) + (p.extSources?.length ?? 0)).toBeGreaterThanOrEqual(3);
    for (const x of p.extSources ?? []) expect(x.url, x.label).toMatch(/^https:\/\//);
    for (const s of p.sources) expect(!!SOURCES[s], s).toBe(true);
    for (const s of p.schoolSources ?? []) expect(hasSchool(s), s).toBe(true);
    if (p.toolArgs?.goal) expect(GOAL_LIST.some((g) => g.id === p.toolArgs!.goal), p.toolArgs.goal).toBe(true);
    for (const s of [p.toolArgs?.school, ...(p.toolArgs?.schools ?? [])].filter(Boolean)) expect(hasSchool(s!), s).toBe(true);
    minis(p.body(h)); miniPlace(p.body(h));
  });
  it('no banned phrase, no dash', () => clean([p.title, p.description, p.h1, p.intro, p.resume, p.card, ...p.faqs.flatMap((f) => [f.q, f.a]), p.body(h)].join(' ')));
  it('body: 450+ words of prose outside tables, one mini at least (RECETTE §9.3)', () => {
    const b = p.body(h);
    expect(words(b.replace(/<table[\s\S]*?<\/table>/g, ''))).toBeGreaterThanOrEqual(450);
    expect(b).toMatch(/<!--mini:/);
  });
});

describe.each(schools.map((p) => [schoolId(p.slug), p] as const))('school page %s', (_s, p) => {
  const S = schoolBySlug(p.slug);
  it('snippets (RECETTE §11)', () => { snippet(p.title, p.description); expect(p.title.startsWith(S.short) || p.title.startsWith(S.name), 'title starts with the school name').toBe(true); });
  it('answer block of 120 words or more (RECETTE §21)', () => expect(words(p.resume)).toBeGreaterThanOrEqual(120));
  it('FAQ: 3 to 5, unique, 42 to 88 words, school named', () => { faqCheck(p.faqs, 3, 5); for (const f of p.faqs) expect(f.q.includes(S.short) || f.q.includes(S.name), f.q).toBe(true); });
  it('prose: 300+ words written for this school, related pages exist, one mini at least', () => {
    const b = p.body(h);
    expect(words(b.replace(/<table[\s\S]*?<\/table>/g, ''))).toBeGreaterThanOrEqual(300);
    expect(b).toMatch(/<!--mini:/);
    expect(p.related.length).toBeGreaterThanOrEqual(3);
    for (const r of p.related) expect(ids.has(r), `related ${r}`).toBe(true);
    minis(b); miniPlace(b);
  });
  it('no banned phrase, no dash', () => clean([p.title, p.description, p.intro, p.resume, ...p.faqs.flatMap((f) => [f.q, f.a]), p.body(h)].join(' ')));
});

it('slugs are unique', () => { const s = [...PAGES.map((p) => p.slug), ...SCHOOL_PAGES.map((p) => `schools/${p.slug}`)]; expect(new Set(s).size).toBe(s.length); });
it('150 indexable pages at most (RECETTE §3)', () => { expect(ROUTES.filter((r) => !r.noindex).length).toBeLessThanOrEqual(150); });
