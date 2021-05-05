const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema(
  {
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true 
    },
    password:{
        type: String,
        required: true
    },
    avatar:{
        type:String
    },
    topics: [{
        type: String
    }],
    gender: {
        type:String
    },
    location: {
        type:String
    },
    description: {
        type:String
    }
  },{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});


module.exports = mongoose.model('UserProfile', UserProfileSchema);