"use strict";

const TEMPLATE = require("../template.model");

const findTemplateByIdTem = async ({ tem_id }) => {
  const foundTemplate = await TEMPLATE.findOne({ tem_id }).lean();

  return foundTemplate;
};

module.exports = {
  findTemplateByIdTem,
};
