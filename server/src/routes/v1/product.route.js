"use strict";

const express = require("express");
const productController = require("../../controllers/product.controller.js");
const asyncHandler = require("../../helpers/asyncHandler.helper.js");
const { authentication } = require("../../auth/authUtils.js");
const { uploadMemory, uploadDisk } = require("../../configs/multer.config.js");
const router = express.Router();

// router.use(authentication);

router.post(
  "/upload/bucket",
  uploadMemory.single("file"),
  asyncHandler(productController.uploadImageFromLocalS3)
);

//

router.post("/spu/new", asyncHandler(productController.createSpu));
router.patch(
  "/spu/update/:spuId",
  asyncHandler(productController.updateProduct)
);

router.get("/spu/getAll", asyncHandler(productController.getAllSpu));
router.get(
  "/spu/getAllSpus",
  asyncHandler(productController.getAllSpusPublish)
);
router.get(
  "/spu/getSpuBySlug/:slug",
  asyncHandler(productController.getSpuBySlug)
);

router.get("/spu/getSpu/:spuId", asyncHandler(productController.getSpu));
router.get(
  "/spu/getAllSku/:spuId",
  asyncHandler(productController.getAllSkuBySpuId)
);
router.post("/sku/publish/:skuId", asyncHandler(productController.publicSku));

router.post(
  "/sku/unPublish/:skuId",
  asyncHandler(productController.unPublicSku)
);

router.post("/spu/publish/:spuId", asyncHandler(productController.publicSpu));

router.post(
  "/spu/unPublish/:spuId",
  asyncHandler(productController.unPublicSpu)
);

/*BEGIN: SEARCH PRODUCT */
router.get(
  "/spu/search/:keySearch",
  asyncHandler(productController.getListSearchProductByUser)
);

router.get(
  "/spu/searchAd/:keySearch",
  asyncHandler(productController.getListSearchProductByAdmin)
);
/*END: SEARCH PRODUCT */

module.exports = router;
