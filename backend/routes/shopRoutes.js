const express=require("express");
const { createShop } = require("../controller/shopController");
const router=express.Router();

router.post("/create",createShop);

module.exports = router;