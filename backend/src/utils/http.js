exports.err=(m,s=400)=>Object.assign(new Error(m),{status:s});
exports.wrap=f=>(req,res,next)=>Promise.resolve(f(req,res,next)).catch(next);
