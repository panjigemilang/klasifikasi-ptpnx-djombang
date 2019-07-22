const mongoose = require("mongoose")
const Schema = mongoose.Schema

const KaryawanSchema = new Schema({
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
  jabatan: {
    type: String,
    required: true
  },
  statusPernikahan: {
    type: String,
    required: true
  },
  jenisKelamin: {
    type: String,
    required: true
  },
  noTelepon: {
    type: String
  },
  alamat: {
    type: String
  },
  tempatLahir: {
    type: String
  },
  tanggalLahir: {
    type: Date
  },
  fotoProfil: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Karyawan = mongoose.model("karyawan", KaryawanSchema)
