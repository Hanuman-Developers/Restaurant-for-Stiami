import Orders from "../models/order.js"
import Product from "../models/product.js"
import asyncHandler from "express-async-handler"

const createNewOrder = asyncHandler(async (req, res) => {
	console.log("ïnside Order")
	console.log(req.body.items)

	const newOrder = new Orders({
		userId: req.body.userId,
		customerId: req.body.customerId,
		paymentIntentId: req.body.paymentIntentId,
		products: req.body.products,
		subtotal: req.body.subtotal,
		total: req.body.total,
		shipping: req.body.shipping,
		payment_status: req.body.payment_status,
	})
	await newOrder.save()

	res.status(201).json({
		message: "Success",
	})
})

const getOrders = asyncHandler(async (req, res) => {
	const allorders = await Orders.find().lean().exec()
	res.status(200).json(allorders)
})

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Orders.findById({ _id: req.body._id }).lean().exec()
	res.status(200).json(order)
})

const changeOrderStatus = asyncHandler(async (req, res) => {
	const order = await Orders.findById({ _id: req.body._id }).lean().exec()

	if (order) {
		const updateOrder = {
			$set: {
				orderStatus: req.body.status,
			},
		}

		const update = await Orders.updateOne({ _id: req.body._id }, updateOrder)
		res.status(201).json(update)
	} else {
		res.status(404)
		throw new Error("Order not found")
	}
})

const getOrderByEmail = asyncHandler(async (req, res) => {
	console.log(req.query.email)
	const orders = await Orders.find({ userId: req.query.email })

	const orderWithProducts = []
	for (let i = 0; i < orders.length; i++) {
		// let newOrder
		let order = orders[i]
		const productDetails = []
		for (let j = 0; j < order.products.length; j++) {
			const product = await Product.findById(order.products[j].productId)
			const prodName = product.name
			const prodPrice = product.price
			productDetails.push({ prodName, prodPrice })
		}
		order = { order, productDetails }
		orderWithProducts.push(order)
	}

	res.status(200).json(orderWithProducts)
})

export {
	getOrders,
	createNewOrder,
	getOrderById,
	changeOrderStatus,
	getOrderByEmail,
}
