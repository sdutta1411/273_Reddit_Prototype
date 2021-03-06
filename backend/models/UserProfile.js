const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // password:{
    //     type: String,
    //     required: true
    // },
    avatar: {
      type: String,
    },
    topics: [
      {
        type: String,
      },
    ],
    gender: {
      type: String,
      default: "Male",
    },
    location: {
      type: String,
      default: "USA",
    },
    description: {
      type: String,
      default: "Busy building reddit prototype",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    subscribedCommunities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
      },
    ],
    totalComments: {
      type: Number,
      default: 0,
    },
    communityStatus: [
      {
        communityID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Community",
        },
        status: { type: String },
        invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile" },
        ts: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);
