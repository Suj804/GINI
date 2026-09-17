import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware,getAuth } from '@clerk/express'

const app=express()
app.use(cors())
app.use(clerkMiddleware())
app.use(express.json())
app.get('/',(req,res)=>res.send('server is live!'))
app.use(getAuth())
const PORT =process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('server is runing on port',PORT);
})