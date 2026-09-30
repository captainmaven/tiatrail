import {concepts,fieldQuestions,legacyConcepts} from './field-cases.ts';
export type Activity={id:string;kind:string;module:number;payload:string;day:string;seconds:number;created_at:number};
export function resumePoint(events:Activity[]){
 const done=new Set(events.filter(e=>e.kind==='complete').map(e=>e.module));
 const checkpoint=events.filter(e=>e.kind==='checkpoint'&&!done.has(e.module)).at(-1);
 return checkpoint?{module:checkpoint.module,...JSON.parse(checkpoint.payload)}:null;
}
export function conceptReviews(events:Activity[],today:string){
 return concepts.flatMap(concept=>{
  const history=events.filter(e=>{const p=JSON.parse(e.payload);return e.kind==='answer'?legacyConcepts[`${e.module}:${p.question}`]===concept.id:['concept_answer','field_answer'].includes(e.kind)&&p.concept===concept.id});
  if(!history.length)return [];
  const latest=history.at(-1)!;const last=JSON.parse(latest.payload);
  let successfulDays=new Set<string>();let successfulQuestions=new Set<string>();let lastMissDay:string|null=null;
  for(const e of history){const p=JSON.parse(e.payload);if(!p.correct){successfulDays=new Set();successfulQuestions=new Set();lastMissDay=e.day}else if(e.day!==lastMissDay){successfulDays.add(e.day);successfulQuestions.add(p.questionId??`${e.module}:${p.question}`)}}
  const count=successfulDays.size;
  const interval=!last.correct||count===0?1:count<2?3:count<3?7:14;
  const date=new Date(latest.day+'T12:00:00Z');date.setUTCDate(date.getUTCDate()+interval);
  const due=date.toISOString().slice(0,10);
  const pool=fieldQuestions.filter(q=>q.concept===concept.id&&q.id!==last.questionId);
  const attempts=(id:string)=>history.filter(e=>JSON.parse(e.payload).questionId===id).length;
  pool.sort((a,b)=>attempts(a.id)-attempts(b.id));
  return [{concept:concept.id,name:concept.name,module:concept.module,question:pool[0].id,due,ready:due<=today,demonstrated:count>=2&&successfulQuestions.size>=2,correctDays:count}];
 });
}
export function comebackQuestion(events:Activity[],today:string){return conceptReviews(events,today).filter(r=>r.ready).sort((a,b)=>a.due.localeCompare(b.due))[0]??null}
