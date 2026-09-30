import test from 'node:test';
import assert from 'node:assert/strict';
import {readDevice,writeDevice,recordDevice,DEVICE_KEY} from '../app/device-progress.ts';
import {longestLearningStreak} from '../app/progress-summary.ts';
import {resumePoint,conceptReviews} from '../app/pilot.ts';
import {modules} from '../app/content.ts';
const storage=()=>{const map=new Map();return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)}};
test('stop-and-jot completion saves progress without written responses or goals',()=>{
 const s=storage();writeDevice(s,[]);
 for(const kind of ['reflection','weekly_goal'])assert.throws(()=>recordDevice(s,{kind,module:0,text:'Private note',target:3}),/no longer collected/);
 assert.deepEqual(readDevice(s),[]);
 assert.throws(()=>recordDevice(s,{kind:'complete',module:0}));
 for(let question=0;question<2;question++)recordDevice(s,{kind:'answer',module:0,question,answer:modules[0].questions[question].correct});
 recordDevice(s,{kind:'complete',module:0,text:'Must not be stored'});
 const restored=readDevice(s);
 assert.deepEqual(JSON.parse(restored.find(e=>e.kind==='complete').payload),{});
 assert.equal(restored.filter(e=>e.kind==='answer'&&JSON.parse(e.payload).correct).length,2);
 assert.doesNotMatch(s.getItem(DEVICE_KEY),/Must not be stored/);
});
test('resume, streak, and review are restored from storage, restart retains empty record',()=>{
 const s=storage();recordDevice(s,{kind:'checkpoint',module:3,step:4});recordDevice(s,{kind:'answer',module:3,question:0,answer:-1});
 assert.equal(resumePoint(readDevice(s)).step,4);assert.equal(longestLearningStreak(readDevice(s)),1);assert.ok(conceptReviews(readDevice(s),'2099-01-01').length);
 writeDevice(s,[]);assert.deepEqual(readDevice(s),[]);assert.notEqual(s.getItem(DEVICE_KEY),null);
});
test('blocked or full storage never reports successful writes; corrupt data is not overwritten',()=>{
 const s=storage();recordDevice(s,{kind:'checkpoint',module:0,step:1});const before=s.getItem(DEVICE_KEY);
 const blocked={getItem:s.getItem,setItem(){throw Error('quota')}};assert.throws(()=>recordDevice(blocked,{kind:'checkpoint',module:0,step:2}));assert.equal(s.getItem(DEVICE_KEY),before);
 s.setItem(DEVICE_KEY,'broken');assert.throws(()=>recordDevice(s,{kind:'checkpoint',module:0,step:2}));assert.equal(s.getItem(DEVICE_KEY),'broken');
});
