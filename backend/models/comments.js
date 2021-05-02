const mongoose = require('mongoose');
const commentSchema = mongoose.commentSchema;

const commentSchema = new mongoose.Schema({
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    commentBody: {
      type: String,
      trim: true,
    },
    replies: [replySchema],
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    downvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    pointsCount: {
      type: Number,
      default: 1,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  module.exports = mongoose.model('Comment', commentSchema);