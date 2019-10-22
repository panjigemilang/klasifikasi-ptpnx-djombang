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
      c1: {
        type: Number,
        default: 0
      },
      c2: {
        type: Number,
        default: 0
      },
      c3: {
        type: Number,
        default: 0
      },
      c4: {
        type: Number,
        default: 0
      },
      c5: {
        type: Number,
        default: 0
      },
      c6: {
        type: Number,
        default: 0
      },
      c7: {
        type: Number,
        default: 0
      },
      c8: {
        type: Number,
        default: 0
      },
      c9: {
        type: Number,
        default: 0
      },
      nilai: {
        type: Number,
        default: 0
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
