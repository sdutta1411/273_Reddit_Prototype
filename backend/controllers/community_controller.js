const bcrypt = require("bcryptjs");
const connection = require("../config/mysql_config");
const Community = require("../models/Community");
const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");

//Create a New Community
const createnewcommunity = async(req, res) => {  
  console.log("In create community API");
  const {
    communityName,
    description,
    admin,
  } = req.body;

 const comm = await Community.findOne({ communityName: req.body.communityName });
 const admin_user = await UserProfile.findOne({ email: admin });

 if(comm){
    return res.status(400).json({message: 'Community with same name already exists.Please choose a different name'});
  }else{
  console.log("creating a new community");
    const newCommunity = new Community({
      communityName: req.body.communityName,
      description: req.body.description,
      admin: admin_user._id,
      subscribedBy: [admin_user._id],
      subscriberCount: 1,
    });
    const savedCommunity = await newCommunity.save();
    admin_user.subscribedCommunities = admin_user.subscribedCommunities.concat(savedCommunity._id);
    await admin_user.save();
    return res.status(200).json(savedCommunity);
    //res.status(200).json(community);
  }
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

module.exports = {
  createnewcommunity,
  getAllCommunityDetails
};