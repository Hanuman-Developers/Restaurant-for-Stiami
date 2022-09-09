import express from "express"
const router = express.Router()
import {
	getBookings,
	getBookedTables,
	createBooking,
	cancelBooking,
} from "../controllers/bookingController.js"

router.route("/").get(getBookings)
router.route("/available").get(getBookedTables)
router.route("/newBooking").post(createBooking)
router.route("/cancelBooking").delete(cancelBooking)

export default router
