const mongoose = require('mongoose');
const Populate = require('../utils/autopopulate');


const CommentSchema = new mongoose.Schema({
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile',
    },
    commentedCommunity:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Community',
    },
    commentBody: {
      type: String,
      trim: true,
    },
    // replies: [replySchema],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Comment"
      }
    ],
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

CommentSchema
.pre('findOne', Populate('author'))
.pre('find', Populate('author'))
.pre('findOne', Populate('comments'))
.pre('find', Populate('comments'))

  module.exports = mongoose.model('Comment', CommentSchema);