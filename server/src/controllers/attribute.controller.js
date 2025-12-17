"use strict";
const { SuccessResponse } = require("../core/success.response.js");
const attributeService = require("../services/attribute.service.js");

class AttributeController {
  newAttribute = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new attribute successfully",
      metadata: await attributeService.createAttribute(req.body),
    }).send(res);
  };

  getAllAttribute = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new attribute successfully",
      metadata: await attributeService.getAllAttribute(req.params),
    }).send(res);
  };

  publicAttribute = async (req, res, next) => {
    const id = req.params.id;
    console.log("ID:: ", id);
    new SuccessResponse({
      message: "Public Attribute OK!",
      metadata: await attributeService.publicAttribute({
        attributeId: req.params.id,
      }),
    }).send(res);
  };

  unPublicAttribute = async (req, res, next) => {
    new SuccessResponse({
      message: "Unpublish Attribute OK!",
      metadata: await attributeService.unPublicAttribute({
        attributeId: req.params.id,
      }),
    }).send(res);
  };

  deleteAttribute = async (req, res, next) => {
    new SuccessResponse({
      message: "Delete Attribute OK!",
      metadata: await attributeService.deleteAttribute({
        attributeId: req.params.id,
      }),
    }).send(res);
  };

  activeAttribute = async (req, res, next) => {
    new SuccessResponse({
      message: "Active Attribute OK!",
      metadata: await attributeService.activeAttribute({
        attributeId: req.params.id,
      }),
    }).send(res);
  };
}

module.exports = new AttributeController();
