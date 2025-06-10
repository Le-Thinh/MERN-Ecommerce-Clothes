"use strict";

const { Schema, model } = require("mongoose");
const slugify = require("slugify");

const DOCUMENT_NAME = "Category";
const COLLECTION_NAME = "categories";

const categorySchema = new Schema(
  {
    cat_id: { type: String, require: true, unique: true },
    cat_name: { type: String, required: true, unique: true },
    cat_slug: { type: String, unique: true },
    cat_description: { type: String, default: "" },
    cat_image: { type: String, default: "" }, // ảnh đại diện cho category
    cat_parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    }, // phân cấp cha-con
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

categorySchema.index({ cat_name: "text", cat_description: "text" });

categorySchema.pre("save", function (next) {
  this.cat_slug = slugify(this.cat_name, { lower: true });
  next();
});

module.exports = model(DOCUMENT_NAME, categorySchema);
