import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {timestamps: true,}
);

const productSchema = new mongoose.Schema({

  productId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  altNames: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  labelledPrice: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  reviews: [reviewSchema],
  averageRating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
