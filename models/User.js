const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
  nip: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// Create Schema
// User model : NIK, name, email, password, avatar, date
// const UserSchema = new Schema({

// })

module.exports = User = mongoose.model("users", UserSchema)
