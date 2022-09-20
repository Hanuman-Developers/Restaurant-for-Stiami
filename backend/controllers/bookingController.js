import asyncHandler from "express-async-handler"
import Booking from "../models/bookingsByDateModel.js"
import Table from "../models/tablesModel.js"

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

const getBookedTables = asyncHandler(async (req, res, next) => {
	const date = new Date(req.query.date)
	const findBookingsOnDate = await Booking.find({ date: date })

	if (findBookingsOnDate.length == 0) {
		res
			.status(404)
			.json({ found: false, message: "No bookings found on this date" })
		return
	}

	if (findBookingsOnDate && findBookingsOnDate.length > 0) {
		const slotStart = req.query.slotStart
		const slotEnd = req.query.slotEnd

		console.log(date, slotStart, slotEnd)

		const bookedTablesIds = []
		for (let i = 0; i < findBookingsOnDate[0].bookings.length; i++) {
			if (
				findBookingsOnDate[0].bookings[i].slotStart < slotEnd &&
				findBookingsOnDate[0].bookings[i].slotEnd > slotStart
			) {
				bookedTablesIds.push(findBookingsOnDate[0].bookings[i].tableid)
			}
		}

		console.log(bookedTablesIds.length)
		console.log(bookedTablesIds)

		if (bookedTablesIds.length > 0) {
			res.status(200).json({
				found: true,
				data: bookedTablesIds,
			})
		} else {
			res.status(404).json({
				found: false,
				message: "No bookings found on this date and time",
			})
		}
	} else {
		throw new Error("No bookings found on this date")
	}
})

const createBooking = asyncHandler(async (req, res, next) => {
	const date = new Date(req.body.date)
	console.log("incoming date", typeof req.body.date)
	const findBookingsOnDate = await Booking.find({ date: date })

	const newBooking = {
		tableid: req.body.tableid,
		slotStart: req.body.slotStart,
		slotEnd: req.body.slotEnd,
		status: req.body.status,
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		sessionid: req.body.sessionid,
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

		res.status(201).json({
			success: true,
			message: "Your booking is confirmed.",
		})
	} else {
		console.log("creating new booking")

		const newBookingsByDate = new Booking({
			date: date,
			bookings: [newBooking],
		})

		await newBookingsByDate.save()

		res.status(201).json({
			success: true,
			message: "Your table booking is confirmed.",
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

export { getBookings, getBookedTables, createBooking, cancelBooking }
