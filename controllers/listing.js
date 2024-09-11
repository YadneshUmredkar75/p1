const { response } = require("express");
const Listing=require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient= mbxGeocoding({ accessToken: mapToken });


module.exports.index= async(req,res)=>{
    const allList=await Listing.find({});
 
    res.render("index.ejs",{allList} );
 
     
}
module.exports.create=(req,res)=>{
    

    res.render("create.ejs");
}
module.exports.show=async(req,res)=>{
    const {id}=req.params;
    const listlist=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    console.log(listlist)
    res.render("show.ejs",{listlist});
}
module.exports.postshow=async(req,res,next)=>{
    let coordinates= await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send();

    const url=req.file.path;
    const filename=req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.gemoetry=coordinates.body.features[0].geometry;
    let savelisting= await newListing.save();
    console.log(savelisting);
   
    req.flash("success","NEW Listing IS ADDEDING")
    res.redirect("/listing");
}
module.exports.edit=async(req,res)=>{
    const {id}=req.params;
    const listlist=await Listing.findById(id);
    let orListing=listlist.image.url;
    orListing=orListing.replace("/uplod","/uplod/h_300,w_250");
    res.render("edit.ejs",{listlist,orListing});
}
module.exports.update=async (req, res) => {
    let {id} = req.params;
   const listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
   if(typeof req.file !=="undefined"){
    const url=req.file.path;
    const filename=req.file.filename;
   listing.image={url,filename};
    listing.save();
   
   }
    // req.flash("error","LISTING NOT FOUND ");

    res.redirect(`/listing/${id}`);
  }
  module.exports.delete=async(req,res)=>{
    const {id}=req.params;
    const deletelist= await Listing.findByIdAndDelete(id);
    console.log(deletelist);
    res.redirect("/listing");
   

}
