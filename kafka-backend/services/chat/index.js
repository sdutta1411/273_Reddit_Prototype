"use strict";
const { initiateChat } = require("./initiateChat");
const { postChats } = require("./postChat");


let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "initiate_chat":
        initiateChat(msg, callback);
      break;
    case "post_chat":
        postChats(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;