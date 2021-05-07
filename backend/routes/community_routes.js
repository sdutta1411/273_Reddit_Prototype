const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community_controller");

// create a community
router.post("/community/new", communityController.createcommunity);

//get all community details - community home page
router.get("/community/getCommunityDetails", communityController.getAllCommunityDetails);

module.exports = router;