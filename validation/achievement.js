const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validateAchievementinput(data) {
  let errors = {}

  data.jenisPenghargaan = !isEmpty(data.jenisPenghargaan)
    ? data.jenisPenghargaan
    : ""
  data.tahunPenghargaan = !isEmpty(data.tahunPenghargaan)
    ? data.tahunPenghargaan
    : ""

  // jenisPenghargaan
  if (validator.isEmpty(data.jenisPenghargaan)) {
    errors.jenisPenghargaan = "Kolom jenis penghargaan harus diisi!"
  }

  // tahunPenghargaan
  if (validator.isEmpty(data.tahunPenghargaan)) {
    errors.tahunPenghargaan = "Kolom tahun penghargaan harus diisi!"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
