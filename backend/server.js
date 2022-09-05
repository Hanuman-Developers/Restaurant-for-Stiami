import express from "express"
import dotenv from "dotenv"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"
import connectDB from "./config/db.js"

import tablesRoutes from "./routes/tablesRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"

dotenv.config()

connectDB()

const app = express()

// if (process.env.NODE_ENV === "development") {
// 	app.use(morgan("dev"))
// }

app.use(express.json())

app.use("/api/tables", tablesRoutes)
app.use("/api/bookings", bookingRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
