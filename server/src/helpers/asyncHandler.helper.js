"use strict";

const asyncHandler = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};

module.exports = asyncHandler;
