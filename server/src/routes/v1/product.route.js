"use strict";

const express = require("express");
const productController = require("../../controllers/product.controller");
const asyncHandler = require("../../helpers/asyncHandler.helper");
const { authentication } = require("../../auth/authUtils");
const { uploadMemory, uploadDisk } = require("../../configs/multer.config");
const router = express.Router();

// router.use(authentication);

router.post(
  "/upload/bucket",
  uploadMemory.single("file"),
  asyncHandler(productController.uploadImageFromLocalS3)
);

// router.post("/role", asyncHandler(rbacController.newRole));
// router.get("/roles", asyncHandler(rbacController.listRoles));

// router.post("/resource", asyncHandler(rbacController.newResource));
// router.get("/resources", asyncHandler(rbacController.listResources));

module.exports = router;
