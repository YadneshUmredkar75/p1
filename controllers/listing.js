const Listing=require("../models/listing");

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
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","NEW Listing IS ADDEDING")
    res.redirect("/listing");
}
module.exports.edit=async(req,res)=>{
    const {id}=req.params;
    const listlist=await Listing.findById(id);
    res.render("edit.ejs",{listlist});
}
module.exports.update=async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    // req.flash("error","LISTING NOT FOUND ");

    res.redirect(`/listing/${id}`);
  }
  module.exports.delete=async(req,res)=>{
    const {id}=req.params;
    const deletelist= await Listing.findByIdAndDelete(id);
    console.log(deletelist);
    res.redirect("/listing");
   

}
