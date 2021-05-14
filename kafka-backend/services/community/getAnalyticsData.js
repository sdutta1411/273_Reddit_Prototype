const Community = require("../../Models/Community")
const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");

const getAnalyticsData =async(msg, callback) => {
    console.log("---------------",msg);
    console.log("Get Owner communities API" + JSON.stringify(msg.email));
  const usercomms = await UserProfile.find({ email: msg.email });
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
      const final_data = { communityTableData: communityTableData, data: data, userTableData: userTableData };
      return callback(null,final_data)
        // .status(200)
        // .json({ communityTableData: communityTableData, data: data, userTableData: userTableData });
    } else {
      return callback(null,201)
        // .status(201)
        // .json({ message: "This User is not an admin in any community" });
    }
  } else {
    return callback(null,201)
    // res.status(201).json({ message: "This User does not exist" });
  }
}

exports.getAnalyticsData = getAnalyticsData;