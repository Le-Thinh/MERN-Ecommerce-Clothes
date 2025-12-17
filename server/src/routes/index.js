"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth.js");

const router = express.Router();

router.use(apiKey);

router.use(permission("0000"));

// Route not check authentication
router.use("/v1/api/user", require("./v1/user.route.js"));
router.use("/v1/api/apiKey", require("./v1/apikey.route.js"));
router.use("/v1/api/upload", require("./v1/upload.route.js"));
router.use("/v1/api/product", require("./v1/product.route.js"));
router.use("/v1/api/attribute", require("./v1/attribute.route.js"));
router.use("/v1/api/template", require("./v1/template.route.js"));
router.use("/v1/api/category", require("./v1/category.route.js"));

// Route have to check authentication
router.use("/v1/api/cart", require("./v1/cart.route.js"));
router.use("/v1/api/rbac", require("./v1/rbac.route.js"));
router.use("/v1/api/checkout", require("./v1/checkout.route.js"));
module.exports = router;
