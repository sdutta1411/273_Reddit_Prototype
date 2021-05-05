const express = require("express");
const router = express.Router();

const postController = require("../controllers/post_controller");

// create a post
router.post("/posts/newtextpost", postController.createnewpost);

module.exports = router;