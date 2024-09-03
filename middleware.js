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
module.exports.isAuthor = async (req, res, next) => {
  try {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if (!review) {
      req.flash("error", "Review not found");
      return res.redirect(`/listing/${id}`);
    }

    if (!review.author.equals(res.locals.currUser._id)) {
      req.flash("error", "You are not authorized to edit this review");
      return res.redirect(`/listing/${id}`);
    }

    next();
  } catch (err) {
    req.flash("error", "Something went wrong");
    return res.redirect(`/listing/${id}`);
  }
};


