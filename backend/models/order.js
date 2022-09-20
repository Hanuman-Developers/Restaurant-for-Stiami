import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		products: [
			{ productId: { type: String }, quantity: { type: Number, default: 1 } },
		],
		subtotal: { type: Number, required: true },
		total: { type: Number, required: true },
		shipping: { type: Object, required: true },
		delivery_status: { type: String, default: "Created" },
		payment_status: { type: String, required: true },
	},
	{ timestamps: true }
)

const Orders = mongoose.model("Orders", orderSchema)
export default Orders
