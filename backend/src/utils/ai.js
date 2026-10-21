const env=require('../config/env'),{err}=require('./http');
exports.claude=async(prompt,system='You are a helpful writing and career assistant.',max=2000)=>{
  if(env.geminiKey){ // FREE option: Google Gemini
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${env.geminiModel}:generateContent?key=${env.geminiKey}`,{method:'POST',headers:{'content-type':'application/json'},
      body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{maxOutputTokens:8192}})});
    const j=await r.json();if(!r.ok)throw err('Gemini error: '+(j.error?.message||r.status),502);
    return(j.candidates?.[0]?.content?.parts||[]).map(p=>p.text||'').join('')}
  if(env.anthropicKey){
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':env.anthropicKey,'anthropic-version':'2023-06-01'},
      body:JSON.stringify({model:env.model,max_tokens:max,system,messages:[{role:'user',content:prompt}]})});
    const j=await r.json();if(!r.ok)throw err(j.error?.message||'AI request failed',502);return j.content.map(c=>c.text||'').join('')}
  throw err('No AI key set. Add GEMINI_API_KEY (free) to backend/.env and restart the backend.',500)};
// Free image generation (Pollinations). Fetched server-side so errors are caught, retried, and credits refunded on failure.
exports.genImage=async(prompt)=>{let last='';
  for(let i=0;i<4;i++){
    const url=`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=768&height=768&nologo=true&model=${i%2?'turbo':'flux'}&seed=${Math.floor(Math.random()*1e6)}`;
    try{const r=await fetch(url,{signal:AbortSignal.timeout(60000)}),t=(r.headers.get('content-type')||'').split(';')[0];
      if(r.ok&&t.startsWith('image/'))return `data:${t};base64,`+Buffer.from(await r.arrayBuffer()).toString('base64');
      last='HTTP '+r.status}catch(e){last=e.message}
    if(i<3)await new Promise(r=>setTimeout(r,16000)); // free tier allows ~1 request / 15s
  }
  throw err('Free image service is busy or unavailable ('+last+'). Wait a minute and try again - your credits were not charged.',503)};
exports.dataUrl=async r=>{if(!r.ok)throw err('Image service error: '+(await r.text()).slice(0,120),502);return 'data:image/png;base64,'+Buffer.from(await r.arrayBuffer()).toString('base64')};
exports.blob=f=>new Blob([f.buffer],{type:f.mimetype});
