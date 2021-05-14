const Community = require("../../Models/Community")
const Post = require("../../Models/Post");
const UserProfile = require("../../Models/UserProfile");
var redisClient = require("redis").createClient;
var redis = redisClient(6379, "localhost", {detect_buffers : true});

const getAllCommunitiesdashboard = (msg, callback) => {
const {email} = msg.email
console.log("email", email)
  try {
    redis.get(email, (err, getallcommunities) => {
      if (getallcommunities) {
        console.log("Reddis")
        let results = JSON.parse(getallcommunities);
        console.log(results[0])
          return callback(null, results);
      } else {
        const usercomms =  UserProfile.find({ email: msg.email });
        if (usercomms[0]) {
          const ownerId = usercomms[0]._id;
          const ownerComms =  Community.find({ admin: ownerId }).populate('posts');
          console.log("Owner....",ownerComms)
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
            redis.set(email, JSON.stringify(objToSend));
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
   
}

exports.getAllCommunitiesdashboard = getAllCommunitiesdashboard;