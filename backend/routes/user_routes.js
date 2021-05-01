const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");

// sign-up User
router.post("/register", userController.signup);

// login User
router.post("/login", userController.login);

module.exports = router;
