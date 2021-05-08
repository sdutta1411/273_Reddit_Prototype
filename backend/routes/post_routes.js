const express = require("express");
const router = express.Router();
const passport = require('passport');
const { checkAuth } = require("../config/passport");
const postController = require("../controllers/post_controller");

// create a post
router.post("/createnewpost",  checkAuth ,postController.createnewpost);
//get posts
router.get("/getPosts",  checkAuth ,postController.getPosts);
module.exports = router;