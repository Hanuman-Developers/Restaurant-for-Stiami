import express from "express";
const router = express.Router();
import {
  createNewProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
} from "../controllers/productController.js";
import ROLES_LIST from "../config/rolesList.js";
import verifyRoles from "../middlewares/verifyroles.js";

router.route("/create").post(createNewProduct);
router.route("/update/:_id").post(updateProduct);
// router.get("/", verifyRoles(ROLES_LIST.Admin), getAllProducts);
router.get("/", getAllProducts);
router.delete("/", deleteProduct);

export default router;
