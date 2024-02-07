const express = require("express");
const {
  signup,
  createActualUser,
  login,
  getUser,
  updateUser,
  deleteUser
} = require("../controller/userController");
const router=express.Router();

router.post("/signup", upload.single("file"), signup);
router.post("/activation", upload.single("file"), createActualUser);
router.post("/login", upload.single("file"), login);
router.get("/get/:id", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
module.exports = router;



