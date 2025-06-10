"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler.helper");
const apiKeyController = require("../../controllers/apikey.controller");

const router = express.Router();

router.post("", asyncHandler(apiKeyController.createApiKey));

module.exports = router;
