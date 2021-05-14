const kafka = require("../kafka/client");

//Initiate Chat
const getChats = (req, res) => {
  console.log("In create community API");
 
  console.log("inside postmethod for message backend");
  console.log("req.body", req.body);
  let msg = req.body;
  msg.route = "getChats";
  kafka.make_request("message", msg, (err, result) => {
    console.log("getChats details:", result);
      if (result.length == 0) {
        res.json({
          status: true,
          message: "No Chats to Retrive",
        });
    }  else {
      res.json({
        status: true,
        data: result,
        message: "Chats Retrived",
      });
    }
  });
};

//Post Chats
const postChats = (req, res) => {
  console.log("inside postmethod for message backend");
  console.log("req.body", req.body);
  let msg = req.body;
  msg.route = "postChats";
  kafka.make_request("message", msg, (err, result) => {
    console.log("postChats details:", result);  
    console.log("chat details:", result);
    if (result === 500) {
      res.json({
        status: false,
        message: `Chat Not Saved`,
      });
    }  else if(result === 201){
      res.json({
        status: true,
        message: "Chats Updated Sucessfully",
      });
    }else if(result === 501){
      res.json({
        status: false,
        message: "Error",
      });
    }
    else {
      res.json({
        status: true,
        data: JSON.parse(result),
        message: "Chat Posted Sucessfully",
      });
    }
  });
};

exports.getChats = getChats;
exports.postChats = postChats;
