"use strict";

const APIKEYMODEL = require("../models/apiKey.model.js");
const crypto = require("crypto");

class apiKeyService {
  static createApiKey = async (key) => {
    key = crypto.randomBytes(64).toString("hex");

    const newApiKey = await APIKEYMODEL.create({
      key,
      permissions: ["0000"],
    });

    console.log(newApiKey);
    return newApiKey;
  };
}

module.exports = apiKeyService;
