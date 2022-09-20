import express, { application } from "express"
import dotenv from "dotenv"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"
import connectDB from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import cookieSession from "cookie-session"
import corsOptions from "./config/corsOptions.js"
import passport from "passport"
import passportSetup from "./middlewares/passport.js"
import { createServer } from "http"
import { Server } from "socket.io"
import credentials from "./middlewares/credentials.js"
import Orders from "./models/order.js"
import registerRoutes from "./routes/registerRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import refreshTokenRoutes from "./routes/refreshTokenRoutes.js"
import tablesRoutes from "./routes/tablesRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import verifyJWT from "./middlewares/verifyjwt.js"
import productRoutes from "./routes/ProductRoutes.js"
import orderRoutes from "./routes/orderRoute.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import "express-async-errors"

dotenv.config()
connectDB()

const app = express()
app.use(credentials)
app.use(cors(corsOptions))
const router = express.Router()

app.use(
	cookieSession({
		httpOnly: true,
		name: "session",
		secret: "Stiami",
		maxAge: 24 * 60 * 60 * 100,
	})
)
app.use(passport.initialize())
app.use(passport.session())

// app.use(cookieParser());

// if (process.env.NODE_ENV === "development") {
// 	app.use(morgan("dev"))
// }
app.use("/api/payment/webhook/tables", express.raw({ type: "*/*" }))
app.use("/api/payment/webhook/cart", express.raw({ type: "*/*" }))
app.use(express.json())
router.use("/register", registerRoutes)
router.use("/auth", authRoutes)
router.use("/refresh", refreshTokenRoutes)
router.use("/tables", tablesRoutes)
router.use("/bookings", bookingRoutes)

// Add cookie parser for this middleware
// app.use(veJW
// Pass the asToken as Bearer in Authorization for testing
router.use("/products", productRoutes)
router.use("/orders", orderRoutes)
router.use("/payment", paymentRoutes)
// app.use(notFound);
// app.use(errorHandler);
app.use("/api", router)

const PORT = process.env.PORT || 5000
// our server instance

const httpServer = createServer(app)
const io = new Server(httpServer, {
	// ...
	// cors: {
	//   origin: "https://localhost:3000/",
	//   methods: ["GET", "POST"],
	//   credentials: true,
	// },
	cors: {
		origin: "*",
	},
})

io.on("connect", async (socket) => {
	console.log(socket.id)

	socket.emit("hello", "world")

	socket.on("response", (arg) => {
		console.log(arg)
	})

	socket.on("mark_shipped", async (id) => {
		console.log("shipped")
		// socket.emit("Success", "sent");
		const order = await Orders.find({ email: id }).lean().exec()
		const updateDocument = {
			$set: { status: "shipped" },
		}
		const result = await Orders.updateOne({ email: id }, updateDocument)

		io.sockets.emit("Check", "done")

		console.log(order)
	})

	/* */

	// ...
})

httpServer.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
