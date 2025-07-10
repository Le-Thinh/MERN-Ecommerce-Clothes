"use strict";

const express = require("express");
const rbacController = require("../../controllers/rbac.controller");
const asyncHandler = require("../../helpers/asyncHandler.helper");
const { authentication } = require("../../auth/authUtils");
const router = express.Router();

// router.use(authentication);

router.post("/role", asyncHandler(rbacController.newRole));
router.get("/roles", asyncHandler(rbacController.listRoles));

router.post("/resource", asyncHandler(rbacController.newResource));
router.get("/resources", asyncHandler(rbacController.listResources));

module.exports = router;
