"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler.helper.js");
const categoryController = require("../../controllers/category.controller.js");
const router = express.Router();

router.post("/newCat", asyncHandler(categoryController.createCategory));

// -------BEGIN: ROUTE publish & unpublish ------- //

router.post("/publishCat/:id", asyncHandler(categoryController.publicCategory));
router.post(
  "/unpublishCat/:id",
  asyncHandler(categoryController.unPublicCategory)
);
router.post("/deleteCat/:id", asyncHandler(categoryController.deleteCategory));
router.post("/activeCat/:id", asyncHandler(categoryController.activeCategory));
// ------- END: ROUTE publish & unpublish ------- //

router.patch(
  "/updateCat/:catId",
  asyncHandler(categoryController.updateCategory)
);

router.get("/getAllCats", asyncHandler(categoryController.getAllCategory));
router.get("/getCatPub", asyncHandler(categoryController.getCategoryPublic));
router.get(
  "/getCategoryDeleted",
  asyncHandler(categoryController.getAllCategoryDelete)
);

module.exports = router;
