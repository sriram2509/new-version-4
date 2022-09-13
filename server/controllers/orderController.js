import Order from "../models/orderModel.js";
import asyncMiddleware from "../middleware/catchAsyncError.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

// NEW ORDER
const newOrder = asyncMiddleware(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
   
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
   
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// GET SINGLE ORDER DETAILS -- ADMIN
const getSingleOrder = asyncMiddleware(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this ID: ${req.params.id}`, 404),
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// GET LOGGED-IN USER ORDER DETAILS
const myOrders = asyncMiddleware(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// GET ALL ORDERS -- ADMIN
const getAllOrders = asyncMiddleware(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
});

// UPDATE ORDER STATUS -- ADMIN
const updateOrderStatus = asyncMiddleware(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this ID: ${req.params.id}`, 404),
    );
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("The Order was already delivered", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (ord) => {
      await updateStock(ord.product, ord.quantity); // here ord is single order element of orderItems
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

// DELETE ORDER -- ADMIN
const deleteOrder = asyncMiddleware(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorHandler(`Order not found by Id: ${req.params.id}`, 404),
    );
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

export {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
