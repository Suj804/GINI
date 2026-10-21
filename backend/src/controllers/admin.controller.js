const{q}=require('../config/db');
exports.stats=async(req,res)=>res.json({users:await q('SELECT id,name,email,role,credits,created_at FROM gini_users ORDER BY id'),
  usage:await q('SELECT tool,COUNT(*)::int AS runs,SUM(cost)::int AS credits FROM gini_usage_log GROUP BY tool ORDER BY runs DESC')});
exports.setCredits=async(req,res)=>res.json((await q('UPDATE gini_users SET credits=$1 WHERE id=$2 RETURNING id,credits',[+req.body.credits,req.params.id]))[0]);
