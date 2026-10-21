// Free, in-browser object removal: fills masked pixels from their surroundings.
// img: Uint8ClampedArray (RGBA), mask: Uint8Array (1 = remove)
export function inpaint(img,mask,w,h){
  const known=new Uint8Array(w*h);let todo=[];
  for(let i=0;i<w*h;i++){if(mask[i])todo.push(i);else known[i]=1}
  const all=todo.slice();
  // 1) peel inward layer by layer, averaging known neighbours
  while(todo.length){const fill=[],rest=[];
    for(const i of todo){const x=i%w,y=(i/w)|0;let r=0,g=0,b=0,n=0;
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=w||yy>=h)continue;const j=yy*w+xx;if(known[j]){r+=img[j*4];g+=img[j*4+1];b+=img[j*4+2];n++}}
      n?fill.push([i,r/n,g/n,b/n]):rest.push(i)}
    if(!fill.length)break;
    for(const[i,r,g,b]of fill){img[i*4]=r;img[i*4+1]=g;img[i*4+2]=b;known[i]=1}
    todo=rest}
  // 2) smooth the filled area so it blends with the background
  for(let it=0;it<80;it++)for(const i of all){const x=i%w,y=(i/w)|0;let r=0,g=0,b=0,n=0;
    for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=w||yy>=h)continue;const j=yy*w+xx;r+=img[j*4];g+=img[j*4+1];b+=img[j*4+2];n++}
    if(n){img[i*4]=r/n;img[i*4+1]=g/n;img[i*4+2]=b/n}}
}
