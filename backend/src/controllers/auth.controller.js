const bcrypt=require('bcryptjs'),{q}=require('../config/db'),env=require('../config/env'),{sign}=require('../middleware/auth'),{err}=require('../utils/http');
const SAFE='id,name,email,role,credits';
exports.register=async(req,res)=>{const{name,email,password}=req.body;
  if(!name||!/\S+@\S+/.test(email||'')||(password||'').length<6)throw err('Name, valid email and 6+ char password required');
  const role=(await q('SELECT 1 FROM gini_users LIMIT 1')).length?'user':'admin'; // first user becomes admin
  try{const[u]=await q(`INSERT INTO gini_users(name,email,password,role,credits) VALUES($1,$2,$3,$4,$5) RETURNING ${SAFE}`,[name,email.toLowerCase(),await bcrypt.hash(password,10),role,env.startCredits]);res.json({token:sign(u),user:u})}
  catch{throw err('Email already registered',409)}};
exports.login=async(req,res)=>{const[u]=await q('SELECT * FROM gini_users WHERE email=$1',[(req.body.email||'').toLowerCase()]);
  if(!u||!await bcrypt.compare(req.body.password||'',u.password))throw err('Invalid credentials',401);
  delete u.password;res.json({token:sign(u),user:u})};
exports.me=async(req,res)=>res.json((await q(`SELECT ${SAFE} FROM gini_users WHERE id=$1`,[req.user.id]))[0]);
exports.updateMe=async(req,res)=>{const{name,password}=req.body;
  if(name)await q('UPDATE gini_users SET name=$1 WHERE id=$2',[name,req.user.id]);
  if(password){if(password.length<6)throw err('Password too short');await q('UPDATE gini_users SET password=$1 WHERE id=$2',[await bcrypt.hash(password,10),req.user.id])}
  await exports.me(req,res)};
exports.deleteMe=async(req,res)=>{await q('DELETE FROM gini_users WHERE id=$1',[req.user.id]);res.json({ok:true})};
