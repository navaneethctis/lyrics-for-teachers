const { createServer } = require("http");
const { Server } = require("socket.io");

const socket = (app) => {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("create-room", (room) =>
      socket.broadcast.emit("room-created", room)
    );

    socket.on("delete-room", (room) =>
      socket.broadcast.emit("room-deleted", room)
    );

    socket.on("join-room", (room, user) => {
      socket.join(room);
      socket.to(room).broadcast.emit("room-joined", user);

      socket.on("send-message", (message) =>
        socket.to(room).broadcast.emit("message-received", message, user)
      );

      socket.on("disconnect", () =>
        socket.to(room).broadcast.emit("disconnected", user)
      );
    });
  });

  return server;
};

module.exports = socket;
