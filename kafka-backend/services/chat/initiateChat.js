const Messages = require("../../Models/MessageSchema")
// const redisClient = require("../../utils/redisConfig");
var redisClient = require("redis").createClient;
var  rstream= require('redis-rstream');
var redis = redisClient(6379, "localhost", {detect_buffers : true});



const initiateChat = (msg, callback) => {
  console.log("---------------",msg);
   const { users } = msg;
      
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
        "users.user": { $all: users },
      },
      function (err, result) {
        if (err) {
         callback(null,500);
        } else {
          redis.set(users, JSON.stringify(result));
          callback(null,result)
         
        }
      }
    );}
    })
  }
  catch (error) {
    console.log(error);
    return callback(null,501);
}
  };

  exports.initiateChat = initiateChat;