const Community = require("../../Models/Community")
const Post = require("../../Models/Post");


const deleteCommunity =(msg, callback) => {
    console.log("---------------",msg);
    console.log("Delete Community",msg)
  Community.deleteOne({
    _id: msg.CommunityID,
  },(err,com)=>{
    if(err){
      console.log(err)
    }else{
      Post.deleteMany({community: msg.CommunityID},(error,result)=>{
        if(error){
          console.log("Error in Post deletion",error)
        }else{
         callback(null,result)
        }
      })
    }
  });
}

exports.deleteCommunity = deleteCommunity;