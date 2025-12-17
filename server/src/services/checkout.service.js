"use strict";

const { cart } = require("../models/cart.model.js");
const { findCartById } = require("../models/repositories/cart.repo.js");
const {
  checkProductByServer,
  reduceSkuStock,
} = require("../models/repositories/product.repo.js");
const { convertToObjectIdMongodb } = require("../utils");
const USER = require("../models/user.model.js");
const SPU = require("../models/spu.model.js");
const { order } = require("../models/order.model.js");
const { NotFoundError, BadRequestError } = require("../core/error.response.js");
const mongoose = require("mongoose");

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
    const session = await mongoose.startSession();

    let newOrder;

    await session.withTransaction(async () => {
      const { userId, email } = user;

      const foundUser = await USER.findById(
        convertToObjectIdMongodb(userId)
      ).session(session);

      if (!foundUser) {
        throw new BadRequestError("User not found");
      }

      const usrId = foundUser.usr_id;

      const { products, summary } = await this.checkoutReview({
        cartId,
        userId: usrId,
        // discountCode,
      });

      for (const item of products) {
        // 🔹 SKU → trừ SKU + SPU
        if (item.type === "SKU") {
          const updatedSku = await reduceSkuStock({
            skuId: item.skuId,
            quantity: item.quantity,
            session,
          });

          if (!updatedSku) {
            throw new BadRequestError("Không đủ tồn kho SKU");
          }
        }

        const updatedSpu = await SPU.findOneAndUpdate(
          {
            product_id: item.productId,
            product_quantity: { $gte: item.quantity },
          },
          {
            $inc: { product_quantity: -item.quantity },
          },
          { new: true, session }
        );

        if (!updatedSpu) {
          throw new BadRequestError("Không đủ tồn kho sản phẩm");
        }
      }

      [newOrder] = await order.create(
        [
          {
            order_userId: usrId,
            order_checkout: summary,
            order_shipping: user_address,
            order_payment: user_payment,
            order_products: products,
          },
        ],
        { session }
      );

      await cart.findOneAndDelete({ cart_userId: usrId }, { session });
    });

    session.endSession();
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

  /*BEGIN: ADMIN */
  static getAmountOrders = async () => {
    const amountOrders = await order.estimatedDocumentCount();
    return amountOrders;
  };
  /*END: ADMIN */
}

module.exports = CheckoutService;
