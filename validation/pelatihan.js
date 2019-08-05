const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validatePelatihaninput(data) {
  let errors = {}

  data.namaPelatihan = !isEmpty(data.namaPelatihan) ? data.namaPelatihan : ""
  data.tahunPelatihan = !isEmpty(data.tahunPelatihan) ? data.tahunPelatihan : ""
  data.penyelenggara = !isEmpty(data.penyelenggara) ? data.penyelenggara : ""
  data.noSertifikat = !isEmpty(data.noSertifikat) ? data.noSertifikat : ""

  // noSertifikat
  if (!validator.isInt(data.noSertifikat)) {
    errors.noSertifikat = "Nomor sertifikat harus berupa angka"
  }

  if (validator.isEmpty(data.noSertifikat)) {
    errors.noSertifikat = "kolom Nomor sertifikat harus diisi!"
  }

  // namaPelatihan
  if (validator.isEmpty(data.namaPelatihan)) {
    errors.namaPelatihan = "Kolom nama pelatihan harus diisi!"
  }

  // penyelenggara
  if (validator.isEmpty(data.penyelenggara)) {
    errors.penyelenggara = "Kolom penyelenggara harus diisi!"
  }

  // tahunPelatihan
  if (validator.isEmpty(data.tahunPelatihan)) {
    errors.tahunPelatihan = "Kolom tahun pelatihan harus diisi!"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
