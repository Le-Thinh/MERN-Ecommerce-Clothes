"use strict";

const { SuccessResponse } = require("../core/success.response");
const CheckoutService = require("../services/checkout.service");

class CheckoutController {
  orderByUser = async (req, res, next) => {
    new SuccessResponse({
      message: "ORDER BY USER OK!",
      metadata: await CheckoutService.orderByUser({
        user: req.user,
        ...req.body,
      }),
    }).send(res);
  };

  getListAllOrderByUser = async (req, res, next) => {
    new SuccessResponse({
      message: "GET ALL ORDERS BY USER OK!",
      metadata: await CheckoutService.getListAllOrderByUser({
        user: req.user,
      }),
    }).send(res);
  };

  getOrderDetail = async (req, res, next) => {
    new SuccessResponse({
      message: "GET ORDER DETAIL BY USER OK!",
      metadata: await CheckoutService.getOrderDetail({
        orderId: req.params.orderId,
      }),
    }).send(res);
  };
}

module.exports = new CheckoutController();
