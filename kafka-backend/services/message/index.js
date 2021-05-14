"use strict";
const {getChats} = require("./getChats")
const {postChats} = require("./postChats")


let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "getChats":
        getChats(msg, callback);
      break;
    case "postChats":
        postChats(msg, callback);
      break;

  }
};

exports.handle_request = handle_request;