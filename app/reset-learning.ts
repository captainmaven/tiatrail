type ResetDatabase={prepare:(sql:string)=>{bind:(user:string)=>{run:()=>Promise<unknown>}}};
export async function resetLearning(request:Request,user:string|null,db:ResetDatabase){
 if(!user)return Response.json({error:'Sign in to restart your learning.'},{status:401});
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Invalid request origin.'},{status:403});
 let body;try{body=await request.json()}catch{return Response.json({error:'Confirm the restart first.'},{status:400})}
 if(body?.confirm!=='restart-all-learning')return Response.json({error:'Confirm the restart first.'},{status:400});
 await db.prepare('DELETE FROM activity WHERE user_id = ?').bind(user).run();
 return Response.json({ok:true},{headers:{'Cache-Control':'private, no-store'}});
}
