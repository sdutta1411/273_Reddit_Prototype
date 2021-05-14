const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community_controller");
const { checkAuth } = require("../config/passport");

// create a community
router.post(
  "/createnewcommunity",
  checkAuth,
  communityController.createnewcommunity
);
router.post(
  "/getAllOwnerCommunities",
  
  communityController.getAllOwnerCommunities
);
//get all community details - community home page
router.post(
  "/getCommunityDetails",
  checkAuth,
  communityController.getCommunityDetails
);

//join a community - community home page
router.post("/joinCommunity", checkAuth, communityController.joinCommunity);

//join a community - community home page
router.post("/leaveCommunity", checkAuth, communityController.leaveCommunity);

//get user communities - community home page
router.post(
  "/getUserCommunities",
  checkAuth,
  communityController.getUserCommunities
);

//Check if user is a member of community - community home page
router.post(
  "/checkUserSubscribed",
  checkAuth,
  communityController.checkUserSubscribed
);

//search communities
router.get("/searchCommunity", checkAuth, communityController.searchCommunity);

//search communities
router.get("/sortCommunity", checkAuth, communityController.sortCommunity);

module.exports = router;
