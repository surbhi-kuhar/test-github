const express=require("express");
const { add } = require("../middleware/check");
const { login } = require("../controller/userController");
const router=express.Router();
const isAutheticated=(req,res,next)=>{
    req.user="deepak";
    console.log("is");
    next();
}
console.log("in Routs");
router.get('/',isAutheticated,login);
module.exports=  router;