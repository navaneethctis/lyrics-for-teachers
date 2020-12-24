const cors = require("cors");
const express = require("express");
const { connect } = require("mongoose");

require("./source/utilities/nms");
const roomRoute = require("./source/routes/room");
const userRoute = require("./source/routes/user");
const socket = require("./source/utilities/socket");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (_, response) => response.sendStatus(200));
app.use("/room", roomRoute);
app.use("/user", userRoute);

const server = socket(app);

connect(process.env.DATABASE, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => server.listen(process.env.PORT || 5000))
  .catch(console.warn);
