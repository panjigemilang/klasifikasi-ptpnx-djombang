// Main
const express = require("express")
const router = express.Router()
const passport = require("passport")
var _ = require("underscore")

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

router.get("/all", (req, res) => {
  Karyawan.find()
    .then(karyawan => res.json(karyawan))
    .catch(err => res.json(err))
})

// get all employees
router.post("/all", (req, res) => {
  const errors = {}

  Karyawan.find({
    penilaian: {
      $elemMatch: { tahun: req.body.tahun, semester: req.body.semester }
    }
  })
    .then(async profiles => {
      if (profiles) {
        profiles.map((item, i) => {
          item.penilaian.filter(filterItem => {
            if (
              filterItem.tahun == req.body.tahun &&
              filterItem.semester == req.body.semester
            )
              profiles[i].penilaian = filterItem
          })
        })

        // Kalkulasi  nilai disini
        // Function for computational
        const saw = karyawan => {
          let a = [],
            temp = [],
            index = 0

          do {
            temp.push(karyawan[index].penilaian[0].c1)
            temp.push(karyawan[index].penilaian[0].c2)
            temp.push(karyawan[index].penilaian[0].c3)
            temp.push(karyawan[index].penilaian[0].c4)
            temp.push(karyawan[index].penilaian[0].c5)
            temp.push(karyawan[index].penilaian[0].c6)
            temp.push(karyawan[index].penilaian[0].c7)
            temp.push(karyawan[index].penilaian[0].c8)
            temp.push(karyawan[index].penilaian[0].c9)

            a.push(temp)
            temp = []
            index++
          } while (index < karyawan.length)

          //   Transpose
          const aT = _.zip.apply(_, a)

          let array = [],
            row = 0

          do {
            for (let col = 0; col < aT[0].length; col++) {
              temp.push(aT[row][col] / _.max(aT[row]))
            }
            array.push(temp)
            temp = []
            row++
          } while (row < aT.length)

          //   Transpose back
          const b = _.zip.apply(_, array)

          //   multiply with weight
          const nilaiAkhir = [],
            bobot = [0.14, 0.13, 0.1, 0.12, 0.09, 0.1, 0.11, 0.13, 0.08]

          temp = []
          row = 0

          do {
            for (let col = 0; col < b[0].length; col++) {
              temp.push(b[row][col] * bobot[col])
            }
            nilaiAkhir.push(temp)
            temp = []
            row++
          } while (row < b.length)

          let total = []
          row = 0

          //   Sums every data
          for (let index = 0; index < nilaiAkhir.length; index++) {
            total.push(nilaiAkhir[row].reduce((a, b) => a + b).toFixed(3))
            row++
          }

          return total
        }
        // :: END ::
        const values = await saw(profiles)

        for (let index = 0; index < profiles.length; index++) {
          profiles[index].penilaian[0].nilai = values[index]
        }

        return res.status(200).json(profiles)
      }
    })
    .catch(err => {
      return res.status(404).json(["not found"])
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
        }).then(async exists => {
          if (exists) {
            return res.status(400).json({
              nip: "Karyawan telah terdaftar dengan NIK yang sama."
            })
          } else {
            // Kalkulasi ketika insert Create Karyawan
            await Karyawan.find()
              .then(allEmployees => {})
              .catch(err => err)
            // :: END ::

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
                semester: req.body.semester,
                nilai: 0
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
            }
            i++
          }

          if (!addOrUpdate) {
            const newNilai = {
              tahun: req.body.tahun,
              semester: req.body.semester,
              c1: req.body.c1,
              c2: req.body.c2,
              c3: req.body.c3,
              c4: req.body.c4,
              c5: req.body.c5,
              c6: req.body.c6,
              c7: req.body.c7,
              c8: req.body.c8,
              c9: req.body.c9
            }

            found.penilaian.push(newNilai)
            return found.save().then(err => {
              res.json(err)
            })
          } else {
            // Update
            ;(found.penilaian[updateIndex].c1 = req.body.c1),
              (found.penilaian[updateIndex].c2 = req.body.c2),
              (found.penilaian[updateIndex].c3 = req.body.c3),
              (found.penilaian[updateIndex].c4 = req.body.c4),
              (found.penilaian[updateIndex].c5 = req.body.c5),
              (found.penilaian[updateIndex].c6 = req.body.c6),
              (found.penilaian[updateIndex].c7 = req.body.c7),
              (found.penilaian[updateIndex].c8 = req.body.c8),
              (found.penilaian[updateIndex].c9 = req.body.c9)

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
