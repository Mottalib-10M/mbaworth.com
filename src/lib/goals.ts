/** The goals a reader can rank schools on (pure: shared by pages and calculators). */
import type { Goal } from './engine/goal';
export interface GoalDef extends Goal { id: string; label: string; group: 'Class' | 'Industry' | 'Finance segment' | 'Region' | 'Job function' }
const g = (id: string, kind: Goal['kind'], key: string, label: string, group: GoalDef['group']): GoalDef => ({ id, kind, key, label, group });
export const GOAL_LIST: GoalDef[] = [
  g('all', 'all', 'all', 'Any industry (whole class)', 'Class'),
  g('consulting', 'ind', 'consulting', 'Consulting', 'Industry'),
  g('finance', 'ind', 'finance', 'Finance, all segments', 'Industry'),
  g('tech', 'ind', 'tech', 'Technology', 'Industry'),
  g('healthcare', 'ind', 'healthcare', 'Healthcare', 'Industry'),
  g('consumer', 'ind', 'consumer', 'Consumer goods and retail', 'Industry'),
  g('energy', 'ind', 'energy', 'Energy', 'Industry'),
  g('manufacturing', 'ind', 'manufacturing', 'Manufacturing and industrials', 'Industry'),
  g('ib', 'seg', 'ib', 'Investment banking', 'Finance segment'),
  g('pe', 'seg', 'pe', 'Private equity', 'Finance segment'),
  g('vc', 'seg', 'vc', 'Venture capital', 'Finance segment'),
  g('am', 'seg', 'am', 'Asset and investment management', 'Finance segment'),
  g('z-us', 'zone', 'US', 'Working in the United States', 'Region'),
  g('z-europe', 'zone', 'europe', 'Working in Europe, UK included', 'Region'),
  g('z-uk', 'zone', 'UK', 'Working in the United Kingdom', 'Region'),
  g('z-asia', 'zone', 'Asia', 'Working in Asia', 'Region'),
  g('z-me', 'zone', 'Middle East', 'Working in the Middle East', 'Region'),
  g('z-latam', 'zone', 'Latin America', 'Working in Latin America', 'Region'),
  g('z-canada', 'zone', 'Canada', 'Working in Canada', 'Region'),
  g('z-africa', 'zone', 'Africa', 'Working in Africa', 'Region'),
  g('z-oceania', 'zone', 'Oceania', 'Working in Australia and Oceania', 'Region'),
  g('f-consulting', 'fn', 'consulting', 'Job: consulting or strategy', 'Job function'),
  g('f-product', 'fn', 'product', 'Job: product management', 'Job function'),
  g('f-general', 'fn', 'general', 'Job: general management', 'Job function'),
  g('f-marketing', 'fn', 'marketing', 'Job: marketing', 'Job function'),
  g('f-corpfin', 'fn', 'corpfin', 'Job: corporate finance', 'Job function'),
  g('f-operations', 'fn', 'operations', 'Job: operations and supply chain', 'Job function'),
  g('f-bizdev', 'fn', 'bizdev', 'Job: business development and sales', 'Job function'),
  g('f-analytics', 'fn', 'analytics', 'Job: analytics and data', 'Job function'),
];
export const goalById = (id: string): GoalDef => { const x = GOAL_LIST.find((y) => y.id === id); if (!x) throw new Error(`Unknown goal ${id}`); return x; };
