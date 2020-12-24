const jwt = require("jsonwebtoken");

const User = require("../models/User");
const createRequestHandler = require("../utilities/createRequestHandler");

const authorize = createRequestHandler(async (request, response, next) => {
  const authorization = request.get("Authorization");

  if (!authorization) return response.sendStatus(401);

  const token = authorization.split(" ")[1];
  let decoded;

  try {
    decoded = jwt.verify(token, "lyrics-for-teachers");
  } catch (error) {
    return response.sendStatus(403);
  }

  const user = await User.findById(decoded.userID);

  if (!user) return response.sendStatus(403);

  request.user = user;
  next();
});

module.exports = authorize;
