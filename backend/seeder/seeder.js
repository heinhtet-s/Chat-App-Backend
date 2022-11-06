const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { chats, users } = require("../data/data");
const User = require("../modal/userModal");
const Chat = require("../modal/chatModal");
const Message = require("../modal/messageModal");
const connectDB = require("../config/db");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Chat.deleteMany();
    await Message.deleteMany();
    const createdUsers = await User.insertMany(users);
    const createChats = await Chat.insertMany(chats);
    process.exit();
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};
const dataDestroy = async () => {
  await User.deleteMany();
  await Chat.deleteMany();
  await Message.deleteMany();
  process.exit();
};
if (process.argv[2] === "-d") {
  dataDestroy();
} else {
  importData();
}
