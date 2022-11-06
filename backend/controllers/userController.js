// const register
const asyncHandler = require("express-async-handler");
const User = require("../modal/userModal");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  // const { name, email, password, pic } = req.body;
  // req.body; // JavaScript object containing the parse JSON
  const { name, email, password, pic } = req.body;
  // return res.status(201).json(req);
  if (!name || !email || !password || !pic) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password, pic });
  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});
const getUser = asyncHandler(async (req, res) => {
  console.log(req);
  const keyward = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const user = await User.find(keyward).find({ _id: { $ne: req.user._id } });
  if (user) {
    return res.status(200).json({
      user,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User is not register");
  }
  const isMatch = await user.matchPassword(password);
  if (isMatch) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Password is incorrect");
  }
});
module.exports = { registerUser, getUser, authUser };
