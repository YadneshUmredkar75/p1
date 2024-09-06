const express = require("express");
const app = express();


// middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser("secretecode"));
//index
app.get("/send",(req,res)=>{
    res.cookie("name","yadnesh",{signed :true});
    res.cookie("color","red");
    res.send("cookie send a derver");
});
app.get("/user",(req,res)=>{
 let {name="not-found"}=req.cookies;
 res.send(`Hi I am ${name}`);
})
app.get("/",(req,res)=>{
    console.dir(req.signedCookies);//access a cookies in (req.cookies)
   res.send("server is state");
});

app.get("/user",(req,res)=>{
    res.render("Post routs");
 });

 app.post("/user/:id",(req,res)=>{
    res.send("delete route");
 });

 app.delete("/user/:id/delete",(req,res)=>{
    res.send("server is state");
 });

 app.listen(8000,()=>{
    console.log("port is listening")
 })