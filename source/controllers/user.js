const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const createRequestHandler = require("../utilities/createRequestHandler");

const createUser = createRequestHandler(async (request, response) => {
  const { name, password, username } = request.body;
  const errors = validationResult(request);

  if (!errors.isEmpty())
    return response.status(400).json({
      errors: errors.array(),
    });

  const hash = await bcrypt.hash(password, 10);
  const user = await new User({
    name,
    password: hash,
    username,
  }).save();
  response.status(201).json({
    user,
  });
});

const deleteUser = createRequestHandler(async (request, response) => {
  await User.findByIdAndDelete(request.user.id);
  response.sendStatus(204);
});

const readUser = (request, response) =>
  response.json({
    user: request.user,
  });

const updateUser = createRequestHandler(async (request, response) => {
  const { body, user } = request;
  const errors = validationResult(request);

  if (!errors.isEmpty())
    return response.status(400).json({
      errors: errors.array(),
    });

  Object.keys(body).forEach((field) => (user[field] = body[field]));
  await user.save();
  response.json({
    user,
  });
});

module.exports = {
  createUser,
  deleteUser,
  readUser,
  updateUser,
};
