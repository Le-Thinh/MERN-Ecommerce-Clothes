"use strict";

const express = require("express");
const productController = require("../../controllers/product.controller.js");
const asyncHandler = require("../../helpers/asyncHandler.helper.js");
const { authentication } = require("../../auth/authUtils.js");
const { uploadMemory, uploadDisk } = require("../../configs/multer.config.js");
const router = express.Router();

router.post(
  "/bucket",
  uploadMemory.single("file"),
  asyncHandler(productController.uploadImageFromLocalS3)
);

module.exports = router;
