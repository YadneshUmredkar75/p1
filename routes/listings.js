const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/async.js");
const ExpressError = require("../utils/ExpressError.js");
const {listall,reviewSchema} = require("../schema.js");
const mongoose = require("mongoose");
const {isLogin,isOwner}=require("../middleware.js");
// const multer  = require('multer')
// const {cloudinary,storage}=require("../cloudcofig.js")
// const upload = multer({ storage });

const multer = require("multer");

// for upload file...........................
const { storage } = require("../cloudcofig.js");
const upload = multer({ storage });

const listindex = require("../controllers/listing.js");


//index form
router.get("/", isLogin, listindex.index);

//create new list
router.get("/new",isLogin,listindex.create);

// validlate error
let validationerror=(req,res,next)=>{
const error=schema.validate(req.body);
       
        if(error){
            let erMsg = error.details.map((el)=>el.massage).join(",");
            throw new ExpressError(400,erMsg)
        }else{
          next();
        }
    }

    // router.post("/",wrapAsync(listindex.postshow));
    router.post("/",upload.single('listing[image]'),(req,res)=>{
      try{

        res.send(req.body);
        console.log(req.body)
      }catch(err){
res.send(err);
console.log(err)
      }
      })
//show route

router.get("/:id",isLogin,listindex.show);




//edit listing
router.get("/:id/edit",isLogin,listindex.edit);



// Update listings
router.put("/:id",isLogin,isOwner,listindex.update);



//Delete
router.delete("/:id",isLogin,listindex.delete);

module.exports=router;