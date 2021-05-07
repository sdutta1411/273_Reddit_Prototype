const bcrypt = require("bcryptjs");
const connection = require("../config/mysql_config");
const Community = require("../models/Community");
const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");

//Create a New Community
const createnewcommunity = async(req, res) => {    
};

// Get all Community details - Community Home Page
const getAllCommunityDetails = async(req, res) => {  
      console.log("In Get all Community details API");
      Community.findOne({ communityName: req.body.communityName }).then(community => {
        if(!community){
            return res.status(404).json({message: 'Community does not exist.'});
        }else{
            res.status(200).json(community);
        }
      });
    };

exports.createnewpost = createnewpost;