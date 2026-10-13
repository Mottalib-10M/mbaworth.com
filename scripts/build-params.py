#!/usr/bin/env python3
"""Builds src/data/params-2026.json from the official raw files in research/official/ (ECB rates, BLS OEWS)
plus the fixed assumptions of the ROI model. Run after refreshing the raw files:
  curl -s https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml > research/official/ecb-eurofxref-<date>.xml
"""
import json, glob, os, re
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ecb = sorted(glob.glob(f'{R}/research/official/ecb-eurofxref-*.xml'))[-1]
x = open(ecb).read()
day = re.search(r"time='([\d-]+)'", x).group(1)
eur = {m.group(1): float(m.group(2)) for m in re.finditer(r"currency='([A-Z]{3})' rate='([\d.]+)'", x)}
usd_per_eur = eur['USD']
# 1 unit of currency C = usd_per_eur / eur[C] US dollars
fx = {'USD': 1.0, 'EUR': round(usd_per_eur, 6)}
for c in ['GBP', 'CHF', 'CNY', 'HKD', 'INR', 'SGD', 'KRW', 'AUD', 'CAD', 'JPY']:
    fx[c] = round(usd_per_eur / eur[c], 8)
b = json.load(open(f'{R}/research/official/bls-oews-2025-api.json'))
vals = {}
for res in (b['a'], b['b']):
    for s in res['Results']['series']:
        if s['data']:
            vals[s['seriesID']] = int(s['data'][0]['value'])
OCC = {'131111': 'Management analysts', '132051': 'Financial and investment analysts', '413031': 'Securities, commodities and financial services sales agents', '113031': 'Financial managers', '112021': 'Marketing managers', '113021': 'Computer and information systems managers', '151252': 'Software developers', '111021': 'General and operations managers', '152051': 'Data scientists'}
occ = {}
for code, name in OCC.items():
    g = lambda dt: vals.get(f'OEUN0000000000000{code}{dt}')
    occ[code] = {'soc': f'{code[:2]}-{code[2:]}', 'name': name, 'employment': g('01'), 'p25': g('12'), 'median': g('13'), 'p75': g('14')}
METRO = {'0035620': 'New York-Newark-Jersey City', '0041860': 'San Francisco-Oakland-Fremont', '0014460': 'Boston-Cambridge-Newton', '0016980': 'Chicago-Naperville-Elgin', '0047900': 'Washington-Arlington-Alexandria', '0031080': 'Los Angeles-Long Beach-Anaheim', '0042660': 'Seattle-Tacoma-Bellevue'}
metro = [{'area': name, 'median': vals[f'OEUM{a}000000131111' + '13']} for a, name in METRO.items() if f'OEUM{a}000000131111' + '13' in vals]
P = {
  '_readme': 'Every figure of the site that is not read in a school file lives here, from the official source named in `sources`, never typed in a page (RECETTE §4, §17.4). Built by scripts/build-params.py.',
  'year': 2026, 'retrieved_at': '2026-10-13', 'valid_to': '2027-09-30',
  'fx': {'date': day, 'source': 'ecb_fx', 'usdPer': fx, 'note': 'Euro foreign exchange reference rates of the European Central Bank; cross rates to the US dollar computed through the euro.'},
  'model': {
    'refSalary': 90000, 'refSalaryNote': 'Reference pre-MBA salary for the rankings, in US dollars, an assumption of this site (the same for every school, editable in every tool).',
    'g1': 0.05, 'g0': 0.03, 'r': 0.05, 'horizonYears': 10, 'paybackCapYears': 30, 'internMonths': 2.5,
    'weights': {'share': 0.4, 'salary': 0.3, 'npv': 0.3},
    'note': 'g1 and g0: yearly raise with and without the MBA; r: discount rate; internMonths: length of the summer internship counted for two-year programs. Assumptions of this site, shown and editable.'
  },
  'ukvi': {'londonMonthly': 1529, 'outsideMonthly': 1171, 'maxMonths': 9, 'source': 'ukvi_money'},
  'bls': {'period': 'May 2025', 'source': 'bls_oews', 'occupations': occ, 'managementAnalystsByMetro': metro},
  'sources': {
    'ecb_fx': {'label': f'European Central Bank, euro foreign exchange reference rates ({day})', 'url': 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html'},
    'ukvi_money': {'label': 'GOV.UK, Student visa: money to support yourself', 'url': 'https://www.gov.uk/student-visa/money'},
    'bls_oews': {'label': 'U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics, May 2025', 'url': 'https://www.bls.gov/oes/tables.htm'},
    'bls_api': {'label': 'U.S. Bureau of Labor Statistics, public data API (OEWS series)', 'url': 'https://www.bls.gov/developers/'},
    'bls_ooh_ma': {'label': 'BLS Occupational Outlook Handbook, Management Analysts', 'url': 'https://www.bls.gov/ooh/business-and-financial/management-analysts.htm'},
    'mbacsea': {'label': 'MBA CSEA, Standards for Reporting MBA Employment Statistics', 'url': 'https://mbacsea.org'},
    'gmac': {'label': 'GMAC, Graduate Management Admission Council', 'url': 'https://www.gmac.com/'},
    'ft_rankings': {'label': 'Financial Times, Global MBA Ranking 2026', 'url': 'https://rankings.ft.com/'},
  },
}
out = f'{R}/src/data/params-2026.json'
json.dump(P, open(out, 'w'), indent=1, ensure_ascii=False)
print('params written', out, 'fx', day, len(occ), 'occupations', len(metro), 'metros')
