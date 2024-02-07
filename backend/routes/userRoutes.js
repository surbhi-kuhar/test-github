<<<<<<< HEAD
const express = require("express");
const {
  signup,
  createActualUser,
  login,
  getUser,
  updateUser,
  deleteUser
} = require("../controller/userController");
const router = express.Router();
=======
const express=require("express");
const { signup,createActualUser, login } = require("../controller/userController");
const router=express.Router();
>>>>>>> origin/main
//const {upload}=require("../multer.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
<<<<<<< HEAD
    cb(null, "../uploads");
=======
    cb(null, '../uploads');
>>>>>>> origin/main
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
<<<<<<< HEAD
  },
});

const upload = multer({ storage: storage });

router.post("/signup", upload.single("file"), signup);
router.post("/activation", upload.single("file"), createActualUser);
router.post("/login", upload.single("file"), login);
router.get("/get/:id", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
module.exports = router;
=======
  }
});

const upload = multer({ storage: storage });
console.log("in Routs");
router.post('/signup',upload.single("file"),signup);
router.post("/activation",upload.single("file"),createActualUser);
router.post("/login",upload.single("file"),login);
module.exports=  router;
>>>>>>> origin/main
