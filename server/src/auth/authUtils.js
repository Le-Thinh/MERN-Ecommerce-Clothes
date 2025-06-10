"use strict";

const { findKeyTokenByUserId } = require("../services/keytoken.service");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESH_TOKEN: "x-rtoken-id",
};

const {
  AuthFailureError,
  NotFoundError,
  ForbiddenError,
} = require("../core/error.response");

const JWT = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler.helper");

const authentication = asyncHandler(async (req, res, next) => {
  /*
    1 - Check userId missing ?
    2 - Get access token
    3 - Verify token
    4 - Check user in dbs
    5 - Check keyStore with this userId?
    6 - Okk all? => return next()
  */

  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid Request");

  //2.
  const keyStore = await findKeyTokenByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not found keyStore");

  //3. Check Have RefreshToken in param?
  if (req.headers[HEADER.REFRESH_TOKEN]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
      const decodeUser = await JWT.verify(refreshToken, keyStore.publicKey);
      if (userId !== decodeUser.userId)
        throw new AuthFailureError("Invalid User");

      req.keyStore = keyStore;
      req.user = decodeUser;
      req.refreshToken = refreshToken;
      console.log("Decoded User:", decodeUser);
      return next();
    } catch (error) {
      throw error;
    }
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Invalid Request");

  try {
    const decodeUser = await JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId)
      throw new AuthFailureError("Invalid User");

    req.keyStore = keyStore;
    req.user = decodeUser; //{userId, email}
    return next();
  } catch (error) {
    throw error;
  }
});

module.exports = {
  authentication,
};
