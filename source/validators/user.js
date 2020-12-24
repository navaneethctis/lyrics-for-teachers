const { body } = require("express-validator");

const User = require("../models/User");

const isConfirmed = (value, { req: request }) => {
  if (value !== request.body.password)
    throw new Error("Password confirmation does not match password");

  return true;
};

const isUnique = (value) =>
  User.findOne({
    username: value,
  }).then((user) => {
    if (user) return Promise.reject("Username already in use");
  });

const validateCreate = () => [
  body("confirmation").custom(isConfirmed),
  body("name").notEmpty(),
  body("password").notEmpty().isLength({ min: 8 }),
  body("username").notEmpty().isAlphanumeric().custom(isUnique),
];

const validateUpdate = () => [
  body("name").notEmpty(),
  body("username").notEmpty().isAlphanumeric().custom(isUnique),
];

module.exports = {
  validateUpdate,
  validateCreate,
};
