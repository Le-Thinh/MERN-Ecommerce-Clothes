"use strict";

const express = require("express");
const rbacController = require("../../controllers/rbac.controller.js");
const asyncHandler = require("../../helpers/asyncHandler.helper.js");
const { authentication } = require("../../auth/authUtils.js");
const router = express.Router();

// router.use(authentication);

router.post("/role", asyncHandler(rbacController.newRole));
router.get("/roles", asyncHandler(rbacController.listRoles));

router.post("/resource", asyncHandler(rbacController.newResource));
router.get("/resources", asyncHandler(rbacController.listResources));

module.exports = router;
