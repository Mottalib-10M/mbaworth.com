/** What a consulting engagement costs the client: team, weeks and the rate per consultant-week you assume. */
import { useState } from 'react';
import NumberField from '../ui/NumberField';
import { Card, Result, Rows, Note, usd, num } from './parts';

interface Props { methodHref: string; idPrefix?: string }
export default function ProjectCalc({ methodHref, idPrefix = 'prj' }: Props) {
  const [team, setTeam] = useState(4);
  const [weeks, setWeeks] = useState(10);
  const [rate, setRate] = useState(40000);
  const [partner, setPartner] = useState(20);
  const fee = team * weeks * rate * (1 + partner / 100);
  return (
    <Card form={<>
      <NumberField id={`${idPrefix}-team`} label="Consultants on the team" value={team} onChange={setTeam} max={100} />
      <NumberField id={`${idPrefix}-weeks`} label="Length of the project" value={weeks} onChange={setWeeks} unit="weeks" max={200} />
      <NumberField id={`${idPrefix}-rate`} label="Fee per consultant-week" value={rate} onChange={setRate} unit="$" max={1000000} help="Your assumption" />
      <NumberField id={`${idPrefix}-partner`} label="Partner and expert time on top" value={partner} onChange={setPartner} unit="%" max={300} />
    </>}>
      <Result label="Fee for the engagement" figure={usd(fee)}>
        <Rows rows={[['Consultant-weeks', num(team * weeks)], ['Fee per week of project', usd(weeks > 0 ? fee / weeks : 0)], ['Fee per consultant-week, all in', usd(team * weeks > 0 ? fee / (team * weeks) : 0)]]} />
        <Note methodHref={methodHref}>Firms do not publish their rates: the weekly fee is yours to set from a proposal or a public contract.</Note>
      </Result>
    </Card>
  );
}
