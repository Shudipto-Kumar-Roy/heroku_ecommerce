const express = require("express");
const {
  signupController,
  loginController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  accessController,
  getUserDetailsController,
  updatePasswordController,
  updateUserProfileController,
  getAllUsersController,
  getSingleUserController,
  updateUserRoleController,
  deleteUserController,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../Auth/auth");

const router = express.Router();

router.post("/user/signup", signupController);
router.post("/user/login", loginController);
router.get("/user/logout", logoutController);
router.post("/user/password/forgot", forgotPasswordController);
router.post("/user/password/reset/:token", resetPasswordController);
router.get("/user/details", isAuthenticatedUser, getUserDetailsController);
router.put(
  "/user/password/update",
  isAuthenticatedUser,
  updatePasswordController
);
router.put("/user/update", isAuthenticatedUser, updateUserProfileController);
router.get(
  "/admin/allusers",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsersController
);
router.get(
  "/admin/user/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleUserController
);
router.put(
  "/admin/user/update/userrole/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateUserRoleController
);
router.delete(
  "/admin/user/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteUserController
);

router.get(
  "/admin",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  accessController
);
router.get("/navbar", isAuthenticatedUser, accessController);

module.exports = router;
