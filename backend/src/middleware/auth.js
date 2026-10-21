const jwt=require('jsonwebtoken'),env=require('../config/env'),{err}=require('../utils/http');
exports.sign=u=>jwt.sign({id:u.id,role:u.role},env.jwtSecret,{expiresIn:'7d'});
exports.auth=(req,res,next)=>{try{req.user=jwt.verify((req.headers.authorization||'').slice(7),env.jwtSecret);next()}catch{next(err('Unauthorized',401))}};
exports.admin=(req,res,next)=>req.user.role==='admin'?next():next(err('Admins only',403));
