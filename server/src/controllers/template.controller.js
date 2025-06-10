"use strict";

const { SuccessResponse } = require("../core/success.response");
const templateService = require("../services/template.service");

class TemplateController {
  createTemplate = async (req, res, next) => {
    new SuccessResponse({
      message: "Create Template Successfully",
      metadata: await templateService.newTemplate(req.body),
    }).send(res);
  };
}

module.exports = new TemplateController();
