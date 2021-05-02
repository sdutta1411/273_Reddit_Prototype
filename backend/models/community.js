const mongoose = require('mongoose');
const communitySchema = mongoose.communitySchema;


const communitySchema = new mongoose.Schema(
  {
    communityName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    subscribedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    userCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Community', communitySchema);