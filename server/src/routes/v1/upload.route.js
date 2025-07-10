"use strict";

const express = require("express");
const productController = require("../../controllers/product.controller");
const asyncHandler = require("../../helpers/asyncHandler.helper");
const { authentication } = require("../../auth/authUtils");
const { uploadMemory, uploadDisk } = require("../../configs/multer.config");
const router = express.Router();

router.post(
  "/bucket",
  uploadMemory.single("file"),
  asyncHandler(productController.uploadImageFromLocalS3)
);

module.exports = router;
