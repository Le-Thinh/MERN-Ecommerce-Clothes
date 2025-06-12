"use strict";

const express = require("express");
const userController = require("../../controllers/user.controller");
const asyncHandler = require("../../helpers/asyncHandler.helper");
const { authentication } = require("../../auth/authUtils");
const router = express.Router();

router.post("/new-user", asyncHandler(userController.newUser));
router.post("/login", asyncHandler(userController.login));
router.get(
  "/welcome-back",
  asyncHandler(userController.checkRegisterEmailToken)
);

// authentication
router.use(authentication);
router.post("/logout", asyncHandler(userController.logout));
router.post(
  "/refreshTokenUser",
  asyncHandler(userController.handleRefreshToken)
);

module.exports = router;
