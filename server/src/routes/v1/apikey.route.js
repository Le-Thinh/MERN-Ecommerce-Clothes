"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler.helper.js");
const apiKeyController = require("../../controllers/apikey.controller.js");

const router = express.Router();

router.post("", asyncHandler(apiKeyController.createApiKey));

module.exports = router;
