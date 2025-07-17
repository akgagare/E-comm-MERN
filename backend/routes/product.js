const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require('../middleware/authMiddleware');
const productController = require('../controllers/product');
const Product = require("../models/product");
const verifyRole = require('../middleware/roleMiddleware');
// Setup Multer for file uploads


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Save files to public/uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  }
});
const upload = multer({ storage });

router.post("/",authMiddleware,verifyRole("admin"), upload.single("photos"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const product = await Product.create({
      ...req.body,
      brand: req.body.brand || "Generic",
      images:req.file.filename
    });
    res.status(201).json({message:"Product added successfully" , product});
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/', authMiddleware, productController.getProduct);
router.get('/:id', authMiddleware,productController.getProductById);
router.put('/:id',authMiddleware,verifyRole("admin"),productController.updateProduct);
router.delete('/:pid/:userId',authMiddleware,verifyRole("admin"), productController.deleteProduct);

module.exports = router;