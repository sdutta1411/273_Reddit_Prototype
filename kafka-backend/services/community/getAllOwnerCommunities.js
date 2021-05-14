const Community = require("../../Models/Community")
const Post = require("../../Models/Post");
const UserProfile = require("../../Models/UserProfile");
const getAllOwnerCommunities =async(msg, callback) => {
    console.log("---------------",msg);
    console.log("--now here-");
    console.log("Get Owner communities API" + JSON.stringify(msg.email));
  console.log(msg)
  const usercomms = await UserProfile.find({ email: msg.email });
  if (usercomms[0]) {
    const ownerId = usercomms[0]._id;
    switch (msg.type) {
      case 10:
        if(msg.sorted === true){
          const ownerComms = await Community.find({ admin: ownerId }).sort({created_at : 1});
          if (ownerComms.length > 0) {
            return callback(null,ownerComms);
          } else {
            return callback(null,201)
            //   .status(201)
            //   .json({ message: "This User is not an admin in any community" });
          }
        }  else if(msg.sorted === false){
          const ownerComms = await Community.find({ admin: ownerId }).sort({created_at : -1});
          if (ownerComms.length > 0) {
            return callback(null,ownerComms);
          } else {
            return callback(null,201)
            //   .status(201)
            //   .json({ message: "This User is not an admin in any community" });
          }
        }
        break;

      case 20:
        if(msg.sorted === true){
          const ownerComms = await Community.find({ admin: ownerId }).sort({posts: 1});
          if (ownerComms.length > 0) {
            return callback(null,ownerComms);
          } else {
            return callback(null,201)
            //   .status(201)
            //   .json({ message: "This User is not an admin in any community" });
          }
        }  else if(msg.sorted === false){
          const ownerComms = await Community.find({ admin: ownerId }).sort({posts : -1});
          if (ownerComms.length > 0) {
            return callback(null,ownerComms);
          } else {
            return callback(null,201)
            //   .status(201)
            //   .json({ message: "This User is not an admin in any community" });
          }
        }
        break;

      case 30:
        if(msg.sorted === true){
          const ownerComms = await Community.find({ admin: ownerId }).sort({subscribedBy: 1});
          if (ownerComms.length > 0) {
            return callback(null,ownerComms);
          } else {
            return callback(null,201)
            //   .status(201)
            //   .json({ message: "This User is not an admin in any community" });
          }
        }  else if(msg.sorted === false){
          const ownerComms = await Community.find({ admin: ownerId }).sort({subscribedBy: -1});
          if (ownerComms.length > 0) {
            return callback(null,ownerComms);
          } else {
            return callback(null,201)
            //   .status(201)
            //   .json({ message: "This User is not an admin in any community" });
          }
        }
        break;
    
      default:
        break;
    }
  }
   else {
    return callback(null,201)
    // res.status(201).json({ message: "This User does not exist" });
  }
}

exports.getAllOwnerCommunities = getAllOwnerCommunities;