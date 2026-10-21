const r=require('express').Router(),c=require('../controllers/ai.controller'),up=require('../middleware/upload'),{wrap}=require('../utils/http'),{auth}=require('../middleware/auth');
r.use(auth);
['article','titles','rewrite','summarize','tone'].forEach(t=>r.post('/'+t,wrap(c.textTool(t))));
r.post('/image',wrap(c.image));r.post('/pipeline',wrap(c.pipeline));
r.post('/resume',up.single('file'),wrap(c.resume));r.post('/bgremove',up.single('image'),wrap(c.bgremove));
r.post('/objremove',wrap(c.objremove));
module.exports=r;
