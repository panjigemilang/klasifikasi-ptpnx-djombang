import isEmpty from "./is-empty"
// const isEmpty = require("./is-empty")
const validator = require("validator")

export default function validateEmployeeinput(data) {
  let errors = {}

  data.nip = !isEmpty(data.nip) ? data.nip : ""
  data.name = !isEmpty(data.name) ? data.name : ""
  data.nilai = !isEmpty(data.nilai) ? data.nilai : "-"
  data.departemen = !isEmpty(data.departemen) ? data.departemen : ""
  data.jenisKelamin = !isEmpty(data.jenisKelamin) ? data.jenisKelamin : ""

  if (!validator.isInt(data.nip)) {
    errors.nip = "NIP must be a number"
  }
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

  if (validator.isEmpty(data.departemen)) {
    errors.departemen = "Department field is required"
  }

  if (
    !validator.isLength(data.departemen, {
      min: 2,
      max: 30
    })
  ) {
    errors.departemen = "Department must be between 2 or 30 characters"
  }

  if (
    data.jenisKelamin.toLowerCase() != "pria" &&
    data.jenisKelamin.toLowerCase() != "wanita"
  ) {
    errors.jenisKelamin = "Sex needs to be specific"
  }

  if (validator.isEmpty(data.jenisKelamin)) {
    errors.jenisKelamin = "Sex field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
