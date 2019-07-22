const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validateEducationsinput(data) {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ""
  data.status = !isEmpty(data.status) ? data.status : ""
  data.noTelepon = !isEmpty(data.noTelepon) ? data.noTelepon : ""

  // Name
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

  // Status
  if (validator.isEmpty(data.status)) {
    errors.status = "Status field is required"
  }

  // noTelepon
  if (!validator.isEmpty(data.noTelepon)) {
    if (!validator.isInt(data.noTelepon))
      errors.noTelepon = "nomor telepon must be a number"
    if (
      !validator.isLength(data.noTelepon, {
        min: 11,
        max: 13
      })
    )
      errors.noTelepon = "noTelepon must be between 11 or 13 digits"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
