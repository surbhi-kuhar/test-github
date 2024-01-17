const express=require("express");
const app=express();
const port=8000;
const server=app.listen(port,()=>{
    console.log("server is running on port "+port);
})
module.exports=app;