const express=require("express");
const { signup,createActualUser, login } = require("../controller/userController");
const router=express.Router();
//const {upload}=require("../multer.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});

const upload = multer({ storage: storage });
console.log("in Routs");
router.post('/signup',upload.single("file"),signup);
router.post("/activation",upload.single("file"),createActualUser);
router.post("/login",upload.single("file"),login);
module.exports=  router;
