"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./util");
const connection = require("./mysql_config");

// Setup work and export for the JWT passport strategy
function auth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const email = jwt_payload.email;
      connection.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        function (err, results, fields) {
          console.log("Results");
          console.log(results);
          if (results.length > 0) {
            console.log(results);
            console.log(jwt_payload);
            callback(null, results);
          }
          if (err) {
            console.log(err);
            callback(null, false);
          }
        }
      );
    })
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
