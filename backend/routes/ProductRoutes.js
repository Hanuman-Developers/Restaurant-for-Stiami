import express from "express";
const router = express.Router();
import {
  createNewProduct,
  updateProduct,
  getAllProducts,
} from "../controllers/productController.js";
import ROLES_LIST from "../config/rolesList.js";
import verifyRoles from "../middlewares/verifyroles.js";

router.route("/create").post(createNewProduct);
router.route("/update/:title").post(updateProduct);
router.get("/", verifyRoles(ROLES_LIST.Admin), getAllProducts);

export default router;
