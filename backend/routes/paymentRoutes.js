import express from "express"
const router = express.Router()
import {
	handleTablePayment,
	handleTablePayHook,
	paymentStatus,
	handleCartPayment,
	handleCartPayHook,
} from "../controllers/paymentController.js"

router.route("/tables").post(handleTablePayment)
router.route("/webhook/tables").post(handleTablePayHook)
router.route("/cart").post(handleCartPayment)
router.route("/webhook/cart").post(handleCartPayHook)
router.route("/").get(paymentStatus)

export default router
