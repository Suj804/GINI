const r=require('express').Router(),c=require('../controllers/output.controller'),{wrap}=require('../utils/http'),{auth}=require('../middleware/auth');
r.use(auth);r.get('/',wrap(c.list));r.put('/:id',wrap(c.update));r.delete('/:id',wrap(c.remove));
module.exports=r;
