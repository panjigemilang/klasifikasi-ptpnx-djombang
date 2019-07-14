const express = require("express")
const router = express.Router()
const passport = require("passport")

// Model
const Karyawan = require("../../models/Karyawan")
const Nip = require("../../models/NIP")

// validation
const validationEmployee = require("../../validation/employee")

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
              jenisKelamin: req.body.jenisKelamin,
              nilai: req.body.nilai
            })

            // add to employee model
            newEmp
              .save()
              .then(user => {
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
    if (req.body.jenisKelamin)
      karyawanField.jenisKelamin = req.body.jenisKelamin
    if (req.body.nilai) karyawanField.nilai = req.body.nilai

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
    Karyawan.findOne({
      _id: req.params.user_id
    }).then(post => {
      post
        .remove()
        .then(() => {
          res.status(200).json({ success: true })
        })
        .catch(err => {
          console.log("catch error karena : ")
          res.status(404).json(err)
        })
    })
  }
)

module.exports = router
