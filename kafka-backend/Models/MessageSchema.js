const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  user: {
    type: String,
  },
  chat: {
    type: String,
  },
});

const UserSchema = mongoose.Schema({
  user: {
    type: String,
  },
});

const MessageSchema = mongoose.Schema({
  users: [UserSchema],

  chats: [ChatSchema],

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("messages", MessageSchema);