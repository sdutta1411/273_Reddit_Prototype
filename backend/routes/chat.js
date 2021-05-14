const router = require('express').Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../config/passport");

router.get("/initiatechat", (req, res) => {
    console.log("inside postmethod for message backend");
    console.log("req.body", req.body);
    let msg = req.body;
    msg.route = "initiate_chat";

    kafka.make_request("chat", msg, (err, result) => {
      console.log("chat details:", result);
      if (result === 500) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("SERVER_ERROR");
      }  else {
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
    });
  });

  router.post("/postchat", (req, res) => {
    console.log("inside postmethod for message backend");
    console.log("req.body", req.body);
    let msg = req.body;
    msg.route = "post_chat";

    kafka.make_request("chat", msg, (err, result) => {
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
  });


  module.exports = router;



