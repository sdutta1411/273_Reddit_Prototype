const Community = require("../../Models/Community")
const UserProfile = require("../../Models/UserProfile");

const createnewcommunity = async(msg, callback) => {
    console.log("---------------",msg);
    const { communityName, description, admin } = msg;

    const comm = await Community.findOne({
      communityName: msg.communityName,
    });
    const admin_user = await UserProfile.findOne({ email: admin });
  
    if (comm) {
      return callback(null,400)
    //   message:
    //   "Community with same name already exists.Please choose a different name",
    } else {
      console.log("creating a new community");
      const newCommunity = new Community({
        communityName: msg.communityName,
        description: msg.description,
        admin: admin_user._id,
        subscribedBy: [admin_user._id],
        subscriberCount: 1,
      });
      const savedCommunity = await newCommunity.save();
      admin_user.subscribedCommunities = admin_user.subscribedCommunities.concat(
        savedCommunity._id
      );
      await admin_user.save();
      return callback(null,savedCommunity);
      //res.status(200).json(community);
    }
}

exports.createnewcommunity = createnewcommunity;