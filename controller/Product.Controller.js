const Product = require("../model/Product.Model.js");
const User = require("../model/userModel.js");
exports.createProduct = async (req, res) => {
  try {
    let { title, description, price, rating, image, quantity, createdBy } =
      req.body;
    const existingProduct = await Product.findOne({ title });
    if (existingProduct)
      return res.status(400).json({
        success: false,
        message: "title already Exist",
      });
    const commodity = await Product.create({
      title,
      description,
      price,
      rating,
      image,
      quantity,
      createdBy,
    });
    res.status(201).json({
      success: true,
      message: " Product Created Successfully",
      commodity,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//GET ALL PRODUCTS
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("createdBy", "userName email country gender")
      .sort({ createdAt: -1 });
    res.status(201).json({
      sucess: true,
      message: "products Retrived Successful",
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GETPRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const commodity = await Product.findById(req.params.id)
      .populate("createdBy", "userName email country gender")
      .sort({ createdAt: -1 });
    if (!commodity) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: " Product retrived sucessfully",
      commodity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//UPDATE PRODUCT

exports.updateProduct = async (req, res) => {
  try {
    const { title, ...otherData } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        ...otherData,
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("createdBy", "userName email country gender");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "product updated successfully",

      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE PRODUCT

exports.deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(
      req.params.id,
    ).populate("createdBy", "userName email country gender");
    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
