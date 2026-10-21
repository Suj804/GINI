const{Pool}=require('pg'),env=require('./env');
// Works with local Postgres and cloud Postgres (Neon, Supabase, Render...).
let url=env.dbUrl||'',ssl=false;
try{const u=new URL(url);const cloud=!['localhost','127.0.0.1'].includes(u.hostname);
  u.searchParams.delete('sslmode');u.searchParams.delete('channel_binding'); // these params break node-pg; we set SSL explicitly
  url=u.toString();ssl=cloud?{rejectUnauthorized:false}:false}catch{}
const pool=new Pool({connectionString:url,ssl,connectionTimeoutMillis:20000}); // Neon free DBs may need a few seconds to wake up
module.exports={pool,q:(s,p)=>pool.query(s,p).then(r=>r.rows)};
