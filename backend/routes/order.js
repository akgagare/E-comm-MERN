const express = require("express");
const {getOrders,createOrder,getOrderById,updateOrder,deleteOrder,getOrderByUserId} = require("../controllers/order");
const authMiddleware = require('../middleware/authMiddleware');
const verifyRole = require("../middleware/roleMiddleware");


const router = express.Router();

router.post("/",authMiddleware,createOrder);
router.get('/user_order/:id',authMiddleware,getOrderByUserId);
router.get("/",authMiddleware, getOrders);
router.get("/:id", authMiddleware,getOrderById);
router.put("/:id", authMiddleware,updateOrder);
router.delete("/:id", authMiddleware,deleteOrder);

module.exports = router;