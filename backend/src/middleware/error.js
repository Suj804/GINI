exports.notFound=(req,res,next)=>next(Object.assign(new Error('Route not found'),{status:404}));
exports.errorHandler=(e,req,res,next)=>{if(!e.status)console.error(e);res.status(e.status||500).json({error:e.message})};
