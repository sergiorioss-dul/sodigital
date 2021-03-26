const express = require("express");
const path = require("path");
const app = express();
const db = require("./config/db");
require("dotenv").config();
const Message = require("./models/Messages");

db.sync()
  .then(() => console.log("📩 📩"))
  .catch((err) => console.log(err));
// static files
app.use(express.static(path.join(__dirname, "public")));

const socketIO = require("socket.io");
const server = app.listen(3000, () => {
  console.log("servidor levantado");
});
const io = socketIO(server);
io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.emit("welcome", "The server says Welcome to Chat");
  socket.on("msj", (data) => {
    Message.create(data).then((res) => {
      Message.findAll({ order: [["createdAt", "DESC"]],limit:10 }).then((res) => {
        const conversation = res;
        io.to(socket.id).emit("msj", conversation);
      });
    });
  });
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
  socket.on("terminate", function () {
    socket.disconnect(0);
  });
});
