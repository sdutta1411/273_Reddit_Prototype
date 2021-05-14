const bcrypt = require("bcryptjs");
const connection = require("../config/mysql_config");
const Community = require("../models/Community");
const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");
var _ = require("lodash");

//Create a New Community
const createnewcommunity = async (req, res) => {
  console.log("In create community API");
  const { communityName, description, admin } = req.body;

  const comm = await Community.findOne({
    communityName: req.body.communityName,
  });
  const admin_user = await UserProfile.findOne({ email: admin });

  if (comm) {
    return res
      .status(400)
      .json({
        message:
          "Community with same name already exists.Please choose a different name",
      });
  } else {
    console.log("creating a new community");
    const newCommunity = new Community({
      communityName: req.body.communityName,
      description: req.body.description,
      admin: admin_user._id,
      subscribedBy: [admin_user._id],
      subscriberCount: 1,
    });
    const savedCommunity = await newCommunity.save();
    admin_user.subscribedCommunities = admin_user.subscribedCommunities.concat(
      savedCommunity._id
    );
    await admin_user.save();
    return res.status(200).json(savedCommunity);
    //res.status(200).json(community);
  }
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
  const comm = await Community.findOne({
    communityName: req.body.communityName,
  });
  const user = await UserProfile.findOne({ email: req.body.email });
  console.log("community exists: " + comm);
  console.log("user exists: " + user);

  if (comm) {
    comm.subscribedBy = comm.subscribedBy.concat(user._id);
    await comm.save();
    user.subscribedCommunities = user.subscribedCommunities.concat(comm._id);
    await user.save();
    return res.status(200).json("You joined community");
  }
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
const getOwnerCommunities = async (req, res) => {
  console.log("Get Owner communities API" + JSON.stringify(req.body.email));
  const usercomms = await UserProfile.find({ email: req.body.email });
  if (usercomms[0]) {
    const ownerId = usercomms[0]._id;
    const ownerComms = await Community.find({ admin: ownerId });
    if (ownerComms.length > 0) {
      let objToSend = [];
      ownerComms.forEach((element) => {
        let item = {
          name: element.communityName,
          CommunityID: element._id,
          CommunityOwner: element.admin,
        };
        objToSend.push(item);
      });
      return res.status(200).json(objToSend);
    } else {
      return res
        .status(201)
        .json({ message: "This User is not an admin in any community" });
    }
  } else {
    return res.status(201).json({ message: "This User does not exist" });
  }
};
const getAllOwnerCommunities = async (req, res) => {
  console.log("Get Owner communities API" + JSON.stringify(req.body.email));
  console.log(req.body)
  const usercomms = await UserProfile.find({ email: req.body.email });
  if (usercomms[0]) {
    const ownerId = usercomms[0]._id;
    switch (req.body.type) {
      case 10:
        if(req.body.sorted === true){
          const ownerComms = await Community.find({ admin: ownerId }).sort({created_at : 1});
          if (ownerComms.length > 0) {
            return res.status(200).json(ownerComms);
          } else {
            return res
              .status(201)
              .json({ message: "This User is not an admin in any community" });
          }
        }  else if(req.body.sorted === false){
          const ownerComms = await Community.find({ admin: ownerId }).sort({created_at : -1});
          if (ownerComms.length > 0) {
            return res.status(200).json(ownerComms);
          } else {
            return res
              .status(201)
              .json({ message: "This User is not an admin in any community" });
          }
        }
        break;

      case 20:
        if(req.body.sorted === true){
          const ownerComms = await Community.find({ admin: ownerId }).sort({posts: 1});
          if (ownerComms.length > 0) {
            return res.status(200).json(ownerComms);
          } else {
            return res
              .status(201)
              .json({ message: "This User is not an admin in any community" });
          }
        }  else if(req.body.sorted === false){
          const ownerComms = await Community.find({ admin: ownerId }).sort({posts : -1});
          if (ownerComms.length > 0) {
            return res.status(200).json(ownerComms);
          } else {
            return res
              .status(201)
              .json({ message: "This User is not an admin in any community" });
          }
        }
        break;

      case 30:
        if(req.body.sorted === true){
          const ownerComms = await Community.find({ admin: ownerId }).sort({'subscribedBy.length' : 1});
          if (ownerComms.length > 0) {
            return res.status(200).json(ownerComms);
          } else {
            return res
              .status(201)
              .json({ message: "This User is not an admin in any community" });
          }
        }  else if(req.body.sorted === false){
          const ownerComms = await Community.find({ admin: ownerId }).sort({'subscribedBy.length' : -1});
          if (ownerComms.length > 0) {
            return res.status(200).json(ownerComms);
          } else {
            return res
              .status(201)
              .json({ message: "This User is not an admin in any community" });
          }
        }
        break;
    
      default:
        break;
    }
  }
   else {
    return res.status(201).json({ message: "This User does not exist" });
  }


};


const getAllCommunities_dashboard = async (req, res) => {
  console.log("Get Owner communities API" + JSON.stringify(req.body.email));
  const usercomms = await UserProfile.find({ email: req.body.email });
  if (usercomms[0]) {
    const ownerId = usercomms[0]._id;
    const ownerComms = await Community.find({ admin: ownerId }).populate('posts');
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

const getAnalyticsData = async (req, res) => {
  console.log("Get Owner communities API" + JSON.stringify(req.body.email));
  const usercomms = await UserProfile.find({ email: req.body.email });
  if (usercomms[0]) {
    const ownerId = usercomms[0]._id;
    const ownerComms = await Community.find({ admin: ownerId });
    if (ownerComms.length > 0) {
      let data = [];
      let communityTableData = [];
      let userTableData = [];
      for (let i = 0; i < ownerComms.length; i++) {
        commPosts = await Post.find({ community: ownerComms[i]._id });
        NumOfPost = ownerComms[i].posts.length;
        numOfUsers = ownerComms[i].subscribedBy.length;
        commPosts.sort(function (a, b) {
          var keyA = a.pointsCount,
            keyB = b.pointsCount;
          // Compare the 2 dates
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        let counts = {};
        for (let j = 0; j < commPosts.length; j++) {
          counts[commPosts[i].author.email] =
            (counts[commPosts[i].author.email] || 0) + 1;
        }
        const sortable = Object.fromEntries(
          Object.entries(counts).sort(([, a], [, b]) => b - a)
        );
        let userItem = {
          name: ownerComms[i].communityName,
          ActiveUser:  Object.entries(sortable)[0][0],
          UserPostCount: Object.entries(sortable)[0][1]
        }
        // console.log(commPosts)
        let mostUpvotedPost = {
          name: ownerComms[i].communityName,
          title: commPosts[0].title,
          Author: commPosts[0].author.email,
          Votes: commPosts[0].pointsCount,
        };
        let item = {
          name: ownerComms[i].communityName,
          UserCount: numOfUsers,
          PostCount: NumOfPost,
        };
        userTableData.push(userItem);
        communityTableData.push(mostUpvotedPost);
        data.push(item);
      }
      return res
        .status(200)
        .json({ communityTableData: communityTableData, data: data, userTableData: userTableData });
    } else {
      return res
        .status(201)
        .json({ message: "This User is not an admin in any community" });
    }
  } else {
    return res.status(201).json({ message: "This User does not exist" });
  }
};

const deleteCommunity = async (req, res, next) => {
  const comm = await Community.findOne({
    _id: req.body.CommunityID,
  });

  
};

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
};
