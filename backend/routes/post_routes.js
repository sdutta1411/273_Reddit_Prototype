const express = require("express");
const router = express.Router();

const userController = require("../controllers/post_controller");

// create a post
router.post("/posts/new", postController.createpost);

module.exports = router;