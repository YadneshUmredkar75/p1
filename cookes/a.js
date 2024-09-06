const express = require("express");
const app = express();
const session = require("express-session");
const flash =require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionop={
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: true,
  
  };
  app.use(flash());
app.use(session(sessionop));
app.get("/register",(req,res)=>{
   const {name=" "}=req.query;
   req.session.name=name;
   if(name===" "){

       req.flash("error","user not register");
   }else{

       req.flash("success","user register successfully");
   }

   res.redirect("/hello");
});
app.get("/hello",(req,res)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");

    res.render("page.ejs",{ name:req.session.name});
 });
// app.get("/",(req,res)=>{
//     if( req.session.count){
//         req.session.count++;
//     }else{
//     req.session.count=1}
//     res.send(`session is state ${ req.session.count}`)
// });
app.listen(3000,()=>{
    console.log("port is listening")
 })