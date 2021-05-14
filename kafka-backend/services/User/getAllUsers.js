const UserProfile = require("../models/UserProfile");
var redisClient = require("redis").createClient;
var redis = redisClient(6379, "localhost", {detect_buffers : true});

const getAllUsers = async(msg, callback) => {
    console.log("---------------",msg);

try {
    redis.get(users, (err, users) => {
      if (users) {
        console.log("Reddis")
        let results = JSON.parse(users);
        console.log(results[0])
          return callback(null, results);
      } else {
        const user = await UserProfile.find({ email: { $ne: msg.email } });
        redis.set(users, JSON.stringify(result));
        callback(null,user)
      }
    })
  }
  catch (error) {
    console.log(error);
    return callback(null,501);
}
}

exports.getAllUsers = getAllUsers;