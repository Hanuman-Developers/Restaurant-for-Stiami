import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "default",
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  stock: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
