const express = require("express")
const router = express.Router()
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const passport = require("passport")

// Model
const User = require("../../models/User")
const Nip = require("../../models/NIP")

// Key
const keys = require("../../config/keys")

// Validation
const validationRegister = require("../../validation/register")
const validationLogin = require("../../validation/login")

// Regis new NIP admin
router.post("/regis", (req, res) => {
  const newUser = new Nip({
    nip: req.body.nip
  })

  newUser
    .save()
    .then(nip => res.json(nip))
    .catch(err => res.json(err))
})

// Register New User
router.post("/register", (req, res) => {
  const { errors, isValid } = validationRegister(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Check for user email if exists
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      Nip.findOne({
        nip: req.body.nip
      })
        .then(found => {
          // Check if it's NIP admin
          if (found) {
            User.findOne({
              nip: req.body.nip
            }).then(userNip => {
              // Check if NIP admin already exists
              if (userNip && user) {
                res.status(400).json({
                  nip: "NIP already exists",
                  email: "Email already exists"
                })
              }
              // Email already exists
              else if (user) {
                res.status(400).json({
                  email: "Email already exists"
                })
              }
              // NIP already exists
              else if (userNip) {
                res.status(400).json({
                  nip: "NIP already exists"
                })
              }
              // Register success
              else {
                // default avatar
                const avatar = gravatar.url(req.body.email, {
                  s: "400",
                  r: "pg",
                  d: "mm"
                })

                // make new user
                const newUser = new User({
                  nip: req.body.nip,
                  name: req.body.name,
                  email: req.body.email,
                  password: req.body.password,
                  avatar
                })

                // bcrypting password
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash
                    newUser
                      .save()
                      .then(user => res.json(user))
                      .catch(err => console.log(err))
                  })
                })
              }
            })
          } else {
            return res.status(404).json({
              nip: "NIP isn't admin. You cannot register"
            })
          }
        })
        .catch(err => {
          return res.json(err)
        })
    })
    .catch(err => {
      return res.json(err)
    })
})

// Login User
router.post("/login", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const { errors, isValid } = validationLogin(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  // find user by email
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      return res.status(400).json({
        email: "user not found"
      })
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // create payload
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          }

          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 3600
            },
            (err, token) => {
              res.json({
                success: true,
                // use Bearer protocol format
                token: "Bearer " + token
              })
            }
          )
        } else {
          return res.status(400).json({
            password: "password incorrect"
          })
        }
      })
    }
  })
})

// Passport route
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // console.log("ini res.user : ", req.user)
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
  }
)

module.exports = router
