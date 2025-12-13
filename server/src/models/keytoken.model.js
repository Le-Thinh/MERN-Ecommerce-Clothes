"use strict";

const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "keys";

var keySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    usr_id: {
      type: Number,
      required: true,
      unique: true,
    },
    privateKey: {
      type: String,
      // required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },

    // detect hacker sử dụng token trái phép
    refreshTokensUsed: {
      type: Array,
      default: [],
    },

    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, keySchema);
