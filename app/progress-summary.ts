import type {Activity} from './pilot.ts';
import {legacyConcepts} from './field-cases.ts';
export function practiceSummary(events:Activity[]) {
 const answers=events.filter(e=>['answer','field_answer','concept_answer'].includes(e.kind));
 const correct=answers.filter(e=>JSON.parse(e.payload).correct===true).length;
 return {answers,correct,accuracy:answers.length?Math.round(correct/answers.length*100):null};
}
export function longestLearningStreak(events:Activity[]) {
 const days=[...new Set(events.filter(e=>['answer','complete','match','concept_answer','field_answer'].includes(e.kind)).map(e=>e.day))].sort();
 let longest=0,run=0,previous=0;
 for(const day of days){const date=Date.parse(day+'T12:00:00Z');run=date-previous===86400000?run+1:1;longest=Math.max(longest,run);previous=date;}
 return longest;
}
export function remainingLessonReviews(events:Activity[]) {
 const latest=new Map<string,Activity>();
 for(const e of events){if(e.kind!=='answer')continue;const p=JSON.parse(e.payload);const key=`${e.module}:${p.question}`;if(!legacyConcepts[key])latest.set(key,e);}
 return [...new Set([...latest.values()].filter(e=>!JSON.parse(e.payload).correct).map(e=>e.module))];
}
export function latestReflection(events:Activity[],module:number) {
 for(let i=events.length-1;i>=0;i--){const e=events[i];if(e.module!==module||!['reflection','complete'].includes(e.kind))continue;const p=JSON.parse(e.payload);if(typeof p.text==='string')return p.text;}
 return '';
}
// Reflection and completion share one persisted row. Old clients may omit text.
export function completionPayload(text:unknown) {
 if(text===undefined)return {};
 if(typeof text!=='string'||text.length>2000)throw new Error('Keep your reflection under 2,000 characters.');
 return {text};
}
