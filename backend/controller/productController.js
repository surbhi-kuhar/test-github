const customError = require("../middleware/customError");
const Product = require("../models/product");

const customResponse = (message, success, res) => {
  res.status(400).json({
    success: success,
    message: message,
  });
};

module.exports.createProduct = async (req, res, next) => {
  let data = req.body;
  const {
    name,
    description,
    actualPrice,
    discountPrice,
    sellingPrice,
    images,
    stock,
    rating,
    totalRating,
    reviews,
    shopId,
    category,
  } = data;

  try {
    const productCreated = await Product.create({
      name,
      description,
      actualPrice,
      discountPrice,
      sellingPrice,
      images,
      stock,
      rating,
      totalRating,
      reviews,
      shopId,
      category,
    });

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      productCreated,
    });
  } catch (err) {
    next(new customError(err));
  }
};

module.exports.getProduct = async (req, res, next) => {
  let productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json({
        success: true,
        message: "Product found",
        product,
      });
    } else {
      customResponse("Product not found", false, res);
    }
  } catch (err) {
    next(new customError(err));
  }
};

module.exports.updateProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    console.log(updatedProduct);

    if (updatedProduct) {
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
      });
    } else {
      customResponse("Failed to update product", false, res);
    }
  } catch (err) {
    next(new customError(err));
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  let productId = req.params.id;

  try {
    const productDeleted = await Product.findByIdAndDelete(productId);
    if (productDeleted) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } else {
      customResponse("Failed to delete product", false, res);
    }
  } catch (err) {
    next(new customError(err));
  }
};

module.exports.searchProducts = async (req, res, next) => {
  try {
    let filterQuery = {};
    let searchTerm = req.query.searchTerm || "";
    console.log(searchTerm);
    
    if (searchTerm) {
      filterQuery.name = {
        $regex: searchTerm,
        $options: "i", // case-insensitive search
      };
    }

    if (req.query.from && req.query.to) {
      filterQuery.sellingPrice = {
        $gte: parseFloat(req.query.from),
        $lte: parseFloat(req.query.to),
      };
    }

    const products = await Product.find(filterQuery);

    if (req.query.latest) {
      products.sort((a, b) => b.createdAt - a.createdAt);
    }

    if (req.query.asc) {
      products.sort((a, b) => a.sellingPrice - b.sellingPrice);
    } else if (req.query.desc) {
      products.sort((a, b) => b.sellingPrice - a.sellingPrice);
    }

    if (req.query.rating) {
      products.sort((a, b) => b.totalRating - a.totalRating);
    }

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    next(new customError(err));
  }
};
// Assume you have a Product model representing your products in MongoDB

 // Import your Product model

// Controller to handle product search
module.exports.searchProductBYChatGpt = async (req, res) => {
  try {
    const { query } = req.query; // Get the search query from the request

    // Split the query into keywords
    // const keywords = query.split(' ');

    // Construct a MongoDB query to search for products containing all keywords
    const searchQuery = { name: query  }; // This will find products containing all keywords

    // Execute the search query
    const products = await Product.find(searchQuery);

    // Send the found products as the response
    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

