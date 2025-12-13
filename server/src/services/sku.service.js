"use strict";

const _ = require("lodash");
const SKU = require("../models/sku.model");
const {
  randomProductId,
  convertToObjectIdMongodb,
  removeUndefinedObject,
  updateNestedObject,
} = require("../utils/index");
const { NotFoundError, BadRequestError } = require("../core/error.response");

class SKUService {
  static newSku = async ({ spu_id, sku_list }) => {
    try {
      const convert_sku_list = sku_list.map((sku) => {
        return {
          ...sku,
          sku_product_id: spu_id,
          sku_id: `${spu_id}.${randomProductId()}`,
        };
      });

      const skus = await SKU.create(convert_sku_list);

      return skus;
    } catch (error) {
      return [];
    }
  };

  static updateSku = async ({ spu_id, sku_list }) => {
    try {
      const updatePromises = sku_list.map(({ _id, ...rest }) =>
        SKU.findOneAndUpdate({ _id }, { $set: rest }, { new: true })
      );

      const results = await Promise.all(updatePromises);
      return results;
    } catch (error) {
      console.log("Update SKU error:", error);
      throw new BadRequestError("Lỗi khi cập nhật SKU");
    }
  };

  static oneSku = async ({ sku_id, sku_product_id }) => {
    try {
      // read cache
      const sku = await SKU.findOne({
        sku_id,
        sku_product_id,
      }).lean();

      if (sku) {
        // set cached
      }

      return _.omit(sku, ["__v", "updatedAt", "createdAt", "isDeleted"]);
    } catch (error) {
      return null;
    }
  };

  static allSkuBySpuId = async ({ sku_product_id }) => {
    try {
      // 1. spu_id...
      const skus = await SKU.find({ sku_product_id: sku_product_id }).lean();

      return skus;
    } catch (error) {
      return [];
    }
  };

  static allSkuByClientShop = async ({ sku_product_id }) => {
    try {
      // 1. spu_id...
      const skus = await SKU.find({
        sku_product_id: sku_product_id,
        isPublished: true,
      }).lean();

      return skus;
    } catch (error) {
      return [];
    }
  };

  static publicSku = async ({ skuId }) => {
    const foundSku = await SKU.findById(skuId);
    if (!foundSku) throw new NotFoundError("Sku not found");

    if (foundSku.isPublished) {
      return {
        message: "Already publish",
        status: "publish",
      };
    }

    foundSku.isDraft = false;
    foundSku.isPublished = true;

    const { modifiedCount } = await foundSku.updateOne(foundSku);
    return modifiedCount;
  };

  static unPublicSku = async ({ skuId }) => {
    const foundSku = await SKU.findById(skuId);
    if (!foundSku) throw new NotFoundError("Sku not found");

    if (foundSku.isDraft) {
      return {
        message: "Already draft",
        status: "draft",
      };
    }

    foundSku.isDraft = true;
    foundSku.isPublished = false;

    const { modifiedCount } = await foundSku.updateOne(foundSku);
    return modifiedCount;
  };
}

module.exports = SKUService;
