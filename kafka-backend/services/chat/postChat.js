const Messages = require("../../Models/MessageSchema")

const postChats = (msg, callback) => {
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
          redisClient.setex(users, 36000, JSON.stringify(chats));
          callback(null,chatSaved)
        })
        .catch((err) => {
          console.log(err);
          callback(null,500)
        });
    } else {
      console.log("Update Chat");
  
      Messages.updateOne(
        { _id: chatId },
        { $push: { chats: chats } },
  
        function (err, docs) {
          if (err) {
            callback(null,501);
          } else {
            console.log(docs);
            redisClient.setex(users, 36000, JSON.stringify(chats));
            callback(null,201)
          
          }
        }
      );
    }
  };

  exports.postChats = postChats;