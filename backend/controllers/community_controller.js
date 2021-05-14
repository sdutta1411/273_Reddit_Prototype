const bcrypt = require("bcryptjs");
const connection = require("../config/mysql_config");
const Community = require("../models/Community");
const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");
var _ = require("lodash");
const kafka = require("../kafka/client");

//Create a New Community
const createnewcommunity = (req, res) => {
  console.log("In create community API");
  const { communityName, description, admin } = req.body;
  console.log("inside postmethod for message backend");
  console.log("req.body", req.body);
  let msg = req.body;
  msg.route = "createnewcommunity";
  kafka.make_request("community", msg, (err, result) => {
    console.log("createnewcommunity details:", result);
    if (result === 201) {
    
      res.status(201)
        .json({ message: "This User is not an admin in any community" });
    }  else {
     res.send(result)
    }
  });
};

// Get all Community details - Community Home Page
const getCommunityDetails = async (req, res) => {
  console.log("In Get all Community details API");
  Community.findOne({ communityName: req.body.communityName }).then(
    (community) => {
      if (!community) {
        return res.status(404).json({ message: "Community does not exist." });
      } else {
        res.status(200).json(community);
      }
    }
  );
};

// Join Community - Community Home Page
const joinCommunity = async (req, res) => {
  console.log(
    "Join Community API" + req.body.email + "," + req.body.communityName
  );
  const user = await UserProfile.findOne({ email: req.body.email });

  await Community.findOne({
    communityName: req.body.communityName,
  },
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //Check if the user is already part of the community they are being invited to
        if (result.subscribedBy.includes(user._id)) {
          // Can't request user as they are already part of community
          // Store the users already part of the community
          return res.status(201).json({ message: 'User is subscribed to the community' })
        } else {
          // The user hasn't joined the community yet
          if (user.communityStatus.length != 0) {
            for (let i = 0; i < user.communityStatus.length; i++) {
              if (user.communityStatus[i].communityID == result._id &&
                user.communityStatus[i].status == 'Requested') {
                // request found
                break
              } else {
                //create request
                user.communityStatus = user.communityStatus.concat({communityID: result._id,status:'Requested',invitedBy: user._id, ts: Date.now()})
                return res.status(200).json("You have requested to join community")
              }
            }
          }
        }
      }
    }
  )
  // if (comm) {
  //   comm.subscribedBy = comm.subscribedBy.concat(user._id);
  //   await comm.save();
  //   user.subscribedCommunities = user.subscribedCommunities.concat(comm._id);
  //   await user.save();
  //   return res.status(200).json("You joined community");
  // }
};

// Leave Community - Community Home Page


const leaveCommunity = async (req, res) => {
  console.log(
    "Leave Community API" + req.body.email + "," + req.body.communityName
  );
  const comm = await Community.findOne({
    communityName: req.body.communityName,
  });
  const user = await UserProfile.findOne({ email: req.body.email });
  console.log("community exists: " + comm);
  console.log("user exists: " + user);
  if (comm) {
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
const getUserCommunities = async (req, res) => {
  console.log("Get User communities API" + JSON.stringify(req.body.email));
  //const comm = await Community.findOne({ communityName: req.body.communityName });
  //const user = await UserProfile.findOne({user:req.user.id});
  //console.log("community exists: "+comm);
  //console.log("user exists: "+user);
  const usercomms = await UserProfile.find(
    { email: req.body.email },
    { subscribedCommunities: 1 }
  );
  console.log("usercomms: " + usercomms);
  return res.status(200).json(usercomms);
};

// Check if user is a member of community - Community Home Page
const checkUserSubscribed = async (req, res) => {
  console.log(
    "checkUserSubscribed API" +
    JSON.stringify(req.body.email) +
    " " +
    JSON.stringify(req.body.communityName)
  );
  var userSubscribed = false;
  const usercomms = await UserProfile.find(
    { email: req.body.email },
    { subscribedCommunities: 1 }
  );
  const c = await Community.findOne({ communityName: req.body.communityName });
  console.log("c:: " + c._id);
  console.log("usercomms: " + usercomms[0].subscribedCommunities);
  usercomms[0].subscribedCommunities.forEach((comm) => {
    if (String(comm).valueOf() == new String(c._id).valueOf()) {
      userSubscribed = true;
    }
  });
  if (userSubscribed === true) {
    console.log("user is subscribed to community");
    return res.status(200).json("You have subscribed to this community");
  } else {
    console.log("user is not subscribed to community");
    return res.status(404).json("You have not subscribed to this community");
  }
};

const searchCommunity = async (req, res, next) => {
  const comm = await Community.findOne({
    communityName: req.body.communityName,
  });

  if (!comm) {
    return next({
      message: "Please enter community name",
      statusCode: 400,
    });
  }

  let communityNames = [];

  if (comm) {
    communityNames = communityNames.concat([
      await Community.find({ communityName: req.body.communityName }),
    ]);
  }

  res.status(200).json({ success: true, data: communityNames });
};

// sort communities
const sortCommunity = async (req, res, next) => {
  const comm = await Community.findOne({
    communityName: req.body.communityName,
  });
  const sortBy = req.query.sortby;

  if (!comm) {
    return next({
      message: "Please enter community name",
      statusCode: 400,
    });
  }

  let sortQuery;
  switch (sortBy) {
    case "new":
      sortQuery = { createdAt: -1 };
      break;
    case "top":
      sortQuery = { pointsCount: -1 };
      break;
    case "best":
      sortQuery = { voteRatio: -1 };
      break;
    case "best":
      sortQuery = { voteRatio: -1 };
      break;
    default:
      sortQuery = {};
  }
};

// Fetch communities that the user is owner of
const getOwnerCommunities =  (req, res) => {
  console.log("inside postmethod for message backend");
  console.log("req.body", req.body);
  let msg = req.body;
  msg.route = "getOwnerCommunities";
  kafka.make_request("community", msg, (err, result) => {
    console.log("getOwnerCommunities details:", result);
    if (result === 201) {
   
      res.status(201)
        .json({ message: "This User is not an admin in any community" });
    }  else {
     res.send(result)
    }
  });
};

const getAllOwnerCommunities =  (req, res) => {
  console.log("inside postmethod for message backend");
  console.log("req.body", req.body);
  let msg = req.body;
  msg.route = "getAllOwnerCommunities";
  kafka.make_request("community", msg, (err, result) => {
    console.log("getAllOwnerCommunities details:", result);
    if (result === 201) {
   
      res.status(201)
        .json({ message: "This User is not an admin in any community" });
    }  else {
     res.send(result)
    }
  });
};

const getAllCommunities_dashboard = async (req, res) => {
  console.log("Get Owner communities API" + JSON.stringify(req.body.email));
  const usercomms = await UserProfile.find({ email: req.body.email });
  if (usercomms[0]) {
    const ownerId = usercomms[0]._id;
    const ownerComms = await Community.find({ admin: ownerId }).populate(
      "posts"
    );
    if (ownerComms.length > 0) {
      return res.status(200).json(ownerComms);
    } else {
      return res
        .status(201)
        .json({ message: "This User is not an admin in any community" });
    }
  } else {
    return res.status(201).json({ message: "This User does not exist" });
  }
};

const getAnalyticsData =  (req, res) => {
  console.log("inside postmethod for message backend");
  console.log("req.body", req.body);
  let msg = req.body;
  msg.route = "getAnalyticsData";
  kafka.make_request("community", msg, (err, result) => {
    console.log("getAnalyticsData details:", result);
    if (result === 201) {
  
      res.status(201)
        .json({ message: "This User is not an admin in any community" });
    }  else {
     res.send(result)
    }
  });
 
};

const deleteCommunity =  (req, res) => {
  console.log("inside postmethod for message backend");
  console.log("req.body", req.body);
  let msg = req.body;
  msg.route = "deleteCommunity";
  kafka.make_request("community", msg, (err, result) => {
    console.log("deleteCommunity details:", result);
    if (result === 201) {
      
      res.status(201)
        .json({ message: "This User is not an admin in any community" });
    }  else {
     res.send(result)
    }
   } );
};

const editCommunity =  (req, res) => {
  console.log("inside postmethod for message backend");
  console.log("req.body", req.body);
  let msg = req.body;
  msg.route = "editCommunity";
  kafka.make_request("community", msg, (err, result) => {
    console.log("editCommunity details:", result);
    if (result === 201) {
    
      res.status(201)
        .json({ message: "This User is not an admin in any community" });
    }  else {
     res.send(result)
    }
  });
};


const topCommunity = async (req,res) =>{
  console.log("Get Owner communities API" + JSON.stringify(req.body.email));
  const usercomms = await UserProfile.find({ email: req.body.email });
  if (usercomms[0]) {
    const ownerId = usercomms[0]._id;
    const ownerComms = await Community.find({ admin: ownerId }).sort({posts:-1}).limit(10)
    if (ownerComms.length > 0) {
      return res.status(200).json(ownerComms);
    } else {
      return res
        .status(201)
        .json({ message: "This User is not an admin in any community" });
    }
  } else {
    return res.status(201).json({ message: "This User does not exist" });
  }
}

module.exports = {
  createnewcommunity,
  getCommunityDetails,
  joinCommunity,
  leaveCommunity,
  getUserCommunities,
  checkUserSubscribed,
  searchCommunity,
  sortCommunity,
  getAnalyticsData,
  getOwnerCommunities,
  getAllOwnerCommunities,
  getAllCommunities_dashboard,
  deleteCommunity,
  editCommunity,
  topCommunity,
};
