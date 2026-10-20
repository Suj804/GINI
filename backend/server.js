import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware,getAuth } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app=express();
await connectCloudinary()
app.use(cors());
app.use(clerkMiddleware());
app.get('/debug-auth', (req, res) => {
    const auth = getAuth(req);

    res.json({
        userId: auth.userId ?? null,
        authorizationHeaderPresent: Boolean(
            req.headers.authorization
        ),
        publishableKeyConfigured: Boolean(
            process.env.CLERK_PUBLISHABLE_KEY
        ),
        secretKeyConfigured: Boolean(
            process.env.CLERK_SECRET_KEY
        )
    });
});


app.use(express.json());
app.get('/',(req,res)=>res.send('server is live!'));
app.use('/api/ai',aiRouter)
app.use('/api/user',userRouter)
app.get('/protected',(req,res)=>{
    const {userId}=getAuth(req);
    if (!userId){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
    res.json({
        message:'Authentication successful!',
        userId
    });
});
const PORT =process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('server is runing on port',PORT);
})