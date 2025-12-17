"use strict";

const { SuccessResponse } = require("../core/success.response.js");
const apiKeyService = require("../services/apikey.service.js");

class ApiKeyController {
  createApiKey = async (req, res, next) => {
    new SuccessResponse({
      message: "Create ApiKey Successfully",
      metadata: await apiKeyService.createApiKey(req.body),
    }).send(res);
  };
}

module.exports = new ApiKeyController();
