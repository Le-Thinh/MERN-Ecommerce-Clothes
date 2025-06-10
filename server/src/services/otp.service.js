"use strict";

const { NotFoundError } = require("../core/error.response");
const OTP = require("../models/otp.model");
const crypto = require("crypto");

class OTPService {
  static newOtp = async ({ email }) => {
    const token = crypto.randomInt(0, Math.pow(2, 32));

    const newToken = await OTP.create({
      otp_token: token,
      otp_email: email,
    });

    return newToken;
  };

  static checkEmailToken = async ({ token }) => {
    const hasToken = await OTP.findOne({ otp_token: token });

    if (!hasToken) throw new NotFoundError("token not found");

    OTP.deleteOne({ otp_token: token }).then();

    console.log(hasToken);
    return hasToken;
  };
}

module.exports = OTPService;
