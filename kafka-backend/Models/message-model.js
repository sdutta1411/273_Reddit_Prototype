const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  username: {
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
  email: {
    type: String,
  },
  username: {
    type: String,
  },
});

const MessagesSchema = mongoose.Schema({
  users: [UserSchema],

  chats: [ChatSchema],
});

module.exports = mongoose.model("messages", MessagesSchema);
