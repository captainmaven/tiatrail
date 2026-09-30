import type {Activity} from './pilot.ts';
export const weeklyGoalOptions=[2,3,5] as const;
export function weeklyLearning(events:Activity[],today:string){
 const date=new Date(today+'T12:00:00Z');const offset=(date.getUTCDay()+6)%7;date.setUTCDate(date.getUTCDate()-offset);
 const start=date.toISOString().slice(0,10);date.setUTCDate(date.getUTCDate()+6);const end=date.toISOString().slice(0,10);
 const setting=events.filter(e=>e.kind==='weekly_goal').at(-1);
 const chosen=setting?JSON.parse(setting.payload).target:3;
 const target=weeklyGoalOptions.includes(chosen)?chosen:3;
 const days=new Set(events.filter(e=>['answer','field_answer','concept_answer','match','complete'].includes(e.kind)&&e.day>=start&&e.day<=end&&e.day<=today).map(e=>e.day)).size;
 return {start,end,target,days,met:days>=target};
}
