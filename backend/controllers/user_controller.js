const bcrypt = require("bcryptjs");
const db = require("../config/mysql_config");

const signup = (req, res) => {
  console.log(req.body);
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  const name = req.body.name;
  const email = req.body.email;
  const password = hash;

  const sqlQuery = "INSERT INTO user (name,email,password) VALUES (?,?,?)";
  const values = [name, email, password];

  console.log(values);

  db.query(sqlQuery, values, function (err, results, fields) {
    console.log(err);
    res.send(results);
  });
};

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email);
  console.log(password);

  const sqlQuery = "SELECT * FROM user WHERE email = ?";
  const values = email;

  console.log(values);

  db.query(sqlQuery, values, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);

    if (results.length > 0) {
      hashedPassword = results[0].password;

      bcrypt
        .compare(password, hashedPassword)
        .then((match) => {
          if (match) {
            console.log("True block");
            console.log(hashedPassword);
            res.json({
              loggedIn: true,
              email: email,
              name: results[0].name,
              // phone: results[0].phone,
              // currency: results[0].currency,
              // timezone: results[0].timezone,
              // language: results[0].language,
              // id: results[0].id,
              // imagepath: results[0].imagepath,
            });
          } else {
            res.json({
              loggedIn: false,
              message: "Incorrect Username or Password",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("False block");
      res.json({
        loggedIn: false,
        message: "User does not exist",
      });
    }
  });
};

exports.signup = signup;
exports.login = login;
