import asyncMiddleware from "../middleware/catchAsyncError.js";
import Stripe from "stripe";

const processPayment = asyncMiddleware(async (req, res, next) => {
  const secret = process.env.STRIPE_SECRET_KEY;

  const stripe = new Stripe(secret);

  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "LKR",
    metadata: {
      company: "Ricey",
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

const sendStripeApiKey = asyncMiddleware(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

export { processPayment, sendStripeApiKey };
