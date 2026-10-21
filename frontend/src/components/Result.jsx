export default function Result({o}){if(!o)return null;let c=o.content;
  if(o.tool==='resume'){try{c=JSON.parse(c)}catch{}
    if(c&&c.score!==undefined)return<div className="space-y-2"><div className="text-4xl font-bold text-cyan-200">{c.score}<span className="text-lg text-white/60">/100 ATS</span></div><p>{c.summary}</p>
      {[['Strengths',c.strengths],['Missing keywords',c.missing_keywords],['Suggestions',c.suggestions]].map(([t,a])=><div key={t}><b>{t}</b><ul className="list-disc ml-5">{(a||[]).map((x,i)=><li key={i}>{x}</li>)}</ul></div>)}</div>}
  return<div className="space-y-2">{o.image_url&&<div><img src={o.image_url} alt="result" className="max-h-96 rounded-lg border"/><a className="text-cyan-200 text-sm" href={o.image_url} target="_blank" rel="noreferrer" download={'gini-'+o.id+'.png'}>Download image</a></div>}
    {c&&<pre className="whitespace-pre-wrap font-sans">{c}</pre>}</div>}
