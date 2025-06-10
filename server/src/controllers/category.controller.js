"use strict";

const { SuccessResponse } = require("../core/success.response");
const CategoryService = require("../services/category.service");

class CategoryController {
  createCategory = async (req, res, next) => {
    new SuccessResponse({
      message: "Create Cat OK!",
      metadata: await CategoryService.createCategory(req.body),
    }).send(res);
  };

  publicCategory = async (req, res, next) => {
    new SuccessResponse({
      message: "Create Cat OK!",
      metadata: await CategoryService.publicCategory({
        id: req.params.id,
      }),
    }).send(res);
  };

  unPublicCategory = async (req, res, next) => {
    new SuccessResponse({
      message: "Create Cat OK!",
      metadata: await CategoryService.unPublicCategory({
        id: req.params.id,
      }),
    }).send(res);
  };

  updateCategory = async (req, res, next) => {
    new SuccessResponse({
      message: "Create Cat OK!",
      metadata: await CategoryService.updateCategory({
        catId: req.params.catId,
        ...req.body,
      }),
    }).send(res);
  };
}

module.exports = new CategoryController();
