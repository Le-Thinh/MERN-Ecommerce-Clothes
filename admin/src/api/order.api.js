"use strict";

import { request } from "../configs/server.admin.config";

const URL_BASE_PRODUCT = "v1/api/checkout";

export const getAmountOrders = async (userId, accessToken) => {
  const response = await request.get(`${URL_BASE_PRODUCT}/getAmountOrders`, {
    headers: {
      "x-client-id": userId,
      Authorization: accessToken,
    },
  });

  return response;
};
