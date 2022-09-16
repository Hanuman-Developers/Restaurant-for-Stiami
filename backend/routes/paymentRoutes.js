import express from "express"
const router = express.Router()
import {
	handleTablePayment,
	handleTablePayHook,
	paymentStatus,
	handleCartPayment,
} from "../controllers/paymentController.js"

router.route("/tables").post(handleTablePayment).get(paymentStatus)
router.route("/webhook/tables").post(handleTablePayHook)

router.route("/cart").post(handleCartPayment).get(paymentStatus)

export default router
