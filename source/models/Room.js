const { model, Schema } = require("mongoose");

const roomSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  user: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});

const Room = model("Room", roomSchema);

module.exports = Room;
