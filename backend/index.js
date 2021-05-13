const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

var mysqlConfig = require("./config/mysql_config");
const mongoConfig = require("./config/util").mongoURI;
const chat = require("./routes/chat");
const user = require("./routes/user_routes");
const post = require("./routes/post_routes");
const bodyParser = require("body-parser");
var InitiateMongoServer = require("./config/mongo_config");

//Connecting to Mongo Server
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
InitiateMongoServer();

const app = express();
app.use(express.json());
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

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};
const mongoConnection = async () => {
  await mongoose.connect(mongoConfig, options, (err, res) => {
    if (err) {
      console.log("error:", err);
    } else {
      console.log("MongoDB connected");
    }
  });
};
mongoConnection();

//app.use(cors());
app.listen(3001, (req, res) => {
  console.log("server running on port 3001....");
});

const community = require("./routes/community_routes");

//const comment = require("./routes/comment_routes");
const message = require("./routes/message_routes");

// User Routes
app.use("/api/user", user);
app.use("/api/chat", chat);
//Community Routes
app.use("/api/community", community);
//Post Routes
app.use("/api/posts", post);
//Comment Routescls
//app.use("/api/comment", comment);
// app.listen(3001, (req, res) => {
//   console.log("server running on port 3001....");
// });
//Message Routes
app.use("/api/message", message);
