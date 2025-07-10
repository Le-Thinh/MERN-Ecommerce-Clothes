"use strict";

import { request } from "../configs/server.admin.config";

const URL_BASE_ATTRIBUTE = "v1/api/attribute";

export const createAttribute = async (body) => {
  const response = await request.post(
    `${URL_BASE_ATTRIBUTE}/new-attribute`,
    body
  );

  return response;
};

export const getAllAttribute = async () => {
  const response = await request.get(`${URL_BASE_ATTRIBUTE}/getAll`);

  return response;
};

export const publishAttribute = async (id) => {
  const response = await request.post(`${URL_BASE_ATTRIBUTE}/public/${id}`);

  return response;
};

export const unPublishAttribute = async (id) => {
  const response = await request.post(`${URL_BASE_ATTRIBUTE}/unPublic/${id}`);

  return response;
};

export const deleteAttribute = async (id) => {
  const response = await request.post(`${URL_BASE_ATTRIBUTE}/delete/${id}`);

  return response;
};

export const activeAttribute = async (id) => {
  const response = await request.post(`${URL_BASE_ATTRIBUTE}/active/${id}`);

  return response;
};
