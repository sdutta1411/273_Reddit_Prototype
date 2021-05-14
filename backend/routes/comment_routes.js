const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/passport");


const commentController = require("../controllers/comment_controller");

// create a comment
//router.post("/createcomment", checkAuth, commentController.createcomment);

// get comments
router.post("/getComments", checkAuth, commentController.getComments);

//create new comment
//router.post("/createnewcomment", checkAuth, commentController.createnewcomment);

//add reply to comment
//router.post("/posts/:postId/comments/:commentId/replies", checkAuth, commentController.addReplyToComment);

//create new comment
router.post("/createnewcomment", checkAuth, commentController.createnewcomment);
//add reply to comment
router.post("/addReplyToComment", checkAuth, commentController.addReplyToComment);
module.exports = router;
