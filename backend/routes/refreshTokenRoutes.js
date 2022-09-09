import express from "express";
const router = express.Router();

import { handleRefreshToken } from "../controllers/refreshtokenController.js";

router.get("/", handleRefreshToken);

export default handleRefreshToken;
