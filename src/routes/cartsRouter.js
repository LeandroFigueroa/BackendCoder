import { Router } from "express";
import passport from "passport";
import {
  getCartByIdController,
  createCartController,
  updateCartController,
  cartdeleteOneController,
  updateProductQuantityController,
  addProductToCartController,
  generateTktController,
} from "../controllers/cartsController.js";

import { isUser } from "../middlewares/authVerification.js";
const router = Router();

router.get("/:id", getCartByIdController);
router.post("/", createCartController);

router.delete("/:cid/products/:pid", cartdeleteOneController);
router.put("/:id", updateCartController);

router.put("/:cid/products/:pid", isUser, updateProductQuantityController);

router.post("/:cid/products/:pid", isUser, addProductToCartController);
router.post("/:cid/purchase", generateTktController);
export default router;
