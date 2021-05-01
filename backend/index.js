const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const cors = require("cors");

var mongoConfig = require("./config/mongo_config");

var mysqlConfig = require("./config/mysql_config");

//Connecting to Mongo Server
mongoConfig();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

// User Routes

const user = require("./routes/user_routes");

app.use("/api/user", user);
