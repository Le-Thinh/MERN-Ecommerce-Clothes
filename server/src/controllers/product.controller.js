"use strict";
const { BadRequestError } = require("../core/error.response");
const { SuccessResponse } = require("../core/success.response");
const SPUService = require("../services/spu.service");
const { uploadImageFromLocalS3 } = require("../services/upload.aws.service");

class ProductController {
  createSpu = async (req, res, next) => {
    const spu = await SPUService.newSpu({
      ...req.body,
      product_id,
    });
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
}

module.exports = new ProductController();
