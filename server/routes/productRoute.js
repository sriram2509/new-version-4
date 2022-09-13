import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAllProductsAdmin,
} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route("/product/:id").get(getProductDetails);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllProductsAdmin);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews);

router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

export default router;
