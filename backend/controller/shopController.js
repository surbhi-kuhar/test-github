const customError = require("../middleware/customError");
const Shop = require("../models/shop");

const customResponse = (message, success, res) => {
  res.status(400).json({
    success: success,
    message: message,
  });
};

module.exports.createShop = async (req, res, next) => {
  let data = req.body;
  const {
    shopname,
    ownername,
    email,
    contactNumber,
    aadharCard,
    address,
    latitude,
    longitude,
    category,
  } = data;

  try {
    const shop = await Shop.findOne({ email });

    if (shop) {
      customResponse("Shop already exists", false, res);
    } else {
      const shopCreated = await Shop.create({
        shopname,
        ownername,
        email,
        contactNumber,
        aadharCard,
        address,
        latitude,
        longitude,
        category,
      });

      res.status(200).json({
        success: true,
        message: "Shop created successfully",
        shopCreated,
      });
    }
  } catch (err) {
    next(new customError(err));
  }
};
