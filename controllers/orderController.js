const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandeler = require("../utils/errorhandeler");

// Creating new order
exports.createNewOrderController = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    order: order,
  });
});

// Get single order
exports.getSingleOrderController = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new Errorhandeler("Order not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order: order,
  });
});

// get logged in user orders
exports.myOrdersController = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders --admin
exports.getAllOrdersController = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;

  orders.forEach((order) => (totalAmount += order.totalPrice));
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update order staus --admin
exports.updateOrderStatusController = catchAsyncErrors(
  async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new Errorhandeler("Order not found with this id", 404));
    }
    if (order.orderStatus === "Delivered") {
      return next(
        new Errorhandeler("You have already delivered this order", 400)
      );
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(
        async (item) => await updataStock(item.product, item.quantity)
      );
    }


    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save();
    res.status(200).json({
      success: true,
    });
  }
);

// for updating the stock
async function updataStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save();
}

// delete order --admin
exports.deleteOrderColntroller = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new Errorhandeler("Order not found with this id", 404));
  }
  await order.remove();
  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});
