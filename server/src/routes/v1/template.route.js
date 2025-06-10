"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler.helper");
const templateController = require("../../controllers/template.controller");
const router = express.Router();

router.post("", asyncHandler(templateController.createTemplate));

module.exports = router;
