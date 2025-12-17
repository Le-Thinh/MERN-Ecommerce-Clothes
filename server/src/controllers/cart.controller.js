"use strict";

const { SuccessResponse } = require("../core/success.response.js");
const cartService = require("../services/cart.service.js");

class CartController {
  addToCart = async (req, res, next) => {
    new SuccessResponse({
      message: "Create/Add To Cart OK!",
      metadata: await cartService.addToCart({
        user: req.user,
        ...req.body,
      }),
    }).send(res);
  };

  getListCart = async (req, res, next) => {
    new SuccessResponse({
      message: "Get List Cart OK!",
      metadata: await cartService.getListCart({
        user: req.user,
      }),
    }).send(res);
  };

  updateQuantityProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "UPDATE QUANTITY PRODUCT OK!",
      metadata: await cartService.updateQuantityProduct({
        user: req.user,
        ...req.body,
      }),
    }).send(res);
  };

  deleteProductFromCart = async (req, res, next) => {
    new SuccessResponse({
      message: "DELETE QUANTITY PRODUCT OK!",
      metadata: await cartService.deleteProduct({
        user: req.user,
        ...req.body,
      }),
    }).send(res);
  };
}

module.exports = new CartController();
