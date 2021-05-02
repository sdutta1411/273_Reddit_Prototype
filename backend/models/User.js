import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true,
        trim: true,
      },
      passwordHash: {
        type: String,
        required: true,
      },
      avatar: {
        exists: {
          type: Boolean,
          default: 'false',
        },
        imageLink: {
          type: String,
          trim: true,
          default: 'null',
        },
        imageId: {
          type: String,
          trim: true,
          default: 'null',
        },
      },
      userActivity: {
        countPost: {
          type: Number,
          default: 0,
        },
        countComment: {
          type: Number,
          default: 0,
        },
      },
      posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post',
        },
      ],
      userCommunity: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Community',
        },
      ],
      totalComments: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );
  
  
  
  module.exports = mongoose.model('User', userSchema);