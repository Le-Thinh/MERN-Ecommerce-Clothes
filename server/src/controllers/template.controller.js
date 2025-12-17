"use strict";

const { SuccessResponse } = require("../core/success.response.js");
const templateService = require("../services/template.service.js");

class TemplateController {
  createTemplate = async (req, res, next) => {
    new SuccessResponse({
      message: "Create Template Successfully",
      metadata: await templateService.newTemplate(req.body),
    }).send(res);
  };
}

module.exports = new TemplateController();
