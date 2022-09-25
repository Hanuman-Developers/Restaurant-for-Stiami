import expressAsyncHandler from "express-async-handler"
import asyncHandler from "express-async-handler"
import Table from "../models/tablesModel.js"
import Stripe from "stripe"
import Product from "../models/product.js"
import express from "express"
import axios from "axios"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const stripe = new Stripe(
	"sk_test_51Lg3dwKkKO8NA6ZZ41l9k576XEGKrnJGOnhAfFmNoUy4pHE8FXKGLxKaOEBzX25rGp3GFcgLNBfvWvvP0OU9dQKh006yE8QBwT"
)

const fetchUrl =
	process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "/api"

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
			success_url: `${process.env.CLIENT_URL}paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}paymentFailed`,
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
		const res = await axios.post(`${fetchUrl}/bookings/newBooking`, {
			date: date,
			tableid: tableid,
			slotStart: startTimeinMins,
			slotEnd: endTimeinMins,
			status: "booked",
			email: email,
			sessionid: session.id,
		})
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
	} else {
		console.log(event.type)
	}
	res.status(200).end()
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

//*****************************************Cart Payment********************************************* */
//*****************************************Cart Payment********************************************* */
//*****************************************Cart Payment********************************************* */
//*****************************************Cart Payment********************************************* */

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
	const { cartItems, addressLine1, addressLine2, pincode, user } = req.body
	const cartItemsIds = cartItems.map((item) => item.product)

	console.log(cartItems)
	const products = await findProductDetails(cartItemsIds)
	console.log(products)

	const customer = await stripe.customers.create({
		metadata: {
			user: user,
			cart: JSON.stringify(req.body.cartItems),
		},
	})

	const line_items = products.map((product, index) => {
		return {
			price_data: {
				currency: "usd",
				product_data: {
					name: product.name,
					// Images: product.image,
					metadata: {
						id: product._id,
					},
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
			metadata: {
				addressLine1: addressLine1,
				addressLine2: addressLine2,
				pincode: pincode,
				user: user,
			},
			customer: customer.id,
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

const fullfillCartOrder = asyncHandler(async (customer, data) => {
	const Items = JSON.parse(customer.metadata.cart)

	const products = Items.map((item) => {
		return {
			productId: item.product,
			quantity: item.quantity,
		}
	})

	// const { addressLine1, addressLine2, pincode, user } = session.metadata
	const shipping = data.metadata.addressLine1 + " " + data.metadata.addressLine2

	console.log(
		"final order",
		customer.metadata.user,
		data.customer,
		data.payment_intent,
		products,
		data.amount_subtotal,
		data.amount_total,
		shipping,
		data.payment_status
	)

	try {
		const res = await axios.post(`${fetchUrl}/orders`, {
			userId: customer.metadata.user,
			customerId: data.customer,
			paymentIntentId: data.payment_intent,
			products,
			subtotal: data.amount_subtotal,
			total: data.amount_total,
			shipping: shipping,
			payment_status: data.payment_status,
		})
		if (res.status === 201) {
			console.log("Order successful")
			return
		}
	} catch (error) {
		console.log(error)
	}
})

const handleCartPayHook = asyncHandler(async (req, res, next) => {
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
	const data = event.data.object
	// Handle the checkout.session.completed event
	if (event.type === "checkout.session.completed") {
		stripe.customers
			.retrieve(data.customer)
			.then(async (customer) => {
				try {
					// CREATE ORDER
					fullfillCartOrder(customer, data)
				} catch (err) {
					console.log(typeof createOrder)
					console.log(err)
				}
			})
			.catch((err) => console.log(err.message))
	}
	res.status(200).end()
})

//**************Cart Payment************** */

export {
	handleTablePayment,
	handleTablePayHook,
	paymentStatus,
	handleCartPayment,
	handleCartPayHook,
}
