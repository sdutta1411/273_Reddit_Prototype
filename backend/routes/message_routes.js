const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/passport");
const messageController = require("../controllers/message_controller");
const dummyController = require("../controllers/dummy_controller")
// Initiate Chat
router.get("/initiatechat", messageController.getChats);

// Post Chat
router.post("/postchat", messageController.postChats);

// Presentation Route. Delete later along with dummy_controller.js
router.post("/insert10000", dummyController.insertChats)
router.post("/fetchAll", dummyController.fetchChats)
router.post("/fetchCached", dummyController.fetchChatsCached)

module.exports = router;
