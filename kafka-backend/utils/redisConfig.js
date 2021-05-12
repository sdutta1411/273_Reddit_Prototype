const redis = require("redis");

const redisClient = redis.createClient(6379, 'localhost');

redisClient.on("connect", (err) =>  {
    if(err){
        console.log("Error while connecting to Redis server");
    }
    else {
        console.log("Redis Server Connected");
    }
});

module.exports = redisClient;