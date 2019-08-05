const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "karyawan"
  },
  experiences: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      institution: {
        type: String,
        required: true
      },
      degree: {
        type: String
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  allowance: [
    {
      name: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      noTelepon: {
        type: String
      }
    }
  ],
  pelatihan: [
    {
      namaPelatihan: {
        type: String,
        required: true
      },
      tahunPelatihan: {
        type: Date,
        required: true
      },
      noSertifikat: {
        type: String,
        required: true
      },
      penyelenggara: {
        type: String,
        required: true
      }
    }
  ],
  achievement: [
    {
      jenisPenghargaan: {
        type: String,
        required: true
      },
      oleh: {
        type: String
      },
      tahunPenghargaan: {
        type: Date,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model("profile", ProfileSchema)
