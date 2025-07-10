"use strict";
const { BadRequestError } = require("../core/error.response");
const { SuccessResponse } = require("../core/success.response");
const SPUService = require("../services/spu.service");
const SKUService = require("../services/sku.service");
const { uploadImageFromLocalS3 } = require("../services/upload.aws.service");

class ProductController {
  createSpu = async (req, res, next) => {
    const spu = await SPUService.newSpu(req.body);

    new SuccessResponse({
      message: "Create SPU OK!",
      metadata: spu,
    }).send(res);
  };

  uploadImageFromLocalS3 = async (req, res, next) => {
    const { file } = req;
    if (!file) throw new BadRequestError("File missing");
    new SuccessResponse({
      message: "upload Image Thumb use S3Client successfully",
      metadata: await uploadImageFromLocalS3({
        file,
      }),
    }).send(res);
  };

  getAllSpu = async (req, res, next) => {
    new SuccessResponse({
      message: "Get All SPU OK!",
      metadata: await SPUService.getAllSpuFromAd(req.query),
    }).send(res);
  };

  getAllSpusPublish = async (req, res, next) => {
    new SuccessResponse({
      message: "Get All SPU OK!",
      metadata: await SPUService.getAllSpus(req.query),
    }).send(res);
  };

  getSpu = async (req, res, next) => {
    new SuccessResponse({
      message: "Get SPU OK!",
      metadata: await SPUService.getSpuFromId({
        id: req.params.spuId,
      }),
    }).send(res);
  };

  getSpuBySlug = async (req, res, next) => {
    new SuccessResponse({
      message: "Get SPU BY SLUG OK!",
      metadata: await SPUService.oneSpuBySlug({
        product_slug: req.params.slug,
      }),
    }).send(res);
  };

  getAllSkuBySpuId = async (req, res, next) => {
    new SuccessResponse({
      message: "Get ALL SKU OK!",
      metadata: await SKUService.allSkuBySpuId({
        sku_product_id: req.params.spuId,
      }),
    }).send(res);
  };

  publicSku = async (req, res, next) => {
    new SuccessResponse({
      message: "Publish SKU OK!",
      metadata: await SKUService.publicSku({
        skuId: req.params.skuId,
      }),
    }).send(res);
  };

  unPublicSku = async (req, res, next) => {
    new SuccessResponse({
      message: "Un Publish SKU OK!",
      metadata: await SKUService.unPublicSku({
        skuId: req.params.skuId,
      }),
    }).send(res);
  };

  publicSpu = async (req, res, next) => {
    new SuccessResponse({
      message: "Publish SPU OK!",
      metadata: await SPUService.publicSpu({
        spuId: req.params.spuId,
      }),
    }).send(res);
  };

  unPublicSpu = async (req, res, next) => {
    new SuccessResponse({
      message: "Un Publish SPU OK!",
      metadata: await SPUService.unPublicSpu({
        spuId: req.params.spuId,
      }),
    }).send(res);
  };

  updateProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Updated SPU-SKU OK!",
      metadata: await SPUService.updateProduct({
        spuId: req.params.spuId,
        payload: req.body,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
