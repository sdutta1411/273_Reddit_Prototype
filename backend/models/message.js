const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  chat: {
    type: String,
    required: true,
  },
});

const UserSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
});

const MessagesSchema = mongoose.Schema({
  chatroom_id: {
    type: String,
    required: true,
  },

  chats: [ChatSchema],

  users: [UserSchema],

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("messages", MessagesSchema);
