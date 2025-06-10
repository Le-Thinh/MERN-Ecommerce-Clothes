"use strict";

const { SuccessResponse } = require("../core/success.response");

const RBACService = require("../services/rbac.service");

class RBACController {
  // Create new role
  newRole = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new role OK!",
      metadata: await RBACService.createRole(req.body),
    }).send(res);
  };

  // List roles
  listRoles = async (req, res, next) => {
    new SuccessResponse({
      message: "List Role OK!",
      metadata: await RBACService.listRoles(req.query),
    }).send(res);
  };

  // Create new resource
  newResource = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new Resource OK!",
      metadata: await RBACService.createResource(req.body),
    }).send(res);
  };

  // List resources
  listResources = async (req, res, next) => {
    new SuccessResponse({
      message: "List Resource OK!",
      metadata: await RBACService.listResources(req.query),
    }).send(res);
  };
}

module.exports = new RBACController();
