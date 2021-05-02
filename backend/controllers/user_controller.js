const bcrypt = require("bcryptjs");
const connection = require("../config/mysql_config");

//User Registration
const signup = (req, res) => {
  console.log(req.body);
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
      res.json({
        status: false,
        message: "There are some error with query",
      });
    } else {
      res.json({
        status: true,
        data: results,
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
            console.log(match)
            if (match) {
              res.json({
                status: true,
                message: "Login Successful",
                userDetails: results[0],
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
          message: "User Doesnot Exits",
        });
      }
    }
  );
};

exports.signup = signup;
exports.login = login;
