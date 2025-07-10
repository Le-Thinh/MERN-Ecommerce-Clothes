"use strict";

const { cart } = require("../models/cart.model");
const { findCartById } = require("../models/repositories/cart.repo");
const { checkProductByServer } = require("../models/repositories/product.repo");
const { convertToObjectIdMongodb } = require("../utils");
const USER = require("../models/user.model");
const { order } = require("../models/order.model");
const { NotFoundError, BadRequestError } = require("../core/error.response");

class CheckoutService {
  /*
    payload
    {
      cartId: ,
      order_ids: [
        {
            shop_discounts: [
                {
                    
                    discountId,
                    codeId
                }
            ],
            item_products: [
               {  
                    price,
                    quantity,
                    skuId
                },
                {  
                    price,
                    quantity,
                    skuId
                },
            ]
        },
        {
            
            discounts: [],
            item_products: [
               {  
                    price,
                    quantity,
                    skuId
                },
                {  
                    price,
                    quantity,
                    skuId
                },
            ]
        }
      ]
    */
  static checkoutReview = async ({ cartId, userId }) => {
    //discountCode => thêm tham số discountCode sau, khi có discount service
    const foundCart = await findCartById(cartId);

    if (!foundCart) throw new NotFoundError("Cart does not exist!");

    const products = foundCart.cart_products;
    if (!products || products.length === 0)
      throw new BadRequestError("Giỏ hàng trống!");

    // Validate sản phẩm (tồn kho, giá)
    const validatedProducts = await checkProductByServer(products);
    if (!validatedProducts || validatedProducts.length === 0)
      throw new BadRequestError("Sản phẩm không hợp lệ!");

    const totalPrice = products.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    let discount = 0;
    // if (discountCode) {
    //   const { discount: discountAmount } = await getDiscountAmount({
    //     codeId: discountCode,
    //     userId,
    //     products: validatedProducts,
    //   });
    //   discount = discountAmount;
    // }

    const totalCheckout = totalPrice - discount;

    console.log("validatedProducts::::", validatedProducts);

    return {
      products: validatedProducts,
      summary: {
        totalPrice,
        discount,
        totalCheckout,
      },
    };
  };

  static orderByUser = async ({
    cartId,
    user,
    user_address,
    user_payment,
    // discountCode,
  }) => {
    const { userId, email } = user;
    const foundUser = await USER.findById({
      _id: convertToObjectIdMongodb(userId),
    });

    const usrId = foundUser.usr_id;

    const { products, summary } = await this.checkoutReview({
      cartId,
      userId: usrId,
      // discountCode,
    });

    for (const item of products) {
      if (item.sku_quantity < item.quantity) {
        throw new BadRequestError(
          `Sản phẩm ${item.skuId} không đủ số lượng trong kho.`
        );
      }
    }

    const newOrder = await order.create({
      order_userId: usrId,
      order_checkout: summary,
      order_shipping: user_address,
      order_payment: user_payment,
      order_products: products,
    });

    if (newOrder) {
      await cart.findOneAndDelete({ cart_userId: usrId });
    }

    return newOrder;
  };

  static getListAllOrderByUser = async ({ user }) => {
    const { userId, email } = user;

    const convertUserId = convertToObjectIdMongodb(userId);

    const foundUser = await USER.findById(convertUserId).lean();

    if (!foundUser) throw new NotFoundError("User Not Found in DB");
    const usr_id = foundUser.usr_id;

    const allOrderByUserId = order
      .find({
        order_userId: usr_id,
      })
      .lean();

    return allOrderByUserId;
  };

  static getOrderDetail = async ({ orderId }) => {
    const foundOrder = order.findById({
      _id: convertToObjectIdMongodb(orderId),
    });

    if (!foundOrder) throw new NotFoundError("Not Found Order With Id");

    return foundOrder;
  };
}

module.exports = CheckoutService;
