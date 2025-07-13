const mongoose  = require("mongoose");
const Order = require('../models/order');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      default: 'Generic',
    },
    countInStock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
    },
    images:{
      type:String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.pre('findByIdAndDelete', async function (next) {
  const productBeingDeleted = await this.model.findOne(this.getFilter());
  if (productBeingDeleted) {
    await Order.deleteMany({ productId: productBeingDeleted._id });
  }
  next();
});

productSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await Order.deleteMany({ productId: this._id });
  next();
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;