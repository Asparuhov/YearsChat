const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user joined room " + data);
  });
   
  socket.on("send_message", (data) =>{
   socket.to(data.roomId).emit("recieve_message", data)
   console.log("recieving ");
  })

  socket.on("disconnect", () => {
    console.log(`User Disconnected ${socket.id}`);
  });
});

server.listen("4000", () => {
  console.log("running on 4000");
});