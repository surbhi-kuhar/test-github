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