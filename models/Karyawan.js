const mongoose = require("mongoose")
const Schema = mongoose.Schema({
  nip: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  departemen: {
    type: String,
    required: true
  },
  jenisKelamin: {
    type: String,
    required: true
  },
  nilai: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model("karyawan", Schema)
