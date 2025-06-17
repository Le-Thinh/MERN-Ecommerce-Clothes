"use strict";

import { request } from "../configs/server.config";

const URL_BASE_USR = "v1/api/user";

export const signUp = async (email) => {
  const response = await request.post(`${URL_BASE_USR}/new-user`, { email });
  return response;
};

export const login = async (email, password) => {
  const response = await request.post(`${URL_BASE_USR}/login`, {
    email,
    password,
  });

  return response;
};

// export const logout = async () => {
//   const response = await request.post(`${URL_BASE_USR}/logout`);

//   return response;
// };

export const verifyEmail = async (token) => {
  const response = await request.get(`${URL_BASE_USR}/welcome-back`, {
    params: { token },
  });
  return response;
};

export const getDataUser = async (userId, accessToken) => {
  const response = await request.get(`${URL_BASE_USR}/getUser`, {
    headers: {
      "x-client-id": userId,
      Authorization: accessToken,
    },
  });
  return response;
};

export const logout = async (userId, accessToken) => {
  const response = await request.post(
    `${URL_BASE_USR}/logout`,
    {},
    {
      headers: {
        "x-client-id": userId,
        Authorization: accessToken,
      },
    }
  );
  return response;
};
