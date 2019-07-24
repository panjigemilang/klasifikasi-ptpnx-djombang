const passport = require("passport")
const express = require("express")
const router = express.Router()

// validator
const validationAllowance = require("../../validation/allowance")
const validationExperiences = require("../../validation/experiences")
const validationEducation = require("../../validation/educations")

// loading models
const Profile = require("../../models/Profile")
const User = require("../../models/User")

// mongoose.set("useFindAndModify", false)

// current users
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {}

    Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        // profile exists
        if (!profile) {
          errors.notFound = "Profile not found"
          return res.status(404).json(errors)
        }
        res.json(profile)
      })
      .catch(err => {
        return res.status(404).json(err)
      })
  }
)

// @route   GET api/profile/handle/:handle
// @desc    GET profile by handle
// @access  Public
router.get("/id/:user_id", (req, res) => {
  const errors = {}

  Profile.findOne({
    user: req.params.user_id
  })
    .then(profile => {
      if (!profile) {
        errors.noProfile = "Profile not found"
        return res.status(404).json(errors)
      }
      return res.json(profile)
    })
    .catch(err => {
      return res.status(404).json("There is no profile found")
    })
})

// @route   GET api/profile/all
// @desc    GET all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {}

  Profile.find()
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = "Profile not found"
        return res.status(404).json(errors)
      }
      res.json(profiles)
    })
    .catch(err => {
      return res.status(404).json("There are no profiles found")
    })
})

// @route   POST api/experience
// @desc    add experiences to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validationExperiences(req.body)

    if (!isValid) {
      return res.status(404).json(errors)
    }

    const experiencesField = {}
    if (req.body.title) experiencesField.title = req.body.title
    if (req.body.company) experiencesField.company = req.body.company
    if (req.body.location) experiencesField.location = req.body.location
    if (req.body.from) experiencesField.from = req.body.from
    if (req.body.to) experiencesField.to = req.body.to
    if (req.body.current) experiencesField.current = req.body.current
    if (req.body.description)
      experiencesField.description = req.body.description

    Profile.findOneAndUpdate(
      { user: req.body.uid },
      { $set: experiencesField },
      { new: true }
    ).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // add to exp array
      profile.experiences.push(newExp)
      profile.save().then(err => {
        res.json(profile)
      })
    })
  }
)

// @route   POST api/education
// @desc    add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validationEducation(req.body)

    if (!isValid) {
      return res.status(404).json(errors)
    }

    const educationsField = {}
    if (req.body.institution) educationsField.institution = req.body.institution
    if (req.body.degree) educationsField.degree = req.body.degree
    if (req.body.fieldofstudy)
      educationsField.fieldofstudy = req.body.fieldofstudy
    if (req.body.location) educationsField.location = req.body.location
    if (req.body.from) educationsField.from = req.body.from
    if (req.body.to) educationsField.to = req.body.to
    if (req.body.current) educationsField.current = req.body.current

    Profile.findOneAndUpdate(
      { user: req.body.uid },
      { $set: educationsField },
      { new: true }
    ).then(profile => {
      const newExp = {
        institution: req.body.institution,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current
      }

      // add to exp array
      profile.education.push(newExp)
      profile.save().then(err => {
        res.json(profile)
      })
    })
  }
)

// @route   POST api/profile/allowance
// @desc    add allowance to profile
// @access  Private
router.post(
  "/allowance",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validationAllowance(req.body)

    if (!isValid) {
      return res.status(404).json(errors)
    }

    const allowanceField = {}
    if (req.body.name) allowanceField.name = req.body.name
    if (req.body.status) allowanceField.status = req.body.status
    if (req.body.noTelepon) allowanceField.noTelepon = req.body.noTelepon

    Profile.findOneAndUpdate(
      { user: req.body.uid },
      { $set: allowanceField },
      { new: true }
    ).then(profile => {
      const newExp = {
        name: req.body.name,
        status: req.body.status,
        noTelepon: req.body.noTelepon
      }

      // add to exp array
      profile.allowance.push(newExp)
      profile.save().then(err => {
        res.json(profile)
      })
    })
  }
)

// @route   DELETE api/experience
// @desc    delete experiences on profile
// @access  Private
router.delete(
  "/experience/:exp_id&:pid",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({ _id: req.params.pid }).then(profile => {
      // get remove index
      const removeIndex = profile.experiences
        .map(item => item.id)
        .indexOf(req.params.exp_id)

      // Splice out of array
      profile.experiences.splice(removeIndex, 1)

      profile.save().then(profile => {
        res.json(profile)
      })
    })
  }
)

// @route   DELETE api/experience
// @desc    delete education on profile
// @access  Private
router.delete(
  "/education/:edu_id&:pid",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({ _id: req.params.pid }).then(profile => {
      // get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id)

      // Splice out of array
      profile.education.splice(removeIndex, 1)

      profile.save().then(profile => {
        res.json(profile)
      })
    })
  }
)

// @route   DELETE api/profile/allowance
// @desc    delete allowance on profile
// @access  Private
router.delete(
  "/allowance/:all_id&:pid",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({ _id: req.params.pid }).then(profile => {
      // get remove index
      const removeIndex = profile.allowance
        .map(item => item.id)
        .indexOf(req.params.all_id)

      // Splice out of array
      profile.allowance.splice(removeIndex, 1)

      profile.save().then(profile => {
        res.json(profile)
      })
    })
  }
)

// @route   DELETE api/profile
// @desc    delete profile and user
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(success => {
        res.json(success)
      })
    })
  }
)

module.exports = router
