const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  user: {
    type: String,
  },
  chat: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
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
});

module.exports = mongoose.model("messages", MessageSchema);
