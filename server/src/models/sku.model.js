"use strict";

const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Sku";
const COLLECTION_NAME = "skus";

const skuSchema = new Schema(
  {
    sku_id: { type: String, required: true, unique: true },
    sku_tier_idx: { type: Array, default: [0] },
    /*
        color = [red, green] = [0, 1]
        size = [S, M] = [0, 1]

        ==> red + S = [0, 0]
        ==> red + M = [0, 1]
    */

    sku_default: { type: Boolean, default: false },
    sku_slug: { type: String, default: "" },
    sku_sort: { type: Number, default: 0 },
    sku_price: { type: String, required: true },
    sku_stock: { type: Number, default: 0 },
    sku_product_id: { type: String, required: true },

    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, skuSchema);
