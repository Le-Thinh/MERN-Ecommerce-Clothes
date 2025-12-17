"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler.helper.js");
const checkoutController = require("../../controllers/checkout.controller.js");
const router = express.Router();
const { authentication } = require("../../auth/authUtils.js");

/*ADMIN */

router.use(authentication);

router.get(
  "/getAmountOrders",
  asyncHandler(checkoutController.getAmountOrders)
);

router.post("/orderByUser", asyncHandler(checkoutController.orderByUser));

router.get(
  "/getAllOrderByUser",
  asyncHandler(checkoutController.getListAllOrderByUser)
);
router.get(
  "/orderDetail/:orderId",
  asyncHandler(checkoutController.getOrderDetail)
);

module.exports = router;
