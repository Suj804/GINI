const r=require('express').Router(),c=require('../controllers/admin.controller'),{wrap}=require('../utils/http'),{auth,admin}=require('../middleware/auth');
r.use(auth,admin);r.get('/stats',wrap(c.stats));r.put('/users/:id/credits',wrap(c.setCredits));
module.exports=r;
