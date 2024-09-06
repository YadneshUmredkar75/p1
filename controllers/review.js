const Review=require("../models/review");
const Listing=require("../models/listing");

module.exports.sendreview=async (req, res) => {
    const listlist = await Listing.findById(req.params.id)
  
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; // Assign the author to the review
    listlist.reviews.push(newReview);
  
    await newReview.save();
    await listlist.save();
  console.log("body code",req.body.review);
    console.log("Review sent");
  
    res.redirect(`/listing/${listlist._id}`);
  }
  module.exports.deletereview=async(req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    let a = await Review.findByIdAndDelete(reviewId);
    console.log(a);
    // res.send("working")
    res.redirect(`/listing/${id}`);
  }