import express from "express"
const router = express.Router()
import {
	getBookings,
	getFreeTables,
	createBooking,
	cancelBooking,
} from "../controllers/bookingController.js"

router.route("/").get(getBookings)
router.route("/available").get(getFreeTables)
router.route("/newBooking").post(createBooking)
router.route("/cancelBooking").delete(cancelBooking)

export default router
