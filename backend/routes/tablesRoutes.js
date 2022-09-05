import express from "express"
const router = express.Router()
import { getTables } from "../controllers/tablesController.js"

router.route("/").get(getTables)

export default router
