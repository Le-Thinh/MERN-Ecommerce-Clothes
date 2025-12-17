"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler.helper.js");
const templateController = require("../../controllers/template.controller.js");
const router = express.Router();

router.post("", asyncHandler(templateController.createTemplate));

module.exports = router;
