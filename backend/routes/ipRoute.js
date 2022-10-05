import express from "express";
const router = express.Router();

import { saveIp } from "../controllers/ipcontroller.js";

router.post("/", saveIp);

export default router;
