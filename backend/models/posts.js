const mongoose = require('mongoose');
const postSchema = mongoose.postSchema;
const Populate = require('../utils/autopopulate');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },
  postType: {
    type: String,
    required: true,
  },
  textSubmission: {
    type: String,
    trim: true,
  },
  linkSubmission: {
    type: String,
    trim: true,
  },
  imageSubmission: {
    imageLink: {
      type: String,
      trim: true,
    }
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  // pointsCount: {
  //   type: Number,
  //   default: 1,
  // },
  
  // famousPost: {
  //   type: Number,
  //   default: Date.now,
  // },
  // controversialPost: {
  //   type: Number,
  //   default: 0,
  // },
  comments :[{
    comment:{
           type: Schema.Types.ObjectId,
           ref: 'comments'
       }

   }],
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

PostSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))
module.exports = mongoose.model('Post', postSchema);