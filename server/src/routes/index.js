"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");

const router = express.Router();

router.use(apiKey);

router.use(permission("0000"));

// Route not check authentication
router.use("/v1/api/apiKey", require("./v1/apikey.route"));
router.use("/v1/api/template", require("./v1/template.route"));
router.use("/v1/api/product", require("./v1/product.route"));
router.use("/v1/api/category", require("./v1/category.route"));

// Route have to check authentication
router.use("/v1/api/user", require("./v1/user.route"));
router.use("/v1/api/rbac", require("./v1/rbac.route"));
module.exports = router;
