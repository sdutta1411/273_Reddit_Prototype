const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/passport");


const commentController = require("../controllers/comment_controller");

// create a comment
router.post("/createcomment", checkAuth, commentController.createcomment);

// get comments
router.post("/getComments", checkAuth, commentController.getComments);
module.exports = router;