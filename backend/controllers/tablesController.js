import asyncHandler from "express-async-handler"
import Table from "../models/tablesModel.js"

const getTables = asyncHandler(async (req, res, next) => {
	let tables = await Table.find()

	if (tables) {
		res.status(200).json({
			success: true,
			tables: tables,
		})
	} else {
		throw new Error("No tables found")
	}
})

export { getTables }