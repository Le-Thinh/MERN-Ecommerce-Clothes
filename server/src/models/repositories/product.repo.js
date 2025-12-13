const { Types, ObjectId } = require("mongoose");
const { convertToObjectIdMongodb } = require("../../utils");
const SKU = require("../sku.model");
const SPU = require("../spu.model");

const getSkuById = async (skuId) => {
  return await SKU.findOne({ sku_id: skuId }).lean();
};

const getSpuById = async (productId) => {
  return await SPU.findOne({ product_id: productId }).lean();
};

const reduceSkuStock = async ({ skuId, quantity, session }) => {
  const updatedSku = await SKU.findOneAndUpdate(
    {
      sku_id: skuId,
      sku_stock: { $gte: quantity },
    },
    {
      $inc: { sku_stock: -quantity },
    },
    { new: true, session }
  );

  return updatedSku;
};

const checkProductByServer = async (products) => {
  const result = await Promise.all(
    products.map(async (product) => {
      if (product.sku_id) {
        const sku = await getSkuById(product.sku_id);
        if (!sku) throw new BadRequestError("SKU không tồn tại");

        if (sku.sku_stock < product.quantity) {
          throw new BadRequestError("Không đủ tồn kho", 400, {
            sku_id: sku.sku_id,
            requested: product.quantity,
            available: sku.sku_stock,
          });
        }

        return {
          type: "SKU",
          skuId: sku.sku_id,
          productId: sku.sku_product_id,
          price: Number(sku.sku_price),
          quantity: Number(product.quantity),
        };
      }

      const spu = await getSpuById(product.product_id);
      if (!spu) throw new BadRequestError("Sản phẩm không tồn tại");

      if (spu.product_quantity < product.quantity) {
        throw new BadRequestError("Không đủ tồn kho", 400, {
          product_id: spu.product_id,
          requested: product.quantity,
          available: spu.product_quantity,
        });
      }

      return {
        type: "SPU",
        skuId: null,
        productId: spu.product_id,
        price: Number(spu.product_price),
        quantity: Number(product.quantity),
      };
    })
  );

  return result;
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
  reduceSkuStock,
  getSpuById,
};
