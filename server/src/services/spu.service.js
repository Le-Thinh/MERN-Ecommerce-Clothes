"use strict";

const _ = require("lodash");
const { NotFoundError } = require("../core/error.response");
const SPU = require("../models/spu.model");
const {
  randomProductId,
  removeUndefinedObject,
  updateNestedObject,
  convertToObjectIdMongodb,
} = require("../utils/index");
const { newSku, allSkuBySpuId, updateSku } = require("./sku.service");
const CATEGORY = require("../models/category.model");

class SPUService {
  static newSpu = async ({
    product_id = randomProductId(),
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_category,
    // product_attributes,
    product_quantity,
    product_variations,
    sku_list = [],
  }) => {
    try {
      console.log("🧪 DỮ LIỆU VÀO newSpu:", {
        product_id,
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_category,
        // product_attributes,
        product_quantity,
        product_variations,
        sku_list,
      });
      const spu = await SPU.create({
        product_id,
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_category,
        // product_attributes,
        product_quantity,
        product_variations,
      });

      if (spu && sku_list.length) {
        newSku({
          sku_list,
          spu_id: spu.product_id,
        }).then();
      }

      // 4. sync daa via elasticsearch (search.services)

      // 5. respond result object

      return !!spu;
    } catch (error) {
      return console.error(error);
    }
  };

  static oneSpu = async ({ spu_id }) => {
    try {
      const spu = await SPU.findOne({
        product_id: spu_id,
        isPublished: true, // true
      }).lean();

      if (!spu) throw new NotFoundError("Spu not found");

      const skus = await allSkuBySpuId({
        sku_product_id: spu.product_id,
      });

      return {
        spu_info: _.omit(spu, ["__v", "createdAt"]),
        sku_list: skus.map((sku) =>
          _.omit(sku, ["__v", "updatedAt", "createdAt", "isDeleted"])
        ),
      };
    } catch (error) {
      return {};
    }
  };

  static async oneSpuBySlug({ product_slug }) {
    try {
      const spu = await SPU.findOne({
        product_slug,
        isPublished: true, // chỉ lấy SPU đã public
      }).lean();

      if (!spu) throw new NotFoundError("SPU not found");

      const skus = await allSkuBySpuId({
        sku_product_id: spu.product_id,
      });

      return {
        spu_info: _.omit(spu, ["__v", "createdAt"]),
        sku_list: skus.map((sku) =>
          _.omit(sku, ["__v", "updatedAt", "createdAt", "isDeleted"])
        ),
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get SPU by slug");
    }
  }

  static getAllSpus = async () => {
    const allSpus = await SPU.find({
      isPublished: true,
    }).lean();

    return allSpus;
  };

  static getCatName = async ({ id }) => {
    const nameCat = await CATEGORY.findById(id).lean();

    return nameCat.cat_name;
  };

  /*BEGIN: FEATURE ADMIN */
  static getAllSpuFromAd = async () => {
    const spus = await SPU.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "product_category",
          foreignField: "_id",
          as: "Category",
        },
      },
      {
        $project: {
          _id: 1,
          product_name: 1,
          product_id: 1,
          product_description: 1,
          product_price: 1,
          product_quantity: 1,
          product_category: 1,
          product_variations: 1,
          cat_name: "$Category.cat_name",
          product_thumb: 1,
          product_slug: 1,
          isDraft: 1,
        },
      },
    ]);

    if (!spus) {
      throw new NotFoundError("Spu not found");
    }

    return spus;
  };

  static getSpuFromId = async ({ id }) => {
    const foundSPu = await SPU.findById(id).lean();
    if (!foundSPu) {
      throw new NotFoundError("Spu not found");
    }

    return foundSPu;
  };

  static publicSpu = async ({ spuId }) => {
    const foundSpu = await SPU.findById(spuId);
    if (!foundSpu) throw new NotFoundError("Spu not found");

    if (foundSpu.isPublished) {
      return {
        message: "Already publish",
        status: "publish",
      };
    }

    foundSpu.isDraft = false;
    foundSpu.isPublished = true;

    const { modifiedCount } = await foundSpu.updateOne(foundSpu);
    return modifiedCount;
  };

  static unPublicSpu = async ({ spuId }) => {
    const foundSpu = await SPU.findById(spuId);
    if (!foundSpu) throw new NotFoundError("Sku not found");

    if (foundSpu.isDraft) {
      return {
        message: "Already draft",
        status: "draft",
      };
    }

    foundSpu.isDraft = true;
    foundSpu.isPublished = false;

    const { modifiedCount } = await foundSpu.updateOne(foundSpu);
    return modifiedCount;
  };

  static updateProduct = async ({ spuId, payload }) => {
    const convertSpuId = convertToObjectIdMongodb(spuId);
    const foundSpu = await SPU.findById(convertSpuId);
    if (!foundSpu) throw new NotFoundError("Sku not found");

    const {
      product_name,
      product_thumb,
      product_description,
      product_slug,
      product_price,
      product_category,
      product_quantity,
      product_attributes,
      product_ratingsAverage,
      product_variations,
      sku_list = [],
    } = payload;

    const objectParams = removeUndefinedObject(payload);

    if (Object.keys(objectParams).length === 0 && sku_list.length === 0) {
      throw new BadRequestError("Không có trường nào để cập nhật");
    }

    if (Object.keys(objectParams).length > 0) {
      const finalSpuUpdate = updateNestedObject(objectParams);
      await SPU.findByIdAndUpdate(
        spuId,
        { $set: finalSpuUpdate },
        { new: true }
      );
    }

    if (sku_list.length) {
      await updateSku({ spu_id: convertSpuId, sku_list });
    }

    return {
      updated: 1,
    };
  };
  /*END: FEATURE ADMIN */
}

module.exports = SPUService;
