const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const wrapAsync = require("../utils/async.js");
const { saveRedirect }=require("../middleware.js");
const user=require("../controllers/user.js");
router.get("/signup",user.Getsignup );


router.post("/signup", wrapAsync(user.postsignup));

router.get("/login", user.getlogin);

router.post("/login", saveRedirect , passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),user.postlogin)

router.get("/logout",user.logout );

module.exports = router;
