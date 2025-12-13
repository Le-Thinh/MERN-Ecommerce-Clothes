"use strict";

const express = require("express");
const userController = require("../../controllers/user.controller");
const asyncHandler = require("../../helpers/asyncHandler.helper");
const { authentication } = require("../../auth/authUtils");
const router = express.Router();

router.get(
  "/welcome-back",
  asyncHandler(userController.checkRegisterEmailToken)
);
router.post(
  "/send-mail-repass",
  asyncHandler(userController.sendMailResetPassword)
);

router.post("/reset-password", asyncHandler(userController.resetPassword));

router.post("/new-user", asyncHandler(userController.newUser));
router.post("/login", asyncHandler(userController.login));
router.post("/loginWithAdmin", asyncHandler(userController.loginWithAdmin));
router.get("/getAmountUsers", asyncHandler(userController.getAmountUser));

router.get("/getAllUsers", asyncHandler(userController.getAllUser));
router.get("/getUserByAd/:id", asyncHandler(userController.getUserByAdmin));
router.post("/changeStatus/:id", asyncHandler(userController.changeStatusUser));

// authentication
router.use(authentication);
router.post("/logout", asyncHandler(userController.logout));
router.post(
  "/refreshTokenUser",
  asyncHandler(userController.handleRefreshToken)
);
router.get("/getUser", asyncHandler(userController.getUser));

module.exports = router;
