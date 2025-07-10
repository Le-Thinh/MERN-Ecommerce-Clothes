"use strict";

const { model, Schema } = require("mongoose");
const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "discounts";

var discountSchema = new Schema(
  {
    discount_name: { type: String, required: true },
    discount_description: { type: String, required: true },
    discount_type: { type: String, default: "fixed_amount" }, //"percentage"
    discount_value: { type: Number, required: true },
    discount_code: { type: String, required: true }, //Mã voucher
    discount_start_date: { type: Date, required: true }, //Ngày bắt đầu
    discount_end_date: { type: Date, required: true }, //Ngày kết thúc
    discount_max_uses: { type: Number, required: true }, //Số lượng áp dụng
    discount_uses_count: { type: Number, required: true }, //Số lượng đã sử dụng
    discount_users_used: { type: Array, default: [] }, //User đã sử dụng
    discount_max_uses_per_user: { type: Number, required: true }, //Số lượng cho phép tối đa sử dụng cho mỗi user
    discount_min_order_value: { type: Number, required: true },
    discount_is_active: { type: Boolean, default: true },
    discount_applies_to: {
      type: String,
      default: true,
      enum: ["all", "specific"],
    },
    discount_product_ids: { type: Array, default: [] }, //Số sản phẩm được áp dụng
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, discountSchema);
