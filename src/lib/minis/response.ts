/** Mini: how much of a class an employment report really describes. */
import type { MiniSpec } from '../mini-types';
import { pc, num } from './_kit';
export default function response(): MiniSpec {
  return {
    title: 'How much of the class a salary figure describes',
    cta: 'See each school’s report',
    inputs: [{ id: 'n', label: 'Graduates', def: 400, max: 5000 }, { id: 's', label: 'Seeking a job', def: 80, unit: '%', max: 100 }, { id: 'r', label: 'Reported a salary', def: 85, unit: '%', max: 100 }],
    run: (v) => { const k = (v.s / 100) * (v.r / 100); return { head: ['Share of the class behind the salary', pc(k * 100)], rows: [['Graduates behind the figure', num(v.n * k)], ['Not seeking (sponsored, start-ups, studies)', num(v.n * (1 - v.s / 100))]], note: 'Sponsored students and founders are usually out of the salary count.' }; },
  };
}
