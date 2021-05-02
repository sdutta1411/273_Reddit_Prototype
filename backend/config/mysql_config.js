const mysql = require("mysql");

//without connection pooling

// const mysqlConnection = mysql.createConnection({
//   host: "reddit.cpjl1egjicvp.us-east-1.rds.amazonaws.com",
//   user: "root",
//   password: "Reddit!273",
//   database: "Reddit",
// });

// mysqlConnection.connect((err) => {
//   if (!err) {
//     console.log("Connected to MySQL");
//   } else {
//     console.log("Connection Failed");
//   }
// });

// module.exports = mysqlConnection;

//----------------------------------------------------------------------------

//With connection pooling

const mysqlPool = mysql.createPool({
  host: "reddit.cpjl1egjicvp.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "Reddit!273",
  database: "Reddit",
});

mysqlPool.getConnection((err, connection) => {
  if (!err) {
    console.log("Connected to MySQL as id " + connection.threadId);
  } else {
    console.log("Connection Failed");
  }
});

module.exports = mysqlPool;
