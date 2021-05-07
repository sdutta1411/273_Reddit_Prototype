const Messages = require("../models/message-model");

//Initiate Chat
const getChats = (req, res) => {
  const { users } = req.body;
  console.log(req.body);

  Messages.find(
    {
      "users.user": { $all: users },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        if (result.length == 0) {
          res.json({
            status: true,
            message: "No Chats to Retrive",
          });
        } else {
          res.json({
            status: true,
            data: result,
            message: "Chats Retrived",
          });
        }
      }
    }
  );
};

//Post Chats
const postChats = (req, res) => {
  const { users, chats, chatId } = req.body;
  console.log(req.body.users);
  console.log(req.body.chats);

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
        res.json({
          status: true,
          data: chatSaved,
          message: "Chat Posted Sucessfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: false,
          message: `Chat Not Saved ${err}`,
        });
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
          res.json({
            status: true,
            message: "Chats Updated Sucessfully",
          });
        }
      }
    );
  }
};

exports.getChats = getChats;
exports.postChats = postChats;
