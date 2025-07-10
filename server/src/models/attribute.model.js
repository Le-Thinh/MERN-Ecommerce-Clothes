"use strict";

const { Schema, model } = require("mongoose");
const { default: slugify } = require("slugify");

const DOCUMENT_NAME = "Attribute";
const COLLECTION_NAME = "attributes";

const attributeSchema = new Schema(
  {
    attribute_id: {
      type: String,
      require: true,
      unique: true,
    },
    attribute_name: {
      type: String,
      require: true,
    },
    attribute_slug: { type: String, unique: true },
    attribute_value: { type: Schema.Types.Mixed, require: true },
    isDraft: { type: Boolean, default: true, index: true },
    isPublished: { type: Boolean, default: false, index: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

attributeSchema.pre("save", function (next) {
  this.attribute_slug = slugify(this.attribute_name, { lower: true });
  next();
});

module.exports = model(DOCUMENT_NAME, attributeSchema);
