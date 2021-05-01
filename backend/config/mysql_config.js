const mysql = require("mysql");

const db = mysql.createConnection({
  host: "reddit.cpjl1egjicvp.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "Reddit!273",
  database: "Reddit",
  //insecureAuth: true,
});

db.connect();

module.exports = db;
