import asyncMiddleware from "../middleware/catchAsyncError.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "cloudinary";

// REGISTER A USER
const registerUser = asyncMiddleware(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password, PhoneNo } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    PhoneNo,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
  // const token = user.getJWTToken();

  // res.status(201).json({
  //     success: true,
  //     token,
  // });
});

// LOGIN USER
const loginUser = asyncMiddleware(async (req, res, next) => {
  const { email, password, isGuest } = req.body;

  // --------------- if the user is guest---------------
  if (isGuest === "guest") {
    const user1 = await User.findOne({ email: process.env.GUEST_EMAIL }).select(
      "+password",
    );

    if (!user1) {
      return next(new ErrorHandler("Invalid email and password", 401));
    }

    const password = process.env.GUEST_PASSWORD;

    const matched = await user1.comparePassword(password);

    if (!matched) {
      return next(new ErrorHandler("Invalid email and password", 401));
    }

    sendToken(user1, 200, res);
  }
  // ------------if the user is not a guest------------
  else {
    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
  }

  // const token = user.getJWTToken();

  // res.status(200).json({
  //     success: true,
  //     token,
  // });
});

// LOGOUT USER
const logoutUser = asyncMiddleware(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// FORGOT PASSWORD
const forgotPassword = asyncMiddleware(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // get resetPasswordToken
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host",
  // )}/api/v1/password/reset/${resetToken}`;

  // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host",
  )}/password/reset/${resetToken}`;

  const message = `Your password token is :- \n\n ${resetPasswordUrl} \n\n
                     If you have not requested this email then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "User password recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

// RESET PASSWORD
const resetPassword = asyncMiddleware(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired",
        404,
      ),
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// GET USER DETAILS
const getUserDetails = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// UPDATE USER PASSWORD
const updateUserPassword = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 404));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// UPDATE USER PROFILE
const updateUserProfile = asyncMiddleware(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const avatarId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(avatarId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// GET ALL USERS - ADMIN
const getAllUsers = asyncMiddleware(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// GET SINGLE USER DETAILS - ADMIN
const getSingleUserDetails = asyncMiddleware(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`),
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// UPDATE USER ROLE -- ADMIN
const updateUserRole = asyncMiddleware(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`),
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// DELETE USER -- ADMIN
const deleteUser = asyncMiddleware(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`),
    );
  }

  const avatarId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(avatarId);

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getSingleUserDetails,
  updateUserRole,
  deleteUser,
};
