import asyncHandler from "express-async-handler"
import Booking from "../models/bookingsByDateModel.js"

const getBookings = asyncHandler(async (req, res, next) => {
	const bookings = await Booking.find()

	if (bookings) {
		res.status(200).json({
			success: true,
			data: bookings,
		})
	} else {
		throw new Error("No bookings found")
	}
})

const getFreeTables = asyncHandler(async (req, res, next) => {
	const date = new Date(req.query.date)
	const findBookingsOnDate = await Booking.find({ date: date })

	if (findBookingsOnDate && findBookingsOnDate.length > 0) {
		const slotStart = req.query.slotStart
		const slotEnd = req.query.slotEnd

		console.log(date, slotStart, slotEnd)

		const freeTables = []
		for (let i = 0; i < findBookingsOnDate[0].bookings.length; i++) {
			if (
				findBookingsOnDate[0].bookings[i].slotStart >= slotEnd ||
				findBookingsOnDate[0].bookings[i].slotEnd <= slotStart
			) {
				freeTables.push(findBookingsOnDate[0].bookings[i].tableid)
			}
		}

		res.status(200).json({
			data: freeTables,
		})
	} else {
		throw new Error("No bookings found")
	}
})

const createBooking = asyncHandler(async (req, res, next) => {
	const date = new Date(req.body.date)
	const findBookingsOnDate = await Booking.find({ date: date })

	const newBooking = {
		tableid: req.body.tableid,
		slotStart: req.body.slotStart,
		slotEnd: req.body.slotEnd,
		status: req.body.status,
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
	}
	if (findBookingsOnDate && findBookingsOnDate.length > 0) {
		console.log(findBookingsOnDate[0].date)

		let canBook = true
		for (let i = 0; i < findBookingsOnDate[0].bookings.length; i++) {
			if (findBookingsOnDate[0].bookings[i].tableid == newBooking.tableid) {
				console.log("tableid match")
				if (
					findBookingsOnDate[0].bookings[i].slotStart < newBooking.slotEnd &&
					findBookingsOnDate[0].bookings[i].slotEnd > newBooking.slotStart
				) {
					canBook = false
				}
			}
		}

		if (!canBook) {
			throw new Error("Table is already booked")
		}

		await Booking.findOneAndUpdate(
			{ date: date },
			{ $push: { bookings: newBooking } }
		)

		res.status(200).json({
			success: true,
			message: "Your table is booked.",
		})
	} else {
		console.log("creating new booking")

		const newBookingsByDate = new Booking({
			date: date,
			bookings: [newBooking],
		})

		await newBookingsByDate.save()

		res.status(200).json({
			success: true,
			message: "Your table is booked.",
		})
	}
})

const cancelBooking = asyncHandler(async (req, res, next) => {
	const date = new Date(req.body.date)
	const findBookingsOnDate = await Booking.find({ date: date })

	if (findBookingsOnDate && findBookingsOnDate.length > 0) {
		const bookingId = req.body.bookingid
		await Booking.findOneAndUpdate(
			{ date: date },
			{ $pull: { bookings: { _id: bookingId } } }
		)

		res.status(200).json({
			success: true,
			message: "Your booking is cancelled.",
		})
	} else {
		throw new Error("No bookings found")
	}
})

export { getBookings, getFreeTables, createBooking, cancelBooking }
