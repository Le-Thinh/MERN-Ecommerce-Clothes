"use strict";

const { BadRequestError, NotFoundError } = require("../core/error.response.js");
const {
  findAttributeByName,
  findAttributeById,
} = require("../models/repositories/attribute.repo.js");
const { randomProductId, convertToObjectIdMongodb } = require("../utils");

const ATTRIBUTE = require("../models/attribute.model.js");

class AttributeService {
  static createAttribute = async ({ attribute_name, attribute_value }) => {
    const foundAttribute = await findAttributeByName({ attribute_name });

    if (foundAttribute) {
      throw new BadRequestError("Attribute Already Exists!!");
    }

    const id = randomProductId();
    const attributeId = `attr.${id}`;

    const newAttribute = await ATTRIBUTE.create({
      attribute_id: attributeId,
      attribute_name,
      attribute_value,
    });

    if (!newAttribute) {
      throw new BadRequestError("Create new attribute failure");
    }

    return newAttribute;
  };

  static getAllAttribute = async () => {
    const allAttributes = await ATTRIBUTE.find({
      isDeleted: false,
    }).lean();
    if (!allAttributes) {
      throw new BadRequestError("Not Found!!");
    }

    return allAttributes;
  };

  static publicAttribute = async ({ attributeId }) => {
    const convertId = convertToObjectIdMongodb(attributeId);

    const foundAttribute = await findAttributeById({ attributeId: convertId });
    console.log("Attribute:::: ", foundAttribute);
    if (!foundAttribute) throw new NotFoundError("Attribute Not Found");

    if (foundAttribute.isPublished) {
      return {
        message: "Attribute already published",
        status: "publish",
      };
    }

    foundAttribute.isDraft = false;
    foundAttribute.isPublished = true;

    const { modifiedCount } = await foundAttribute.updateOne(foundAttribute);
    return modifiedCount;
  };

  static unPublicAttribute = async ({ attributeId }) => {
    const convertId = convertToObjectIdMongodb(attributeId);

    const foundAttribute = await findAttributeById({ attributeId: convertId });
    if (!foundAttribute) throw new NotFoundError("Attribute Not Found");

    if (foundAttribute.isDraft) {
      return {
        message: "Attribute already draft",
        status: "draft",
      };
    }

    foundAttribute.isDraft = true;
    foundAttribute.isPublished = false;

    const { modifiedCount } = await foundAttribute.updateOne(foundAttribute);
    return modifiedCount;
  };

  static deleteAttribute = async ({ attributeId }) => {
    //1. Check cat is exists in db!

    const convertId = convertToObjectIdMongodb(attributeId);

    const foundAttribute = await findAttributeById({ attributeId: convertId });

    if (!foundAttribute) throw new NotFoundError("Attribute Not Found");

    foundAttribute.isDraft = false;
    foundAttribute.isPublished = false;
    foundAttribute.isDeleted = true;

    const { modifiedCount } = await foundAttribute.updateOne(foundAttribute);
    return modifiedCount;
  };

  static activeAttribute = async ({ attributeId }) => {
    const convertId = convertToObjectIdMongodb(attributeId);

    const foundAttribute = await findAttributeById({ attributeId: convertId });

    if (!foundAttribute) throw new NotFoundError("Attribute Not Found");

    foundAttribute.isDraft = true;
    foundAttribute.isPublished = false;
    foundAttribute.isDeleted = false;

    const { modifiedCount } = await foundAttribute.updateOne(foundAttribute);
    return modifiedCount;
  };
}

module.exports = AttributeService;
