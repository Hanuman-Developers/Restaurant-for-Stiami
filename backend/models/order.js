import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },

  orderItems: [
    {
      amount: { type: Number, required: true },
      category: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      name: { type: String, required: true },
    },
  ],
  // shippingAddress: {
  //   address: { type: String, required: true },
  //   city: { type: String, required: true },
  //   postalCode: { type: String, required: true },
  //   country: { type: String, required: true },
  // },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },

  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },

  orderStatus: {
    type: String,
    default: "Accepted",
  },
});

const Orders = mongoose.model("Orders", orderSchema);
export default Orders;