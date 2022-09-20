import express from "express";
const router = express.Router();
import {
  getOrders,
  createNewOrder,
  getOrderById,
  changeOrderStatus,
  getOrderByEmail,
} from "../controllers/orderController.js";

router.route("/").post(createNewOrder);
router.route("/").get(getOrders);
router.route("/:id").post(getOrderById);
router.route("/:id/change").post(changeOrderStatus);
router.route("/myOrders").get(getOrderByEmail);

export default router;
