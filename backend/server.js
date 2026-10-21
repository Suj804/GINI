const env=require('./src/config/env'),app=require('./src/app'),{initDb}=require('./src/config/schema');
let host=null;try{host=new URL(env.dbUrl).hostname}catch{}
console.log('Database host:',host||'NOT SET -> backend/.env is missing, misnamed, or DATABASE_URL is empty');
console.log('Gemini key:',env.geminiKey?'found':'NOT SET');
initDb().then(()=>console.log('DB ready')).catch(e=>console.error('DB error:',e.message||(e.errors||[]).map(x=>x.message||x.code).join(' | ')||e.code||e));
app.listen(env.port,()=>console.log('GINI API running on port',env.port));
