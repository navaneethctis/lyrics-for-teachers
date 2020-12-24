const { validationResult } = require("express-validator");

const Room = require("../models/Room");
const createRequestHandler = require("../utilities/createRequestHandler");

const createRoom = createRequestHandler(async (request, response) => {
  const { body, user } = request;
  const errors = validationResult(request);

  if (!errors.isEmpty())
    return response.status(400).json({
      errors: errors.array(),
    });

  const room = await new Room({
    name: body.name,
    user: user.id,
  }).save();
  response.status(201).json({
    room,
  });
});

const deleteRoom = createRequestHandler(async (request, response) => {
  const { params, user } = request;
  const room = await Room.findById(params.id).populate("user");

  if (!room) return response.sendStatus(404);

  if (room.user.id !== user.id) return response.sendStatus(401);

  await Room.findByIdAndDelete(room.id);
  response.sendStatus(204);
});

const readRoom = createRequestHandler(async (request, response) => {
  const room = await Room.findById(request.params.id).populate("user");

  if (!room) return response.sendStatus(404);

  response.json({
    room,
  });
});

const updateRoom = createRequestHandler(async (request, response) => {
  const { body, params, user } = request;
  const errors = validationResult(request);

  if (!errors.isEmpty())
    return response.status(400).json({
      errors: errors.array(),
    });

  const room = await Room.findById(params.id).populate("user");

  if (!room) return response.sendStatus(404);

  if (room.user.id !== user.id) return response.sendStatus(401);

  Object.keys(body).forEach((field) => (room[field] = body[field]));
  await room.save();
  response.json({
    room,
  });
});

module.exports = {
  createRoom,
  deleteRoom,
  readRoom,
  updateRoom,
};
