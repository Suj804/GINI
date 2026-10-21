const r=require('express').Router();
r.use('/',require('./auth.routes'));
r.use('/workspaces',require('./workspace.routes'));r.use('/outputs',require('./output.routes'));
r.use('/ai',require('./ai.routes'));r.use('/admin',require('./admin.routes'));
module.exports=r;
