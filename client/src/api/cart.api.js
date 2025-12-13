"use strict";

import { request } from "../configs/server.config";

const URL_BASE_CART = "v1/api/cart";

export const addToCart = async (userId, accessToken, product) => {
  const response = await request.post(
    `${URL_BASE_CART}/addToCart`,
    { product },
    {
      headers: {
        "x-client-id": userId,
        Authorization: accessToken,
      },
    }
  );

  return response;
};

export const getListUserCart = async (userId, accessToken) => {
  const response = await request.get(`${URL_BASE_CART}/getListUserCart`, {
    headers: {
      "x-client-id": userId,
      Authorization: accessToken,
    },
  });

  return response;
};

export const updateQuantityCart = async (
  userId,
  accessToken,
  sku_id,
  quantity
) => {
  const response = await request.post(
    `${URL_BASE_CART}/updateQuantity`,
    {
      sku_id,
      quantity,
    },
    {
      headers: {
        "x-client-id": userId,
        Authorization: accessToken,
      },
    }
  );

  return response;
};

export const deleteProductFromCart = async (
  userId,
  accessToken,
  sku_id,
  product_id
) => {
  const response = await request.post(
    `${URL_BASE_CART}/deleteProductFromCart`,
    {
      sku_id,
      product_id,
    },
    {
      headers: {
        "x-client-id": userId,
        Authorization: accessToken,
      },
    }
  );

  return response;
};
