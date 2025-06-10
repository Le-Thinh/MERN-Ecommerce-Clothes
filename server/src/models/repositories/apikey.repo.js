"use strict";

const APIKEYMODEL = require("../apiKey.model");

const findApiKeyByKey = async ({ key }) => {
  const foundKey = await APIKEYMODEL.findOne({ key, status: true }).lean();

  return foundKey;
};

module.exports = {
  findApiKeyByKey,
};
