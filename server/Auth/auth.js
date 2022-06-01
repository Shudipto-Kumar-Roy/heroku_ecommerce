const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandeler = require("../utils/errorhandeler");

// Check the login user
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Errorhandeler("Please login to access the resource", 401));
  }
  const decodeData = await jwt.verify(token, process.env.SECRET_KEY);
  const rootUser = await User.findById(decodeData.id);
  req.user = rootUser;
  req.token = token;
  next();
});

// Check the authorized admin
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userRole)) {
      return next(
        new Errorhandeler(
          `Role : ${req.user.userRole} is not allowed to access the resource`,
          401
        )
      );
    }
    next();
  };
};
