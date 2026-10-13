/** Props prepared server side for the calculators (one place, so every page ships the same objects). */
import { P, CALC_SCHOOLS, SCHOOLS, SC_META, BANDS, type School } from './data';
import { route } from '../i18n/routes';
import { hasCollegePage, collegeId } from './pages';
import { satCurve, type SatNational } from './engine/satpct';
import type { OddsRule } from './engine/odds';
import type { ActToSat, SatToAct } from './engine/concord';
import { usd } from './fmt';
export { coaOf, COAS } from './coa';

export const RULE = P.odds as unknown as OddsRule;
export const A2S = P.concordance.actToSat as unknown as ActToSat;
export const S2A = P.concordance.satToAct as unknown as SatToAct;
export const CURVE = satCurve(P.sat as unknown as SatNational);
export const NET_YEAR = SC_META.years.net;
export const TUITION_YEAR = SC_META.years.tuition;
export const schoolHrefs = (): Record<string, string> => Object.fromEntries(SCHOOLS.filter((s) => hasCollegePage(s.slug)).map((s) => [s.slug, route(collegeId(s.slug), 'en')]));
export const common = () => ({ schools: CALC_SCHOOLS(), rule: RULE, bands: BANDS, bandLabels: SC_META.incomeBands, netYear: NET_YEAR, methodHref: route('method', 'en') });

export { usd };
