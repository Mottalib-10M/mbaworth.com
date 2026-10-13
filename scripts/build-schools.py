#!/usr/bin/env python3
"""research/schools/<slug>.json (facts read at each school, written by the research agents)
-> src/data/schools.json (one normalised list read by the site).

The research files are never edited here. This script only:
  - turns the many ways schools publish a figure into one shape (program total, annual salary, zone shares);
  - records, for each figure, HOW it was turned (multiplied by two academic years, UK visa floor...), so that
    the page can say it;
  - refuses a figure it cannot interpret (it becomes null, and the page says it is missing).
Overrides that need a human decision live in research/normalize.json (our file, with a reason per line).
Figures read later in a browser on official pages closed to robots live in research/overrides/<slug>.json
(same schema as the research file, each with its URL and date); they are merged over the research file.
A file that does not parse (an agent still writing it) is skipped with a warning, never half-read.

Usage: python3 scripts/build-schools.py [--strict]
"""
import json, glob, os, re, sys, math

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = json.load(open(f'{R}/src/data/params-2026.json'))
FX = P['fx']['usdPer']
UKVI = P['ukvi']
OV = json.load(open(f'{R}/research/normalize.json')) if os.path.exists(f'{R}/research/normalize.json') else {}
strict = '--strict' in sys.argv
warn = []

def num(x):
    if isinstance(x, bool) or x is None:
        return None
    if isinstance(x, (int, float)):
        return float(x) if math.isfinite(x) else None
    return None

def usd(v, cur):
    if v is None or cur not in FX:
        return None
    return round(v * FX[cur])

ZONES = ['US', 'Canada', 'UK', 'Europe', 'Asia', 'Middle East', 'Africa', 'Latin America', 'Oceania']
CANON = {'US': 'US', 'Canada': 'Canada', 'UK': 'UK', 'Europe': 'Europe', 'Asia': 'Asia', 'Middle East': 'Middle East', 'Africa': 'Africa', 'Latin America': 'Latin America', 'Oceania': 'Oceania'}

def zone_of(region):
    r = (region or '').strip()
    if r in CANON:
        return CANON[r], True
    if r.startswith('US'):
        return 'US', r in ('US',)
    if r == 'North America':
        return 'US', False          # North America counted as the US zone only when nothing finer exists, flagged
    if r in ('United Kingdom',):
        return 'UK', False
    if r.startswith('Europe') or r in ('Switzerland', 'Western Europe', 'Continental Europe'):
        return 'Europe', False
    if r in ('Middle East & Africa', 'Africa/Middle East', 'Middle East and Africa', 'MENA'):
        return 'Middle East', False
    if r.startswith('Asia') or r in ('China', 'Hong Kong', 'Singapore', 'India', 'Japan', 'Korea', 'Greater China', 'South Asia', 'East Asia', 'Southeast Asia'):
        return 'Asia', False
    if r in ('South America', 'Central America', 'Latin America & Caribbean'):
        return 'Latin America', False
    if r in ('Australia', 'New Zealand', 'Australia/New Zealand'):
        return 'Oceania', False
    return None, False

SEG = [
    ('ib', re.compile(r'invest\w*\s*bank|brokerage|\bIB\b', re.I)),
    ('pe', re.compile(r'private equity|buyout', re.I)),
    ('vc', re.compile(r'venture', re.I)),
    ('am', re.compile(r'asset manag|investment manag|hedge|portfolio|wealth', re.I)),
]
FUN = [
    ('consulting', re.compile(r'consult', re.I)),
    ('product', re.compile(r'product manag|product/', re.I)),
    ('ib', re.compile(r'investment bank', re.I)),
    ('investor', re.compile(r'private equity|venture|investor', re.I)),
    ('general', re.compile(r'general manag|leadership|rotational|management develop', re.I)),
    ('marketing', re.compile(r'marketing|brand', re.I)),
    ('corpfin', re.compile(r'corporate finance|finance/accounting|financial analysis|treasury|\bfinance\b', re.I)),
    ('operations', re.compile(r'operation|supply chain|logistics', re.I)),
    ('bizdev', re.compile(r'business develop|sales', re.I)),
    ('analytics', re.compile(r'analytic|data', re.I)),
]

def months_of(d):
    p = d.get('program') or {}
    m = num(p.get('length_months'))
    fmt = str(p.get('format') or '')
    o = OV.get(d['slug'], {})
    if 'months' in o:
        return o['months'], True, o.get('months_reason', '')
    if m:
        return m, False, p.get('length_note') or ''
    if re.search(r'2-year|two-year|two years', fmt, re.I):
        return 21.0, True, 'Two-year format; 21 months assumed (two academic years).'
    if re.search(r'1-year|one-year', fmt, re.I):
        return 12.0, True, 'One-year format; 12 months assumed.'
    return None, True, ''

PER_YEAR = re.compile(r'per year|annual|year 1|first year|one academic year|academic year|\b9 months|\b12 months|52 weeks|per annum', re.I)
FULL = re.compile(r'full|total|whole|entire|programme|program year|\d+-month program', re.I)

def program_total(block, months, two_year, what):
    """Returns (value, multiplier, note) for a tuition or living block, or (None, None, reason)."""
    if not isinstance(block, dict):
        return None, None, 'not published'
    v = num(block.get('value'))
    if v is None:
        return None, None, block.get('note') or block.get('notes') or 'not published'
    per = str(block.get('period') or '')
    if re.search(r'full program|full programme|whole program|entire program|^total|programme total|program total', per, re.I) or (FULL.search(per) and not re.search(r'year 1|per year|one academic year', per, re.I)):
        return v, 1, ''
    if PER_YEAR.search(per):
        if two_year:
            return v * 2, 2, f'{what}: the school publishes one academic year; two academic years counted.'
        mm = re.search(r'(\d+)\s*months', per)
        basis = float(mm.group(1)) if mm else 12.0
        if months and months > basis:
            f = round(months / basis, 4)
            return round(v * f), f, f'{what}: the school publishes {int(basis)} months; scaled to the {int(months)}-month program.'
        return v, 1, ''
    if not per or per == 'None':
        return v, 1, ''
    warn.append(f"{block.get('url', '')}: period « {per} » not understood for {what}, kept as published")
    return v, 1, ''

PPP = P.get('ppp', {}).get('lcuPerIntlDollar', {})
LCU = {'GBR': 'GBP', 'NLD': 'EUR', 'DEU': 'EUR', 'FRA': 'EUR', 'ESP': 'EUR', 'ITA': 'EUR', 'CHE': 'CHF'}

def unppp(d, iso):
    """A school that publishes salaries in PPP dollars: back to its own currency with the World Bank factor."""
    f, cur = PPP[iso], LCU[iso]
    e = d.get('employment') or {}
    bs = e.get('base_salary') or {}
    if num(bs.get('value')) is not None:
        bs['value'] = round(bs['value'] * f); bs['currency'] = cur
        bs['note'] = (str(bs.get('note') or '') + f' Published in PPP dollars; converted to {cur} with the World Bank 2025 PPP factor ({f}).').strip()
    for key in ('by_industry', 'by_geography', 'by_function'):
        for r in e.get(key) or []:
            if num(r.get('salary')) is not None:
                r['salary'] = round(r['salary'] * f); r['currency'] = cur

def build(d):
    slug = d['slug']
    o = OV.get(slug, {})
    if o.get('ppp'):
        unppp(d, o['ppp'])
    p = d.get('program') or {}
    months, mderived, mnote = months_of(d)
    fmt = str(p.get('format') or '')
    two_year = bool(re.search(r'2-year|two-year', fmt, re.I)) or (months or 0) >= 20
    cs = p.get('class_size') or {}
    cls = num(cs.get('value'))
    t = d.get('tuition_total') or {}
    cur = t.get('currency') or (d.get('employment') or {}).get('base_salary', {}).get('currency') or 'USD'
    tv, tmult, tnote = program_total(t, months, two_year, 'Tuition')
    f = d.get('mandatory_fees_total') or {}
    if o.get('fees_drop'):
        f = {}
    fv, fmult, fnote = program_total(f, months, two_year, 'Fees') if num(f.get('value')) is not None else (None, None, f.get('note') or '')
    if fv is not None and f.get('currency') and f.get('currency') != cur:
        fv = round(fv * FX[f['currency']] / FX[cur]); fnote = (fnote + ' Converted to the tuition currency.').strip()
    lv_block = d.get('living_budget_total') or {}
    lv, lmult, lnote = program_total(lv_block, months, two_year, 'Living budget')
    if o.get('living_drop'):
        lv, lnote = None, ''
        lv_block = {**lv_block, 'note': o['living_drop']}
    lbasis = 'school' if lv is not None else None
    lcur = lv_block.get('currency') or cur
    if lv is None and d.get('country') in ('UK', 'GB'):
        london = (d.get('city') or '').lower() == 'london'
        monthly = UKVI['londonMonthly'] if london else UKVI['outsideMonthly']
        if months:
            lv, lbasis, lcur = monthly * months, 'visa', 'GBP'
            lnote = f"No school budget published: UK student visa minimum ({'London' if london else 'outside London'}) for each month of the program, a floor rather than a budget."
    if lv is not None and lcur != cur:
        lv = round(lv * FX[lcur] / FX[cur])
    if 'living_usd_override' in o:
        raise SystemExit('living overrides must be documented in local currency')
    sch = d.get('scholarship') or {}
    e = d.get('employment') or {}
    bs = e.get('base_salary') or {}
    scur = bs.get('currency') or cur
    sval = num(bs.get('value'))
    skind = None
    if sval is not None:
        period = str(bs.get('period') or '')
        basis = str(bs.get('basis') or '')
        stat = str(bs.get('stat') or '')
        if period == 'month' or re.search(r'monthly', period, re.I):
            skind = 'monthly'
        elif re.search(r'total comp|TOTAL compensation|package', basis + stat, re.I):
            skind = 'total-mean' if 'mean' in stat or 'average' in basis.lower() else 'total-median'
        else:
            skind = 'base-median' if stat == 'median' else 'base-mean' if stat == 'mean' else None
        if o.get('salary_kind'):
            skind = o['salary_kind']
    if o.get('salary_drop'):
        sval = None
        bs = {**bs, 'note': o['salary_drop']}
    salary = None
    if sval is not None and skind in ('base-median', 'base-mean', 'total-mean', 'total-median'):
        salary = {'v': sval, 'cur': scur, 'kind': skind, 'usd': usd(sval, scur), 'p25': num(bs.get('p25')), 'p75': num(bs.get('p75')), 'note': bs.get('note') or bs.get('notes') or ''}
    elif sval is not None:
        warn.append(f'{slug}: salary of kind {skind} kept out of the comparisons')
    sb = e.get('signing_bonus') or {}
    bonus = None
    if num(sb.get('value')) is not None:
        bcur = sb.get('currency') or scur
        bonus = {'v': num(sb.get('value')), 'cur': bcur, 'usd': usd(num(sb.get('value')), bcur), 'pct': num(sb.get('pct_receiving')), 'stat': sb.get('stat') or '', 'note': sb.get('note') or ''}
    im = e.get('internship_monthly')
    intern = None
    if isinstance(im, dict) and num(im.get('value')) is not None:
        icur = im.get('currency') or scur
        intern = {'monthly': num(im.get('value')), 'cur': icur, 'usd': usd(num(im.get('value')), icur), 'stat': im.get('stat') or ''}
    elif num(im) is not None:
        intern = {'monthly': num(im), 'cur': scur, 'usd': usd(num(im), scur), 'stat': ''}
    # industries: one row per normalised industry (the "total" row when the school gives one, else a lone row,
    # else the sum of shares and no salary), plus finance segments.
    rows = e.get('by_industry') or []
    inds = {}
    for r in rows:
        k = r.get('industry')
        if not k:
            continue
        inds.setdefault(k, []).append(r)
    industries = []
    all_sum = sum(num(r.get('pct')) or 0 for r in rows)
    nested = all_sum > 102          # some rows are parents of others: never add a parent to its children
    for k, rs in inds.items():
        tot = [r for r in rs if re.search(r'\(total\)|\btotal\b|aggregate', str(r.get('sub') or ''), re.I)]
        shares = [num(r.get('pct')) or 0 for r in rs]
        big = max(rs, key=lambda r: num(r.get('pct')) or 0)
        if k in o.get('industry_sum', []):
            tot, nested_k = [], False
        else:
            nested_k = nested
        if tot:
            r = tot[0]; pct, sal, stat, lab = num(r.get('pct')), num(r.get('salary')), r.get('stat'), str(r.get('sub') or k)
        elif len(rs) == 1:
            r = rs[0]; pct, sal, stat, lab = num(r.get('pct')), num(r.get('salary')), r.get('stat'), str(r.get('sub') or k)
        elif nested_k and (num(big.get('pct')) or 0) >= 0.95 * (sum(shares) - (num(big.get('pct')) or 0)):
            r = big; pct, sal, stat, lab = num(r.get('pct')), num(r.get('salary')), r.get('stat'), str(r.get('sub') or k)
        else:
            pct = round(sum(shares), 1) if any(num(r.get('pct')) is not None for r in rs) else None
            sal, stat, lab = None, None, ' + '.join(str(r.get('sub') or k) for r in rs)
        rcur = (rs[0].get('currency') or scur)
        industries.append({'key': k, 'label': lab, 'pct': pct, 'salary': sal, 'stat': stat, 'cur': rcur, 'usd': usd(sal, rcur)})
    segments = []
    for key, rx in SEG:
        for r in rows:
            sub = str(r.get('sub') or '')
            # a segment is a sub-row: never the lone line of the industry, never a total, never a whole-sector line
            if r.get('industry') in ('finance', 'tech') and len(inds.get(r.get('industry'), [])) > 1 and rx.search(sub) and not re.search(r'\(total\)|financial services|BFSI', sub, re.I):
                if key == 'vc' and re.search(r'private equity', sub, re.I):
                    continue
                if key == 'ib' and re.search(r'commercial', sub, re.I):
                    continue
                if key == 'am' and re.search(r'private equity|venture', sub, re.I):
                    continue
                rcur = r.get('currency') or scur
                segments.append({'key': key, 'label': sub, 'pct': num(r.get('pct')), 'salary': num(r.get('salary')), 'stat': r.get('stat'), 'cur': rcur, 'usd': usd(num(r.get('salary')), rcur)})
                break
    # zones
    geo_rows = e.get('by_geography') or []
    canon, loose = {}, {}
    for r in geo_rows:
        z, is_canon = zone_of(r.get('region'))
        if not z:
            continue
        (canon if is_canon else loose).setdefault(z, []).append(r)
    zones = []
    geo_sum = sum(num(r.get('pct')) or 0 for r in geo_rows if zone_of(r.get('region'))[0])
    gnested = geo_sum > 102 and not o.get('zones_sum')
    non_us = sum(num(r.get('pct')) or 0 for r in geo_rows if zone_of(r.get('region'))[0] not in (None, 'US'))
    for z in ZONES:
        rs = canon.get(z) or loose.get(z)
        if not rs:
            continue
        exact = z in canon or all(str(r.get('region')).startswith('US') for r in rs)
        if z == 'US' and any(str(r.get('region')).startswith('US') for r in rs):
            rs = [r for r in rs if str(r.get('region')).startswith('US')]
        derived = ''
        shares = [num(r.get('pct')) for r in rs]
        if len(rs) == 1:
            pct = shares[0]
        elif not gnested:
            pct = round(sum(x for x in shares if x is not None), 1) if any(x is not None for x in shares) else None
        elif z == 'US' and d.get('country') == 'US' and non_us > 0:
            pct, derived = round(100 - non_us, 1), 'derived: 100% minus the shares placed outside the US'
        else:
            pct, derived = max(x for x in shares if x is not None), 'largest of overlapping rows'
        if not exact and len({str(r.get('region')) for r in rs}) > 1 and z != 'US':
            pct, derived = max(x for x in shares if x is not None), 'largest of overlapping rows'
        sal = num(rs[0].get('salary')) if len(rs) == 1 else None
        if z in o.get('zone_salary_null', []):
            sal = None
        labels = sorted({str(r.get('label') or r.get('region')) for r in rs})
        rcur = rs[0].get('currency') or scur
        zones.append({'zone': z, 'label': ' + '.join(labels), 'exact': exact, 'derived': derived, 'pct': pct, 'salary': sal, 'cur': rcur, 'usd': usd(sal, rcur), 'detail': '; '.join(str(r.get('detail')) for r in rs if r.get('detail'))})
    functions = []
    for r in e.get('by_function') or []:
        lab = str(r.get('function') or '')
        key = next((k for k, rx in FUN if rx.search(lab)), 'other')
        rcur = r.get('currency') or scur
        functions.append({'key': key, 'label': lab, 'pct': num(r.get('pct')), 'salary': num(r.get('salary')), 'cur': rcur, 'usd': usd(num(r.get('salary')), rcur)})
    employers = [{'name': str(x.get('name')), 'hires': num(x.get('hires'))} for x in (e.get('top_employers') or []) if x.get('name')]
    emp_pct = num(e.get('accepted_3m_pct')); emp_label = 'accepted an offer within three months'
    if emp_pct is None and num(e.get('employed_3m_pct')) is not None:
        emp_pct, emp_label = num(e.get('employed_3m_pct')), 'employed within three months'
    if emp_pct is None and num(e.get('offer_3m_pct')) is not None:
        emp_pct, emp_label = num(e.get('offer_3m_pct')), 'had an offer within three months'
    if emp_pct is None and num(e.get('offers_pct_seeking')) is not None:
        emp_pct, emp_label = num(e.get('offers_pct_seeking')), 'of job seekers reported an offer'
    pr = d.get('profile') or {}
    gmat = num(pr.get('gmat_median')); gmat_lab = 'median'
    if gmat is None and num(pr.get('gmat_mean')) is not None:
        gmat, gmat_lab = num(pr.get('gmat_mean')), 'average'
    ranks = [{'ranking': str(x.get('ranking')), 'rank': num(x.get('rank')), 'url': x.get('url') or ''} for x in (d.get('rankings_cited') or []) if num(x.get('rank'))]
    total_local = None
    if tv is not None:
        total_local = tv + (fv or 0) + (lv or 0) if lv is not None else None
    return {
        'slug': slug, 'name': d.get('name') or slug, 'short': d.get('short') or d.get('name') or slug,
        'country': d.get('country') or '', 'city': d.get('city') or '', 'region': d.get('region') or '',
        'campuses': d.get('campuses') or [],
        'months': months, 'monthsDerived': mderived, 'monthsNote': mnote, 'format': fmt, 'twoYear': two_year,
        'classSize': cls, 'classSizeText': '' if cls is not None else str(cs.get('value') or ''), 'classCohort': cs.get('cohort') or '',
        'cur': cur,
        'tuition': None if tv is None else {'v': tv, 'mult': tmult, 'note': tnote, 'cohort': re.sub(r'\s*\((?:per|read|seen|via)[^)]*\)', '', str(t.get('cohort') or '')).strip(), 'url': t.get('url') or '', 'readOn': t.get('read_on') or '', 'raw': num(t.get('value')), 'period': t.get('period') or ''},
        'fees': None if fv is None else {'v': fv, 'note': fnote, 'url': f.get('url') or '', 'raw': num(f.get('value'))},
        'living': None if lv is None else {'v': lv, 'basis': lbasis, 'note': lnote, 'url': lv_block.get('url') or (P['sources']['ukvi_money']['url'] if lbasis == 'visa' else ''), 'readOn': lv_block.get('read_on') or '', 'raw': num(lv_block.get('value')), 'period': lv_block.get('period') or ''},
        'livingMissing': None if lv is not None else (lv_block.get('note') or lv_block.get('notes') or 'No living budget published by the school.'),
        'scholarship': {'v': num(sch.get('value')), 'note': sch.get('note') or sch.get('notes') or '', 'url': sch.get('url') or ''},
        'directLocal': None if tv is None else tv + (fv or 0),
        'totalLocal': total_local,
        'emp': {
            'cohort': e.get('cohort') or '', 'standard': e.get('standard') or '', 'url': e.get('report_pdf') or e.get('report_url') or e.get('url') or '', 'page': e.get('url') or e.get('report_url') or '',
            'readOn': e.get('read_on') or '', 'response': num(e.get('response_rate')), 'employed': emp_pct, 'employedLabel': emp_label,
            'salary': salary, 'salaryMissing': None if salary else (bs.get('note') or bs.get('notes') or 'No graduate salary published by the school.'),
            'bonus': bonus, 'intern': intern, 'industries': industries, 'segments': segments, 'zones': zones, 'functions': functions, 'employers': employers,
        },
        'profile': {'intl': num(pr.get('intl_pct')), 'age': num(pr.get('avg_age')), 'exp': num(pr.get('avg_work_exp_years')), 'women': num(pr.get('women_pct')), 'gmat': gmat, 'gmatLabel': gmat_lab, 'countries': num(pr.get('countries') or pr.get('nationalities')), 'cohort': pr.get('cohort') or '', 'url': pr.get('url') or ''},
        'ranks': ranks,
    }

def merge(a, b):
    """Deep merge of an override onto a research file: dicts merge, every other value (lists included) replaces."""
    for k, v in b.items():
        if k.startswith('_'):
            continue
        if isinstance(v, dict) and isinstance(a.get(k), dict):
            merge(a[k], v)
        else:
            a[k] = v
    return a

out, bad, overridden = [], [], []
for fpath in sorted(glob.glob(f'{R}/research/schools/*.json')):
    try:
        d = json.load(open(fpath))
    except Exception as ex:
        bad.append(f'{os.path.basename(fpath)}: {ex}')
        continue
    ov = f"{R}/research/overrides/{os.path.basename(fpath)}"
    if os.path.exists(ov):
        merge(d, json.load(open(ov)))
        overridden.append(d['slug'])
    if d.get('slug') != os.path.basename(fpath)[:-5]:
        bad.append(f'{os.path.basename(fpath)}: slug differs from file name'); continue
    try:
        out.append(build(d))
    except Exception as ex:
        bad.append(f'{os.path.basename(fpath)}: {type(ex).__name__} {ex}')
json.dump({'built': P['retrieved_at'], 'fxDate': P['fx']['date'], 'schools': out}, open(f'{R}/src/data/schools.json', 'w'), indent=0, ensure_ascii=False)
print(f'{len(out)} schools written to src/data/schools.json; overrides (research/overrides, sources read in a browser): {", ".join(overridden) or "none"}')
for b in bad:
    print('SKIPPED', b)
for w in warn:
    print('note', w)
if strict and bad:
    sys.exit(1)
