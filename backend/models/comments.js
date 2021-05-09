const mongoose = require('mongoose');
const commentSchema = mongoose.commentSchema;
const Populate = require('../utils/autopopulate');


const commentSchema = new mongoose.Schema({
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    commentBody: {
      type: String,
      trim: true,
    },
    // replies: [replySchema],
    comments: [
      {
        type: Schema.Types.ObjectId, 
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

  module.exports = mongoose.model('Comment', commentSchema);