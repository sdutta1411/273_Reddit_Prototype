const Messages = require("../../Models/message-model")


const getChats = async(msg, callback) => {
    console.log("---------------",msg);
const { users } = msg;
console.log(users);


try {
  redis.get(users, (err, chatResult) => {
    if (chatResult) {
      console.log("Reddis")
      let results = JSON.parse(chatResult);
      console.log(results[0])
        return callback(null, results.slice(0,2500));
    } else {
Messages.find(
  {
    "users.email": { $all: users },
  },
  function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      if (result.length == 0) {

        callback(null,202)
        // res.json({
        //   status: false,
        //   message: "No Chats to Retrive",
        // });
      } else {
        redis.set(users, JSON.stringify(result));
          callback(null,result)
        // res.json({
        //   status: true,
        //   data: result,
        //   message: "Chats Retrived",
        // });
        
      }
    }
    });}
  })
}
  catch(error) {
    console.log(error);
    return callback(null,501);
}
}

exports.getChats = getChats;