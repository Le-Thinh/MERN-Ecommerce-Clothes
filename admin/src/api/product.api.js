"use strict";

import { request } from "../configs/server.admin.config";

const URL_BASE_PRODUCT = "v1/api/product";

export const createNewSpu = async (body) => {
  const response = await request.post(`${URL_BASE_PRODUCT}/spu/new`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const getAllSpus = async () => {
  const response = await request.get(`${URL_BASE_PRODUCT}/spu/getAll`);

  return response;
};

export const getSpu = async (id) => {
  const response = await request.get(`${URL_BASE_PRODUCT}/spu/getSpu/${id}`);

  return response;
};

export const getAllSkuBySpuId = async (spuId) => {
  const response = await request.get(
    `${URL_BASE_PRODUCT}/spu/getAllSku/${spuId}`
  );

  return response;
};

export const publishSku = async (skuId) => {
  const response = await request.post(
    `${URL_BASE_PRODUCT}/sku/publish/${skuId}`
  );

  return response;
};

export const unPublishSku = async (skuId) => {
  const response = await request.post(
    `${URL_BASE_PRODUCT}/sku/unPublish/${skuId}`
  );

  return response;
};

export const publishSpu = async (spuId) => {
  const response = await request.post(
    `${URL_BASE_PRODUCT}/spu/publish/${spuId}`
  );

  return response;
};

export const unPublishSpu = async (spuId) => {
  const response = await request.post(
    `${URL_BASE_PRODUCT}/spu/unPublish/${spuId}`
  );

  return response;
};

export const updateProduct = async (spuId, body) => {
  const response = await request.patch(
    `${URL_BASE_PRODUCT}/spu/update/${spuId}`,
    body
  );

  return response;
};
