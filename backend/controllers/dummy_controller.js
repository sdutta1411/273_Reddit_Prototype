const Messages = require("../models/message-model");
var redisClient = require("redis").createClient;
var redis = redisClient(6379, "localhost", {detect_buffers: true});

// sudo service redis-server stop
const insertChats = (req, res) => {
  let chatArray = [];
  for (let i = 0; i < 10000; i++) {
    let newObj = {
      users: [{ user: `user1@gmail.com` }, { user: `user${i}@gmail.com` }],
      chats: [{ chat: `Hi user ${i}`, user: `user1` }],
    };
    chatArray.push(newObj);
  }
  Messages.collection.insertMany(chatArray, (err, result) => {
    if (err) {
      console.log(err);
      res.json({
        status: false,
        message: `Chat Not Saved ${err}`,
      });
    } else {
      console.log("insert successful.");
      res.json({
        status: true,
        data: result,
        message: "Chat Posted Sucessfully",
      });
    }
  });
};

const fetchChats = (req, res) => {
  Messages.find(
    {
      "users.user":  "user1@gmail.com",
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        // console.log("hi");
        if (result.length == 0) {
          res.json({
            status: true,
            message: "No Chats to Retrive",
          });
        } else {
          res.json({
            status: true,
            // data: result,
            message: "Chats Retrived",
          });
        }
      }
    }
  );
};

const fetchChatsCached = (req, res) => {
  redis.get("messages", (err, reply) => {
    if (err) {
      console.log(err);
    } else if (reply) {
      res.json({
        status: true,
        data: JSON.parse(reply),
        message: "Chats Retrived From Cache",
      });
    } else {
      Messages.find(
        {
          "users.user": { $all: "user1@gmail.com" },
        },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            // console.log(result);
            // console.log("hi");
            if (result.length == 0) {
              res.json({
                status: true,
                message: "No Chats to Retrive",
              });
            } else {
              redis.set("messages", JSON.stringify(result), function () {
                // callback(doc);
                res.json({
                  status: true,
                  data: result,
                  message: "Chats Retrived",
                });
              });
            }
          }
        }
      );
    }
  });
};
exports.fetchChats = fetchChats;
exports.fetchChatsCached = fetchChatsCached;
exports.insertChats = insertChats;
