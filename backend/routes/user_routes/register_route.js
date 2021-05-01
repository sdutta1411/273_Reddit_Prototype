const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user_controller");

// sign-up user
router.post("/register", userController.signup);

module.exports = router;
