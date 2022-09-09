import express, { application } from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import corsOptions from "./config/corsOptions.js";
import passport from "passport";
import passportSetup from "./middlewares/passport.js";

import credentials from "./middlewares/credentials.js";
import registerRoutes from "./routes/registerRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import refreshTokenRoutes from "./routes/refreshTokenRoutes.js";
import tablesRoutes from "./routes/tablesRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import verifyJWT from "./middlewares/verifyjwt.js";
import productRoutes from "./routes/ProductRoutes.js";

import "express-async-errors";

dotenv.config();
connectDB();

const app = express();
app.use(credentials);
app.use(cors(corsOptions));

app.use(
  cookieSession({
    httpOnly: true,
    name: "session",
    secret: "Stiami",
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use(cookieParser());

// if (process.env.NODE_ENV === "development") {
// 	app.use(morgan("dev"))
// }

app.use(express.json());
app.use("/api/register", registerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/refresh", refreshTokenRoutes);
app.use("/api/tables", tablesRoutes);
app.use("/api/bookings", bookingRoutes);

// Add cookie parser for this middleware
// app.use(verifyJWT);

// Pass the accessToken as Bearer in Authorization for testing
app.use("/api/products", productRoutes);
// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
