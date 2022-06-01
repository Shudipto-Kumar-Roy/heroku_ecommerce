const express = require("express");
const {
  createNewOrderController,
  getSingleOrderController,
  myOrdersController,
  getAllOrdersController,
  updateOrderStatusController,
  deleteOrderColntroller,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../Auth/auth");
const router = express.Router();

router.post("/order/new", isAuthenticatedUser, createNewOrderController);
router.get(
  "/myorders/order/:id",
  isAuthenticatedUser,
  getSingleOrderController
);
router.get("/myorders", isAuthenticatedUser, myOrdersController);
router.get(
  "/admin/order/allorders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllOrdersController
);

router.put(
  "/admin/order/updatestatus/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrderStatusController
);
router.delete(
  "/admin/order/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteOrderColntroller
);
module.exports = router;
