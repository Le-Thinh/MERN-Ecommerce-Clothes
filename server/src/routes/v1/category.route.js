"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler.helper");
const categoryController = require("../../controllers/category.controller");
const router = express.Router();

router.post("/newCat", asyncHandler(categoryController.createCategory));

// -------BEGIN: ROUTE publish & unpublish ------- //

router.post("/publishCat/:id", asyncHandler(categoryController.publicCategory));
router.post(
  "/unpublishCat/:id",
  asyncHandler(categoryController.unPublicCategory)
);
// ------- END: ROUTE publish & unpublish ------- //

router.patch(
  "/updateCat/:catId",
  asyncHandler(categoryController.updateCategory)
);

module.exports = router;
