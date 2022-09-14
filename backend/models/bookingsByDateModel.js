import mongoose from "mongoose"

const bookingSchema = mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	bookings: [
		{
			tableid: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
			slotStart: { type: Number, required: true },
			slotEnd: { type: Number, required: true },
			status: { type: String, required: true },
			// user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			email: { type: String, required: true },
			phone: { type: String },
			name: { type: String },
			sessionid: { type: String },
		},
	],
})

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking
