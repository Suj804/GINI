require('dotenv').config();
module.exports={port:process.env.PORT||5000,dbUrl:process.env.DATABASE_URL,jwtSecret:process.env.JWT_SECRET||'dev_secret_change_me',
  geminiKey:process.env.GEMINI_API_KEY,geminiModel:process.env.GEMINI_MODEL||'gemini-3.8-flash',anthropicKey:process.env.ANTHROPIC_API_KEY,model:process.env.AI_MODEL||'claude-sonnet-5-5',removebgKey:process.env.REMOVEBG_API_KEY,clipdropKey:process.env.CLIPDROP_API_KEY,
  startCredits:100,costs:{article:2,titles:1,rewrite:1,summarize:1,tone:1,image:3,bgremove:3,objremove:3,resume:3,pipeline:6}};
