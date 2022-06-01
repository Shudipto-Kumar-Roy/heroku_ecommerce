const User = require("../models/userModel");
const sendTokenToCookie = require("../sendTokenToCookie");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandeler = require("../utils/errorhandeler");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { sendTokenMail } = require("../mail/sendMail");

// signup user
exports.signupController = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmpassword } = req.body;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return next(new Errorhandeler("User already exist with this email", 409));
  }
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "ecommerce_users",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    confirmpassword,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendTokenToCookie(user, 201, res);
});

// login user
exports.loginController = catchAsyncErrors(async (req, res, next) => {
  const { loginemail, loginpassword } = req.body;
  const user = await User.findOne({ email: loginemail }).select("+password");
  if (!user) {
    return next(new Errorhandeler("User not found", 404));
  }
  const isPasswordMatched = await user.comparePassword(loginpassword);
  if (!isPasswordMatched) {
    return next(new Errorhandeler("Invalid Credential", 401));
  }
  sendTokenToCookie(user, 200, res);
});

// logout user
exports.logoutController = (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

// forgot password
exports.forgotPasswordController = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new Errorhandeler("User not found", 404));
  }

  // Get Reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save();

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/user/password/reset/${resetToken}`;
  // const resetPasswordUrl = `http://localhost:3000/api/v1/user/password/reset/${resetToken}`;

  const message = `Your reset password link is ${resetPasswordUrl}`;
  const body = `<h3>Instructions : </h3> \n
  <p>Use the reset password link to reset your password , otherwise you can skip..</p> 
  ${message}
  `;
  try {
    await sendTokenMail({
      email: user.email,
      subject: "Password Recovery",
      body: body,
    });
    res.status(200).json({
      messaage: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new Errorhandeler(error.messaage, 500));
  }
});

// reset password
exports.resetPasswordController = catchAsyncErrors(async (req, res, next) => {
  // Creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new Errorhandeler(
        "Reset password token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new Errorhandeler("Password does not match", 400));
  }
  user.password = req.body.password;
  user.confirmpassword = req.body.confirmPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendTokenToCookie(user, 200, res);
});

// for check admin
exports.adminController = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ rootUser: req.user, isAuthenticated: true });
});

// get use details-- admin
exports.getUserDetailsController = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new Errorhandeler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "User Details gets successfully",
    user: user,
  });
});

// update login user password
exports.updatePasswordController = catchAsyncErrors(async (req, res, next) => {
  const { oldpassword, newpassword, confirmpassword } = req.body;
  const user = await User.findById(req.user._id).select("+password");

  const isPasswordMatched = await user.comparePassword(oldpassword);
  if (!isPasswordMatched) {
    return next(new Errorhandeler("Old password is invalid", 401));
  }

  if (newpassword !== confirmpassword) {
    return next(new Errorhandeler("Password does not match", 400));
  }

  user.password = newpassword;
  user.confirmpassword = confirmpassword;
  await user.save();
  sendTokenToCookie(user, 200, res);
});

// update user profile
exports.updateUserProfileController = catchAsyncErrors(
  async (req, res, next) => {
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
    };
    if (req.body.avatar !== "") {
      const existUser = await User.findById(req.user._id);

      const imageId = existUser.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);
    }

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "ecommerce_users",
      width: 150,
      crop: "scale",
    });

    updatedData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    const user = await User.findByIdAndUpdate(req.user._id, updatedData, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: user,
    });
  }
);

// get all users (admin)
exports.getAllUsersController = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users: users,
  });
});

// get single user (admin)
exports.getSingleUserController = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Errorhandeler(`User not found with this ${req.params.id}`));
  }
  res.status(200).json({
    success: true,
    user: user,
  });
});

// update use role (admin)
exports.updateUserRoleController = catchAsyncErrors(async (req, res, next) => {
  const userExist = await User.findById(req.params.id);
  if (!userExist) {
    return next(
      new Errorhandeler(`User does not exist with this ${req.params.id}`)
    );
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { userRole: req.body.role },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "User Role updated successfully",
    user: user,
  });
});

// delete user (admin)
exports.deleteUserController = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Errorhandeler(`User not found with this ${req.params.id}`));
  }
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    user: user,
  });
});
