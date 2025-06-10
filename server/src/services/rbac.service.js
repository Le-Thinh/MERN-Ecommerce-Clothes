"use strict";

const ROLE = require("../models/role.model");
const RESOURCE = require("../models/resource.model");
const { BadRequestError } = require("../core/error.response");

class RBACService {
  static createResource = async ({ src_name, src_slug, src_description }) => {
    // 1. Check resource or slug exists in db
    const foundResource = await RESOURCE.findOne({
      src_name,
      src_slug,
    }).lean();

    if (foundResource) throw new BadRequestError("Resource already exists!!");

    // 2. create new resource
    const newResource = await RESOURCE.create({
      src_name,
      src_slug,
      src_description,
    });

    return newResource;
  };

  static listResources = async ({
    userId,
    limit = 30,
    offset = 0,
    search = "",
  }) => {
    const resources = await RESOURCE.aggregate([
      {
        $project: {
          _id: 0,
          name: "$src_name",
          slug: "$src_slug",
          description: "$src_description",
          resourceId: "$_id",
          createdAt: 1,
        },
      },
    ]);

    return resources;
  };

  static createRole = async ({
    rol_name = "shop",
    rol_slug = "s00001",
    rol_description = "extend from shop or user",
    rol_grants = [],
  }) => {
    // 1. check role exists
    const foundRole = await ROLE.findOne({
      rol_name,
      rol_slug,
    }).lean();
    if (foundRole) throw new BadRequestError("Role already exists!!");

    const role = await ROLE.create({
      rol_name,
      rol_slug,
      rol_description,
      rol_grants,
    });

    return role;
  };

  static listRoles = async ({
    userId,
    limit = 30,
    offset = 0,
    search = "",
  }) => {
    //1. check userId
    //
    //2. List roles

    // {
    //     role: "admin",
    //     resource: "profile",
    //     action: "read:any",
    //     attributes: "*, !views",
    //   },

    const roles = await ROLE.aggregate([
      {
        $unwind: "$rol_grants",
      },
      {
        $lookup: {
          from: "resources",
          localField: "rol_grants.resourceId",
          foreignField: "_id",
          as: "resourceId",
        },
      },
      {
        $unwind: "$resourceId",
      },
      {
        $project: {
          role: "$rol_name",
          resource: "$resourceId.src_name",
          action: "$rol_grants.actions",
          attributes: "$rol_grants.attributes",
        },
      },
      {
        $unwind: "$action",
      },
      {
        $project: {
          _id: 0,
          role: 1,
          resource: 1,
          action: 1,
          attributes: 1,
        },
      },
    ]);

    return roles;
  };
}

module.exports = RBACService;
