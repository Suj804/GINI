const{q}=require('../config/db');
exports.list=async(req,res)=>{const{fav,workspace}=req.query;
  res.json(await q('SELECT * FROM gini_outputs WHERE user_id=$1 AND ($2::boolean IS NOT TRUE OR favourite) AND ($3::int IS NULL OR workspace_id=$3) ORDER BY id DESC',[req.user.id,fav==='1',workspace||null]))};
exports.update=async(req,res)=>{const{favourite,workspace_id,content}=req.body;
  res.json((await q('UPDATE gini_outputs SET favourite=COALESCE($1,favourite),workspace_id=COALESCE($2,workspace_id),content=COALESCE($3,content) WHERE id=$4 AND user_id=$5 RETURNING *',[favourite??null,workspace_id??null,content??null,req.params.id,req.user.id]))[0])};
exports.remove=async(req,res)=>{await q('DELETE FROM gini_outputs WHERE id=$1 AND user_id=$2',[req.params.id,req.user.id]);res.json({ok:true})};
