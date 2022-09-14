import expressAsyncHandler from "express-async-handler"
import asyncHandler from "express-async-handler"
import Table from "../models/tablesModel.js"
import Stripe from "stripe"
import express from "express"
import axios from "axios"
const stripe = new Stripe(
	"sk_test_51Lg3dwKkKO8NA6ZZ8PDgogdqDpBGkpmPqOCQ9TdyP0yYsIP9zgWqpeErCeUXLorHZ8xHcbYZGKOnFChpyzQlDCiT00em6mYpSN"
)

const findTableDetails = expressAsyncHandler(async (tableid) => {
	try {
		const table = await Table.findById(tableid)
		if (table) {
			return table
		}
	} catch (error) {
		console.log(error)
		throw new Error("Table not found")
	}
})

const handleTablePayment = asyncHandler(async (req, res, next) => {
	const { product } = req.body

	console.log(product)
	const table = await findTableDetails(product.tableid)

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: `Table number ${table.number}`,
						},
						unit_amount: table.price * 100,
					},
					quantity: 1,
				},
			],
			metadata: {
				tableid: product.tableid,
				date: product.date,
				startTimeinMins: product.startTimeinMins,
				endTimeinMins: product.endTimeinMins,
				email: product.email,
			},
			success_url: "http://localhost:3000/paymentSuccess",
			cancel_url: "http://localhost:3000/paymentFailed",
		})
		// console.log(session)
		res.json({ url: session.url })
	} catch (error) {
		throw new Error(error)
	}
})

const fulfillOrder = asyncHandler(async (session) => {
	console.log("session", session.metadata)

	const { tableid, startTimeinMins, endTimeinMins, email, date } =
		session.metadata
	const table = await findTableDetails(tableid)
	console.log(table)

	try {
		const res = await axios.post(
			"http://localhost:5000/api/bookings/newBooking",
			{
				date: date,
				tableid: tableid,
				slotStart: startTimeinMins,
				slotEnd: endTimeinMins,
				status: "booked",
				email: email,
			}
		)
		console.log(res)
		if (res.status === 201) {
			console.log("Booking successful")
			return
		}
	} catch (error) {
		console.log(error)
	}
})

const removeOrder = (session) => {
	console.log("Error", session.failure_message)
}

const endPointSecret =
	"whsec_efa983bb23b9f3dccb53d015aa4494a5b96391fa1066721a1ae8d73c47ee554a"

const handleTablePayHook = asyncHandler(async (req, res, next) => {
	const payload = req.body
	console.log(payload)
	const sig = req.headers["stripe-signature"]

	let event

	try {
		event = stripe.webhooks.constructEvent(payload, sig, endPointSecret)
	} catch (err) {
		console.log(err)
		return res.status(400).send(`Webhook Error: ${err.message}`)
	}
	// Handle the checkout.session.completed event
	if (event.type === "checkout.session.completed") {
		const session = await stripe.checkout.sessions.retrieve(
			event.data.object.id,
			{
				expand: ["line_items"],
			}
		)
		// Fulfill the purchase...
		fulfillOrder(session)
		res.status(200).json({ success: true })
		return
	} else if (event.type === "charge.failed") {
		const session = event.data.object
		// Fulfill the purchase...
		removeOrder(session)
		res.status(402).json({ success: false })
		return
	}
	throw new Error("payment failed")
})

export { handleTablePayment, handleTablePayHook }
