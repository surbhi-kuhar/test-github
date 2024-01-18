const express=require("express");
const app=express();
const cookie=require("cookie-parser");
var jwt = require('jsonwebtoken');
const port=8000;
app.use(cookie());
const server=app.listen(port,()=>{
    console.log("server is running on port "+port);
});
module.exports=app;