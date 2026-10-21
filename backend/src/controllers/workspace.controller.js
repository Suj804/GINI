const{q}=require('../config/db');
exports.list=async(req,res)=>res.json(await q('SELECT * FROM gini_workspaces WHERE user_id=$1 ORDER BY id',[req.user.id]));
exports.create=async(req,res)=>res.json((await q('INSERT INTO gini_workspaces(user_id,name) VALUES($1,$2) RETURNING *',[req.user.id,req.body.name||'Untitled']))[0]);
exports.update=async(req,res)=>res.json((await q('UPDATE gini_workspaces SET name=$1 WHERE id=$2 AND user_id=$3 RETURNING *',[req.body.name,req.params.id,req.user.id]))[0]);
exports.remove=async(req,res)=>{await q('DELETE FROM gini_workspaces WHERE id=$1 AND user_id=$2',[req.params.id,req.user.id]);res.json({ok:true})};
