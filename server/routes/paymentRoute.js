import express from "express";
import {
  processPayment,
  sendStripeApiKey,
} from "../controllers/paymentController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

router.route("/process/payment").post(isAuthenticatedUser, processPayment);

export default router;
