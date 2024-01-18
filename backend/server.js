const express=require("express");
const app=express();
const cookie=require("cookie-parser");
var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const port=8000;
console.log(":here");
app.use(cookie());
const port= process.env.PORT;
const server=app.listen(port,()=>{
    console.log("server is running on port "+port);
});
module.exports=app;
