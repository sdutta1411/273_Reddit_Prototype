const Community = require("../../Models/Community")
const Post = require("../models/Post");
const UserProfile = require("../models/UserProfile");

const getAllCommunities_dashboard =async(msg, callback) => {

  try {
    redis.get(getallcommunities, (err, getallcommunities) => {
      if (getallcommunities) {
        console.log("Reddis")
        let results = JSON.parse(getallcommunities);
        console.log(results[0])
          return callback(null, results);
      } else {
        const usercomms = await UserProfile.find({ email: msg.email });
        if (usercomms[0]) {
          const ownerId = usercomms[0]._id;
          const ownerComms = await Community.find({ admin: ownerId }).populate('posts');
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
            redis.set(getallcommunities, JSON.stringify(objToSend));
            return callback(objToSend);
          } else {
            return callback(null,201)
            //   .status(201)
            //   .json({ message: "This User is not an admin in any community" });
          }
        } else {
          return callback(null,201)
        //   res.status(201).json({ message: "This User does not exist" });
        }
      }
    })
  }
  catch (error) {
    console.log(error);
    return callback(null,501);
}

    console.log("---------------",msg);
    console.log("Get Owner communities API" + JSON.stringify(msg.email));
   
}

exports.getAllCommunities_dashboard = getAllCommunities_dashboard;