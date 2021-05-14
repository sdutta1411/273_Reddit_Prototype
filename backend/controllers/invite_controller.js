const connection = require("../config/mysql_config");
const Community = require("../models/Community");
const UserProfile = require("../models/UserProfile");

const sendInvite = async (req, res) => {
  console.log("In send invite API");
  console.log(req.body);
  for (let i = 0; i < req.body.users.length; i++) {
    await UserProfile.findOneAndUpdate(
      { _id: req.body.users[i]._id },
      {
        $addToSet: {
          communityStatus: {
            communityID: req.body.community.CommunityID,
            status: req.body.status,
            ts: Date.now(),
          },
        },
      },
      { useFindAndModify: false },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(201).json({ message: "Failed to send request" });
        } else {
          return res.status(200).json({ message: "OK" });
        }
      }
    );
  }
};

const getInvites = async (req, res) => {
  const usercomms = await UserProfile.find({ email: req.body.email });
  if (usercomms[0]) {
    const ownerId = usercomms[0]._id;
    const ownerComms = await Community.find({ admin: ownerId });
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

module.exports = {
  sendInvite,
};
