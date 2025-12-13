"use strict";

const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  AuthFailureError,
} = require("../core/error.response");

const { OK } = require("../core/success.response");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const USERMODEL = require("../models/user.model");
const { sendEmailToken } = require("./email.service");
const {
  createUser,
  findUserByEmail,
  findUserByEmailV2,
  findUserById,
  findAdminByEmail,
  findUserByEmailForUpdate,
} = require("../models/repositories/user.repo");
const KeyTokenService = require("./keytoken.service");
const { createTokenPair } = require("../auth/token.auth");
const { checkEmailToken } = require("./otp.service");
const { getInfoData } = require("../utils");
const fs = require("fs");
const path = require("path");

const privateKeyPath = path.resolve(__dirname, "../keys/privateKey.pem");

const publicKeyPath = path.resolve(__dirname, "../keys/publicKey.pem");

const privateKey = fs.readFileSync(privateKeyPath, "utf-8");

const publicKey = fs.readFileSync(publicKeyPath, "utf-8");

class UserService {
  // Sign Up New Account --> Send Mail
  static signUp = async ({ email, capcha = null, password }) => {
    // 1. check email exists in dbs
    const user = await findUserByEmail({ email });

    if (user) {
      throw new BadRequestError("Email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const idRandom = crypto.randomInt(1000000000);
    const userSlug = "usr-" + idRandom;

    const newUser = await createUser({
      usr_id: idRandom,
      usr_slug: userSlug,
      usr_name: email,
      usr_email: email,
      usr_password: passwordHash,
      usr_role: "683bfc9dd286968af6cbfcaa",
    });

    if (!newUser) throw new BadRequestError("New user not created");

    // 2. send token via email user
    const result = await sendEmailToken({
      email,
    });

    return {
      message: "verify email user",
      metadata: {
        token: result,
      },
    };
  };

  static checkRegisterEmailTokenService = async ({ token }) => {
    // 1. check token in model otp
    const { otp_email: email, otp_token } = await checkEmailToken({ token });
    if (!email) throw new NotFoundError("Email token not found");

    // 2. check email exists in user model
    const hasUser = await USERMODEL.findOne({ usr_email: email });
    if (!hasUser) throw new NotFoundError("User not found");

    //Active user
    hasUser.usr_status = "active";
    await hasUser.save();
    return {
      user: getInfoData({
        object: hasUser,
        fields: ["usr_id", "usr_name", "usr_email"],
      }),
    };
  };

  static login = async ({ email, password, refreshToken = null }) => {
    //1. Check Email exists in db??
    const foundUser = await findUserByEmail({ email });
    if (!foundUser) throw new NotFoundError("Invalid Email Or Password!");

    if (foundUser.usr_status === "disable")
      throw new BadRequestError(
        "Your account locked, please contact us for support"
      );

    //2. Match Password
    const matchPassword = await bcrypt.compare(
      password,
      foundUser.usr_password
    );
    if (!matchPassword) throw new BadRequestError("Invalid Email Or Password!");

    //3. create access & refresh token
    const tokens = await createTokenPair(
      {
        userId: foundUser._id,
        email,
      },
      publicKey,
      privateKey
    );

    const userIds = { _id: foundUser._id, usr_id: foundUser.usr_id };

    await KeyTokenService.createKeyToken({
      userId: userIds,
      publicKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      message: "Login OK!",
      metadata: getInfoData({
        fields: ["_id", "usr_name", "usr_email"],
        object: foundUser,
      }),
      tokens,
    };
  };

  static logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    console.log("delKey:::: ", delKey);
    return delKey;
  };

  static handleRefreshToken = async ({ keyStore, user, refreshToken }) => {
    const { userId, email } = user;

    if (keyStore.refreshTokensUsed?.includes(refreshToken)) {
      await KeyTokenService.deleteKeyById(userId);
      throw new ForbiddenError("Something wrong happened !! relogin");
    }

    if (keyStore.refreshToken !== refreshToken) {
      throw new AuthFailureError("Shop not found 1");
    }

    const foundUser = await findUserByEmailV2({ email });
    if (!foundUser) throw new NotFoundError("Shop not found 2");

    const tokens = await createTokenPair(
      {
        userId,
        email,
      },
      publicKey,
      privateKey
    );

    // update Token
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokensUsed: refreshToken,
      },
    });

    return {
      message: "Handle Ok!",
      user,
      tokens,
    };
  };

  static getUser = async ({ user }) => {
    const { userId } = user;

    const foundUser = await USERMODEL.findById(userId);

    if (!foundUser) throw new BadRequestError("User Not Found");

    return {
      message: "Get User Data OK!",
      metadata: getInfoData({
        fields: ["_id", "usr_name", "usr_email"],
        object: foundUser,
      }),
    };
  };

  static resetPassword = async ({ token, newPass }) => {
    const { otp_email: email, otp_token } = await checkEmailToken({ token });
    if (!email) throw new NotFoundError("Email token not found");

    const hasNewPassword = await bcrypt.hash(newPass, 10);
    const foundUser = await findUserByEmailForUpdate({
      email: email,
    });

    if (!foundUser) throw new NotFoundError("Email not found");

    foundUser.usr_password = hasNewPassword;
    await foundUser.save();
    return 1;
  };

  /*BEGIN: ADMIN */
  static getAllUser = ({ limit = 20, page = 1 }) => {
    const skip = (page - 1) * limit;
    const allUsers = USERMODEL.find({
      usr_role: "683bfc9dd286968af6cbfcaa",
    })
      .skip(skip)
      .limit(limit)
      .lean();

    if (!allUsers) throw new NotFoundError("Not Found User");

    return allUsers;
  };

  static translateStatusUser = async ({ id }) => {
    const foundUser = await findUserById({ id });
    if (!foundUser) throw new NotFoundError("User Not Found");

    const newStatus = foundUser.usr_status === "active" ? "disable" : "active";

    foundUser.usr_status = newStatus;

    await foundUser.save();

    return newStatus;
  };

  static getUSerDataById = async ({ id }) => {
    const foundUser = await findUserById({ id });
    if (!foundUser) throw new NotFoundError("User Not Found");

    return foundUser;
  };

  static getAmountUser = async () => {
    const amountUser = await USERMODEL.estimatedDocumentCount();
    return amountUser;
  };

  static loginWithAdmin = async ({ email, password, refreshToken = null }) => {
    const foundUser = await findAdminByEmail({
      email,
      roleId: "683bfbd5d286968af6cbfc9e",
    });
    if (!foundUser) throw new NotFoundError("Invalid Email");

    if (foundUser.usr_status === "disable")
      throw new BadRequestError("Account Locked");

    const matchPassword = await bcrypt.compare(
      password,
      foundUser.usr_password
    );

    if (!matchPassword) throw new BadRequestError("Invalid Email Or Password");
    const tokens = await createTokenPair(
      {
        userId: foundUser._id,
        email,
      },
      publicKey,
      privateKey
    );

    const userIds = { _id: foundUser._id, usr_id: foundUser.usr_id };

    await KeyTokenService.createKeyToken({
      userId: userIds,
      publicKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      message: "Login Admin OK!",
      metadata: getInfoData({
        fields: ["_id", "usr_name", "usr_email"],
        object: foundUser,
      }),
      tokens,
    };
  };
  /*END: ADMIN */
}

module.exports = UserService;
