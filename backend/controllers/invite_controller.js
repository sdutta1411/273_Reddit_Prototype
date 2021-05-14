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
};

const getOwnerInvites = async (req, res) => {
  // an array of objects containing 1. name of user, 2. status of invite, 3. timestamp
  let arrToSend = []
  const usercomms = await UserProfile.find();
  const owner = await UserProfile.find({email: req.body.email});
  for (let i = 0; i<usercomms.length; i++){
   for(let j =0; j< usercomms[i].communityStatus.length; j++){
    if(usercomms[i].communityStatus[j].invitedBy.toString() === owner[0]._id.toString()){
      let communityInformation = await Community.findById(usercomms[i].communityStatus[j].communityID)
      let item = {
        name:usercomms[i].username,
        inviteStatus: usercomms[i].communityStatus[j].status,
        timeStamp: usercomms[i].communityStatus[j].ts,
        communityName: communityInformation.communityName
      }
      arrToSend.push(item)
    }
   }
  }
  if(arrToSend.length>0){
    arrToSend.sort((a, b) => (a.timeStamp < b.timeStamp) ? 1 : -1)
    return res.status(200).json({inviteInfo:arrToSend})
  }else{
    return res.status(201).json({message:'No Invites Sent'})
  }
};

const getMyInvites = async (req,res) =>{
    let user = await UserProfile.findOne({email:req.body.email});
    let arrToSend = [];
    console.log()
    for(let i = 0; i< user.communityStatus.length; i++){
        console.log(user.communityStatus[i])
        if(user.communityStatus[i].status === 'Invited' || user.communityStatus[i].status === 'invite'){
            let comm = await Community.findById(user.communityStatus[i].communityID)
            let owner = await UserProfile.findById(user.communityStatus[i].invitedBy)
            console.log(comm.communityName)
            let item = {
                communityName: comm.communityName,
                communityID: user.communityStatus[i].communityID,
                username: owner.username
            }
            arrToSend.push(item);
        }
    }
    if(arrToSend.length>0){
        return res.status(200).json({myInvites:arrToSend})
    }else{
        return res.status(201).json({message:'No Invites Pending'})
    }
}

// Request to Join Community is in Community Controller 

const getMyRequests = async (req,res) =>{
    let currentCommunity = await Community.findOne({communityName:req.body.communityName});
    let users = await UserProfile.find();
    let arrToSend = [];
    console.log()
    for (let j = 0; j< users.length; j++ ){
        for (let i = 0; i<users[j].communityStatus.length; i++){
            if(users[j].communityStatus[i].status === 'Requested' && users[j].communityStatus[i].communityID==currentCommunity._id){
                let item = {
                    communityID: currentCommunity._id,
                    communityName: currentCommunity.communityName,
                    username: users[j].username,
                    userID: users[j]._id,
                    email: users[j].email
                }
                arrToSend.push(item)
            }
        }
    }
    if(arrToSend.length>0){
        console.log(arrToSend)
        return res.status(200).json({myRequests:arrToSend})
    }else{
        return res.status(201).json({message:'No requests pending'})
    }
}

const statusChange = (req, res) => {
  const {userID, communityID, status} = req.body;
  UserProfile.findOneAndUpdate(
    {email:userID, 'communityStatus.communityID':communityID},
    {'communityStatus.$.status':status},
    {new: true},
    (err,result)=>{
      if(err){
        console.log(err)
      }else{
        console.log('Updated', result)
        return res.status(200).json({message: status})
      }
  })
}

module.exports = {
  sendInvite,
  getOwnerInvites,
  getMyInvites,
  getMyRequests,
  statusChange
};
