const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validateEmployeeinput(data) {
  let errors = {}

  data.nip = !isEmpty(data.nip) ? data.nip : ""
  data.name = !isEmpty(data.name) ? data.name : ""
  data.jabatan = !isEmpty(data.jabatan) ? data.jabatan : ""
  data.departemen = !isEmpty(data.departemen) ? data.departemen : ""
  data.statusPernikahan = !isEmpty(data.statusPernikahan)
    ? data.statusPernikahan
    : ""
  data.jenisKelamin = !isEmpty(data.jenisKelamin) ? data.jenisKelamin : ""
  data.noTelepon = !isEmpty(data.noTelepon) ? data.noTelepon : ""
  data.alamat = !isEmpty(data.alamat) ? data.alamat : ""
  data.tempatLahir = !isEmpty(data.tempatLahir) ? data.tempatLahir : ""
  data.tanggalLahir = !isEmpty(data.tanggalLahir) ? data.tanggalLahir : ""

  // NIP
  if (!validator.isInt(data.nip)) {
    errors.nip = "NIP must be a number"
  }

  if (validator.isEmpty(data.nip)) {
    errors.nip = "NIP field is required"
  }

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

  // Departemen
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

  // Jabatan
  if (validator.isEmpty(data.jabatan)) {
    errors.jabatan = "jabatan field is required"
  }

  // statusPernikahan
  if (validator.isEmpty(data.statusPernikahan)) {
    errors.statusPernikahan = "Status pernikahan field is required"
  } else {
    data.statusPernikahan.toLowerCase() !== "kawin" &&
    data.statusPernikahan.toLowerCase() !== "belum kawin"
      ? (errors.statusPernikahan = "Status pernikahan needs to be spesific")
      : null
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
      errors.noTelepon = "noTelepon must be between 12 or 13 digits"
  }

  // Jenis Kelamin
  data.jenisKelamin.toLowerCase() !== "pria" &&
  data.jenisKelamin.toLowerCase() !== "wanita"
    ? (errors.jenisKelamin = "Sex needs to be specific")
    : null

  // if (
  //   data.jenisKelamin.toLowerCase() != "pria" &&
  //   data.jenisKelamin.toLowerCase() != "wanita"
  // ) {
  //   errors.jenisKelamin = "Sex needs to be specific"
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
