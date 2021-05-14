const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/passport");
const userController = require("../controllers/user_controller");

// sign-up User
router.post("/register", userController.signup);
// router.post("/registeruser", userController.signupuser);
// login User
router.post("/login", userController.login);
//test route
router.post("/test", checkAuth, userController.test);
//get user details from mongo
router.post("/getUserDetails", checkAuth, userController.getUserDetails);
// get all user details
router.post("/allUsers", userController.getAllUsers);

module.exports = router;
