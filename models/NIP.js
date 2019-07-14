const mongoose = require("mongoose")
const Schema = mongoose.Schema({
  nip: {
    type: String,
    required: true
  }
})

// Create Schema
// User model : NIK, name, email, password, avatar, date
// const UserSchema = new Schema({

// })

module.exports = Nip = mongoose.model("nip", Schema)
