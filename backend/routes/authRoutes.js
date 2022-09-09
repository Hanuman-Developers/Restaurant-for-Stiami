import express from "express";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

import {
  handleLogin,
  loginFailed,
  loginSuccess,
  logOut,
} from "../controllers/authController.js";

router.post("/", handleLogin);
router.get("/login/failed", loginFailed);
router.get("/login/success", loginSuccess);
router.get("/logout", logOut);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
export default router;
