"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler.helper");
const checkoutController = require("../../controllers/checkout.controller");
const router = express.Router();
const { authentication } = require("../../auth/authUtils");

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
