"use strict";

import { request } from "../configs/server.config";

const URL_BASE_PRODUCT = "v1/api/product";

export const getAllSpus = async () => {
  const response = await request.get(`${URL_BASE_PRODUCT}/spu/getAllSpus`);

  return response;
};

export const getDataSpuBySlug = async (slug) => {
  const response = await request.get(
    `${URL_BASE_PRODUCT}/spu/getSpuBySlug/${slug}`
  );

  return response;
};
