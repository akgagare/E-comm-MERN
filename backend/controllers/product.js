const Product = require('../models/product');
const Order = require("../models/order");
// Create Product

// Get All Products
exports.getProduct = async (req, res) => {
  try{
    const products = await Product.find();
    return res.status(200).json({ success: true, message:"Products",products });
  }catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.pid;
    const deletedProduct = await Product.findByIdAndDelete(id);
    await Order.deleteMany({productId:id});
    if (!deletedProduct)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
