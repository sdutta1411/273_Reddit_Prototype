const mongoose = require('mongoose');
const replySchema = mongoose.replySchema;

const replySchema = new mongoose.Schema({
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile',
    },
    replyBody: {
      type: String,
      trim: true,
    },
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
      },
    ],
    downvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
      },
    ],
    pointsCount: {
      type: Number,
      default: 1,
    },
  },{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});
  
  module.exports = mongoose.model('Reply', replySchema);