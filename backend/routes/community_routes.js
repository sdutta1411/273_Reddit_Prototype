const express = require("express");
const router = express.Router();

const communityController = require("../controllers/community_controller");

// create a community
router.post("/posts/new", communityController.createcommunity);

module.exports = router;