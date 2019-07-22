const express = require("express")
const router = express.Router()
const passport = require("passport")

// Model
const Karyawan = require("../../models/Karyawan")
const Profile = require("../../models/Profile")
const Nip = require("../../models/NIP")
const multer = require("multer")
const path = require("path")

// validation
const validationEmployee = require("../../validation/employee")

// destination: "../../client/src/img/profilePicture",

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../../client/public/img/profilePicture"))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + path.extname(file.originalname))
  }
})

// Upload Images
router.post(
  "/upload/:nip",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    let fotoProfil
    // Init upload
    const upload = multer({
      storage: storage,
      limits: { fileSize: 2800000 },
      fileFilter: (req, file, cb) => {
        // Allowed file types
        const filetypes = /jpeg|jpg|png|gif/
        // Check Extname
        const extname = filetypes.test(
          path.extname(file.originalname).toLowerCase()
        )
        // Check mime
        const mimetype = filetypes.test(file.mimetype)
        if (extname && mimetype) {
          cb(null, true)
        } else {
          fotoProfil = "Image type only!"
          cb(fotoProfil)
        }
      }
    }).single(req.params.nip)

    // Upload image
    upload(req, res, err => {
      if (!err) {
        const profileField = {}
        profileField.fotoProfil = req.file.filename

        Karyawan.findOneAndUpdate(
          {
            nip: req.params.nip
          },
          {
            $set: profileField
          },
          {
            new: true
          }
        )
          .then(profile => {
            res.status(200).json(profile)
          })
          .catch(err => {
            fotoProfil = err
            res.status(400).json({
              fotoProfil
            })
          })
      } else {
        if (typeof err === "string") {
        } else {
          fotoProfil = err.message
        }

        res.status(404).json({
          fotoProfil
        })
      }
    })
  }
)

// get all employees
router.get("/all", (req, res) => {
  const errors = {}

  Karyawan.find()
    .then(profiles => {
      if (!profiles) {
        errors.noEmployee = "Employee not found"
        return res.status(404).json(errors)
      }
      res.json(profiles)
    })
    .catch(err => {
      return res.status(404).json("There are no employees found")
    })
})

// Get employee by NIP
router.get("/nip/:nip", (req, res) => {
  const errors = {}

  Karyawan.findOne({
    nip: req.params.nip
  })
    .then(profile => {
      if (!profile) {
        errors.noProfile = "Employee not found"
        return res.status(404).json(errors)
      }
      return res.json(profile)
    })
    .catch(err => {
      return res.status(404).json("There is no employee found")
    })
})

// Get employee by ID
router.get(
  "/id/:user_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {}

    Karyawan.findOne({
      _id: req.params.user_id
    })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "Employee not found"
          return res.status(404).json(errors)
        }
        return res.json(profile)
      })
      .catch(err => {
        return res.status(404).json("There is no employee found")
      })
  }
)

// create karyawan
router.post(
  "/add-karyawan",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validationEmployee(req.body)

    if (!isValid) {
      return res.status(404).json(errors)
    }

    Nip.findOne({ nip: req.body.nip }).then(profile => {
      if (profile) {
        return res.status(400).json({
          nip: "NIP are invalid, because it's an Admin NIP. try another one."
        })
      } else {
        Karyawan.findOne({
          nip: req.body.nip
        }).then(exists => {
          if (exists) {
            return res.status(400).json({
              nip: "Karyawan telah terdaftar dengan NIP yang sama."
            })
          } else {
            const newEmp = new Karyawan({
              nip: req.body.nip,
              name: req.body.name,
              departemen: req.body.departemen,
              jabatan: req.body.jabatan,
              statusPernikahan: req.body.statusPernikahan,
              noTelepon: req.body.noTelepon,
              jenisKelamin: req.body.jenisKelamin,
              tempatLahir: req.body.tempatLahir,
              alamat: req.body.alamat,
              tanggalLahir: req.body.tanggalLahir,
              fotoProfil: req.body.fotoProfil
            })

            // add to employee model. Save employee
            newEmp
              .save()
              .then(user => {
                // Variable for profile
                const newProfile = {}
                newProfile.user = user._id

                // Save profile
                new Profile(newProfile).save()

                res.status(201).json(user)
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
      }
    })
  }
)

// update employee
router.post(
  "/id/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validationEmployee(req.body)

    if (!isValid) {
      return res.status(404).json(errors)
    }

    const karyawanField = {}
    if (req.body.nip) karyawanField.nip = req.body.nip
    if (req.body.name) karyawanField.name = req.body.name
    if (req.body.departemen) karyawanField.departemen = req.body.departemen
    if (req.body.jabatan) karyawanField.jabatan = req.body.jabatan
    if (req.body.statusPernikahan)
      karyawanField.statusPernikahan = req.body.statusPernikahan
    if (req.body.noTelepon) karyawanField.noTelepon = req.body.noTelepon
    if (req.body.jenisKelamin)
      karyawanField.jenisKelamin = req.body.jenisKelamin
    if (req.body.tempatLahir) karyawanField.tempatLahir = req.body.tempatLahir
    if (req.body.alamat) karyawanField.alamat = req.body.alamat
    if (req.body.tanggalLahir)
      karyawanField.tanggalLahir = req.body.tanggalLahir

    Karyawan.findOneAndUpdate(
      {
        _id: req.params.user_id
      },
      {
        $set: karyawanField
      },
      { new: true }
    )
      .then(profile => {
        res.status(200).json(profile)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
)

// delete employees by ID
router.delete(
  "/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Karyawan.findOneAndRemove({
      _id: req.params.user_id
    })
      .then(post => {
        res.status(200).json({ success: true })
      })
      .catch(err => {
        res.status(400).json({
          errors: "nape nih error"
        })
      })
  }
)

module.exports = router
