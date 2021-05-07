const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Name Field is requied";
  }

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be between 8 and 30 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
