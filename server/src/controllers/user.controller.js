"use strict";

const { SuccessResponse } = require("../core/success.response");
const EmailService = require("../services/email.service");
const userService = require("../services/user.service");

class UserController {
  // new user
  newUser = async (req, res, next) => {
    const response = await userService.signUp({
      email: req.body.email,
      password: req.body.password,
    });
    new SuccessResponse(response).send(res);
  };

  resetPassword = async (req, res, next) => {
    const { token } = req.query;
    new SuccessResponse({
      message: "Update Password Success",
      metadata: await userService.resetPassword({
        token: token,
        newPass: req.body.newPassword,
      }),
    }).send(res);
  };

  sendMailResetPassword = async (req, res, next) => {
    new SuccessResponse({
      message: "Update Password Success",
      metadata: await EmailService.sendMailResetPassword({
        email: req.body.email,
      }),
    }).send(res);
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
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
    });

    new SuccessResponse({
      metadata: response,
    }).send(res);
  };

  logout = async (req, res, next) => {
    res.clearCookie("x-rtoken-id");
    new SuccessResponse({
      message: "Logout OK!",
      metadata: await userService.logout(req.keyStore),
    }).send(res);
  };

  handleRefreshToken = async (req, res, next) => {
    const response = await userService.handleRefreshToken({
      keyStore: req.keyStore,
      user: req.user,
      refreshToken: req.refreshToken,
    });

    res.cookie("x-rtoken-id", response.tokens.refreshToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
    });

    new SuccessResponse({ metadata: response }).send(res);
  };

  getUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Get User Success",
      metadata: await userService.getUser({
        user: req.user,
      }),
    }).send(res);
  };

  /*BEGIN: ADMIN */
  getAllUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Get All Users Success",
      metadata: await userService.getAllUser(req.query),
    }).send(res);
  };

  changeStatusUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Change Status Users Success",
      metadata: await userService.translateStatusUser({ id: req.params.id }),
    }).send(res);
  };

  getUserByAdmin = async (req, res, next) => {
    new SuccessResponse({
      message: "Change Status Users Success",
      metadata: await userService.getUSerDataById({ id: req.params.id }),
    }).send(res);
  };

  getAmountUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Amount User",
      metadata: await userService.getAmountUser(),
    }).send(res);
  };

  loginWithAdmin = async (req, res, next) => {
    const response = await userService.loginWithAdmin(req.body);

    const { accessToken, refreshToken } = response.tokens;

    res.cookie("x-rtoken-id", refreshToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d
    });

    new SuccessResponse({
      metadata: response,
    }).send(res);
  };
  /*END: ADMIN */
}

module.exports = new UserController();
