"use strict";

const { cart } = require("../models/cart.model");
const {
  createUserCart,
  updateUserCartQuantity,
} = require("../models/repositories/cart.repo");
const { findUserById } = require("../models/repositories/user.repo");
const { convertToObjectIdMongodb } = require("../utils");
const USER = require("../models/user.model");
const { NotFoundError } = require("../core/error.response");

class CartService {
  static addToCart = async ({ user, product = {} }) => {
    const { userId, email } = user;

    const idUser = convertToObjectIdMongodb(userId);

    const foundUser = await USER.findById(idUser).lean();

    if (!foundUser) throw new NotFoundError("User Not Found");

    // check cart exists?
    const userCart = await cart.findOne({ cart_userId: foundUser.usr_id });

    const id = foundUser.usr_id;

    if (!userCart) {
      // create cart for User

      return await createUserCart({ userId: id, product, model: cart });
    }

    // If there is a cart but no products in it.
    if (!userCart.cart_products.length) {
      userCart.cart_products = [product];
      return await userCart.save();
    }

    const checkExistProductInCart = userCart.cart_products.some(
      (p) => p.sku_id === product.sku_id
    );

    if (!checkExistProductInCart) {
      userCart.cart_products.push(product);
      return await userCart.save();
    }

    return await updateUserCartQuantity({ userId: id, product, model: cart });
  };

  static deleteUserCart = async ({ userId, productId }) => {
    const query = { cart_userId: userId, cart_state: "active" };
    const updateSet = {
      $pull: {
        cart_products: { productId },
      },
    };

    const deleteCart = await cart.updateOne(query, updateSet);

    return deleteCart;
  };

  static getListCart = async ({ user }) => {
    const { userId, email } = user;

    const convertIdUser = convertToObjectIdMongodb(userId);

    const foundUser = await USER.findById(convertIdUser).lean();

    if (!foundUser) throw new NotFoundError("User Not Found");

    const usrId = foundUser.usr_id;

    const foundCart = await cart.findOne({ cart_userId: +usrId }).lean();
    return foundCart;
  };

  static updateQuantityProduct = async ({ user, sku_id, quantity }) => {
    const { userId, email } = user;
    const convertIdUser = convertToObjectIdMongodb(userId);

    const foundUser = await USER.findById(convertIdUser).lean();
    if (!foundUser) throw new NotFoundError("User Not Found");

    const userCart = await cart.findOne({
      cart_userId: foundUser.usr_id,
      cart_state: "active",
      "cart_products.sku_id": sku_id,
    });

    if (!userCart) throw new NotFoundError("Cart or product not found");
    const product = userCart.cart_products.find((p) => p.sku_id === sku_id);
    if (!product) throw new NotFoundError("Product not found in cart");

    const newQuantity = product.quantity + quantity;

    if (newQuantity <= 0) {
      // Nếu số lượng mới <= 0 thì xóa sản phẩm khỏi cart
      const result = await cart.findOneAndUpdate(
        {
          cart_userId: foundUser.usr_id,
          cart_state: "active",
        },
        {
          $pull: {
            cart_products: { sku_id: sku_id },
          },
        },
        { new: true }
      );

      return result;
    }

    const result = await cart.findOneAndUpdate(
      {
        cart_userId: foundUser.usr_id,
        "cart_products.sku_id": sku_id,
        cart_state: "active",
      },
      {
        $inc: {
          "cart_products.$.quantity": quantity,
        },
      },
      { new: true }
    );

    return result;
  };

  static deleteProduct = async ({ user, sku_id, product_id }) => {
    const { userId, email } = user;
    const convertIdUser = convertToObjectIdMongodb(userId);

    const foundUser = await USER.findById(convertIdUser).lean();
    if (!foundUser) throw new NotFoundError("User Not Found");

    let pullCondition = {};
    if (sku_id) {
      pullCondition = { sku_id };
    } else if (product_id) {
      pullCondition = { product_id };
    } else {
      throw new BadRequestError("Thiếu sku_id hoặc product_id");
    }

    const result = await cart.findOneAndUpdate(
      {
        cart_userId: foundUser.usr_id,
        cart_state: "active",
      },
      {
        $pull: {
          cart_products: pullCondition,
        },
      },
      { new: true }
    );

    return result;
  };
}

module.exports = CartService;
