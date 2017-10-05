// express
const express = require('express')
const app = express()
const router = express.Router()

const Model = require('../models')
router.get('/student', function (req, res) {
  Model.Student.findAll().then(dataStudents => {
  // projects will be an array of all Project instances
  res.render('student', {dataStudents: dataStudents})
  })
})

router.get('/student/add', function (req, res) {
  	res.render('student/add')
})

router.post('/student/add', function (req, res) {
  Model.Student.create(req.body).then(dataStudents => {
  res.redirect('/student')
  })
})

router.get('/student/edit/:id', function (req, res) {
  Model.Student.findById(req.params.id).then(dataStudents => {
  // project will be an instance of Project and stores the content of the table entry
  // with id 123. if such an entry is not defined you will get null
  res.render('student/edit', {dataStudents: dataStudents})
  })
})

router.post('/student/edit/:id', function (req, res) {
  Model.Student.update(req.body, {where: req.params}).then(dataStudents => {
  res.redirect('/student')
  })
})

router.get('/student/delete/:id', function (req, res) {
  Model.Student.destroy({where: req.params}).then(dataStudents => {
  res.redirect('/student')
  })
})

module.exports = router