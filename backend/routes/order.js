const express = require("express");
const {getOrders,createOrder,getOrderById,updateOrder,deleteOrder,getOrderByUserId} = require("../controllers/order");
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post("/", authMiddleware , createOrder);
router.get('/user_order/:id',getOrderByUserId);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;