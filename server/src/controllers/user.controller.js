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
    const response = await userService.login(req.body);

    const { accessToken, refreshToken } = response.tokens;

    res.cookie("x-rtoken-id", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
    });

    new SuccessResponse({
      metadata: response,
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
