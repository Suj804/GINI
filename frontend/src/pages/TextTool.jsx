import{useParams,Navigate}from'react-router-dom';import PromptTool from'../components/PromptTool.jsx';import{TOOLS,TONES}from'../components/ui.js';
export default function TextTool(){const{id}=useParams(),t=TOOLS[id];if(!t)return<Navigate to="/"/>;
  return<PromptTool key={id} endpoint={id} title={t[0]} cost={t[1]} placeholder={t[2]} rows={6} extra={t[3]&&t[3]!=='tone'?t[3]:undefined} extraOptions={t[3]==='tone'?TONES:undefined}/>}
