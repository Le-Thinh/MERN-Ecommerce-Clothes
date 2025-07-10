const { convertToObjectIdMongodb, getSelectData } = require("../../utils");
const { cart } = require("../cart.model");

const createUserCart = async ({ userId, product, model }) => {
  const query = { cart_userId: userId, cart_state: "active" };
  const updateOrInsert = {
      $addToSet: {
        cart_products: product,
      },
    },
    options = {
      upsert: true,
      new: true,
    };

  return await model.findOneAndUpdate(query, updateOrInsert, options);
};

const updateUserCartQuantity = async ({ userId, product, model }) => {
  const { sku_id, quantity } = product;
  const query = {
      cart_userId: userId,
      "cart_products.sku_id": product.sku_id,
      cart_state: "active",
    },
    updateSet = {
      $inc: {
        "cart_products.$.quantity": quantity,
      },
    },
    options = {
      upsert: true,
      new: true,
    };

  return await model.findOneAndUpdate(query, updateSet, options);
};

const checkAllProductsUserCart = async ({ userId, model, select }) => {
  return await cart
    .findOne({
      cart_userId: userId,
    })
    .select(getSelectData(select))
    .lean();
};

const findCartById = async (cartId) => {
  const foundCart = await cart
    .findOne({
      _id: convertToObjectIdMongodb(cartId),
      cart_state: "active",
    })
    .lean();

  return foundCart;
};

module.exports = {
  createUserCart,
  updateUserCartQuantity,
  findCartById,
  checkAllProductsUserCart,
};
