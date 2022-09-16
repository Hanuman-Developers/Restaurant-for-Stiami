import expressAsyncHandler from "express-async-handler"
import asyncHandler from "express-async-handler"
import Table from "../models/tablesModel.js"
import Stripe from "stripe"
import Product from "../models/product.js"
import express from "express"
import axios from "axios"
import mongoose from "mongoose"
const stripe = new Stripe(
	"sk_test_51Lg3dwKkKO8NA6ZZuy3aaiasmwUwTS8UdiwSBVHHgXadSYdB1sSNbxlOkeQKQFcMy3BF75I1a4Me29WNopDBXnHM00SgoTvDd6"
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
			success_url:
				"http://localhost:3000/paymentSuccess?session_id={CHECKOUT_SESSION_ID}",
			cancel_url: "http://localhost:3000/paymentFailed",
		})
		console.log("creating session", session.id)
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
				sessionid: session.id,
			}
		)
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
		console.log("checking session", session.id)
		fulfillOrder(session)
		res.status(200).json({ success: true })
		return
	} else if (event.type === "charge.failed") {
		const session = event.data.object
		console.log("checking session", session.id)
		// Fulfill the purchase...
		removeOrder(session)
		res.status(402).json({ success: false })
		return
	}
	throw new Error("payment failed")
})

const paymentStatus = asyncHandler(async (req, res, next) => {
	const { session_id } = req.query
	console.log(session_id)
	const session = await stripe.checkout.sessions.retrieve(session_id)
	// console.log(session)
	if (session.payment_status === "paid") {
		res.status(200).json({ success: true })
		return
	} else {
		res.status(402).json({ success: false })
		return
	}
	throw new Error("Session not found")
})

//**************Cart Payment************** */

const findProductDetails = expressAsyncHandler(async (productids) => {
	const docIds = productids.map((id) => mongoose.Types.ObjectId(id))

	try {
		const products = await Product.find({ _id: { $in: docIds } })
		if (products) {
			return products
		}
	} catch (error) {
		console.log(error)
		throw new Error("Product not found")
	}
})

const handleCartPayment = asyncHandler(async (req, res, next) => {
	const { cartItems } = req.body
	const cartItemsIds = cartItems.map((item) => item.product)

	console.log(cartItems)
	const products = await findProductDetails(cartItemsIds)
	console.log(products)

	const line_items = products.map((product, index) => {
		return {
			price_data: {
				currency: "usd",
				product_data: {
					name: product.name,
				},
				unit_amount: product.price * 100,
			},
			quantity: cartItems[index].quantity,
		}
	})

	// console.log(line_items)

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items: line_items,
			metadata: {},
			success_url:
				"http://localhost:3000/paymentSuccess?session_id={CHECKOUT_SESSION_ID}",
			cancel_url: "http://localhost:3000/paymentFailed",
		})
		console.log("creating session", session.id)
		// console.log(session)
		res.json({ url: session.url })
	} catch (error) {
		throw new Error(error)
	}
})

//**************Cart Payment************** */

export {
	handleTablePayment,
	handleTablePayHook,
	paymentStatus,
	handleCartPayment,
}
