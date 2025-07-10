"use strict";

const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "orders";

// Declare the Schema of the Mongo model
var orderSchema = new Schema(
  {
    order_userId: { type: Number, required: true },
    order_checkout: { type: Object, default: {} },
    /*
        order_checkout: {
            totalPrice,
            totalApplyDiscount,
            feeShip
        }
    */
    order_shipping: { type: Object, default: {} },
    /*
        order_checkout: {
            street,
            city,
            state,
            country,
            zipcode,
            ...,
        }
    */
    order_payment: { type: Object, default: {} },
    order_products: { type: Array, required: true },
    order_trackingNumber: { type: String, default: "#000112032025" },
    order_status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "cancel", "delivered"],
      default: "pending",
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = {
  order: model(DOCUMENT_NAME, orderSchema),
};
