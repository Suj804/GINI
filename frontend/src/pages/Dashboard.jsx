import{Link}from'react-router-dom';import{card}from'../components/ui.js';import Logo from'../components/Logo.jsx';import{useAuth}from'../context/AuthContext.jsx';
const groups=[
 ['✍️ Write',[['/tools/article','✍️','Article Generator','Structured articles from any topic',2],['/tools/titles','💡','Blog Titles','10 catchy, SEO-friendly titles',1],['/tools/rewrite','🔄','Rewriter','Improve and polish your text',1],['/tools/summarize','📝','Summarizer','Short summary plus key points',1],['/tools/tone','🎭','Tone Converter','Formal, casual, simple and more',1]]],
 ['🎨 Create',[['/image','🎨','Image Generation','Turn words into pictures',3],['/pipeline','🚀','Idea → Content','Idea to article to image in one go',6]]],
 ['💼 Career',[['/resume','📄','Resume ATS Score','Score, missing keywords, tips',3]]],
 ['🖼️ Photo Magic',[['/background-removal','✂️','Background Removal','Cut out the background',3],['/object-removal','🧹','Object Removal','Paint over it, make it vanish',3]]]];
export default function Dashboard(){const{user}=useAuth();
  return<div className="space-y-6"><div className={card+' flex items-center gap-5 p-6 flex-wrap'}><div className="lamp-float"><Logo size={84}/></div>
    <div className="flex-1 min-w-[14rem]"><p className="text-white/60 text-sm">Welcome back</p><h2 className="text-3xl font-bold">Hello, <span className="brand">{user.name}</span></h2><p className="text-white/70">What shall we create today? Your wish is my command.</p></div>
    <div className="gem rounded-2xl px-5 py-3 text-center"><div className="text-3xl font-extrabold">{user.credits}</div><div className="text-xs">credits left</div></div></div>
    {groups.map(([title,items])=><section key={title}><h3 className="text-lg font-semibold mb-3 text-white/90">{title}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{items.map(([to,icon,t,d,c])=><Link key={to} to={to} className={card+' tool-card no-underline text-white flex gap-4 items-center'}>
        <div className="tool-icon">{icon}</div><div className="flex-1"><h4 className="font-semibold">{t}</h4><p className="text-sm text-white/65">{d}</p></div>
        <span className="text-xs gem rounded-full px-2 py-0.5">{c} cr</span></Link>)}</div></section>)}</div>}
