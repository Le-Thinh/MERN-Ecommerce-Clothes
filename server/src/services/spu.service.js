"use strict";

const _ = require("lodash");
const { NotFoundError } = require("../core/error.response");
const SPU = require("../models/spu.model");
const { randomProductId } = require("../utils/index");
const { newSku, allSkuBySpuId } = require("./sku.service");

class SPUService {
  static newSpu = async ({
    product_id,
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_category,
    product_shop,
    product_attributes,
    product_quantity,
    product_variations,
    sku_list = [],
  }) => {
    try {
      const spu = await SPU.create({
        product_id: randomProductId(),
        product_name,
        product_thumb,
        product_description,
        product_price,
        product_category,
        product_shop,
        product_attributes,
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
        isPublished: false, // true
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
}

module.exports = SPUService;
