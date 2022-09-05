import mongoose from "mongoose"

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	bookings: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
	],
})

export const User = mongoose.model("User", userSchema)
