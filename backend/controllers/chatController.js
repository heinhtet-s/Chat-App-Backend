const asyncHandler = require("express-async-handler");
const Chat = require("../modal/chatModal");
const User = require("../modal/userModal");
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400);
    throw new Error("Please provide userId");
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  console.log("isChant", isChat);
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    return res.send(isChat[0]);
  } else {
    return res.send({});
  }
});
const connectChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400);
    throw new Error("Please provide userId");
  }
  var chatData = {
    ChatName: "",
    isGroupChat: false,
    users: [req.user._id, userId],
  };
  try {
    const createChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createChat._id }).populate(
      "users",
      "-password"
    );
    return res.status(200).json({ FullChat });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const fetchChat = asyncHandler(async (req, res) => {
  try {
    const chat = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        console.log(result);
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        return res.status(200).json({ data: result });
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.users) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  var users = req.body.users;
  console.log(users);
  if (users.length < 2) {
    res.status(400);
    throw new Error("Please enter atleast two users");
  }
  users = [...users, req.user._id];
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json({ fullGroupChat });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const updatedChat = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  const updateAt = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .pupulate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updateAt) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(updateAt);
  }
});
const addChat = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const updateAt = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .pupulate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updateAt) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(updateAt);
  }
});
const deleteChat = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const updateAt = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .pupulate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updateAt) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(updateAt);
  }
});
module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  updatedChat,
  addChat,
  deleteChat,
  connectChat,
};
