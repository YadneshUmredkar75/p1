const express = require("express");
const router = express.Router({mergeParams:true});//In Express.js, mergeParams: true allows child routes to access parameters from their parent routes.
const Listing = require("../models/listing.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/async.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLogin,isAuthor}=require("../middleware.js");

// router.post("/", wrapAsync,isLogin,(async (req, res) => {
//     const listlist = await Listing.findById(req.params.id);  
//     let newReview = new Review(req.body.review);
//     newReview=req.user._id;
//     console.log(newReview);
//    listlist.reviews.push(newReview);

//     await newReview.save();
//     await listlist.save();

//     console.log("Review sent");
  
//     res.redirect(`/listing/${listlist._id}`);
//   }));
router.post("/", isLogin,wrapAsync( async (req, res) => {
  const listlist = await Listing.findById(req.params.id)

  let newReview = new Review(req.body.review);
  newReview.author = req.user._id; // Assign the author to the review
  listlist.reviews.push(newReview);

  await newReview.save();
  await listlist.save();
console.log("body code",req.body.review);
  console.log("Review sent");

  res.redirect(`/listing/${listlist._id}`);
}));

//   review rout delete
// app.delete("lsitings/:id/review/:reviewId",wrapAsync(async(req ,res ,next)=>{
//     const {id,reviewId}=req.params;
//     await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`listings${id}`);
// }))
//   review rout delete
router.delete("/:reviewId", wrapAsync,isLogin,isAuthor,(async(req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    let a = await Review.findByIdAndDelete(reviewId);
    console.log(a);
    // res.send("working")
    res.redirect(`/listing/${id}`);
}));
module.exports=router;