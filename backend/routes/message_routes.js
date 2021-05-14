const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/passport");
const messageController = require("../controllers/message_controller");

// Initiate Chat
router.post("/initiatechat", messageController.getChats);

// Post Chat
router.post("/postchat", messageController.postChats);

module.exports = router;
