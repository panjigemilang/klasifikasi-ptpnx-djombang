const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validateRegisterinput(data) {
  let errors = {}
  data.nip = !isEmpty(data.nip) ? data.nip : ""
  data.name = !isEmpty(data.name) ? data.name : ""
  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : ""

  if (validator.isEmpty(data.nip)) {
    errors.nip = "NIP field is required"
  }

  if (
    !validator.isLength(data.name, {
      min: 2,
      max: 30
    })
  ) {
    errors.name = "Name must be between 2 or 30 characters"
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required"
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required"
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid"
  }

  if (
    !validator.isLength(data.email, {
      min: 2,
      max: 30
    })
  ) {
    errors.email = "Email must be between 2 or 30 characters"
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required"
  }

  if (
    !validator.isLength(data.password, {
      min: 2,
      max: 30
    })
  ) {
    errors.password = "Email must be between 2 or 30 characters"
  }

  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Confirm password field is required"
  }

  if (!validator.equals(data.password, data.passwordConfirm)) {
    errors.password = "Password is not match"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
