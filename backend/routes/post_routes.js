const express = require("express");
const router = express.Router();
const passport = require('passport');
const postController = require("../controllers/post_controller");

// create a post
router.post("/posts/createnewpost", passport.authenticate('jwt', { session: false }), postController.createnewpost);
module.exports = router;