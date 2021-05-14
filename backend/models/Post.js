const mongoose = require('mongoose');
const Populate = require('../utils/autopopulate');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  postType: {
    type: String,
  },
  textSubmission: {
    type: String,
    trim: true,
  },
  linkSubmission: {
    type: String,
    trim: true,
  },
  imageSubmission: [
    {
    //imageLink: {
      type: String,
      trim: true,
    //}
  }],
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
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
  voteRatio: {
    type: Number,
    default: 0,
  },
  pointsCount: {
    type: Number,
    default: 1,
  },
  
  // famousPost: {
  //   type: Number,
  //   default: Date.now,
  // },
  // controversialPost: {
  //   type: Number,
  //   default: 0,
  // },

  comments :[
    {
    comment:{
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Comment'
       }
   }
  ],
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

PostSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))
module.exports = mongoose.model('Post', PostSchema);