const{q}=require('../config/db'),env=require('../config/env'),{err}=require('../utils/http');
// Deduct credits atomically, run the AI job, save output + usage; refund if the job fails.
exports.withCredits=async(req,res,tool,job)=>{
  const cost=env.costs[tool];if(!cost)throw err('Unknown tool',404);
  const[u]=await q('UPDATE gini_users SET credits=credits-$2 WHERE id=$1 AND credits>=$2 RETURNING credits',[req.user.id,cost]);
  if(!u)throw err('Not enough credits',402);
  try{const{input,content,image_url}=await job();
    await q('INSERT INTO gini_usage_log(user_id,tool,cost) VALUES($1,$2,$3)',[req.user.id,tool,cost]);
    const[o]=await q('INSERT INTO gini_outputs(user_id,workspace_id,tool,input,content,image_url) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',[req.user.id,req.body.workspace_id||null,tool,(input||'').slice(0,2000),content||null,image_url||null]);
    res.json({output:o,credits:u.credits});
  }catch(e){await q('UPDATE gini_users SET credits=credits+$2 WHERE id=$1',[req.user.id,cost]);throw e}};
