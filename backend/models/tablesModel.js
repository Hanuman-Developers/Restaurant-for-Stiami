import mongoose from "mongoose"

const tableSchema = mongoose.Schema(
	{
		number: {
			type: Number,
			required: true,
		},
		capacity: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Table = mongoose.model("Table", tableSchema)

export default Table
