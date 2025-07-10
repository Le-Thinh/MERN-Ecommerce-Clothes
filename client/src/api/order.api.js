"use strict";

import { request } from "../configs/server.config";

const URL_BASE_ORDER = "v1/api/checkout";

export const orderByUser = async (
  cartId,
  userId,
  accessToken,
  user_address,
  user_payment
  // discountCode
) => {
  const response = await request.post(
    `${URL_BASE_ORDER}/orderByUser`,
    {
      cartId,
      user_address,
      user_payment,
      // discountCode,
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

export const getListAllOrderByUser = async (userId, accessToken) => {
  const response = await request.get(`${URL_BASE_ORDER}/getAllOrderByUser`, {
    headers: {
      "x-client-id": userId,
      Authorization: accessToken,
    },
  });

  return response;
};

export const getOrderDetail = async (userId, accessToken, orderId) => {
  const response = await request.get(
    `${URL_BASE_ORDER}/orderDetail/${orderId}`,
    {
      headers: {
        "x-client-id": userId,
        Authorization: accessToken,
      },
    }
  );

  return response;
};
