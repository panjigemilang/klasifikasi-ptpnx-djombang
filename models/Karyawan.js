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
  akademik: {
    type: String
  },
  jabatan: {
    type: String,
    required: true
  },
  tempatLahir: {
    type: String
  },
  tanggalLahir: {
    type: Date
  },
  jenisKelamin: {
    type: String,
    required: true
  },
  agama: {
    type: String,
    required: true
  },
  statusPernikahan: {
    type: String,
    required: true
  },
  alamat: {
    type: String
  },
  noTelepon: {
    type: String
  },
  email: {
    type: String,
    required: true
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
