const Order = require("../models/order");
const User = require('../models/user');
const Product = require('../models/product');

exports.createOrder = async (req, res) => {
  try {
    const customerId = req.user.id;
    console.log("userId",customerId);
    const { productId } = req.body;

    console.log("Pid",productId);

    const user = await User.findById(customerId);
    const product = await Product.findById(productId);

    if(!user){
      res.status(501).json("UserId not found");
    }
    if(!product){
      res.status(501).json("ProductId not found");
    }
    const order = await Order.create({
      customerId,
      productId
    });

    res.status(201).json({message:"Order created successfully",order});
  } catch (err) {
    console.error("createOrder ➜", err);
    res.status(500).json({ message: "Could not create order" });
  }
};


exports.getOrders = async (_, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("getOrders ➜", err);
    res.status(500).json({ message: "Could not fetch orders" });
  }
};

// ▸ GET /api/orders/:id  – fetch a single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("getOrderById ➜", err);
    res.status(500).json({ message: "Could not fetch order" });
  }
};

// ▸ PUT /api/orders/:id  – update an order
exports.updateOrder = async (req, res) => {
  try {
    const updates = req.body; // allow partial updates

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("updateOrder ➜", err);
    res.status(500).json({ message: "Could not update order" });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("deleteOrder ➜", err);
    res.status(500).json({ message: "Could not delete order" });
  }
};

exports.getOrderByUserId = async (req, res) => {
  try {
    const {id}  = req.params;
    console.log("customerId",id);
    
    const orders = await Order.find({customerId: id })
                              .populate("productId")  
                              .lean();                     

    console.log("orders",orders);
    if (!orders.length) {
      return res.status(404).json({
        message: "No orders found for this customer",
        data: [],
      });
    }
    return res.status(200).json({
      message: "Order data fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error in getOrderByUserId:", error);
    return res.status(500).json({ message: "Server error" });
  }
};