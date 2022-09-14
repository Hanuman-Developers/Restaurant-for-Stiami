import express from "express"
const router = express.Router()
import {
	handleTablePayment,
	handleTablePayHook,
	paymentStatus
} from "../controllers/paymentController.js"

router.route("/tables").post(handleTablePayment).get(paymentStatus)
router.route("/webhook/tables").post(handleTablePayHook)

export default router
