const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const init = require("./data.js");

main().then(res=>console.log("Connected DB"))
.catch(err=>console.log(err));
async function main(){
    await mongoose.connect(process.env.API_CLOUD_MONGODB);
}
// "mongodb://127.0.0.1:27017/app"
const initdata=async()=>{
    await Listing.deleteMany({});
   init.data=init.data.map((obj)=>({...obj,owner:"66d2fac3bc3b1997ab46a491"}))
    await Listing.insertMany(init.data);
    console.log("Hi");
}
initdata();