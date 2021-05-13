const bcrypt = require("bcryptjs");
const connection = require("../config/mysql_config");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/util");
const { auth } = require("../config/passport");
const UserProfile = require("../models/UserProfile");
auth();

const validateRegisterInput = require("../validation/registration");

//User Registration
const signup = (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validations

  if (!isValid) {
    return res.status(400).json(errors);
  }

  console.log("we get here eventually");

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  // const name = req.body.name;
  // const email = req.body.email;
  // const password = hash;

  const sqlQuery = `INSERT INTO user (name,email,password) VALUES (?,?,?)`;
  const values = [req.body.name, req.body.email, hash];

  console.log(values);

  connection.query(sqlQuery, values, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(400).json({
        status: false,
        message: "User already registered",
      });
    } else {
      const newUser = new UserProfile({
        username: req.body.name,
        email: req.body.email,
      });

      newUser.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
        }
      });

      res.status(200).json({
        status: true,
        data: newUser,
        message: "User Registered Sucessfully",
      });
    }
  });
};

//User Login
const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email);
  console.log(password);

  connection.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    function (err, results, fields) {
      console.log("Results");
      console.log(results);
      if (results.length > 0) {
        console.log(results);

        const comparison = bcrypt
          .compare(req.body.password, results[0].password)
          .then((match) => {
            console.log(match);
            if (match) {
              const payload = {
                id: results[0].user_id,
                email: results[0].email,
              };
              const token = jwt.sign(payload, secret, {
                expiresIn: 1008000,
              });
              res.status(200).send({
                username: results[0].name,
                email: results[0].email,
                token: "Bearer " + token,
              });
            } else {
              res.json({
                status: false,
                message: "Login Denied",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.json({
          status: false,
          message: "User not found",
        });
      }
    }
  );
};

// @route   POST api/users/signup
// @desc    Tests signup route
// @access  Public
const signupuser = (req, res) => {
  console.log("In Sign Up Mongo user API");
  // router.post('/signup', (req, res) => {
  UserProfile.findOne({ email: req.body.email }).then((user) => {
    // validation
    if (user) {
      //errors.email = 'Email already exists';
      return res.status(400).json("Email already exists");
    } else {
      console.log("Creating a new user");

      const newUser = new UserProfile({
        username: req.body.username,
        email: req.body.email,
      });
      var token = jwt.sign({ id: newUser.id }, secret, {
        expiresIn: 86400, // 24 hours
      });
      newUser
        .save((err) => {
          if (err) {
            res.status(500).send({ message: err });
          }

          res.json({
            userId: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token: "Bearer " + token,
          });
        })
        .catch(function (err) {
          res.status(400).json(err);
        });
    }
  });
};

const test = (req, res) => {
  res.send("hello hello");
};

const getUserDetails = async (req, res) => {
  console.log("In get user details api");
  const user = await UserProfile.findOne({ email: req.body.email });
  console.log("User:: " + user);
  res.status(200).json(user);
};

const getAllUsers = async (req, res) => {
  const user = await UserProfile.find({ "email": { $ne: req.body.email } });
  res.status(200).json(user);
};

module.exports = {
  test,
  signup,
  signupuser,
  login,
  getUserDetails,
  getAllUsers
};