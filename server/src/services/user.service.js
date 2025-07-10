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
  static signUp = async ({ email, capcha = null }) => {
    // 1. check email exists in dbs
    const user = await findUserByEmail({ email });

    if (user) {
      throw new BadRequestError("Email already exists");
    }

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

    const hasUser = await USERMODEL.findOne({ usr_email: email }).lean();
    if (hasUser) throw new BadRequestError("Email already exists!!");

    // hash password
    const passwordHash = await bcrypt.hash(email, 10);
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

    if (newUser) {
      // Create publicKey and privateKey

      // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      //   privateKeyEncoding: {
      //     type: "pkcs1",
      //     format: "pem",
      //   },
      // });

      const newUserIds = { _id: newUser._id, usr_id: newUser.usr_id };

      const publicKeyString = await KeyTokenService.createKeyToken({
        userId: newUserIds,
        publicKey,
      });

      console.log("PublicKeyString:::: ", publicKeyString);

      if (!publicKeyString) {
        throw new BadRequestError("Error: Key Store could not be created");
      }

      const publicKeyObject = crypto.createPublicKey(publicKeyString);

      if (!publicKeyObject) {
        console.log("Error publicKeyObject:::: ");
      }

      const tokens = await createTokenPair(
        {
          userId: newUser._id,
          email,
        },
        publicKeyObject,
        privateKey
      );

      console.log(`Create Token Success:: `, tokens);
      return {
        user: getInfoData({
          object: newUser,
          fields: ["usr_id", "usr_name", "usr_email"],
        }),
        tokens,
      };
    }
  };

  static login = async ({ email, password, refreshToken = null }) => {
    //1. Check Email exists in db??
    const foundUser = await findUserByEmail({ email });
    if (!foundUser) throw new NotFoundError("Invalid Email Or Password!");

    //2. Match Password
    const matchPassword = await bcrypt.compare(
      password,
      foundUser.usr_password
    );
    if (!matchPassword) throw new BadRequestError("Invalid Email Or Password!");

    //3. create AT & RT then save dbs
    // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    //   modulusLength: 4096,
    //   publicKeyEncoding: {
    //     type: "pkcs1",
    //     format: "pem",
    //   },
    //   privateKeyEncoding: {
    //     type: "pkcs1",
    //     format: "pem",
    //   },
    // });

    // console.log(privateKey, publicKey);

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
  /*END: ADMIN */
}

module.exports = UserService;
