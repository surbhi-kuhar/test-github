const customError = require("../middleware/customError");

module.exports.login=(req,res,next)=>{  
   if(true){
       next(new customError("catching a thief",404));
   }
}