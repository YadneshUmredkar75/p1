const Listing = require("./models/listing.js");

module.exports.isLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req._parsedOriginalUrl.pathname
    req.flash("errorMsg", "Required to login")
    return res.redirect('/login')
  }
  next()
}

module.exports.saveRedirect=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}
module.exports.isOwner=async(req,res,next)=>{
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(! listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","you don't listing owner");
    return res.redirect(`/listing/${id}`);
  }
  next();
}