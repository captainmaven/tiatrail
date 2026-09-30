// Curated emphasis for instructional prose only. Questions and answer choices
// stay visually neutral; original wording remains plain text in the content data.
const phrases = [
  'five school years', 'appraisal waiver', 'last Friday in February', 'August 31',
  'Enhanced TIA', 'TRS-eligible', 'support assignment', 'missing observation or growth data',
  'not a guarantee', 'not an automatic designation', 'not a promised individual payout',
  'not a personal payout formula', 'not a TIA designation', 'not final',
  'does not finalize a designation', 'does not award a TIA designation',
  'cannot tell you your individual designation or payout',
  'at least 90%', 'up to 10%', 'campus teacher compensation',
  'Teacher Incentive Allotment', 'recruit and retain', 'high-needs and rural campuses',
  'earning a designation', 'receiving compensation', 'allotment funds',
  'spending plan', 'spending plans', 'local designation criteria', 'local criteria',
  'eligible teaching assignments', 'eligible teaching assignment', 'eligible assignments',
  'state eligibility requirements', 'annual funding eligibility', 'data capture year',
  '087 StaffClassification', 'creditable teaching service', 'not a state requirement',
  'existing designation', 'Acknowledged, Recognized, Exemplary, and Master',
  'Nationally Board Certified', 'separate pathway', 'December 31, 2026',
  'current official guidance', 'final decision', 'school year',
  'student growth and teacher observation', 'observation and student growth',
  'teacher observation and student growth', 'both required',
  'expected growth target', 'expected growth targets', 'percent of students',
  'proficiency and growth', 'progress against a target', 'roster rules',
  'rules for linking students to teachers', '12 ÷ 20 × 100 = 60%',
  'T-TESS Domains 2 and 3', 'statewide standards', 'reference percentages',
  'not caps', 'different groups', 'component weights', 'cut points',
  'district’s criteria', 'district’s review and correction process',
  'correction process', 'review process', 'designated contact', 'TIA contact',
  'propose designations', 'Texas Tech', 'TEA', 'validity', 'reliability',
  'stipends or salary increases', 'benefits and retirement contributions',
  'taxes and applicable deductions', 'take-home pay', 'payment schedule',
  'funding year', 'campus factors', '2026–27', '$10,000 × 90% = $9,000',
  'teacher identifiers', 'current-year submission materials', 'before submission',
  'cannot be edited', 'proposed or pending', 'eligibility verification',
  'district system and spending plan', 'dated official sources',
  'your assignment', 'worked example', 'starting information', 'students included',
  'local documents', 'district documents', 'follow-up question'
];
const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const pattern = new RegExp(`(?<![\\p{L}\\p{N}])(${[...phrases].sort((a,b)=>b.length-a.length).map(escape).join('|')})(?![\\p{L}\\p{N}])`, 'giu');

export function KeyText({text}: {text: string}) {
  const parts: React.ReactNode[] = [];
  const seen = new Set<string>();
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const key = match[0].toLocaleLowerCase('en-US');
    if (seen.has(key)) continue;
    if (seen.size === 3) break;
    const start = match.index!;
    parts.push(text.slice(cursor, start));
    parts.push(<strong className="key-text" key={start}>{match[0]}</strong>);
    cursor = start + match[0].length;
    seen.add(key);
  }
  parts.push(text.slice(cursor));
  return <>{parts}</>;
}
