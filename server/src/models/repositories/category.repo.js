"use strict";

const CATEGORY = require("../category.model");

const findCategory = async ({ cat_name }) => {
  const foundCat = await CATEGORY.findOne({ cat_name }).lean();
  return foundCat;
};

const findCategoryById = async ({ id }) => {
  const foundCat = await CATEGORY.findOne(id);
  return foundCat;
};

const generateCatId = () => {
  const randomCatId = Math.floor(Math.random() * 899999 + 100000);

  return `cat.${randomCatId}`;
};

const updateCategoryById = async ({ catId, payload, isNew = true }) => {
  return await CATEGORY.findByIdAndUpdate(catId, payload, {
    new: isNew,
  });
};

module.exports = {
  findCategory,
  generateCatId,
  findCategoryById,
  updateCategoryById,
};
