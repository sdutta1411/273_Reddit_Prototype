const Community = require("../../Models/Community")


const editCommunity = (msg, callback) => {
    console.log("---------------",msg);
    console.log("Delete Community",msg)
    Community.updateOne({
        _id: msg.CommunityID,
      },{$set: {description: msg.description}, $push:{rules: msg.rules.Ruledescription}},(err,com)=>{
        if(err){
          console.log(err)
        }else{
             callback(null,com)
        }
      });
}

exports.editCommunity = editCommunity;