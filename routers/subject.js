const express = require('express')
const router = express.Router()

const Model = require('../models')
// define the home page route
router.get('/subject', function (req, res) {
  Model.Subject.findAll().then(dataSubjects => {
  // projects will be an array of all Project instances
  res.render('subject', {dataSubjects: dataSubjects})
  })
})

module.exports = router