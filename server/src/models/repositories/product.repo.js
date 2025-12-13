const { Types, ObjectId } = require("mongoose");
const { convertToObjectIdMongodb } = require("../../utils");
const SKU = require("../sku.model");
const SPU = require("../spu.model");

const getSkuById = async (skuId) => {
  return await SKU.findOne({ sku_id: skuId }).lean();
};

const checkProductByServer = async (products) => {
  return await Promise.all(
    products.map(async (product) => {
      const foundProduct = await getSkuById(product.sku_id);
      if (foundProduct) {
        return {
          price: Number(foundProduct.sku_price),
          quantity: product.sku_stock,
          skuId: product.sku_id,
        };
      }
      console.log(foundProduct);
    })
  );
};

const searchProductByUser = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch);
  const result = await SPU.find({
    isPublished: true,
    $text: { $search: regexSearch },
  })
    .sort({ score: { $meta: "textScore" } })
    .lean();

  return result;
};

const searchProductByAdmin = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch);
  const result = await SPU.find({
    $text: { $search: regexSearch },
  })
    .sort({ score: { $meta: "textScore" } })
    .lean();

  return result;
};

module.exports = {
  checkProductByServer,
  searchProductByUser,
  searchProductByAdmin,
};
