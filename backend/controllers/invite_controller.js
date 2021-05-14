const connection = require("../config/mysql_config");
const Community = require("../models/Community");
const UserProfile = require("../models/UserProfile");

const sendInvite = async (req, res) => {
  const sendMongoInvite = async (i) => {
    await UserProfile.findOneAndUpdate(
      { _id: req.body.users[i]._id },
      {
        $addToSet: {
          communityStatus: {
            communityID: req.body.community.CommunityID,
            status: req.body.status,
            invitedBy: req.body.community.CommunityOwner,
          },
        },
      },
      { useFindAndModify: false },
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
  };
  console.log("In send invite API");
  //   console.log(req.body);
  await Community.findById(
    req.body.community.CommunityID,
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let existingUsers = [];
        for (let i = 0; i < req.body.users.length; i++) {
          //Check if the user is already part of the community they are being invited to
          if (result.subscribedBy.includes(req.body.users[i]._id)) {
            // Can't invite user[i] cuz they are already part of community
            // Store the users already part of the community
            existingUsers.push(req.body.users[i].username);
            continue;
          } else {
            // The user hasn't joined the community yet
            await UserProfile.findById(
              req.body.users[i]._id,
              async (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  // Check if the user is already invited
                  if (result.communityStatus.length != 0) {
                    for (let j = 0; j < result.communityStatus.length; j++) {
                      if (result.communityStatus[j].communityID == req.body.community.CommunityID &&
                        result.communityStatus[j].status == req.body.status
                      ) {
                        // Invite found, user added to array
                        existingUsers.push(req.body.users[i].username);
                        break;
                      } else {
                        // Send the user an invite
                        console.log("\nSENDING INVITE\n");
                        sendMongoInvite(i);
                      }
                    }
                  } else {
                    sendMongoInvite(i);
                  }
                }
              }
            );
          }
        }
        if (existingUsers.length > 0) {
          const allUsers = existingUsers.join(", ");
          return res.status(201).json({
            message: `The user/users:" ${allUsers} " is/are already invited or part of the community.`,
          });
        }
        return res.status(200).json({ message: "OK" });
      }
    }
  );
  //   for (let i = 0; i < req.body.users.length; i++) {
  //     await UserProfile.findOneAndUpdate(
  //       { _id: req.body.users[i]._id },
  //       {
  //         $addToSet: {
  //           communityStatus: {
  //             communityID: req.body.community.CommunityID,
  //             status: req.body.status,
  //             invitedBy: req.body.community.CommunityOwner,
  //             ts: Date.now(),
  //           },
  //         },
  //       },
  //       { useFindAndModify: false },
  //       (err, result) => {
  //         if (err) {
  //           console.log(err);
  //           return res.status(201).json({ message: "Failed to send request" });
  //         } else {
  //           return res.status(200).json({ message: "OK" });
  //         }
  //       }
  //     );
  //   }
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
