const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/passport");
const userController = require("../controllers/user_controller");

// sign-up User
router.post("/register", userController.signup);

// login User
router.post("/login", userController.login);

//test route

router.post("/test", checkAuth, userController.test);

module.exports = router;
