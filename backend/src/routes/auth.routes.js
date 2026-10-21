const r=require('express').Router(),c=require('../controllers/auth.controller'),{wrap}=require('../utils/http'),{auth}=require('../middleware/auth');
r.post('/auth/register',wrap(c.register));r.post('/auth/login',wrap(c.login));
r.get('/me',auth,wrap(c.me));r.put('/me',auth,wrap(c.updateMe));r.delete('/me',auth,wrap(c.deleteMe));
module.exports=r;
