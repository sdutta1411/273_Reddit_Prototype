const bcrypt = require("bcryptjs");
const connection = require("../config/mysql_config");
const Community = require("../models/Community");
const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");
var _ = require('lodash');

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
const getCommunityDetails = async(req, res) => {  
      console.log("In Get all Community details API");
      Community.findOne({ communityName: req.body.communityName }).then(community => {
        if(!community){
            return res.status(404).json({message: 'Community does not exist.'});
        }else{
            res.status(200).json(community);
        }
      });
};

// Join Community - Community Home Page
const joinCommunity = async(req, res) => {  
  console.log("Join Community API"+req.body.email+","+req.body.communityName);
  const comm = await Community.findOne({ communityName: req.body.communityName });
  const user = await UserProfile.findOne({email:req.body.email});
  console.log("community exists: "+comm);
  console.log("user exists: "+user);

  if(comm){
    comm.subscribedBy = comm.subscribedBy.concat(user._id);
    await comm.save();
    user.subscribedCommunities = user.subscribedCommunities.concat(comm._id);
    await user.save();
    return res.status(200).json("You joined community");
  }  
};

// Leave Community - Community Home Page
const leaveCommunity = async(req, res) => {  
  console.log("Leave Community API"+req.body.email+","+req.body.communityName);
  const comm = await Community.findOne({ communityName: req.body.communityName });
  const user = await UserProfile.findOne({email:req.body.email});
  console.log("community exists: "+comm);
  console.log("user exists: "+user);
  if(comm){
    comm.subscribedBy = comm.subscribedBy.filter(
      (s) => s.toString() !== user._id.toString()
    );
    await comm.save();
    user.subscribedCommunities = user.subscribedCommunities.filter(
      (s) => s.toString() !== comm._id.toString()
    );
    await user.save();
    return res.status(200).json("You left community");
  }  
};

// Get User communities - Community Home Page
const getUserCommunities = async(req, res) => {  
  console.log("Get User communities API"+JSON.stringify(req.body.email));
  //const comm = await Community.findOne({ communityName: req.body.communityName });
  //const user = await UserProfile.findOne({user:req.user.id});
  //console.log("community exists: "+comm);
  //console.log("user exists: "+user);
  const usercomms = await UserProfile.find({email:req.body.email},{subscribedCommunities:1});
  console.log("usercomms: "+usercomms);
  return res.status(200).json(usercomms);
};

// Check if user is a member of community - Community Home Page
const checkUserSubscribed = async(req, res) => {  
  console.log("checkUserSubscribed API"+JSON.stringify(req.body.email)+" "+JSON.stringify(req.body.communityName));
  var userSubscribed = false;
  const usercomms = await UserProfile.find({email:req.body.email},{subscribedCommunities:1});
  const c = await Community.findOne({communityName:req.body.communityName});
  console.log("c:: "+c._id)
  console.log("usercomms: "+usercomms[0].subscribedCommunities);
  usercomms[0].subscribedCommunities.forEach(comm=>{
    if(String(comm).valueOf() == new String(c._id).valueOf()){
      userSubscribed = true;
    }
  })
  if(userSubscribed===true){
    console.log("user is subscribed to community");
    return res.status(200).json("You have subscribed to this community");
  }else{
    console.log("user is not subscribed to community");
    return res.status(404).json("You have not subscribed to this community");
  }  
};

// change status
const approveUsers = async(req, res) => {  
  /* console.log("Approve User request API"+req.body.email+","+req.body.communityName);
  const comm = await Community.findOne({ communityName: req.body.communityName });
  const user = await UserProfile.findOne({email:req.body.email});
  console.log("community exists: "+comm);
  console.log("user exists: "+user);
  if(comm){
    comm.subscribedBy = comm.subscribedBy.filter(
      (s) => s.toString() !== user._id.toString()
    );
    await comm.save();
    user.subscribedCommunities = user.subscribedCommunities.filter(
      (s) => s.toString() !== comm._id.toString()
    );
    await user.save();
    return res.status(200).json("You left community");
  }   */
};
const removeUsers = async(req, res) => {  
  /* console.log("Leave Community API"+req.body.email+","+req.body.communityName);
  const comm = await Community.findOne({ communityName: req.body.communityName });
  const user = await UserProfile.findOne({email:req.body.email});
  console.log("community exists: "+comm);
  console.log("user exists: "+user);
  if(comm){
    comm.subscribedBy = comm.subscribedBy.filter(
      (s) => s.toString() !== user._id.toString()
    );
    await comm.save();
    user.subscribedCommunities = user.subscribedCommunities.filter(
      (s) => s.toString() !== comm._id.toString()
    );
    await user.save();
    return res.status(200).json("You left community");
  }   */
};

/* 
const removeUsers = async(req, callback) => {
    let search = {
        "_id": req.list_id
    }
    let update = {
        $pull: {
            "list": req.user_id
        }
    }
    ListModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
    if(err) {
        callback(null,{
            success: false,
            msg: "Something went wrong",
            payload: err
        })
    } else {
        callback(null,{
            success: true,
            msg: "Successfully removed the user" ,
            payload: result
        }) 
    }
    });
} */

const searchCommunity = async(req, res) => {  
  /* console.log("Leave Community API"+req.body.email+","+req.body.communityName);
  const comm = await Community.findOne({ communityName: req.body.communityName });
  const user = await UserProfile.findOne({email:req.body.email});
  console.log("community exists: "+comm);
  console.log("user exists: "+user);
  if(comm){
    comm.subscribedBy = comm.subscribedBy.filter(
      (s) => s.toString() !== user._id.toString()
    );
    await comm.save();
    user.subscribedCommunities = user.subscribedCommunities.filter(
      (s) => s.toString() !== comm._id.toString()
    );
    await user.save();
    return res.status(200).json("You left community");
  }   */
};


module.exports = {
  createnewcommunity,
  getCommunityDetails,
  joinCommunity,
  leaveCommunity,
  getUserCommunities,
  checkUserSubscribed,
  approveUsers,
  removeUsers,
  searchCommunity
};