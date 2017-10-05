const express = require('express')
const router = express.Router()

const Model = require('../models')
// define the home page route
router.get('/teacher', function (req, res) {
  Model.Teacher.findAll().then(dataTeachers => {
  // projects will be an array of all Project instances
  res.render('teacher', {dataTeachers: dataTeachers})
  })
})

module.exports = router