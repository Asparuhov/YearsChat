const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const PORT = process.env.PORT || 4000;

app.use(cors());

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.roomId).emit("recieve_message", data);
  });

  socket.on("delete_message", (data) => {
    socket.to(data.roomId).emit("delete", data);
  });

  socket.on("edit_message", (data) => {
    socket.to(data.roomId).emit("edit", data);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
