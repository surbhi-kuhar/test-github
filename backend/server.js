const express=require("express");
const app=express();
const dotenv = require("dotenv");

dotenv.config();

const port= process.env.PORT;
const server=app.listen(port,()=>{
    console.log("server is running on port "+port);
})
module.exports=app;
