"use strict";

const _ = require("lodash");
const { Types } = require("mongoose");

const replacePlaceholder = (template, params) => {
  Object.keys(params).forEach((k) => {
    const placeholder = `{{${k}}}`; //verifyKey
    template = template.replace(new RegExp(placeholder, "g"), params[k]);
  });

  return template;
};

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

const randomProductId = (_) => {
  return Math.floor(Math.random() * 899999 + 100000);
};

const convertToObjectIdMongodb = (id) => new Types.ObjectId(id);

const removeUndefinedObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null) {
      delete obj[key];
    }
  });

  return obj;
};

const updateNestedObject = (obj) => {
  const final = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      const response = updateNestedObject(obj[key]);

      Object.keys(response).forEach((k) => {
        final[`${key}.${k}`] = response[k];
      });
    } else {
      final[key] = obj[key];
    }
  });

  return final;
};

module.exports = {
  replacePlaceholder,
  getInfoData,
  randomProductId,
  removeUndefinedObject,
  convertToObjectIdMongodb,
  updateNestedObject,
};
