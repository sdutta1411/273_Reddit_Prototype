const mongoose = require('mongoose');
const communitySchema = mongoose.communitySchema;


const CommunitySchema = new mongoose.Schema(
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
    rules:[{
      title:{
        type: String,
        required: true
      },
      description:{
        type: String,
      }
  }],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    communityPictures: [
      {
        type:String
      }
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
  },{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});


module.exports = mongoose.model('Community', CommunitySchema);