"use strict";

const { SuccessResponse } = require("../core/success.response.js");
const CategoryService = require("../services/category.service.js");

class CategoryController {
  createCategory = async (req, res, next) => {
    new SuccessResponse({
      message: "Create Cat OK!",
      metadata: await CategoryService.createCategory(req.body),
    }).send(res);
  };

  publicCategory = async (req, res, next) => {
    new SuccessResponse({
      message: "Public Cat OK!",
      metadata: await CategoryService.publicCategory({
        id: req.params.id,
      }),
    }).send(res);
  };

  unPublicCategory = async (req, res, next) => {
    new SuccessResponse({
      message: "Unpublish Cat OK!",
      metadata: await CategoryService.unPublicCategory({
        id: req.params.id,
      }),
    }).send(res);
  };

  deleteCategory = async (req, res, next) => {
    new SuccessResponse({
      message: "Delete Category OK!",
      metadata: await CategoryService.deleteCategory({
        id: req.params.id,
      }),
    }).send(res);
  };

  activeCategory = async (req, res, next) => {
    new SuccessResponse({
      message: "Active Category OK!",
      metadata: await CategoryService.activeCategory({
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

  getAllCategory = async (req, res, next) => {
    new SuccessResponse({
      message: "Get Cat Successfully",
      metadata: await CategoryService.getCategory(req.query),
    }).send(res);
  };

  getCategoryPublic = async (req, res, next) => {
    new SuccessResponse({
      message: "Get Cat Successfully",
      metadata: await CategoryService.getCategoryPublic(req.query),
    }).send(res);
  };

  getAllCategoryDelete = async (req, res, next) => {
    new SuccessResponse({
      message: "Get Category Deleted Successfully",
      metadata: await CategoryService.getCategoryDeleted(req.query),
    }).send(res);
  };
}

module.exports = new CategoryController();
