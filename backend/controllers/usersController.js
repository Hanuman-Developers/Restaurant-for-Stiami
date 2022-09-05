import asyncHandler from "express-async-handler"
import User from "../models/bookingsByUser.js"

const getUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find()

	if (users) {
		res.status(200).json({
			success: true,
			data: users,
		})
	} else {
		throw new Error("No users found")
	}
})

export { getUsers }
