"use strict";

const {
  s3,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("../configs/s3.aws.config");

const crypto = require("crypto");
const randomImageName = () => crypto.randomBytes(16).toString("hex");
const urlImagePublic = process.env.AWS_BUCKET_CLOUDFRONT_URL;
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");

const uploadImageFromLocalS3 = async ({ file }) => {
  try {
    const imageName = randomImageName();
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageName,
      Body: file.buffer,
      ContentType: "image/jpeg",
    });

    const result = await s3.send(command);
    console.log("result upload::::", result);

    const url = getSignedUrl({
      url: `${urlImagePublic}/${imageName}`,
      keyPairId: process.env.AWS_BUCKET_CLOUDFRONT_PUBLIC_KEY,
      dateLessThan: new Date("2099-12-31T23:59:59Z"),
      privateKey: process.env.AWS_BUCKET_CLOUDFRONT_PRIVATE_KEY,
    });

    return {
      url,
      result,
    };
  } catch (error) {
    "Error uploading image using S3Client", error;
  }
};

module.exports = { uploadImageFromLocalS3 };
