const pdf=require('pdf-parse'),env=require('../config/env'),{err}=require('../utils/http'),{claude,genImage,dataUrl,blob}=require('../utils/ai'),{withCredits}=require('../services/credits');
const prompts={
  article:b=>`Write a well-structured article (with headings) on: ${b.text}\nKeywords/instructions: ${b.extra||'none'}`,
  titles:b=>`Generate 10 engaging, SEO-friendly blog titles for: ${b.text}. Return a numbered list only.`,
  rewrite:b=>`Rewrite and improve the text below. Instructions: ${b.extra||'improve clarity and flow'}\n\n${b.text}\n\nReturn only the rewritten text.`,
  summarize:b=>`Summarize the text below in a short paragraph, then list key points as bullets.\n\n${b.text}`,
  tone:b=>`Convert the text below to a ${b.extra||'professional'} tone, keeping the meaning. Return only the converted text.\n\n${b.text}`};
exports.textTool=tool=>async(req,res)=>{if(!req.body.text)throw err('Input text required');
  await withCredits(req,res,tool,async()=>({input:req.body.text,content:await claude(prompts[tool](req.body))}))};
exports.image=async(req,res)=>{if(!req.body.text)throw err('Prompt required');
  await withCredits(req,res,'image',async()=>({input:req.body.text,image_url:await genImage(req.body.text)}))};
exports.pipeline=async(req,res)=>{if(!req.body.text)throw err('Idea required');
  await withCredits(req,res,'pipeline',async()=>{const idea=req.body.text;
    const brief=await claude(`Expand this idea into a clear article brief (angle, audience, 4-5 section outline): ${idea}`,undefined,600);
    const article=await claude(`Write a complete article using this brief:\n${brief}`);
    const ip=(await claude(`Write one vivid sentence describing a suitable illustration (no text in image) for this article:\n${article.slice(0,1500)}`,undefined,100)).trim();
    return{input:idea,content:article,image_url:await genImage(ip)}})};
exports.resume=async(req,res)=>{if(!req.file||req.file.mimetype!=='application/pdf')throw err('Upload a PDF resume');
  await withCredits(req,res,'resume',async()=>{const text=(await pdf(req.file.buffer)).text.trim();if(text.length<50)throw err('Could not extract text from PDF');
    const raw=await claude(`Evaluate this resume as an ATS system${req.body.job?` for this target role/job description: ${req.body.job}`:''}.\nReturn ONLY JSON: {"score":0-100,"summary":"","strengths":[],"missing_keywords":[],"suggestions":[]}\n\nRESUME:\n${text.slice(0,12000)}`,'You output only valid JSON.',1200);
    let j;try{j=JSON.parse(raw.slice(raw.indexOf('{'),raw.lastIndexOf('}')+1))}catch{throw err('AI returned invalid analysis, try again',502)}
    return{input:req.file.originalname,content:JSON.stringify(j)}})};
exports.bgremove=async(req,res)=>{if(!req.file)throw err('Image required');
  await withCredits(req,res,'bgremove',async()=>{
    if(env.removebgKey){const f=new FormData();f.append('image_file',blob(req.file),'img.png');f.append('size','auto');
      return{input:req.file.originalname,image_url:await dataUrl(await fetch('https://api.remove.bg/v1.0/removebg',{method:'POST',headers:{'X-Api-Key':env.removebgKey},body:f}))}}
    // FREE: runs locally (first use downloads the model, so it can take a minute)
    const{removeBackground}=await import('@imgly/background-removal-node');
    const out=await removeBackground(blob(req.file));
    return{input:req.file.originalname,image_url:'data:image/png;base64,'+Buffer.from(await out.arrayBuffer()).toString('base64')}})};
// Object removal runs free in the browser (frontend/src/utils/inpaint.js); this endpoint charges credits and saves the result.
exports.objremove=async(req,res)=>{const{image,name}=req.body;if(!/^data:image\/(png|jpeg);base64,/.test(image||''))throw err('Processed image required');
  await withCredits(req,res,'objremove',async()=>({input:name||'image',image_url:image}))};
