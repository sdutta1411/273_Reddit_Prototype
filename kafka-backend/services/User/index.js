"use strict";
const {getAllUsers} = require("./getAllUsers")


let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "getAllUsers":
        getAllUsers(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;