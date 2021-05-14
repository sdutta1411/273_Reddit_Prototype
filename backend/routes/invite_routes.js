const express = require("express");
const router = express.Router();
const inviteController = require('../controllers/invite_controller')
const { checkAuth } = require("../config/passport");


// create a send invite as owner
router.post("/invite_user",  inviteController.sendInvite);
router.post("/getSentInvites",  inviteController.getOwnerInvites);
router.post("/getMyInvites",  inviteController.getMyInvites);
router.post("/getMyRequests",  inviteController.getMyRequests);
router.post("/statusChange", inviteController.statusChange)

module.exports = router;