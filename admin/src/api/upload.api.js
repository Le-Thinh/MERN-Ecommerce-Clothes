"use strict";

import { request } from "../configs/server.admin.config";

const URL_BASE_UPLOAD = "v1/api/upload";

export const uploadImage = async (formData) => {
  const response = await request.post(`${URL_BASE_UPLOAD}/bucket`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
