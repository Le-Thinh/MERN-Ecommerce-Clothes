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
    });

    return newCat;
  };

  // ------- PUBLIC CATEGORY ------- //
  static publicCategory = async ({ id }) => {
    //1. Check cat is exists in db!

    const convertId = convertToObjectIdMongodb(id);

    const foundCat = await findCategoryById({ id: convertId });

    if (!foundCat) throw new NotFoundError("Category Not Found");

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

    foundCat.isDraft = true;
    foundCat.isPublished = false;

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
}

module.exports = CategoryService;
