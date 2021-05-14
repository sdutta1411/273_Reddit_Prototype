/* /* module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    userId: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    emailid: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    profilepicture: {
      type: Sequelize.STRING
    },
    topics: [{
      type: Sequelize.STRING
    }],
  });

  return Tutorial;
}; */

/* const mongoose = require('mongoose');
const { commentSchema } = require('./post');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailid:{
      type: String
    },
    gender: {
      type: String
    },
    location: {
      type: String
    },
    description: {
      type: String
    },
    profilepicture: {
      type: Sequelize.STRING
    },
    topics: [{
      type: STRING
    }],
    
 
);


module.exports = mongoose.model('User', userSchema);
 */