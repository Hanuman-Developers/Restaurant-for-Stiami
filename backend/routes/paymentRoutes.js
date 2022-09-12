import express from "express"
const router = express.Router()
import {
	handleTablePayment,
	handleTablePayHook,
} from "../controllers/paymentController.js"

router.route("/tables").post(handleTablePayment)
router.route("/webhook/tables").post(handleTablePayHook)

export default router
