const asyncHandler = require("express-async-handler");
const Chat = require("../modal/chatModal");
const Message = require("../modal/messageModal");
const User = require("../modal/userModal");
const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;

  try {
    let message = await Message.create({
      sender: req.user._id,
      content: content,
      chat: chatId,
    });

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    const latestMessage = await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
const allMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat")
      .sort({ createAt: -1 });
    res.json(messages);
  } catch {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = { sendMessage, allMessages };
