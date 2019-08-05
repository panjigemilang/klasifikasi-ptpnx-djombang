const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validateEmployeeinput(data) {
  let errors = {}

  data.nip = !isEmpty(data.nip) ? data.nip : ""
  data.name = !isEmpty(data.name) ? data.name : ""
  data.jabatan = !isEmpty(data.jabatan) ? data.jabatan : ""
  data.agama = !isEmpty(data.agama) ? data.agama : ""
  data.statusPernikahan = !isEmpty(data.statusPernikahan)
    ? data.statusPernikahan
    : ""
  data.jenisKelamin = !isEmpty(data.jenisKelamin) ? data.jenisKelamin : ""
  data.noTelepon = !isEmpty(data.noTelepon) ? data.noTelepon : ""
  data.email = !isEmpty(data.email) ? data.email : ""

  // nip
  if (!validator.isInt(data.nip)) {
    errors.nip = "NIK harus berupa angka"
  }

  if (validator.isEmpty(data.nip)) {
    errors.nip = "kolom NIK harus diisi!"
  }

  // Name
  if (
    !validator.isLength(data.name, {
      min: 2,
      max: 50
    })
  ) {
    errors.name = "Kolom nama harus terdiri dari 2 sampai 30 huruf"
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Kolom nama harus diisi!"
  }

  // agama
  if (validator.isEmpty(data.agama)) {
    errors.agama = "Kolom agama harus diisi!"
  }

  if (
    !validator.isLength(data.agama, {
      min: 2,
      max: 30
    })
  ) {
    errors.agama = "Tidak valid."
  }

  // Jabatan
  if (validator.isEmpty(data.jabatan)) {
    errors.jabatan = "Kolom jabatan harus diisi!"
  }

  // statusPernikahan
  if (validator.isEmpty(data.statusPernikahan)) {
    errors.statusPernikahan = "Kolom status pernikahan harus diisi!"
  }

  // noTelepon
  if (!validator.isEmpty(data.noTelepon)) {
    if (!validator.isInt(data.noTelepon))
      errors.noTelepon = "Nomor telepon harus berupa angka"
    if (
      !validator.isLength(data.noTelepon, {
        min: 11,
        max: 13
      })
    )
      errors.noTelepon = "Nomor telepon harus 12 sampai 13 digit"
  }

  // Jenis Kelamin
  if (validator.isEmpty(data.jenisKelamin)) {
    errors.jenisKelamin = "Kolom jenis kelamin harus diisi!"
  }

  // Email
  if (validator.isEmpty(data.email)) {
    errors.email = "Kolom email harus diisi!"
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email tidak valid. Masukkan email yang benar!"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
