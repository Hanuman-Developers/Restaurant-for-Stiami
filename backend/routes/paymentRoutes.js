import express from "express"
const router = express.Router()
import {
	handleTablePayment,
	handlePaymentEvents,
	findTableDetails,
} from "../controllers/paymentController.js"

router.route("/tables").post(handleTablePayment)

export default router
