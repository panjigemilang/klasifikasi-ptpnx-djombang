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
  status: {
    type: String,
    required: true
  },
  penilaian: [
    {
      tahun: {
        type: Number,
        default: 2019
      },
      semester: {
        type: Number,
        default: 1
      },
      nilai: {
        type: String,
        default: "-"
      }
    }
  ],
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
