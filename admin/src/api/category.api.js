"use strict";

import { request } from "../configs/server.admin.config";

const URL_BASE_CAT = "v1/api/category";

export const getAllCategory = async () => {
  const response = await request.get(`${URL_BASE_CAT}/getAllCats`);

  return response;
};

export const getAllCategoryDeleted = async () => {
  const response = await request.get(`${URL_BASE_CAT}/getCategoryDeleted`);

  console.log("Categories response:::: ", response.request);

  return response;
};

export const createCategory = async (body) => {
  const response = await request.post(`${URL_BASE_CAT}/newCat`, body);

  return response;
};

export const updateCategory = async () => {};

export const isPublishedCategory = async (id) => {
  const response = await request.post(`${URL_BASE_CAT}/publishCat/${id}`);

  if (!response) throw new Error("Invalid Handle Publish Category");

  return response;
};

export const unpublishCatCategory = async (id) => {
  const response = await request.post(`${URL_BASE_CAT}/unpublishCat/${id}`);

  if (!response) throw new Error("Invalid Handle Unpublish Category");

  return response;
};

export const isDeletedCategory = async (id) => {
  const response = await request.post(`${URL_BASE_CAT}/deleteCat/${id}`);

  if (!response) throw new Error("Invalid Handle Delete Category");

  return response;
};

export const activeCatCategory = async (id) => {
  const response = await request.post(`${URL_BASE_CAT}/activeCat/${id}`);

  if (!response) throw new Error("Invalid Handle Active Category");

  return response;
};
