"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler.helper.js");
const attributeController = require("../../controllers/attribute.controller.js");
const router = express.Router();

router.post("/new-attribute", asyncHandler(attributeController.newAttribute));
router.get("/getAll", asyncHandler(attributeController.getAllAttribute));

router.post("/public/:id", asyncHandler(attributeController.publicAttribute));
router.post(
  "/unPublic/:id",
  asyncHandler(attributeController.unPublicAttribute)
);
router.post("/delete/:id", asyncHandler(attributeController.deleteAttribute));
router.post("/active/:id", asyncHandler(attributeController.deleteAttribute));
module.exports = router;
