// Main
const express = require("express")
const router = express.Router()
const passport = require("passport")

// Model
const Karyawan = require("../../models/Karyawan")
const Profile = require("../../models/Profile")
const Nip = require("../../models/NIP")

// Upload
const multer = require("multer")
const path = require("path")

// validation
const validationEmployee = require("../../validation/employee")

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./client/public/img/profilePicture/")
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
        const filetypes = /jpg/
        // Check Extname
        const extname = filetypes.test(
          path.extname(file.originalname).toLowerCase()
        )
        // Check mime
        const mimetype = filetypes.test(file.mimetype)
        if (extname && mimetype) {
          cb(null, true)
        } else {
          fotoProfil = "Hanya menerima file format .jpg saja."
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
router.post("/all", (req, res) => {
  const errors = {}

  Karyawan.find({
    penilaian: {
      $elemMatch: { tahun: req.body.tahun, semester: req.body.semester }
    }
  })
    .then(profiles => {
      if (!profiles) {
        errors.noEmployee = "Employee not found"
        return res.status(404).json(errors)
      }

      profiles.map((item, i) => {
        item.penilaian.filter(filterItem => {
          if (
            filterItem.tahun == req.body.tahun &&
            filterItem.semester == req.body.semester
          )
            profiles[i].penilaian = filterItem
        })
      })

      res.json(profiles)
    })
    .catch(err => {
      return res.status(404).json("There are no employees found")
    })
})

// Get employee by NIP
router.get(
  "/nip/:nip",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
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
  }
)

// Get employee by ID
router.get("/id/:user_id", (req, res) => {
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
})

// create/add multiple karyawan
router.post(
  "/add-multiple-karyawan",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    try {
      let newEmp
      let i = 0
      // let isValid
      // let errors
      // let jk

      for (i; i < req.body.length; i++) {
        // // Ntar gua coba lagi gayn
        // isValid = validationEmployee(req.body[i]).isValid
        // errors = validationEmployee(req.body[i]).errors

        // return Nip.findOne({ nip: req.body[i].nip }).then(profile => {
        //   if (profile) {
        //     return res.status(400).json({
        //       nip: "NIK tidak valid, karena ini adalah NIK admin. Coba lagi"
        //     })
        //   } else {
        //     return Karyawan.findOne({
        //       nip: req.body[i].nip
        //     }).then(exists => {
        //       if (exists) {
        //         return res.status(400).json({
        //           nip: "Karyawan telah terdaftar dengan NIK yang sama."
        //         })
        //       } else {
        //         jk = req.body[i].jenisKelamin.replace(/\s+/g, "")

        //         const newEmp = new Karyawan({
        //           nip: req.body[i].nip,
        //           name: req.body[i].name,
        //           akademik: req.body[i].akademik,
        //           agama: req.body[i].agama,
        //           jabatan: req.body[i].jabatan,
        //           statusPernikahan: req.body[i].statusPernikahan,
        //           noTelepon: req.body[i].noTelepon,
        //           jenisKelamin: jk,
        //           tempatLahir: req.body[i].tempatLahir,
        //           alamat: req.body[i].alamat,
        //           tanggalLahir: req.body[i].tanggalLahir,
        //           email: req.body[i].email,
        //           fotoProfil: req.body[i].fotoProfil
        //         })

        //         // add to employee model. Save employee
        //         newEmp
        //           .save()
        //           .then(user => {
        //             // Variable for profile
        //             const newProfile = {}
        //             newProfile.user = user._id

        //             // Save profile
        //             new Profile(newProfile).save()
        //             console.log("selesai Save")

        //             res.json(user)
        //           })
        //           .catch(err => {
        //             console.log(err)
        //             throw new Error(err)
        //           })
        //       }
        //     })
        //   }
        // })

        jk = req.body[i].jenisKelamin.replace(/\s+/g, "")

        newEmp = new Karyawan({
          nip: req.body[i].nip,
          name: req.body[i].name,
          akademik: req.body[i].akademik,
          agama: req.body[i].agama,
          jabatan: req.body[i].jabatan,
          statusPernikahan: req.body[i].statusPernikahan,
          noTelepon: req.body[i].noTelepon,
          jenisKelamin: jk,
          tempatLahir: req.body[i].tempatLahir,
          alamat: req.body[i].alamat,
          tanggalLahir: req.body[i].tanggalLahir,
          email: req.body[i].email,
          fotoProfil: req.body[i].fotoProfil,
          status: req.body[i].status
        })

        // add to employee model. Save employee
        newEmp.save().then(user => {
          // Variable for profile
          const newProfile = {}
          newProfile.user = user._id

          // Save profile
          new Profile(newProfile).save()
        })
      }

      res.status(200).json({
        message: "Success. saved"
      })
    } catch (error) {
      res.status(404).json({
        message: "error"
      })
    }
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
          nip: "NIK tidak valid, karena ini adalah NIK admin. Coba lagi"
        })
      } else {
        Karyawan.findOne({
          nip: req.body.nip
        }).then(exists => {
          if (exists) {
            return res.status(400).json({
              nip: "Karyawan telah terdaftar dengan NIK yang sama."
            })
          } else {
            const newEmp = new Karyawan({
              nip: req.body.nip,
              name: req.body.name,
              akademik: req.body.akademik,
              agama: req.body.agama,
              jabatan: req.body.jabatan,
              statusPernikahan: req.body.statusPernikahan,
              noTelepon: req.body.noTelepon,
              jenisKelamin: req.body.jenisKelamin,
              tempatLahir: req.body.tempatLahir,
              alamat: req.body.alamat,
              tanggalLahir: req.body.tanggalLahir,
              email: req.body.email,
              penilaian: {
                tahun: req.body.tahun,
                semester: req.body.semester
              },
              fotoProfil: req.body.fotoProfil,
              status: req.body.status
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
    if (req.body.akademik) karyawanField.akademik = req.body.akademik
    if (req.body.jabatan) karyawanField.jabatan = req.body.jabatan
    if (req.body.agama) karyawanField.agama = req.body.agama
    if (req.body.statusPernikahan)
      karyawanField.statusPernikahan = req.body.statusPernikahan
    if (req.body.noTelepon) karyawanField.noTelepon = req.body.noTelepon
    if (req.body.jenisKelamin)
      karyawanField.jenisKelamin = req.body.jenisKelamin
    if (req.body.tempatLahir) karyawanField.tempatLahir = req.body.tempatLahir
    if (req.body.alamat) karyawanField.alamat = req.body.alamat
    if (req.body.tanggalLahir)
      karyawanField.tanggalLahir = req.body.tanggalLahir
    if (req.body.email) karyawanField.email = req.body.email
    if (req.body.status) karyawanField.status = req.body.status

    if (req.body.tahun) {
      const filter = {
        tahun: req.body.tahun,
        semester: req.body.semester
      }

      Karyawan.findOne({
        _id: req.params.user_id
      }).then(found => {
        if (found) {
          let addOrUpdate = false,
            updateIndex,
            i = 0
          while (i < found.penilaian.length) {
            if (
              found.penilaian[i].tahun == filter.tahun &&
              found.penilaian[i].semester == filter.semester
            ) {
              addOrUpdate = true
              updateIndex = i
              i++
              addOrUpdate
            }
            i++
          }

          if (!addOrUpdate) {
            // Add New
            const newNilai = {
              tahun: req.body.tahun,
              semester: req.body.semester,
              nilai: req.body.nilai
            }

            found.penilaian.push(newNilai)
            return found.save().then(err => {
              res.json(err)
            })
          } else {
            // Update
            found.penilaian[updateIndex].nilai = req.body.nilai
            return found.save().then(err => {
              res.json(err)
            })
          }
        }
      })
    } else {
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
  }
)

// delete employees by ID
router.delete(
  "/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.params.user_id })
      .then(() => {
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
      })
      .catch(err => {
        res.status(400).json({
          errors: "gagal delete"
        })
      })
  }
)

module.exports = router
