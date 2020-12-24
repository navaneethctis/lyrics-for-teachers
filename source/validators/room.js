const { body } = require("express-validator");

const validateCreate = () => [body("name").notEmpty()];

const validateUpdate = () => [body("name").notEmpty()];

module.exports = {
  validateUpdate,
  validateCreate,
};
