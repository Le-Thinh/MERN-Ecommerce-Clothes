"use strict";

const { convertToObjectIdMongodb } = require("../../utils");
const USER = require("../user.model");

const createUser = async ({
  usr_id,
  usr_name,
  usr_email,
  usr_slug,
  usr_password,
  usr_role,
}) => {
  const user = await USER.create({
    usr_id,
    usr_name,
    usr_email,
    usr_slug,
    usr_password,
    usr_role,
    usr_status: "pending",
  });

  return user;
};

const findUserByEmail = async ({ email }) => {
  const user = await USER.findOne({ usr_email: email }).lean();
  return user;
};

const findAdminByEmail = async ({ email, roleId }) => {
  const foundUser = await USER.findOne({
    usr_email: email,
    usr_role: convertToObjectIdMongodb(roleId),
  }).lean();

  return foundUser;
};

const findUserByEmailActive = async ({ email }) => {
  const user = await USER.findOne({
    usr_email: email,
    usr_status: true,
  }).lean();
  return user;
};

const findUserByEmailV2 = async ({
  email,
  select = {
    usr_email: 1,
    usr_password: 1,
    usr_name: 1,
    usr_status: 1,
    // addressPickUp: 1,
    // roles: 1,
  },
}) => {
  return USER.findOne({ usr_email: email }).select(select).lean();
};

const findUserByEmailForUpdate = async ({ email }) => {
  return USER.findOne({ usr_email: email });
};

const findUserById = async ({ id }) => {
  const userId = convertToObjectIdMongodb(id);

  const foundUser = await USER.findById(userId);

  return foundUser;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByEmailV2,
  findUserById,
  findUserByEmailActive,
  findAdminByEmail,
  findUserByEmailForUpdate,
};
