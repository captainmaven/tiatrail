import {modules} from './content.ts';
import {fieldQuestions} from './field-cases.ts';
import type {Activity} from './pilot.ts';
export const DEVICE_KEY='texas-learning-trail:v1';
type StoragePort=Pick<Storage,'getItem'|'setItem'>;
export function readDevice(storage:StoragePort):Activity[]|null {
 const raw=storage.getItem(DEVICE_KEY);if(raw===null)return null;
 const data=JSON.parse(raw);
 if(data.version!==1||!Array.isArray(data.events)||!data.events.every((e:Activity)=>typeof e.id==='string'&&typeof e.kind==='string'&&Number.isInteger(e.module)&&e.module>=0&&e.module<10&&typeof e.day==='string'&&Number.isFinite(e.seconds)&&Number.isFinite(e.created_at)&&typeof e.payload==='string'&&JSON.parse(e.payload)!==null))throw Error('Saved learning could not be read. Your stored data has not been replaced.');
 return data.events;
}
export function writeDevice(storage:StoragePort,events:Activity[]){storage.setItem(DEVICE_KEY,JSON.stringify({version:1,events}));}
export function recordDevice(storage:StoragePort,data:any):Activity[]{
 const events=readDevice(storage)??[];
 const {kind,module,...details}=data;let payload:any=details;
 if(kind==='reflection'||kind==='weekly_goal')throw Error('This activity is no longer collected.');
 if(kind==='answer'){const q=modules[module].questions[data.question];payload={question:data.question,answer:data.answer,correct:data.answer===q.correct};}
 if(kind==='concept_answer'||kind==='field_answer'){const q=fieldQuestions.find(q=>q.id===data.questionId)!;payload={questionId:q.id,concept:q.concept,answer:data.answer,correct:data.answer===q.correct,...(kind==='field_answer'?{caseId:data.caseId,stage:data.stage}:{})};}
 if(kind==='complete'&&new Set(events.filter(e=>e.kind==='answer'&&e.module===module).map(e=>JSON.parse(e.payload).question)).size<2)throw Error('Finish both knowledge checks before completing this stop.');
 if(kind==='complete')payload={};
 const entry={id:crypto.randomUUID(),kind,module,payload:JSON.stringify(payload),day:new Intl.DateTimeFormat('en-CA',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()),seconds:Math.max(0,Math.min(900,Math.round(data.seconds||0))),created_at:Date.now()};
 const updated=[...events,entry];writeDevice(storage,updated);return updated;
}
