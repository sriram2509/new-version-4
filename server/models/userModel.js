import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [30, "Name cannot exceed 30 characters"],
    minlength: [4, "naem should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password should be more than 8 characters"],
    select: false,
  },
  PhoneNo: {
    type: String,
    required: [true, "Please enter your mobile number"],
    // minlength: [8, "Password should be more than 8 characters"],
    unique: true,
  },
  avatar: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// HASHING the PASSWORD before saving user data
userSchema.pre("save", async function (next) {
  // here not using arrow funtion because we can't use "this" keyword in arrow function
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// JSON WEB TOKEN (JWT)
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// GENERATING TOKEN TO RESET PASSWORD
userSchema.methods.getResetPasswordToken = function () {
  // generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // setting the time to expire the token (here 15min)
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

// USER MODEL
const User = mongoose.model("User", userSchema);

export default User;
