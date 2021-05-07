const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community_controller");

// create a community
router.post("/createnewcommunity", communityController.createnewcommunity);

//get all community details - community home page
router.get("/getCommunityDetails", communityController.getAllCommunityDetails);

module.exports = router;