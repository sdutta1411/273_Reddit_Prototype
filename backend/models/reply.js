const mongoose = require('mongoose');
const replySchema = mongoose.replySchema;

const replySchema = new mongoose.Schema({
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    replyBody: {
      type: String,
      trim: true,
    },
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
  },{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});
  
  module.exports = mongoose.model('Reply', replySchema);