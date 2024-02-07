const customError = require("../middleware/customError");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
//const sendToken = require("../utils/sendToken");

const sendToken = (user, statusCode, message, res) => {
  const token = user.getToken();
  console.log(token);
  res.cookie("token", token, {
    expiresIn: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  res.status(statusCode).json({
    user: user,
    success: true,
    message: message,
  });
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
  const activationToken = createActivationToken(newUserToBeCreated);

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
module.exports.createActualUser = async (req, res, next) => {
  console.log("called Actual");
  const { activationToken } = req.body;
  console.log("activationToken", activationToken);
  const newuser = await jwt.verify(
    activationToken,
    process.env.jwtActivationSecret
  );
  console.log(newuser);
  const { id } = newuser;
  if (!newuser) {
    next(new customError("ToKen Expired", 400));
  }
  try {
    const u = await User.create(id);
    sendToken(u, 201, "User Created Succesfully", res);
  } catch (err) {
    next(new customError(err.message, 500));
  }
};
const createActivationToken = (user) => {
  return jwt.sign({ id: user }, process.env.jwtActivationSecret, {
    expiresIn: "5m",
  });
};

module.exports.login = async (req, res, next) => {
  let data = req.body;
  const { email, password } = data;
  const user = await User.findOne({ email: email }).select("+password");
  console.log("abgj", user);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  } else {
    try {
      const passMatch = await user.checkPassword(password);
      if (!passMatch) {
        res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      } else {
        sendToken(user, 201, "user logged in successfully", res);
      }
    } catch (err) {
      console.log("err");
      next(new customError(err.message, 400));
    }
  }
};

module.exports.getUser = async (req, res, next) => {
  let id = req.params.id;

  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({
        success: true,
        message: "user found",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (err) {
    next(new customError(err));
  }
};

module.exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: "user updated successfully",
        updatedUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "failed to update user",
      });
    }
  } catch (err) {
    next(new customError(err));
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletecheck = await User.findByIdAndDelete(id);
    if (deletecheck) {
      res.status(200).json({
        success: true,
        message: "user deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "failed to delete user",
      });
    }
  } catch (err) {
    next(new customError(err));
  }
};