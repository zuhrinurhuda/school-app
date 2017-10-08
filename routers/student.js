const express = require('express')
const router = express.Router()

const Model = require('../models')
router.get('/student', function (req, res) {
  Model.Student.findAll({order: [['id', 'ASC']]}).then(dataStudents => {
  res.render('student', {dataStudents: dataStudents})
  })
})

router.get('/student/add', function (req, res) {
  	res.render('student/add')
})

router.post('/student/add', function (req, res) {
  Model.Student.create(req.body).then(() => {
  res.redirect('/student')
  }).catch((err) => {
    res.render('student/add', {errors: err.errors})
    // console.log(err.errors)
  })
})

router.get('/student/edit/:id', function (req, res) {
  Model.Student.findById(req.params.id).then(dataStudents => {
  res.render('student/edit', {dataStudents: dataStudents})
  })
})

router.post('/student/edit/:id', function (req, res) {
  Model.Student.update(req.body, {where: req.params}).then(() => {
  res.redirect('/student')
  })
})

router.get('/student/delete/:id', function (req, res) {
  Model.Student.destroy({where: req.params}).then(() => {
  res.redirect('/student')
  })
})

router.get('/student/addsubject/:id', function (req, res) {
  Model.Student.findById(req.params.id).then(dataStudent => {
    Model.Subject.findAll().then(dataSubjects => {
      res.render('student/addsubject', {dataStudents: dataStudent, dataSubjects: dataSubjects})
      // res.send(dataSubjects)
    })
  })
})

router.post('/student/addsubject/:id', function (req, res) {
  Model.StudentSubject.create(req.body).then(() => {
    res.redirect('/student')
    // res.send(req.body)
  })
})

module.exports = router