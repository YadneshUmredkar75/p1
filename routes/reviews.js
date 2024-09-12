const express = require("express");
const router = express.Router({mergeParams:true});//In Express.js, mergeParams: true allows child routes to access parameters from their parent routes.
const Listing = require("../models/listing.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/async.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLogin,isAuthor}=require("../middleware.js");
const review = require("../controllers/review.js");



router.post("/", isLogin,wrapAsync(review.sendreview));


//   review rout delete
router.delete("/:reviewId",isLogin,isAuthor, wrapAsync(review.deletereview));
module.exports=router;