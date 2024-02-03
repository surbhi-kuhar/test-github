const express=require("express");
const { signup } = require("../controller/userController");
const router=express.Router();
console.log("in Routs");
router.post('/signup',signup);
module.exports=  router;