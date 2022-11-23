const express = require("express");
const {
  getAllProducts,
  getAllAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReviewController,
  getProductReviewsController,
  deleteProductReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../Auth/auth");
const router = express.Router();

router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);
router.get("/products", getAllProducts);
router.get("/alladminproducts", getAllAdminProducts);
router.put(
  "/admin/product/update/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);
router.delete(
  "/admin/product/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

router.put(
  "/product/review",
  isAuthenticatedUser,
  createProductReviewController
);

router.get("/admin/product/reviews",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getProductReviewsController);

router.delete(
  "/admin/product/review/delete",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProductReview
);
router.get("/product/:id", getSingleProduct);

module.exports = router;
