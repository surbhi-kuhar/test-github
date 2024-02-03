const customError = require("../middleware/customError");
const User = require("../models/user");
module.exports.signup=async(req,res,next)=>{ 
    const{fullname,email,password}=req.body;
    console.log("inside controller");
    console.log(fullname,email,password);
    const user=await User.findOne({email:email});
    if(user){
       next(new customError("User Already Exists",400));
    }
    try{
        const newUserToBeCreated={
        fullname:fullname,
        email:email,
        password:password,
        image:"filename"
        };
       const u=await User.create(newUserToBeCreated);
       return res.status(200).json({
        message:"User Created Succesfully",
        success:true,
        user:u
       });
    }
    catch(err){
       next(new customError(err.message,500));
    }
 }