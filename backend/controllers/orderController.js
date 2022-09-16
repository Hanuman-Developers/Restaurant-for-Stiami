import Orders from "../models/order.js";
import asyncHandler from "express-async-handler";

const createNewOrder = asyncHandler(async (req, res) => {
  console.log("ïnside Order");
  console.log(req.body.items);
  let params = req.body;
  //   console.log(params);

  const newOrder = new Orders({
    user: req.body.user,
    orderItems: req.body.orderItems,
    // shippingAddress: req.body.shippingAddress,
    totalPrice: req.body.totalPrice,
  });

  await newOrder.save();

  res.status(200).json({
    message: "Success",
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const allorders = await Orders.find().lean().exec();
  res.status(200).json(allorders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Orders.findById({ _id: req.body._id }).lean().exec();
  res.status(200).json(order);
});

const changeOrderStatus = asyncHandler(async (req, res) => {
  const order = await Orders.findById({ _id: req.body._id }).lean().exec();

  if (order) {
    const updateOrder = {
      $set: {
        orderStatus: req.body.status,
      },
    };

    const update = await Orders.updateOne({ _id: req.body._id }, updateOrder);
    res.status(201).json(update);
  } else {
    console.log();
    res.status(404);
    throw new Error("Order not found");
  }
});

export { getOrders, createNewOrder, getOrderById, changeOrderStatus };
