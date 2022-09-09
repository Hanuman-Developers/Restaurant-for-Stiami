import expressAsyncHandler from "express-async-handler"
import asyncHandler from "express-async-handler"
import Table from "../models/tablesModel.js"
import Stripe from "stripe"
import express from "express"
const stripe = new Stripe(
	"sk_test_51Lg3dwKkKO8NA6ZZ8PDgogdqDpBGkpmPqOCQ9TdyP0yYsIP9zgWqpeErCeUXLorHZ8xHcbYZGKOnFChpyzQlDCiT00em6mYpSN"
)

const findTableDetails = expressAsyncHandler(async (tableid) => {
	try {
		const table = await Table.findById(tableid)
		if (table) {
			console.log(table)
			return table
		}
	} catch (error) {
		console.log(error)
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
							name: table.number,
						},
						unit_amount: table.price * 100,
					},
					quantity: 1,
				},
			],
			success_url: "http://localhost:3000/paymentSuccess",
			cancel_url: "http://localhost:3000/failedPayment",
		})
		console.log(session)
		res.json({ url: session.url })
	} catch (error) {
		throw new Error(error)
	}
})

const fulfillOrder = (session) => {
	// TODO: fill me in
	console.log("Fulfilling order", session)
}

const endPointSecret =
	"whsec_efa983bb23b9f3dccb53d015aa4494a5b96391fa1066721a1ae8d73c47ee554a"

const handlePaymentEvents = asyncHandler(async (req, res, next) => {
	const payload = req.body
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
		const session = event.data.object

		// Fulfill the purchase...
		fulfillOrder(session)
	}

	res.status(200)
})

export { handleTablePayment, handlePaymentEvents, findTableDetails }

// const handleTablePayment = asyncHandler(async (req, res, next) => {
// 	const { product, token } = req.body
// 	const idempotencyKey = uuidv4()

// 	console.log(product, token, idempotencyKey)
// 	// res.status(200).json({ data: "okay" })

// 	return stripe.customers
// 		.create({
// 			email: token.email,
// 			source: token.id,
// 		})
// 		.then((customer) => {
// 			stripe.charges.create(
// 				{
// 					amount: product.price * 100,
// 					currency: "usd",
// 					customer: customer.id,
// 					receipt_email: token.email,
// 					description: `Purchase of ${product.name}`,
// 					shipping: {
// 						name: token.card.name,
// 						address: {
// 							country: token.card.address_country,
// 						},
// 					},
// 				},
// 				{ idempotencyKey }
// 			)
// 		})
// 		.then((result) => res.status(200).json(result))
// 		.catch((err) => console.log(err))
// })
