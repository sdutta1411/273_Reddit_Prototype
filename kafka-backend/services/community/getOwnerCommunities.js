const Community = require("../../Models/Community")
const Post = require("../../Models/Post");
const UserProfile = require("../../Models/UserProfile");

const getOwnerCommunities = async(msg, callback) => {
    console.log("---------------",msg);
    console.log("heheh")
    console.log("Get Owner communities API" + JSON.stringify(msg.email));
    const usercomms = await UserProfile.find({ email: msg.email });
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

exports.getOwnerCommunities = getOwnerCommunities;