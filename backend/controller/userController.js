

const customError = require("../middleware/customError");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
//const sendToken = require("../utils/sendToken");
const sendToken=async(user,statusCode,message,res)=>{
  const token=user.getToken();
  console.log("hello");
  // options for cookies
  //const COOKIES_EXPIRES=Number
  res.cookie('token', token, {
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days in milliseconds
      httpOnly: true,
  });
  return res.status(statusCode).json({
      user:user,
      message:message,
      success:true
  })
};

module.exports.signup = async (req, res, next) => {
  console.log("indside");
  const { name, email, password } = req.body;
  console.log("inside controller");
  console.log(name, email, password);
  const user = await User.findOne({ email: email });
  if (user) {
    next(new customError("User Already Exists", 400));
    return; // Added return to prevent the code below from executing
  }
  const newUserToBeCreated = {
   fullname: name,
   email: email,
   password: password,
   image: "req.file.filename", // Corrected the image property
 };
  const activationToken =  createActivationToken(newUserToBeCreated);

  const activationUrl = `http://localhost:3000/activation/${activationToken}`;
  try {
    await sendEmail({
      email: newUserToBeCreated.email,
      subject: "Activate Your Account",
      message: `Hello ${newUserToBeCreated.fullname} Please Click To Activate On The Link For Your Account: ${activationUrl}`,
    });
  } catch (err) {
    next(new customError(err.message, 500));
    return; // Added return to prevent the code below from executing
  }
};
module.exports.createActualUser=async(req,res,next)=>{
   console.log("calledd Actual");
   const {activationToken}=req.body;
   console.log("activationToken", activationToken);
   const newuser=await jwt.verify(activationToken, process.env.jwtActivationSecret);
   console.log(newuser);
   const {id}=newuser;
   if(!newuser){
      next(new customError("ToKen Expired",400));
   }
   try {
      const u = await User.create({ ...id });
      sendToken(u,201,"User Created Succesfully",res);
    } catch (err) {
      next(new customError(err.message, 500));
    }
}
const createActivationToken = (user) =>{
  return jwt.sign({ id:user}, process.env.jwtActivationSecret, {
    expiresIn: "5m",
  });
};
module.exports.login = async (req, res, next) => {
  let data = req.body;
  const { email, password } = data;
  const user = await User.findOne({ email:email }).select("password");
  console.log(user);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  } else {
    try {
      console.log("1");
      const passMatch = await user.checkPassword(password);
      console.log("2");
      if (!passMatch) {
        res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "user logged in successfully",
        });
      }
    } catch (err) {
      console.log("sere");
      next(new customError(err.message, 400));
    }
  }
};
