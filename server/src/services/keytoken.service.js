"use strict";

const { Types } = require("mongoose");
const KEYTOKENMODEL = require("../models/keytoken.model.js");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, refreshToken }) => {
    try {
      const publicKeyString = publicKey.toString();

      const filter = { user: userId._id, usr_id: userId.usr_id },
        update = {
          publicKey: publicKeyString,
          refreshTokenUsed: [],
          refreshToken,
        },
        options = { upsert: true, new: true };

      const tokens = await KEYTOKENMODEL.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  static findKeyTokenByUserId = async (userId) => {
    return await KEYTOKENMODEL.findOne({
      user: new Types.ObjectId(userId),
    });
  };

  static removeKeyById = async (id) => {
    return await KEYTOKENMODEL.deleteOne(id);
  };

  static deleteKeyById = async (userId) => {
    return await KEYTOKENMODEL.deleteOne({
      user: new Types.ObjectId(userId),
    });
  };
}

module.exports = KeyTokenService;
