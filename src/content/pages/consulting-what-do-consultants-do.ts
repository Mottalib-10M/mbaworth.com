import { definePage } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

// BLS Occupational Outlook Handbook, Management Analysts, read on 2026-10-13 (source bls_ooh_ma):
// median annual wage by industry, May 2025, and the one-line job summary.
const IND = [
  { name: 'Professional, scientific and technical services', median: 107330 },
  { name: 'Management of companies and enterprises', median: 101030 },
  { name: 'Finance and insurance', median: 100300 },
  { name: 'Government, excluding state and local education and hospitals', median: 97300 },
];
const bls = K.P.bls.occupations['131111'];
// Example project used on this page: the defaults of the fee calculator, stated as assumptions.
const EX = { weeks: 10, team: 4 };
const bigRow = K.top('consulting', 10).reduce((a, b) => (b.share > a.share ? b : a));
const tuck = K.s(bigRow.slug);
const tuckFn = tuck.emp.functions.find((r) => r.key === 'consulting')!;

export default definePage({
  id: 'consulting-what-do-consultants-do',
  group: 'consulting',
  order: 3,
  slug: 'consulting/what-do-consultants-do',
  nav: 'What consultants do',
  card: 'A consulting project week by week: the team, the deliverables, the travel, the hours and how people are staffed.',
  title: 'Consultants at Work 2026: What They Do, Week by Week',
  description: `What do consultants do in 2026? A project week by week, who does what from partner to consultant, deliverables, travel and staffing, with BLS pay of ${K.usd(bls.median)}.`,
  h1: 'What consultants do, one project at a time',
  intro: 'A consultant spends the year on a sequence of projects, each a few weeks to a few months long, each with a client, a question and a final meeting.',
  resume: `Consultants solve one client problem at a time, in a team, against a deadline. A typical strategy project brings a partner, a manager and a few consultants to a client for some weeks: the first ones go to framing the question and collecting data, the middle to analysis and interviews, the last to building the recommendation and presenting it to the people who decide. The consultant owns one workstream, such as the market model or the cost analysis, writes the pages that come from it and presents them to client managers. Then the project ends and the consultant is staffed on the next one, often in another industry. The BLS summary of the occupation is short: management analysts "recommend ways to improve an organization's efficiency". It counts ${K.num(bls.employment)} of them in the United States in ${K.P.bls.period}, at a median of ${K.usd(bls.median)}, and those working in professional services firms, the consulting firms themselves, earned a median of ${K.usd(IND[0].median)}.`,
  faqs: [
    { q: 'What does a consultant do on a typical day at a client?', a: 'Mornings often start with a team check-in on what each workstream must show by the end of the week. The day then mixes interviews with client managers, data work on the client\'s numbers, building slides that state one finding each, and a call with experts or customers. Evenings go to revising pages after the manager\'s review. A partner joins for the meetings that matter.' },
    { q: 'How many hours a week do management consultants work?', a: 'Long ones, and unevenly. No public statistic separates strategy consultants from other management analysts, so we give no figure. The pattern is stable across firms: the weeks before a steering committee or a final presentation are the heaviest, the first week of a project and the time between projects are lighter. Firms run programs to protect some evenings and weekends, with mixed results.' },
    { q: 'Do consultants travel every week?', a: 'Many do, depending on the firm, the office and the client. The classic model puts the team at the client\'s site for most of the week and back in its home office at the end of it. Since remote work spread, more projects mix client days with remote days. Consultants based in small markets or in specialist practices travel more, often abroad.' },
    { q: 'What is a deliverable in a consulting project?', a: 'It is what the client receives: most often a presentation document that states the recommendation and the evidence, sometimes a financial model, an implementation plan or a tool the client keeps. Interim deliverables come at steering committee meetings along the way. A good deliverable can be read without the consultant in the room, one finding per page.' },
    { q: 'How are consultants assigned to projects at a consulting firm?', a: 'Through staffing. A staffing team matches open projects with available people, weighing the consultant\'s wishes, the skills the project needs and the partner\'s requests. Early on, most firms keep MBA hires generalist, moving them between industries and functions; later they settle in a practice. The time between projects, called being on the beach, goes to proposals and internal work.' },
  ],
  body: (h) => `<h2>A project, week by week</h2>
<p>Take as an example a ${EX.weeks}-week strategy project with ${EX.team} consultants, a manager and a partner; those are the defaults of the fee calculator on this page and our assumptions, not a firm's figures. The client is a consumer goods company asking whether to cut its prices in one product line.</p>
<p><strong>Before the start.</strong> The partner has sold the project with a proposal that states the question, the scope and the final deliverable. The manager plans the workstreams: one on the market and competitors, one on customer behavior, one on the client's costs and margins. Each consultant gets one.</p>
<p><strong>First weeks: framing and data.</strong> The team writes the question as a set of hypotheses to prove or kill: price cuts win volume, competitors will follow, margins can absorb it. Data requests go to the client, interviews are booked with sales, finance and marketing managers, and a customer survey is designed. The first steering committee, a short meeting with the client's senior team, agrees on the hypotheses.</p>
<p><strong>Middle weeks: analysis.</strong> Each workstream builds its piece: a model of demand at different prices, a map of competitors' past reactions, a cost curve. The manager reviews the pages daily and pushes the team to write each one as a sentence with its evidence. Findings that change the answer go to the partner at once. A second steering committee hears the first results and redirects work where they are weak.</p>
<p><strong>Last weeks: the answer.</strong> The team writes the story from the conclusion down, tests it with each client manager one to one so there is no surprise, and presents it to the people who decide. Often the project ends with a plan to carry out the decision, and sometimes with a second project to implement it.</p>
${h.miniGoal(bigRow.slug)}
<h2>Who does what on the team</h2>
<p>The partner owns the client relationship and the final answer. They sell the project, come to the key meetings, and decide what the team says when it matters, but spend only part of their week on any one project. The manager, called engagement manager or project leader depending on the firm, runs the team every day: plans the work, reviews every page, handles the client's day-to-day contacts. Consultants, the level most MBA graduates join, each own a workstream: they gather the data, build the analysis, write the pages and present them to client managers. Analysts hired from undergraduate programs do much of the modeling and research. Experts from the firm's practices join for a day or a week when the question needs them.</p>
<p>For an MBA hire, the step from student to consultant is mostly about ownership. From the first project you are the person the client calls about your part, and the manager judges you on whether that part is right and clear. That is why ${h.a('consulting-case-interview', 'case interviews')} test structured thinking and how you explain a number, not knowledge of an industry.</p>
<h2>Deliverables, travel and hours</h2>
<p>The main deliverable is a document, usually slides, in which each page states one finding in its title and shows the proof below. Around it come financial models the client keeps, plans with owners and dates, and sometimes data tools. Travel depends on the firm, the office and the client: the classic model puts the team at the client most of the week, while many projects now mix client and remote days. Hours are long and uneven, heaviest before a steering committee or the final meeting. We give no figure for hours because no public statistic separates strategy consultants from the wider occupation.</p>
<h2>Staffing between projects</h2>
<p>A consultant's year is a chain of projects chosen by staffing: a team that matches open projects with available people, weighing what the consultant asks for and what partners need. Most firms keep new MBA hires generalist for the first years, so the second project can be a bank after a retailer. Over time people settle in a practice, an industry or a function, and the most senior work almost only with a few clients. ${tuck.short}, the school with the largest consulting share among the first ten of our consulting ranking, reports ${K.p(tuckFn.pct!)} of its class in consulting jobs: a pipeline that size feeds many staffing pools.</p>
<h2>Where consultants work, according to the BLS</h2>
<p>Management analysts are not only in consulting firms. The BLS handbook gives median pay by the industry that employs them, for ${K.P.bls.period}:</p>
${h.table(['Industry', 'Median annual wage'], IND.map((x) => [x.name, K.usd(x.median)]), `Management analysts, median annual wage by industry, ${K.P.bls.period} (BLS Occupational Outlook Handbook).`, ['l', 'r'])}
<p>Professional, scientific and technical services, the category of consulting firms, pays the highest median, ${K.usd(IND[0].median)}, against ${K.usd(IND[3].median)} for the federal government. These are national medians for the whole occupation, far below what the large strategy firms pay MBA hires; the ${h.a('consulting-consultant-salary', 'consultant salary page')} compares them. The calculator above estimates the fee of a project from the team, the length and a weekly fee you type: try the example of this page and change the length to see how a client's budget sets the size of the work.</p>`,
  tool: 'project',
  toolArgs: {},
  related: ['consulting', 'consulting-what-is-strategy-consulting', 'consulting-consultant-salary', 'consulting-case-interview', 'best-mba-consulting'],
  sources: ['bls_ooh_ma', 'bls_oews', 'mbacsea'],
  schoolSources: [bigRow.slug],
});
