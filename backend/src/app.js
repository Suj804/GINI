const express=require('express'),cors=require('cors'),routes=require('./routes'),{notFound,errorHandler}=require('./middleware/error');
const app=express();app.use(cors(),express.json({limit:'10mb'}));
app.get('/api/health',(req,res)=>res.json({ok:true}));
app.use('/api',routes);app.use(notFound,errorHandler);
module.exports=app;
