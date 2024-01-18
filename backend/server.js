const express=require("express");
const app=express();
const cookie=require("cookie-parser");
var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const userRoutes=require("./routes/userRoutes");
const errorHandler=require("./utils/errorHanler");
const connectDb=require("./config/database");
dotenv.config();
app.use(cookie());
const always=(req,res,next)=>{
    console.log("always");
    next();
}
app.use(always);
app.use('/login',userRoutes);
app.use(errorHandler);
connectDb();
const server=app.listen( process.env.PORT,()=>{
    console.log("server is running on port "+ process.env.PORT);
});
module.exports=app;
