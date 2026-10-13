/** Props prepared server side for the calculators (one place, so every page ships the same objects). */
import { P, MODEL, SCHOOLS, calcSchool } from './data';
import { route } from '../i18n/routes';
import { hasSchoolPage, schoolId } from './pages';
import type { CalcSchool } from './engine/goal';
let cache: CalcSchool[] | null = null;
export const calcSchools = (): CalcSchool[] => (cache ??= SCHOOLS.filter((s) => s.tuition !== null).map((s) => calcSchool(s, hasSchoolPage(s.slug) ? route(schoolId(s.slug), 'en') : null)));
export const common = () => ({ schools: calcSchools(), model: MODEL, methodHref: route('method', 'en') });
export const BLS = P.bls as unknown as { period: string; occupations: Record<string, { soc: string; name: string; employment: number; p25: number; median: number; p75: number }>; managementAnalystsByMetro: Array<{ area: string; median: number }> };
