const express = require("express");
const chatRoute = require("./routes/chatRoutes");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoutes");
const messageRoute = require("./routes/messengeRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const cors = require("cors");
app.use(express.json()); // to support JSON-encoded bodies
dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);
connectDB();
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`gg ${PORT}`));
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
    credentials: false,
  },
  // transports: ['websocket']
});
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    console.log("connect to socket io");
    socket.join(userData);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined room" + room);
  });
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    console.log(chat);
    if (!chat?.users) return console.log("new users");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined room" + room);
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stopTyping", (room) => {
    socket.in(room).emit("stopTyping");
  });
  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});
