const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const passport = require('passport');
const cors = require("cors");

var mysqlConfig = require("./config/mysql_config");
const mongoConfig = require('./config/util').mongoURI;
//Connecting to Mongo Server
mongoose
    .connect(mongoConfig)
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err));

const app = express();

//passport middleware
app.use(passport.initialize());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors());
app.listen(3001, (req, res) => {
  console.log("server running on port 3001....");
});
const user = require("./routes/user_routes");
//const community = require("./routes/community_routes");
const post = require("./routes/post_routes");
//const comment = require("./routes/comment_routes");

// User Routes
app.use("/api/user", user);
//Community Routes
//app.use("/api/community", community);
//Post Routes
app.use("/api/posts", post);
//Comment Routes
//app.use("/api/comment", comment);
