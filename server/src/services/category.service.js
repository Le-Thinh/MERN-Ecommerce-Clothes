"use strict";

const { BadRequestError, NotFoundError } = require("../core/error.response");
const CATEGORY = require("../models/category.model");
const {
  findCategory,
  generateCatId,
  findCategoryById,
  updateCategoryById,
} = require("../models/repositories/category.repo");
const {
  convertToObjectIdMongodb,
  removeUndefinedObject,
  updateNestedObject,
  getInfoData,
} = require("../utils");

class CategoryService {
  // ------- CREATE CATEGORY ------- //
  static createCategory = async ({
    catId,
    name,
    description,
    image,
    parentId = null,
  }) => {
    //1. Check category exists in dbs!!
    const foundCat = await findCategory({ name });
    if (foundCat) throw new BadRequestError("Category already exists!!");

    //2. Create new category

    catId = generateCatId();

    const newCat = await CATEGORY.create({
      cat_id: catId,
      cat_name: name,
      cat_image: image,
      cat_description: description,
      cat_parent: parentId,
    });

    return newCat;
  };

  // ------- PUBLIC CATEGORY ------- //
  static publicCategory = async ({ id }) => {
    //1. Check cat is exists in db!

    const convertId = convertToObjectIdMongodb(id);

    const foundCat = await findCategoryById({ id: convertId });

    if (!foundCat) throw new NotFoundError("Category Not Found");

    if (foundCat.isPublished) {
      return {
        message: "Category already published",
        status: "publish",
      };
    }

    foundCat.isDraft = false;
    foundCat.isPublished = true;

    const { modifiedCount } = await foundCat.updateOne(foundCat);
    return modifiedCount;
  };

  // ------- UNPUBLIC CATEGORY ------- //

  static unPublicCategory = async ({ id }) => {
    //1. Check cat is exists in db!

    const convertId = convertToObjectIdMongodb(id);

    const foundCat = await findCategoryById({ id: convertId });

    if (!foundCat) throw new NotFoundError("Category Not Found");

    if (foundCat.isDraft) {
      return {
        message: "Category already draft",
        status: "draft",
      };
    }

    foundCat.isDraft = true;
    foundCat.isPublished = false;

    const { modifiedCount } = await foundCat.updateOne(foundCat);
    return modifiedCount;
  };

  static activeCategory = async ({ id }) => {
    const convertId = convertToObjectIdMongodb(id);

    const foundCat = await findCategoryById({ id: convertId });

    if (!foundCat) throw new NotFoundError("Category Not Found");

    foundCat.isDraft = true;
    foundCat.isPublished = false;
    foundCat.isDeleted = false;

    const { modifiedCount } = await foundCat.updateOne(foundCat);
    return modifiedCount;
  };

  static deleteCategory = async ({ id }) => {
    //1. Check cat is exists in db!

    const convertId = convertToObjectIdMongodb(id);

    const foundCat = await findCategoryById({ id: convertId });

    if (!foundCat) throw new NotFoundError("Category Not Found");

    foundCat.isDraft = false;
    foundCat.isPublished = false;
    foundCat.isDeleted = true;

    const { modifiedCount } = await foundCat.updateOne(foundCat);
    return modifiedCount;
  };

  static updateCategory = async ({ catId, payload }) => {
    const objectPayload = removeUndefinedObject(payload);

    // 2. Chuyển nested object thành dạng dot notation để update được các field lồng nhau
    // const updateData = updateNestedObject(cleanedPayload);

    // 3. Tiến hành update
    const updatedCategory = await updateCategoryById({
      catId,
      objectPayload,
    });

    return updatedCategory;
  };

  static getCategory = async ({ limit = 20, page = 1 }) => {
    const skip = (page - 1) * limit;

    const allCat = await CATEGORY.find({
      isDeleted: false,
    })
      .populate({
        path: "cat_parent",
        select: "cat_name",
      })
      .skip(skip)
      .limit(limit)
      .lean();

    if (!allCat) throw new NotFoundError("NOT FOUND ANYTHING");

    // return getInfoData({
    //   fields: [
    //     "_id",
    //     "cat_id",
    //     "cat_name",
    //     "cat_description",
    //     "cat_image",
    //     "cat_parent",
    //     "isDeleted",
    //     "isPublished",
    //     "isDraft",
    //     "cat_slug",
    //   ],
    //   object: allCat,
    // });

    return allCat.map((cat) => ({
      _id: cat._id,
      cat_id: cat.cat_id,
      cat_name: cat.cat_name,
      cat_description: cat.cat_description,
      cat_image: cat.cat_image,
      cat_parent: cat.cat_parent?.cat_name || null,
      isDeleted: cat.isDeleted,
      isPublished: cat.isPublished,
      isDraft: cat.isDraft,
      cat_slug: cat.cat_slug,
    }));
  };

  static getCategoryDeleted = async ({ limit = 20, page = 1 }) => {
    const skip = (page - 1) * limit;

    const allCat = await CATEGORY.find({
      isDeleted: true,
    })
      .populate({
        path: "cat_parent",
        select: "cat_name",
      })
      .skip(skip)
      .limit(limit)
      .lean();

    if (!allCat) throw new NotFoundError("NOT FOUND ANYTHING");

    return allCat.map((cat) => ({
      _id: cat._id,
      cat_id: cat.cat_id,
      cat_name: cat.cat_name,
      cat_description: cat.cat_description,
      cat_image: cat.cat_image,
      cat_parent: cat.cat_parent?.cat_name || null,
      isDeleted: cat.isDeleted,
      isPublished: cat.isPublished,
      isDraft: cat.isDraft,
      cat_slug: cat.cat_slug,
    }));
  };
}

module.exports = CategoryService;
