import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import Stripe from "stripe"
import bodyParser from "body-parser"
const stripe = new Stripe(
	"sk_test_51Lg3dwKkKO8NA6ZZ8PDgogdqDpBGkpmPqOCQ9TdyP0yYsIP9zgWqpeErCeUXLorHZ8xHcbYZGKOnFChpyzQlDCiT00em6mYpSN"
)

const router = express.Router()

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"
import connectDB from "./config/db.js"

import tablesRoutes from "./routes/tablesRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use("/api/payment/webhook/tables", express.raw({ type: "*/*" }))
app.use(express.json())

router.use("/tables", tablesRoutes)
router.use("/bookings", bookingRoutes)
router.use("/payment", paymentRoutes)

app.use("/api", router)

// This is your Stripe CLI webhook secret for testing your endpoint locally.

// app.post("/api/payments/webhook", async (req, res) => {
// 	// Simple deserialization:
// 	console.log(req.body)
// 	const event = JSON.parse(req.body)
// 	console.log(event.type)
// 	console.log(event.data.object)
// 	console.log(event.data.object.id)
// 	// With signature verification:
// 	// const payload = req.body
// 	// const sig = req.headers["stripe-signature"]
// 	// console.log(sig)
// 	// const endpointSecret =
// 	// 	"whsec_efa983bb23b9f3dccb53d015aa4494a5b96391fa1066721a1ae8d73c47ee554a"

// 	// let event

// 	// try {
// 	// 	event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
// 	// } catch (error) {
// 	// 	console.log(error.message)
// 	// 	res.status(400).json({ success: false })
// 	// 	return
// 	// }

// 	// console.log(event.type)
// 	// console.log(event.data.object)
// 	// console.log(event.data.object.id)

// 	res.json({ success: true })
// })

app.use(notFound)
app.use(errorHandler)

// const PORT = process.env.PORT || 5000
const PORT = 5000

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
