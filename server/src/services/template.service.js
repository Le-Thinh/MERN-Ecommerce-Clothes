"use strict";

const TEMPLATE = require("../models/template.model");
const crypto = require("crypto");
const { htmlEmailToken } = require("../utils/template.html");
const { HTMLrepass } = require("../utils/resetPassword.template.html");
const { findTemplateByIdTem } = require("../models/repositories/template.repo");
const { BadRequestError } = require("../core/error.response");

class TemplateService {
  static newTemplate = async ({ tem_name, tem_id, tem_html }) => {
    //  1. check template exists!
    const foundTemplate = await findTemplateByIdTem({ tem_id });

    if (foundTemplate) throw new BadRequestError("Template already exists!!");

    //   2. Create new Tem
    const newTem = await TEMPLATE.create({
      tem_name,
      tem_id,
      tem_html: htmlEmailToken(),
    });

    return newTem;
  };

  static getTemplate = async ({ tem_name }) => {
    const template = await TEMPLATE.findOne({
      tem_name,
    }).lean();

    return template;
  };
}

module.exports = TemplateService;
