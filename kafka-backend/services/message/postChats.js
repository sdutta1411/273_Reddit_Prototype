const Messages = require("../../Models/message-model")
var redisClient = require("redis").createClient;
var redis = redisClient(6379, "localhost", {detect_buffers : true});


const postChats = async(msg, callback) => {
    console.log("---------------",msg);
    const { users, chats, chatId } = msg;
  console.log(msg.users);
  console.log(msg.chats);

  if (chatId == null) {
    console.log("New Chat");
    const newChats = new Messages({
      users: users,
      chats: chats,
    });

    console.log(newChats);

    newChats
      .save()
      .then((chatSaved) => {
          callback(null,chatSaved)
        // res.json({
        //   status: true,
        //   data: chatSaved,
        //   message: "Chat Posted Sucessfully",
        // });
      })
      .catch((err) => {
        console.log(err);
        callback(null,500)
        // res.json({
        //   status: false,
        //   message: `Chat Not Saved ${err}`,
        // });
      });
  } else {
    console.log("Update Chat");

    Messages.updateOne(
      { _id: chatId },
      { $push: { chats: chats } },

      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
          callback(null,201)
        //   res.json({
        //     status: true,
        //     message: "Chats Updated Sucessfully",
        //   });
        }
      }
    );
  }
}

exports.postChats = postChats;