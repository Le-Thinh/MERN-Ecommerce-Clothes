"use strict";

const { SuccessResponse } = require("../core/success.response");
const userService = require("../services/user.service");

class UserController {
  // new user
  newUser = async (req, res, next) => {
    const response = await userService.signUp({
      email: req.body.email,
    });
    new SuccessResponse(response).send(res);
  };

  // check user token via Email
  checkRegisterEmailToken = async (req, res, next) => {
    const { token } = req.query;
    const response = await userService.checkRegisterEmailTokenService({
      token,
    });
    new SuccessResponse({
      message: "Verify OK!",
      metadata: response,
    }).send(res);
  };

  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await userService.login(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: "Logout OK!",
      metadata: await userService.logout(req.keyStore),
    }).send(res);
  };

  handleRefreshToken = async (req, res, next) => {
    new SuccessResponse({
      message: "RefreshToken OK!",
      metadata: await userService.handleRefreshToken({
        keyStore: req.keyStore,
        user: req.user,
        refreshToken: req.refreshToken,
      }),
    }).send(res);
  };
}

module.exports = new UserController();
