const express=require("express");
const app=express();
const cookie=require("cookie-parser");
var jwt = require('jsonwebtoken');
const bodyParser=require('body-parser');
const dotenv = require("dotenv");
const userRoutes=require("./routes/userRoutes");
const errorHandler=require("./utils/errorHanler");
const connectDb=require("./config/database");
const cors=require("cors");
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookie());
app.use(cors());
cloudinary.config({
  cloud_name: "drt8pxy1q",
  api_key: "578449198298885",
  api_secret: "TDSnd4NoPgZ9NdsUz9LaRg5u8oU",
 )}
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/shop", shopRoutes);
app.use(errorHandler);
connectDb();
const server = app.listen(process.env.PORT, () => {
  console.log("server is running on port " + process.env.PORT);
});
module.exports = app;