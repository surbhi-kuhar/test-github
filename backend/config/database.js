<<<<<<< HEAD
const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("connected to mongoDB");
    })
    .catch(() => {
      console.log("not connected");
    });
};

module.exports = connectToDB;
=======
const mongoose=require("mongoose");
const connectDb=()=>{
    const promiseReturByMongoose=mongoose.connect(process.env.MONGODB_URL);
    promiseReturByMongoose.then(()=>{
        console.log("connection Successful");
    }).catch((err)=>{
        console.log("connection unsuccesful");
    })
}
module.exports=connectDb;
>>>>>>> origin/main
