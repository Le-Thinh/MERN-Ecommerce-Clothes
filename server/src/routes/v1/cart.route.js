"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler.helper");
const cartController = require("../../controllers/cart.controller");
const router = express.Router();
const { authentication } = require("../../auth/authUtils");

router.use(authentication);

router.post("/addToCart", asyncHandler(cartController.addToCart));
router.post(
  "/updateQuantity",
  asyncHandler(cartController.updateQuantityProduct)
);

router.post(
  "/deleteProductFromCart",
  asyncHandler(cartController.deleteProductFromCart)
);

router.get("/getListUserCart", asyncHandler(cartController.getListCart));

module.exports = router;
