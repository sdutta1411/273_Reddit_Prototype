"use strict";
const { getOwnerCommunities } = require("./getOwnerCommunities");
const { createnewcommunity } = require("./CreatenewCommunity");
const {getAllOwnerCommunities} = require("./getAllOwnerCommunities");
const {getAllCommunitiesdashboard} = require("./getAllCommunities_dashboard");
const {getAnalyticsData} =require("./getAnalyticsData");
const {deleteCommunity} = require("./deleteCommunity");
const {editCommunity} = require("./editCommunity");


let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "getOwnerCommunities":
        getOwnerCommunities(msg, callback);
      break;
    case "createnewcommunity":
        createnewcommunity(msg, callback);
      break;
    case "getAllOwnerCommunities":
        getAllOwnerCommunities(msg, callback);
      break;
    case "getAllCommunitiesdashboard":
        getAllCommunitiesdashboard(msg, callback);
      break;  
    case "getAnalyticsData":
        getAnalyticsData(msg, callback);
      break; 
    case "deleteCommunity":
        deleteCommunity(msg, callback);
      break; 
    case "editCommunity":
        editCommunity(msg, callback);
      break; 
  }
};

exports.handle_request = handle_request;