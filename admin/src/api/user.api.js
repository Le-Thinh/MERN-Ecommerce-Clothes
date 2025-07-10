"use strict";

import { request } from "../configs/server.admin.config";

const URL_BASE_USR = "v1/api/user";

export const getAllUsers = async () => {
  const response = await request.get(`${URL_BASE_USR}/getAllUsers`);

  return response;
};

export const changeStatusUser = async (id) => {
  const response = await request.post(`${URL_BASE_USR}/changeStatus/${id}`);

  if (!response) throw new Error("Invalid Handle Change Status User");

  return response;
};

export const getUserForUpdate = async (id) => {
  const response = await request.get(`${URL_BASE_USR}/getUserByAd/${id}`);

  if (!response) throw new Error("Invalid Handle Change Status User");

  return response;
};
