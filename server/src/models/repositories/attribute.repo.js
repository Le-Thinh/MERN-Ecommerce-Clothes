"use strict";

const ATTRIBUTE = require("../attribute.model");

const findAttributeByName = async ({ attribute_name }) => {
  const foundAttribute = await ATTRIBUTE.findOne({ attribute_name });
  return foundAttribute;
};

const findAttributeById = async ({ attributeId }) => {
  const foundAttribute = await ATTRIBUTE.findById(attributeId);
  return foundAttribute;
};

module.exports = {
  findAttributeByName,
  findAttributeById,
};
